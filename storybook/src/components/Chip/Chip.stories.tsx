import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ICON_NAMES } from "../Icon/paths";
import { Canvas, Matrix, useRovingRadio } from "../storybook-helpers";
import { Chip } from "./Chip";
import photo from "./sample-photo.jpg";

const SIZES = ["large", "medium", "small"] as const;
const iconControl = { control: "select", options: [undefined, ...ICON_NAMES] } as const;

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { label: "Label", size: "medium", bordered: true, disabled: false, defaultSelected: false, imageShape: "circle", selectionRole: "toggle" },
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    imageShape: { control: "inline-radio", options: ["circle", "square"] },
    selectionRole: { control: "inline-radio", options: ["toggle", "radio", "none"] },
    leadingIcon: iconControl,
    trailingIcon: iconControl,
    selected: { control: "boolean" },
    onRemove: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const COLUMNS = ["unselected", "selected", "unselected disabled", "selected disabled"] as const;

/** Selection by size with placeholder copy. Hover and press a chip to see its states. */
export const Selection: Story = {
  render: (args) => (
    <Canvas tone={args.bordered ? "white" : "grey"}>
      <Matrix
        rows={SIZES}
        columns={COLUMNS}
        cell={(size, column) => (
          <Chip label="Label" size={size} bordered={args.bordered} selected={column.startsWith("selected")} disabled={column.endsWith("disabled")} />
        )}
      />
    </Canvas>
  ),
};

/** Border off, on the grey bg-secondary canvas. A selected borderless chip needs the check. */
export const Borderless: Story = { ...Selection, args: { bordered: false } };

/** Every slot: leading icon or image, trailing icon, secondary line, remove button. */
export const Slots: Story = {
  render: () => (
    <Canvas>
      <Matrix
        rows={SIZES}
        columns={["leading icon", "image", "square image", "trailing icon", "secondary", "removable"] as const}
        cell={(size, column) => (
          <Chip
            label="Label"
            size={size}
            leadingIcon={column === "leading icon" ? "plus" : undefined}
            leadingImage={column.includes("image") ? photo : undefined}
            imageShape={column === "square image" ? "square" : "circle"}
            trailingIcon={column === "trailing icon" ? "chevron-down" : undefined}
            secondaryText={column === "secondary" ? "Secondary text" : undefined}
            onRemove={column === "removable" ? () => undefined : undefined}
          />
        )}
      />
    </Canvas>
  ),
};

function FilterRow() {
  const [picked, setPicked] = useState<string[]>(["Morning"]);
  const toggle = (label: string) => setPicked((current) => (current.includes(label) ? current.filter((l) => l !== label) : [...current, label]));
  return (
    <div role="group" aria-label="Departure time" style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
      {["Non-stop", "Morning", "Afternoon", "Evening"].map((label) => {
        const on = picked.includes(label);
        // A selected filter shows a check, so selection never relies on colour alone.
        return <Chip key={label} label={label} selected={on} leadingIcon={on ? "check" : undefined} onSelectedChange={() => toggle(label)} />;
      })}
    </div>
  );
}

function DateRow() {
  const dates = ["Thu, 11 Dec", "Fri, 12 Dec", "Sat, 13 Dec"] as const;
  const fares: Record<(typeof dates)[number], string> = { "Thu, 11 Dec": "Rs 4,980", "Fri, 12 Dec": "Rs 4,532", "Sat, 13 Dec": "Rs 5,210" };
  const [value, setValue] = useState<(typeof dates)[number]>("Fri, 12 Dec");
  const onKeyDown = useRovingRadio(dates, value, setValue);
  return (
    <div role="radiogroup" aria-label="Departure date" style={{ display: "flex", gap: "var(--space-xs)" }}>
      {dates.map((date) => (
        <Chip key={date} label={date} secondaryText={fares[date]} selectionRole="radio" selected={value === date} tabIndex={value === date ? 0 : -1} onKeyDown={onKeyDown} onSelectedChange={() => setValue(date)} />
      ))}
    </div>
  );
}

function RemovableRow() {
  const [places, setPlaces] = useState(["Goa", "Manali", "Jaipur"]);
  return (
    <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
      {places.map((place) => (
        <Chip key={place} label={place} selected selectionRole="none" onRemove={() => setPlaces((current) => current.filter((p) => p !== place))} />
      ))}
    </div>
  );
}

/** The spec examples with realistic copy. */
export const Examples: Story = {
  render: () => (
    <Canvas>
      <div style={{ display: "grid", gap: "var(--space-xl)" }}>
        <FilterRow />
        <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
          <Chip label="Price" trailingIcon="chevron-down" selectionRole="none" aria-haspopup="menu" aria-expanded={false} />
          <Chip label="IndiGo" leadingImage={photo} />
        </div>
        <DateRow />
        <RemovableRow />
      </div>
    </Canvas>
  ),
};
