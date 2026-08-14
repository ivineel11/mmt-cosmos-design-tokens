/**
 * Add the Button component-token tier to tokens/tokens.json.
 *
 * Re-runnable and idempotent: it rewrites the tokens it owns and leaves everything
 * else untouched, so it can be run repeatedly (or after a hand-edit) without
 * duplicating or drifting. Run `npm run build:tokens` afterwards.
 *
 *   node scripts/add-button-tokens.mjs
 *
 * Three things happen here, in dependency order:
 *
 *   1. primitives   `color.transparent` and a `borderWidth` ramp — neither existed,
 *                   and the button needs both (transparent fills on tertiary/text
 *                   hierarchies, a 1px outline on secondary, a 2px focus ring).
 *   2. semantic     Interaction-state colours. Cosmos had no `*-hover` / `*-pressed`
 *                   roles at all, so a component token had nothing legitimate to
 *                   alias to. Added under the existing role taxonomy (README §3).
 *   3. component    `button.*` — the new third tier. Every entry aliases a semantic
 *                   token; no raw values, no primitive shortcuts (README best
 *                   practice #3 / Don't #3).
 *
 * Naming follows the repo, not the handoff brief: two levels deep, kebab-case leaf
 * with the role baked in (`button.bg-primary-hover`), matching `color.bg-fill-brand`
 * rather than the brief's 4-deep `button/{hierarchy}/bg/{state}`. Flat CSS output is
 * `--button-bg-primary-hover`, which is also the Figma variable name under the
 * `component` collection — identical keys on both sides, which is the whole point.
 */

import { readFileSync, writeFileSync } from "node:fs";

const TOKENS_PATH = new URL("../tokens/tokens.json", import.meta.url);

const color = (value) => ({ value, type: "color" });
const borderWidth = (value) => ({ value, type: "borderWidth" });
const sizing = (value) => ({ value, type: "sizing" });
const spacing = (value) => ({ value, type: "spacing" });
const radius = (value) => ({ value, type: "borderRadius" });

// ---------------------------------------------------------------------------
// 1. Primitives
// ---------------------------------------------------------------------------

// Grouped under `alpha` rather than sitting flat as `color.transparent`: outputs
// merge primitives and semantics into one namespace (README §10), so a flat
// primitive would collide with the semantic `color.transparent` role below and the
// build fails to resolve the reference. `alpha` also leaves room for future
// translucent overlays.
const PRIMITIVE_COLORS = {
  alpha: {
    transparent: color("#FFFFFF00"),
  },
};

const PRIMITIVE_BORDER_WIDTHS = {
  0: borderWidth("0px"),
  1: borderWidth("1px"),
  2: borderWidth("2px"),
};

// ---------------------------------------------------------------------------
// 2. Semantic — interaction states
// ---------------------------------------------------------------------------

// Hover darkens one step, pressed two, matching the palette's 100-step rhythm.
// Subtle surfaces move up the light end of the ramp instead (50 -> 100 -> 200)
// so low-emphasis hierarchies gain a tint rather than inverting.
const SEMANTIC_COLORS = {
  transparent: color("{color.alpha.transparent}"),

  "bg-fill-brand-hover": color("{color.brand.800}"),
  "bg-fill-brand-pressed": color("{color.brand.900}"),
  "bg-fill-warning-strong-hover": color("{color.red.800}"),
  "bg-fill-warning-strong-pressed": color("{color.red.900}"),

  "bg-surface-brand-hover": color("{color.brand.100}"),
  "bg-surface-brand-pressed": color("{color.brand.200}"),
  "bg-surface-warning-hover": color("{color.red.100}"),
  "bg-surface-warning-pressed": color("{color.red.200}"),

  "border-brand-hover": color("{color.brand.800}"),
  "border-brand-pressed": color("{color.brand.900}"),

  // `border-warning` is red.300 — a subtle divider, not an outline that can carry a
  // destructive action. This adds the emphasis counterpart so destructive outlines
  // sit at the same weight as `border-brand` (brand.700), using the strong/subtle
  // suffix pair the taxonomy already documents (README §3).
  "border-warning-strong": color("{color.red.700}"),
  "border-warning-strong-hover": color("{color.red.800}"),
  "border-warning-strong-pressed": color("{color.red.900}"),

  "text-brand-hover": color("{color.brand.800}"),
  "text-brand-pressed": color("{color.brand.900}"),
  "text-warning-hover": color("{color.red.800}"),
  "text-warning-pressed": color("{color.red.900}"),
};

// ---------------------------------------------------------------------------
// 3. Component — button
// ---------------------------------------------------------------------------

/**
 * Per-hierarchy colour recipe, expressed once per intent family. `accent` swaps
 * brand -> warning for the destructive intent; everything else is shared, which
 * keeps the two intents structurally identical by construction.
 */
const hierarchyRecipe = (accent, onFill) => ({
  primary: {
    bg: {
      default: `{color.bg-fill-${accent.fill}}`,
      hover: `{color.bg-fill-${accent.fill}-hover}`,
      pressed: `{color.bg-fill-${accent.fill}-pressed}`,
      disabled: "{color.bg-fill-disabled}",
    },
    label: { default: onFill, disabled: "{color.text-disabled}" },
    border: {
      default: "{color.transparent}",
      hover: "{color.transparent}",
      pressed: "{color.transparent}",
      disabled: "{color.transparent}",
    },
  },
  secondary: {
    bg: {
      default: "{color.transparent}",
      hover: `{color.bg-surface-${accent.surface}-hover}`,
      pressed: `{color.bg-surface-${accent.surface}-pressed}`,
      disabled: "{color.transparent}",
    },
    label: { default: `{color.text-${accent.text}}`, disabled: "{color.text-disabled}" },
    border: {
      default: `{color.border-${accent.border}}`,
      hover: `{color.border-${accent.border}-hover}`,
      pressed: `{color.border-${accent.border}-pressed}`,
      disabled: "{color.border-disabled}",
    },
  },
  tertiary: {
    bg: {
      default: `{color.bg-surface-${accent.surface}}`,
      hover: `{color.bg-surface-${accent.surface}-hover}`,
      pressed: `{color.bg-surface-${accent.surface}-pressed}`,
      disabled: "{color.bg-surface-disabled}",
    },
    label: { default: `{color.text-${accent.text}}`, disabled: "{color.text-disabled}" },
    border: {
      default: "{color.transparent}",
      hover: "{color.transparent}",
      pressed: "{color.transparent}",
      disabled: "{color.transparent}",
    },
  },
  // Text buttons stay inside the set: they keep the min-height and padding-x of
  // their size, so they remain 48px-tall touch targets rather than inline links.
  text: {
    bg: {
      default: "{color.transparent}",
      hover: `{color.bg-surface-${accent.surface}}`,
      pressed: `{color.bg-surface-${accent.surface}-hover}`,
      disabled: "{color.transparent}",
    },
    label: { default: `{color.text-${accent.text}}`, disabled: "{color.text-disabled}" },
    border: {
      default: "{color.transparent}",
      hover: "{color.transparent}",
      pressed: "{color.transparent}",
      disabled: "{color.transparent}",
    },
  },
});

const INTENTS = {
  // Default intent carries no infix, so `Primary / Default / Medium / Default` —
  // the variant that gets dropped on instantiation — reads as `bg-primary-default`.
  "": hierarchyRecipe(
    { fill: "brand", surface: "brand", text: "brand", border: "brand" },
    "{color.text-brand-on-bg-fill}",
  ),
  // Cosmos names its red role `warning`, not `error` or `destructive`. The Figma
  // property value stays `Destructive`; only the alias target uses the repo's word.
  destructive: hierarchyRecipe(
    { fill: "warning-strong", surface: "warning", text: "warning", border: "warning-strong" },
    "{color.text-warning-on-bg-fill-strong}",
  ),
};

function buildButtonTokens() {
  const out = {};

  for (const [intent, hierarchies] of Object.entries(INTENTS)) {
    const infix = intent ? `${intent}-` : "";
    for (const [hierarchy, groups] of Object.entries(hierarchies)) {
      for (const [group, states] of Object.entries(groups)) {
        for (const [state, value] of Object.entries(states)) {
          out[`${group}-${hierarchy}-${infix}${state}`] = color(value);
        }
      }
    }
  }

  // Focus ring is an outside-aligned stroke, never padding — a padding-based ring
  // shifts full-width instances by the ring width. Offset keeps it clear of the
  // secondary hierarchy's own 1px border.
  out["focus-ring"] = color("{color.border-focus}");
  out["focus-ring-width"] = borderWidth("{borderWidth.2}");
  out["focus-ring-offset"] = spacing("{space.3xs}");
  out["border-width"] = borderWidth("{borderWidth.1}");

  out.radius = radius("{radius.md}");

  // min-height is its own token rather than a by-product of padding: the 48px
  // touch target on Large has to survive font scaling.
  out["min-height-lg"] = sizing("{space.6xl}");
  out["min-height-md"] = sizing("{space.5xl}");
  out["min-height-sm"] = sizing("{space.3xl}");

  out["padding-x-lg"] = spacing("{space.lg}");
  out["padding-x-md"] = spacing("{space.md}");
  out["padding-x-sm"] = spacing("{space.sm}");

  // Not in the handoff brief, which lists padding-x only. min-height wins at the
  // default type scale, so these are invisible until the label wraps or the user
  // scales text up — at which point a button with zero vertical padding collapses
  // onto its own text. They are the floor, not the driver.
  out["padding-y-lg"] = spacing("{space.sm}");
  out["padding-y-md"] = spacing("{space.xs}");
  out["padding-y-sm"] = spacing("{space.2xs}");

  out["gap-lg"] = spacing("{space.xs}");
  out["gap-md"] = spacing("{space.xs}");
  out["gap-sm"] = spacing("{space.2xs}");

  out["icon-size-lg"] = sizing("{icon.sm}");
  out["icon-size-md"] = sizing("{icon.sm}");
  out["icon-size-sm"] = sizing("{icon.xs}");

  return out;
}

// ---------------------------------------------------------------------------

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));

Object.assign(tokens.primitives.color, PRIMITIVE_COLORS);
tokens.primitives.borderWidth = { ...tokens.primitives.borderWidth, ...PRIMITIVE_BORDER_WIDTHS };
Object.assign(tokens.semantic.color, SEMANTIC_COLORS);

const button = buildButtonTokens();
tokens.component = { ...tokens.component, button };

// Set order drives reference resolution: component aliases semantic, which aliases
// primitives, so component has to come last.
const order = tokens.$metadata.tokenSetOrder;
if (!order.includes("component")) order.push("component");

// Keep `$themes` / `$metadata` at the end of the file, where they already live.
const { $themes, $metadata, ...sets } = tokens;
writeFileSync(TOKENS_PATH, `${JSON.stringify({ ...sets, $themes, $metadata }, null, 2)}\n`);

console.log(
  [
    `primitives.color      +${Object.keys(PRIMITIVE_COLORS).length}`,
    `primitives.borderWidth +${Object.keys(PRIMITIVE_BORDER_WIDTHS).length}`,
    `semantic.color        +${Object.keys(SEMANTIC_COLORS).length}`,
    `component.button       ${Object.keys(button).length}`,
    `tokenSetOrder          ${order.join(", ")}`,
  ].join("\n"),
);
