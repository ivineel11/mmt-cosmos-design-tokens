// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=427-62
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from "figma";
import { flag, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const selection = instance.getEnum("Selection", { Unchecked: "unchecked", Checked: "checked", Indeterminate: "indeterminate" });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });
const size = instance.getEnum("Size", { Small: "small", Medium: undefined, Large: "large" });
const invalid = instance.getEnum("Intent", { Default: false, Error: true });
const label = instance.getBoolean("Show Label") ? instance.getString("Label") : undefined;
const description = instance.getBoolean("Show Description") ? instance.getString("Description") : undefined;

const attrs = [
  str("label", label),
  str("description", description),
  // A bare box needs a spoken name.
  !label && str("aria-label", "Describe the choice"),
  flag("defaultChecked", selection === "checked"),
  flag("indeterminate", selection === "indeterminate"),
  str("size", size),
  flag("invalid", invalid),
  flag("disabled", disabled),
];

export default {
  example: figma.tsx`${tag("Checkbox", attrs)}`,
  imports: ['import { Checkbox } from "@mmt/cosmos"'],
  id: "checkbox",
  metadata: { nestable: true, props: { selected: selection === "checked" } },
};
