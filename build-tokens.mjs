import { readFileSync } from "node:fs";
import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { brandsOf, tokensForBrand } from "./scripts/lib/brands.mjs";
import { opacityProblems } from "./scripts/lib/opacity.mjs";

/**
 * Build platform-specific code from tokens/tokens.json (Tokens Studio export).
 *
 * Pipeline:
 *   tokens-studio preprocessor  -> hoists `primitives`/`semantic` sets to root
 *                                  (so `{fontFamily.x}` refs resolve) and aligns types
 *   mmt/rename-negative         -> `-12` keys become `minus12` (avoids name collisions)
 *   expand                      -> composite `typography` tokens become individual
 *                                  fontFamily / fontWeight / fontSize / lineHeight / letterSpacing;
 *                                  on iOS and Android, composite shadows also become one
 *                                  offsetX / offsetY / blur / color set per layer (web keeps
 *                                  them whole as a CSS box-shadow shorthand)
 *
 * Outputs: web (CSS vars + ESM), iOS (SwiftUI Swift enum), Android (Compose Kotlin object),
 * plus a runtime brand switch on each (see "brands" at the end): a [data-brand] block in
 * tokens.css, brands.ts, CosmosBrand.swift and CosmosBrand.kt.
 */

await register(StyleDictionary, { excludeParentKeys: true });

// `--out <dir>` writes the platform outputs somewhere other than dist/. The linter uses it
// to build into a scratch directory and diff the result against the committed dist/.
const outFlag = process.argv.indexOf("--out");
const OUT_DIR = (outFlag === -1 ? "dist" : process.argv[outFlag + 1]).replace(/\/+$/, "");

const PX = /^-?\d*\.?\d+px$/;

// Common CSS font-weight name -> numeric weight. Style words (italic/oblique) are
// stripped first; what remains maps to a number. Pure styles fall back to 400.
const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  roman: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  heavy: 800,
  black: 900,
};

const typeOf = (t) => t.$type ?? t.type;
const valueOf = (t) => t.$value ?? t.value;

const HEX_COLOR = /^#([0-9A-Fa-f]{3,8})$/;
const CSS_LINEAR_GRADIENT =
  /^linear-gradient\((\d+(?:\.\d+)?)deg,\s*(.+)\)$/;

/** Expand #RGB / #RRGGBB / #RRGGBBAA into 0–255 channels. */
function parseHex(hex) {
  let h = hex.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length === 6) {
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 255,
    };
  }
  if (h.length === 8) {
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: parseInt(h.slice(6, 8), 16),
    };
  }
  throw new Error(`Invalid hex color: ${hex}`);
}

function channelUnit(n) {
  return Number((n / 255).toFixed(6));
}

/** CSS linear-gradient angle -> normalized start/end points (y increases downward). */
function cssAngleToPoints(angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  return {
    startX: 0.5 - x * 0.5,
    startY: 0.5 - y * 0.5,
    endX: 0.5 + x * 0.5,
    endY: 0.5 + y * 0.5,
  };
}

function parseGradientStops(stopsStr) {
  const stops = [];
  const re = /#([0-9A-Fa-f]{3,8})\s+([\d.]+)%/g;
  let match;
  while ((match = re.exec(stopsStr)) !== null) {
    stops.push({
      hex: `#${match[1]}`,
      position: parseFloat(match[2]) / 100,
    });
  }
  if (stops.length < 2) {
    throw new Error(`Invalid gradient stops: ${stopsStr}`);
  }
  return stops;
}

function isColorToken(token) {
  const value = `${valueOf(token)}`;
  if (typeOf(token) !== "color" || typeof valueOf(token) !== "string") return false;
  if (
    value.startsWith("Color(") ||
    value.startsWith("Brush.") ||
    value.startsWith("LinearGradient(")
  ) {
    return false;
  }
  return true;
}

function isGradientColorToken(token) {
  return isColorToken(token) && `${valueOf(token)}`.includes("linear-gradient(");
}

function toIosColor(hex) {
  const { r, g, b, a } = parseHex(hex);
  if (a < 255) {
    return `Color(.sRGB, red: ${channelUnit(r)}, green: ${channelUnit(g)}, blue: ${channelUnit(b)}, opacity: ${channelUnit(a)})`;
  }
  return `Color(red: ${channelUnit(r)}, green: ${channelUnit(g)}, blue: ${channelUnit(b)})`;
}

function toAndroidColor(hex) {
  const { r, g, b, a } = parseHex(hex);
  const argb = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
  return `Color(0x${argb.toString(16).toUpperCase().padStart(8, "0")})`;
}

function toIosColorValue(value) {
  if (HEX_COLOR.test(value)) return toIosColor(value);

  const gradient = value.match(CSS_LINEAR_GRADIENT);
  if (gradient) {
    const { startX, startY, endX, endY } = cssAngleToPoints(parseFloat(gradient[1]));
    const stops = parseGradientStops(gradient[2])
      .map(
        (stop) =>
          `Gradient.Stop(color: ${toIosColor(stop.hex)}, location: ${stop.position})`,
      )
      .join(", ");
    return `LinearGradient(gradient: Gradient(stops: [${stops}]), startPoint: UnitPoint(x: ${startX}, y: ${startY}), endPoint: UnitPoint(x: ${endX}, y: ${endY}))`;
  }

  throw new Error(`Unsupported iOS color value: ${value}`);
}

function toAndroidColorValue(value) {
  if (HEX_COLOR.test(value)) return toAndroidColor(value);

  const gradient = value.match(CSS_LINEAR_GRADIENT);
  if (gradient) {
    const { startX, startY, endX, endY } = cssAngleToPoints(parseFloat(gradient[1]));
    const stops = parseGradientStops(gradient[2])
      .map((stop) => `${stop.position}f to ${toAndroidColor(stop.hex)}`)
      .join(", ");
    return `Brush.linearGradient(${stops}, start = Offset(${startX}f, ${startY}f), end = Offset(${endX}f, ${endY}f))`;
  }

  throw new Error(`Unsupported Android color value: ${value}`);
}

/**
 * `-12` style object keys collide with `12` once camel/kebab-cased; rename them, and
 * rewrite `{shadowOffset.-4}` style references to match (tokens.json keeps the authored
 * form). Arrays are walked because shadow layers hold their references inside one.
 */
function renameNegativeKeys(node) {
  if (typeof node === "string") {
    return node.replace(/\{[^{}]*\}/g, (ref) => ref.replace(/\.-(\d+)(?=[.}])/g, ".minus$1"));
  }
  if (Array.isArray(node)) return node.map(renameNegativeKeys);
  if (node === null || typeof node !== "object") {
    return node;
  }
  const out = {};
  for (const [key, child] of Object.entries(node)) {
    const renamed = /^-/.test(key) ? `minus${key.slice(1)}` : key;
    out[renamed] = renameNegativeKeys(child);
  }
  return out;
}

function tokenValue(token) {
  if (token === null || typeof token !== "object") return token;
  return token.$value ?? token.value;
}

function isTokenLeaf(node) {
  return (
    node !== null &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    ("value" in node || "$value" in node)
  );
}

/** Walk nested sets and resolve `{color.family.step}` refs inside gradient strings. */
function resolveColorReference(ref, dictionary, stack = new Set()) {
  if (stack.has(ref)) {
    throw new Error(`Circular color reference: ${ref}`);
  }
  stack.add(ref);

  let node = dictionary;
  for (const segment of ref.split(".")) {
    node = node?.[segment];
  }
  if (!isTokenLeaf(node)) {
    throw new Error(`Unresolved color reference: {${ref}}`);
  }

  let resolved = `${tokenValue(node)}`;
  if (/^\{[^}]+\}$/.test(resolved)) {
    resolved = resolveColorReference(resolved.slice(1, -1), dictionary, stack);
  }
  return resolved;
}

function resolveGradientString(value, dictionary) {
  return value.replace(/\{([^}]+)\}/g, (_, ref) => resolveColorReference(ref, dictionary));
}

function resolveGradientColors(node, dictionary = node) {
  if (isTokenLeaf(node)) {
    const value = tokenValue(node);
    if (
      typeof value === "string" &&
      value.includes("linear-gradient(") &&
      value.includes("{")
    ) {
      const key = node.$value !== undefined ? "$value" : "value";
      node[key] = resolveGradientString(value, dictionary);
    }
    return node;
  }

  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    return node;
  }

  for (const [key, child] of Object.entries(node)) {
    node[key] = resolveGradientColors(child, dictionary);
  }
  return node;
}

/**
 * Fail the build on the first opacity problem. The rules themselves live in
 * scripts/lib/opacity.mjs, shared with the linter, which reports all of them at once.
 * Runs BEFORE the tokens-studio preprocessor, which is the only point where the three
 * tiers are still distinguishable. Read-only: it throws or returns the dictionary untouched.
 */
function validateOpacity(dictionary) {
  const [problem] = opacityProblems(dictionary);
  if (problem) throw new Error(problem.message);
  return dictionary;
}

StyleDictionary.registerPreprocessor({
  name: "mmt/validate-opacity",
  preprocessor: (dictionary) => validateOpacity(dictionary),
});

StyleDictionary.registerPreprocessor({
  name: "mmt/rename-negative",
  preprocessor: (dictionary) => renameNegativeKeys(dictionary),
});

StyleDictionary.registerPreprocessor({
  name: "mmt/resolve-gradient-colors",
  preprocessor: (dictionary) => resolveGradientColors(structuredClone(dictionary)),
});

/**
 * Mark every composite token that carries a description with its own path.
 *
 * `expand` turns one composite token into several sub-tokens (a typography token into
 * fontFamily / fontWeight / fontSize / lineHeight, a two-layer shadow into ten), and each
 * inherits the parent description, so emitting it verbatim would repeat the same
 * paragraph once per sub-token. The mark lets mmt/description/comment tell an expanded
 * sub-token from its parent, so only the first sub-token of each composite carries the
 * comment. A composite a platform keeps whole (shadows on web) still gets it once.
 */
function markCommentAnchors(node, path = []) {
  if (isTokenLeaf(node)) {
    const value = tokenValue(node);
    if (node.description && value !== null && typeof value === "object") {
      node.commentAnchor = path.join(".");
    }
    return node;
  }
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    return node;
  }
  for (const [key, child] of Object.entries(node)) {
    markCommentAnchors(child, [...path, key]);
  }
  return node;
}

StyleDictionary.registerPreprocessor({
  name: "mmt/comment-anchor",
  preprocessor: (dictionary) => markCommentAnchors(structuredClone(dictionary)),
});

// Named font weights (incl. the malformed "Italic" / "Semibold Italic") -> numbers.
StyleDictionary.registerTransform({
  name: "mmt/fontWeight/number",
  type: "value",
  transitive: true,
  filter: (token) => typeOf(token) === "fontWeight" && typeof valueOf(token) === "string",
  transform: (token) => {
    const raw = `${valueOf(token)}`.toLowerCase();
    const cleaned = raw.replace(/italic|oblique|normal/g, "").replace(/\s/g, "");
    if (cleaned && FONT_WEIGHTS[cleaned] !== undefined) return FONT_WEIGHTS[cleaned];
    const numeric = Number(raw);
    return Number.isFinite(numeric) ? numeric : 400;
  },
});

// iOS: strip the px unit and emit an explicit `CGFloat(...)`. SwiftUI dimension APIs
// (`.system(size:)`, `.lineSpacing(_:)`, `.cornerRadius(_:)`, `.padding(_:)`) all take
// CGFloat, and Swift does NOT implicitly convert Int/Double literals to CGFloat, so a
// bare number would fail to compile at the call site. lineHeight tokens stay as the
// total line-box height here (matching Figma/CSS/Android); the runtime `.lineHeight`
// modifier (see mmt/ios-line-height-modifier) converts that to SwiftUI line spacing.
StyleDictionary.registerTransform({
  name: "mmt/dimension/unitless",
  type: "value",
  transitive: true,
  filter: (token) => typeof valueOf(token) === "string" && PX.test(valueOf(token)),
  transform: (token) => `CGFloat(${parseFloat(valueOf(token))})`,
});

// iOS: opacity stays a plain literal — SwiftUI's `.opacity(_:)` takes a Double, so no
// CGFloat wrapper is wanted here. But the Swift formatter interpolates values raw, so a
// value of `0` or `1` would emit a bare integer, which Swift infers as Int and refuses
// to pass to `.opacity(_:)`. Give integral values one decimal place so they land as
// Double; non-integers are left alone, which keeps existing output byte-identical.
// Idempotent: "0.0" is still integral and re-normalises to "0.0".
StyleDictionary.registerTransform({
  name: "mmt/opacity/ios",
  type: "value",
  transitive: true,
  filter: (token) => typeOf(token) === "opacity" && Number.isInteger(Number(valueOf(token))),
  transform: (token) => Number(valueOf(token)).toFixed(1),
});

// Android: px -> Compose units. Text metrics use sp, everything else uses dp.
StyleDictionary.registerTransform({
  name: "mmt/dimension/compose",
  type: "value",
  transitive: true,
  filter: (token) => typeof valueOf(token) === "string" && PX.test(valueOf(token)),
  transform: (token) => {
    const n = parseFloat(valueOf(token));
    const isText = ["fontSize", "lineHeight", "letterSpacing"].some((seg) =>
      token.path.includes(seg),
    );
    return `${n}.${isText ? "sp" : "dp"}`;
  },
});

// Android: opacity -> a Compose Float literal. `Modifier.alpha(alpha: Float)` and
// `Color.copy(alpha: Float)` both take Float, and Kotlin neither widens nor narrows a
// Double literal implicitly, so a bare `0.08` fails to compile at the call site — the
// same reason iOS dimensions are wrapped in CGFloat(...). parseFloat tolerates the
// trailing `f`, so the transitive pass is idempotent.
StyleDictionary.registerTransform({
  name: "mmt/opacity/compose",
  type: "value",
  transitive: true,
  filter: (token) => typeOf(token) === "opacity",
  transform: (token) => `${parseFloat(valueOf(token))}f`,
});

// iOS/Android: wrap font family / font style strings as native string literals.
// Idempotent + non-transitive so values are not double-quoted on repeated passes.
StyleDictionary.registerTransform({
  name: "mmt/string/quote",
  type: "value",
  transitive: false,
  filter: (token) =>
    ["fontFamily", "fontStyle"].includes(typeOf(token)) && typeof valueOf(token) === "string",
  transform: (token) => {
    const v = `${valueOf(token)}`;
    return /^".*"$/.test(v) ? v : `"${v}"`;
  },
});

// iOS: hex colors -> SwiftUI Color; CSS linear-gradients -> LinearGradient.
StyleDictionary.registerTransform({
  name: "mmt/color/ios",
  type: "value",
  transitive: false,
  filter: (token) => isColorToken(token) && !isGradientColorToken(token),
  transform: (token) => toIosColorValue(`${valueOf(token)}`),
});

StyleDictionary.registerTransform({
  name: "mmt/color/ios-gradient",
  type: "value",
  transitive: false,
  filter: isGradientColorToken,
  transform: (token) => toIosColorValue(`${valueOf(token)}`),
});

// Android: hex colors -> Compose Color; CSS linear-gradients -> Brush.linearGradient.
StyleDictionary.registerTransform({
  name: "mmt/color/android",
  type: "value",
  transitive: false,
  filter: (token) => isColorToken(token) && !isGradientColorToken(token),
  transform: (token) => toAndroidColorValue(`${valueOf(token)}`),
});

StyleDictionary.registerTransform({
  name: "mmt/color/android-gradient",
  type: "value",
  transitive: false,
  filter: isGradientColorToken,
  transform: (token) => toAndroidColorValue(`${valueOf(token)}`),
});

// iOS runtime helper: SwiftUI's `.lineSpacing` is additive leading (gap *between* lines),
// NOT the total line-box height that Figma/CSS/Compose use. This modifier converts a
// design-token line height into the correct SwiftUI representation so iOS text matches
// web and Android: spacing = lineHeight - font.lineHeight, plus half-leading padding on
// the top/bottom so single lines and the first/last line get the same box as the web.
StyleDictionary.registerFormat({
  name: "mmt/ios-line-height-modifier",
  format: ({ file }) => `//
// ${file.destination}
//

// Do not edit directly, this file was auto-generated.

import SwiftUI
import UIKit

public extension View {
    /// Applies a design-token line height to text.
    ///
    /// Design tokens (\`CosmosTokens.*LineHeight\`) express the **total line-box height**
    /// (the Figma/CSS/Android model). SwiftUI's \`.lineSpacing(_:)\` instead adds space
    /// only *between* lines, so applying a token value directly would over-space text.
    /// This modifier converts it: it subtracts the font's intrinsic line height to get
    /// the inter-line spacing, then pads the top and bottom by half the leading so a
    /// single line (and the first/last line of a paragraph) occupies the same vertical
    /// box it does on web and Android.
    ///
    /// - Parameters:
    ///   - lineHeight: Total line-box height, e.g. \`CosmosTokens.bodyMediumRegularLineHeight\`.
    ///   - uiFont: The \`UIFont\` actually used to render the text. Its \`lineHeight\`
    ///     provides the intrinsic metrics SwiftUI does not expose.
    func lineHeight(_ lineHeight: CGFloat, for uiFont: UIFont) -> some View {
        let leading = max(0, lineHeight - uiFont.lineHeight)
        return self
            .lineSpacing(leading)
            .padding(.vertical, leading / 2)
    }

    /// Convenience overload that resolves a \`UIFont\` from a token font family and size,
    /// falling back to the system font of that size if the custom font is unavailable.
    ///
    /// - Parameters:
    ///   - lineHeight: Total line-box height, e.g. \`CosmosTokens.bodyMediumRegularLineHeight\`.
    ///   - fontName: Token font family, e.g. \`CosmosTokens.bodyMediumRegularFontFamily\`.
    ///   - fontSize: Token font size, e.g. \`CosmosTokens.bodyMediumRegularFontSize\`.
    func lineHeight(_ lineHeight: CGFloat, fontName: String, fontSize: CGFloat) -> some View {
        let uiFont = UIFont(name: fontName, size: fontSize)
            ?? .systemFont(ofSize: fontSize)
        return self.lineHeight(lineHeight, for: uiFont)
    }
}
`,
});

// Tokens Studio stores per-token prose in `description`; Style Dictionary's CSS
// formatter emits `$description ?? comment`. Map one onto the other so descriptions
// reach dist/web/tokens.css as comments above each custom property. Skipped for
// every expanded sub-token after the first of its composite (see mmt/comment-anchor).
// The first-seen record is kept per platform, since each platform transforms its own copy.
const commentedComposites = new WeakMap();

StyleDictionary.registerTransform({
  name: "mmt/description/comment",
  type: "attribute",
  filter: (token) => typeof token.description === "string" && token.description.length > 0,
  transform: (token, platform) => {
    if (!commentedComposites.has(platform)) commentedComposites.set(platform, new Set());
    const seen = commentedComposites.get(platform);
    const anchor = token.commentAnchor;
    const isExpandedChild = anchor !== undefined && token.path.join(".") !== anchor;
    if (!isExpandedChild || !seen.has(anchor)) {
      if (isExpandedChild) seen.add(anchor);
      // Mutated in place, as sd-transforms' own ts/descriptionToComment does: the
      // return value of an attribute transform is merged into `token.attributes`,
      // which is not where a formatter looks for the comment.
      token.comment = token.description.replace(/\r?\n|\r/g, "\n");
    }
    return {};
  },
});

/** The Style Dictionary config for one brand. Each call returns fresh objects, because the
 * comment transform keys its bookkeeping on the platform object. */
const configFor = (tokens, log) => ({
  tokens,
  ...(log ? { log } : {}),
  preprocessors: [
    "mmt/validate-opacity",
    "tokens-studio",
    "mmt/rename-negative",
    "mmt/resolve-gradient-colors",
    "mmt/comment-anchor",
  ],
  // Typography expands everywhere. Shadows expand only on iOS and Android (see their
  // platform `expand`): CSS takes a whole multi-layer box-shadow, SwiftUI and Compose
  // draw one layer per modifier and need each layer's numbers separately.
  expand: { typesMap: true, include: ["typography"] },
  platforms: {
    "web-css": {
      transforms: [
        "attribute/cti",
        "mmt/description/comment",
        "mmt/fontWeight/number",
        "name/kebab",
        "fontFamily/css",
        "shadow/css/shorthand",
      ],
      buildPath: `${OUT_DIR}/web/`,
      files: [
        {
          destination: "tokens.css",
          format: "mmt/css/variables-brands",
          // Descriptions are full sentences; keep them above the declaration rather
          // than trailing it, which would push lines past any sane wrap width.
          options: { formatting: { commentPosition: "above" } },
        },
      ],
    },
    "web-js": {
      transforms: ["attribute/cti", "mmt/fontWeight/number", "name/camel", "shadow/css/shorthand"],
      buildPath: `${OUT_DIR}/web/`,
      files: [
        { destination: "tokens.ts", format: "javascript/esm", options: { minify: true } },
        { destination: "brands.ts", format: "mmt/js/brands" },
      ],
    },
    ios: {
      expand: { typesMap: true, include: ["typography", "shadow"] },
      transforms: [
        "attribute/cti",
        "name/camel",
        "mmt/fontWeight/number",
        "mmt/dimension/unitless",
        "mmt/opacity/ios",
        "mmt/string/quote",
        "mmt/color/ios-gradient",
        "mmt/color/ios",
      ],
      buildPath: `${OUT_DIR}/ios/`,
      files: [
        {
          destination: "CosmosTokens.swift",
          format: "ios-swift/enum.swift",
          options: { className: "CosmosTokens", import: ["SwiftUI"] },
        },
        {
          destination: "LineHeight.swift",
          format: "mmt/ios-line-height-modifier",
        },
        { destination: "CosmosBrand.swift", format: "mmt/ios/brands" },
      ],
    },
    android: {
      expand: { typesMap: true, include: ["typography", "shadow"] },
      transforms: [
        "attribute/cti",
        "name/camel",
        "mmt/fontWeight/number",
        "mmt/dimension/compose",
        "mmt/opacity/compose",
        "mmt/string/quote",
        "mmt/color/android-gradient",
        "mmt/color/android",
      ],
      buildPath: `${OUT_DIR}/android/`,
      files: [
        {
          destination: "CosmosTokens.kt",
          format: "compose/object",
          options: {
            className: "CosmosTokens",
            packageName: "com.makemytrip.cosmos.tokens",
            import: [
              "androidx.compose.ui.geometry.Offset",
              "androidx.compose.ui.graphics.Brush",
              "androidx.compose.ui.graphics.Color",
              "androidx.compose.ui.unit.*",
            ],
          },
        },
        { destination: "CosmosBrand.kt", format: "mmt/android/brands" },
      ],
    },
  },
});

// ---------------------------------------------------------------------- brands ---
// Every brand builds from the same config. The default brand writes the files; the
// others are resolved in memory and compared with it, platform by platform. A token whose
// resolved value differs in any brand is brandable, and only brandable tokens get the
// runtime switch below. The comparison decides, not a list: a brand set overrides a few
// semantic tokens, and every component token that aliases one of them follows.

const SOURCE = JSON.parse(readFileSync("tokens/tokens.json", "utf8"));
const BRANDS = brandsOf(SOURCE);
const DEFAULT_BRAND = BRANDS[0];
const QUIET = { verbosity: "silent", warnings: "disabled" };

/** platform → { tokens: default-brand tokens that vary, values: { brandId: { key: value } } }. */
const brandable = {};

/** A key per token: the path, plus a count for repeats. The layers of an expanded shadow
 * share both name and path until the format numbers them; every brand lists them in the
 * same order, so the count tells them apart. */
const tokenKeys = new WeakMap();
const idOf = (t) => tokenKeys.get(t);
function keyTokens(tokens) {
  const seen = new Map();
  for (const t of tokens) {
    const path = t.path.join(".");
    const n = seen.get(path) ?? 0;
    seen.set(path, n + 1);
    tokenKeys.set(t, n ? `${path}#${n + 1}` : path);
  }
  return tokens;
}
/**
 * The Swift or Kotlin type of each brandable token, read from its emitted value: a solid
 * colour, a quoted font family or a whole-number font weight. Those are the only kinds a
 * brand may change (tokens/brand), and every brand must emit the same kind.
 */
const BRAND_KINDS = [
  { type: "Color", test: (v) => typeof v === "string" && v.startsWith("Color(") },
  { type: "String", test: (v) => typeof v === "string" && /^".*"$/.test(v) },
  { type: "Int", test: (v) => /^\d+$/.test(`${v}`) },
];

function typedBrandTokens(platform) {
  const { tokens, values } = brandable[platform];
  const typed = tokens.map((t) => {
    const kinds = new Set(
      BRANDS.map((brand) => {
        const v = values[brand.id][idOf(t)];
        const kind = BRAND_KINDS.find((k) => k.test(v));
        if (!kind) throw new Error(`${t.path.join(".")} differs between brands but is not a solid colour, font family or font weight (${brand.id}: ${v}).`);
        return kind.type;
      }),
    );
    if (kinds.size > 1) throw new Error(`${t.path.join(".")} is a different kind of value in different brands: ${[...kinds].join(", ")}.`);
    return { token: t, type: [...kinds][0] };
  });
  return { typed, values };
}

const lowerCamel = (name) =>
  name.replace(/[^A-Za-z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toLowerCase());
const upperCamel = (name) => lowerCamel(name).replace(/^./, (c) => c.toUpperCase());
const oneLine = (text) => (text ?? "").replace(/\s+/g, " ").trim();

StyleDictionary.registerFormat({
  name: "mmt/css/variables-brands",
  format: async (args) => {
    const base = await StyleDictionary.hooks.formats["css/variables"](args);
    const { tokens, values } = brandable["web-css"];
    if (!tokens.length) return base;
    const blocks = BRANDS.map((brand) => {
      const lines = tokens.map((t) => `  --${t.name}: ${values[brand.id][idOf(t)]};`);
      return `
/**
 * ${brand.name}: the ${tokens.length} tokens that change with the brand. Set data-brand="${brand.id}"
 * on any element to switch it and everything inside it.
 */
[data-brand="${brand.id}"] {
${lines.join("\n")}
}
`;
    });
    return base + blocks.join("");
  },
});

StyleDictionary.registerFormat({
  name: "mmt/js/brands",
  format: () => {
    const { tokens, values } = brandable["web-js"];
    const brands = BRANDS.map((brand) => {
      const lines = tokens.map((t) => `      ${t.name}: ${JSON.stringify(values[brand.id][idOf(t)])},`);
      return `  ${brand.id}: {\n    name: ${JSON.stringify(brand.name)},\n    tokens: {\n${lines.join("\n")}\n    },\n  },`;
    });
    return `/**
 * Do not edit directly, this file was auto-generated.
 *
 * The tokens that change with the brand, per brand. Every other token is the same in
 * every brand and lives in tokens.ts. In CSS, set data-brand on an element instead.
 */

export const brands = {
${brands.join("\n")}
} as const;

export type BrandId = keyof typeof brands;

export const defaultBrand: BrandId = ${JSON.stringify(DEFAULT_BRAND.id)};
`;
  },
});

StyleDictionary.registerFormat({
  name: "mmt/ios/brands",
  format: ({ file }) => {
    const { typed, values } = typedBrandTokens("ios");
    const tokens = typed.map(({ token }) => token);
    const properties = typed.map(({ token: t, type }) => `    /// ${oneLine(t.description)}\n    public let ${t.name}: ${type}`);
    const instances = BRANDS.map((brand) => {
      const args = [
        `id: ${JSON.stringify(brand.id)}`,
        `name: ${JSON.stringify(brand.name)}`,
        ...tokens.map((t) => `${t.name}: ${values[brand.id][idOf(t)]}`),
      ];
      return `    public static let ${lowerCamel(brand.name)} = CosmosBrand(\n        ${args.join(",\n        ")}\n    )`;
    });
    return `//
// ${file.destination}
//

// Do not edit directly, this file was auto-generated.

import SwiftUI

/// The tokens that change with the brand. Every other token is the same in every brand
/// and stays on \`CosmosTokens\`. Read these from the environment, so one line switches a
/// whole screen:
///
///     MyBizFlow().environment(\\.cosmosBrand, .${lowerCamel(BRANDS.at(-1).name)})
///
///     @Environment(\\.cosmosBrand) private var brand
///     Rectangle().fill(brand.colorBgFillBrand)
public struct CosmosBrand: Identifiable, Sendable {
    public let id: String
    public let name: String

${properties.join("\n\n")}

${instances.join("\n\n")}

    public static let all: [CosmosBrand] = [${BRANDS.map((b) => `.${lowerCamel(b.name)}`).join(", ")}]
}

private struct CosmosBrandKey: EnvironmentKey {
    static let defaultValue = CosmosBrand.${lowerCamel(DEFAULT_BRAND.name)}
}

public extension EnvironmentValues {
    /// The brand of this part of the view hierarchy. Defaults to ${DEFAULT_BRAND.name}.
    var cosmosBrand: CosmosBrand {
        get { self[CosmosBrandKey.self] }
        set { self[CosmosBrandKey.self] = newValue }
    }
}
`;
  },
});

StyleDictionary.registerFormat({
  name: "mmt/android/brands",
  format: () => {
    const { typed, values } = typedBrandTokens("android");
    const tokens = typed.map(({ token }) => token);
    const properties = typed.map(({ token: t, type }) => `  /** ${oneLine(t.description).replaceAll("*/", "* /")} */\n  val ${t.name}: ${type},`);
    const instances = BRANDS.map((brand) => {
      const args = [
        `id = ${JSON.stringify(brand.id)}`,
        `name = ${JSON.stringify(brand.name)}`,
        ...tokens.map((t) => `${t.name} = ${values[brand.id][idOf(t)]}`),
      ];
      return `    val ${upperCamel(brand.name)} = CosmosBrand(\n      ${args.join(",\n      ")},\n    )`;
    });
    return `
// Do not edit directly, this file was auto-generated.

package com.makemytrip.cosmos.tokens

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * The tokens that change with the brand. Every other token is the same in every brand and
 * stays on [CosmosTokens]. Read these from [LocalCosmosBrand], so one line switches a whole
 * screen:
 *
 *     CompositionLocalProvider(LocalCosmosBrand provides CosmosBrand.${upperCamel(BRANDS.at(-1).name)}) { MyBizFlow() }
 *
 *     Box(Modifier.background(LocalCosmosBrand.current.colorBgFillBrand))
 */
@Immutable
data class CosmosBrand(
  val id: String,
  val name: String,
${properties.join("\n")}
) {
  companion object {
${instances.join("\n\n")}

    val all = listOf(${BRANDS.map((b) => upperCamel(b.name)).join(", ")})
  }
}

/** The brand of this part of the composition. Defaults to ${DEFAULT_BRAND.name}. */
val LocalCosmosBrand = staticCompositionLocalOf { CosmosBrand.${upperCamel(DEFAULT_BRAND.name)} }
`;
  },
});

// Formats are registered above, before any instance exists to look them up.
{
  const resolved = await Promise.all(
    BRANDS.map((brand) => new StyleDictionary(configFor(tokensForBrand(SOURCE, brand.set), QUIET))),
  );
  for (const platform of Object.keys(configFor().platforms)) {
    const all = await Promise.all(resolved.map(async (sd) => keyTokens((await sd.getPlatformTokens(platform)).allTokens)));
    const values = Object.fromEntries(
      BRANDS.map((brand, i) => [brand.id, Object.fromEntries(all[i].map((t) => [idOf(t), t.value]))]),
    );
    const differs = (t) =>
      BRANDS.some((brand) => JSON.stringify(values[brand.id][idOf(t)]) !== JSON.stringify(t.value));
    brandable[platform] = { tokens: all[0].filter(differs), values };
  }
}

const sd = new StyleDictionary(configFor(tokensForBrand(SOURCE, DEFAULT_BRAND.set)));
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
