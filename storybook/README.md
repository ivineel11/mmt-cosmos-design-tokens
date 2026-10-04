# Cosmos Storybook

Foundations, token tables and the React components for the Cosmos design system.

```bash
(cd .. && npm run build:tokens)   # the stories read ../dist/web/tokens.css
npm install
npm run storybook                 # http://localhost:6006
npm run build-storybook           # static build in storybook-static/
```

## How data gets here

- **Styling:** `.storybook/preview.tsx` imports `../dist/web/tokens.css`, so every page and component is drawn with the generated tokens.
- **Token data:** `npm run tokens` (run automatically before `storybook` and `build-storybook`) runs `../docs-site/scripts/generate-tokens.mjs`. The doc blocks read its output, `../docs-site/data/tokens.json`, through `src/blocks/data.ts`.
- **Fonts:** Lato is bundled from `../docs-site/public/fonts`.

## Structure

| Path | Purpose |
|------|---------|
| `src/Introduction.mdx` | Landing page |
| `src/foundations/*.mdx` | Colour, typography, spacing, radius, stroke, iconography, elevation, opacity, Inverse surface |
| `src/tokens/*.mdx` | Searchable tables for the primitive, semantic and component tiers |
| `src/blocks/` | Doc blocks (palettes, colour roles, type scale, scales, shadows, token tables) |
| `src/components/storybook-helpers.tsx` | `Matrix` (labelled variant grid) and `InverseSection` for stories |
| `src/components/<Name>/` | `<Name>.tsx`, `<Name>.module.css`, `<Name>.stories.tsx` and `<Name>.mdx` per component |

## Icons

`src/components/Icon/paths.ts` holds the glyph paths exported from the Figma **Icons** page (`Icon / *`, 24 × 24, one filled path each). `<Icon>` draws them in `currentColor`, so each component colours its glyphs with its own icon tokens. Re-export a glyph from Figma rather than editing a path by hand, and add icons in the phase that first uses them.

## Component rules

- Each Figma variant axis is a prop with the same values, and Figma boolean properties are boolean props.
- Every visual value is a `var(--…)` from `dist/web/tokens.css`, using the component tier where one exists. `storybook/component-raw-value` rejects hex colours and px, rem or em lengths in component CSS.
- Stories: one per variant axis, a kitchen-sink matrix that mirrors the Figma showcase frame with placeholder copy, and an examples story with realistic copy. Options under test get their own story marked "Under test".
- The MDX page summarises `../components/<name>.md` (Overview, API and screen-reader behaviour) and links to it.
