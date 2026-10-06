import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Matrix } from "../storybook-helpers";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "Label", description: "", size: "medium", invalid: false, disabled: false, indeterminate: false, defaultChecked: false },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"] } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const COLUMNS = ["unchecked", "checked", "indeterminate", "unchecked disabled", "checked disabled"] as const;

/** Selection by size, enabled and disabled. Hover and press a box to see the states. */
export const Selection: Story = {
  render: (args) => (
    <Matrix
      rows={["large", "medium", "small"] as const}
      columns={COLUMNS}
      cell={(size, column) => (
        <Checkbox
          label="Label"
          description={args.description || undefined}
          size={size}
          invalid={args.invalid}
          defaultChecked={column.startsWith("checked")}
          indeterminate={column === "indeterminate"}
          disabled={column.endsWith("disabled")}
        />
      )}
    />
  ),
};

/** The Error intent: box and description carry the error, the label stays neutral. */
export const Invalid: Story = { ...Selection, args: { invalid: true, description: "Description text" } };

/** Box radius per size comes from checkbox/radius-sm, -md and -lg. Under test: see issue #39. */
export const UnderTestRadius: Story = {
  name: "Under test: box radius",
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-xl)" }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <Checkbox key={size} size={size} label={size} defaultChecked />
      ))}
    </div>
  ),
};

function SelectAll() {
  const options = ["Free cancellation", "Breakfast included", "Pay at hotel"];
  const [picked, setPicked] = useState<string[]>(["Free cancellation"]);
  const all = picked.length === options.length;
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: "var(--space-sm)" }}>
      <legend style={{ marginBottom: "var(--space-sm)", font: "var(--title-small-bold-font-weight) var(--title-small-bold-font-size)/var(--title-small-bold-line-height) var(--typeface-default)" }}>Filters</legend>
      <Checkbox label="Select all" checked={all} indeterminate={picked.length > 0 && !all} onChange={() => setPicked(all ? [] : options)} />
      <div style={{ display: "grid", gap: "var(--space-sm)", paddingInlineStart: "var(--space-xl)" }}>
        {options.map((option) => (
          <Checkbox key={option} label={option} checked={picked.includes(option)} onChange={() => setPicked((current) => (current.includes(option) ? current.filter((o) => o !== option) : [...current, option]))} />
        ))}
      </div>
    </fieldset>
  );
}

/** The spec examples with realistic copy. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-3xl)", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        <Checkbox label="Send me trip updates" />
        <Checkbox label="I accept the terms" invalid description="This field is required." />
        <Checkbox label="Travel insurance" description="Included with this fare" defaultChecked disabled />
        <Checkbox size="small" aria-label="Select booking MMT-48213" />
      </div>
      <SelectAll />
    </div>
  ),
};
