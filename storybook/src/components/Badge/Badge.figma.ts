// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=683-2823
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Badge/Badge.tsx
// component=Badge
import figma from "figma";
import { firstNumber, str, expr, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const type = instance.getEnum("Type", { Count: "count", Text: "text", Dot: "dot" }) ?? "count";
const intent = instance.getEnum("Intent", {
  Neutral: "neutral",
  Brand: "brand",
  Info: "info",
  Success: "success",
  Caution: "caution",
  Warning: "warning",
});
// <Badge> defaults to warning for count and dot and neutral for text, so only a different intent is written.
const defaultIntent = type === "text" ? "neutral" : "warning";
const emphasis = instance.getEnum("Emphasis", { Strong: undefined, Subtle: "subtle" });
const size = instance.getEnum("Size", { Small: undefined, Medium: "medium" });
const count = type === "count" ? firstNumber(instance.getString("Count")) : undefined;

const attrs = [
  type !== "count" && str("type", type),
  type === "count" && expr("count", String(count ?? 1)),
  type === "text" && str("label", instance.getString("Label")),
  intent !== defaultIntent && str("intent", intent),
  // Dots are always strong.
  type !== "dot" && str("emphasis", emphasis),
  str("size", size),
];

export default {
  example: figma.tsx`${tag("Badge", attrs)}`,
  imports: ['import { Badge } from "@mmt/cosmos"'],
  id: "badge",
  metadata: { nestable: true, props: { type, count, label: type === "text" ? instance.getString("Label") : undefined, intent } },
};
