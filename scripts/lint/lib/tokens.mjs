/**
 * An indexed view of tokens/tokens.json, in the shape the rules need.
 *
 * Mirrors what the build does with the file: the three sets are hoisted into one
 * namespace (the `tokens-studio` preprocessor), so `{color.bg-fill-brand}` resolves
 * whether it points into primitives or semantic. Unlike the build, every leaf keeps its
 * tier and its source position.
 */
import { pathKey } from "./json-source.mjs";

export const TIERS = ["primitives", "semantic", "component"];
export const REFERENCE = /\{([^{}]+)\}/g;
export const ALIAS = /^\{([^{}]+)\}$/;

export const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
export const isLeaf = (node) => isPlainObject(node) && ("value" in node || "$value" in node);
export const leafValue = (node) => node.value ?? node.$value;
export const leafType = (node) => node.type ?? node.$type;

/** Every `{ref}` inside a token value, including inside composite (typography, shadow) values. */
export function referencesIn(value) {
  const found = [];
  const scan = (v) => {
    if (typeof v === "string") for (const m of v.matchAll(REFERENCE)) found.push(m[1]);
    else if (Array.isArray(v) || isPlainObject(v)) Object.values(v).forEach(scan);
  };
  scan(value);
  return found;
}

/**
 * The scalar members of a value as [name, value] pairs: [[null, v]] for a plain value,
 * one pair per key for a typography object, and "1.color"-style names for the layers of
 * a shadow array (numbered from 1, as the build numbers them).
 */
export function membersOf(value) {
  if (Array.isArray(value)) {
    return value.flatMap((layer, i) =>
      isPlainObject(layer) ? Object.entries(layer).map(([k, v]) => [`${i + 1}.${k}`, v]) : [[`${i + 1}`, layer]],
    );
  }
  return isPlainObject(value) ? Object.entries(value) : [[null, value]];
}

export function aliasTarget(value) {
  const m = typeof value === "string" ? ALIAS.exec(value) : null;
  return m ? m[1] : null;
}

export function buildTokenModel(source, locations = new Map()) {
  const leaves = [];
  const byId = new Map();
  const groups = new Set();
  const crossTierDuplicates = [];

  const locate = (tier, path, field) => {
    const full = field ? [tier, ...path, field] : [tier, ...path];
    return locations.get(pathKey(full)) ?? locations.get(pathKey([tier, ...path])) ?? null;
  };

  for (const tier of TIERS) {
    const walk = (node, path) => {
      if (!isPlainObject(node)) return;
      if (isLeaf(node)) {
        const leaf = {
          tier,
          path,
          id: path.join("."),
          node,
          type: leafType(node),
          value: leafValue(node),
          description: node.description,
          loc: locate(tier, path),
          valueLoc: locate(tier, path, "value"),
          descriptionLoc: locate(tier, path, "description"),
        };
        leaves.push(leaf);
        if (byId.has(leaf.id)) crossTierDuplicates.push([byId.get(leaf.id), leaf]);
        else byId.set(leaf.id, leaf);
        return;
      }
      if (path.length) groups.add(path.join("."));
      for (const [key, child] of Object.entries(node)) {
        if (key.startsWith("$")) continue;
        walk(child, [...path, key]);
      }
    };
    walk(source?.[tier], []);
  }

  /**
   * Resolve a token id to its final value. Composite values resolve member by member.
   * Returns { value } or { error } — never throws, so one bad reference cannot hide the
   * rest of the report.
   */
  function resolve(id, trail = []) {
    if (trail.includes(id)) return { error: `circular reference ${[...trail, id].join(" → ")}` };
    const leaf = byId.get(id);
    if (!leaf) return { error: `{${id}} does not resolve to a token` };
    return resolveValue(leaf.value, [...trail, id]);
  }

  function resolveValue(value, trail = []) {
    if (typeof value === "string") {
      const target = aliasTarget(value);
      if (target) return resolve(target, trail);
      if (value.includes("{")) {
        let error = null;
        const out = value.replace(REFERENCE, (_, ref) => {
          const r = resolve(ref, trail);
          if (r.error) error ??= r.error;
          return r.value;
        });
        return error ? { error } : { value: out };
      }
      return { value };
    }
    if (isPlainObject(value)) {
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        const r = resolveValue(v, trail);
        if (r.error) return r;
        out[k] = r.value;
      }
      return { value: out };
    }
    return { value };
  }

  const tierOf = (id) => byId.get(id)?.tier ?? null;
  const topGroups = new Set(leaves.map((l) => l.path[0]));

  return {
    source,
    leaves,
    byId,
    groups,
    topGroups,
    crossTierDuplicates,
    tierOf,
    resolve,
    resolveValue,
    locate,
    inTier: (tier) => leaves.filter((l) => l.tier === tier),
    exists: (id) => byId.has(id) || groups.has(id),
  };
}
