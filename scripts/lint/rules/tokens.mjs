/**
 * Rules for tokens/tokens.json. Each one encodes a convention the README states (or one
 * the build or Figma relies on) and cites it, so a failure explains itself.
 */
import { writeFileSync } from "node:fs";
import { composite, contrast, formatRatio, HEX, isFullyTransparent, luminance } from "../../lib/color.mjs";
import { opacityProblems } from "../../lib/opacity.mjs";
import { describePrimitives } from "../../describe-primitives.mjs";
import { TOKENS_FILE } from "../lib/context.mjs";
import { aliasTarget, buildTokenModel, isLeaf, isPlainObject, membersOf, referencesIn, TIERS } from "../lib/tokens.mjs";
import { BASE_SETS, BRAND_SET, brandSetsIn, brandsOf, overridesIn, tokensForBrand } from "../../lib/brands.mjs";

// ------------------------------------------------------------------ helpers --

/** The parsed tokens file, or null when it does not parse (tokens/json-syntax reports that). */
function load(api) {
  const t = api.tokens();
  return t.error ? null : t;
}

const at = (leaf, field = "value") => {
  const loc = (field === "description" ? leaf.descriptionLoc : field === "key" ? leaf.loc : leaf.valueLoc) ?? leaf.loc;
  return { file: TOKENS_FILE, line: loc?.line, column: loc?.column, subject: leaf.id };
};

const label = (leaf) => `${leaf.tier}.${leaf.id}`;

/** Tokens Studio types this pipeline knows how to transform, grouped by what they measure. */
export const TYPE_FAMILY = {
  color: "color",
  fontFamilies: "fontFamily",
  fontWeights: "fontWeight",
  fontSizes: "dimension",
  lineHeights: "dimension",
  letterSpacing: "dimension",
  spacing: "dimension",
  sizing: "dimension",
  borderRadius: "dimension",
  borderWidth: "dimension",
  dimension: "dimension",
  opacity: "opacity",
  typography: "typography",
  boxShadow: "shadow",
};

/**
 * What each member of a shadow layer must alias. Offsets and blur come from their own
 * primitive scales and the colour from the translucent alpha palette, because a shadow
 * layer carries its alpha in the colour rather than taking an opacity token.
 */
const SHADOW_MEMBERS = {
  x: "shadowOffset",
  y: "shadowOffset",
  blur: "shadowBlur",
  color: "color.alpha",
};
const MAX_SHADOW_LAYERS = 2;

/**
 * Typography composites read family and weight through semantic typeface.* and weight.* tokens, the
 * one place a brand changes its font (Figma text styles bind to the same variables). Size
 * and line height are shared by every brand and alias primitives directly.
 */
const TYPEFACE_FAMILY = "typeface.default";
const TYPOGRAPHY_MEMBERS = {
  fontFamily: "fontFamily",
  fontWeight: "fontWeight",
  fontSize: "fontSize",
  lineHeight: "lineHeight",
};

const PX = /^(-?\d+(?:\.\d+)?)px$/;
const GRADIENT = /^linear-gradient\(/;

/** Style Dictionary's flat names, mirrored from docs-site/scripts/generate-tokens.mjs. */
const normalizeSegment = (s) => (s.startsWith("-") ? `minus${s.slice(1)}` : s);
export const cssName = (parts) =>
  `--${parts.map((p) => normalizeSegment(p).replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()).join("-")}`;
export const camelName = (parts) =>
  parts
    .flatMap((p) => normalizeSegment(p).split("-"))
    .map((w, i) => (i === 0 || !/^[a-z]/.test(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join("");

/**
 * Names a leaf emits. Composite typography expands into one name per member everywhere.
 * A shadow stays whole on web (one box-shadow) and expands into one name per layer member
 * on iOS and Android (shadowCard1OffsetX). `platform` is "web", "native" or "all" (every
 * name any platform emits, for collision checks).
 */
export function emittedPaths(leaf, platform = "all", model = null) {
  if (leaf.type === "typography" && isPlainObject(leaf.value)) {
    return Object.keys(leaf.value).map((member) => [...leaf.path, member]);
  }
  // A shadow that aliases another (`{shadow.card}`) expands into its target's layers
  // on native, exactly as the build does, so follow the alias when the model is given.
  let shadow = leaf.value;
  for (let hops = 0, id = aliasTarget(shadow); leaf.type === "boxShadow" && model && id && hops < 10; hops++, id = aliasTarget(shadow)) {
    shadow = model.byId.get(id)?.value;
  }
  if (leaf.type === "boxShadow" && Array.isArray(shadow)) {
    const renamed = { x: "offsetX", y: "offsetY" };
    const layers = shadow.flatMap((layer, i) =>
      isPlainObject(layer) ? Object.keys(layer).map((m) => [...leaf.path, `${i + 1}`, renamed[m] ?? m]) : [],
    );
    if (platform === "web") return [leaf.path];
    if (platform === "native") return layers;
    return [leaf.path, ...layers];
  }
  return [leaf.path];
}

// -------------------------------------------------------------- structure ---

const jsonSyntax = {
  id: "tokens/json-syntax",
  description: "tokens/tokens.json exists and is valid JSON.",
  check(api) {
    const t = api.tokens();
    if (t.error) api.report({ file: TOKENS_FILE, line: t.error.line, column: t.error.column, message: t.error.message });
  },
};

const duplicateKey = {
  id: "tokens/duplicate-key",
  description: "No object repeats a key. JSON.parse keeps the last one silently, so a bad merge loses a token without any error.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const d of t.duplicates) {
      api.report({
        file: TOKENS_FILE,
        line: d.line,
        column: d.column,
        subject: d.path.join("."),
        message: `Duplicate key "${d.path.at(-1)}" in ${d.path.slice(0, -1).join(".") || "the root object"}${d.first ? ` (first defined on line ${d.first.line})` : ""}. Only the last one survives parsing.`,
      });
    }
  },
};

const format = {
  id: "tokens/format",
  description: "tokens.json is in the canonical 2-space JSON.stringify layout that scripts/describe-primitives.mjs writes, so regenerating it never produces an unrelated diff.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const canonical = `${JSON.stringify(t.value, null, 2)}\n`;
    if (t.text === canonical) return;
    const a = t.text.split("\n");
    const b = canonical.split("\n");
    let line = 0;
    while (line < a.length && a[line] === b[line]) line += 1;
    api.report({
      file: TOKENS_FILE,
      line: line + 1,
      column: 1,
      message: `Not in canonical format from here on (expected ${JSON.stringify(b[line] ?? "")}). Run \`npm run lint -- --fix\`.`,
    });
  },
  fix(api) {
    const t = load(api);
    // Never auto-format over duplicate keys: that would silently pick one of them.
    if (!t || t.duplicates.length) return;
    writeFileSync(api.abs(TOKENS_FILE), `${JSON.stringify(t.value, null, 2)}\n`);
  },
};

const ALLOWED_ROOT = new Set([...TIERS, "$themes", "$metadata"]);
const ALLOWED_LEAF_KEYS = new Set(["value", "type", "description"]);

const structure = {
  id: "tokens/structure",
  description: "Token sets, $metadata.tokenSetOrder and every token's shape follow the Tokens Studio export the build expects (README → Export to JSON). Brand sets sit between semantic and component, so a brand overrides semantic before component aliases it.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const { value: root, locations } = t;
    const loc = (path) => locations.get(JSON.stringify(path)) ?? {};
    const report = (path, message) =>
      api.report({ file: TOKENS_FILE, ...loc(path), subject: path.join("."), message });

    if (!isPlainObject(root)) {
      api.report({ file: TOKENS_FILE, line: 1, column: 1, message: "The root must be an object of token sets." });
      return;
    }
    for (const key of Object.keys(root)) {
      if (!ALLOWED_ROOT.has(key) && !BRAND_SET.test(key)) report([key], `Unknown top-level key "${key}". Expected only ${[...ALLOWED_ROOT].join(", ")}, or a brands/{id} set.`);
    }
    for (const tier of TIERS) {
      if (!isPlainObject(root[tier])) {
        api.report({ file: TOKENS_FILE, line: 1, column: 1, message: `Missing the "${tier}" token set.` });
      }
    }
    const order = root.$metadata?.tokenSetOrder;
    const expected = ["primitives", "semantic", ...brandSetsIn(root), "component"];
    if (JSON.stringify(order) !== JSON.stringify(expected)) {
      report(["$metadata"], `$metadata.tokenSetOrder must be ${JSON.stringify(expected)} so each tier resolves before the tier that references it, and each brand set overrides semantic before component aliases it; got ${JSON.stringify(order)}.`);
    }
    if (root.$themes !== undefined && !Array.isArray(root.$themes)) {
      report(["$themes"], "$themes must be an array.");
    }

    const walk = (node, path) => {
      if (!isPlainObject(node)) {
        report(path, `Expected a token or a group of tokens, got ${JSON.stringify(node)}.`);
        return;
      }
      if ("$value" in node || "$type" in node) {
        report(path, `Uses $value/$type. This file uses the Tokens Studio "value"/"type" keys throughout; mixing the two notations confuses the export round-trip.`);
      }
      if (isLeaf(node)) {
        if (!("type" in node) && !("$type" in node)) report(path, "Token has a value but no type.");
        for (const key of Object.keys(node)) {
          if (!ALLOWED_LEAF_KEYS.has(key) && !key.startsWith("$")) {
            report([...path, key], `Unexpected key "${key}" on a token. Tokens carry only value, type and description.`);
          }
        }
        return;
      }
      const keys = Object.keys(node);
      if ("type" in node || "description" in node) {
        report(path, `Group has "${"type" in node ? "type" : "description"}" but no "value" — probably a token whose value was dropped.`);
      }
      if (keys.length === 0) report(path, "Empty group.");
      for (const key of keys) {
        if (key === "type" || key === "description") continue;
        walk(node[key], [...path, key]);
      }
    };
    for (const set of [...TIERS, ...brandSetsIn(root)]) if (isPlainObject(root[set])) walk(root[set], [set]);
  },
};

// ------------------------------------------------------------------ brands ---

const THEME_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** The token families a brand may override: what CosmosBrand.swift and CosmosBrand.kt can type. */
const BRANDABLE_FAMILIES = new Set(["color", "fontFamily", "fontWeight"]);

const brandRule = {
  id: "tokens/brand",
  description: "Brands follow README → Brands: one $themes entry per brand, the default brand first and with no brand set; every other brand enables brands/{its id}; a brand set only overrides the value of existing semantic colour, font family or font weight tokens, aliasing a primitive and carrying no description, the way a Figma extended collection overrides values and inherits everything else.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const { value: root, locations, model } = t;
    // Array items have no recorded position, so a theme reports at the closest parent that does.
    const loc = (path) => {
      for (let n = path.length; n > 0; n -= 1) {
        const found = locations.get(JSON.stringify(path.slice(0, n)));
        if (found) return found;
      }
      return {};
    };
    const report = (path, message) => api.report({ file: TOKENS_FILE, ...loc(path), subject: path.join("."), message });
    const sets = brandSetsIn(root);
    const themes = root.$themes;
    if (!Array.isArray(themes) || !themes.length) {
      for (const set of sets) report([set], `${set} is not used. Add a $themes entry per brand, the default brand first.`);
      return;
    }

    const used = new Map();
    themes.forEach((theme, i) => {
      const path = ["$themes", String(i)];
      if (!isPlainObject(theme)) {
        report(path, "A theme must be an object with an id, a name and selectedTokenSets.");
        return;
      }
      if (typeof theme.id !== "string" || !THEME_ID.test(theme.id)) {
        report(path, `Theme id ${JSON.stringify(theme.id)} must be kebab-case. It is the data-brand value on web.`);
      }
      if (typeof theme.name !== "string" || !/^[A-Za-z][A-Za-z0-9 ]*$/.test(theme.name)) {
        report(path, `Theme name ${JSON.stringify(theme.name)} must start with a letter and hold only letters, digits and spaces. It names the brand in Swift and Kotlin.`);
      }
      const enabled = Object.entries(theme.selectedTokenSets ?? {})
        .filter(([, state]) => state !== "disabled")
        .map(([set]) => set);
      for (const set of BASE_SETS) {
        if (!enabled.includes(set)) report(path, `Theme ${theme.id} must enable the ${set} set. Every brand builds on all three base sets.`);
      }
      for (const set of enabled) {
        if (!BASE_SETS.includes(set) && !BRAND_SET.test(set)) report(path, `Theme ${theme.id} enables "${set}", which is neither a base set nor a brands/{id} set.`);
        else if (BRAND_SET.test(set) && !(set in root)) report(path, `Theme ${theme.id} enables ${set}, which does not exist.`);
      }
      const own = enabled.filter((set) => BRAND_SET.test(set));
      if (i === 0 && own.length) {
        report(path, `The first theme is the default brand and must not enable a brand set; ${theme.id} enables ${own.join(", ")}.`);
      }
      if (i > 0 && own.length !== 1) {
        report(path, `Theme ${theme.id} must enable exactly one brand set, brands/${theme.id}; it enables ${own.length ? own.join(", ") : "none"}.`);
      } else if (i > 0 && own[0] !== `brands/${theme.id}`) {
        report(path, `Theme ${theme.id} enables ${own[0]}. Name the set after the theme, brands/${theme.id}, so the set and the data-brand value agree.`);
      }
      for (const set of own) used.set(set, [...(used.get(set) ?? []), theme.id]);
    });
    for (const field of ["id", "name"]) {
      const values = themes.map((theme) => theme?.[field]);
      if (new Set(values).size !== values.length) report(["$themes"], `Two themes share a ${field}.`);
    }

    for (const set of sets) {
      if (!used.has(set)) report([set], `${set} is not enabled by any theme, so no brand builds from it.`);
      else if (used.get(set).length > 1) report([set], `${set} is enabled by ${used.get(set).join(" and ")}. Give each brand its own set.`);
      for (const [path, node] of overridesIn(root[set])) {
        const full = [set, ...path];
        const id = path.join(".");
        const base = model.byId.get(id);
        if (!base || base.tier !== "semantic") {
          report(full, `${set} overrides ${id}, which is not a semantic token. A brand only changes the value of an existing semantic token, so add the token to semantic first.`);
          continue;
        }
        for (const key of Object.keys(node)) {
          if (key === "description") report([...full, key], `${set} gives ${id} its own description. A brand override inherits the semantic description, as a Figma extended collection does.`);
          else if (key !== "value" && key !== "type") report([...full, key], `Unexpected key "${key}" on a brand override. Overrides carry only value and type.`);
        }
        const type = node.type ?? node.$type;
        if (type !== base.type) report(full, `${set} types ${id} as ${type}, but the semantic token is ${base.type}.`);
        if (!BRANDABLE_FAMILIES.has(TYPE_FAMILY[base.type])) {
          report(full, `${set} overrides ${id}, a ${base.type} token. Brands override colours, font families and font weights only, which is all the per-brand Swift and Kotlin outputs carry.`);
        }
        const value = node.value ?? node.$value;
        const target = aliasTarget(value);
        const tier = target && model.tierOf(target);
        if (!target) report([...full, "value"], `${set} sets ${id} to ${JSON.stringify(value)}. An override must alias a primitive, like the semantic token it replaces.`);
        else if (tier !== "primitives") report([...full, "value"], `${set} points ${id} at {${target}}, which is ${tier ? `a ${tier} token` : "not a token"}. An override must alias a primitive.`);
        else if (target === aliasTarget(base.value)) report([...full, "value"], `${set} sets ${id} to {${target}}, the value it already has. Remove the override.`);
      }
    }
  },
};

/** Primitive scales allowed negative steps: optical spacing tweaks, and upward shadows. */
const NEGATIVE_KEY_ROOTS = ["spacing", "shadowOffset"];

const KEY = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*|[a-z]+(?:[A-Z][a-z0-9]*)+)$/;

const keyFormat = {
  id: "tokens/key-format",
  description: "Keys are lowercase kebab-case (or camelCase group names such as fontSize). Dots and braces would break {reference} paths; negative keys exist only on the spacing and shadowOffset primitives.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const seen = new Set();
    for (const leaf of t.model.leaves) {
      leaf.path.forEach((key, i) => {
        const where = `${leaf.tier}.${leaf.path.slice(0, i + 1).join(".")}`;
        if (seen.has(where)) return;
        seen.add(where);
        const loc = t.locations.get(JSON.stringify([leaf.tier, ...leaf.path.slice(0, i + 1)])) ?? {};
        const report = (message) => api.report({ file: TOKENS_FILE, ...loc, subject: where, message });
        if (/^-\d+$/.test(key)) {
          if (!(leaf.tier === "primitives" && NEGATIVE_KEY_ROOTS.includes(leaf.path[0]) && i === 1)) {
            report(`Negative key "${key}" outside primitives.spacing and primitives.shadowOffset. Negative steps are for optical spacing tweaks and upward shadows only.`);
          }
        } else if (!KEY.test(key)) {
          report(`Key "${key}" is not kebab-case or camelCase. Use lowercase letters, digits and hyphens.`);
        }
      });
    }
  },
};

const type = {
  id: "tokens/type",
  description: "Every token has a type the build knows, and each group holds a single type.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const groupType = new Map();
    for (const leaf of t.model.leaves) {
      if (!(leaf.type in TYPE_FAMILY)) {
        api.report({ ...at(leaf, "key"), message: `${label(leaf)} has type ${JSON.stringify(leaf.type)}, which the build has no transform for. Known types: ${Object.keys(TYPE_FAMILY).join(", ")}.` });
        continue;
      }
      // Component groups mix types by design (one key per property); other groups do not.
      if (leaf.tier === "component") continue;
      const group = `${leaf.tier}.${leaf.path[0]}`;
      if (!groupType.has(group)) groupType.set(group, leaf);
      const first = groupType.get(group);
      if (first.type !== leaf.type) {
        api.report({ ...at(leaf, "key"), message: `${label(leaf)} is "${leaf.type}" but the rest of ${group} is "${first.type}" (e.g. ${first.id}).` });
      }
    }
  },
};

const valueFormat = {
  id: "tokens/value-format",
  description: "Literal values use the notation each platform transform parses: #RRGGBB uppercase hex (8-digit only for the alpha palette), px dimensions, numeric font weights.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      const v = leaf.value;
      if (typeof v === "string" && v.includes("{")) continue; // references: other rules
      const family = TYPE_FAMILY[leaf.type];
      const report = (message) => api.report({ ...at(leaf), message: `${label(leaf)} ${message}` });
      if (family === "color") {
        if (typeof v !== "string") report(`must be a string, got ${JSON.stringify(v)}.`);
        else if (GRADIENT.test(v)) continue;
        else if (!HEX.test(v)) report(`is ${JSON.stringify(v)}; colours are hex (#RRGGBB). rgb(), hsl() and named colours do not survive the iOS/Android colour transforms.`);
        else if (v !== v.toUpperCase()) report(`is ${JSON.stringify(v)}; write hex in uppercase (${v.toUpperCase()}) to match the rest of the palette.`);
        else if (v.length === 9 && leaf.path[1] !== "alpha") report(`bakes alpha into the hex. Cosmos applies an opacity token to a colour instead (README → Opacity tokens); 8-digit hex belongs only to color.alpha.*.`);
      } else if (family === "dimension") {
        if (typeof v !== "string" || !PX.test(v)) report(`is ${JSON.stringify(v)}; dimensions are px strings like "16px". The iOS and Android transforms only convert px.`);
      } else if (family === "fontWeight") {
        if (!Number.isInteger(v) || v < 100 || v > 900 || v % 100 !== 0) report(`is ${JSON.stringify(v)}; font weights are numbers 100–900 in steps of 100.`);
      } else if (family === "fontFamily") {
        if (typeof v !== "string" || !v.trim() || /["']/.test(v)) report(`is ${JSON.stringify(v)}; a font family is a bare name — the build adds platform quoting.`);
      } else if (family === "typography") {
        if (!isPlainObject(v)) report("must be a composite object (fontFamily, fontWeight, fontSize, lineHeight).");
      } else if (family === "shadow") {
        if (!Array.isArray(v) || !v.length || !v.every(isPlainObject)) report("must be an array of shadow layers ({ x, y, blur, color }), even when there is only one.");
      }
    }
  },
};

const primitiveScaleName = {
  id: "tokens/primitive-scale-name",
  description: "A numeric primitive step is named after its value (spacing.16 = 16px), the rule that makes primitives self-describing. opacityScale is the documented exception and has its own rule.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.inTier("primitives")) {
      if (TYPE_FAMILY[leaf.type] !== "dimension" || leaf.path.length !== 2) continue;
      const key = leaf.path[1];
      if (!/^-?\d+$/.test(key) || typeof leaf.value !== "string") continue;
      if (leaf.value !== `${Number(key)}px`) {
        api.report({ ...at(leaf), message: `${label(leaf)} holds ${JSON.stringify(leaf.value)} but its name says ${Number(key)}px. Rename the step or fix the value.` });
      }
    }
  },
};

// ------------------------------------------------------------- references ---

const reference = {
  id: "tokens/reference",
  description: "Every {reference} resolves to a token (not a group), without cycles, using the key as authored (never the build-renamed minusN form).",
  check(api) {
    const t = load(api);
    if (!t) return;
    const { model } = t;
    for (const leaf of model.leaves) {
      const report = (message) => api.report({ ...at(leaf), message: `${label(leaf)} ${message}` });
      for (const [, s] of membersOf(leaf.value)) {
        if (typeof s !== "string" || !s.includes("{")) continue;
        if (!aliasTarget(s) && !GRADIENT.test(s)) {
          report(`embeds a reference inside a longer string (${JSON.stringify(s)}). Only a whole-value alias like "{color.azure.700}" resolves on every platform (gradients excepted).`);
        }
      }
      for (const ref of referencesIn(leaf.value)) {
        if (/(^|\.)minus\d+(\.|$)/.test(ref) && !model.byId.has(ref)) {
          report(`references {${ref}}. Reference the key as authored ({${ref.replace(/minus(\d+)/, "-$1")}}); minusN is the build's output name.`);
        } else if (!model.byId.has(ref)) {
          report(model.groups.has(ref) ? `references {${ref}}, which is a group, not a token.` : `references {${ref}}, which does not exist.`);
        }
      }
      const resolved = model.resolve(leaf.id);
      if (resolved.error?.startsWith("circular")) report(`has a ${resolved.error}.`);
    }
  },
};

const tierReference = {
  id: "tokens/tier-reference",
  description: "Each tier references only the tier below it: primitives hold raw values, semantic aliases primitives, component aliases semantic (README → Three-tier token model). A component may reach a primitive only when no semantic token aliases it. The one exception: a semantic typography composite reads its family and weight from semantic typeface.* and weight.* tokens.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const { model } = t;
    const semanticAliasesOf = new Map();
    for (const leaf of model.inTier("semantic")) {
      const target = aliasTarget(leaf.value);
      if (target) {
        if (!semanticAliasesOf.has(target)) semanticAliasesOf.set(target, []);
        semanticAliasesOf.get(target).push(leaf.id);
      }
    }
    for (const leaf of model.leaves) {
      for (const ref of referencesIn(leaf.value)) {
        const target = model.tierOf(ref);
        if (!target) continue; // tokens/reference
        const report = (message) => api.report({ ...at(leaf), message: `${label(leaf)} ${message}` });
        if (leaf.tier === "primitives") {
          report(`references {${ref}}. Primitives hold raw values; aliases belong in the semantic tier.`);
        } else if (leaf.tier === "semantic" && target === "semantic" && leaf.type === "typography" && (ref.startsWith("typeface.") || ref.startsWith("weight."))) {
          // The one semantic → semantic link: text styles read family and weight through
          // typeface.default and weight.*, so a brand swaps its font by overriding four tokens, not 36 styles.
        } else if (leaf.tier === "semantic" && target !== "primitives") {
          report(`references the ${target} token {${ref}}. Semantic tokens alias primitives only, so a palette change propagates in one step.`);
        } else if (leaf.tier === "component" && target === "component") {
          report(`references another component token {${ref}}. Component tokens alias semantic tokens.`);
        } else if (leaf.tier === "component" && target === "primitives") {
          const alternatives = semanticAliasesOf.get(ref);
          if (alternatives) {
            report(`skips the semantic tier with {${ref}}. Use ${alternatives.map((a) => `{${a}}`).join(" or ")}, which aliases the same primitive, so the component follows future semantic changes.`);
          }
        }
      }
    }
  },
};

const aliasRequired = {
  id: "tokens/alias-required",
  description: "Semantic and component tokens never hold raw values — they alias the tier below (README → Don'ts).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      if (leaf.tier === "primitives" || leaf.type === "opacity") continue; // opacity: tokens/opacity
      for (const [member, v] of membersOf(leaf.value)) {
        if (typeof v === "string" && aliasTarget(v)) continue;
        api.report({
          ...at(leaf),
          message: `${label(leaf)}${member ? `.${member}` : ""} holds the raw value ${JSON.stringify(v)}. ${leaf.tier === "semantic" ? "Alias a primitive" : "Alias a semantic token"} instead, or a palette change will stop propagating.`,
        });
      }
    }
  },
};

const referenceType = {
  id: "tokens/reference-type",
  description: "An alias points at a token of a compatible type (a colour at a colour, a dimension at a dimension).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      const target = t.model.byId.get(aliasTarget(leaf.value));
      if (!target) continue;
      const [a, b] = [TYPE_FAMILY[leaf.type], TYPE_FAMILY[target.type]];
      if (a && b && a !== b) {
        api.report({ ...at(leaf), message: `${label(leaf)} is a ${leaf.type} token but aliases the ${target.type} token {${target.id}}.` });
      }
    }
  },
};

const opacity = {
  id: "tokens/opacity",
  description: "Opacity is a 0–1 decimal held only by opacityScale primitives keyed by percent, and every step is mirrored one-to-one in semantic.opacity (README → Opacity tokens). The build enforces the same rules.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const p of opacityProblems(t.value)) {
      const loc = t.model.locate(p.tier, p.path, "value") ?? {};
      api.report({ file: TOKENS_FILE, ...loc, subject: p.path.join("."), message: p.message });
    }
  },
};

const noDisabledOpacity = {
  id: "tokens/no-disabled-opacity",
  description: "Disabled is a solid neutral, never an opacity (README → Disabled is not an opacity).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      if (leaf.type === "opacity" && /disabled/.test(leaf.id)) {
        api.report({ ...at(leaf, "key"), message: `${label(leaf)} expresses a disabled state as opacity. Use the solid disabled roles (text-disabled, bg-fill-disabled-strong, border-disabled-subtle, icon-disabled) instead.` });
      }
    }
  },
};

const canvasAsFill = {
  id: "tokens/canvas-as-fill",
  description: "Component tokens never alias the canvas colours bg or bg-secondary; controls take their body colour from bg-fill (README → Canvas and container pairing).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.inTier("component")) {
      const target = aliasTarget(leaf.value);
      if (target === "color.bg" || target === "color.bg-secondary") {
        api.report({ ...at(leaf), message: `${label(leaf)} aliases the canvas {${target}}. A control must look the same on either canvas — use {color.bg-fill} (or another bg-fill-* role).` });
      }
    }
  },
};

// ------------------------------------------------------------ typography ---

const typography = {
  id: "tokens/typography",
  description: "Typography composites are {group}.{size}.{weight}, take their family from typeface.default and their weight from the weight.* token their name gives (the layer a brand overrides), alias fontSize/lineHeight primitives, and share metrics across the weights of a size.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const { model } = t;
    const bySize = new Map();
    for (const leaf of model.leaves) {
      if (leaf.type !== "typography" || !isPlainObject(leaf.value)) continue;
      const report = (message) => api.report({ ...at(leaf), message: `${label(leaf)} ${message}` });
      if (leaf.path.length !== 3) report(`should be shaped {group}.{size}.{weight}, like body.medium.regular.`);
      const members = Object.keys(leaf.value);
      const missing = Object.keys(TYPOGRAPHY_MEMBERS).filter((m) => !members.includes(m));
      const extra = members.filter((m) => !(m in TYPOGRAPHY_MEMBERS));
      if (missing.length) report(`is missing ${missing.join(", ")}. Every style needs all four, and a size never ships without its line height.`);
      if (extra.length) report(`has ${extra.join(", ")}, which Cosmos does not use (there are no letter-spacing tokens).`);
      for (const member of ["fontSize", "lineHeight"]) {
        const ref = aliasTarget(leaf.value[member]);
        if (ref && ref.split(".")[0] !== TYPOGRAPHY_MEMBERS[member]) report(`.${member} aliases {${ref}}; it should alias a ${TYPOGRAPHY_MEMBERS[member]}.* primitive.`);
      }
      const familyRef = aliasTarget(leaf.value.fontFamily);
      if (familyRef && familyRef !== TYPEFACE_FAMILY) {
        report(`.fontFamily aliases {${familyRef}}; it should alias {${TYPEFACE_FAMILY}}, the one family token a brand overrides.`);
      }
      const weightRef = aliasTarget(leaf.value.fontWeight);
      if (weightRef && leaf.path.length === 3 && weightRef !== `weight.${leaf.path[2]}`) {
        report(`is named "${leaf.path[2]}" but uses {${weightRef}}. Its weight should be {weight.${leaf.path[2]}}, which each brand sets.`);
      }
      const r = model.resolve(leaf.id).value;
      const size = r && PX.exec(r.fontSize ?? "");
      const lh = r && PX.exec(r.lineHeight ?? "");
      if (size && lh && Number(lh[1]) < Number(size[1])) report(`has a line height (${r.lineHeight}) smaller than its font size (${r.fontSize}).`);
      const sizeKey = leaf.path.slice(0, -1).join(".");
      if (!bySize.has(sizeKey)) bySize.set(sizeKey, leaf);
      const first = bySize.get(sizeKey);
      for (const m of ["fontSize", "lineHeight", "fontFamily"]) {
        if (first !== leaf && first.value[m] !== leaf.value[m]) {
          report(`.${m} is ${leaf.value[m]} but ${first.id} uses ${first.value[m]}. Weights of one size share metrics; only fontWeight varies.`);
        }
      }
    }
  },
};

// ---------------------------------------------------------------- shadow ---

const shadow = {
  id: "tokens/shadow",
  description: "Shadows are one or two drop-shadow layers of x, y, blur and color only, aliasing shadowOffset, shadowBlur and color.alpha primitives (README → Shadow tokens). No spread and no inner shadows: SwiftUI and Compose cannot draw them.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      if (leaf.type !== "boxShadow" || !Array.isArray(leaf.value)) continue;
      const report = (message) => api.report({ ...at(leaf), message: `${label(leaf)} ${message}` });
      if (leaf.value.length > MAX_SHADOW_LAYERS) {
        report(`has ${leaf.value.length} layers. Cosmos shadows use at most ${MAX_SHADOW_LAYERS} (a tight key layer and a soft ambient one), because iOS and Android draw one layer per modifier.`);
      }
      leaf.value.forEach((layer, i) => {
        if (!isPlainObject(layer)) return; // tokens/value-format
        const n = i + 1;
        const keys = Object.keys(layer);
        const missing = Object.keys(SHADOW_MEMBERS).filter((m) => !keys.includes(m));
        if (missing.length) report(`layer ${n} is missing ${missing.join(", ")}. Every layer states all four, so no platform falls back to its own default.`);
        for (const key of keys) {
          if (key === "spread") report(`layer ${n} has a spread. SwiftUI shadows have no spread and Compose elevation has none either, so the shadow would look different on every platform; grow the blur instead.`);
          else if (key === "type") report(`layer ${n} sets a type. Every Cosmos shadow is a drop shadow, which is the default; leave the type out.`);
          else if (!(key in SHADOW_MEMBERS)) report(`layer ${n} has "${key}"; a layer holds only ${Object.keys(SHADOW_MEMBERS).join(", ")}.`);
        }
        for (const [member, root] of Object.entries(SHADOW_MEMBERS)) {
          const ref = aliasTarget(layer[member]);
          if (ref && !ref.startsWith(`${root}.`)) report(`layer ${n}.${member} aliases {${ref}}; it should alias a ${root}.* primitive.`);
        }
      });
    }
  },
};

// ---------------------------------------------------------------- scales ---

/** T-shirt size order: none < 3xs < 2xs < xs < sm < md < lg < xl < 2xl < … < full. */
export function tshirtRank(key) {
  if (key === "none") return -1000;
  if (key === "full") return 1000;
  if (key === "sm") return 0;
  if (key === "md") return 1;
  if (key === "lg") return 2;
  const m = /^(\d*)(xs|xl)$/.exec(key);
  if (!m) return null;
  const n = m[1] ? Number(m[1]) : 1;
  return m[2] === "xs" ? -n : 2 + n;
}

const scaleOrder = {
  id: "tokens/scale-order",
  description: "T-shirt scales (radius, icon, space and any other xs/sm/md/lg group) grow strictly with size, so md is always larger than sm.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const groups = new Map();
    for (const leaf of t.model.leaves) {
      if (TYPE_FAMILY[leaf.type] !== "dimension") continue;
      const key = leaf.path.at(-1);
      const rank = tshirtRank(key);
      if (rank === null) continue;
      const group = `${leaf.tier}.${leaf.path.slice(0, -1).join(".")}`;
      const px = PX.exec(t.model.resolve(leaf.id).value ?? "");
      if (!px) continue;
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push({ leaf, rank, px: Number(px[1]) });
    }
    for (const entries of groups.values()) {
      entries.sort((a, b) => a.rank - b.rank);
      for (let i = 1; i < entries.length; i += 1) {
        const [prev, cur] = [entries[i - 1], entries[i]];
        if (cur.px <= prev.px) {
          api.report({ ...at(cur.leaf), message: `${label(cur.leaf)} resolves to ${cur.px}px, not larger than ${prev.leaf.id} (${prev.px}px). A t-shirt scale must grow with size.` });
        }
      }
    }
  },
};

const colorRamp = {
  id: "tokens/color-ramp",
  description: "Each primitive palette darkens monotonically from step 50 to 950 (and every step is a solid colour), so step numbers mean the same thing in every hue.",
  check(api) {
    const t = load(api);
    if (!t) return;
    const palettes = t.value.primitives?.color ?? {};
    for (const [family, steps] of Object.entries(palettes)) {
      if (family === "alpha") continue;
      const entries = Object.keys(steps)
        .filter((k) => /^\d+$/.test(k))
        .sort((a, b) => Number(a) - Number(b))
        .map((k) => t.model.byId.get(`color.${family}.${k}`))
        .filter((leaf) => leaf && typeof leaf.value === "string" && HEX.test(leaf.value));
      for (const leaf of entries) {
        if (leaf.value.length === 9) api.report({ ...at(leaf), message: `${label(leaf)} is translucent; palette steps are solid.` });
      }
      for (let i = 1; i < entries.length; i += 1) {
        const [prev, cur] = [entries[i - 1], entries[i]];
        if (luminance(cur.value) >= luminance(prev.value)) {
          api.report({ ...at(cur), message: `${label(cur)} (${cur.value}) is not darker than ${prev.id} (${prev.value}). Steps must darken as the number rises.` });
        }
      }
    }
  },
};

// --------------------------------------------------------- semantic names ---

const SEMANTIC_COLOR_ROLE =
  /^(?:bg|bg-secondary|bg-surface(?:-[a-z0-9]+)*|bg-fill(?:-[a-z0-9]+)*|text(?:-[a-z0-9]+)+|border(?:-[a-z0-9]+)*|icon(?:-[a-z0-9]+)*|exp-[a-z]+-\d+|transparent)$/;

const semanticColorRole = {
  id: "tokens/semantic-color-role",
  description: "Semantic colours are named by role — bg, bg-surface-*, bg-fill-*, text-*, border-*, icon-*, or an exp-{hue}-{step} expressive alias (README → Semantic color taxonomy). Anything else lands in the docs site's Other bucket.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.inTier("semantic")) {
      if (leaf.path[0] !== "color" || leaf.path.length !== 2) continue;
      const key = leaf.path[1];
      if (!SEMANTIC_COLOR_ROLE.test(key)) {
        api.report({ ...at(leaf, "key"), message: `color.${key} does not fit the role taxonomy (bg, bg-secondary, bg-surface-*, bg-fill-*, text-*, border-*, icon-*, exp-{hue}-{step}). Name it by role, not by value.` });
      }
      if (/(^|-)(neutral|azure|brand|red|pomegranate|orange|tangerine|amber|yellow|lime|green|blue|indigo|violet|purple|fuchsia)-\d+$/.test(key) && !key.startsWith("exp-")) {
        api.report({ ...at(leaf, "key"), message: `color.${key} is named after a palette value. Semantic names describe intent (text-caution, not text-yellow-700).` });
      }
    }
  },
};

const expressiveMirror = {
  id: "tokens/expressive-mirror",
  description: "An expressive colour exp-{hue}-{step} aliases exactly color.{hue}.{step}; its name is a promise about its value.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.inTier("semantic")) {
      const m = leaf.path[0] === "color" && /^exp-([a-z]+)-(\d+)$/.exec(leaf.path[1] ?? "");
      if (!m) continue;
      const expected = `color.${m[1]}.${m[2]}`;
      if (aliasTarget(leaf.value) !== expected) {
        api.report({ ...at(leaf), message: `color.${leaf.path[1]} should alias {${expected}}, got ${JSON.stringify(leaf.value)}.` });
      }
    }
  },
};

const namespaceCollision = {
  id: "tokens/namespace-collision",
  description: "Every token gets a unique CSS and camelCase name in the flat output namespace, and no path exists in two tiers (excludeParentKeys would merge them into one token).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const [a, b] of t.model.crossTierDuplicates) {
      api.report({ ...at(b, "key"), message: `${b.id} exists in both ${a.tier} and ${b.tier}. After hoisting they collapse into one token; give the semantic root a different name (as spacing→space, opacityScale→opacity).` });
    }
    for (const [kind, fn] of [["CSS", cssName], ["camelCase", camelName]]) {
      const seen = new Map();
      for (const leaf of t.model.leaves) {
        for (const parts of emittedPaths(leaf, "all", t.model)) {
          const name = fn(parts);
          const prior = seen.get(name);
          if (prior && prior !== leaf) {
            api.report({ ...at(leaf, "key"), message: `${label(leaf)} emits the ${kind} name ${name}, which ${label(prior)} already emits. One would overwrite the other in dist/.` });
          } else {
            seen.set(name, leaf);
          }
        }
      }
    }
  },
};

// --------------------------------------------------------------- contrast ---

const AA_TEXT = 4.5;
const AA_GRAPHIC = 3;

/**
 * The azure exception (README → Azure contrast exception). The MakeMyTrip azure.700 is
 * matched to the product primary, and white on it reads at 3.52:1. Following Apple's
 * guidance rather than WCAG 1.4.3, text in a pairing where either side is an azure step
 * needs 3:1, not 4.5:1. It covers brand and info roles; other ramps keep 4.5:1.
 */
const AZURE_TEXT_FLOOR = 3;

/**
 * The myBiz brand-role exception (README → Azure contrast exception). The myBiz primary
 * sits on pomegranate.400, and white on it reads at 3.37:1. In the brands listed here,
 * text in a pairing where either side resolves through a semantic *-brand* role needs
 * 3:1 too. It is scoped by role, not by ramp: a status role on pomegranate keeps 4.5:1.
 */
const BRAND_ROLE_EXCEPTION_BRANDS = new Set(["mybiz"]);

/** Pairings accepted below their floor by design decision: component token → lowest ratio allowed. */
const ACCEPTED_BELOW_FLOOR = {
  // The lightened azure.600 hover dot on its azure.50 tint reads at 2.84:1; the hover step was kept by design decision (2026-10-07).
  "radio.dot-selected-hover": 2.8,
};

/** Foreground property → [WCAG threshold, criterion]. */
const COMPONENT_FOREGROUNDS = {
  label: [AA_TEXT, "1.4.3"],
  description: [AA_TEXT, "1.4.3"],
  icon: [AA_GRAPHIC, "1.4.11"],
  dot: [AA_GRAPHIC, "1.4.11"],
};

const contrastRule = {
  id: "tokens/contrast",
  description: "Paired foregrounds meet WCAG AA against their background: text-*-on-bg-fill*/on-bg-surface* against the matching fill (4.5:1), and each component's enabled label/description (4.5:1) and icon/dot (3:1) against the fill it sits on, or against both canvases when that fill is transparent. An -inverse component key uses bg-surface-inverse as its canvas, and a fill with a bg-opacity-* companion is blended over the canvas at that opacity first. Disabled states are exempt (WCAG 1.4.3). Text paired with an azure step, or with a brand role in myBiz, needs 3:1 (README → Azure contrast exception), and a few component pairings are accepted below their floor by name.",
  check(api) {
    const t = load(api);
    if (!t) return;
    // Every brand is checked: a brand set changes semantic colours, and every component
    // pairing built on them. The default brand reports as before; others name themselves.
    for (const [i, brand] of brandsOf(t.value).entries()) {
      const model = i === 0 ? t.model : buildTokenModel(tokensForBrand(t.value, brand.set), t.locations);
      checkContrast(api, model, i === 0 ? null : brand);
    }
  },
};

/** One brand of tokens/contrast. `brand` is null for the default brand. */
function checkContrast(api, model, brand) {
  const hex = (id) => {
    const v = model.resolve(id).value;
    return typeof v === "string" && HEX.test(v) ? v : null;
  };
  const canvases = ["color.bg", "color.bg-secondary"].filter((id) => hex(id));

  // A component key with an -inverse surface segment sits on the dark canvas instead.
  const inverseCanvases = ["color.bg-surface-inverse"].filter((id) => hex(id));

  const azure = new Set(
    model.inTier("primitives")
      .filter((leaf) => leaf.path[0] === "color" && leaf.path[1] === "azure")
      .map((leaf) => hex(leaf.id)?.toUpperCase()),
  );
  const isAzure = (h) => typeof h === "string" && azure.has(h.toUpperCase());

  /** True when the token, or anything it aliases on the way down, is a semantic *-brand* colour role. */
  const brandRoleException = brand !== null && BRAND_ROLE_EXCEPTION_BRANDS.has(brand.id);
  const isBrandRole = (id) => {
    for (const seen = new Set(); id && !seen.has(id); id = aliasTarget(model.byId.get(id)?.value)) {
      seen.add(id);
      const leaf = model.byId.get(id);
      if (!leaf) return false;
      if (leaf.tier === "semantic" && leaf.path[0] === "color" && /(^|-)brand(-|$)/.test(leaf.path[1])) return true;
    }
    return false;
  };

  /** bgIds are token ids, or { id, over, alpha } for a tint laid over a canvas at an opacity. */
  const check = (fgLeaf, bgIds, threshold, criterion) => {
    const fg = hex(fgLeaf.id);
    if (!fg) return;
    for (const entry of bgIds) {
      const tint = typeof entry === "object" ? entry : null;
      const bgId = tint ? `${tint.id} at ${Math.round(tint.alpha * 100)}% over ${tint.over}` : entry;
      const bg = tint ? hex(tint.id) && hex(tint.over) && composite(hex(tint.id), tint.alpha, hex(tint.over)) : hex(entry);
      if (!bg) continue;
      const ratio = contrast(fg, bg);
      let floor = threshold;
      let exception = "azure exception";
      if (criterion === "1.4.3" && (isAzure(fg) || isAzure(tint ? hex(tint.id) : bg))) floor = Math.min(floor, AZURE_TEXT_FLOOR);
      else if (criterion === "1.4.3" && brandRoleException && (isBrandRole(fgLeaf.id) || isBrandRole(tint ? tint.id : entry))) {
        floor = Math.min(floor, AZURE_TEXT_FLOOR);
        exception = `${brand.name} brand-role exception`;
      }
      if (fgLeaf.tier === "component" && fgLeaf.id in ACCEPTED_BELOW_FLOOR) floor = Math.min(floor, ACCEPTED_BELOW_FLOOR[fgLeaf.id]);
      if (ratio < floor) {
        api.report({
          ...at(fgLeaf),
          subject: `${fgLeaf.id} on ${tint ? tint.id : bgId}${brand ? ` in ${brand.id}` : ""}`,
          message: `${brand ? `In ${brand.name}, ` : ""}${label(fgLeaf)} (${fg}) on ${bgId} (${bg}) is ${formatRatio(ratio)}, below the ${floor}:1 ${floor < threshold ? `floor of the ${exception} (WCAG ${criterion} asks ${threshold}:1)` : `WCAG ${criterion} minimum`}.`,
        });
      }
    }
  };

  for (const leaf of model.inTier("semantic")) {
    if (leaf.path[0] !== "color") continue;
    const key = leaf.path[1];
    const m = /^text-([a-z]+)-on-(bg-fill|bg-surface)(-[a-z-]+)?$/.exec(key);
    if (!m) continue;
    const bgKey = `${m[2]}-${m[1]}${m[3] ?? ""}`;
    // A background split into -strong/-subtle (bg-surface-brand-pressed-*) keeps one
    // on-* text role, which must pass on every variant.
    const bgIds = model.byId.has(`color.${bgKey}`)
      ? [`color.${bgKey}`]
      : ["strong", "subtle"].map((s) => `color.${bgKey}-${s}`).filter((id) => model.byId.has(id));
    if (!bgIds.length) {
      api.report({ ...at(leaf, "key"), message: `color.${key} is named for color.${bgKey}, which does not exist (nor a -strong or -subtle variant of it). An on-* text role needs the fill it pairs with.` });
      continue;
    }
    check(leaf, bgIds, AA_TEXT, "1.4.3");
  }

  for (const leaf of model.inTier("component")) {
    if (TYPE_FAMILY[leaf.type] !== "color" || leaf.path.length !== 2) continue;
    const [group, key] = leaf.path;
    const prop = Object.keys(COMPONENT_FOREGROUNDS).find((p) => key.startsWith(`${p}-`));
    if (!prop || /(^|-)disabled(-|$)/.test(key)) continue;
    const suffix = key.slice(prop.length + 1);
    const candidates = [`bg-${suffix}`];
    if (prop === "icon" || prop === "dot") candidates.push(`bg-${suffix.replace(/^(un)?selected-/, "")}`);
    const bgKey = candidates.find((c) => model.byId.has(`${group}.${c}`));
    const bgHex = bgKey && hex(`${group}.${bgKey}`);
    const inverse = /(^|-)inverse(-|$)/.test(suffix) && inverseCanvases.length > 0;
    const opacityId = bgKey && `${group}.${bgKey.replace(/^bg-/, "bg-opacity-")}`;
    const alpha = opacityId && model.byId.has(opacityId) ? Number(model.resolve(opacityId).value) : null;
    let bgIds;
    if (bgKey && bgHex && !isFullyTransparent(bgHex) && alpha !== null && Number.isFinite(alpha)) {
      // A translucent tint: what the viewer sees is the tint blended over the canvas beneath.
      bgIds = (inverse ? inverseCanvases : canvases).map((over) => ({ id: `${group}.${bgKey}`, over, alpha }));
    } else if (bgKey && bgHex && !isFullyTransparent(bgHex)) {
      bgIds = [`${group}.${bgKey}`];
    } else {
      bgIds = inverse ? inverseCanvases : canvases;
    }
    check(leaf, bgIds, ...COMPONENT_FOREGROUNDS[prop]);
  }
}

// ----------------------------------------------------------- descriptions ---

const descriptionRequired = {
  id: "tokens/description-required",
  description: "Every semantic and component token, and every primitive colour, carries a description (README → Token descriptions).",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      const required = leaf.tier !== "primitives" || leaf.type === "color";
      if (required && (typeof leaf.description !== "string" || !leaf.description.trim())) {
        const why = leaf.tier === "primitives" ? "Run `node scripts/describe-primitives.mjs` to generate it." : "State its intent and boundary, and which neighbouring token to use instead.";
        api.report({ ...at(leaf, "key"), message: `${label(leaf)} has no description. ${why}` });
      }
    }
  },
};

const MIN_WORDS = 4;

const descriptionStyle = {
  id: "tokens/description-style",
  description: "Descriptions survive the Figma round-trip and read as sentences: no apostrophes (Figma stores them as &#39;), one trimmed line, a closing full stop, and more than a restatement of the name.",
  check(api) {
    const t = load(api);
    if (!t) return;
    for (const leaf of t.model.leaves) {
      const d = leaf.description;
      if (typeof d !== "string" || !d.trim()) continue;
      const report = (message) => api.report({ ...at(leaf, "description"), message: `${label(leaf)} description ${message}` });
      const apostrophe = /['’]/.exec(d);
      if (apostrophe) {
        const around = d.slice(Math.max(0, apostrophe.index - 20), apostrophe.index + 12);
        report(`contains an apostrophe ("…${around}…"). Figma's variable description setter HTML-escapes it to &#39;; reword it.`);
      }
      if (d !== d.trim() || /\s{2,}/.test(d)) report("has stray whitespace.");
      if (/[\r\n]/.test(d)) report("spans several lines; keep it to one.");
      if (!/[.!?]$/.test(d.trim())) report("should end with a full stop.");
      if (d.trim().split(/\s+/).length < MIN_WORDS) report(`is ${JSON.stringify(d)} — too short to state intent and boundary.`);
    }
  },
};

const primitiveDescriptions = {
  id: "tokens/primitive-descriptions",
  description: "Primitive descriptions (including the quoted contrast ratios and 'not referenced' notes) match what scripts/describe-primitives.mjs computes, so they cannot go stale when a ramp or its consumers change.",
  check(api) {
    const t = load(api);
    if (!t || !t.value.primitives?.color?.neutral?.["950"] || !t.value.primitives?.color?.neutral?.["0"]) return;
    const expected = structuredClone(t.value);
    try {
      describePrimitives(expected);
    } catch (error) {
      api.report({ file: TOKENS_FILE, message: `scripts/describe-primitives.mjs failed on the current tokens: ${error.message}` });
      return;
    }
    const want = new Map(buildLeafDescriptions(expected.primitives));
    for (const leaf of t.model.inTier("primitives")) {
      const w = want.get(leaf.id);
      if ((w ?? undefined) === (leaf.description ?? undefined)) continue;
      api.report({
        ...at(leaf, leaf.description ? "description" : "key"),
        message: w
          ? `${label(leaf)} description is stale. Expected: ${JSON.stringify(w)}. Run \`node scripts/describe-primitives.mjs\` (or lint --fix).`
          : `${label(leaf)} has a description the generator would drop (it is referenced and self-describing). Run \`node scripts/describe-primitives.mjs\` (or lint --fix).`,
      });
    }
  },
  fix(api) {
    const t = load(api);
    if (!t || t.duplicates.length) return;
    const json = structuredClone(t.value);
    describePrimitives(json);
    writeFileSync(api.abs(TOKENS_FILE), `${JSON.stringify(json, null, 2)}\n`);
  },
};

function* buildLeafDescriptions(node, path = []) {
  if (isLeaf(node)) {
    yield [path.join("."), node.description];
    return;
  }
  if (!isPlainObject(node)) return;
  for (const [k, v] of Object.entries(node)) yield* buildLeafDescriptions(v, [...path, k]);
}

export default [
  jsonSyntax,
  duplicateKey,
  structure,
  brandRule,
  keyFormat,
  type,
  valueFormat,
  primitiveScaleName,
  reference,
  tierReference,
  aliasRequired,
  referenceType,
  opacity,
  noDisabledOpacity,
  canvasAsFill,
  typography,
  shadow,
  scaleOrder,
  colorRamp,
  semanticColorRole,
  expressiveMirror,
  namespaceCollision,
  contrastRule,
  descriptionRequired,
  descriptionStyle,
  // Fixers run in this order: regenerate descriptions, then normalise layout.
  primitiveDescriptions,
  format,
];
