// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=1011-900
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Input/Input.tsx
// component=Input
import figma from "figma";
import { flag, str, swapIcon, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const populated = instance.getEnum("Value", { Empty: false, Populated: true });
// Hover and Focus are browser states, not props. Only Disabled reaches code.
const state = instance.getEnum("State", { Default: "default", Hover: "default", Focus: "focus", Disabled: "disabled" });
const invalid = instance.getEnum("Intent", { Default: false, Error: true });
// The placeholder only shows in an empty, focused field, so the snippet carries it only there.
const placeholder = !populated && state === "focus" ? instance.getString("Placeholder") : undefined;
const supportingText = instance.getBoolean("Show Supporting Text") ? instance.getString("Supporting text") : undefined;
const prefix = instance.getBoolean("Show Prefix") ? instance.getString("Prefix") : undefined;
const trailingIcon = swapIcon(instance, "Trailing Icon", "Show Trailing Icon");

const attrs = [
  str("label", label),
  str("defaultValue", populated ? instance.getString("Input text") : undefined),
  str("placeholder", placeholder),
  str("prefix", prefix),
  str("supportingText", supportingText),
  str("leadingIcon", swapIcon(instance, "Leading Icon", "Show Leading Icon")),
  str("trailingIcon", trailingIcon),
  // A trailing icon is usually an action, such as clear, which needs a spoken name.
  trailingIcon && str("trailingIconLabel", trailingIcon === "cancel" ? "Clear" : "Describe the action"),
  flag("invalid", invalid),
  flag("disabled", state === "disabled"),
];

export default {
  example: figma.tsx`${tag("Input", attrs)}`,
  imports: ['import { Input } from "@mmt/cosmos"'],
  id: "input",
  metadata: { nestable: true, props: { label } },
};
