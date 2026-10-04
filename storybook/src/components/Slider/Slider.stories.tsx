import type { Meta, StoryObj } from "@storybook/react-vite";
import { Matrix } from "../storybook-helpers";
import { Slider } from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  args: { label: "Label", defaultValue: 60, min: 0, max: 100, showHeader: true, showLimits: true, showTooltip: true, tooltipCaret: true, size: "medium", disabled: false, pressStyle: "halo", showTicks: false },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "small"] },
    pressStyle: { control: "inline-radio", options: ["halo", "grow"] },
    value: { control: false },
    formatValue: { control: false },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const narrow: NonNullable<Story["decorators"]> = [(Story) => <div style={{ width: "var(--spacing-320)" }}><Story /></div>];

/** Drag a thumb, tap the track, or focus a thumb and use the arrow keys. */
export const Playground: Story = { decorators: narrow };

/** Type by steps, with placeholder labels. Hover, press and focus a thumb to see its states. */
export const Types: Story = {
  render: (args) => (
    <Matrix
      rows={["single continuous", "range continuous", "single discrete", "range discrete"] as const}
      columns={["enabled", "disabled"] as const}
      cell={(row, column) => {
        const range = row.startsWith("range");
        const discrete = row.endsWith("discrete");
        return (
          <div style={{ width: args.size === "small" ? "var(--spacing-240)" : "var(--spacing-320)" }}>
            <Slider
              label="Label"
              size={args.size}
              pressStyle={args.pressStyle}
              showLimits
              defaultValue={range ? [25, 75] : discrete ? 75 : 60}
              step={discrete ? 25 : undefined}
              showTicks={discrete}
              disabled={column === "disabled"}
              formatValue={(v) => `${v}%`}
            />
          </div>
        );
      }}
    />
  ),
};

export const Small: Story = { ...Types, args: { size: "small" } };

/** Under test: the halo press against the grow press. Press and hold a thumb in each. */
export const UnderTestPress: Story = {
  name: "Under test: halo vs grow press",
  render: () => (
    <Matrix
      rows={["medium", "small"] as const}
      columns={["halo", "grow"] as const}
      cell={(size, pressStyle) => (
        <div style={{ width: size === "small" ? "var(--spacing-240)" : "var(--spacing-320)" }}>
          <Slider label={`${pressStyle} press`} size={size} pressStyle={pressStyle} defaultValue={[25, 75]} formatValue={(v) => `${v}%`} />
        </div>
      )}
    />
  ),
};

const rupees = (v: number) => `₹${v.toLocaleString("en-IN")}${v >= 20000 ? "+" : ""}`;
const clock = (v: number) => `${String(v).padStart(2, "0")}:00`;

/** The spec examples with realistic copy. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-5xl)", width: "var(--spacing-320)" }}>
      <Slider label="Price per night" min={500} max={20000} step={500} defaultValue={[2000, 8000]} formatValue={rupees} showLimits />
      <Slider label="Departure time" min={0} max={24} step={6} showTicks defaultValue={[6, 18]} formatValue={clock} showLimits />
      <Slider label="Distance from centre" min={0} max={10} step={0.5} defaultValue={6} formatValue={(v) => `${v} km`} showLimits />
      <div style={{ width: "var(--spacing-240)" }}>
        <Slider label="Guest rating" size="small" min={1} max={5} step={1} showTicks defaultValue={4} formatValue={(v) => `${v}`} showLimits />
      </div>
    </div>
  ),
};
