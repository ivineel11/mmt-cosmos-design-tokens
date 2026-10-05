// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=731-172
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Switch/Switch.tsx
// component=Switch
import figma from "figma";
import { flag, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const on = instance.getEnum("Selection", { Off: false, On: true });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });
const size = instance.getEnum("Size", { Medium: undefined, Small: "small" });
const showIcon = instance.getEnum("Icon", { False: false, True: true });

const attrs = [
  // The switch has no visible label of its own, so it needs a spoken name.
  str("aria-label", "Describe the setting"),
  flag("defaultChecked", on),
  str("size", size),
  flag("showIcon", showIcon),
  flag("disabled", disabled),
];

export default {
  example: figma.tsx`${tag("Switch", attrs)}`,
  imports: ['import { Switch } from "@mmt/cosmos"'],
  id: "switch",
  metadata: { nestable: true, props: { selected: on } },
};
