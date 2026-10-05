// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=797-4533
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/List/List.tsx
// component=List
import figma from "figma";
import { childProps, expr, openTag, str } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", { Plain: undefined, Grouped: "grouped" });
const header = instance.getBoolean("Show section header") ? (childProps(instance.findInstance("Section header")).label as string | undefined) : undefined;

// Items 1 to 5 are exposed List / Item instances; the More rows slot holds any extra rows.
type Row = { jsx?: string; density?: string; kind?: string; divider?: boolean; label?: string; header?: boolean };
const rows: Row[] = [1, 2, 3, 4, 5]
  .filter((n) => instance.getBoolean(`Show item ${n}`))
  .map((n) => childProps(instance.findInstance(`Item ${n}`)) as Row);
if (instance.getBoolean("Show more rows")) {
  for (const node of instance.getSlot("More rows")?.connectedInstances ?? []) rows.push(childProps(node) as Row);
}

const items = rows.filter((r) => r.jsx);
const density = items.some((r) => r.density === "compact") ? "compact" : undefined;
const selectionMode = items.some((r) => r.kind === "checkbox") ? "multiple" : items.some((r) => r.kind === "radio") ? "single" : undefined;
const dividers = items.length > 0 && items.every((r) => r.divider === false) ? "false" : undefined;

const indent = (s: string) => s.replace(/\n/g, "\n  ");
// A section header inside the slot starts a new group, which is a new List in code.
const body = rows
  .map((r) => (r.jsx ? indent(r.jsx) : r.header ? `{/* New group: start another <List header="${r.label}"> */}` : ""))
  .filter(Boolean)
  .join("\n  ");

const attrs = [str("variant", variant), str("density", density), str("header", header), str("selectionMode", selectionMode), expr("dividers", dividers)];

export default {
  example: figma.tsx`${openTag("List", attrs)}
  ${body}
</List>`,
  imports: ['import { List, ListItem } from "@mmt/cosmos"'],
  id: "list",
  metadata: { nestable: false },
};
