// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=781-3973
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Menu/Menu.tsx
// component=Menu
import figma from "figma";
import { childProps, expr, literal, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

// Every row is an exposed instance that runs its own template and reports its menu entry.
type Part = { entry?: Record<string, unknown>; checked?: boolean };
const part = (layer: string) => childProps(instance.findInstance(layer)) as Part;
const parts: Part[] = [];
if (instance.getBoolean("Show section header")) parts.push(part("Section header"));
for (const n of [1, 2, 3, 4, 5]) if (instance.getBoolean(`Show item ${n}`)) parts.push(part(`Item ${n}`));
if (instance.getBoolean("Show more items")) {
  for (const node of instance.getSlot("More items")?.connectedInstances ?? []) parts.push(childProps(node) as Part);
}
if (instance.getBoolean("Show divider")) parts.push({ entry: { type: "divider" } });
if (instance.getBoolean("Show destructive item")) parts.push(part("Destructive item"));

const entries = parts.map((p) => p.entry).filter(Boolean);
const chosen = parts.find((p) => p.checked)?.entry;

const attrs = [
  str("density", undefined),
  chosen && str("selectionMode", "single"),
  chosen && str("value", String(chosen.id)),
  chosen && expr("onValueChange", "(id) => {}"),
  expr("items", literal(entries, 1)),
  // The trigger is whatever opens the menu; a Button stands in for it here.
  expr("trigger", '(props) => <Button {...props} label="Trigger" />'),
];

export default {
  example: figma.tsx`${tag("Menu", attrs)}`,
  imports: ['import { Button, Menu } from "@mmt/cosmos"'],
  id: "menu-comfortable",
  metadata: { nestable: false },
};
