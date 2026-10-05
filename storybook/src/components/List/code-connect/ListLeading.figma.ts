// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=709-119
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/List/List.tsx
// component=ListItem
import figma from "figma";
import { childProps, iconName, literal } from "../../../code-connect/helpers";

const instance = figma.selectedInstance;

const type = instance.getEnum("Type", {
  Icon: "icon",
  "Icon container neutral": "neutral",
  "Icon container brand": "brand",
  Avatar: "avatar",
  Thumbnail: "thumbnail",
  Checkbox: "checkbox",
  Radio: "radio",
});
// The glyph is a nested Icon instance, swapped with an instance override.
const icon = iconName(instance.findInstance("Icon")) ?? "plus";

let leading: Record<string, unknown>;
if (type === "icon") leading = { type: "icon", icon };
else if (type === "neutral") leading = { type: "iconContainer", icon };
else if (type === "brand") leading = { type: "iconContainer", icon, tone: "brand" };
// Figma holds a sample picture; the real source comes from the data.
else if (type === "avatar" || type === "thumbnail") leading = { type, src: "/path/to/image.jpg" };
else leading = { type };

// A checkbox or radio leading carries the row selection.
const control = type === "checkbox" ? instance.findInstance("Checkbox") : type === "radio" ? instance.findInstance("Radio") : undefined;
const selected = childProps(control).selected === true;

export default {
  example: figma.tsx`// The leading part of a <ListItem>
leading={${literal(leading)}}`,
  imports: ['import { ListItem } from "@mmt/cosmos"'],
  id: "list-leading",
  metadata: { nestable: true, props: { leading, kind: type, selected } },
};
