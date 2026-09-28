# CLAUDE.md: docs site

A Next.js 16 static site (React 19, Tailwind 4) that documents the tokens in `../tokens/tokens.json`. The root `CLAUDE.md` rules still apply. `README.md` in this folder covers the data flow and structure.

## Commands

```bash
(cd .. && npm run build:tokens)   # needed first: the site reads ../dist/web/tokens.css
npm install
npm run dev     # http://localhost:3000, regenerates token data first
npm run build   # static export to out/; also type-checks. Run it before committing.
```

## Rules

- Never edit `data/tokens.json` or `app/tokens.css`. `scripts/generate-tokens.mjs` generates them and they are gitignored. To change what the site shows, change the tokens or the generator.
- Style the site with the Cosmos tokens it documents (`var(--color-*)`, `var(--space-*)`, and so on). Don't hardcode hex or px values. Site-only values such as layout widths and motion live as variables in `app/globals.css`.
- Naming in `generate-tokens.mjs` must mirror `../build-tokens.mjs`. If a token name there changes, update the generator too. Drift only prints a warning, so read the build output.
- To add a section, follow the "Adding a section" steps in `README.md`. The `NAV` id must match the `<Section id>`.
- Animations use the `--motion-*` variables and must respect `prefers-reduced-motion`. `plans/` records past animation decisions, so read it before changing the sidebar.
