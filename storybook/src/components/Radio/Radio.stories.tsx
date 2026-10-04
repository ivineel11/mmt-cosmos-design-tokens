import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { Matrix } from "../storybook-helpers";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  args: { name: "playground", label: "Label", description: "Description text", size: "medium", invalid: false, disabled: false, defaultChecked: false },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"] } },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function Cell({ size, column, invalid }: { size: "small" | "medium" | "large"; column: string; invalid?: boolean }) {
  // Each cell is its own group, so selected and unselected can sit side by side.
  const name = useId();
  return <Radio name={name} label="Label" size={size} invalid={invalid} defaultChecked={column.startsWith("selected")} disabled={column.endsWith("disabled")} />;
}

/** Selection by size, enabled and disabled. Tab to a radio to see the focus state layer. */
export const Selection: Story = {
  render: (args) => (
    <Matrix
      rows={["large", "medium", "small"] as const}
      columns={["unselected", "selected", "unselected disabled", "selected disabled"] as const}
      cell={(size, column) => <Cell size={size} column={column} invalid={args.invalid} />}
    />
  ),
};

export const Invalid: Story = { ...Selection, args: { invalid: true } };

/** Dot size per control size comes from radio/dot-size-sm, -md and -lg. Under test: see issue #39. */
export const UnderTestDot: Story = {
  name: "Under test: dot size",
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-xl)" }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <Radio key={size} name={`dot-${size}`} size={size} label={size} defaultChecked />
      ))}
    </div>
  ),
};

/** The spec examples: a fare group and an invalid seat group. */
export const Examples: Story = {
  render: () => {
    const legend = { marginBottom: "var(--space-sm)", font: "var(--title-small-bold-font-weight) var(--title-small-bold-font-size)/var(--title-small-bold-line-height) var(--font-family-lato)" } as const;
    const group = { border: 0, padding: 0, margin: 0, display: "grid", gap: "var(--space-md)" } as const;
    return (
      <div style={{ display: "flex", gap: "var(--space-3xl)", alignItems: "flex-start", flexWrap: "wrap" }}>
        <fieldset style={group}>
          <legend style={legend}>Cabin class</legend>
          <Radio name="fare" value="economy" label="Economy" defaultChecked />
          <Radio name="fare" value="business" label="Business" description="Extra baggage included" />
          <Radio name="fare" value="first" label="First" description="Not available on this flight" disabled />
        </fieldset>
        <fieldset style={group} aria-describedby="seat-error">
          <legend style={legend}>Seat preference</legend>
          <Radio name="seat" value="window" label="Window" invalid />
          <Radio name="seat" value="aisle" label="Aisle" invalid />
          <span id="seat-error" style={{ color: "var(--color-text-warning)", font: "var(--label-small-regular-font-weight) var(--label-small-regular-font-size)/var(--label-small-regular-line-height) var(--font-family-lato)" }}>
            Pick a seat to continue.
          </span>
        </fieldset>
      </div>
    );
  },
};
