// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=559-2943
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Chip/Chip.tsx
// component=Chip
import figma from "figma";
import { expr, flag, str, swapIcon, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", { Small: "small", Medium: undefined, Large: "large" });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });
const selected = instance.getEnum("Selected", { False: false, True: true });
const removable = instance.getEnum("Type", { Default: false, Removable: true });

const secondaryText = instance.getBoolean("Show secondary text") ? instance.getString("Secondary text") : undefined;
const showImage = instance.getBoolean("Show leading image");
const image = showImage ? instance.getInstanceSwap("Leading image") : undefined;
const imageShape = image && image.type === "INSTANCE" ? image.getEnum("Shape", { Circle: undefined, Square: "square" }) : undefined;
// An image replaces the leading icon in code.
const leadingIcon = showImage ? undefined : swapIcon(instance, "Leading icon", "Show leading icon");
// A removable chip draws its own remove button in place of the trailing icon.
const trailingIcon = removable ? undefined : swapIcon(instance, "Trailing icon", "Show trailing icon");

const attrs = [
  str("label", instance.getString("Label")),
  str("secondaryText", secondaryText),
  flag("defaultSelected", selected),
  str("size", size),
  !instance.getBoolean("Show border") && expr("bordered", "false"),
  str("leadingIcon", leadingIcon),
  showImage && str("leadingImage", "/path/to/image.jpg"),
  str("imageShape", imageShape),
  str("trailingIcon", trailingIcon),
  removable && expr("onRemove", "() => {}"),
  flag("disabled", disabled),
];

export default {
  example: figma.tsx`${tag("Chip", attrs)}`,
  imports: ['import { Chip } from "@mmt/cosmos"'],
  id: "chip",
  metadata: { nestable: true },
};
