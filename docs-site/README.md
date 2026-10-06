# Cosmos Design Tokens — documentation site

A browsable reference for every token in `../tokens/tokens.json`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export in out/
```

`npm run build:tokens` in the repo root must have been run at least once so that `../dist/web/tokens.css` exists.

## How data gets here

`scripts/generate-tokens.mjs` runs automatically before `dev` and `build`. It:

1. Merges the `primitives` and `semantic` token sets and resolves every `{reference}` to a concrete value, keeping the reference itself so the docs can show `bg-fill-brand → azure.700`.
2. Derives the CSS, JS, Swift, and Kotlin name for each token using the same rules as `build-tokens.mjs`, then validates them against `../dist/web/tokens.css`. Drift prints a warning rather than failing the build.
3. Computes WCAG contrast for every `text-*` token against the surface it is designed for (`text-info-on-bg-fill-strong` is measured against `bg-fill-info-strong`, plain `text-*` against `bg`).
4. Writes `data/tokens.json` and copies `../dist/web/tokens.css` to `app/tokens.css`.

Both generated files are gitignored — the tokens source is the only thing worth versioning.

## Structure

| Path | Purpose |
|------|---------|
| `scripts/generate-tokens.mjs` | Token resolution, naming, contrast, validation |
| `lib/types.ts` | Shape of the generated data |
| `lib/filter.ts` | Search filtering and which sections still have matches |
| `lib/nav.ts` | Sidebar structure and section ids |
| `components/DocsApp.tsx` | Page composition, search and platform state |
| `components/sections/` | Palettes, semantic colors, contrast, typography, scale tables |

## Adding a section

Add the data in `scripts/generate-tokens.mjs`, extend `TokenData` in `lib/types.ts`, handle it in `filterData` and `populatedSections`, add an entry to `NAV`, and render it in `DocsApp`. The section id in `NAV` must match the `id` passed to `<Section>` so the sidebar can track and dim it.

## Fonts

Lato 400/700/900 are self-hosted in `public/fonts` so builds work offline and specimens always render in the real typeface. Rubik 400/600/700, the Goibibo typeface, loads from Google Fonts at runtime (`app/layout.tsx`) and only sets its own font-family specimen; offline, that one specimen falls back to the system sans.

## Shared with Storybook

`../storybook` runs this generator too and reads `data/tokens.json`. Besides the sections above, the data holds `all`: every token in all three sets, flat, with its description, resolved value, alias and platform names. Keep that field when changing the generator.
