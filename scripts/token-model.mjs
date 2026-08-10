/**
 * Shared token model: reference resolution, per-platform naming, and contrast
 * math. Imported by both `build-tokens.mjs` (to emit dist/tokens.json) and
 * `docs-site/scripts/generate-tokens.mjs`, so the two cannot drift apart.
 *
 * The naming rules here mirror the Style Dictionary transforms in
 * build-tokens.mjs. `assertNamesMatchBuild` checks that mirror against the real
 * generated CSS, so a change to the build that this file does not follow fails
 * the build rather than silently publishing wrong names to consumers.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const REFERENCE = /^\{([^}]+)\}$/;
export const isToken = (node) => node && typeof node === "object" && "value" in node;

/** Hoist every token set to one root so cross-set `{references}` resolve. */
export function hoist(source) {
  const root = {};
  for (const setName of source.$metadata?.tokenSetOrder ?? ["primitives", "semantic"]) {
    for (const [group, value] of Object.entries(source[setName] ?? {})) {
      root[group] = { ...(root[group] ?? {}), ...value };
    }
  }
  return root;
}

export function loadTokens(repoRoot) {
  const source = JSON.parse(readFileSync(join(repoRoot, "tokens", "tokens.json"), "utf8"));
  return { source, root: hoist(source) };
}

export function makeResolver(root) {
  const lookup = (path) =>
    path.split(".").reduce((node, key) => (node == null ? node : node[key]), root);

  return function resolve(value, trail = []) {
    if (typeof value === "string") {
      const match = value.match(REFERENCE);
      if (!match) return value;
      const path = match[1];
      if (trail.includes(path)) {
        throw new Error(`Circular reference: ${[...trail, path].join(" → ")}`);
      }
      const target = lookup(path);
      if (!isToken(target)) throw new Error(`Unresolved reference {${path}}`);
      return resolve(target.value, [...trail, path]);
    }
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, trail)]));
    }
    return value;
  };
}

export const referenceOf = (value) =>
  typeof value === "string" && REFERENCE.test(value) ? value.slice(1, -1) : null;

// ---------------------------------------------------------------- naming ----

/** `-12` collides with the kebab separator, so the build renames it. */
export const normalizeSegment = (segment) =>
  segment.startsWith("-") ? `minus${segment.slice(1)}` : segment;

export const kebab = (segment) =>
  normalizeSegment(segment)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

export function camel(parts) {
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
export const jsAccessor = (parts) =>
  parts.reduce(
    (acc, part) => (IDENTIFIER.test(part) ? `${acc}.${part}` : `${acc}[${JSON.stringify(part)}]`),
    "tokens",
  );

export const cssVar = (parts) => `--${parts.map(kebab).join("-")}`;

export function names(parts) {
  const flat = camel(parts);
  return {
    css: cssVar(parts),
    js: jsAccessor(parts),
    swift: `CosmosTokens.${flat}`,
    kotlin: `CosmosTokens.${flat}`,
  };
}

/** Composite typography tokens expand into one variable per property. */
export const COMPOSITE_PROPERTIES = ["fontFamily", "fontWeight", "fontSize", "lineHeight"];

// -------------------------------------------------------------- contrast ----

function channel(component) {
  const c = component / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground, background) {
  const [a, b] = [luminance(foreground), luminance(background)];
  const [light, dark] = a > b ? [a, b] : [b, a];
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}

// ------------------------------------------------------------------ walk ----

/**
 * Yield every token in a set, generically. Groups are discovered rather than
 * hardcoded, so a new token group appears in the manifest without editing this
 * file — the failure mode that left `motion` and `borderWidth` out of the docs
 * site's hand-listed groups.
 */
export function* walkTokens(node, parts = []) {
  if (!node || typeof node !== "object") return;
  if (isToken(node)) {
    yield { parts, token: node };
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    yield* walkTokens(child, [...parts, key]);
  }
}

/** Every token across both sets, tagged with the tier its set implies. */
export function* allTokens(source) {
  for (const setName of source.$metadata?.tokenSetOrder ?? ["primitives", "semantic"]) {
    for (const entry of walkTokens(source[setName] ?? {})) {
      yield { ...entry, set: setName };
    }
  }
}

// ------------------------------------------------------------ validation ----

/**
 * Every CSS name this module derives must actually exist in the generated CSS.
 * A mismatch means the naming rules here have drifted from build-tokens.mjs.
 */
export function assertNamesMatchBuild(repoRoot, expectedCssNames) {
  const css = readFileSync(join(repoRoot, "dist", "web", "tokens.css"), "utf8");
  const declared = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
  const missing = [...expectedCssNames].filter((name) => !declared.has(name));
  if (missing.length > 0) {
    throw new Error(
      `${missing.length} derived CSS names are absent from dist/web/tokens.css — the naming ` +
        `rules in scripts/token-model.mjs have drifted from build-tokens.mjs:\n  ` +
        missing.slice(0, 10).join("\n  "),
    );
  }
  return declared;
}
