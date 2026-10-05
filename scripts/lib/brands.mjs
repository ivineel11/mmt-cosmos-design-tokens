/**
 * Brands are Tokens Studio themes. Each entry in `$themes` is one brand. The first is the
 * default brand, which enables only the three base sets. Every other brand also enables one
 * `brands/{id}` set, which holds value overrides for semantic tokens and nothing else. A
 * Figma extended collection works the same way: it can override values but cannot add,
 * rename or describe variables.
 *
 * Shared by build-tokens.mjs, which builds every brand, and the linter, which checks every
 * brand. Keep the two reading brands the same way.
 */

export const BASE_SETS = ["primitives", "semantic", "component"];
export const BRAND_SET = /^brands\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isLeaf = (node) => isObject(node) && ("value" in node || "$value" in node);

/** The brand sets present in the file, in key order. */
export const brandSetsIn = (json) => Object.keys(json ?? {}).filter((key) => BRAND_SET.test(key));

/**
 * One entry per theme: { id, name, set }, where `set` is the theme's brand set or null for
 * the default brand. A file without themes has one unnamed default brand.
 */
export function brandsOf(json) {
  const themes = Array.isArray(json?.$themes) ? json.$themes : [];
  if (!themes.length) return [{ id: "default", name: "Default", set: null }];
  return themes.map((theme) => {
    const enabled = Object.entries(theme.selectedTokenSets ?? {})
      .filter(([, state]) => state !== "disabled")
      .map(([set]) => set);
    return { id: theme.id, name: theme.name, set: enabled.find((s) => BRAND_SET.test(s)) ?? null };
  });
}

/** Every override in a brand set as [path, node], path relative to `semantic`. */
export function overridesIn(set) {
  const out = [];
  const walk = (node, path) => {
    if (!isObject(node)) return;
    if (isLeaf(node)) {
      out.push([path, node]);
      return;
    }
    for (const [key, child] of Object.entries(node)) walk(child, [...path, key]);
  };
  walk(set, []);
  return out;
}

/**
 * The token file one brand builds from: the three base sets, with the brand set's values
 * written over the matching semantic tokens. Each semantic token keeps its own type and
 * description. Brand sets are dropped, so the result has the shape of a single-brand file.
 * Everything is copied: Style Dictionary preprocessors edit the tree in place, and brands
 * built side by side must not see each other's edits.
 */
export function tokensForBrand(json, set) {
  const semantic = structuredClone(json.semantic);
  const copy = (set) => structuredClone(json[set]);
  if (set) {
    for (const [path, override] of overridesIn(json[set])) {
      let node = semantic;
      for (const key of path) node = node?.[key];
      if (!isLeaf(node)) throw new Error(`${set} overrides ${path.join(".")}, which is not a semantic token.`);
      node.value = override.value ?? override.$value;
    }
  }
  return {
    primitives: copy("primitives"),
    semantic,
    component: copy("component"),
    $metadata: { ...json.$metadata, tokenSetOrder: BASE_SETS },
  };
}
