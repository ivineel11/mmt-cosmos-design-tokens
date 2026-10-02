/**
 * Regenerate the `description` on every primitive token in tokens/tokens.json.
 *
 * Colour descriptions state which of the two Cosmos text roles is safe on top of the
 * swatch and at what WCAG 2.1 contrast ratio, so the figures are computed rather than
 * written by hand. Re-run this whenever a ramp value changes, or the quoted ratios go
 * stale:  node scripts/describe-primitives.mjs
 *
 * Non-colour primitives are described only where the name under-specifies them (the
 * odd steps, the sentinels, the single-value scales) or where nothing references them.
 * A plain step like `spacing.16` is its own definition and stays undescribed.
 *
 * Avoid apostrophes in description text. Figma's variable `description` setter
 * HTML-escapes them, so "the element's height" is stored and displayed in the
 * variables panel as "the element&#39;s height". Write around it instead.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { contrast, formatRatio as fmt } from "./lib/color.mjs";

const FILE = new URL("../tokens/tokens.json", import.meta.url);

// Flooring (in formatRatio) rather than rounding matters: violet.500 sits at 4.4981
// against text-primary, which `toFixed` would print as "4.50:1" right next to a sentence
// saying it fails the 4.5 threshold. Flooring never overstates the contrast a swatch has.
const level = (r) => (r >= 7 ? "AA and AAA" : "AA");

// Primitives whose real-world pairing already fails, called out on the swatch itself.
const PAIRING_NOTES = {
  "brand.600":
    " Too weak for text: it fails AA on white at 3.75:1, which is why text-link and bg-fill-brand-hover were moved off it. It still backs border-focus and border-brand-hover, and text-brand-hover for the Radio dot — all non-text graphics under the 3:1 rule of WCAG 1.4.11, which it clears.",
  "yellow.100":
    " In use as bg-fill-caution-subtle it carries text-caution-on-bg-fill-subtle (yellow.800) at 6.36:1. The pairing used to be yellow.600 at 2.73:1, the worst in the system.",
  "neutral.500":
    " In use as text-tertiary it reads at 4.34:1 on bg-surface — just short of AA for normal text, though it clears AA for large text. Known and unfixed; text-tertiary is for metadata rather than content the user must read to act.",
  "neutral.400":
    " In use as text-disabled on bg-surface-disabled this reads at 2.05:1. WCAG 1.4.3 exempts inactive controls, so this is allowed rather than a defect.",
};

function colorDescription(family, step, hex, textPrimary, textInverse) {
  const dark = contrast(hex, textPrimary);
  const light = contrast(hex, textInverse);
  const head = `${family[0].toUpperCase()}${family.slice(1)} ramp, step ${step}.`;
  const note = PAIRING_NOTES[`${family}.${step}`] ?? "";

  if (dark >= 4.5 && light < 4.5) {
    return `${head} Safe text on top: text-primary at ${fmt(dark)} (passes ${level(dark)}); text-inverse fails at ${fmt(light)}.${note}`;
  }
  if (light >= 4.5 && dark < 4.5) {
    return `${head} Safe text on top: text-inverse at ${fmt(light)} (passes ${level(light)}); text-primary fails at ${fmt(dark)}.${note}`;
  }
  if (dark >= 4.5 && light >= 4.5) {
    return `${head} Both text roles pass AA on top — text-primary ${fmt(dark)}, text-inverse ${fmt(light)}.${note}`;
  }
  const [best, worst] = dark >= light ? ["text-primary", "text-inverse"] : ["text-inverse", "text-primary"];
  const [bestR, worstR] = dark >= light ? [dark, light] : [light, dark];
  if (bestR >= 3) {
    return `${head} No text role passes AA for normal text here — ${best} reaches only ${fmt(bestR)} and ${worst} ${fmt(worstR)}. Both clear 3:1, so large text (24px, or 18.66px bold) only; keep body copy off it.${note}`;
  }
  return `${head} Neither text role reaches 3:1 (${best} ${fmt(bestR)}, ${worst} ${fmt(worstR)}) — decorative use only, never behind text.${note}`;
}

// --- non-colour primitives that the name alone does not explain ----------------
const EXPLICIT = {
  "spacing.0": "Explicit zero. Use where a layout would otherwise apply a gap, so the intent reads as deliberate rather than omitted.",
  "spacing.10": "Off-ramp step that exists for a single consumer: radio/dot-size-md, which needs 10px where the semantic space scale jumps 8 to 12. Do not reach for it in layout — it is a gap-filler, not a scale step.",
  "spacing.86": "Off-ramp step that exists for a single consumer: button/min-width, the shared minimum width that lets a stretched button keep its width when its size changes. Do not reach for it in layout — it is a gap-filler, not a scale step.",
  "spacing.200": "Off-ramp step that exists for a single consumer: menu/min-width, the narrowest a menu panel gets so a menu of short labels still reads as a list. Do not reach for it in layout — it is a gap-filler, not a scale step.",
  "spacing.240": "Off-ramp step that exists for a single consumer: tooltip/max-width, the widest a Plain tooltip gets before its text wraps. Do not reach for it in layout — it is a gap-filler, not a scale step.",
  "spacing.320": "Off-ramp step that exists for two consumers: menu/max-width, the widest a menu panel gets before its labels wrap, and tooltip/rich-max-width, the widest a Rich tooltip gets. Do not reach for it in layout — it is a gap-filler, not a scale step.",
  "spacing.-12": "Negative spacing for pulling an element outward — overlapping avatars, bleeding a child past the padding of its parent. The build renames this key to `minus12` so it cannot collide with `12` once camel/kebab-cased.",
  "spacing.-8": "Negative spacing for pulling an element outward. The build renames this key to `minus8` to avoid colliding with `8`.",
  "spacing.-4": "Negative spacing for pulling an element outward. The build renames this key to `minus4` to avoid colliding with `4`.",
  "spacing.-2": "Negative spacing for pulling an element outward. The build renames this key to `minus2` to avoid colliding with `2`.",
  "borderRadius.0": "Explicit no rounding — flush edges, full-bleed media, table cells.",
  "borderRadius.999": "Pill sentinel, not a measured radius. Any value larger than half the height of the element renders as a semicircle, so this one token gives a fully rounded end at every size without tracking the element.",
  "borderWidth.0": "Explicit no border, for switching a border off while keeping the property bound to a token.",
  "borderWidth.1": "Default hairline border — inputs, cards, dividers, and the Checkbox box.",
  "borderWidth.2": "Heavier border, used for focus rings and for the Radio circle.",
  "fontFamily.lato": "The only family in the system. Every text style across every size, weight, hierarchy and platform resolves to it, so there is no fallback or secondary family to choose between.",
  "fontWeight.regular": "Default weight. Cosmos ships only three weights — regular, bold and black — so there is no medium or semibold step to reach for.",
  "fontWeight.bold": "Emphasis weight, and the weight every Button label uses at all three sizes.",
  "fontWeight.black": "Heaviest of the three weights, for promotional and marketing emphasis rather than routine UI.",
};

/**
 * The alpha palette holds the only colours with alpha baked into the hex. Apart from
 * `transparent`, each step is a palette step at a fixed alpha, keyed {family}-{step}-{percent}
 * (neutral-950-8), and exists for shadow layers, which take one colour and so cannot be
 * given a separate opacity token. The key is checked against the value so it cannot lie.
 */
function alphaDescription(json, key, value, isReferenced) {
  if (key === "transparent") {
    return "Fully transparent. Contrast is undefined — whatever sits behind shows through, so accessibility depends on that backdrop rather than on this token.";
  }
  const m = /^([a-z]+)-(\d+)-(\d+)$/.exec(key);
  const base = m && json.primitives.color[m[1]]?.[m[2]]?.value;
  if (!base) {
    throw new Error(`color.alpha.${key} should be keyed {family}-{step}-{percent} after an existing palette step, like neutral-950-8.`);
  }
  const percent = Number(m[3]);
  const expected = `${base}${Math.round(percent * 2.55).toString(16).toUpperCase().padStart(2, "0")}`;
  if (value !== expected) {
    throw new Error(`color.alpha.${key} should be ${expected} (${base} at ${percent}% alpha), got ${value}.`);
  }
  const family = m[1][0].toUpperCase() + m[1].slice(1);
  const text = `${family} ${m[2]} at ${percent}% alpha, for shadow layers only. A shadow layer takes a single colour, so its alpha lives in the hex; everywhere else, apply an opacity token to a solid colour instead.`;
  return isReferenced ? text : `${text} ${UNREFERENCED}`;
}

// --- apply ---------------------------------------------------------------------
const UNREFERENCED = "Not referenced by any semantic or component token — it is part of the raw scale, not of the supported system.";

function setDescription(token, description) {
  const { value, type, description: _drop, ...rest } = token;
  const rebuilt = { value, type, description, ...rest };
  for (const key of Object.keys(token)) delete token[key];
  Object.assign(token, rebuilt);
}

/**
 * Rewrite the description of every primitive in `json` in place. Pure apart from that
 * mutation, so the linter can run it on a copy and diff the result against the file.
 */
export function describePrimitives(json) {
  // The two text roles that can sit on a filled swatch.
  const textPrimary = json.primitives.color.neutral["950"].value; // semantic text-primary
  const textInverse = json.primitives.color.neutral["0"].value; // semantic text-inverse

  // Anything in semantic or component that points at a primitive, so unused steps can
  // say so rather than looking like part of the supported scale.
  const referenced = new Set();
  (function walk(node) {
    if (node && typeof node === "object" && "value" in node) {
      const scan = (s) => {
        for (const m of String(s).matchAll(/\{([^}]+)\}/g)) referenced.add(m[1]);
      };
      const v = node.value;
      const scanAll = (x) => {
        if (typeof x === "string") scan(x);
        else if (x && typeof x === "object") Object.values(x).forEach(scanAll);
      };
      scanAll(v);
      return;
    }
    if (node && typeof node === "object" && !Array.isArray(node)) Object.values(node).forEach(walk);
  })({ semantic: json.semantic, component: json.component });

  let colors = 0;
  let others = 0;

  for (const [family, steps] of Object.entries(json.primitives.color)) {
    for (const [step, token] of Object.entries(steps)) {
      if (family === "alpha") {
        setDescription(token, alphaDescription(json, step, token.value, referenced.has(`color.alpha.${step}`)));
      } else {
        setDescription(token, colorDescription(family, step, token.value, textPrimary, textInverse));
      }
      colors += 1;
    }
  }

  for (const [group, steps] of Object.entries(json.primitives)) {
    if (group === "color") continue;
    for (const [step, token] of Object.entries(steps)) {
      const explicit = EXPLICIT[`${group}.${step}`];
      const unused = !referenced.has(`${group}.${step}`);
      if (!explicit && !unused) {
        // Referenced and self-describing: drop any description left from when it was
        // unreferenced, or its "Not referenced" note would outlive the fact.
        if ("description" in token) {
          delete token.description;
          others += 1;
        }
        continue;
      }
      const description = [explicit, unused ? UNREFERENCED : null].filter(Boolean).join(" ");
      setDescription(token, description);
      others += 1;
    }
  }

  return { colors, others };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const json = JSON.parse(readFileSync(FILE, "utf8"));
  const { colors, others } = describePrimitives(json);
  writeFileSync(FILE, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`colour primitives described: ${colors}`);
  console.log(`other primitives described:  ${others}`);
}
