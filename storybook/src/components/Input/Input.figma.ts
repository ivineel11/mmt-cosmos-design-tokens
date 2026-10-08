// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=1011-900
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Input/Input.tsx
// component=Input
import figma from "figma";
import { flag, str, swapIcon, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const populated = instance.getEnum("Value", { Empty: false, Populated: true });
// Hover, Pressed and Active are browser states, not props. Typing means the field is clearable,
// Read-only is a picker trigger and Disabled is disabled.
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "default",
  Pressed: "default",
  Active: "active",
  Typing: "typing",
  "Read-only": "readOnly",
  Disabled: "disabled",
});
const invalid = instance.getEnum("Intent", { Default: false, Error: true });
// The placeholder only shows in an empty, active field, so the snippet carries it only there.
const placeholder = !populated && state === "active" ? instance.getString("Placeholder") : undefined;
const supportingText = instance.getBoolean("Show Supporting Text") ? instance.getString("Supporting text") : undefined;
const prefix = instance.getBoolean("Show Prefix") ? instance.getString("Prefix") : undefined;
const trailingIcon = swapIcon(instance, "Trailing Icon", "Show Trailing Icon");

// Show Country makes the field a phone number field, which is PhoneInput in code.
const isPhone = instance.getBoolean("Show Country");
// Flag components on the Figma Icons page, by node ID, with the dial code as a fallback.
const FLAGS: Record<string, string> = {
  "1023:157": "IN", "1023:32": "AE", "1023:225": "US", "1023:55": "GB", "1023:213": "SG", "1023:203": "QA", "1023:167": "KW",
  "1023:44": "BH", "1023:219": "TH", "1023:190": "MY", "1023:40": "AU", "1023:48": "CA", "1023:199": "NP", "1025:38": "LK",
};
const DIAL: Record<string, string> = {
  "+91": "IN", "+971": "AE", "+1": "US", "+44": "GB", "+65": "SG", "+966": "SA", "+974": "QA", "+965": "KW",
  "+968": "OM", "+973": "BH", "+66": "TH", "+60": "MY", "+61": "AU", "+977": "NP", "+94": "LK",
};
let country: string | undefined;
if (isPhone) {
  const segment = instance.findInstance("Country");
  if (segment.type === "INSTANCE") {
    const flagSwap = segment.getInstanceSwap("Flag");
    country = (flagSwap && flagSwap.type === "INSTANCE" && FLAGS[flagSwap.symbolId]) || DIAL[segment.getString("Code")];
  }
}

const phoneAttrs = [
  label !== "Mobile number" && str("label", label),
  country !== "IN" && str("defaultCountry", country),
  str("defaultValue", populated ? instance.getString("Input text").replace(/\D/g, "") : undefined),
  str("supportingText", supportingText),
  flag("clearable", state === "typing"),
  flag("invalid", invalid),
  flag("disabled", state === "disabled"),
];

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
  flag("clearable", state === "typing"),
  flag("readOnly", state === "readOnly"),
  flag("invalid", invalid),
  flag("disabled", state === "disabled"),
];

export default {
  example: isPhone ? figma.tsx`${tag("PhoneInput", phoneAttrs)}` : figma.tsx`${tag("Input", attrs)}`,
  imports: isPhone ? ['import { PhoneInput } from "@mmt/cosmos"'] : ['import { Input } from "@mmt/cosmos"'],
  id: "input",
  metadata: { nestable: true, props: { label } },
};
