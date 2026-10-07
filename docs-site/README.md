# Cosmos: guidelines and token reference

The Cosmos website for designers and engineers, in the spirit of material.io: foundations with live visuals, component guidelines (Overview, Guidelines, Specs, Accessibility), and the full token reference. Every example is the real React component from `../storybook`, and a brand switcher in the top bar re-skins the whole site as MakeMyTrip, myBiz or Goibibo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export in out/
```

`npm run build:tokens` in the repo root must have been run at least once so that `../dist/web/tokens.css` exists.

## Pages

| Route | What it is |
|-------|-----------|
| `/` | Home: a live flight-search hero, key numbers, entry cards and the three brands side by side |
| `/foundations/` | Overview, then How tokens work, Colour, Typography, Spacing, Shape, Elevation and Iconography |
| `/components/` | Every component with a live preview. Finished ones link to their guidelines; the rest link to Storybook |
| `/components/button/` | The pilot component page: Overview, `guidelines/`, `specs/` and `accessibility/` |
| `/tokens/` | The searchable token reference (`components/DocsApp.tsx`, the site's original single page) |

## How data gets here

`scripts/generate-tokens.mjs` runs automatically before `dev` and `build`. It:

1. Merges the `primitives` and `semantic` token sets and resolves every `{reference}` to a concrete value, keeping the reference itself so the docs can show `bg-fill-brand → azure.700`.
2. Derives the CSS, JS, Swift, and Kotlin name for each token using the same rules as `build-tokens.mjs`, then validates them against `../dist/web/tokens.css`. Drift prints a warning rather than failing the build.
3. Computes WCAG contrast for every `text-*` token against the surface it is designed for (`text-info-on-bg-fill-strong` is measured against `bg-fill-info-strong`, plain `text-*` against `bg`).
4. Writes `data/tokens.json` and copies `../dist/web/tokens.css` to `app/tokens.css`.

Both generated files are gitignored — the tokens source is the only thing worth versioning.

`data/tokens.json` is about 2 MB, so only server code reads it, through `lib/data.ts`. Pages pick the tokens they show (`select`, `token`, `chainByBrand`, `componentsUsing`) and pass them to client components as props. A `BrandedToken` carries its value and alias in every brand, so a client component can print the value for the brand on screen.

## Live components

Pages import the Cosmos components from `../storybook/src/components` as `@cosmos/*` (a `tsconfig.json` path). To make that work, `next.config.ts` sets Turbopack's root to the repository and aliases `react` and `react-dom` to this package, so the components never load a second copy of React from `storybook/node_modules`.

The components carry no `"use client"` directive. Button and Icon have no state and render in server pages directly; the stateful ones (Chip, Switch, Checkbox, Radio and so on) must be rendered from a client module. `components/site/cosmos-client.ts` re-exports the common ones for server pages.

Style the site with tokens, never raw values. A `var()` whose name is built at runtime goes through `cssVar()` in `lib/css.ts`, because the `docs-site/css-var` lint only checks names written out in full.

## Brands

`app/layout.tsx` sets `data-brand` on `<html>`, and an inline script restores the reader's last brand from `localStorage` before first paint. `tokens.css` swaps the brandable custom properties under `data-brand`, so CSS and the live components follow on their own. `useBrandId()` in `components/site/BrandProvider.tsx` is for values a page prints, such as hex codes and contrast ratios. Setting `data-brand` on any element scopes a brand to that element, as the brand cards on the home page do.

## Structure

| Path | Purpose |
|------|---------|
| `lib/site.ts` | Sections, pages and the component list that drive the rail, drawers and Components page |
| `lib/data.ts` | Server-side token selectors |
| `lib/contrast.ts` | WCAG contrast, blending translucent colours over the surface below |
| `components/site/` | The shell (top bar, rail, drawer, brand switcher), page frame, "On this page", demo stages, do/don't cards, token tables, component header and tabs |
| `components/foundations/` | Visuals for the foundations pages |
| `components/button/` | Button playground, anatomy, size redlines and state matrix |
| `components/catalog/Previews.tsx` | The live preview for each card on the Components page |
| `components/DocsApp.tsx`, `components/sections/` | The token reference at `/tokens/` |

## Adding a component page

Button is the template. For a new component:

1. Add `ready: true` to its entry in `COMPONENTS` in `lib/site.ts`. The Components page card and the drawer link switch from Storybook to the new page.
2. Create `app/components/<slug>/layout.tsx` with `ComponentHeader` (name, lede, Figma node id, Storybook docs id), and one `page.tsx` each for the overview, `guidelines/`, `specs/` and `accessibility/`. Each page is a `PageBody` of `H2` sections; "On this page" lists them automatically.
3. Guidelines: lead with usage, then do/don't pairs (`DoDont`, `DoDontGrid`) built from live components. Put placeholder copy only in specs and realistic copy in examples. Mark guidance that has not been reviewed with `<Callout tone="draft">`.
4. Specs: the anatomy, sizes and state visuals, then `TokenTable` with the component's tokens (`select("component", "<slug>.")`) and filter chips.
5. Accessibility: take the keyboard and screen reader behaviour from `components/<slug>.md` (Voice section), and compute contrast from the tokens rather than writing numbers in.

## Adding a token reference section

Add the data in `scripts/generate-tokens.mjs`, extend `TokenData` in `lib/types.ts`, handle it in `filterData` and `populatedSections`, add an entry to `NAV`, and render it in `DocsApp`. The section id in `NAV` must match the `id` passed to `<Section>` so the sidebar can track and dim it.

## Fonts

Lato 400/700/800/900 are self-hosted in `public/fonts` under the family name `Lato`, so `var(--typeface-default)` resolves to them and builds work offline. Rubik 400/600/700, the Goibibo typeface, loads from Google Fonts at runtime (`app/layout.tsx`); offline, Goibibo pages fall back to the system sans.

## Shared with Storybook

`../storybook` runs this generator too and reads `data/tokens.json`. Besides the sections above, the data holds `all`: every token in all three sets, flat, with its description, resolved value, alias and platform names. Keep that field when changing the generator.
