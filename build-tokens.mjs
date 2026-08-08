import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

/**
 * Build platform-specific code from tokens/tokens.json (Tokens Studio export).
 *
 * Pipeline:
 *   tokens-studio preprocessor  -> hoists `primitives`/`semantic` sets to root
 *                                  (so `{fontFamily.x}` refs resolve) and aligns types
 *   mmt/rename-negative         -> `-12` keys become `minus12` (avoids name collisions)
 *   expand                      -> composite `typography` tokens become individual
 *                                  fontFamily / fontWeight / fontSize / lineHeight / letterSpacing
 *
 * Outputs: web (CSS vars + ESM), iOS (SwiftUI Swift enum), Android (Compose Kotlin object).
 */

await register(StyleDictionary, { excludeParentKeys: true });

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

/** `-12` style object keys collide with `12` once camel/kebab-cased; rename them. */
function renameNegativeKeys(node) {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
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

StyleDictionary.registerPreprocessor({
  name: "mmt/rename-negative",
  preprocessor: (dictionary) => renameNegativeKeys(dictionary),
});

StyleDictionary.registerPreprocessor({
  name: "mmt/resolve-gradient-colors",
  preprocessor: (dictionary) => resolveGradientColors(structuredClone(dictionary)),
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
    ///   - lineHeight: Total line-box height, e.g. \`CosmosTokens.bodyMdRomanLineHeight\`.
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
    ///   - lineHeight: Total line-box height, e.g. \`CosmosTokens.bodyMdRomanLineHeight\`.
    ///   - fontName: Token font family, e.g. \`CosmosTokens.bodyMdRomanFontFamily\`.
    ///   - fontSize: Token font size, e.g. \`CosmosTokens.bodyMdRomanFontSize\`.
    func lineHeight(_ lineHeight: CGFloat, fontName: String, fontSize: CGFloat) -> some View {
        let uiFont = UIFont(name: fontName, size: fontSize)
            ?? .systemFont(ofSize: fontSize)
        return self.lineHeight(lineHeight, for: uiFont)
    }
}
`,
});

const sd = new StyleDictionary({
  source: ["tokens/tokens.json"],
  preprocessors: ["tokens-studio", "mmt/rename-negative", "mmt/resolve-gradient-colors"],
  expand: { typesMap: true },
  platforms: {
    "web-css": {
      transforms: ["attribute/cti", "mmt/fontWeight/number", "name/kebab", "fontFamily/css"],
      buildPath: "dist/web/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
    "web-js": {
      transforms: ["attribute/cti", "mmt/fontWeight/number", "name/camel"],
      buildPath: "dist/web/",
      files: [
        { destination: "tokens.ts", format: "javascript/esm", options: { minify: true } },
      ],
    },
    ios: {
      transforms: [
        "attribute/cti",
        "name/camel",
        "mmt/fontWeight/number",
        "mmt/dimension/unitless",
        "mmt/string/quote",
        "mmt/color/ios-gradient",
        "mmt/color/ios",
      ],
      buildPath: "dist/ios/",
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
      ],
    },
    android: {
      transforms: [
        "attribute/cti",
        "name/camel",
        "mmt/fontWeight/number",
        "mmt/dimension/compose",
        "mmt/string/quote",
        "mmt/color/android-gradient",
        "mmt/color/android",
      ],
      buildPath: "dist/android/",
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
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
