# 002 — Tighten sidebar panel timing and sync enter/exit choreography

- **Status**: DONE
- **Commit**: 5045d84
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 2 files (`docs-site/app/globals.css`, `docs-site/components/Sidebar.tsx`), small
- **Depends on**: Prefer landing **001** first (structure). If 001 is not done, apply the same timing numbers to the current width + inner-layer transitions so the feel fix still ships.

## Problem

The docs sidebar is a crisp reference UI, toggled often enough that sluggish panel motion reads as lag. Today:

1. **Enter duration is 360ms** — within a generous drawer band, but heavy for a corporate docs rail that should feel decisive.
2. **Exit opacity dies in 120ms** while the rail slot still closes for **280ms**, leaving a hollow collapsing gutter.
3. **Enter content delay (80ms) + 200ms fade** is reasonable in spirit, but should be retuned against the shorter panel budget so content and slot stay one composition.
4. **Opacity on exit uses `--motion-ease-exit`** (`cubic-bezier(0.3, 0, 1, 1)` — accelerate / ease-in family). Per motion guidance, fades that start slow feel late; opacity should use the standard decelerate curve even when position uses the exit curve.

Do **not** rewrite the documented corporate ease tokens’ *identity* (Material-ish, no overshoot) — only retune durations and which token opacity uses.

```css
/* docs-site/app/globals.css:8-14 — current */
:root {
  --page-max: 1080px;
  --sidebar-width: 268px;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  /* Corporate motion: decisive, no overshoot (Material 3 / Snappy UI). */
  --motion-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --motion-ease-exit: cubic-bezier(0.3, 0, 1, 1);
  --motion-duration-panel: 360ms;
  --motion-duration-panel-exit: 280ms;
  --motion-duration-fade: 200ms;
}
```

```tsx
/* docs-site/components/Sidebar.tsx:113-127 — current (pre-001 shape) */
transition: open
  ? `width var(--motion-duration-panel) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-standard)`
  : `width var(--motion-duration-panel-exit) var(--motion-ease-exit), border-color var(--motion-duration-fade) var(--motion-ease-exit)`,
/* … */
transition: open
  ? `opacity var(--motion-duration-fade) var(--motion-ease-standard) 80ms, transform var(--motion-duration-panel) var(--motion-ease-standard)`
  : `opacity 120ms var(--motion-ease-exit), transform var(--motion-duration-panel-exit) var(--motion-ease-exit)`,
```

```tsx
/* docs-site/components/Sidebar.tsx:230-232 — expand button handoff — current */
transition: open
  ? `opacity 120ms var(--motion-ease-exit), transform 120ms var(--motion-ease-exit)`
  : `opacity var(--motion-duration-fade) var(--motion-ease-standard) 120ms, transform var(--motion-duration-panel) var(--motion-ease-standard) 80ms`,
```

## Target

Update tokens to a snappier drawer budget (still asymmetric enter/exit, still under typical UI drawer limits):

```css
/* docs-site/app/globals.css — target token values */
--motion-ease-standard: cubic-bezier(0.2, 0, 0, 1); /* unchanged */
--motion-ease-exit: cubic-bezier(0.3, 0, 1, 1);     /* unchanged curve */
--motion-duration-panel: 260ms;       /* was 360ms */
--motion-duration-panel-exit: 200ms;  /* was 280ms */
--motion-duration-fade: 160ms;        /* was 200ms */
```

Choreography rules to implement in `Sidebar.tsx` (after 001’s structure if present):

| Phase | Property | Duration | Easing | Delay |
| --- | --- | --- | --- | --- |
| Enter — spacer/slot width | width | `var(--motion-duration-panel)` (260ms) | `--motion-ease-standard` | 0 |
| Enter — rail transform | transform | `var(--motion-duration-panel)` (260ms) | `--motion-ease-standard` | 0 |
| Enter — rail opacity | opacity | `var(--motion-duration-fade)` (160ms) | `--motion-ease-standard` | **40ms** |
| Exit — rail opacity | opacity | `var(--motion-duration-fade)` (160ms) | **`--motion-ease-standard`** (not exit) | 0 |
| Exit — rail transform | transform | `var(--motion-duration-panel-exit)` (200ms) | `--motion-ease-exit` | 0 |
| Exit — spacer/slot width | width | `var(--motion-duration-panel-exit)` (200ms) | `--motion-ease-exit` | 0 |
| Enter — expand button hide | opacity/transform | 100ms | `--motion-ease-standard` | 0 |
| Exit — expand button show | opacity | `var(--motion-duration-fade)` | `--motion-ease-standard` | **80ms** |
| Exit — expand button show | transform | `var(--motion-duration-panel-exit)` | `--motion-ease-standard` | **40ms** |

Hardcoded `120ms` opacity strings in `Sidebar.tsx` must be removed in favor of tokens (or a single shared literal only if unavoidable — prefer tokens).

Expand-button target sketch:

```tsx
/* target — expand control */
transition: open
  ? `opacity 100ms var(--motion-ease-standard), transform 100ms var(--motion-ease-standard)`
  : `opacity var(--motion-duration-fade) var(--motion-ease-standard) 80ms, transform var(--motion-duration-panel-exit) var(--motion-ease-standard) 40ms`,
```

Rail opacity/transform target sketch (001 structure):

```tsx
/* target — rail panel */
transition: open
  ? `opacity var(--motion-duration-fade) var(--motion-ease-standard) 40ms, transform var(--motion-duration-panel) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-standard)`
  : `opacity var(--motion-duration-fade) var(--motion-ease-standard), transform var(--motion-duration-panel-exit) var(--motion-ease-exit), border-color var(--motion-duration-fade) var(--motion-ease-exit)`,
```

If still on pre-001 markup, apply the same duration/delay/easing numbers to the existing width + inner `translateX(-12px)` transitions — do not mix old 360/280/120 values.

## Repo conventions to follow

- All shared motion numbers live as `--motion-*` on `:root` in `docs-site/app/globals.css` (see comment at lines 8–14). Change values there; keep names.
- Components consume tokens via `var(--motion-…)` in inline styles — see `docs-site/components/Sidebar.tsx`.
- Personality: **crisp / corporate / no overshoot**. Do not introduce bounce, spring configs, or longer marketing-style durations.
- Do not fight the documented choice of a dedicated exit curve for **positional** exit; only stop using that curve for **opacity**.

## Steps

1. In `docs-site/app/globals.css`, set:
   - `--motion-duration-panel: 260ms;`
   - `--motion-duration-panel-exit: 200ms;`
   - `--motion-duration-fade: 160ms;`
   Leave `--motion-ease-standard` and `--motion-ease-exit` cubic-bezier values unchanged.
2. In `docs-site/components/Sidebar.tsx`, update the spacer/slot width transition to use the (now shorter) panel tokens — no hardcoded millisecond durations for width.
3. Update rail (or inner content, if 001 not merged) opacity/transform transitions to the choreography table above. Critical: exit **opacity** must use `var(--motion-ease-standard)`, not `var(--motion-ease-exit)`.
4. Replace hardcoded `120ms` / `80ms` delay literals on the expand button with the target handoff (100ms hide; show with 80ms/40ms delays as specified). Keep `translateX(-8px) scale(0.96)` end state — do not change to `scale(0)`.
5. Grep `docs-site/components/Sidebar.tsx` for `120ms`, `80ms`, `360`, `280` and clear leftovers related to this interaction.

## Boundaries

- Do NOT change MobileNav or other components that might later adopt these tokens unless they already reference the same variables (token value changes are global by design — that is OK).
- Do NOT alter ease cubic-bezier definitions.
- Do NOT add dependencies or JS animation libraries.
- Do NOT implement the transform/spacer restructure here if 001 is separate — only retune timing; if both are executed together, apply 001 structure then these numbers.
- If token names have been renamed since `5045d84`, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` from `docs-site/`. Grep confirms no `120ms` opacity exit string left on the sidebar rail.
- **Feel check**:
  - Collapse: content begins fading immediately (no slow-start fade); slot finishes closing ~200ms; no long empty gutter after content is gone.
  - Expand: rail is usable quickly (~260ms); content opacity starts ~40ms in and completes within the panel window.
  - Expand button appears after collapse without fighting the rail (slight delay OK); disappears in ~100ms on expand.
  - Animations panel @ 10%: confirm enter 260ms / exit 200ms on transform or width; opacity exit curve is the standard decelerate token.
  - Spam toggle: still interruptible (CSS transitions).
  - `prefers-reduced-motion: reduce`: end states correct via global override.
- **Done when**: Token durations match the target values; sidebar opacity never uses `--motion-ease-exit`; hollow-gutter exit is gone; motion still feels corporate (no bounce).
