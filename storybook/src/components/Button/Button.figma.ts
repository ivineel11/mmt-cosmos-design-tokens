// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=58-202
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Button/Button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const hierarchy = instance.getEnum("Hierarchy", {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  Text: "text",
});
// Defaults map to undefined so the snippet only shows what differs from <Button>'s defaults.
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

// Each connected `Icon / *` component exposes its code name as metadata.props.name.
// An icon without a template (not in Icon/paths.ts yet) is left out of the snippet.
function iconName(showProp: string, swapProp: string): string | undefined {
  if (!instance.getBoolean(showProp)) return undefined;
  const icon = instance.getInstanceSwap(swapProp);
  if (!icon || icon.type !== "INSTANCE") return undefined;
  const name = icon.executeTemplate().metadata?.props?.name;
  return typeof name === "string" ? name : undefined;
}
const leadingIcon = iconName("Show Leading Icon", "Select Leading Icon");
const trailingIcon = iconName("Show Trailing Icon", "Select Trailing Icon");

const attrs = [
  label.includes('"') ? `label={${JSON.stringify(label)}}` : `label="${label}"`,
  `hierarchy="${hierarchy}"`,
  intent && `intent="${intent}"`,
  size && `size="${size}"`,
  surface && `surface="${surface}"`,
  leadingIcon && `leadingIcon="${leadingIcon}"`,
  trailingIcon && `trailingIcon="${trailingIcon}"`,
  isLoading && "isLoading",
  isDisabled && "isDisabled",
].filter(Boolean);

export default {
  example: figma.tsx`<Button
  ${attrs.join("\n  ")}
/>`,
  imports: ['import { Button } from "@mmt/cosmos"'],
  id: "button",
  metadata: { nestable: true },
};
