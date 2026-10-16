# Surfaces are neutral, fills carry colour

Status: draft for review. No tokens have changed in code. Built in the Figma branch [Surface neutral, fill colour](https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/branch/hQitORXntxv7zsp4yyzQt7/Cosmos-Design-Tokens--Experimental-?node-id=1075-38) for comparison with `single-bg-role.md` and `surface-fill-containment.md`.

## Problem

Cosmos splits backgrounds into two roles: `bg-surface-*` for containers behind content and `bg-fill-*` for controls and marks (README → Surface or fill). #117 and #118 moved every control onto fills, and in doing so added a `-subtlest` fill family that copies the surface tints step for step.

A count on `main` (e90728b), resolving every token in MakeMyTrip, myBiz and Goibibo:

| | Total | Exact twin in the other role | Twin differs in a brand |
|---|---|---|---|
| `bg-surface-*` | 25 | 23 | 0 |
| `bg-fill-*` | 54 | 31 | 0 |

- **The tints are pure duplicates.** Every `bg-surface-{brand, info, success, caution, warning}` step equals its `bg-fill-*-subtlest` step in all three brands, and so do their `on-bg-surface-*` and `on-bg-fill-subtlest-*` text and icon pairs. The brand sets override both sides identically.
- **The neutrals are where the split works.** Surfaces alternate with the canvas (`bg-surface` grey on a white page, `bg-surface-secondary` white on a grey page), while a control stays white on either (`bg-fill`). The light disabled grey `neutral.50` exists only as a surface.
- **Most surface tints have no users.** 15 of the 25 surface tokens are not referenced by any component token. The tint family is used by 11 component tokens across three components: the tinted Snackbar, the Info Tooltip and destructive Menu rows.
- **The row rule is not applied.** The README says tappable rows stay surfaces and use `bg-surface-hover` or `bg-surface-secondary-hover`. But `list/item-bg-*` and `menu/item-bg-*` rest on `transparent` and use `bg-fill-hover` / `bg-fill-pressed-strong`. Only destructive Menu rows use surface tokens.

So designers pick between two names for the same colour, and the rule that is meant to tell them which one to use doesn't match what ships.

## What Atlassian does

Atlassian (atlassian.design → Design tokens → All tokens, read 2026-10-11) also has two background families, but splits them in a different place:

- **`elevation.surface.*` holds only neutral layers, named by depth:** `sunken`, default, `raised` (movable cards), `overlay` (modals, dropdown menus) and `container`, each with hovered and pressed.
- **`color.background.*` holds everything coloured, container or control alike.** The red tint of an error section message (`danger`) and the solid red of a danger button (`danger.bold`) sit in one family. Brand, status, selected, input and neutral control backgrounds are all here.
- **States show what is interactive.** `danger.subtle` is for non-interactive badges and pills and has no hover or pressed steps, while `danger.subtler` has both. Interactivity shows in the steps a token has, not in a second prefix.
- **Menu items are controls.** `neutral.subtle` is transparent at rest and tints on hover and press, for subtle buttons and menu items. That's what our List and Menu tokens already do.

Two parts don't fit Cosmos, and this proposal doesn't adopt them. Atlassian's neutrals are translucent (`Neutral200A`), which conflicts with our rule of solid colours plus separate opacity tokens. Its 120 decorative accent tokens only make sense if MakeMyTrip has coloured tags that carry no meaning.

## Decisions

1. **`bg-surface-*` is for neutral layers only.** Page sections, cards, sheets, menu and list containers, scrims (`bg-surface-inverse`) and disabled areas.
2. **`bg-fill-*` is for every coloured or emphasised background, container or control.** Buttons, chips, badges and icon wells, and also tinted containers such as the tinted Snackbar and the Info Tooltip. The fill name stays, so the 100+ component tokens already on fills do not move.
3. **The 30 surface tint tokens are retired,** in favour of the fill twins that already exist. Nothing changes value, so no contrast ratio changes.
4. **Tappable rows are controls.** A List or Menu row rests on `transparent` and takes `bg-fill-hover` and `bg-fill-pressed-strong`, as it does today. Destructive Menu rows move to `bg-fill-warning-subtlest-*` to match. Their colours don't change.
5. **The rule a designer uses:** a neutral area that holds content is a surface. Anything with colour, and any single control or mark, is a fill.

### Retired semantic tokens (30)

| Retired | Use instead | Value (MMT) |
|---|---|---|
| `bg-surface-{info, success, caution, warning}` | `bg-fill-{…}-subtlest` | 50 step |
| `bg-surface-{info, success, caution, warning}-hover` | `bg-fill-{…}-subtlest-hover` | 100 step |
| `bg-surface-{info, success, caution, warning}-pressed` | `bg-fill-{…}-subtlest-pressed` | 200 step |
| `bg-surface-brand` | `bg-fill-brand-subtlest` | `azure.50` |
| `bg-surface-brand-hover`, `bg-surface-brand-pressed-subtle` | `bg-fill-brand-subtlest-hover` | `azure.100` |
| `bg-surface-brand-pressed-strong` | `bg-fill-brand-subtlest-pressed` | `azure.200` |
| `text-{brand, info, success, caution, warning}-on-bg-surface-{hover, pressed}` | `text-{…}-on-bg-fill-subtlest-{hover, pressed}` | 800 / 900 step |
| `icon-{brand, warning}-on-bg-surface-{hover, pressed}` | `icon-{…}-on-bg-fill-subtlest-{hover, pressed}` | 800 / 900 step |

The myBiz and Goibibo sets each lose their 8 overrides for these tokens. The `-subtlest` fills already carry the same pomegranate and thunderbird overrides.

### Component rebinds (11, no value change)

| Component token | From | To |
|---|---|---|
| `snackbar/bg-tinted-{info, success, caution, warning}` | `bg-surface-{…}` | `bg-fill-{…}-subtlest` |
| `tooltip/bg-info` | `bg-surface-info` | `bg-fill-info-subtlest` |
| `menu/item-bg-destructive-{hover, pressed}` | `bg-surface-warning-{hover, pressed}` | `bg-fill-warning-subtlest-{hover, pressed}` |
| `menu/label-destructive-{hover, pressed}` | `text-warning-on-bg-surface-{…}` | `text-warning-on-bg-fill-subtlest-{…}` |
| `menu/leading-icon-destructive-{hover, pressed}` | `icon-warning-on-bg-surface-{…}` | `icon-warning-on-bg-fill-subtlest-{…}` |

### What stays on surface (9)

`bg-surface`, `bg-surface-hover`, `bg-surface-pressed`, `bg-surface-secondary`, `bg-surface-secondary-hover`, `bg-surface-secondary-pressed`, `bg-surface-disabled`, `bg-surface-disabled-subtle`, `bg-surface-inverse`.

## Open questions

1. **Do product teams use semantic tokens directly?** Removing 30 tokens from `dist/` breaks any app code that reads, say, `--color-bg-surface-info`. If they do, keep the retired tokens for one release with a "Deprecated, use …" description and remove them in the next one. If only the component tokens are used, remove them in one go.
2. **Neutral surface hover and pressed.** Once rows are controls, `bg-surface-hover`, `-pressed`, `-secondary-hover` and `-secondary-pressed` have no component users. Keep them for a future tappable card, or retire them too?
3. **Elevation names.** If dark mode is planned, Atlassian's depth names (`sunken`, `raised`, `overlay`) describe how surfaces lighten as they rise better than our canvas pairing does. That's a rename of the neutral surfaces and belongs in its own proposal, after this one.

## Work

One PR, `fix/merge-surface-tints`:

- `tokens/tokens.json`: retire the 30 tokens and the 16 brand overrides, rebind the 11 component tokens, widen the `bg-fill-*-subtlest` descriptions to cover tinted containers, and add a `bg-fill-*` description note that coloured containers belong here.
- README: rewrite "Surface or fill" (rule 5 above, rows are controls), and update the colour inventory, brand table and contrast table.
- Specs: `components/snackbar.md`, `components/tooltip.md`, `components/menu.md`.
- Storybook: the Colour foundations page, and `blocks.css`, which uses `bg-surface-brand`, `-success`, `-caution` and `-warning` for doc swatches.
- Docs site: `SurfaceOrFill.tsx` and the comment in `generate-tokens.mjs`.
- Lint test: the contrast fixture that edits `bg-surface-brand-pressed-subtle` moves to another token.

## Figma branch

The branch above already holds this proposal, so merging it into main is the Figma side of the work:

- The 30 semantic variables are deleted from the MakeMyTrip collection, with their myBiz (950:2) and Goibibo (959:8) overrides.
- The 11 Snackbar, Tooltip and Menu variables point at the `-subtlest` fills, and 62 layers on the Foundations and Input Exploration 2 pages that were bound directly to a retired tint are rebound.
- 38 descriptions are rewritten. On the Foundations page, retired swatches read `old → new` and the Surface and Fill intros follow the new rule. Foundations Documentation is regenerated.
- Every one of the 781 component colours resolves to the same value as on main in MakeMyTrip, myBiz and Goibibo.
