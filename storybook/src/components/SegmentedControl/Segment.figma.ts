// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=764-131
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
import figma from "figma";
import { literal, slug, swapIcon } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

// One Figma segment is one entry in the items array of <SegmentedControl>.
const label = instance.getString("Label");
const item = { id: slug(label), label, icon: swapIcon(instance, "Icon", "Show icon") };
const selected = instance.getEnum("Selected", { False: false, True: true });

export default {
  example: figma.tsx`// An item in <SegmentedControl items={[...]} />${selected ? `, selected: defaultValue="${item.id}"` : ""}
${literal(item)}`,
  imports: ['import { SegmentedControl } from "@mmt/cosmos"'],
  id: "segment",
  metadata: { nestable: true, props: { item, selected } },
};
