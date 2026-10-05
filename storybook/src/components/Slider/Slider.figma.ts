// url=https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/Cosmos?node-id=811-1622
// source=https://github.com/ivineel11/mmt-cosmos-design-tokens/blob/main/storybook/src/components/Slider/Slider.tsx
// component=Slider
import figma from "figma";
import { expr, firstNumber, flag, numbers, str, tag } from "../../code-connect/helpers";

const instance = figma.selectedInstance;

const range = instance.getEnum("Type", { Single: false, Range: true });
const discrete = instance.getEnum("Steps", { Continuous: false, Discrete: true });
const size = instance.getEnum("Size", { Medium: undefined, Small: "small" });
// Hover, Pressed and Focus are browser states. Pressed grow is the grow press style under test.
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "default",
  Pressed: "default",
  Focus: "default",
  Disabled: "disabled",
  "Pressed grow": "grow",
});

// Min, Max and Value are display copy in Figma, such as "₹500"; only their numbers reach code.
const min = firstNumber(instance.getString("Min"));
const max = firstNumber(instance.getString("Max"));
const values = numbers(instance.getString("Value"));
const value = range ? (values.length >= 2 ? `[${values[0]}, ${values[1]}]` : undefined) : values.length ? String(values[0]) : undefined;
const showLimits = instance.getBoolean("Show limits");

const attrs = [
  str("label", instance.getString("Label")),
  expr("defaultValue", value),
  min !== undefined && min !== 0 && expr("min", String(min)),
  max !== undefined && max !== 100 && expr("max", String(max)),
  // Discrete thumbs snap to steps; the step size is not in Figma, so set it to suit the data.
  discrete && expr("step", "1"),
  discrete && flag("showTicks", true),
  !instance.getBoolean("Show header") && expr("showHeader", "false"),
  flag("showLimits", showLimits),
  !instance.getBoolean("Show tooltip") && expr("showTooltip", "false"),
  str("size", size),
  state === "grow" && str("pressStyle", "grow"),
  flag("disabled", state === "disabled"),
];

export default {
  example: figma.tsx`${tag("Slider", attrs)}`,
  imports: ['import { Slider } from "@mmt/cosmos"'],
  id: "slider",
  metadata: { nestable: true },
};
