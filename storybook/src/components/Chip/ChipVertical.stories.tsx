import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ICON_NAMES } from "../Icon/paths";
import { Canvas, Matrix, useRovingRadio } from "../storybook-helpers";
import { ChipVertical } from "./ChipVertical";
import photo from "./sample-photo.jpg";

const iconControl = { control: "select", options: [undefined, ...ICON_NAMES] } as const;

const meta = {
  title: "Components/Chip Vertical",
  component: ChipVertical,
  args: { label: "Label", leading: "icon", icon: "plus", image: photo, size: "medium", bordered: true, disabled: false, defaultSelected: false, imageShape: "circle", selectionRole: "radio" },
  argTypes: {
    leading: { control: "inline-radio", options: ["icon", "image", "none"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
    imageShape: { control: "inline-radio", options: ["circle", "square"] },
    selectionRole: { control: "inline-radio", options: ["toggle", "radio", "none"] },
    icon: { control: "select", options: ICON_NAMES },
    labelTrailingIcon: iconControl,
    secondaryTrailingIcon: iconControl,
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof ChipVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Leading slot by selection, with placeholder copy. Hover and press a chip to see its states. */
export const Leading: Story = {
  render: (args) => (
    <Canvas tone={args.bordered ? "white" : "grey"}>
      <Matrix
        rows={["icon", "image", "none"] as const}
        columns={["unselected", "selected", "secondary", "disabled"] as const}
        cell={(leading, column) => (
          <ChipVertical
            label="Label"
            size={args.size}
            leading={leading}
            image={photo}
            bordered={args.bordered}
            selectionRole="toggle"
            secondaryText={column === "secondary" ? "Secondary text" : undefined}
            selected={column === "selected"}
            disabled={column === "disabled"}
          />
        )}
      />
    </Canvas>
  ),
};

export const Small: Story = { ...Leading, args: { size: "small" } };

/** Border off on the grey canvas: a selected vertical chip still draws its border. */
export const Borderless: Story = { ...Leading, args: { bordered: false } };

function TripType() {
  const options = ["One way", "Round trip", "Multi-city"] as const;
  const [value, setValue] = useState<(typeof options)[number]>("One way");
  const onKeyDown = useRovingRadio(options, value, setValue);
  return (
    <div role="radiogroup" aria-label="Trip type" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xs)", width: "var(--spacing-320)" }}>
      {options.map((option) => (
        <ChipVertical key={option} label={option} icon="flight" fullWidth selected={value === option} tabIndex={value === option ? 0 : -1} onKeyDown={onKeyDown} onSelectedChange={() => setValue(option)} />
      ))}
    </div>
  );
}

function Airlines() {
  const options = ["IndiGo", "Air India", "Akasa"] as const;
  const fares: Record<(typeof options)[number], string> = { IndiGo: "Rs 4,532", "Air India": "Rs 5,120", Akasa: "Rs 4,890" };
  const [value, setValue] = useState<(typeof options)[number]>("IndiGo");
  const onKeyDown = useRovingRadio(options, value, setValue);
  return (
    <div role="radiogroup" aria-label="Airline" style={{ display: "flex", gap: "var(--space-xs)" }}>
      {options.map((option) => (
        <ChipVertical key={option} label={option} leading="image" image={photo} secondaryText={fares[option]} selected={value === option} tabIndex={value === option ? 0 : -1} onKeyDown={onKeyDown} onSelectedChange={() => setValue(option)} />
      ))}
    </div>
  );
}

/** The spec examples with realistic copy. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-xl)" }}>
      <Canvas>
        <div style={{ display: "grid", gap: "var(--space-xl)" }}>
          <TripType />
          <div style={{ display: "flex", gap: "var(--space-xs)" }}>
            <ChipVertical label="Economy" leading="none" secondaryText="Rs 4,532" labelTrailingIcon="chevron-down" selected selectionRole="none" aria-haspopup="menu" />
            <ChipVertical label="Fri, 12 Dec" leading="none" secondaryText="Rs 4,532" selected selectionRole="toggle" />
            <ChipVertical label="Goa" leading="image" image={photo} imageShape="square" secondaryText="From Rs 3,899" selectionRole="toggle" />
          </div>
          <Airlines />
        </div>
      </Canvas>
      <Canvas tone="grey">
        <ChipVertical label="Afternoon" leading="none" bordered={false} selected selectionRole="toggle" />
      </Canvas>
    </div>
  ),
};
