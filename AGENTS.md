# Working with Cosmos tokens

Instructions for any automated agent or engineer writing product code against
this design system. Read this before writing UI.

## Load this first

`dist/tokens.json` is the manifest — every token, with its resolved value, tier,
status, description, contrast verdict, paired foreground, state variants, and the
exact name to use in CSS, TypeScript, Swift and Kotlin. Load it instead of
grepping `dist/web/tokens.css` or guessing a casing convention.

```js
const { tokens } = JSON.parse(readFileSync("dist/tokens.json", "utf8"));
tokens["color-bg-fill-brand"].platforms.css;   // "--color-bg-fill-brand"
tokens["color-bg-fill-brand"].pairsWith.text;  // "text-brand-on-bg-fill"
tokens["color-bg-fill-brand"].states.hover;    // "bg-fill-brand-hover"
```

## Rules

**1. Use semantic tokens only.** Every token has a `tier`. Use `semantic`. Never
use `primitive` (`--color-neutral-500`, `--spacing-16`, `--font-size-14`) or
`primitive-alias` (`--color-exp-blue-500`) in product code — they carry a value
but no intent, so they survive no palette change and communicate nothing.

The generated CSS puts both tiers in one flat namespace, so the name alone will
not tell you which is which. `tier` in the manifest will.

**2. Never hardcode a value.** No hex colours, no pixel sizes, no font stacks, no
`cubic-bezier`. If nothing fits, the token set needs extending — say so rather
than inlining a value.

**3. Never use a token whose `status` is `deprecated` or `experimental`.**
Deprecated tokens name their successor in `replacedBy`. In particular:
`warning-*` is deprecated in favour of `danger-*`.

**4. `warning` is red, not amber.** This inverts the usual convention, so check
yourself here. Amber advisory is `caution-*`. Red error/destructive is
`danger-*`. If you are about to write `bg-fill-warning-subtle` for a
"warning banner", you probably want `bg-fill-caution-subtle`.

**5. Take the foreground from `pairsWith`, don't choose one.** Every fill and
surface names the text and icon token that is contrast-checked against it.

```
bg-fill-info-strong  →  text-info-on-bg-fill-strong  +  icon-info-on-bg-fill-strong
```

**6. Take state colours from `states`, don't compute them.** Hover, active and
selected variants exist. Never darken a colour yourself.

**7. Check `contrast.wcag` before shipping text on a fill.** Values are computed
from the real values, not asserted. `FAIL` means the pairing is not accessible
even though the token name suggests it is — the caution ramp is the live example:
use `text-primary` on caution fills.

**8. Use composite typography tokens.** Reference `body.medium.regular` as a
whole rather than assembling four properties. In CSS the composite expands to
`--body-medium-bold-font-size` and friends.

**9. Start at `md`.** `space-md`, `radius-md`, `icon-md` are the defaults in each
scale. Deviate deliberately.

**10. Lato is not shipped here.** Web consumers must load it themselves.

## Choosing a token

| You need | Use |
|---|---|
| The page background | `bg` |
| A card or panel background | `bg-surface` |
| A button or badge fill | `bg-fill-*` |
| Body or heading text | `text-primary`, `text-secondary`, `text-tertiary` |
| Text on a coloured fill | `text-*-on-bg-fill*` — from `pairsWith` |
| An input outline or divider | `border`, `border-secondary` |
| Any icon | `icon-*` — never a `text-*` token |
| Gaps and padding | `space-*` |
| A transition | `motion-duration-*` + `motion-easing-*` |

`docs/recipes.md` gives the complete token list for common components. Prefer it
over assembling one yourself.

`docs/naming.md` gives the grammar, so you can derive a name rather than search
for it. If a name parses against the grammar, the token exists.

## Editing tokens

Edit `tokens/tokens.json` only — everything in `dist/` is generated and will be
overwritten. Then:

```bash
npm run build:tokens     # lints, then regenerates all five outputs
```

Commit `tokens/tokens.json` and the regenerated `dist/` together.

A new token needs: a `{reference}` to a primitive (never a literal), a
`description` saying what it is for and not for, and `$extensions.mmt` with at
least `tier` and `status`. The linter enforces all of it, plus the naming
grammar, the pairing completeness, and contrast minimums. Known exceptions live
in `scripts/token-lint-baseline.json` and each needs a written reason.

## What is deliberately missing

Do not invent these — they do not exist yet, and inventing them creates the drift
this system is meant to prevent. Flag the gap instead.

- **Dark theme.** `$themes` is empty; Cosmos is light-only.
- **Elevation / shadow.** Cosmos separates layers by tint, not shadow.
- **Opacity, z-index, breakpoints.**
- **Letter spacing**, and any display/hero type role above
  `headline.large.black` (32px) — font sizes up to 64px exist as primitives but
  have no semantic role.
