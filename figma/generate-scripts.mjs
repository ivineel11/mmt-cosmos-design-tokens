/**
 * Generate the Figma Plugin API scripts that build the Button component in the
 * Cosmos Design Tokens file.
 *
 *   node figma/generate-scripts.mjs
 *
 * Writes numbered, independently-runnable scripts to figma/generated/. Each one is
 * pasted into the Figma MCP `use_figma` tool in order. They are written this way
 * rather than issued as ad-hoc calls because the variant matrix is large: a failure
 * midway has to be resumable without redoing the steps that already landed.
 *
 * Every script is idempotent — it looks up its targets by name, updates what exists
 * and creates only what doesn't. Re-running the whole sequence against a
 * half-finished file converges rather than duplicating.
 *
 * Variable values are derived from tokens/tokens.json, never hand-transcribed, so
 * Figma and code cannot drift apart. The generator resolves the alias graph itself:
 * component -> semantic -> primitive.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ROOT = new URL("..", import.meta.url);
const OUT = new URL("./generated/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const tokens = JSON.parse(readFileSync(new URL("tokens/tokens.json", ROOT), "utf8"));

// ---------------------------------------------------------------------------
// Token flattening
// ---------------------------------------------------------------------------

/** Flatten a token set to `{ 'color/brand/800': token }`, matching Figma's naming. */
function flatten(set) {
  const out = {};
  (function walk(node, path) {
    for (const [key, value] of Object.entries(node)) {
      const next = path ? `${path}/${key}` : key;
      if (value && typeof value === "object" && !("value" in value)) walk(value, next);
      else out[next] = value;
    }
  })(set, "");
  return out;
}

const primitives = flatten(tokens.primitives);
const semantic = flatten(tokens.semantic);
const component = flatten(tokens.component);

/** `{color.brand.800}` -> `color/brand/800`. Returns null for non-references. */
const refTarget = (value) => {
  const match = typeof value === "string" && value.match(/^\{([^}]+)\}$/);
  return match ? match[1].replace(/\./g, "/") : null;
};

const hexToRgb = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const round = (n) => Number((n / 255).toFixed(6));
  return {
    r: round(parseInt(h.slice(0, 2), 16)),
    g: round(parseInt(h.slice(2, 4), 16)),
    b: round(parseInt(h.slice(4, 6), 16)),
    a: h.length === 8 ? round(parseInt(h.slice(6, 8), 16)) : 1,
  };
};

// ---------------------------------------------------------------------------
// Scopes — never ALL_SCOPES. A `button/*` token that shows up in every property
// picker is worse than no token, because it invites the wrong binding.
// ---------------------------------------------------------------------------

function scopesFor(name, type) {
  // Scope off the leaf, so `button/bg-primary-default` and `color/bg-fill-brand`
  // classify the same way regardless of which collection they live in.
  const leaf = name.split("/").pop();

  if (type === "color") {
    if (leaf === "transparent") return ["FRAME_FILL", "SHAPE_FILL", "STROKE_COLOR"];
    if (leaf === "focus-ring" || leaf.startsWith("border")) return ["STROKE_COLOR"];
    if (leaf.startsWith("label") || leaf.startsWith("text")) return ["TEXT_FILL"];
    if (leaf.startsWith("icon")) return ["TEXT_FILL", "SHAPE_FILL"];
    return ["FRAME_FILL", "SHAPE_FILL"];
  }

  if (leaf.includes("min-height") || leaf.includes("icon-size")) return ["WIDTH_HEIGHT"];
  if (leaf.includes("radius")) return ["CORNER_RADIUS"];
  if (leaf.includes("border-width") || leaf.includes("focus-ring-width")) return ["STROKE_FLOAT"];
  return ["GAP"];
}

/** Primitives stay out of every picker — product work binds semantics, not raws. */
const PRIMITIVE_SCOPES = [];

const camel = (name) =>
  name
    .split(/[/-]/)
    .filter(Boolean)
    .map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join("");

// Mirrors Style Dictionary's `name/kebab`, which splits camelCase too — the
// primitive `borderWidth/2` ships as `--border-width-2`, not `--borderWidth-2`.
const kebab = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\//g, "-")
    .toLowerCase();

/** Code syntax has to name the real generated symbols, or Dev Mode lies. */
function codeSyntaxFor(name) {
  return {
    WEB: `var(--${kebab(name)})`,
    ANDROID: `CosmosTokens.${camel(name)}`,
    iOS: `CosmosTokens.${camel(name)}`,
  };
}

// ---------------------------------------------------------------------------
// Variable specs
// ---------------------------------------------------------------------------

const isFloatToken = (token) =>
  ["borderRadius", "spacing", "sizing", "borderWidth", "fontSize", "lineHeight"].includes(token.type);

/** Only the primitives the button introduced — the other 221 already exist in Figma. */
const NEW_PRIMITIVES = ["color/alpha/transparent", "borderWidth/0", "borderWidth/1", "borderWidth/2"];

const primitiveSpecs = NEW_PRIMITIVES.map((name) => {
  const token = primitives[name];
  const isColor = token.type === "color";
  return {
    name,
    collection: "primitives",
    resolvedType: isColor ? "COLOR" : "FLOAT",
    value: isColor ? hexToRgb(token.value) : parseFloat(token.value),
    scopes: PRIMITIVE_SCOPES,
    codeSyntax: codeSyntaxFor(name),
  };
});

// The 18 semantic roles the button introduced. Listed explicitly rather than diffed
// against Figma so the script stays deterministic across runs.
const NEW_SEMANTIC = new Set([
  "color/transparent",
  "color/bg-fill-brand-hover",
  "color/bg-fill-brand-pressed",
  "color/bg-fill-warning-strong-hover",
  "color/bg-fill-warning-strong-pressed",
  "color/bg-surface-brand-hover",
  "color/bg-surface-brand-pressed",
  "color/bg-surface-warning-hover",
  "color/bg-surface-warning-pressed",
  "color/border-brand-hover",
  "color/border-brand-pressed",
  "color/border-warning-strong",
  "color/border-warning-strong-hover",
  "color/border-warning-strong-pressed",
  "color/text-brand-hover",
  "color/text-brand-pressed",
  "color/text-warning-hover",
  "color/text-warning-pressed",
]);

const semanticSpecs = Object.entries(semantic)
  .filter(([name]) => NEW_SEMANTIC.has(name))
  .map(([name, token]) => ({
    name,
    collection: "semantic",
    resolvedType: token.type === "color" ? "COLOR" : "FLOAT",
    aliasOf: refTarget(token.value),
    aliasCollection: "primitives",
    scopes: scopesFor(name, token.type),
    codeSyntax: codeSyntaxFor(name),
  }));

const componentSpecs = Object.entries(component).map(([name, token]) => {
  const target = refTarget(token.value);
  // Nearly every button token aliases a semantic role, but the two stroke widths
  // reach past it to `borderWidth/*` — Cosmos has no semantic border-width ramp,
  // and inventing a one-off `border-width/thin` role for a single consumer would
  // be worse than the exception. Resolve the tier from where the target lives.
  const aliasCollection = target in semantic ? "semantic" : target in primitives ? "primitives" : null;
  if (target && !aliasCollection) throw new Error(`Unresolvable alias for ${name}: {${target}}`);
  return {
    name,
    collection: "component",
    resolvedType: token.type === "color" ? "COLOR" : "FLOAT",
    aliasOf: target,
    aliasCollection,
    scopes: scopesFor(name, token.type),
    codeSyntax: codeSyntaxFor(name),
  };
});

// ---------------------------------------------------------------------------
// Script emission
// ---------------------------------------------------------------------------

const upsertHelpers = `
// Look up or create a collection by name. Never creates a duplicate.
async function getCollection(name, create) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  const found = all.find(c => c.name === name);
  if (found) return found;
  if (!create) throw new Error('Missing collection: ' + name);
  return figma.variables.createVariableCollection(name);
}

// Create-or-update a single variable. Idempotent by (collection, name).
async function upsert(spec, collections, index) {
  const collection = collections[spec.collection];
  const existing = index[spec.collection + '::' + spec.name];
  const variable = existing || figma.variables.createVariable(spec.name, collection, spec.resolvedType);
  const modeId = collection.modes[0].modeId;

  if (spec.aliasOf) {
    const target = index[spec.aliasCollection + '::' + spec.aliasOf];
    if (!target) throw new Error('Alias target not found: ' + spec.aliasCollection + '/' + spec.aliasOf + ' (for ' + spec.name + ')');
    variable.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: target.id });
  } else {
    variable.setValueForMode(modeId, spec.value);
  }

  variable.scopes = spec.scopes;
  for (const platform of Object.keys(spec.codeSyntax)) {
    variable.setVariableCodeSyntax(platform, spec.codeSyntax[platform]);
  }
  index[spec.collection + '::' + spec.name] = variable;
  return { name: spec.name, id: variable.id, created: !existing };
}

// Index every local variable by 'collectionName::variableName' so aliases resolve
// by name rather than by an ID guessed from a previous run.
async function buildIndex(collections) {
  const byId = {};
  for (const key of Object.keys(collections)) byId[collections[key].id] = key;
  const index = {};
  for (const variable of await figma.variables.getLocalVariablesAsync()) {
    const collectionName = byId[variable.variableCollectionId];
    if (collectionName) index[collectionName + '::' + variable.name] = variable;
  }
  return index;
}
`.trim();

/**
 * Emit specs as `[name, aliasOf, scopeKey]` triples rather than expanded objects.
 * Scopes and code syntax are derivable, and the expanded form pushed the 81-variable
 * colour script close to the tool's 50k character ceiling for no benefit.
 */
const SCOPE_KEYS = {
  F: ["FRAME_FILL", "SHAPE_FILL"],
  T: ["TEXT_FILL"],
  S: ["STROKE_COLOR"],
  A: ["FRAME_FILL", "SHAPE_FILL", "STROKE_COLOR"],
  W: ["WIDTH_HEIGHT"],
  R: ["CORNER_RADIUS"],
  L: ["STROKE_FLOAT"],
  G: ["GAP"],
  N: [],
};

const scopeKeyFor = (scopes) =>
  Object.keys(SCOPE_KEYS).find((k) => SCOPE_KEYS[k].join() === scopes.join()) ?? "G";

function emitVariableScript(file, header, specs, opts = {}) {
  const needed = [...new Set(specs.map((s) => s.collection).concat(specs.map((s) => s.aliasCollection).filter(Boolean)))];
  const rows = specs.map((s) => [
    s.name,
    s.aliasOf ?? s.value,
    scopeKeyFor(s.scopes),
    s.resolvedType === "COLOR" ? "C" : "F",
    s.aliasCollection ?? "",
    s.collection,
  ]);

  const body = `
${header}

${upsertHelpers}

const SCOPES = ${JSON.stringify(SCOPE_KEYS)};

// [name, aliasTargetName | rawValue, scopeKey, COLOR|FLOAT, aliasCollection, collection]
const ROWS = ${JSON.stringify(rows)};

const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\\//g, '-').toLowerCase();
const camel = (n) => n.split(/[/-]/).filter(Boolean).map((p, i) => i ? p[0].toUpperCase() + p.slice(1) : p).join('');

const SPECS = ROWS.map(([name, target, scopeKey, type, aliasCollection, collection]) => ({
  name,
  collection,
  resolvedType: type === 'C' ? 'COLOR' : 'FLOAT',
  aliasOf: aliasCollection ? target : null,
  aliasCollection,
  value: aliasCollection ? null : target,
  scopes: SCOPES[scopeKey],
  codeSyntax: {
    WEB: 'var(--' + kebab(name) + ')',
    ANDROID: 'CosmosTokens.' + camel(name),
    iOS: 'CosmosTokens.' + camel(name),
  },
}));

const collections = {};
${needed
  .map((n) => `collections[${JSON.stringify(n)}] = await getCollection(${JSON.stringify(n)}, ${opts.create === n});`)
  .join("\n")}

const index = await buildIndex(collections);

const results = [];
for (const spec of SPECS) results.push(await upsert(spec, collections, index));

return {
  collectionIds: Object.keys(collections).reduce((acc, k) => (acc[k] = collections[k].id, acc), {}),
  total: results.length,
  created: results.filter(r => r.created).length,
  updated: results.filter(r => !r.created).length,
  variableIds: results.reduce((acc, r) => (acc[r.name] = r.id, acc), {}),
};
`.trim();
  writeFileSync(new URL(file, OUT), body + "\n");
  return body.length;
}

const sizes = emitVariableScript(
  "01-foundation-variables.js",
  "// Step 1 — primitives + semantic interaction states the button depends on.",
  [...primitiveSpecs, ...semanticSpecs],
);

const colorSpecs = componentSpecs.filter((s) => s.resolvedType === "COLOR");
const dimensionSpecs = componentSpecs.filter((s) => s.resolvedType === "FLOAT");

const sizes2 = emitVariableScript(
  "02-button-colour-variables.js",
  "// Step 2 — component collection + the button colour matrix (aliases semantic).",
  colorSpecs,
  { create: "component" },
);

const sizes3 = emitVariableScript(
  "03-button-dimension-variables.js",
  "// Step 3 — button geometry: radius, min-height, padding, gap, icon size, focus ring.",
  dimensionSpecs,
  { create: "component" },
);

console.log(
  [
    `01-foundation-variables.js        ${primitiveSpecs.length + semanticSpecs.length} vars, ${sizes} chars`,
    `02-button-colour-variables.js     ${colorSpecs.length} vars, ${sizes2} chars`,
    `03-button-dimension-variables.js  ${dimensionSpecs.length} vars, ${sizes3} chars`,
  ].join("\n"),
);
