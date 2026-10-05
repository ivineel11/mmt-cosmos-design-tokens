// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=781-231
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Menu/Menu.tsx
// component=Menu
import figma from "figma";
import { code, literal, slug, swapIcon } from "../../../code-connect/helpers";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const destructive = instance.getEnum("Intent", { Neutral: false, Destructive: true });
// Hover, Pressed and Focus are browser states, and Open is aria-expanded. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true, Open: false });

const entry = {
  id: slug(label),
  label,
  supportingText: instance.getBoolean("Show supporting text") ? instance.getString("Supporting text") : undefined,
  icon: swapIcon(instance, "Leading icon", "Show leading icon"),
  meta: instance.getBoolean("Show meta") ? instance.getString("Meta") : undefined,
  destructive: destructive || undefined,
  disabled: disabled || undefined,
  // A chevron means the row opens a submenu.
  submenu: instance.getBoolean("Show chevron") ? code("[/* submenu entries */]") : undefined,
};
// A check marks the chosen option of a single-select menu.
const checked = instance.getBoolean("Show check");

export default {
  example: figma.tsx`// An entry in <Menu items={[...]} />${checked ? `, chosen: selectionMode="single" value="${entry.id}"` : ""}
${literal(entry)}`,
  imports: ['import { Menu } from "@mmt/cosmos"'],
  id: "menu-item",
  metadata: { nestable: true, props: { entry, checked } },
};
