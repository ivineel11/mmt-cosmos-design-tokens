// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=710-479
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/List/List.tsx
// component=List
import figma from "figma";
import { openTag, str } from "../../../code-connect/helpers";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const density = instance.getEnum("Density", { Comfortable: undefined, Compact: "compact" });

// In code the section header is the header prop of the List that holds its rows.
export default {
  example: figma.tsx`${openTag("List", [str("header", label), str("density", density)])}
  {/* ListItem rows */}
</List>`,
  imports: ['import { List } from "@mmt/cosmos"'],
  id: "list-section-header",
  metadata: { nestable: true, props: { label, header: true } },
};
