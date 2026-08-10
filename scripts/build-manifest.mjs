/**
 * Emit dist/tokens.json — the flat, machine-readable manifest.
 *
 * This is the artifact an automated consumer (an AI coding agent, a codemod, a
 * lint rule) should load instead of parsing four platform dialects. One entry
 * per token, keyed by its CSS variable name without the leading `--`, carrying
 * the resolved value, both tiers of provenance, the description, the
 * $extensions metadata, and the name to use on every platform.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  loadTokens,
  makeResolver,
  referenceOf,
  names,
  cssVar,
  camel,
  jsAccessor,
  allTokens,
  COMPOSITE_PROPERTIES,
  assertNamesMatchBuild,
} from "./token-model.mjs";

export function buildManifest(repoRoot) {
  const { source, root } = loadTokens(repoRoot);
  const resolve = makeResolver(root);

  const tokens = {};
  const expectedCssNames = new Set();
  const counts = { total: 0, byTier: {}, byStatus: {}, byType: {} };

  for (const { parts, token, set } of allTokens(source)) {
    const meta = token.$extensions?.mmt ?? {};
    const resolved = resolve(token.value);
    const isComposite = resolved !== null && typeof resolved === "object";
    const n = names(parts);

    const entry = {
      path: `${set}.${parts.join(".")}`,
      tier: meta.tier ?? (set === "primitives" ? "primitive" : "semantic"),
      status: meta.status ?? "stable",
      type: token.type,
      value: isComposite ? resolved : String(resolved),
      description: token.description ?? null,
    };

    const alias = isComposite
      ? Object.fromEntries(
          Object.entries(token.value).map(([property, ref]) => [property, referenceOf(ref)]),
        )
      : referenceOf(token.value);
    if (alias) entry.aliasOf = alias;

    if (isComposite) {
      // The build expands a composite into one variable per property, so the
      // manifest must name those properties rather than a variable that does
      // not exist.
      entry.platforms = Object.fromEntries(
        COMPOSITE_PROPERTIES.map((property) => [
          property,
          {
            css: `${cssVar(parts)}-${property.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
            js: `${jsAccessor(parts)}.${property}`,
            swift: `CosmosTokens.${camel(parts)}${property[0].toUpperCase()}${property.slice(1)}`,
            kotlin: `CosmosTokens.${camel(parts)}${property[0].toUpperCase()}${property.slice(1)}`,
          },
        ]),
      );
      for (const platform of Object.values(entry.platforms)) expectedCssNames.add(platform.css);
    } else {
      entry.platforms = n;
      expectedCssNames.add(n.css);
    }

    for (const key of ["replacedBy", "pairsWith", "states", "contrast", "usage", "note"]) {
      if (meta[key] !== undefined) entry[key] = meta[key];
    }

    const id = (isComposite ? cssVar(parts) : n.css).slice(2);
    if (tokens[id]) throw new Error(`Duplicate manifest key: ${id}`);
    tokens[id] = entry;

    counts.total += 1;
    counts.byTier[entry.tier] = (counts.byTier[entry.tier] ?? 0) + 1;
    counts.byStatus[entry.status] = (counts.byStatus[entry.status] ?? 0) + 1;
    counts.byType[entry.type] = (counts.byType[entry.type] ?? 0) + 1;
  }

  assertNamesMatchBuild(repoRoot, expectedCssNames);

  const manifest = {
    $meta: {
      source: "tokens/tokens.json",
      counts,
      readThisFirst: [
        "Use tokens with tier 'semantic' in product code.",
        "Never use tier 'primitive' or 'primitive-alias' in product code — they are raw values with no intent.",
        "Never use a token with status 'deprecated' or 'experimental' in new code; follow 'replacedBy'.",
        "When filling a shape, take its foreground from 'pairsWith' rather than choosing one.",
        "When a control needs a hover or pressed variant, take it from 'states'.",
        "'contrast.wcag' is computed from the real values: AA (>=4.5:1 text), AA-large (>=3:1), AA-nontext (>=3:1 icons), EXEMPT (intentional), FAIL (do not ship as the only signal).",
      ],
      docs: {
        rules: "AGENTS.md",
        namingGrammar: "docs/naming.md",
        componentRecipes: "docs/recipes.md",
      },
    },
    tokens,
  };

  mkdirSync(join(repoRoot, "dist"), { recursive: true });
  writeFileSync(join(repoRoot, "dist", "tokens.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return counts;
}
