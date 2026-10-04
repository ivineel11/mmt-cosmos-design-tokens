import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, type TabItem } from "./Tabs";

const placeholder = (count: number, withIcon = false): TabItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: `tab-${i + 1}`, label: "Label", icon: withIcon ? "plus" : undefined }));

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  args: { type: "secondary", items: placeholder(4), layout: "auto", showTrack: true, "aria-label": "Sections" },
  argTypes: {
    type: { control: "inline-radio", options: ["primary", "secondary"] },
    layout: { control: "inline-radio", options: ["auto", "fixed", "scrollable"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const narrow: NonNullable<Story["decorators"]> = [(Story) => <div style={{ width: "var(--spacing-320)" }}><Story /></div>];

export const Playground: Story = { decorators: narrow };

/** Tab / Primary: an icon above the label. Hover and press a tab to see its states. */
export const Primary: Story = {
  decorators: narrow,
  args: {
    type: "primary",
    items: [
      { id: "a", label: "Label", icon: "plus" },
      { id: "b", label: "Label", icon: "plus", badge: { type: "count", count: 3 } },
      { id: "c", label: "Label", icon: "plus", badge: { type: "dot" } },
      { id: "d", label: "Label", icon: "plus", disabled: true },
    ],
  },
};

/** Tab / Secondary: label only, with an optional badge after the label. */
export const Secondary: Story = {
  decorators: narrow,
  args: {
    items: [
      { id: "a", label: "Label" },
      { id: "b", label: "Label", badge: { type: "count", count: 3 } },
      { id: "c", label: "Label" },
      { id: "d", label: "Label", disabled: true },
    ],
  },
};

const LOB: TabItem[] = [
  { id: "flights", label: "Flights", icon: "flight" },
  { id: "hotels", label: "Hotels", icon: "hotel" },
  { id: "homestays", label: "Homestays", icon: "homestay", badge: { type: "dot" } },
  { id: "trains", label: "Trains", icon: "train", badge: { type: "count", count: 2 } },
  { id: "buses", label: "Buses", icon: "bus" },
];

const SECTIONS: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "rooms", label: "Rooms", badge: { type: "count", count: 3, intent: "neutral", emphasis: "subtle" } },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

function HotelPage() {
  const [value, setValue] = useState("overview");
  const panel = { padding: "var(--space-md)", color: "var(--color-text-secondary)", font: "var(--body-medium-regular-font-weight) var(--body-medium-regular-font-size)/var(--body-medium-regular-line-height) var(--font-family-lato)" } as const;
  return (
    <div>
      <Tabs items={SECTIONS} value={value} onChange={setValue} aria-label="Hotel sections" idPrefix="hotel" />
      {SECTIONS.map((section) => (
        <div key={section.id} role="tabpanel" id={`hotel-panel-${section.id}`} aria-labelledby={`hotel-tab-${section.id}`} hidden={section.id !== value} style={panel}>
          {section.label} of Taj Exotica, Goa.
        </div>
      ))}
    </div>
  );
}

/**
 * The spec examples. The five lines of business need 390 px, so at this 375 px width the
 * row scrolls and the last tab is cut by the edge.
 */
export const Examples: Story = {
  decorators: [(Story) => <div style={{ width: "375px", display: "grid", gap: "var(--space-3xl)" }}><Story /></div>],
  render: () => (
    <>
      <Tabs type="primary" items={LOB} defaultValue="flights" aria-label="Lines of business" />
      <HotelPage />
    </>
  ),
};
