/**
 * Reads tokens/tokens.json, resolves every {reference}, and emits the shape the
 * docs site renders. Also copies dist/web/tokens.css so the site is styled with
 * the tokens it documents.
 *
 * Reference resolution, per-platform naming, and contrast math come from
 * scripts/token-model.mjs, shared with the root build — a mismatch between the
 * docs site and the generated output is not possible by construction. Names are
 * still validated against dist/ below as a second check on the shared rules.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadTokens,
  makeResolver,
  referenceOf,
  cssVar,
  camel,
  jsAccessor,
  names,
  contrastRatio,
} from "../../scripts/token-model.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const outDir = join(here, "..", "data");

const { source, root } = loadTokens(repoRoot);
const resolve = makeResolver(root);

function copyValues(parts) {
  const n = names(parts);
  return { css: `var(${n.css})`, js: n.js, swift: n.swift, kotlin: n.kotlin };
}

// ----------------------------------------------------------------- build ----

function makeToken(parts, raw) {
  const value = resolve(raw.value);
  const mmt = raw.$extensions?.mmt ?? {};
  return {
    path: parts.join("."),
    key: parts[parts.length - 1],
    // Font weights resolve to numbers; the docs treat every scalar as a string.
    value: typeof value === "number" ? String(value) : value,
    type: raw.type,
    reference: referenceOf(raw.value),
    description: raw.description ?? null,
    status: mmt.status ?? "stable",
    replacedBy: mmt.replacedBy ?? null,
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
  const [, hue, step] = key.match(/^exp-([a-z]+)-(\d+)$/) ?? [];
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

/** `semantic.motion.duration.fast` — one level deeper than the flat scales. */
const semanticNested = (group, sub) =>
  Object.entries(source.semantic[group][sub]).map(([key, raw]) =>
    makeToken([group, sub, key], raw),
  );

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
    strokeWidth: collect("strokeWidth"),
    duration: collect("duration"),
    easing: collect("easing"),
  },
  semantic: {
    colorGroups: semanticColorGroups,
    expressive,
    typography,
    space: semanticScale("space"),
    radius: semanticScale("radius"),
    icon: semanticScale("icon"),
    borderWidth: semanticScale("borderWidth"),
    focusRing: semanticScale("focusRing"),
    motionDuration: semanticNested("motion", "duration"),
    motionEasing: semanticNested("motion", "easing"),
  },
};

// Contrast pairings: each text token against the surface it is designed for.
const colorValue = (key) => resolve(source.semantic.color[key]?.value);

function backgroundFor(key) {
  const strong = key.match(/^text-([a-z]+)-on-bg-fill-strong$/);
  if (strong) return `bg-fill-${strong[1]}-strong`;
  const subtle = key.match(/^text-([a-z]+)-on-bg-fill-subtle$/);
  if (subtle) return `bg-fill-${subtle[1]}-subtle`;
  if (key === "text-brand-on-bg-fill") return "bg-fill-brand";
  if (key.startsWith("text-inverse")) return "bg-surface-inverse";
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
  }
  mkdirSync(join(here, "..", "app"), { recursive: true });
  writeFileSync(join(here, "..", "app", "tokens.css"), css);
} else {
  console.warn("⚠ dist/web/tokens.css not found — run `npm run build:tokens` in the repo root.");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "tokens.json"), `${JSON.stringify(data, null, 2)}\n`);

const total =
  countTokens(palettes) +
  countTokens(expressive) +
  semanticColorGroups.reduce((n, g) => n + g.tokens.length, 0) +
  typography.reduce((n, g) => n + g.sizes.length * 3, 0) +
  [...Object.values(data.primitives), ...Object.values(data.semantic)]
    .filter((value) => Array.isArray(value) && value !== palettes && value !== expressive)
    .filter((list) => !list.some((entry) => entry.steps || entry.sizes || entry.tokens))
    .reduce((n, list) => n + list.length, 0);

// The manifest is the source of truth for how many tokens exist. If the docs
// site documents fewer, a group has been added to tokens.json without being
// surfaced here — which is how motion and borderWidth went missing before.
const manifestPath = join(repoRoot, "dist", "tokens.json");
if (existsSync(manifestPath)) {
  const manifestCount = Object.keys(JSON.parse(readFileSync(manifestPath, "utf8")).tokens).length;
  if (total !== manifestCount) {
    console.warn(
      `⚠ documenting ${total} tokens but dist/tokens.json has ${manifestCount} — ` +
        `a token group is missing from this script's data shape.`,
    );
  }
}

console.log(`✓ Generated data/tokens.json — ${total} tokens documented.`);
