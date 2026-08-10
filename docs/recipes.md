# Component recipes

The exact token for every part of the components Cosmos is most often used to
build. Recipes are what make generated UI deterministic: without them, two
authors asked for "a primary button" produce two different paddings.

All names are semantic tokens. In CSS prefix with `--` and kebab the path
(`space.md` → `var(--space-md)`); in TypeScript, Swift and Kotlin see
`platforms` in `dist/tokens.json`.

Every recipe assumes the same transition unless stated:
`motion.duration.fast` with `motion.easing.move`.

---

## Button

| Part | Primary | Secondary | Tertiary | Destructive |
|---|---|---|---|---|
| Fill | `bg-fill-brand` | `bg-fill-secondary` | `bg-fill-brand-subtle` | `bg-fill-danger-strong` |
| Fill, hover | `bg-fill-brand-hover` | `bg-fill-secondary-hover` | `bg-fill-brand-subtle-hover` | `bg-fill-danger-strong-hover` |
| Fill, pressed | `bg-fill-brand-active` | `bg-fill-secondary-active` | `bg-fill-brand-subtle-active` | `bg-fill-danger-strong-active` |
| Fill, disabled | `bg-fill-disabled` | `bg-fill-disabled` | `bg-fill-disabled` | `bg-fill-disabled` |
| Label | `text-brand-on-bg-fill` | `text-primary` | `text-brand-on-bg-fill-subtle` | `text-danger-on-bg-fill-strong` |
| Label, disabled | `text-disabled` | `text-disabled` | `text-disabled` | `text-disabled` |
| Icon | `icon-brand-on-bg-fill` | `icon` | `icon-brand-on-bg-fill-subtle` | `icon-danger-on-bg-fill-strong` |
| Border | none | `border` | none | none |

Shared across all variants:

| Property | Token |
|---|---|
| Typography | `label.medium.bold` |
| Padding, vertical | `space.sm` |
| Padding, horizontal | `space.md` |
| Gap (icon to label) | `space.2xs` |
| Radius | `radius.md` |
| Icon size | `icon.md` |
| Focus ring | `border-focus` at `focusRing.width`, offset `focusRing.offset` |

> Primary button labels are bold 14px+, which is why `text-brand-on-bg-fill` at
> 3.39:1 is acceptable. Do not use that pairing for small regular-weight text.

Small buttons: `label.small.bold`, `space.2xs` / `space.sm` padding, `icon.xs`.

---

## Input

| Part | Token |
|---|---|
| Background | `bg-fill` |
| Background, disabled | `bg-surface-disabled` |
| Border | `border` |
| Border, hover | `border-hover` |
| Border, focus | `border-focus` at `focusRing.width` |
| Border, error | `border-danger` |
| Border, disabled | `border-disabled` |
| Border width | `borderWidth.thin` |
| Text | `text-primary` |
| Placeholder | `text-tertiary` |
| Label (above) | `text-secondary` + `label.small.bold` |
| Helper text | `text-secondary` + `body.small.regular` |
| Error text | `text-danger` + `body.small.regular` |
| Leading/trailing icon | `icon-secondary` at `icon.sm` |
| Padding | `space.sm` vertical, `space.sm` horizontal |
| Gap, label to field | `space.2xs` |
| Radius | `radius.sm` |
| Typography | `body.medium.regular` |

---

## Card

| Part | Token |
|---|---|
| Background | `bg-surface` |
| Background, clickable hover | `bg-surface-hover` |
| Background, clickable pressed | `bg-surface-active` |
| Background, selected | `bg-surface-selected` |
| Border | `border-secondary` at `borderWidth.thin` |
| Border, selected | `border-brand` at `borderWidth.thick` |
| Padding | `space.md` |
| Radius | `radius.lg` |
| Gap between cards | `space.xl` |
| Title | `title.medium.bold` + `text-primary` |
| Body | `body.medium.regular` + `text-secondary` |
| Gap, title to body | `space.2xs` |
| Nested inner container | `bg-surface-secondary` |

Cosmos separates layers by tint, not shadow — there is no elevation token. A card
is `bg-surface` on `bg`, and a container inside it is `bg-surface-secondary`.

---

## Badge

| Intent | Fill | Text | Icon |
|---|---|---|---|
| Neutral | `bg-fill-secondary` | `text-primary` | `icon` |
| Brand | `bg-fill-brand-subtle` | `text-brand-on-bg-fill-subtle` | `icon-brand-on-bg-fill-subtle` |
| Info | `bg-fill-info-subtle` | `text-info-on-bg-fill-subtle` | `icon-info-on-bg-fill-subtle` |
| Success | `bg-fill-success-subtle` | `text-success-on-bg-fill-subtle` | `icon-success-on-bg-fill-subtle` |
| Caution | `bg-fill-caution-subtle` | **`text-primary`** | **`icon`** |
| Danger | `bg-fill-danger-subtle` | `text-danger-on-bg-fill-subtle` | `icon-danger-on-bg-fill-subtle` |

| Property | Token |
|---|---|
| Typography | `label.small.bold` |
| Padding | `space.3xs` vertical, `space.2xs` horizontal |
| Radius | `radius.full` |
| Icon size | `icon.2xs` |

> The caution row deliberately breaks the `pairsWith` pattern.
> `text-caution-on-bg-fill-subtle` is 2.73:1 and fails WCAG AA — use
> `text-primary` until the caution ramp is retuned.

Use `-strong` fills with the matching `-on-bg-fill-strong` foregrounds for a
solid, high-emphasis badge.

---

## Banner / inline alert

| Part | Token |
|---|---|
| Background | `bg-surface-{info,success,caution,danger}` |
| Border | `border-{info,success,caution,danger}` at `borderWidth.thin` |
| Accent bar (optional) | `bg-fill-{intent}-strong` at `borderWidth.thicker` |
| Leading icon | `icon-{intent}` at `icon.sm` |
| Title | `title.small.bold` + `text-primary` |
| Body | `body.medium.regular` + `text-secondary` |
| Link | `text-link`, underlined |
| Padding | `space.md` |
| Gap, icon to content | `space.xs` |
| Radius | `radius.md` |

> For a caution banner use `icon-caution` **with** text — at 2.94:1 it is below
> the 3:1 non-text minimum, so it must never be the only signal.

---

## Modal / bottom sheet

| Part | Token |
|---|---|
| Surface | `bg-surface-secondary` |
| Scrim | `bg-surface-inverse` at 50% opacity (no opacity token — see AGENTS.md) |
| Radius | `radius.xl` |
| Padding | `space.lg` |
| Title | `headline.small.bold` + `text-primary` |
| Body | `body.medium.regular` + `text-secondary` |
| Divider | `border-secondary` at `borderWidth.thin` |
| Gap, title to body | `space.sm` |
| Gap, body to actions | `space.lg` |
| Gap between actions | `space.xs` |
| Enter | `motion.duration.slow` + `motion.easing.enter` |
| Exit | `motion.duration.normal` + `motion.easing.exit` |

---

## List row

| Part | Token |
|---|---|
| Background | `bg-surface` |
| Background, hover | `bg-surface-hover` |
| Background, selected | `bg-fill-selected` |
| Separator | `border-secondary` at `borderWidth.thin` |
| Primary text | `body.medium.regular` + `text-primary` |
| Secondary text | `body.small.regular` + `text-secondary` |
| Metadata | `body.small.regular` + `text-tertiary` |
| Leading icon | `icon-secondary` at `icon.md` |
| Trailing chevron | `icon-tertiary` at `icon.sm` |
| Padding | `space.sm` vertical, `space.md` horizontal |
| Gap, icon to text | `space.xs` |
| Gap, primary to secondary | `space.3xs` |

---

## Tabs

| Part | Token |
|---|---|
| Track | `bg-fill-secondary` |
| Label, unselected | `text-secondary` + `label.medium.regular` |
| Label, selected | `text-brand` + `label.medium.bold` |
| Label, hover | `text-primary` |
| Indicator | `bg-fill-brand` at `borderWidth.thick` |
| Selected background (pill style) | `bg-fill-brand-subtle` |
| Padding | `space.xs` vertical, `space.sm` horizontal |
| Radius (pill style) | `radius.full` |
| Indicator transition | `motion.duration.normal` + `motion.easing.move` |

---

## Tooltip / toast

| Part | Token |
|---|---|
| Background | `bg-fill-inverse` |
| Text | `text-inverse` + `body.small.regular` |
| Icon | `icon-inverse` at `icon.xs` |
| Padding | `space.2xs` vertical, `space.xs` horizontal |
| Radius | `radius.sm` |
| Enter | `motion.duration.normal` + `motion.easing.enter` |
| Exit | `motion.duration.fast` + `motion.easing.exit` |

---

## Toggle / checkbox

| Part | Unchecked | Checked | Disabled |
|---|---|---|---|
| Track / box fill | `bg-fill-secondary` | `bg-fill-brand` | `bg-fill-disabled` |
| Border | `border` | none | `border-disabled` |
| Knob / check mark | `bg-fill` | `icon-brand-on-bg-fill` | `icon-disabled` |

| Property | Token |
|---|---|
| Radius, toggle | `radius.full` |
| Radius, checkbox | `radius.xs` |
| Label | `label.medium.regular` + `text-primary` |
| Gap, control to label | `space.xs` |
| Transition | `motion.duration.fast` + `motion.easing.move` |
| Focus ring | `border-focus` at `focusRing.width`, offset `focusRing.offset` |

---

## Empty state

| Part | Token |
|---|---|
| Illustration / icon | `icon-tertiary` at `icon.3xl` |
| Title | `title.large.bold` + `text-primary` |
| Body | `body.medium.regular` + `text-secondary` |
| Gap, icon to title | `space.md` |
| Gap, title to body | `space.2xs` |
| Gap, body to action | `space.lg` |
| Section padding | `space.6xl` |
