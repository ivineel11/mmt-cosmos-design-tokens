import type { Meta, StoryObj } from "@storybook/react-vite";
import { Matrix } from "../storybook-helpers";
import { SegmentedControl, type SegmentItem } from "./SegmentedControl";

const placeholder = (count: number): SegmentItem[] => Array.from({ length: count }, (_, i) => ({ id: `s${i + 1}`, label: "Label" }));

const meta = {
  title: "Components/Segmented Control",
  component: SegmentedControl,
  args: { items: placeholder(3), size: "medium", thumbStyle: "neutral", shape: "rounded", "aria-label": "Options" },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "small"] },
    thumbStyle: { control: "inline-radio", options: ["neutral", "brand", "tinted"] },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tap a segment, or press the thumb and drag it. */
const narrow: NonNullable<Story["decorators"]> = [(Story) => <div style={{ width: "var(--spacing-320)" }}><Story /></div>];

export const Playground: Story = { decorators: narrow };

/** Two to five segments, with an icon and a disabled segment. */
export const Segments: Story = {
  decorators: narrow,
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-xl)" }}>
      {[2, 3, 4, 5].map((count) => (
        <SegmentedControl key={count} {...args} items={placeholder(count)} aria-label={`${count} segments`} />
      ))}
      <SegmentedControl {...args} items={[{ id: "a", label: "Label", icon: "plus" }, { id: "b", label: "Label", icon: "plus" }]} aria-label="With icons" />
      <SegmentedControl {...args} items={[{ id: "a", label: "Label" }, { id: "b", label: "Label" }, { id: "c", label: "Label", disabled: true }]} aria-label="With a disabled segment" />
    </div>
  ),
};

export const Small: Story = { ...Segments, args: { size: "small" } };

/** Under test: the three thumb styles and two shapes, side by side. Only one of each will ship. */
export const UnderTestStyles: Story = {
  name: "Under test: thumb style × shape",
  render: () => (
    <Matrix
      rows={["neutral", "brand", "tinted"] as const}
      columns={["rounded", "pill"] as const}
      cell={(thumbStyle, shape) => (
        <div style={{ width: "var(--spacing-320)" }}>
          <SegmentedControl items={[{ id: "one", label: "One way" }, { id: "round", label: "Round trip" }, { id: "multi", label: "Multi-city" }]} defaultValue="round" thumbStyle={thumbStyle} shape={shape} aria-label={`Trip type, ${thumbStyle} ${shape}`} />
        </div>
      )}
    />
  ),
};

/** The spec examples with realistic copy. */
export const Examples: Story = {
  decorators: narrow,
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-xl)" }}>
      <SegmentedControl {...args} items={[{ id: "one", label: "One way" }, { id: "round", label: "Round trip" }, { id: "multi", label: "Multi-city" }]} defaultValue="round" aria-label="Trip type" />
      <SegmentedControl {...args} items={[{ id: "regular", label: "Regular" }, { id: "student", label: "Student" }, { id: "armed", label: "Armed forces" }]} aria-label="Special fares" />
      <div style={{ width: "var(--spacing-200)" }}>
        <SegmentedControl {...args} size="small" items={[{ id: "list", label: "List", icon: "list" }, { id: "map", label: "Map", icon: "map" }]} aria-label="Results view" />
      </div>
    </div>
  ),
};
