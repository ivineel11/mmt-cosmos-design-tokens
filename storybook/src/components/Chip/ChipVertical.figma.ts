// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=592-327
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Chip/ChipVertical.tsx
// component=ChipVertical
import figma from "figma";
import { expr, flag, str, swapIcon, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const leading = instance.getEnum("Leading", { Icon: "icon", Image: "image", None: "none" });
const size = instance.getEnum("Size", { Small: "small", Medium: undefined });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });
const selected = instance.getEnum("Selected", { False: false, True: true });

const secondaryText = instance.getBoolean("Show secondary text") ? instance.getString("Secondary text") : undefined;
const icon = leading === "icon" ? swapIcon(instance, "Leading icon") : undefined;
const image = leading === "image" ? instance.getInstanceSwap("Leading image") : undefined;
const imageShape = image && image.type === "INSTANCE" ? image.getEnum("Shape", { Circle: undefined, Square: "square" }) : undefined;

const attrs = [
  str("label", instance.getString("Label")),
  // icon is the default leading, and plus the default icon.
  leading !== "icon" && str("leading", leading),
  icon !== "plus" && str("icon", icon),
  leading === "image" && str("image", "/path/to/image.jpg"),
  str("imageShape", imageShape),
  str("secondaryText", secondaryText),
  str("labelTrailingIcon", swapIcon(instance, "Label trailing icon", "Show label trailing icon")),
  secondaryText !== undefined && str("secondaryTrailingIcon", swapIcon(instance, "Secondary trailing icon", "Show secondary trailing icon")),
  flag("defaultSelected", selected),
  str("size", size),
  !instance.getBoolean("Show border") && expr("bordered", "false"),
  flag("disabled", disabled),
];

export default {
  example: figma.tsx`${tag("ChipVertical", attrs)}`,
  imports: ['import { ChipVertical } from "@mmt/cosmos"'],
  id: "chip-vertical",
  metadata: { nestable: true },
};
