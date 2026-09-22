# Proposal: per-state Button label tokens

**Status:** draft, not implemented. Needs a design decision and matching Figma bindings.
**Depends on:** the contrast fixes already applied to `text-link`, `text-caution-on-bg-fill-subtle`, `bg-fill-brand-hover` and `bg-fill-brand-pressed`.

## Problem

Six Button state combinations fail WCAG 1.4.3 (4.5:1 for normal text). They are not six separate mistakes — they are one structural gap.

The Button exposes exactly two label slots per hierarchy: `label-*-default` and `label-*-disabled`. Per `components/button.md`, the `-default` token is used for Default, Hover, Pressed **and** Focus. So the label colour is frozen while the background deepens through `bg-surface-brand` 50 → 100 → 200. Contrast falls, with nothing compensating.

| State | Background | Label (`text-brand`, brand.700) |
|---|---|---|
| default | brand.50 | 4.74 ✓ |
| hover | brand.100 | **4.29 ✗** |
| pressed | brand.200 | **3.75 ✗** |

Affected: `secondary hover/pressed`, `tertiary hover/pressed`, `text pressed`, `secondary-destructive pressed`, `tertiary-destructive pressed`.

Lightening the tints instead does not work. Hover could move to `brand.50` (4.74 ✓), but pressed would then need `brand.100`, which is still 4.29 ✗. Hover and pressed cannot stay visually distinct unless the label moves.

## Prerequisite: make the interaction text roles darken

`text-brand-hover` is **brand.600** — *lighter* than the brand.700 base. Bound on a deepening tint it yields 3.15:1, worse than doing nothing. These roles were built for text on a white page, and their direction is wrong for a tinted fill. They are also internally inconsistent today: hover lightens while pressed darkens.

Four semantic edits make every brand and red interaction ramp darken monotonically, matching the `bg-fill-brand` fix already applied:

| Token | From | To |
|---|---|---|
| `text-brand-hover` | `{color.brand.600}` | `{color.brand.800}` |
| `text-brand-pressed` | `{color.brand.800}` | `{color.brand.900}` |
| `text-warning-hover` | `{color.red.600}` | `{color.red.800}` |
| `text-warning-pressed` | `{color.red.800}` | `{color.red.900}` |

### Knock-on: the Radio dot

These four roles have one other consumer each — the Radio dot on hover and pressed. The dot is a non-text graphic, so the 3:1 rule of WCAG 1.4.11 applies. All four improve:

| | Before | After |
|---|---|---|
| `radio/dot-selected-hover` | 3.48 | **6.12** |
| `radio/dot-selected-pressed` | 5.55 | **6.99** |
| `radio/dot-selected-error-hover` | 4.36 | **7.63** |
| `radio/dot-selected-error-pressed` | 6.85 | **8.22** |

None were failing, so this is a visual change rather than a fix: the Radio dot becomes darker on hover and pressed. **This needs a designer's sign-off** — it is the one place the proposal changes something that was not broken.

## The 16 new Button tokens

Every value is verified against the background that state actually paints. All 16 pass AA for normal text.

| Token | Aliases | On | Ratio |
|---|---|---|---|
| `label-primary-hover` | `text-brand-on-bg-fill` | brand.800 | 6.60 |
| `label-primary-pressed` | `text-brand-on-bg-fill` | brand.900 | 8.31 |
| `label-primary-destructive-hover` | `text-warning-on-bg-fill-strong` | red.600 | 4.76 |
| `label-primary-destructive-pressed` | `text-warning-on-bg-fill-strong` | red.800 | 8.35 |
| `label-secondary-hover` | `text-brand-hover` | brand.100 | 5.55 |
| `label-secondary-pressed` | `text-brand-pressed` | brand.200 | 6.09 |
| `label-secondary-destructive-hover` | `text-warning-hover` | red.100 | 6.85 |
| `label-secondary-destructive-pressed` | `text-warning-pressed` | red.200 | 6.89 |
| `label-tertiary-hover` | `text-brand-hover` | brand.100 | 5.55 |
| `label-tertiary-pressed` | `text-brand-pressed` | brand.200 | 6.09 |
| `label-tertiary-destructive-hover` | `text-warning-hover` | red.100 | 6.85 |
| `label-tertiary-destructive-pressed` | `text-warning-pressed` | red.200 | 6.89 |
| `label-text-hover` | `text-brand-hover` | brand.50 | 6.12 |
| `label-text-pressed` | `text-brand-pressed` | brand.100 | 6.99 |
| `label-text-destructive-hover` | `text-warning-hover` | red.50 | 7.63 |
| `label-text-destructive-pressed` | `text-warning-pressed` | red.100 | 8.22 |

The four `primary` entries do not change colour — white stays white on a solid fill. They exist so every hierarchy exposes the same slots, matching how the transparent `border-*` tokens already work.

### JSON to insert into `component.button`

```json
{
  "label-primary-hover": { "value": "{color.text-brand-on-bg-fill}", "type": "color" },
  "label-primary-pressed": { "value": "{color.text-brand-on-bg-fill}", "type": "color" },
  "label-primary-destructive-hover": { "value": "{color.text-warning-on-bg-fill-strong}", "type": "color" },
  "label-primary-destructive-pressed": { "value": "{color.text-warning-on-bg-fill-strong}", "type": "color" },
  "label-secondary-hover": { "value": "{color.text-brand-hover}", "type": "color" },
  "label-secondary-pressed": { "value": "{color.text-brand-pressed}", "type": "color" },
  "label-secondary-destructive-hover": { "value": "{color.text-warning-hover}", "type": "color" },
  "label-secondary-destructive-pressed": { "value": "{color.text-warning-pressed}", "type": "color" },
  "label-tertiary-hover": { "value": "{color.text-brand-hover}", "type": "color" },
  "label-tertiary-pressed": { "value": "{color.text-brand-pressed}", "type": "color" },
  "label-tertiary-destructive-hover": { "value": "{color.text-warning-hover}", "type": "color" },
  "label-tertiary-destructive-pressed": { "value": "{color.text-warning-pressed}", "type": "color" },
  "label-text-hover": { "value": "{color.text-brand-hover}", "type": "color" },
  "label-text-pressed": { "value": "{color.text-brand-pressed}", "type": "color" },
  "label-text-destructive-hover": { "value": "{color.text-warning-hover}", "type": "color" },
  "label-text-destructive-pressed": { "value": "{color.text-warning-pressed}", "type": "color" }
}
```

Descriptions follow the existing Button convention and can be generated alongside the rest.

## Figma work this requires

This is why the proposal is not merged with the token edits:

1. Add 16 variables to the `component` collection under `button/`.
2. **Rebind the Label node's fill per State.** Today it is one binding — `button/label-{hierarchy}-default` covers Default, Hover, Pressed and Focus. It has to become a per-state binding, which is a change to the component's variant wiring, not just a new variable.
3. Focus keeps using the `-default` label. Focus does not change the background, so its contrast is unaffected.

## Out of scope

- **`text-tertiary` on `bg-surface` (4.34:1).** Deliberately unfixed. The fix is a primitive nudge (`neutral.500` `#737373` → `#6D6D6D`, giving 4.74) which steps off the standard Tailwind neutral ramp. Its token description records the shortfall.
- **The 12 disabled-state failures.** WCAG 1.4.3 exempts inactive controls. No change needed and none proposed.

## Verification

Ratios here are WCAG 2.1, computed and floored to two decimals so a failing value never displays as its threshold. Regenerate the primitive contrast descriptions with:

```
node scripts/describe-primitives.mjs
```
