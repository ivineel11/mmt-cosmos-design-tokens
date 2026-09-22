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
 */
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../tokens/tokens.json", import.meta.url);
const json = JSON.parse(readFileSync(FILE, "utf8"));

// --- WCAG 2.1 relative luminance and contrast ---------------------------------
const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function luminance(hex) {
  const h = hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
}
// Floor rather than round: violet.500 sits at 4.4981 against text-primary, which
// `toFixed` would print as "4.50:1" right next to a sentence saying it fails the 4.5
// threshold. Flooring never overstates the contrast a swatch actually has.
const fmt = (r) => `${(Math.floor(r * 100) / 100).toFixed(2)}:1`;
const level = (r) => (r >= 7 ? "AA and AAA" : "AA");

// The two text roles that can sit on a filled swatch.
const TEXT_PRIMARY = json.primitives.color.neutral["950"].value; // semantic text-primary
const TEXT_INVERSE = json.primitives.color.neutral["0"].value; // semantic text-inverse

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

function colorDescription(family, step, hex) {
  const dark = contrast(hex, TEXT_PRIMARY);
  const light = contrast(hex, TEXT_INVERSE);
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
  "spacing.-12": "Negative spacing for pulling an element outward — overlapping avatars, bleeding a child past its parent's padding. The build renames this key to `minus12` so it cannot collide with `12` once camel/kebab-cased.",
  "spacing.-8": "Negative spacing for pulling an element outward. The build renames this key to `minus8` to avoid colliding with `8`.",
  "spacing.-4": "Negative spacing for pulling an element outward. The build renames this key to `minus4` to avoid colliding with `4`.",
  "spacing.-2": "Negative spacing for pulling an element outward. The build renames this key to `minus2` to avoid colliding with `2`.",
  "borderRadius.0": "Explicit no rounding — flush edges, full-bleed media, table cells.",
  "borderRadius.999": "Pill sentinel, not a measured radius. Any value larger than half the element's height renders as a semicircle, so this one token gives a fully rounded end at every size without tracking the element.",
  "borderWidth.0": "Explicit no border, for switching a border off while keeping the property bound to a token.",
  "borderWidth.1": "Default hairline border — inputs, cards, dividers, and the Checkbox box.",
  "borderWidth.2": "Heavier border, used for focus rings and for the Radio circle.",
  "fontFamily.lato": "The only family in the system. Every text style across every size, weight, hierarchy and platform resolves to it, so there is no fallback or secondary family to choose between.",
  "fontWeight.regular": "Default weight. Cosmos ships only three weights — regular, bold and black — so there is no medium or semibold step to reach for.",
  "fontWeight.bold": "Emphasis weight, and the weight every Button label uses at all three sizes.",
  "fontWeight.black": "Heaviest of the three weights, for promotional and marketing emphasis rather than routine UI.",
};

// --- apply ---------------------------------------------------------------------
// Anything in semantic or component that points at a primitive, so unused steps can
// say so rather than looking like part of the supported scale.
const referenced = new Set();
(function walk(node) {
  if (node && typeof node === "object" && "value" in node) {
    const scan = (s) => {
      for (const m of String(s).matchAll(/\{([^}]+)\}/g)) referenced.add(m[1]);
    };
    const v = node.value;
    if (typeof v === "string") scan(v);
    else if (v && typeof v === "object") Object.values(v).forEach(scan);
    return;
  }
  if (node && typeof node === "object" && !Array.isArray(node)) Object.values(node).forEach(walk);
})({ semantic: json.semantic, component: json.component });

const UNREFERENCED = "Not referenced by any semantic or component token — it is part of the raw scale, not of the supported system.";

function setDescription(token, description) {
  const { value, type, description: _drop, ...rest } = token;
  const rebuilt = { value, type, description, ...rest };
  for (const key of Object.keys(token)) delete token[key];
  Object.assign(token, rebuilt);
}

let colors = 0;
let others = 0;

for (const [family, steps] of Object.entries(json.primitives.color)) {
  for (const [step, token] of Object.entries(steps)) {
    if (family === "alpha") {
      setDescription(
        token,
        "Fully transparent. Contrast is undefined — whatever sits behind shows through, so accessibility depends on that backdrop rather than on this token.",
      );
    } else {
      setDescription(token, colorDescription(family, step, token.value));
    }
    colors += 1;
  }
}

for (const [group, steps] of Object.entries(json.primitives)) {
  if (group === "color") continue;
  for (const [step, token] of Object.entries(steps)) {
    const explicit = EXPLICIT[`${group}.${step}`];
    const unused = !referenced.has(`${group}.${step}`);
    if (!explicit && !unused) continue;
    const description = [explicit, unused ? UNREFERENCED : null].filter(Boolean).join(" ");
    setDescription(token, description);
    others += 1;
  }
}

writeFileSync(FILE, `${JSON.stringify(json, null, 2)}\n`);
console.log(`colour primitives described: ${colors}`);
console.log(`other primitives described:  ${others}`);
