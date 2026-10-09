# Motion tokens

Status: foundation landed in #121 (`feat/motion-tokens`). Components moved onto it in `feat/component-motion-tokens`.

## Problem

Cosmos had no motion tokens. Nine Storybook animations hard-coded their own timing, and each stylesheet said "Motion is not tokenised":

| Component | Hard-coded motion |
|---|---|
| Switch | 150ms, `cubic-bezier(0.2, 0, 0, 1)`; colour 100ms linear |
| Tabs | indicator 200ms, `cubic-bezier(0.2, 0, 0, 1)` |
| Segmented control | thumb 300ms, `cubic-bezier(0.2, 0, 0, 1)`; colour 100ms linear |
| Menu | open 150ms, `cubic-bezier(0.2, 0, 0, 1)` keyframes |
| Tooltip | enter 150ms `ease-out` keyframes |
| Snackbar | enter 250ms, `cubic-bezier(0, 0, 0.2, 1)` keyframes |
| Slider | thumb 150ms `ease-out`, halo 100ms linear |
| List | fill 100ms linear |
| Button | spinner 0.8s linear |

The docs site kept another set in `docs-site/app/globals.css`, including an ease-in exit curve. iOS and Android had nothing to match.

## Decisions

1. **Three token kinds: duration, easing and spring.** A timed transition is a duration plus an easing. A spring replaces both, for gesture-driven or interruptible motion. This matches how SwiftUI, Compose and CSS each describe motion.
2. **Durations are t-shirt sized**, like radius, space and icon: `none`, `xs` 100, `sm` 150, `md` 200, `lg` 250, `xl` 300, `2xl` 400, plus `loop` 800 for spinners. The size of what moves picks the step. The existing values (100–300ms) already sat on this scale.
3. **300ms is the ceiling for routine UI.** Over it, an interface feels slow. `2xl` exists only for full-screen web transitions; native navigation keeps the platform transition.
4. **An exit uses one size down from its entrance.** People wait for an entrance, not for an exit.
5. **Stronger curves than Material's.** `easing.standard` is `cubic-bezier(0.23, 1, 0.32, 1)`, `easing.move` is `cubic-bezier(0.77, 0, 0.175, 1)` and `easing.sheet` is the iOS drawer curve `cubic-bezier(0.32, 0.72, 0, 1)`, from Emil Kowalski's animation guidance (the `animate` skill). They show change from the first frame, which makes the same duration feel faster than `cubic-bezier(0.2, 0, 0, 1)`. Switch, Tabs, Segmented control and Menu will feel slightly crisper when they adopt the tokens.
6. **No ease-in token.** A curve that starts slowly delays the moment the user is watching. Exits use `easing.standard` too.
7. **Springs are Apple's duration and bounce.** `snappy` 300ms / 0.1, `smooth` 400ms / 0, `bouncy` 500ms / 0.25. Stiffness is (2π ÷ duration)² and the damping ratio is 1 − bounce, so Compose and physics libraries get the same spring SwiftUI does. CSS gets the spring sampled into `linear()`, so no JavaScript is needed. Bounce stays at 0.25 or below, and visible bounce is kept for rare moments.
8. **Reduced motion is gentler, not none.** Drop movement and keep the fade. This is a component behaviour, not a token: every component ships its reduced-motion variant with its animation.
9. **Motion does not change by brand.** myBiz and Goibibo share it, and the brand lint keeps brands to colour and font.

## Third-party libraries

None for the tokens. CSS transitions, `@starting-style` and the Web Animations API cover every current component, the spring tokens work in plain CSS, and SwiftUI and Compose animate natively. Motion (motion.dev) is worth adding to Storybook only when a component needs a gesture-driven or layout animation CSS cannot do, such as drag-to-dismiss or shared-element transitions. `dist/web/tokens.ts` already emits each spring as the `{ type: "spring", stiffness, damping, mass }` object Motion takes.

## Figma

Figma variables cannot bind to prototype transitions or Figma Motion keyframes. The tokens are FLOAT (durations in ms, bounce) and STRING (`cubic-bezier(…)`) variables with no scopes, kept as a reference in the Variables panel and Dev Mode. Primitives sit in the hidden primitives collection, and semantic tokens in the published MakeMyTrip collection, aliasing them. A spring is two variables, `spring/{name}/duration` and `spring/{name}/bounce`.

## Component adoption (PR 2)

- 24 component motion tokens (25 Figma variables, since a spring is two) across Switch, Tabs, Segmented control, Menu, Tooltip, Snackbar, Slider, List and Button, each aliasing a semantic duration, easing or spring. README → Motion tokens lists them.
- The nine Storybook animations read those tokens; no raw timing is left in component CSS.
- Menu, Tooltip and Snackbar entrances are transitions started with `@starting-style`, so a second trigger retargets instead of restarting. The Plain tooltip also fades out over `tooltip/exit-duration`.
- Segmented control slides on `spring.snappy`, the spring its spec already asked for. The slide and the 0.95 press are now the separate `translate` and `scale` properties, so the press keeps its 100 ms.
- The docs site sidebar uses the semantic tokens; its own `--motion-*` variables and ease-in exit curve are gone.

## Exit animations (PR 3)

- Menu fades out over `menu/exit-duration` (`duration.xs`) and Snackbar over `snackbar/exit-duration` (`duration.md`), both without moving. A replaced snackbar leaves before the next one enters.
- Both stay mounted and inert until the fade ends, through `storybook/src/components/presence.ts`, which reads the timing from the element's own CSS so the tokens remain the only source.
- The Rich tooltip now stays mounted and hidden when closed, like Plain, so it reuses the same `display` transition and `tooltip/exit-duration` fade.
