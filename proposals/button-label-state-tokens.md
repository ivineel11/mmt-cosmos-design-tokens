# Per-state Button label tokens

**Status:** implemented in the token layer. **Figma bindings still outstanding** — see below.

## Problem

Six Button state combinations failed WCAG 1.4.3 (4.5:1 for normal text). They were not six separate mistakes but one structural gap.

The Button exposed exactly two label slots per hierarchy: `label-*-default` and `label-*-disabled`. Per `components/button.md`, the `-default` token served Default, Hover, Pressed **and** Focus. The label colour was frozen while the background deepened through `bg-surface-brand` 50 → 100 → 200, so contrast fell with nothing compensating.

| State | Background | Label (`text-brand`, brand.700) |
|---|---|---|
| default | brand.50 | 4.74 ✓ |
| hover | brand.100 | **4.29 ✗** |
| pressed | brand.200 | **3.75 ✗** |

Affected: `secondary hover/pressed`, `tertiary hover/pressed`, `text pressed`, `secondary-destructive pressed`, `tertiary-destructive pressed`.

Lightening the tints instead does not work. Hover could move to `brand.50` (4.74 ✓), but pressed would then need `brand.100`, still 4.29 ✗. Hover and pressed cannot stay visually distinct unless the label moves.

## Rejected: redefining the existing interaction roles

The first draft proposed redefining `text-brand-hover` (brand.600 → 800) and `text-brand-pressed` (800 → 900), plus the red equivalents, on the grounds that a hover colour *lighter* than its own base is incoherent now that `bg-fill-brand` darkens on interaction.

**That would have broken the Radio.** `components/radio.md` states that the dot uses the foreground ramp precisely because it steps 700 → 600 → 800 identically to `border-brand`, so ring and dot always resolve to the same hex — "what makes the control read as one mark rather than a ring with a separately-coloured filling":

| Radio state | Ring | Dot |
|---|---|---|
| default | `border-brand` #0067E8 | `text-brand` #0067E8 |
| hover | `border-brand-hover` #0681FF | `text-brand-hover` #0681FF |
| pressed | `border-brand-pressed` #0857C5 | `text-brand-pressed` #0857C5 |

Redefining only the text side would have left a brand.600 ring around a brand.800 dot. Redefining the border side too would have fixed that, but at the cost of darkening every secondary Button outline, Checkbox border and Radio ring — a broad visual change to components that were not failing.

`text-brand-hover` remains brand.600. It is correct for what it does — tracking `border-brand-hover` for foreground marks — and is simply not the right role for label text on a tinted surface.

## Implemented: four on-bg-surface roles

New semantic roles, named after `text-brand-on-bg-fill`: where `on-bg-fill` means "on the filled background", `on-bg-surface` means "on the tinted surface background".

| Token | Value |
|---|---|
| `text-brand-on-bg-surface-hover` | `{color.brand.800}` |
| `text-brand-on-bg-surface-pressed` | `{color.brand.900}` |
| `text-warning-on-bg-surface-hover` | `{color.red.800}` |
| `text-warning-on-bg-surface-pressed` | `{color.red.900}` |

Nothing outside Button consumes them, so Radio, Checkbox and the Button outlines are untouched. The ring-and-dot invariant still holds at every state.

## The 16 Button tokens

Every value verified against the background that state actually paints.

| Token | Aliases | On | Ratio |
|---|---|---|---|
| `label-primary-hover` | `text-brand-on-bg-fill` | brand.800 | 6.60 |
| `label-primary-pressed` | `text-brand-on-bg-fill` | brand.900 | 8.31 |
| `label-primary-destructive-hover` | `text-warning-on-bg-fill-strong` | red.600 | 4.76 |
| `label-primary-destructive-pressed` | `text-warning-on-bg-fill-strong` | red.800 | 8.35 |
| `label-secondary-hover` | `text-brand-on-bg-surface-hover` | brand.100 | 5.55 |
| `label-secondary-pressed` | `text-brand-on-bg-surface-pressed` | brand.200 | 6.09 |
| `label-secondary-destructive-hover` | `text-warning-on-bg-surface-hover` | red.100 | 6.85 |
| `label-secondary-destructive-pressed` | `text-warning-on-bg-surface-pressed` | red.200 | 6.89 |
| `label-tertiary-hover` | `text-brand-on-bg-surface-hover` | brand.100 | 5.55 |
| `label-tertiary-pressed` | `text-brand-on-bg-surface-pressed` | brand.200 | 6.09 |
| `label-tertiary-destructive-hover` | `text-warning-on-bg-surface-hover` | red.100 | 6.85 |
| `label-tertiary-destructive-pressed` | `text-warning-on-bg-surface-pressed` | red.200 | 6.89 |
| `label-text-hover` | `text-brand-on-bg-surface-hover` | brand.50 | 6.12 |
| `label-text-pressed` | `text-brand-on-bg-surface-pressed` | brand.100 | 6.99 |
| `label-text-destructive-hover` | `text-warning-on-bg-surface-hover` | red.50 | 7.63 |
| `label-text-destructive-pressed` | `text-warning-on-bg-surface-pressed` | red.100 | 8.22 |

The four `primary` entries do not change colour — white stays white on a solid fill. They exist so every hierarchy exposes the same per-state slots, matching how the transparent `border-*` tokens already work.

All 24 non-disabled Button states now pass AA, from 4.76 to 8.35.

## Outstanding: Figma bindings

The token layer is ahead of the Figma file until this is done:

1. Add 16 variables to the `component` collection under `button/`, and 4 to `semantic` under `color/`.
2. **Rebind the Label node's fill per State.** Today it is one binding — `button/label-{hierarchy}-default` covers Default, Hover, Pressed and Focus. It has to become a per-state binding, which changes the component's variant wiring, not just the variable list.
3. Focus keeps using the `-default` label. Focus does not change the background, so its contrast is unaffected.

Until step 2 lands, the Figma component will not show hover and pressed label colours even though the tokens exist — the same class of drift as the unbound `button/radius-*`.

## Out of scope

- **`text-tertiary` on `bg-surface` (4.34:1).** The fix is a primitive nudge (`neutral.500` `#737373` → `#6D6D6D`, giving 4.74) which steps off the standard Tailwind neutral ramp. Its token description records the shortfall.
- **The 12 disabled-state failures.** WCAG 1.4.3 exempts inactive controls.

## Verification

Ratios are WCAG 2.1, floored to two decimals so a failing value never displays as its threshold. Regenerate the primitive contrast descriptions with `node scripts/describe-primitives.mjs`.
