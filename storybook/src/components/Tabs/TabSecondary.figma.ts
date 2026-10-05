// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=697-59
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Tabs/Tabs.tsx
// component=Tabs
import figma from "figma";
import { firstNumber, literal, slug } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

// One Figma tab is one entry in the items array of <Tabs>.
const label = instance.getString("Label");
const id = slug(label);
// Secondary tabs have no icon.
const icon = undefined;
const badgeLayer = instance.getBoolean("Show badge") ? instance.findInstance("Badge") : undefined;
// The tab badge is a strong warning count, which is the <Badge> default, so only the count is written.
const count = badgeLayer && badgeLayer.type === "INSTANCE" ? firstNumber(badgeLayer.getString("Count")) : undefined;
const selected = instance.getEnum("Selected", { False: false, True: true });
// Hover, Pressed and Focus are browser states, not props. Only Disabled reaches code.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true });

const item = { id, label, icon, badge: count === undefined ? undefined : { count }, disabled: disabled || undefined };

export default {
  example: figma.tsx`// An item in <Tabs type="secondary" items={[...]} />${selected ? `, selected: defaultValue="${id}"` : ""}
${literal(item)}`,
  imports: ['import { Tabs } from "@mmt/cosmos"'],
  id: "tab-secondary",
  metadata: { nestable: true, props: { item, selected } },
};
