// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=637-3233
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Snackbar/Snackbar.tsx
// component=Snackbar
import figma from "figma";
import { expr, flag, iconName, literal, code, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const appearance = instance.getEnum("Appearance", { Inverse: undefined, Tinted: "tinted" });
const intent = instance.getEnum("Intent", { Neutral: "neutral", Info: "info", Success: "success", Caution: "caution", Warning: "warning" }) ?? "neutral";
// "auto" in code picks inline or stacked from the width, so only a forced stack is written.
const layout = instance.getEnum("Layout", { Inline: undefined, Stacked: "stacked" });

// <Snackbar> picks a glyph from the intent; write the icon only when Figma shows a different one, or none.
const INTENT_ICON: Record<string, string> = { neutral: "check", info: "info", success: "check-circle", caution: "alert-triangle", warning: "alert-circle" };
const showIcon = instance.getBoolean("Show icon");
const glyph = showIcon ? iconName(instance.findInstance("Leading icon")) : undefined;
const icon = !showIcon ? "false" : glyph && glyph !== INTENT_ICON[intent] ? JSON.stringify(glyph) : undefined;

const actionLayer = instance.getBoolean("Show action") ? instance.findInstance("Action") : undefined;
const actionLabel = actionLayer && actionLayer.type === "INSTANCE" ? actionLayer.getString("Label") : undefined;

const attrs = [
  str("message", instance.getString("Message")),
  instance.getBoolean("Show title") && str("title", instance.getString("Title")),
  str("appearance", appearance),
  intent !== "neutral" && str("intent", intent),
  expr("icon", icon),
  actionLabel !== undefined && expr("action", literal({ label: actionLabel, onAction: code("() => {}") })),
  flag("showClose", instance.getBoolean("Show close")),
  str("layout", layout),
];

export default {
  example: figma.tsx`${tag("Snackbar", attrs)}`,
  imports: ['import { Snackbar } from "@mmt/cosmos"'],
  id: "snackbar",
  metadata: { nestable: false },
};
