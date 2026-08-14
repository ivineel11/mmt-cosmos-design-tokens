# 001 — Drive sidebar collapse with transform, keep a layout spacer for recenter

- **Status**: DONE
- **Commit**: 5045d84
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1–2 files (`docs-site/components/Sidebar.tsx`, optionally `docs-site/app/globals.css`), medium

## Problem

The collapsible left rail animates the `<aside>`'s **`width`** between `var(--sidebar-width)` and `0`. That forces layout + paint + composite on every animation frame for 280–360ms, and the main column reflows continuously while the page recenters. The inner content already uses `transform`/`opacity`, but the expensive driver is still `width` on the flex child.

```tsx
/* docs-site/components/Sidebar.tsx:106-116 — current */
<aside
  className="sticky top-0 z-20 hidden h-screen shrink-0 overflow-hidden border-r lg:block"
  data-open={open ? "true" : "false"}
  aria-hidden={!open}
  style={{
    width: open ? "var(--sidebar-width)" : 0,
    borderColor: open ? "var(--color-border)" : "transparent",
    transition: open
      ? `width var(--motion-duration-panel) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-standard)`
      : `width var(--motion-duration-panel-exit) var(--motion-ease-exit), border-color var(--motion-duration-fade) var(--motion-ease-exit)`,
  }}
>
```

Main content recenter when collapsed is a product requirement and must remain. The fix is not “instant snap with no layout change” — it is to **separate layout (spacer width) from visual motion (transform/opacity on the rail)**.

## Target

Restructure the desktop sidebar so:

1. A non-interactive **layout spacer** (or equivalent flex slot) is the only element whose `width` / `flex-basis` transitions — this is what recenters `<main>`.
2. The visible rail is a sticky/fixed-width panel that animates with **`transform` + `opacity` only** (GPU-friendly), sliding from `translateX(0)` to `translateX(-100%)` (or equivalent full-rail travel), clipped by `overflow: hidden` on a wrapper sized to the spacer.
3. Re-entry control handoff (expand button) keeps working and stays interruptible via CSS transitions (no `@keyframes`).

Exact motion values (use existing tokens; do not invent parallel curves):

```css
/* already in docs-site/app/globals.css — reuse, do not duplicate under new names */
--motion-ease-standard: cubic-bezier(0.2, 0, 0, 1);
--motion-ease-exit: cubic-bezier(0.3, 0, 1, 1);
--motion-duration-panel: 360ms;
--motion-duration-panel-exit: 280ms;
--motion-duration-fade: 200ms;
--sidebar-width: 268px;
```

Target structure (illustrative — match classnames/a11y attrs already in the file):

```tsx
/* target shape — docs-site/components/Sidebar.tsx */
<>
  {/* Desktop rail: spacer drives flex recenter; inner panel moves on transform */}
  <div
    className="sticky top-0 z-20 hidden h-screen shrink-0 overflow-hidden lg:block"
    data-open={open ? "true" : "false"}
    style={{
      width: open ? "var(--sidebar-width)" : 0,
      transition: open
        ? `width var(--motion-duration-panel) var(--motion-ease-standard)`
        : `width var(--motion-duration-panel-exit) var(--motion-ease-exit)`,
    }}
  >
    <aside
      aria-hidden={!open}
      className="flex h-full flex-col overflow-y-auto border-r"
      style={{
        width: "var(--sidebar-width)",
        borderColor: open ? "var(--color-border)" : "transparent",
        opacity: open ? 1 : 0,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: open
          ? `transform var(--motion-duration-panel) var(--motion-ease-standard), opacity var(--motion-duration-fade) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-standard)`
          : `transform var(--motion-duration-panel-exit) var(--motion-ease-exit), opacity var(--motion-duration-fade) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-exit)`,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* existing header / search / nav — no -12px nested translate needed */}
    </aside>
  </div>

  {/* existing fixed expand button — keep interruptible transitions */}
</>
```

Key differences from today:

- Remove the nested `translateX(-12px)` content layer; the rail itself travels the full width (`-100%`).
- Visual motion properties on the rail: **`transform` and `opacity` only** (plus cheap `border-color` if still needed).
- `width` remains only on the outer clip/spacer so `<main>` still recenters.
- Prefer `opacity` exit easing **`var(--motion-ease-standard)`** (decelerate / ease-out family) even when `transform`/`width` use `--motion-ease-exit`, so the fade does not start sluggishly.

## Repo conventions to follow

- Motion tokens live in `docs-site/app/globals.css` under `:root` with the `--motion-*` prefix and the comment documenting corporate / Material-3-ish curves (no overshoot). **Reuse those tokens**; do not add Framer Motion, springs, or new npm deps.
- The site is plain CSS transitions in component `style={{…}}` props — keep that pattern (see current `Sidebar.tsx` re-entry button around lines 217–236).
- Reduced-motion is handled globally in `docs-site/app/globals.css` (do not invent a second system in this plan).
- Exemplar of asymmetric enter/exit already in-repo: the expand button transitions in `docs-site/components/Sidebar.tsx` (lines 230–232) — keep that handoff working after the restructure.

## Steps

1. In `docs-site/components/Sidebar.tsx`, wrap the desktop `<aside>` in an outer clip/spacer element that owns:
   - `sticky top-0 z-20 hidden h-screen shrink-0 overflow-hidden lg:block`
   - `width: open ? "var(--sidebar-width)" : 0`
   - width-only transition using `--motion-duration-panel` / `--motion-duration-panel-exit` and the matching ease tokens (enter → `--motion-ease-standard`, exit → `--motion-ease-exit`).
2. Move the rail chrome (`border-r`, scrollable column, `aria-hidden`, `pointerEvents`) onto the inner `<aside>` (or keep `<aside>` as the outer element and use an inner panel — either is fine) with **fixed** `width: var(--sidebar-width)`.
3. Replace the current inner content motion:
   ```tsx
   opacity: open ? 1 : 0,
   transform: open ? "translateX(0)" : "translateX(-12px)",
   ```
   with full-rail travel:
   ```tsx
   opacity: open ? 1 : 0,
   transform: open ? "translateX(0)" : "translateX(-100%)",
   ```
   and transition **`transform` + `opacity`** (not a second width). Drop the extra nested motion wrapper if it becomes redundant.
4. Keep `inert={!open}` on the nav, `tabIndex={open ? 0 : -1}` on the search input, and the fixed expand button block unchanged in behavior (still `lg:flex`, opacity/transform handoff). Update selectors/structure only as needed so collapse/expand controls still work.
5. Ensure spam-toggling still uses CSS **transitions** (retarget mid-flight). Do **not** introduce `@keyframes` for open/close.
6. Do not change `DocsApp.tsx` recenter behavior beyond what falls out of the spacer width — `<main className="min-w-0 flex-1">` must continue to grow into the freed space when collapsed.

## Boundaries

- Do NOT touch MobileNav, section pages, or unrelated components.
- Do NOT add motion libraries or new dependencies.
- Do NOT change `--motion-ease-*` token definitions in this plan (timing polish is plan 002).
- Do NOT remove main-content recenter when collapsed.
- Do NOT replace transitions with keyframed animations.
- If the DOM at `Sidebar.tsx` has drifted from commit `5045d84` such that there is no width-driven aside, STOP and report instead of improvising a different architecture.

## Verification

- **Mechanical**: From `docs-site/`, run `npx tsc --noEmit` (or the repo’s usual typecheck). Expect no new errors in `Sidebar.tsx`.
- **Feel check**:
  - Desktop (`lg+`): click Collapse — rail slides left as a unit; main content recenters as the spacer width goes to 0.
  - Click Expand — rail slides back in; main content yields space again.
  - Spam the toggle: motion should reverse mid-flight (no restart-from-zero / flicker from keyframes).
  - In DevTools Animations panel at 10% speed: confirm the **visible panel** moves via `transform`, while only the spacer/clip width changes for layout.
  - Performance: in Performance/Rendering, confirm less layout thrashing on the inner nav text than before (width no longer animating on the contentful node).
  - Toggle `prefers-reduced-motion: reduce` — movement should effectively disappear via the global rule; open/closed end states must still be correct (rail gone vs present, expand button visible when closed).
- **Done when**: Collapse/expand still recenters main; visual rail motion is transform-based full travel; no nested `-12px` fade layer; interruptible; no new dependencies.
