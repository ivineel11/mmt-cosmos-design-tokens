# Keep the containment split, retire the unused tints

Status: draft for review. No tokens have changed in code, and there is no Figma branch for this option yet. It is the third option next to `surface-fill-tint-merge.md` (A) and `single-bg-role.md` (B).

## Problem

The count in `surface-fill-tint-merge.md` holds here too. 23 of the 25 `bg-surface-*` tokens equal a `bg-fill-*` token in MakeMyTrip, myBiz and Goibibo, and the README rule that tappable rows stay surfaces doesn't match the List and Menu tokens.

A and B both answer this by changing the rule. A sorts backgrounds by colour: neutral areas are surfaces, anything coloured is a fill. B drops the role word altogether. This option keeps the rule Cosmos already has: **a surface is the container behind the content, a fill is the control or mark itself.** It removes the duplicates nobody uses, and keeps the few that a component does use as deliberate twins.

## What Shopify does

Polaris (token descriptions in Shopify's `polaris-tokens` source, and values read from the Polaris 1 and 2.0 RC bundles on 2026-09-25) has the same two families and splits them the same way Cosmos does:

- **`bg-surface-*` is for containers**, ranked by prominence: cards first, then secondary and tertiary areas. The tone surfaces are for banners and input errors.
- **`bg-fill-*` is for contained elements with a smaller surface area**: buttons, badges and checkboxes. `bg-fill-brand` is the primary button.
- **Shopify kept both families even when they share a colour.** In Polaris 2.0 light, every tone pair is identical: `bg-surface-critical` and `bg-fill-critical` are both `#ffe7e6`, and so are their hover and active steps. That is 26 colours used by both roles. Shopify still didn't merge them.
- **The split has paid off for Shopify twice.** In Polaris 1, tone fills were saturated (`#c70a24`) and tone surfaces were tints, so the same names carried different colours. In 2.0, `bg-fill` went from white to `#f2f2f2` while `bg-surface` stayed white, so controls turned grey without any card changing. In 2.0 dark, the tone pairs differ again.

Shopify's wording uses size ("smaller surface area"). Cosmos uses containment, which handles the case size gets wrong: a full-width input field is large, but its body is a control, so it is a fill. Polaris itself names its input background `input-bg-surface`, which is exactly that confusion.

## Decisions

1. **Keep the rule as the README states it.** A surface is the area behind content. A fill is the body of a control or mark. Test: take the colour away, and if the content is still there without a backdrop, it was a surface.
2. **Keep the five tint surfaces at rest:** `bg-surface-brand`, `-info`, `-success`, `-caution` and `-warning`. They are deliberate twins of the `bg-fill-*-subtlest` rest steps. The tinted Snackbar and the Info Tooltip use four of them, and a dark theme or a new brand can give a banner a different tint from a button without renaming anything. `bg-surface-brand` has no component user yet. It stays for brand callouts.
3. **Retire the tint surface hover and pressed steps,** with their text and icon pairs (25 tokens). No tinted container in Cosmos is tappable, so these steps only duplicate the `-subtlest` fill states. If a tappable banner arrives, its states come back then.
4. **Tappable rows are controls.** A List or Menu row rests on `transparent`, and its hover and pressed colour is interaction feedback on the row itself, like a text button. It takes `bg-fill-hover` and `bg-fill-pressed-strong`, as List and Menu already do. Destructive Menu rows move to `bg-fill-warning-subtlest-hover` and `-pressed`, which are the same colours. The README paragraph "Tappable rows stay surfaces" is rewritten to match.
5. **The rule a designer uses:** if the colour belongs to the container behind the content, use a surface. If it belongs to the control or mark itself, including a row's hover and press, use a fill.

Nothing changes colour in any brand.

### Retired semantic tokens (25)

| Retired | Use instead | Value (MMT) |
|---|---|---|
| `bg-surface-{info, success, caution, warning}-hover` | `bg-fill-{…}-subtlest-hover` | 100 step |
| `bg-surface-{info, success, caution, warning}-pressed` | `bg-fill-{…}-subtlest-pressed` | 200 step |
| `bg-surface-brand-hover`, `bg-surface-brand-pressed-subtle` | `bg-fill-brand-subtlest-hover` | `azure.100` |
| `bg-surface-brand-pressed-strong` | `bg-fill-brand-subtlest-pressed` | `azure.200` |
| `text-{brand, info, success, caution, warning}-on-bg-surface-{hover, pressed}` | `text-{…}-on-bg-fill-subtlest-{hover, pressed}` | 800 / 900 step |
| `icon-{brand, warning}-on-bg-surface-{hover, pressed}` | `icon-{…}-on-bg-fill-subtlest-{hover, pressed}` | 800 / 900 step |

The myBiz and Goibibo sets each lose 7 overrides for these tokens. The `-subtlest` fills already carry the same pomegranate and thunderbird overrides.

### Component rebinds (6, no value change)

| Component token | From | To |
|---|---|---|
| `menu/item-bg-destructive-{hover, pressed}` | `bg-surface-warning-{hover, pressed}` | `bg-fill-warning-subtlest-{hover, pressed}` |
| `menu/label-destructive-{hover, pressed}` | `text-warning-on-bg-surface-{…}` | `text-warning-on-bg-fill-subtlest-{…}` |
| `menu/leading-icon-destructive-{hover, pressed}` | `icon-warning-on-bg-surface-{…}` | `icon-warning-on-bg-fill-subtlest-{…}` |

The Snackbar and Tooltip tokens stay on `bg-surface-{info, success, caution, warning}`. They are containers.

### What stays on surface (14)

`bg-surface`, `bg-surface-hover`, `bg-surface-pressed`, `bg-surface-secondary`, `bg-surface-secondary-hover`, `bg-surface-secondary-pressed`, `bg-surface-disabled`, `bg-surface-disabled-subtle`, `bg-surface-inverse`, and the five tints `bg-surface-{brand, info, success, caution, warning}`.

## Compared with A and B

| | A: Surfaces are neutral, fills carry colour | B: One background role | C: Keep containment, retire unused tints |
|---|---|---|---|
| Rule | Neutral area = surface; anything coloured = fill | Pick by colour and strength | Container behind content = surface; control or mark = fill |
| Background tokens | 81 → 65 | 81 → 55, every name changes | 81 → 70 |
| Text and icon pairs | 47 → 33 | 47 → 33, renamed `text-on-bg-*` | 47 → 33 |
| Component tokens repointed | 11 | 34 in code, 43 in Figma | 6 |
| Tinted banner and tinted button can differ later | No, both use `bg-fill-*-subtlest` | No | Yes |
| Keeps room for dark mode | Yes, the neutral split stays | No | Yes, neutral and tint splits both stay |
| Duplicates left | None among tints | None | 5 rest tints, on purpose |

## Open questions

1. **Do product teams use semantic tokens directly?** The same question as A: if they read `--color-bg-surface-info-hover` in app code, keep the retired tokens for one release with a "Deprecated, use …" description.
2. **Neutral surface hover and pressed.** With rows as controls, `bg-surface-hover`, `-pressed`, `-secondary-hover` and `-secondary-pressed` have no component users. Containment says a tappable card would use them, so this option keeps them. Retire them instead if no tappable card is planned.
3. **Rows as surfaces instead.** The take-the-colour-away test could be read to make rows surfaces, which is how Polaris treats them. That isn't value-neutral: a hovered row on a white Menu panel would go from `neutral.100` (`bg-fill-hover`) to `neutral.50` (`bg-surface-secondary-hover`). This option keeps what ships.

## Work

One PR, `fix/retire-unused-surface-tints`:

- `tokens/tokens.json`: retire the 25 tokens and the 14 brand overrides, rebind the 6 Menu tokens, and add a note to the `bg-surface-{brand, info, success, caution, warning}` descriptions that they are the container twins of the `-subtlest` fills.
- README: rewrite the "Tappable rows stay surfaces" paragraph and the foreground-pairing example in "Surface or fill", drop the `on-bg-surface-hover` / `-pressed` suffix row, and update the colour inventory, brand table and contrast table.
- Specs: `components/menu.md` (destructive row colours).
- Docs site: `SurfaceOrFill.tsx` and the comment in `generate-tokens.mjs`.
- Lint: the contrast test that edits `bg-surface-brand-pressed-subtle` moves to another token, and the comment in `scripts/lint/rules/tokens.mjs` that names it is updated.

## Figma

Not built yet. The Figma work is a subset of branch A's: delete the 25 variables and their myBiz (950:2) and Goibibo (959:8) overrides, re-alias the 6 destructive Menu variables, and rebind any layer bound directly to a retired variable. The five rest tints and the Snackbar and Tooltip bindings stay as they are on main.
