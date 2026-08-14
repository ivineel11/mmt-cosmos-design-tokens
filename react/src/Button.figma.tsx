import figma from "@figma/code-connect";

import { Button } from "./Button";

/**
 * Code Connect mapping for the Cosmos Button component set.
 *
 * Figma: Cosmos Design Tokens -> Button page -> `Button` (node 58:202)
 *
 * Two Figma properties are deliberately NOT mapped to props. Both are the places
 * handoff usually breaks, so they are called out here and again in the component-set
 * description in Figma, for the cases where Code Connect is not in the loop.
 *
 * 1. `State` = Hover / Pressed / Focus is DESIGN-ONLY.
 *    Those three values exist so a designer can show an interaction in a mock. They
 *    have no code equivalent — the component handles them itself via `:hover`,
 *    `:active` and `:focus-visible` in Button.css. They are mapped to `undefined`
 *    below rather than omitted, so that selecting a Hover variant in Figma emits the
 *    same snippet as Default instead of leaking a bogus `state="hover"` prop.
 *    `State=Disabled` is the one value with a real code counterpart: `disabled`.
 *
 * 2. `fullWidth` has no Figma property at all.
 *    Full width is a *resize behaviour* in Figma — the designer sets the instance's
 *    horizontal resizing to Fill container. Code Connect cannot read resize
 *    behaviour, so generated snippets will never include `fullWidth`. Add it by hand
 *    when the design shows a button spanning its container.
 */
figma.connect(
  Button,
  "https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos-Design-Tokens?node-id=58-202",
  {
    props: {
      children: figma.string("Label"),

      variant: figma.enum("Hierarchy", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
        Text: "text",
      }),

      size: figma.enum("Size", {
        Large: "lg",
        Medium: "md",
        Small: "sm",
      }),

      intent: figma.enum("Intent", {
        Default: "default",
        Destructive: "destructive",
      }),

      // Every value is listed. An unmapped variant value silently resolves to
      // undefined, which here would be indistinguishable from "not disabled" but
      // would also mean a future added value fails quietly.
      disabled: figma.enum("State", {
        Default: undefined,
        Hover: undefined,
        Pressed: undefined,
        Focus: undefined,
        Disabled: true,
      }),

      loading: figma.boolean("Loading"),

      // The booleans gate the slots; the shared `Icon` instance-swap supplies the
      // glyph. Known limitation carried over from the Figma set: both slots read the
      // same `Icon` property, so a leading and trailing icon cannot differ yet.
      leadingIcon: figma.boolean("Icon Leading", {
        true: figma.instance("Icon"),
        false: undefined,
      }),

      trailingIcon: figma.boolean("Icon Trailing", {
        true: figma.instance("Icon"),
        false: undefined,
      }),
    },

    example: (props) => (
      <Button
        variant={props.variant}
        size={props.size}
        intent={props.intent}
        disabled={props.disabled}
        loading={props.loading}
        leadingIcon={props.leadingIcon}
        trailingIcon={props.trailingIcon}
      >
        {props.children}
      </Button>
    ),
  },
);
