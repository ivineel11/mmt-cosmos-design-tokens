# One background role

Status: draft for review. No tokens have changed in code. Built in the Figma branch [Single bg role](https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/branch/uqnt5k7jaj3xaKmFZ1H9OW/Cosmos-Design-Tokens--Experimental-?node-id=1075-38) for comparison with `surface-fill-tint-merge.md` and `surface-fill-containment.md`.

## Problem

Cosmos names every background twice over: `bg-surface-*` for containers, `bg-fill-*` for controls, plus the canvases `bg` and `bg-secondary`. The count in `surface-fill-tint-merge.md` shows the split rarely changes a colour. 23 of 25 surface tokens equal a fill token in all three brands, and no brand pulls a pair apart. Designers still have to choose a role before they can choose a colour, and the README rule for that choice doesn't match what ships for List and Menu rows.

This proposal goes further than the tint merge: it drops the role word altogether, so a background is named only by its colour and strength.

## What Atlassian does

Atlassian (atlassian.design → Design tokens → All tokens, read 2026-10-11) keeps one family, `color.background.*`, for every coloured or control background, whether container or control. Neutral page layers sit apart in `elevation.surface.*`. Cosmos has no elevation model, and naming neutrals by purpose (`sunken`, `raised`, `input`) was rejected as hard to read. So this proposal folds the neutrals into the canvas names Cosmos already has.

## Decisions

1. **One role, `bg-*`.** `bg-fill-brand` becomes `bg-brand` and `bg-fill-info-subtlest` becomes `bg-info-subtlest`. The surface tints merge into the `-subtlest` steps, as in the tint merge.
2. **Neutrals are named by lightness, extending the canvas names.** Anything white is `bg`, whether page, card, sheet, menu or control body. Anything light grey is `bg-secondary`, whether page, well, grouped list or segmented track.
3. **Steps keep their words:** strong / subtle / subtlest, and hover / pressed.
4. **Text and icon pairs mirror the background they sit on:** `text-on-bg-{name}`. So `text-brand-on-bg-fill` becomes `text-on-bg-brand`, and `text-info-on-bg-fill-subtlest-hover` becomes `text-on-bg-info-subtlest-hover`. This follows the existing `icon-on-bg-fill-disabled-strong`.
5. **The rule a designer uses:** pick the background by colour and strength. When two neighbouring layers come out the same colour (a white card on a white page), give the inner one a border or a shadow.

Nothing changes colour in any brand. Every merge below joins tokens that resolve to the same primitive in MakeMyTrip, myBiz and Goibibo.

### Neutral backgrounds

| New | Absorbs | Value |
|---|---|---|
| `bg` | `bg`, `bg-fill`, `bg-surface-secondary` | `neutral.0` |
| `bg-hover` | `bg-fill-hover` | `neutral.100` |
| `bg-pressed-subtle` | `bg-fill-pressed-subtle`, `bg-surface-secondary-pressed` | `neutral.100` |
| `bg-pressed-strong` | `bg-fill-pressed-strong` | `neutral.200` |
| `bg-secondary` | `bg-secondary`, `bg-surface`, `bg-fill-secondary` | `neutral.100` |
| `bg-secondary-hover` | `bg-surface-hover`, `bg-fill-secondary-hover` | `neutral.200` |
| `bg-secondary-pressed` | `bg-surface-pressed`, `bg-fill-secondary-pressed` | `neutral.300` |
| `bg-strong`, `-hover`, `-pressed` | `bg-fill-neutral-strong`, `-hover`, `-pressed` | 300 / 400 / 500 |
| `bg-inverse` | `bg-surface-inverse`, `bg-fill-inverse` | `neutral.950` |
| `bg-inverse-hover`, `-pressed`, `-disabled` | `bg-fill-inverse-*` | 900 / 800 / 800 |
| `bg-disabled-strong`, `bg-disabled` | `bg-fill-disabled-strong`, `bg-fill-disabled` | 400 / 300 |
| `bg-disabled-subtle` | `bg-fill-disabled-subtle`, `bg-surface-disabled` | `neutral.200` |
| `bg-disabled-subtler` | `bg-fill-disabled-subtlest` | `neutral.100` |
| `bg-disabled-subtlest` | `bg-surface-disabled-subtle` | `neutral.50` |

`bg-surface-secondary-hover` (`neutral.50`) is retired with no replacement, because no component uses it.

### Coloured backgrounds

| New | Was |
|---|---|
| `bg-brand`, `-hover`, `-pressed` | `bg-fill-brand`, `-hover`, `-pressed` |
| `bg-brand-subtlest`, `-hover`, `-pressed` | `bg-fill-brand-subtlest-*`, and `bg-surface-brand-*` merged in |
| `bg-brand-inverse`, `bg-warning-inverse` | `bg-fill-brand-inverse`, `bg-fill-warning-inverse` |
| `bg-{info, success, caution, warning}-strong`, `-hover`, `-pressed` | `bg-fill-{…}-strong-*` |
| `bg-{info, success, caution, warning}-subtle` | `bg-fill-{…}-subtle` |
| `bg-{info, success, caution, warning}-subtlest`, `-hover`, `-pressed` | `bg-fill-{…}-subtlest-*`, and `bg-surface-{…}-*` merged in |
| `text-on-bg-*`, `icon-on-bg-*` | `{text, icon}-{…}-on-bg-fill-*`; the 14 `on-bg-surface-*` pairs merge into their `-subtlest` twins |

### Totals

| | Before | After |
|---|---|---|
| Background tokens | 81 | 55 |
| Text and icon pairs | 47 | 33 |
| Component tokens re-aliased | | 34, all value-neutral |

The other 266 component tokens that use a background or on-bg token keep their alias and only see the new name.

## What we give up

- **Canvas pairing.** Today `bg-surface` means "the grey container on a white page", and the README pairs canvas and container by suffix. With one role, a grey well and a grey page are both `bg-secondary`, so the pairing becomes a layout rule rather than a token name.
- **Room to diverge later.** If dark mode arrives, a card usually needs to be lighter than the page, and a white checkbox needs a different colour from a white card. Here they share `bg`, so either the token splits again or components change. With the tint merge, the neutral surface/fill split survives for exactly this case.
- **Bigger rename.** Every background and on-bg name changes in code (CSS variables, Swift and Kotlin constants), not just the 30 tints. Product code that reads semantic tokens directly needs a migration.

## Open questions

1. **`-subtler`.** It's a new word, needed only because the disabled ladder has five steps. The alternative is to drop `bg-disabled-subtlest` (`neutral.50`, used by the disabled Chip and List icon well) and move those to `bg-disabled-subtler`, which is a visible change.
2. **`border-disabled-subtlest` is `neutral.100`,** the same as `bg-disabled-subtler`. Rename the border too, so the same word means the same step?
3. **Deprecation window.** As in the tint merge: if app teams read semantic tokens directly, keep the old names as deprecated aliases for a release.

## Figma branch

The branch above already holds this proposal:

- 40 semantic variables are merged away and deleted, with their brand overrides. The 43 variables that pointed at them, including Figma-only ones such as `input/*` and `top-app-bar/*`, now point at the survivors.
- 86 survivors are renamed in place, so their IDs, bindings and myBiz and Goibibo overrides are kept, and their WEB, iOS and Android code syntax follow the new names.
- 175 layers that were bound directly to a merged-away variable are rebound, on the Foundations, Button, Badge, Tab, Menu, Top app bar, Hotel card and Input Exploration 2 pages.
- 116 descriptions are rewritten. On the Foundations page, every swatch reads `old → new`. Foundations Documentation is regenerated.
- Every one of the 781 component colours resolves to the same value as on main in MakeMyTrip, myBiz and Goibibo.

Main is untouched until an option is chosen.
