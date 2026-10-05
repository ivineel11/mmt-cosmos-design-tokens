import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import helpers from "../storybook-helpers.module.css";
import { Menu, type MenuEntry, type MenuTriggerProps } from "./Menu";

const placeholder: MenuEntry[] = [
  { type: "header", label: "Section header" },
  { id: "1", label: "Label", icon: "plus" },
  { id: "2", label: "Label", icon: "plus", supportingText: "Supporting text" },
  { id: "3", label: "Label", icon: "plus", meta: "Meta" },
  { id: "4", label: "Label", icon: "plus", disabled: true },
  { type: "divider" },
  { id: "5", label: "Label", icon: "plus", destructive: true },
];

const textTrigger = (label: string) => (props: MenuTriggerProps) => <Button {...props} label={label} hierarchy="secondary" size="small" trailingIcon="chevron-down" />;

/** An icon-only overflow button. It always has an accessible name. */
const overflowTrigger = (props: MenuTriggerProps) => (
  <button {...props} type="button" aria-label="More options" className={helpers.iconButton}>
    <Icon name="more-vert" size="var(--icon-md)" />
  </button>
);

const meta = {
  title: "Components/Menu",
  component: Menu,
  args: { items: placeholder, density: "comfortable", align: "start", selectionMode: "none", trigger: textTrigger("Open menu") },
  argTypes: {
    density: { control: "inline-radio", options: ["comfortable", "compact"] },
    align: { control: "inline-radio", options: ["start", "end"] },
    selectionMode: { control: false },
    trigger: { control: false },
    items: { control: false },
  },
  // The panel is positioned against the viewport, so docs render each story in its own frame.
  parameters: { layout: "padded", docs: { story: { inline: false, height: "460px" } } },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Open the menu with a click, or Enter, Space or Down arrow. Arrows move the highlight; Esc closes. */
export const Playground: Story = {};

/** The panel held open, with placeholder copy: header, rows, a disabled row, a divider and a destructive row. */
export const Comfortable: Story = { args: { open: true, onOpenChange: () => undefined } };
export const Compact: Story = { args: { open: true, onOpenChange: () => undefined, density: "compact" } };

function SortMenu() {
  const options = [
    { id: "popular", label: "Popularity" },
    { id: "price-low", label: "Price: low to high" },
    { id: "price-high", label: "Price: high to low" },
    { id: "rating", label: "User rating" },
    { id: "distance", label: "Distance" },
  ];
  const [value, setValue] = useState("price-low");
  const current = options.find((o) => o.id === value)!.label;
  return (
    <Menu
      density="compact"
      selectionMode="single"
      value={value}
      onValueChange={setValue}
      items={[{ type: "header", label: "Sort by" }, ...options]}
      trigger={(props) => <Button {...props} label={`Sort by: ${current}`} hierarchy="secondary" size="small" trailingIcon="chevron-down" />}
    />
  );
}

/** The spec examples: an overflow menu on a booking card, a single-select sort menu, and a context menu with a submenu. */
export const Examples: Story = {
  parameters: { docs: { story: { height: "520px" } } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-5xl)", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-sm) var(--space-sm) var(--space-sm) var(--space-md)", borderRadius: "var(--radius-lg)", background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-card)", font: "var(--title-small-bold-font-weight) var(--title-small-bold-font-size)/var(--title-small-bold-line-height) var(--typeface-default)" }}>
        Delhi to Goa · 12 Dec
        <Menu
          align="end"
          trigger={overflowTrigger}
          items={[
            { id: "share", label: "Share booking", icon: "share" },
            { id: "modify", label: "Modify dates", icon: "edit" },
            { id: "save", label: "Save to shortlist", icon: "bookmark" },
            { type: "divider" },
            { id: "cancel", label: "Cancel booking", icon: "delete", destructive: true },
          ]}
        />
      </div>
      <SortMenu />
      <Menu
        density="compact"
        trigger={textTrigger("Goa weekend trip")}
        items={[
          { id: "duplicate", label: "Duplicate", meta: "⌘D", keyShortcuts: "Meta+D" },
          { id: "rename", label: "Rename", meta: "⌘R", keyShortcuts: "Meta+R" },
          { id: "move", label: "Move to", submenu: [{ id: "t1", label: "Kerala in March" }, { id: "t2", label: "Office offsite" }, { id: "t3", label: "Family visit" }] },
          { type: "divider" },
          { id: "delete", label: "Delete trip", meta: "⌫", keyShortcuts: "Delete", destructive: true },
        ]}
      />
    </div>
  ),
};
