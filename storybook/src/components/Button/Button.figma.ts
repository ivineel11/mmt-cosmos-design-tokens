// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=58-202
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Button/Button.tsx
// component=Button
import figma from "figma";
import { flag, str, swapIcon, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
// Defaults map to undefined so the snippet only shows what differs from <Button>'s defaults.
const hierarchy = instance.getEnum("Hierarchy", {
  Primary: undefined,
  Secondary: "secondary",
  Tertiary: "tertiary",
  Text: "text",
});
const intent = instance.getEnum("Intent", { Default: undefined, Destructive: "destructive" });
const size = instance.getEnum("Size", { Small: "small", Medium: undefined, Large: "large" });
const surface = instance.getEnum("Surface", { Default: undefined, Inverse: "inverse" });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const isDisabled = instance.getEnum("State", {
  Default: false,
  Hover: false,
  Pressed: false,
  Focus: false,
  Disabled: true,
});
const isLoading = instance.getBoolean("Show Loading");

const attrs = [
  str("label", label),
  str("hierarchy", hierarchy),
  str("intent", intent),
  str("size", size),
  str("surface", surface),
  str("leadingIcon", swapIcon(instance, "Select Leading Icon", "Show Leading Icon")),
  str("trailingIcon", swapIcon(instance, "Select Trailing Icon", "Show Trailing Icon")),
  flag("isLoading", isLoading),
  flag("isDisabled", isDisabled),
];

export default {
  example: figma.tsx`${tag("Button", attrs)}`,
  imports: ['import { Button } from "@mmt/cosmos"'],
  id: "button",
  metadata: { nestable: true, props: { label } },
};
