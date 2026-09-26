/**
 * Opacity is the one family where a wrong value is silently valid on every platform: no
 * transform rejects it, so `10` or "110%" would reach CSS, Swift and Kotlin intact. Figma
 * stores opacity as a percentage while tokens.json stores the 0-1 decimal, so a careless
 * re-export is the likely way that happens.
 *
 * Works on the un-hoisted dictionary, the only shape in which the three tiers are still
 * distinguishable — that is what lets it enforce the tier rules as well as the range.
 * Read-only. Returns every problem found as { tier, path, message }; build-tokens.mjs
 * throws on the first, the linter reports them all.
 */

const typeOf = (t) => t.$type ?? t.type;
const tokenValue = (t) => (t === null || typeof t !== "object" ? t : (t.$value ?? t.value));
const isTokenLeaf = (node) =>
  node !== null &&
  typeof node === "object" &&
  !Array.isArray(node) &&
  ("value" in node || "$value" in node);
const isAlias = (v) => typeof v === "string" && /^\{[^}]+\}$/.test(v);

export function opacityProblems(dictionary) {
  const problems = [];
  const report = (tier, path, message) => problems.push({ tier, path, message });
  const primitives = dictionary.primitives?.opacityScale ?? {};
  const semantics = dictionary.semantic?.opacity ?? {};

  const walk = (node, path, tier) => {
    if (node === null || typeof node !== "object" || Array.isArray(node)) return;
    if (isTokenLeaf(node)) {
      if (typeOf(node) !== "opacity") return;
      const value = tokenValue(node);
      const where = `${tier}.${path.join(".")}`;
      if (isAlias(value)) return;
      if (tier !== "primitives") {
        report(
          tier,
          path,
          `Opacity token ${where} holds the literal ${JSON.stringify(value)}. Only primitives ` +
            `may hold a literal opacity; semantic and component opacity tokens must alias one, ` +
            `e.g. "{opacityScale.10}". See README -> "Opacity tokens".`,
        );
        return;
      }
      const n = Number(value);
      if (typeof value === "boolean" || value === "" || !Number.isFinite(n) || n < 0 || n > 1) {
        report(
          tier,
          path,
          `Opacity token ${where} must be a decimal between 0 and 1, got ${JSON.stringify(value)}. ` +
            `Figma stores opacity as a percentage (32); tokens/tokens.json stores the decimal (0.32). ` +
            `See README -> "Opacity tokens".`,
        );
      }
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) continue;
      walk(child, [...path, key], tier);
    }
  };
  for (const tier of ["primitives", "semantic", "component"]) {
    walk(dictionary[tier] ?? {}, [], tier);
  }

  // The percent-key convention: the key is the number Figma holds, the value is the
  // number code wants. Checking it here is what makes the two sources cross-verifiable.
  for (const [key, token] of Object.entries(primitives)) {
    const path = ["opacityScale", key];
    if (!/^\d+$/.test(key)) {
      report(
        "primitives",
        path,
        `primitives.opacityScale.${key} is not a percent integer. Primitive opacity steps are ` +
          `keyed by percentage (0-100); role names belong in semantic.opacity.`,
      );
      continue;
    }
    const expected = String(Number(key) / 100);
    if (tokenValue(token) !== expected) {
      report(
        "primitives",
        path,
        `primitives.opacityScale.${key} should hold "${expected}" (the key as a decimal), got ` +
          `${JSON.stringify(tokenValue(token))}.`,
      );
    }
  }

  // Every step is mirrored into the semantic tier, because product code may only consume
  // semantic tokens. Drift between the two lists is the failure mode these two loops catch.
  for (const key of Object.keys(primitives)) {
    const mirror = semantics[key];
    if (!mirror) {
      report(
        "primitives",
        ["opacityScale", key],
        `primitives.opacityScale.${key} has no semantic mirror. Every ramp step needs a ` +
          `semantic.opacity.${key} aliasing it, or product code cannot use it.`,
      );
      continue;
    }
    if (tokenValue(mirror) !== `{opacityScale.${key}}`) {
      report(
        "semantic",
        ["opacity", key],
        `semantic.opacity.${key} must alias {opacityScale.${key}}, got ` +
          `${JSON.stringify(tokenValue(mirror))}. A numeric semantic key names its own step.`,
      );
    }
  }
  for (const key of Object.keys(semantics)) {
    if (/^\d+$/.test(key) && !primitives[key]) {
      report(
        "semantic",
        ["opacity", key],
        `semantic.opacity.${key} mirrors a ramp step that does not exist in ` +
          `primitives.opacityScale.`,
      );
    }
  }

  return problems;
}
