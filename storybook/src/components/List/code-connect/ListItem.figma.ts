// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=710-474
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/List/List.tsx
// component=ListItem
import figma from "figma";
import { childProps, expr, flag, literal, str, tag } from "../../../code-connect/helpers";

const instance = figma.selectedInstance;

const lines = instance.getEnum("Lines", { One: 1, Two: 2, Three: 3 }) ?? 1;
const density = instance.getEnum("Density", { Comfortable: "comfortable", Compact: "compact" });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });

// The leading and trailing parts run their own templates and report the object to pass.
const leading = instance.getBoolean("Show leading") ? childProps(instance.findInstance("Leading")) : {};
const trailing = instance.getBoolean("Show trailing") ? childProps(instance.findInstance("Trailing")) : {};

const attrs = [
  str("title", instance.getString("Title")),
  lines >= 2 && str("supportingText", instance.getString("Supporting text")),
  lines === 3 && str("thirdLine", instance.getString("Third line")),
  leading.leading !== undefined && expr("leading", literal(leading.leading, 1)),
  trailing.trailing !== undefined && expr("trailing", literal(trailing.trailing, 1)),
  // Checkbox, radio and switch rows carry their value on the row.
  flag("selected", leading.selected === true || trailing.selected === true),
  flag("disabled", disabled),
];
const jsx = tag("ListItem", attrs);

export default {
  example: figma.tsx`${jsx}`,
  imports: ['import { ListItem } from "@mmt/cosmos"'],
  id: "list-item",
  metadata: {
    nestable: true,
    // The List template builds its rows from these.
    props: { jsx, density, kind: leading.kind, divider: instance.getBoolean("Show divider") },
  },
};
