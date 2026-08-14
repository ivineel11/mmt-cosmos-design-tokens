# @mmt/cosmos-react

React components for the Cosmos design system, paired 1:1 with the Figma component
library and wired to the generated token outputs.

Nothing in here hardcodes a colour or a pixel value. Every visual property resolves
through a `--button-*` custom property from `dist/web/tokens.css`, which is the same
key the corresponding Figma variable uses.

```bash
npm install
npm run typecheck
```

Load the tokens once, at the root of the app:

```ts
import "../../dist/web/tokens.css";
import { Button } from "@mmt/cosmos-react";
```

## Button

| Prop | Type | Default | Figma property |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'text'` | `'primary'` | `Hierarchy` |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | `Size` (Large / Medium / Small) |
| `intent` | `'default' \| 'destructive'` | `'default'` | `Intent` |
| `disabled` | `boolean` | `false` | `State = Disabled` |
| `loading` | `boolean` | `false` | `Loading` |
| `fullWidth` | `boolean` | `false` | — *(resize behaviour, see below)* |
| `leadingIcon` | `ReactNode` | — | `Icon Leading` + `Icon` |
| `trailingIcon` | `ReactNode` | — | `Icon Trailing` + `Icon` |
| `children` | `ReactNode` | — | `Label` |

Plus every native `<button>` attribute, including `type`, which defaults to
`"button"` rather than the browser's implicit `"submit"`.

```tsx
<Button variant="primary" size="lg" onClick={save}>Save</Button>
<Button variant="secondary" intent="destructive" onClick={remove}>Delete</Button>
<Button variant="text" trailingIcon={<ChevronRight />}>See all</Button>
<Button fullWidth loading>Booking…</Button>
```

### The two asymmetries with Figma

These are where handoff usually breaks, so they are stated here, in the Figma
component-set description, and in `Button.figma.tsx`.

**1. Hover, pressed and focus are not props.** They exist in Figma as design-only
`State` variants so a designer can show an interaction in a mock. In code they are
`:hover`, `:active` and `:focus-visible`, handled inside `Button.css`. There is no
`state` prop and there should never be one — if generated code emits `state="hover"`
or `isHovered`, the mapping is wrong, not the output. `State=Disabled` is the single
exception: it maps to the real `disabled` attribute.

**2. Full width is a resize behaviour in Figma and a real prop here.** The button
hugs its content. A designer makes it full width by setting the instance's horizontal
resizing to *Fill container*; there is no width variant and there will not be one,
because it would double the variant matrix for nothing. Code Connect cannot read
resize behaviour, so generated snippets never include `fullWidth` — add it by hand
when the design shows a button spanning its container.

### Focus ring

`outline`, not padding and not an inset `box-shadow`. An outline is painted outside
the border box and occupies no layout space, so a full-width button does not shift by
the ring width when it takes focus. The Figma side matches: an outside-aligned stroke
on an absolutely-positioned child, deliberately not extra padding.

## Regenerating Button.css

`Button.css` is generated, not hand-written — CSS cannot compose a custom-property
name from parts, so every hierarchy × intent combination needs a literal block, and
hand-written blocks drift from the token file the first time a token is renamed.

```bash
node ../scripts/generate-button-css.mjs
```

## Code Connect

`Button.figma.tsx` maps the Figma component set (node `58:202`) to this component.

```bash
npm run figma:connect:dry   # validate without publishing
npm run figma:connect       # publish
```

Publishing requires `FIGMA_ACCESS_TOKEN`, the Figma file published as a team library,
and an Organization or Enterprise plan.

> **Deprecation:** this is the parser-based format (`figma.connect()` in a
> `.figma.tsx`). Figma stops updating framework-specific parsers on 17 August 2026;
> template files (`.figma.ts` with `figma.code`) become the only maintained format.
> Migration guide: https://developers.figma.com/docs/code-connect/templates-migration-guide/
