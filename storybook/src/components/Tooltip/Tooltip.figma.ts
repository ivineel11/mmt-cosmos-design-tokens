// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=881-362
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Tooltip/Tooltip.tsx
// component=Tooltip
import figma from "figma";
import { code, expr, literal, numbers, openTag, str, swapIcon } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const rich = instance.getEnum("Type", { Plain: false, Rich: true });
const surface = instance.getEnum("Surface", { Dark: undefined, Light: "light", Info: "info" });
const side = instance.getEnum("Side", { Top: undefined, Bottom: "bottom", Left: "left", Right: "right" });
const caret = instance.getEnum("Caret", { Center: undefined, Start: "start", End: "end", None: "none" });

function actionLabel(layer: string, showProp: string): string | undefined {
  if (!instance.getBoolean("Show footer") || !instance.getBoolean(showProp)) return undefined;
  const control = instance.findInstance(layer);
  return control && control.type === "INSTANCE" ? control.getString("Label") : undefined;
}

let attrs;
if (!rich) {
  attrs = [str("label", instance.getString("Label")), str("surface", surface), str("side", side), str("caret", caret)];
} else {
  // Step copy such as "2 of 4" becomes { current: 2, total: 4 }.
  const step = instance.getBoolean("Show footer") && instance.getBoolean("Show step") ? numbers(instance.getString("Step")) : [];
  const secondary = actionLabel("Secondary action", "Show secondary action");
  const primary = actionLabel("Primary action", "Show primary action");
  attrs = [
    str("type", "rich"),
    str("surface", surface),
    str("side", side),
    str("caret", caret),
    str("icon", swapIcon(instance, "Icon", "Show icon")),
    instance.getBoolean("Show media") && str("media", "/path/to/image.jpg"),
    instance.getBoolean("Show title") && str("title", instance.getString("Title")),
    str("message", instance.getString("Message")),
    step.length >= 2 && expr("step", literal({ current: step[0], total: step[1] })),
    secondary !== undefined && expr("secondaryAction", literal({ label: secondary, onAction: code("() => {}") })),
    primary !== undefined && expr("primaryAction", literal({ label: primary, onAction: code("() => {}") })),
    // Rich tooltips show the close button unless told not to.
    !instance.getBoolean("Show close") && expr("showClose", "false"),
  ];
}

// The trigger is whatever the tooltip explains; a Button stands in for it here.
export default {
  example: figma.tsx`${openTag("Tooltip", attrs)}
  {(trigger) => <Button {...trigger} label="Trigger" />}
</Tooltip>`,
  imports: ['import { Button, Tooltip } from "@mmt/cosmos"'],
  id: "tooltip",
  metadata: { nestable: false },
};
