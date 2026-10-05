// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=709-2983
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/List/List.tsx
// component=ListItem
import figma from "figma";
import { childProps, code, firstNumber, literal } from "../../../code-connect/helpers";

const instance = figma.selectedInstance;

const type = instance.getEnum("Type", {
  Chevron: "chevron",
  Meta: "meta",
  "Meta and chevron": "metaChevron",
  Badge: "badge",
  Button: "button",
  Switch: "switch",
});
const meta = instance.getString("Meta");

let trailing: Record<string, unknown> = { type };
let selected = false;
if (type === "meta" || type === "metaChevron") trailing = { type, meta };
if (type === "badge") {
  const badge = instance.findInstance("Badge");
  if (badge.type === "INSTANCE") {
    const kind = badge.getEnum("Type", { Count: "count", Text: "text", Dot: "dot" });
    if (kind === "count") trailing = { type, count: firstNumber(badge.getString("Count")) ?? 1 };
    else if (kind === "dot") trailing = { type, dot: true };
    else trailing = { type, label: badge.getString("Label") };
  }
}
if (type === "button") {
  const button = instance.findInstance("Button");
  trailing = { type, label: button.type === "INSTANCE" ? button.getString("Label") : "Label", onPress: code("() => {}") };
}
if (type === "switch") selected = childProps(instance.findInstance("Switch")).selected === true;

export default {
  example: figma.tsx`// The trailing part of a <ListItem>
trailing={${literal(trailing)}}`,
  imports: ['import { ListItem } from "@mmt/cosmos"'],
  id: "list-trailing",
  metadata: { nestable: true, props: { trailing, kind: type, selected } },
};
