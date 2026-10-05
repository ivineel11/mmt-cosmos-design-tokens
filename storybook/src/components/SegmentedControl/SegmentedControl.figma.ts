// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=765-186
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
import figma from "figma";
import { childProps, expr, literal, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const thumbStyle = instance.getEnum("Style", { Neutral: undefined, Brand: "brand", Tinted: "tinted" });
const shape = instance.getEnum("Shape", { Rounded: undefined, Pill: "pill" });
const size = instance.getEnum("Size", { Medium: undefined, Small: "small" });
const count = instance.getEnum("Segments", { "2": 2, "3": 3, "4": 4, "5": 5 }) ?? 2;

// Each "Segment N" layer runs the Segment template, which reports its item and selection.
const segments = [1, 2, 3, 4, 5].slice(0, count).map((n) => childProps(instance.findInstance(`Segment ${n}`)));
const items = segments.map((s) => s.item).filter(Boolean);
const selectedIndex = segments.findIndex((s) => s.selected);
const selectedId = selectedIndex > 0 ? (segments[selectedIndex].item as { id: string }).id : undefined;

const attrs = [
  // Names the group for assistive tech, such as "Trip type".
  str("aria-label", "Describe the choice"),
  expr("items", literal(items, 1)),
  // An uncontrolled control starts on the first segment, so only a later selection is written.
  str("defaultValue", selectedId),
  str("size", size),
  str("thumbStyle", thumbStyle),
  str("shape", shape),
];

export default {
  example: figma.tsx`${tag("SegmentedControl", attrs)}`,
  imports: ['import { SegmentedControl } from "@mmt/cosmos"'],
  id: "segmented-control",
  metadata: { nestable: false },
};
