# Material 3 colour roles

Status: draft for review. No tokens have changed in code. Built in the Figma branch [Material roles](https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/branch/juooG0vf9OurLFgzYXvZ4q/Cosmos-Design-Tokens--Experimental-?node-id=1075-38) for comparison with `surface-fill-tint-merge.md` and `single-bg-role.md`.

## What Material 3 does

Material 3 (m3.material.io → Styles → Color → Color roles, read 2026-10-11) has 26 standard colour roles in six groups: primary, secondary, tertiary, error, surface and outline. Optional add-ons cover fixed accents and surface dim and bright.

- **One name per colour, not per property.** `primary` colours fills, text, icons and borders alike. Text and icons that sit on a colour take `on-{role}`, a tinted fill for a component is `{role}-container`, and `variant` means a lower-emphasis alternative.
- **Surfaces are ranked by emphasis:** `surface` for the page, then `surface-container-lowest`, `-low`, `surface-container`, `-high` and `-highest` for containers, plus `surface-dim` and `surface-bright`.
- **No state colours.** Hover, focus and pressed are drawn as a layer of the on-colour at 8% or 10% over the base, and disabled is the on-surface colour at 12% or 38%.
- **Error is the only status group.** Other statuses are added as custom colour groups that follow the error pattern.

## Decisions

Vineel chose 1 to 4. Rules 5 to 8 follow from mapping the tokens.

1. **Rename in place.** The MakeMyTrip collection takes Material names, as a trial of living with them. Nothing changes colour.
2. **Solid states stay.** Hover and pressed remain solid steps with a `-hover` or `-pressed` suffix, as Cosmos requires. Material state layers are not adopted.
3. **Success, caution and info become custom groups** that follow the error pattern. Error is the Cosmos warning red.
4. **Secondary is the neutral control colour,** used for the switch track and the segmented track. Tertiary is unused, because Cosmos has one brand hue.
5. **Text, icon and border tokens merge when they are the same colour in every brand.** `text-brand`, `icon-brand`, `border-brand` and `bg-fill-brand` all become `primary`. In total, 146 tokens collapse into 60 roles. Every merge was checked to be the same colour in MakeMyTrip, myBiz and Goibibo.
6. **Material strength words replace subtle and subtlest** wherever a ladder is needed. That covers the disabled ladder (`disabled-container-lowest` through `-highest`) and the badge tints (`error-container-high`).
7. **`variant` keeps the Material meaning of lower emphasis.** For example, `inverse-primary-variant` is the 400 icon and border colour on a dark background.
8. **Brand content gets its own states.** On hover, the brand fill darkens (800) but brand text, icons and borders lighten (600), so they become `on-surface-primary-hover` and `-pressed`. Error fill and error text share their state colours, so error needs no such pair.

## Result

The 207 Cosmos colour role tokens become **121 names:**

- **20 standard Material roles.**
- **9 roles from the custom groups:** `success`, `on-success` and `success-container`, and the same three for caution and info.
- **92 extensions.** These are mostly hover and pressed states, the disabled ladder, inverse accents, links, focus and status outlines.

These standard roles have no Cosmos token:
- `on-primary-container` and `on-error-container`. Cosmos puts `primary` or `error` text on the tint at rest.
- `on-secondary` and `on-secondary-container`.
- The four tertiary roles.
- `surface-container-high`, `surface-container-highest` and `surface-bright`.

The other 110 tokens (`exp-*` and `transparent`) keep their names.

## What the mapping shows

- **Material fits the Cosmos surfaces well, and it keeps the canvas and container distinction:**
  - `surface` and `surface-container-lowest` are both white: page and card.
  - `surface-dim` and `surface-container` are both grey: grey page and grey well.

  This is exactly what the single-bg-role trial lost.
- **It fits states badly.** Most of the 92 extensions exist because Cosmos uses solid steps where Material uses state layers and opacity. If Cosmos ever adopts state layers, most of them would go.
- **One name across text, icon and border works today.** All 146 merges are exact, so the text/icon split in Cosmos currently carries no colour difference.
- **The white control body merges with the white card.** Both become `surface-container-lowest`. Their hovers differ:
  - The control hover (`neutral.100`) becomes `surface-container-lowest-hover`.
  - The card hover (`neutral.50`, unused by components) becomes `surface-container-low`.
- **Placeholder text merges into `on-surface-variant-low`.** It is the same grey and unused.

## Open questions

1. **State layers.** Trial them later, to remove most extensions? That would change how every interactive component is built and linted.
2. **`on-primary-container` at rest.** Add the role, pointing at the same colour as `primary`, so the pairing reads the Material way? Or leave it out?
3. **Links stay outside Material.** `text-link` is azure in every brand, so it cannot merge with `primary`.
4. **Developer names.** Material code uses `md.sys.color.primary`. This keeps the Cosmos form: `color/primary` in Figma, and the same name with the usual colour prefix in CSS.

## Mapping

### Surfaces (13)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `surface` | `bg` | `neutral.0` | M3 |
| `surface-dim` | `bg-secondary` | `neutral.100` | M3 |
| `surface-container` | `bg-surface` | `neutral.100` | M3 |
| `surface-container-hover` | `bg-surface-hover` | `neutral.200` | Extension |
| `surface-container-pressed` | `bg-surface-pressed` | `neutral.300` | Extension |
| `surface-container-lowest` | `bg-surface-secondary`, `bg-fill` | `neutral.0` | M3 |
| `surface-container-low` | `bg-surface-secondary-hover` | `neutral.50` | M3 |
| `surface-container-lowest-hover` | `bg-fill-hover` | `neutral.100` | Extension |
| `surface-container-lowest-pressed` | `bg-fill-pressed-subtle`, `bg-surface-secondary-pressed` | `neutral.100` | Extension |
| `surface-container-lowest-pressed-strong` | `bg-fill-pressed-strong` | `neutral.200` | Extension |
| `inverse-surface` | `bg-surface-inverse`, `bg-fill-inverse` | `neutral.950` | M3 |
| `inverse-surface-hover` | `bg-fill-inverse-hover` | `neutral.900` | Extension |
| `inverse-surface-pressed` | `bg-fill-inverse-pressed` | `neutral.800` | Extension |

### Neutral controls (secondary) (6)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `secondary` | `bg-fill-neutral-strong` | `neutral.300` | M3 |
| `secondary-hover` | `bg-fill-neutral-strong-hover` | `neutral.400` | Extension |
| `secondary-pressed` | `bg-fill-neutral-strong-pressed` | `neutral.500` | Extension |
| `secondary-container` | `bg-fill-secondary` | `neutral.100` | M3 |
| `secondary-container-hover` | `bg-fill-secondary-hover` | `neutral.200` | Extension |
| `secondary-container-pressed` | `bg-fill-secondary-pressed` | `neutral.300` | Extension |

### Disabled (13)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `inverse-surface-disabled` | `bg-fill-inverse-disabled` | `neutral.800` | Extension |
| `disabled-container-lowest` | `bg-surface-disabled-subtle` | `neutral.50` | Extension |
| `disabled-container-low` | `bg-fill-disabled-subtlest` | `neutral.100` | Extension |
| `disabled-container` | `bg-fill-disabled-subtle`, `bg-surface-disabled` | `neutral.200` | Extension |
| `disabled-container-high` | `bg-fill-disabled` | `neutral.300` | Extension |
| `disabled-container-highest` | `bg-fill-disabled-strong` | `neutral.400` | Extension |
| `on-disabled-container-highest` | `icon-on-bg-fill-disabled-strong` | `neutral.0` | Extension |
| `on-surface-disabled` | `text-disabled`, `icon-disabled` | `neutral.400` | Extension |
| `inverse-on-surface-disabled` | `text-inverse-disabled`, `icon-inverse-disabled` | `neutral.500` | Extension |
| `outline-disabled` | `border-disabled-strong` | `neutral.400` | Extension |
| `outline-variant-disabled` | `border-disabled-subtle` | `neutral.300` | Extension |
| `outline-variant-disabled-low` | `border-disabled-subtlest` | `neutral.100` | Extension |
| `inverse-outline-disabled` | `border-inverse-disabled` | `neutral.600` | Extension |

### Neutral text and icons (9)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `on-surface` | `text-primary`, `icon` | `neutral.950` | M3 |
| `on-surface-variant` | `text-secondary`, `icon-secondary` | `neutral.600` | M3 |
| `on-surface-variant-low` | `text-tertiary`, `text-placeholder`, `icon-tertiary` | `neutral.500` | Extension |
| `inverse-on-surface` | `text-inverse`, `icon-inverse` | `neutral.0` | M3 |
| `inverse-on-surface-variant` | `text-inverse-secondary`, `icon-inverse-secondary` | `neutral.400` | Extension |
| `link` | `text-link` | `azure.800` | Extension |
| `link-hover` | `text-link-hover` | `azure.900` | Extension |
| `link-pressed` | `text-link-pressed` | `azure.950` | Extension |
| `inverse-link` | `text-link-inverse` | `azure.300` | Extension |

### Outlines (10)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `outline` | `border-strong` | `neutral.500` | M3 |
| `outline-variant` | `border` | `neutral.300` | M3 |
| `outline-variant-low` | `border-secondary` | `neutral.200` | Extension |
| `outline-variant-hover` | `border-hover` | `neutral.400` | Extension |
| `outline-focus` | `border-focus` | `azure.700` | Extension |
| `inverse-outline` | `border-inverse` | `neutral.800` | Extension |
| `outline-error` | `border-warning` | `red.300` | Extension |
| `outline-success` | `border-success` | `green.300` | Extension |
| `outline-caution` | `border-caution` | `yellow.300` | Extension |
| `outline-info` | `border-info` | `azure.300` | Extension |

### Primary (brand) (17)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `primary` | `bg-fill-brand`, `text-brand`, `icon-brand`, `border-brand` | `azure.700` | M3 |
| `primary-hover` | `bg-fill-brand-hover` | `azure.800` | Extension |
| `primary-pressed` | `bg-fill-brand-pressed` | `azure.900` | Extension |
| `on-primary` | `text-brand-on-bg-fill`, `icon-brand-on-bg-fill` | `neutral.0` | M3 |
| `primary-container` | `bg-fill-brand-subtlest`, `bg-surface-brand` | `azure.50` | M3 |
| `primary-container-hover` | `bg-fill-brand-subtlest-hover`, `bg-surface-brand-hover`, `bg-surface-brand-pressed-subtle` | `azure.100` | Extension |
| `primary-container-pressed` | `bg-fill-brand-subtlest-pressed`, `bg-surface-brand-pressed-strong` | `azure.200` | Extension |
| `on-primary-container-hover` | `text-brand-on-bg-fill-subtlest-hover`, `icon-brand-on-bg-fill-subtlest-hover`, `text-brand-on-bg-surface-hover`, `icon-brand-on-bg-surface-hover` | `azure.800` | Extension |
| `on-primary-container-pressed` | `text-brand-on-bg-fill-subtlest-pressed`, `icon-brand-on-bg-fill-subtlest-pressed`, `text-brand-on-bg-surface-pressed`, `icon-brand-on-bg-surface-pressed` | `azure.900` | Extension |
| `on-surface-primary-hover` | `text-brand-hover`, `icon-brand-hover`, `border-brand-hover` | `azure.600` | Extension |
| `on-surface-primary-pressed` | `text-brand-pressed`, `icon-brand-pressed`, `border-brand-pressed` | `azure.800` | Extension |
| `inverse-primary` | `text-brand-inverse` | `azure.300` | M3 |
| `inverse-primary-hover` | `text-brand-inverse-hover` | `azure.200` | Extension |
| `inverse-primary-pressed` | `text-brand-inverse-pressed` | `azure.100` | Extension |
| `inverse-primary-variant` | `icon-brand-inverse`, `border-brand-inverse`, `bg-fill-brand-inverse` | `azure.400` | Extension |
| `inverse-primary-variant-hover` | `icon-brand-inverse-hover`, `border-brand-inverse-hover` | `azure.300` | Extension |
| `inverse-primary-variant-pressed` | `icon-brand-inverse-pressed`, `border-brand-inverse-pressed` | `azure.200` | Extension |

### Error (warning) (17)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `error` | `bg-fill-warning-strong`, `text-warning`, `icon-warning`, `border-warning-strong` | `red.700` | M3 |
| `error-hover` | `bg-fill-warning-strong-hover`, `text-warning-hover`, `icon-warning-hover`, `border-warning-strong-hover` | `red.600` | Extension |
| `error-pressed` | `bg-fill-warning-strong-pressed`, `text-warning-pressed`, `icon-warning-pressed`, `border-warning-strong-pressed` | `red.800` | Extension |
| `on-error` | `text-warning-on-bg-fill-strong`, `icon-warning-on-bg-fill-strong` | `neutral.0` | M3 |
| `error-container` | `bg-fill-warning-subtlest`, `bg-surface-warning` | `red.50` | M3 |
| `error-container-hover` | `bg-fill-warning-subtlest-hover`, `bg-surface-warning-hover` | `red.100` | Extension |
| `error-container-pressed` | `bg-fill-warning-subtlest-pressed`, `bg-surface-warning-pressed` | `red.200` | Extension |
| `on-error-container-hover` | `text-warning-on-bg-fill-subtlest-hover`, `icon-warning-on-bg-fill-subtlest-hover`, `text-warning-on-bg-surface-hover`, `icon-warning-on-bg-surface-hover` | `red.800` | Extension |
| `on-error-container-pressed` | `text-warning-on-bg-fill-subtlest-pressed`, `icon-warning-on-bg-fill-subtlest-pressed`, `text-warning-on-bg-surface-pressed`, `icon-warning-on-bg-surface-pressed` | `red.900` | Extension |
| `error-container-high` | `bg-fill-warning-subtle` | `red.100` | Extension |
| `on-error-container-high` | `text-warning-on-bg-fill-subtle`, `icon-warning-on-bg-fill-subtle` | `red.700` | Extension |
| `inverse-error` | `text-warning-inverse` | `red.300` | Extension |
| `inverse-error-hover` | `text-warning-inverse-hover` | `red.200` | Extension |
| `inverse-error-pressed` | `text-warning-inverse-pressed` | `red.100` | Extension |
| `inverse-error-variant` | `icon-warning-inverse`, `border-warning-inverse`, `bg-fill-warning-inverse` | `red.400` | Extension |
| `inverse-error-variant-hover` | `icon-warning-inverse-hover`, `border-warning-inverse-hover` | `red.300` | Extension |
| `inverse-error-variant-pressed` | `icon-warning-inverse-pressed`, `border-warning-inverse-pressed` | `red.200` | Extension |

### Success (12)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `success` | `bg-fill-success-strong`, `text-success`, `icon-success`, `border-success-strong` | `green.700` | Custom group |
| `success-hover` | `bg-fill-success-strong-hover` | `green.800` | Extension |
| `success-pressed` | `bg-fill-success-strong-pressed` | `green.900` | Extension |
| `on-success` | `text-success-on-bg-fill-strong`, `icon-success-on-bg-fill-strong` | `neutral.0` | Custom group |
| `success-container` | `bg-fill-success-subtlest`, `bg-surface-success` | `green.50` | Custom group |
| `success-container-hover` | `bg-fill-success-subtlest-hover`, `bg-surface-success-hover` | `green.100` | Extension |
| `success-container-pressed` | `bg-fill-success-subtlest-pressed`, `bg-surface-success-pressed` | `green.200` | Extension |
| `on-success-container-hover` | `text-success-on-bg-fill-subtlest-hover`, `text-success-on-bg-surface-hover` | `green.800` | Extension |
| `on-success-container-pressed` | `text-success-on-bg-fill-subtlest-pressed`, `text-success-on-bg-surface-pressed` | `green.900` | Extension |
| `success-container-high` | `bg-fill-success-subtle` | `green.100` | Extension |
| `on-success-container-high` | `text-success-on-bg-fill-subtle`, `icon-success-on-bg-fill-subtle` | `green.700` | Extension |
| `inverse-success-variant` | `icon-success-inverse` | `green.400` | Extension |

### Caution (12)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `caution` | `bg-fill-caution-strong`, `text-caution`, `icon-caution` | `yellow.700` | Custom group |
| `caution-hover` | `bg-fill-caution-strong-hover` | `yellow.800` | Extension |
| `caution-pressed` | `bg-fill-caution-strong-pressed` | `yellow.900` | Extension |
| `on-caution` | `text-caution-on-bg-fill-strong`, `icon-caution-on-bg-fill-strong` | `neutral.0` | Custom group |
| `caution-container` | `bg-fill-caution-subtlest`, `bg-surface-caution` | `yellow.50` | Custom group |
| `caution-container-hover` | `bg-fill-caution-subtlest-hover`, `bg-surface-caution-hover` | `yellow.100` | Extension |
| `caution-container-pressed` | `bg-fill-caution-subtlest-pressed`, `bg-surface-caution-pressed` | `yellow.200` | Extension |
| `on-caution-container-hover` | `text-caution-on-bg-fill-subtlest-hover`, `text-caution-on-bg-surface-hover` | `yellow.800` | Extension |
| `on-caution-container-pressed` | `text-caution-on-bg-fill-subtlest-pressed`, `text-caution-on-bg-surface-pressed` | `yellow.900` | Extension |
| `caution-container-high` | `bg-fill-caution-subtle` | `yellow.100` | Extension |
| `on-caution-container-high` | `text-caution-on-bg-fill-subtle`, `icon-caution-on-bg-fill-subtle` | `yellow.800` | Extension |
| `inverse-caution-variant` | `icon-caution-inverse` | `yellow.400` | Extension |

### Info (12)

| Material role | Cosmos tokens it replaces | MMT value | Kind |
|---|---|---|---|
| `info` | `bg-fill-info-strong`, `text-info`, `icon-info` | `azure.700` | Custom group |
| `info-hover` | `bg-fill-info-strong-hover` | `azure.800` | Extension |
| `info-pressed` | `bg-fill-info-strong-pressed` | `azure.900` | Extension |
| `on-info` | `text-info-on-bg-fill-strong`, `icon-info-on-bg-fill-strong` | `neutral.0` | Custom group |
| `info-container` | `bg-fill-info-subtlest`, `bg-surface-info` | `azure.50` | Custom group |
| `info-container-hover` | `bg-fill-info-subtlest-hover`, `bg-surface-info-hover` | `azure.100` | Extension |
| `info-container-pressed` | `bg-fill-info-subtlest-pressed`, `bg-surface-info-pressed` | `azure.200` | Extension |
| `on-info-container-hover` | `text-info-on-bg-fill-subtlest-hover`, `text-info-on-bg-surface-hover` | `azure.800` | Extension |
| `on-info-container-pressed` | `text-info-on-bg-fill-subtlest-pressed`, `text-info-on-bg-surface-pressed` | `azure.900` | Extension |
| `info-container-high` | `bg-fill-info-subtle` | `azure.100` | Extension |
| `on-info-container-high` | `text-info-on-bg-fill-subtle`, `icon-info-on-bg-fill-subtle` | `azure.800` | Extension |
| `inverse-info-variant` | `icon-info-inverse` | `azure.400` | Extension |

## Figma branch

The branch above holds this mapping:

- 86 semantic variables are merged into their survivors and deleted, with their brand overrides. 272 component variables that pointed at them now point at the survivors.
- 121 survivors are renamed in place, so their IDs, bindings and myBiz and Goibibo overrides are kept. Their WEB, iOS and Android code syntax follow the new names, and 31 of them have wider scopes, so a role that now covers text or borders can be applied to them.
- 660 layers bound directly to a merged-away variable are rebound: 255 main layers and 405 instance overrides, across the Foundations, Icons, Badge, Menu, Hotel card, Test, both button spec pages and Input Exploration 2.
- 306 descriptions are rewritten. The 29 standard and custom-group roles get new text, and the rest have their old token names replaced. On the Foundations page, every token label reads `old → new`. Foundations Documentation is regenerated.
- Every one of the 781 component colours resolves to the same value as on main in MakeMyTrip, myBiz and Goibibo.

Main is untouched until an option is chosen.
