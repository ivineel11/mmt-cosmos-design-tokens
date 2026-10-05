// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=442-415
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Radio/Radio.tsx
// component=Radio
import figma from "figma";
import { flag, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const selected = instance.getEnum("Selection", { Unselected: false, Selected: true });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });
const size = instance.getEnum("Size", { Small: "small", Medium: undefined, Large: "large" });
const invalid = instance.getEnum("Intent", { Default: false, Error: true });
const label = instance.getBoolean("Show Label") ? instance.getString("Label") : undefined;
const description = instance.getBoolean("Show Description") ? instance.getString("Description") : undefined;

const attrs = [
  // Every radio in a group shares one name; Figma has no equivalent, so this is a placeholder.
  str("name", "group-name"),
  str("label", label),
  str("description", description),
  !label && str("aria-label", "Describe the choice"),
  flag("defaultChecked", selected),
  str("size", size),
  flag("invalid", invalid),
  flag("disabled", disabled),
];

export default {
  example: figma.tsx`${tag("Radio", attrs)}`,
  imports: ['import { Radio } from "@mmt/cosmos"'],
  id: "radio",
  metadata: { nestable: true, props: { selected } },
};
