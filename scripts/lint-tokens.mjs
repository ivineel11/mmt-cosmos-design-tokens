/**
 * Invariant checks for tokens/tokens.json. Runs as part of `npm run build:tokens`
 * and standalone via `npm run lint:tokens`.
 *
 * Everything here is a rule that documentation alone cannot hold: a README asks,
 * a build gate enforces. Known debt lives in scripts/token-lint-baseline.json so
 * that it is visible and cannot grow silently.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import { loadTokens, makeResolver, referenceOf, allTokens, contrastRatio } from "./token-model.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const fail = (rule, message) => errors.push(`[${rule}] ${message}`);

const { source, root } = loadTokens(repoRoot);
const resolve = makeResolver(root);
const baseline = JSON.parse(
  readFileSync(join(repoRoot, "scripts", "token-lint-baseline.json"), "utf8"),
);

// ------------------------------------------------------- 1. schema shape ----

{
  const schema = JSON.parse(readFileSync(join(repoRoot, "tokens", "tokens.schema.json"), "utf8"));
  const validate = new Ajv({ allErrors: true, strict: false }).compile(schema);
  if (!validate(source)) {
    for (const e of validate.errors.slice(0, 20)) {
      fail("schema", `${e.instancePath || "/"} ${e.message}`);
    }
  }
}

// -------------------------------------- 2. descriptions & tier metadata -----

for (const { parts, token, set } of allTokens(source)) {
  const path = `${set}.${parts.join(".")}`;
  const mmt = token.$extensions?.mmt;
  if (!token.description || token.description.length < 20) {
    fail("description", `${path} has no usable description`);
  }
  if (!mmt?.tier || !mmt?.status) {
    fail("metadata", `${path} is missing $extensions.mmt.tier or .status`);
  }
  if (mmt?.status === "deprecated" && !mmt.replacedBy) {
    fail("deprecation", `${path} is deprecated but names no replacement`);
  }
}

// -------------------------------- 3. semantic tokens must alias, not hold ---

for (const { parts, token } of allTokens({
  $metadata: { tokenSetOrder: ["semantic"] },
  semantic: source.semantic,
})) {
  const value = token.value;
  const values = typeof value === "object" ? Object.values(value) : [value];
  for (const v of values) {
    if (!referenceOf(v)) {
      fail(
        "raw-value",
        `semantic.${parts.join(".")} holds the literal ${JSON.stringify(v)} — semantic tokens ` +
          `must reference a primitive so a palette change propagates`,
      );
    }
  }
}

// ------------------------------------------------- 4. color naming grammar --

const ROLES = ["bg-surface", "bg-fill", "bg", "text", "border", "icon"];
const EMPHASIS = ["primary", "secondary", "tertiary", "disabled", "inverse"];
const INTENTS = ["brand", "link", "focus", "info", "success", "caution", "warning", "danger"];
const PROMINENCE = ["strong", "subtle"];
const STATES = ["hover", "active", "selected"];

/** Parse a semantic color name against docs/naming.md. Returns null if invalid. */
export function parseColorName(name) {
  const role = ROLES.find((r) => name === r || name.startsWith(`${r}-`));
  if (!role) return null;
  let rest = name.slice(role.length).replace(/^-/, "");
  const parsed = { role, modifiers: [], onFill: false, state: null };
  if (rest === "") return parsed;

  // `on-bg-fill` is a single multi-word segment; isolate it before splitting.
  const onFillAt = rest.indexOf("on-bg-fill");
  if (onFillAt !== -1) {
    parsed.onFill = true;
    const before = rest.slice(0, onFillAt).replace(/-$/, "");
    const after = rest.slice(onFillAt + "on-bg-fill".length).replace(/^-/, "");
    rest = [before, after].filter(Boolean).join("-");
    if (before && !INTENTS.includes(before)) return null;
  }

  const segments = rest ? rest.split("-") : [];
  let i = 0;
  while (i < segments.length && (EMPHASIS.includes(segments[i]) || INTENTS.includes(segments[i]))) {
    parsed.modifiers.push(segments[i]);
    i += 1;
  }
  if (i < segments.length && PROMINENCE.includes(segments[i])) {
    parsed.modifiers.push(segments[i]);
    i += 1;
  }
  if (i < segments.length && STATES.includes(segments[i])) {
    parsed.state = segments[i];
    i += 1;
  }
  return i === segments.length ? parsed : null;
}

const roleColors = Object.entries(source.semantic.color).filter(([k]) => !k.startsWith("exp-"));

for (const [name] of roleColors) {
  const parsed = parseColorName(name);
  if (!parsed) {
    fail("grammar", `semantic.color.${name} does not parse against docs/naming.md`);
    continue;
  }
  if (parsed.role === "bg-surface" && parsed.modifiers.some((m) => PROMINENCE.includes(m))) {
    fail("grammar", `semantic.color.${name} — bg-surface takes no prominence slot (R3)`);
  }
  if (parsed.state && !["bg-surface", "bg-fill", "border", "text"].includes(parsed.role)) {
    fail("grammar", `semantic.color.${name} — states exist on interactive roles only (R3)`);
  }
}

// ----------------------------------------- 5. every fill has a foreground ---

const colorNames = new Set(roleColors.map(([k]) => k));

for (const [name, token] of roleColors) {
  if (!name.startsWith("bg-fill") && !name.startsWith("bg-surface") && name !== "bg") continue;
  if (parseColorName(name)?.state) continue; // states inherit their resting pairing
  const pairs = token.$extensions?.mmt?.pairsWith;
  if (!pairs?.text || !pairs?.icon) {
    fail("pairing", `semantic.color.${name} declares no pairsWith.text/.icon foreground`);
    continue;
  }
  for (const [slot, target] of Object.entries(pairs)) {
    if (!colorNames.has(target)) {
      fail("pairing", `semantic.color.${name}.pairsWith.${slot} points at missing ${target}`);
    }
  }
}

// -------------------------------------------- 6. declared pairings pass AA --

const knownFailures = new Map(baseline.knownContrastFailures.map((f) => [f.token, f.reason]));
const seenFailures = new Set();

for (const [name, token] of roleColors) {
  const contrast = token.$extensions?.mmt?.contrast;
  if (!contrast) continue;

  const background = source.semantic.color[contrast.against];
  if (!background) {
    fail("contrast", `semantic.color.${name}.contrast.against names missing ${contrast.against}`);
    continue;
  }
  const actual = contrastRatio(resolve(token.value), resolve(background.value));
  if (Math.abs(actual - contrast.ratio) > 0.01) {
    fail(
      "contrast",
      `semantic.color.${name} records ratio ${contrast.ratio} but resolves to ${actual} — ` +
        `metadata is stale`,
    );
  }

  const minimum = name.startsWith("icon") ? 3 : 4.5;
  if (contrast.wcag === "EXEMPT") continue;
  if (actual + 0.001 < minimum) {
    if (!knownFailures.has(name)) {
      fail(
        "contrast",
        `semantic.color.${name} is ${actual}:1 on ${contrast.against}, below the ${minimum}:1 ` +
          `minimum. Fix the value, or record it in scripts/token-lint-baseline.json with a reason`,
      );
    }
    seenFailures.add(name);
  }
}

for (const token of knownFailures.keys()) {
  if (!seenFailures.has(token)) {
    fail(
      "baseline",
      `${token} is listed as a known contrast failure but now passes — remove it from ` +
        `scripts/token-lint-baseline.json`,
    );
  }
}

// ---------------------------------------------- 7. no new orphan primitives -

const referenced = new Set();
for (const { token } of allTokens({
  $metadata: { tokenSetOrder: ["semantic"] },
  semantic: source.semantic,
})) {
  const values = typeof token.value === "object" ? Object.values(token.value) : [token.value];
  for (const v of values) {
    const ref = referenceOf(v);
    if (ref) referenced.add(ref);
  }
}

const orphans = [];
for (const { parts } of allTokens({
  $metadata: { tokenSetOrder: ["primitives"] },
  primitives: source.primitives,
})) {
  const path = parts.join(".");
  if (!referenced.has(path)) orphans.push(path);
}

const allowedOrphans = new Set(baseline.orphanPrimitives);
for (const path of orphans) {
  if (!allowedOrphans.has(path)) {
    fail(
      "orphan",
      `primitives.${path} is referenced by no semantic token. Give it a role, or add it to ` +
        `scripts/token-lint-baseline.json if it is deliberately unexposed`,
    );
  }
}
for (const path of allowedOrphans) {
  if (!orphans.includes(path)) {
    fail("baseline", `${path} is listed as an orphan primitive but is now referenced — remove it`);
  }
}

// ------------------------------------------------------------------ report --

if (errors.length > 0) {
  console.error(`\n✖ token lint failed — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✔︎ token lint passed — grammar, pairings, contrast, aliasing and metadata checked ` +
    `(${knownFailures.size} known contrast failures, ${allowedOrphans.size} unexposed primitives)`,
);
