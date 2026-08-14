# Figma build scripts

Plugin API scripts that create the Cosmos Button in the
[Cosmos Design Tokens](https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos-Design-Tokens)
file, run through the Figma MCP server's `use_figma` tool.

These exist as files rather than as ad-hoc tool calls for one reason: the variant
matrix is 120 components and 100 variables, and a failure partway through has to be
resumable without redoing the steps that already landed.

```bash
node figma/generate-scripts.mjs
```

That reads `tokens/tokens.json` and writes `figma/generated/`. Variable values are
never hand-transcribed — the generator resolves the alias graph itself
(component → semantic → primitive) and derives each variable's scopes and code
syntax, so a token rename cannot leave Figma and code disagreeing.

| Script | What it does |
|---|---|
| `01-foundation-variables.js` | 4 primitives (`color/alpha/transparent`, `borderWidth/0–2`) and the 18 semantic interaction-state colours the button aliases |
| `02-button-colour-variables.js` | Creates the `component` collection and its 81 button colour variables |
| `03-button-dimension-variables.js` | 19 geometry variables: radius, min-height, padding, gap, icon size, border and focus-ring widths |

Run them in order, pasting each file's contents into `use_figma`.

## Idempotency

Every script looks its targets up by name, updates what exists, and creates only what
doesn't. Re-running the whole sequence against a half-finished file converges rather
than duplicating — a second run of step 3 after adding the `padding-y-*` tokens
reported `created: 3, updated: 16`, which is the intended behaviour.

Nothing here deletes. Cleanup, if ever needed, should go by the exact IDs the scripts
return, never by name-prefix matching.

## What the scripts do not cover

The component set itself (the base button, the 120 variant clones, property wiring,
prototype interactions and the description) was built through direct `use_figma`
calls rather than generated files, because it is a one-time construction rather than
a data-driven mapping. The variables are the part that has to stay in lockstep with
`tokens.json`, and that is the part that is generated.

## Gotcha worth knowing

A paint's `color` field is only a *fallback*; the bound variable is what should
render. When a component is cloned while already carrying an identical binding,
Figma may not re-resolve the paint and will render the fallback instead. If variants
come out black, that is why — resolve each variable through its alias chain and
rewrite the paint's fallback to the real value, keeping the binding.
