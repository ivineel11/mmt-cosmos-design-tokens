/**
 * Reads tokens/tokens.json, resolves every {reference}, and emits the shape the
 * docs site renders. Also copies dist/web/tokens.css so the site is styled with
 * the tokens it documents.
 *
 * Platform names mirror the Style Dictionary transforms in build-tokens.mjs and
 * are validated against dist/ output — a mismatch means the naming rules here
 * have drifted from the build.
 *
 * `--check` runs the same validation without writing anything and exits non-zero
 * on drift; the repository linter uses it.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CHECK = process.argv.includes("--check");
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const outDir = join(here, "..", "data");

const source = JSON.parse(readFileSync(join(repoRoot, "tokens", "tokens.json"), "utf8"));

/** Both token sets are hoisted to the root so cross-set references resolve. */
const root = {};
for (const setName of source.$metadata?.tokenSetOrder ?? ["primitives", "semantic"]) {
  for (const [group, value] of Object.entries(source[setName])) {
    root[group] = { ...(root[group] ?? {}), ...value };
  }
}

const isToken = (node) => node && typeof node === "object" && "value" in node;
const REFERENCE = /^\{([^}]+)\}$/;

function lookup(path) {
  return path.split(".").reduce((node, key) => (node == null ? node : node[key]), root);
}

function resolve(value, trail = []) {
  if (typeof value === "string") {
    const match = value.match(REFERENCE);
    if (!match) return value;
    const path = match[1];
    if (trail.includes(path)) throw new Error(`Circular reference: ${[...trail, path].join(" → ")}`);
    const target = lookup(path);
    if (!isToken(target)) throw new Error(`Unresolved reference {${path}}`);
    return resolve(target.value, [...trail, path]);
  }
  if (Array.isArray(value)) return value.map((item) => resolve(item, trail));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, trail)]));
  }
  return value;
}

const referenceOf = (value) =>
  typeof value === "string" && REFERENCE.test(value) ? value.slice(1, -1) : null;

// ---------------------------------------------------------------- naming ----

/** `-12` collides with the kebab separator, so the build renames it. */
const normalizeSegment = (segment) =>
  segment.startsWith("-") ? `minus${segment.slice(1)}` : segment;

const kebab = (segment) =>
  normalizeSegment(segment)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

function camel(parts) {
  const words = parts.flatMap((part) => normalizeSegment(part).split("-"));
  return words
    .map((word, index) => {
      if (index === 0) return word;
      // Leading digits can't be capitalized, so `2xs` stays lowercase.
      return /^[a-z]/.test(word) ? word[0].toUpperCase() + word.slice(1) : word;
    })
    .join("");
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const jsAccessor = (parts) =>
  parts.reduce(
    (acc, part) => (IDENTIFIER.test(part) ? `${acc}.${part}` : `${acc}[${JSON.stringify(part)}]`),
    "tokens",
  );

const cssVar = (parts) => `--${parts.map(kebab).join("-")}`;

function names(parts) {
  const flat = camel(parts);
  return {
    css: cssVar(parts),
    js: jsAccessor(parts),
    swift: `CosmosTokens.${flat}`,
    kotlin: `CosmosTokens.${flat}`,
  };
}

function copyValues(parts) {
  const n = names(parts);
  return { css: `var(${n.css})`, js: n.js, swift: n.swift, kotlin: n.kotlin };
}

// -------------------------------------------------------------- contrast ----

function channel(component) {
  const c = component / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(foreground, background) {
  const [a, b] = [luminance(foreground), luminance(background)];
  const [light, dark] = a > b ? [a, b] : [b, a];
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}

// ----------------------------------------------------------------- build ----

function makeToken(parts, raw) {
  const value = resolve(raw.value);
  return {
    path: parts.join("."),
    key: parts[parts.length - 1],
    // Font weights resolve to numbers; the docs treat every scalar as a string.
    value: typeof value === "number" ? String(value) : value,
    type: raw.type,
    reference: referenceOf(raw.value),
    names: names(parts),
    copy: copyValues(parts),
  };
}

const collect = (group, prefix = [group]) =>
  Object.entries(source.primitives[group] ?? {}).map(([key, raw]) =>
    makeToken([...prefix, key], raw),
  );

// Primitive palettes: color.{palette}.{step}
const palettes = Object.entries(source.primitives.color).map(([palette, steps]) => ({
  name: palette,
  steps: Object.entries(steps).map(([step, raw]) => makeToken(["color", palette, step], raw)),
}));

// Semantic colors split into role groups; `exp-*` aliases are their own section.
const SEMANTIC_ROLES = [
  { id: "bg", title: "Background", description: "Page-level background.", match: (k) => k === "bg" },
  {
    id: "surface",
    title: "Surface",
    description: "Elevated and grouped surfaces that sit on the page background.",
    match: (k) => k.startsWith("bg-surface"),
  },
  {
    id: "fill",
    title: "Fill",
    description: "Interactive and emphasis fills for buttons, badges, and banners. Strong and subtle pairs carry different text tokens.",
    match: (k) => k.startsWith("bg-fill"),
  },
  {
    id: "text",
    title: "Text",
    description: "Foreground text. The on-bg-fill variants are contrast-safe partners for the matching fill.",
    match: (k) => k.startsWith("text-"),
  },
  {
    id: "border",
    title: "Border",
    description: "Strokes, dividers, and focus rings.",
    match: (k) => k.startsWith("border"),
  },
  {
    id: "icon",
    title: "Icon",
    description: "Icon fills, kept separate from text so icon weight can be tuned independently.",
    match: (k) => k.startsWith("icon"),
  },
];

const semanticColorEntries = Object.entries(source.semantic.color);
const expressiveEntries = semanticColorEntries.filter(([key]) => key.startsWith("exp-"));
const roleEntries = semanticColorEntries.filter(([key]) => !key.startsWith("exp-"));

const semanticColorGroups = SEMANTIC_ROLES.map((role) => ({
  id: role.id,
  title: role.title,
  description: role.description,
  tokens: roleEntries
    .filter(([key]) => role.match(key))
    .map(([key, raw]) => makeToken(["color", key], raw)),
}));

const assignedPaths = new Set(semanticColorGroups.flatMap((g) => g.tokens.map((t) => t.path)));
const unassigned = roleEntries.filter(([key]) => !assignedPaths.has(`color.${key}`));
if (unassigned.length > 0) {
  semanticColorGroups.push({
    id: "other",
    title: "Other",
    description: "Semantic colors that do not match a known role prefix.",
    tokens: unassigned.map(([key, raw]) => makeToken(["color", key], raw)),
  });
}

// exp-{hue}-{step} regrouped into palettes
const expressive = [];
for (const [key, raw] of expressiveEntries) {
  const [, hue] = key.match(/^exp-([a-z]+)-(\d+)$/) ?? [];
  if (!hue) continue;
  let palette = expressive.find((p) => p.name === `exp-${hue}`);
  if (!palette) {
    palette = { name: `exp-${hue}`, steps: [] };
    expressive.push(palette);
  }
  palette.steps.push(makeToken(["color", key], raw));
}

// Typography composites: {group}.{size}.{weight}
const TYPE_GROUPS = [
  { id: "headline", title: "Headline", description: "Highest content hierarchy — page and section titles that establish structure." },
  { id: "title", title: "Title", description: "Cards, panels, modules, and list headers. Names a contained block rather than the page." },
  { id: "body", title: "Body", description: "Reading text for paragraphs, descriptions, and supporting copy." },
  { id: "label", title: "Label", description: "UI chrome for controls and short identifiers, optimized for scanning over reading." },
];

const typography = TYPE_GROUPS.map((group) => ({
  ...group,
  sizes: Object.entries(source.semantic[group.id]).map(([size, weights]) => {
    const variants = Object.entries(weights).map(([weight, raw]) => {
      const parts = [group.id, size, weight];
      const resolved = resolve(raw.value);
      return {
        path: parts.join("."),
        weightKey: weight,
        value: resolved,
        references: Object.fromEntries(
          Object.entries(raw.value).map(([property, ref]) => [property, referenceOf(ref)]),
        ),
        // Composites expand into one CSS variable per property.
        names: {
          css: `${cssVar(parts)}-*`,
          js: jsAccessor(parts),
          swift: `CosmosTokens.${camel(parts)}*`,
          kotlin: `CosmosTokens.${camel(parts)}*`,
        },
        copy: {
          css: ["font-family", "font-weight", "font-size", "line-height"]
            .map((property) => `${property}: var(${cssVar(parts)}-${property});`)
            .join("\n"),
          js: jsAccessor(parts),
          swift: ["FontFamily", "FontWeight", "FontSize", "LineHeight"]
            .map((property) => `CosmosTokens.${camel(parts)}${property}`)
            .join("\n"),
          kotlin: ["FontFamily", "FontWeight", "FontSize", "LineHeight"]
            .map((property) => `CosmosTokens.${camel(parts)}${property}`)
            .join("\n"),
        },
      };
    });
    return {
      size,
      fontSize: variants[0].value.fontSize,
      lineHeight: variants[0].value.lineHeight,
      variants,
    };
  }),
}));

const semanticScale = (group) =>
  Object.entries(source.semantic[group]).map(([key, raw]) => makeToken([group, key], raw));

const data = {
  meta: {
    generatedAt: new Date().toISOString(),
    source: "tokens/tokens.json",
  },
  primitives: {
    palettes,
    fontFamily: collect("fontFamily"),
    fontWeight: collect("fontWeight"),
    fontSize: collect("fontSize"),
    lineHeight: collect("lineHeight"),
    spacing: collect("spacing"),
    borderRadius: collect("borderRadius"),
    iconSize: collect("iconSize"),
  },
  semantic: {
    colorGroups: semanticColorGroups,
    expressive,
    typography,
    space: semanticScale("space"),
    radius: semanticScale("radius"),
    icon: semanticScale("icon"),
  },
};

// Every token in every set, flat, for consumers that list tokens rather than render
// specimens (the Storybook token tables). Composites keep their resolved object.
const COMPOSITE_PROPERTIES = ["font-family", "font-weight", "font-size", "line-height"];
const flatten = (set, node, prefix = []) =>
  Object.entries(node).flatMap(([key, raw]) => {
    const parts = [...prefix, key];
    if (!isToken(raw)) return flatten(set, raw, parts);
    const token = { set, ...makeToken(parts, raw), description: raw.description ?? null };
    // Swift and Kotlin expand composites into one member per property (typography) or
    // per layer and property (shadows), so there is no single native symbol to name.
    const native = (members) => {
      const list = members.map((member) => `CosmosTokens.${camel(parts)}${member}`).join("\n");
      token.names = { ...token.names, swift: `CosmosTokens.${camel(parts)}*`, kotlin: `CosmosTokens.${camel(parts)}*` };
      token.copy = { ...token.copy, swift: list, kotlin: list };
    };
    if (raw.type === "typography") {
      token.names = { ...token.names, css: `${cssVar(parts)}-*` };
      token.copy = {
        ...token.copy,
        css: COMPOSITE_PROPERTIES.map((p) => `${p}: var(${cssVar(parts)}-${p});`).join("\n"),
      };
      native(["FontFamily", "FontWeight", "FontSize", "LineHeight"]);
    }
    // Resolved, so a component shadow that aliases a semantic one expands too.
    if (raw.type === "boxShadow" && Array.isArray(token.value)) {
      native(token.value.flatMap((_, i) => ["OffsetX", "OffsetY", "Blur", "Color"].map((p) => `${i + 1}${p}`)));
    }
    return [token];
  });

data.all = (source.$metadata?.tokenSetOrder ?? ["primitives", "semantic", "component"]).flatMap(
  (set) => flatten(set, source[set]),
);

// Contrast pairings: each text token against the surface it is designed for.
const colorValue = (key) => resolve(source.semantic.color[key]?.value);

function backgroundFor(key) {
  // text-{intent}-on-{bg-fill|bg-surface}{-suffix} names its background, the same
  // pairing the tokens/contrast lint rule checks: text-info-on-bg-surface-hover
  // sits on bg-surface-info-hover, text-brand-on-bg-fill on bg-fill-brand.
  const on = key.match(/^text-([a-z]+)-on-(bg-fill|bg-surface)(-[a-z-]+)?$/);
  if (on) {
    // A background split into -strong/-subtle keeps one on-* text role; measure the
    // stronger variant, the harder of the two for the text to pass on.
    const bg = `${on[2]}-${on[1]}${on[3] ?? ""}`;
    return source.semantic.color[bg] || !source.semantic.color[`${bg}-strong`] ? bg : `${bg}-strong`;
  }
  // Any -inverse text role sits on the dark inverse surface, as in the tokens/contrast lint rule:
  // text-inverse, text-link-inverse, text-brand-inverse-hover, text-warning-inverse.
  if (/-inverse(-|$)/.test(key)) return "bg-surface-inverse";
  return "bg";
}

data.contrastPairs = roleEntries
  .filter(([key]) => key.startsWith("text-"))
  .map(([key]) => {
    const backgroundKey = backgroundFor(key);
    const foreground = colorValue(key);
    const background = colorValue(backgroundKey);
    if (!foreground || !background) return null;
    const ratio = contrastRatio(foreground, background);
    return {
      text: { path: `color.${key}`, value: foreground },
      background: { path: `color.${backgroundKey}`, value: background },
      ratio,
      aa: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaa: ratio >= 7,
    };
  })
  .filter(Boolean);

// Attach the ratio to text tokens so it can be shown inline on the swatch.
const ratioByPath = new Map(data.contrastPairs.map((pair) => [pair.text.path, pair]));
for (const group of data.semantic.colorGroups) {
  for (const token of group.tokens) {
    const pair = ratioByPath.get(token.path);
    if (pair) token.contrast = { ratio: pair.ratio, against: pair.background.path, aa: pair.aa, aaa: pair.aaa };
  }
}

const countTokens = (nodes) => nodes.reduce((total, node) => total + node.steps.length, 0);
data.meta.stats = [
  { label: "Palettes", value: palettes.length },
  { label: "Swatches", value: countTokens(palettes) },
  { label: "Semantics", value: semanticColorGroups.reduce((n, g) => n + g.tokens.length, 0) },
  { label: "Expressive", value: countTokens(expressive) },
  { label: "Type styles", value: typography.reduce((n, g) => n + g.sizes.length * 3, 0) },
  { label: "Spacing steps", value: data.primitives.spacing.length },
];

// ------------------------------------------------------------- validation ---

const cssPath = join(repoRoot, "dist", "web", "tokens.css");
if (existsSync(cssPath)) {
  const css = readFileSync(cssPath, "utf8");
  const declared = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
  const expected = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    if (typeof node.names?.css === "string") {
      if (node.names.css.endsWith("-*")) {
        const base = node.names.css.slice(0, -2);
        for (const property of ["font-family", "font-weight", "font-size", "line-height"]) {
          expected.add(`${base}-${property}`);
        }
      } else {
        expected.add(node.names.css);
      }
    }
    Object.values(node).forEach(walk);
  };
  walk(data);
  const missing = [...expected].filter((name) => !declared.has(name));
  if (missing.length > 0) {
    console.warn(
      `⚠ ${missing.length} generated CSS names are absent from dist/web/tokens.css (naming rules may have drifted):\n  ${missing.slice(0, 10).join("\n  ")}`,
    );
    if (CHECK) process.exitCode = 1;
  }
  if (!CHECK) {
    mkdirSync(join(here, "..", "app"), { recursive: true });
    writeFileSync(join(here, "..", "app", "tokens.css"), css);
  }
} else {
  console.warn("⚠ dist/web/tokens.css not found — run `npm run build:tokens` in the repo root.");
  if (CHECK) process.exitCode = 1;
}

if (CHECK) process.exit();

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "tokens.json"), `${JSON.stringify(data, null, 2)}\n`);

const total =
  countTokens(palettes) +
  countTokens(expressive) +
  semanticColorGroups.reduce((n, g) => n + g.tokens.length, 0) +
  typography.reduce((n, g) => n + g.sizes.length * 3, 0) +
  [data.primitives.fontFamily, data.primitives.fontWeight, data.primitives.fontSize,
   data.primitives.lineHeight, data.primitives.spacing, data.primitives.borderRadius,
   data.primitives.iconSize, data.semantic.space, data.semantic.radius, data.semantic.icon]
    .reduce((n, list) => n + list.length, 0);

console.log(`✓ Generated data/tokens.json — ${total} tokens documented.`);
