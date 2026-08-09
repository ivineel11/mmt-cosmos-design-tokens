# Animation plans — Cosmos docs site

Focused improve-animations pass for the **sidebar expand/collapse** interaction (`docs-site/components/Sidebar.tsx`).

**Audit commit stamp**: `5045d84`

## Plans

| # | Title | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| 001 | [Drive sidebar collapse with transform, keep a layout spacer for recenter](./001-sidebar-transform-first-collapse.md) | HIGH | Performance | DONE |
| 002 | [Tighten sidebar panel timing and sync enter/exit choreography](./002-sidebar-collapse-timing-choreography.md) | MEDIUM | Easing & duration | DONE |

## Recommended order

1. **001** — Restructure so visual motion is transform/opacity while a spacer still animates width for main-content recenter.
2. **002** — Retune `--motion-duration-*` and opacity/transform delays so enter feels snappy and exit does not leave a hollow gutter.

## Dependencies

- **002 depends on 001 preferred, not required.** 002 documents fallback application on the pre-001 width + inner-layer markup if 001 has not landed.
- Neither plan adds dependencies or changes MobileNav.

## Out of scope (this pass)

- Full-repo motion audit
- Changing Material-ish ease *curves* (`--motion-ease-standard` / `--motion-ease-exit` shapes)
- Implementing the fixes (executor / `improve-animations execute <plan>`)
