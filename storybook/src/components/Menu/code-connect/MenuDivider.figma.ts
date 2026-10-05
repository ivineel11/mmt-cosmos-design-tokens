// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=781-3972
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Menu/Menu.tsx
// component=Menu
import figma from "figma";
import { literal } from "../../../code-connect/helpers";

const entry = { type: "divider" };

export default {
  example: figma.tsx`// An entry in <Menu items={[...]} />
${literal(entry)}`,
  imports: ['import { Menu } from "@mmt/cosmos"'],
  id: "menu-divider",
  metadata: { nestable: true, props: { entry } },
};
