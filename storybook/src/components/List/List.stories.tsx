import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import photo from "../Chip/sample-photo.jpg";
import { Canvas } from "../storybook-helpers";
import { List, ListItem } from "./List";

const meta = {
  title: "Components/List",
  component: List,
  args: { variant: "plain", density: "comfortable", header: "Section header", dividers: true, selectionMode: "none", children: null },
  argTypes: {
    variant: { control: "inline-radio", options: ["plain", "grouped"] },
    density: { control: "inline-radio", options: ["comfortable", "compact"] },
    selectionMode: { control: false },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ width: "var(--spacing-320)" }}><Story /></div>],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Navigation rows with placeholder copy. Hover and press a row; Tab to see the inset focus ring. */
export const Playground: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem title="Title" leading={{ type: "icon", icon: "plus" }} trailing={{ type: "chevron" }} onPress={() => undefined} />
      <ListItem title="Title" supportingText="Supporting text" leading={{ type: "icon", icon: "plus" }} trailing={{ type: "chevron" }} onPress={() => undefined} />
      <ListItem title="Title" supportingText="Supporting text" thirdLine="Third line" leading={{ type: "icon", icon: "plus" }} trailing={{ type: "chevron" }} onPress={() => undefined} />
    </List>
  ),
};

/** Every leading type, one per row. Keep one leading type per list in product. */
export const LeadingSlot: Story = {
  render: (args) => (
    <List {...args} header="Leading">
      <ListItem title="Icon" leading={{ type: "icon", icon: "plus" }} onPress={() => undefined} />
      <ListItem title="Icon container" leading={{ type: "iconContainer", icon: "plus" }} onPress={() => undefined} />
      <ListItem title="Icon container, brand" leading={{ type: "iconContainer", icon: "plus", tone: "brand" }} onPress={() => undefined} />
      <ListItem title="Avatar" leading={{ type: "avatar", src: photo }} onPress={() => undefined} />
      <ListItem title="Thumbnail" leading={{ type: "thumbnail", src: photo }} onPress={() => undefined} />
      <ListItem title="Checkbox" leading={{ type: "checkbox" }} selected />
      <ListItem title="Disabled" leading={{ type: "icon", icon: "plus" }} disabled onPress={() => undefined} />
    </List>
  ),
};

/** Every trailing type, one per row. */
export const TrailingSlot: Story = {
  render: (args) => (
    <List {...args} header="Trailing">
      <ListItem title="Chevron" trailing={{ type: "chevron" }} onPress={() => undefined} />
      <ListItem title="Meta" trailing={{ type: "meta", meta: "Meta" }} onPress={() => undefined} />
      <ListItem title="Meta and chevron" trailing={{ type: "metaChevron", meta: "Meta" }} onPress={() => undefined} />
      <ListItem title="Badge" trailing={{ type: "badge", count: 3 }} onPress={() => undefined} />
      <ListItem title="Button" trailing={{ type: "button", label: "Label" }} />
      <ListItem title="Switch" trailing={{ type: "switch" }} selected />
      <ListItem title="Disabled switch" trailing={{ type: "switch" }} selected disabled />
    </List>
  ),
};

export const Compact: Story = { ...TrailingSlot, args: { density: "compact" } };

function AirlineFilter() {
  const airlines = [
    ["IndiGo", "₹4,532"],
    ["Air India", "₹5,120"],
    ["Akasa Air", "₹4,890"],
    ["SpiceJet", "₹4,710"],
  ] as const;
  const [picked, setPicked] = useState<string[]>(["IndiGo"]);
  return (
    <div style={{ width: "280px" /* the web filter panel width in the spec */ }}>
      <List density="compact" header="Airlines" dividers={false} selectionMode="multiple">
        {airlines.map(([name, price]) => (
          <ListItem
            key={name}
            title={name}
            leading={{ type: "checkbox" }}
            trailing={{ type: "meta", meta: price }}
            selected={picked.includes(name)}
            onSelectedChange={(on) => setPicked((current) => (on ? [...current, name] : current.filter((n) => n !== name)))}
          />
        ))}
      </List>
    </div>
  );
}

function Notifications() {
  const [on, setOn] = useState({ whatsapp: true, price: false, offers: false });
  const row = (key: keyof typeof on, title: string, supporting?: string) => (
    <ListItem title={title} supportingText={supporting} trailing={{ type: "switch" }} selected={on[key]} onSelectedChange={(value) => setOn((current) => ({ ...current, [key]: value }))} />
  );
  return (
    <List variant="grouped" header="Notifications">
      {row("whatsapp", "Trip updates on WhatsApp", "Booking confirmations and gate changes")}
      {row("price", "Price drop alerts")}
      {row("offers", "Offers and deals")}
    </List>
  );
}

/** The spec examples with realistic copy. */
export const Examples: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3xl)", alignItems: "flex-start" }}>
      <div style={{ width: "var(--spacing-320)" }}>
        <List header="Popular cities">
          <ListItem title="New Delhi, India" supportingText="Indira Gandhi International Airport" leading={{ type: "icon", icon: "flight" }} trailing={{ type: "meta", meta: "DEL" }} onPress={() => undefined} />
          <ListItem title="Mumbai, India" supportingText="Chhatrapati Shivaji International Airport" leading={{ type: "icon", icon: "flight" }} trailing={{ type: "meta", meta: "BOM" }} onPress={() => undefined} />
          <ListItem title="Bengaluru, India" supportingText="Kempegowda International Airport" leading={{ type: "icon", icon: "flight" }} trailing={{ type: "meta", meta: "BLR" }} onPress={() => undefined} />
        </List>
      </div>
      <div style={{ width: "var(--spacing-320)", padding: "var(--space-md) 0", background: "var(--color-bg-secondary)" }}>
        <List variant="grouped" header="Account">
          <ListItem title="My trips" leading={{ type: "iconContainer", icon: "flight" }} trailing={{ type: "chevron" }} href="#trips" />
          <ListItem title="Notifications" leading={{ type: "iconContainer", icon: "bell" }} trailing={{ type: "badge", label: "3 new" }} href="#notifications" />
          <ListItem title="Verify your email" supportingText="Get booking updates on time" leading={{ type: "iconContainer", icon: "info", tone: "brand" }} trailing={{ type: "chevron" }} href="#verify" />
        </List>
        <List variant="grouped" header="Support">
          <ListItem title="Help centre" leading={{ type: "iconContainer", icon: "info" }} trailing={{ type: "chevron" }} href="#help" />
          <ListItem title="Travellers" leading={{ type: "iconContainer", icon: "person" }} trailing={{ type: "chevron" }} href="#travellers" />
        </List>
      </div>
      <AirlineFilter />
      <div style={{ width: "var(--spacing-320)", display: "grid", gap: "var(--space-xl)" }}>
        <List header="Hotels in Goa">
          <ListItem title="Taj Exotica Resort & Spa" supportingText="Benaulim · 4.6 (2,140 reviews)" thirdLine="Free breakfast" leading={{ type: "thumbnail", src: photo }} trailing={{ type: "meta", meta: "₹18,400" }} onPress={() => undefined} />
          <ListItem title="W Goa" supportingText="Vagator · 4.4 (1,260 reviews)" thirdLine="Free cancellation" leading={{ type: "thumbnail", src: photo }} trailing={{ type: "meta", meta: "₹22,900" }} onPress={() => undefined} />
        </List>
        <List header="Saved travellers">
          <ListItem title="Rahul Verma" supportingText="Adult · Passport added" leading={{ type: "iconContainer", icon: "person" }} trailing={{ type: "button", label: "Add", accessibleLabel: "Add Rahul Verma" }} />
        </List>
        <Notifications />
      </div>
    </div>
  ),
};

/** Grouped lists belong on the grey page. */
export const GroupedOnGrey: Story = {
  render: (args) => (
    <Canvas tone="grey">
      <List {...args} variant="grouped" header="Section header">
        <ListItem title="Title" leading={{ type: "iconContainer", icon: "plus" }} trailing={{ type: "chevron" }} onPress={() => undefined} />
        <ListItem title="Title" leading={{ type: "iconContainer", icon: "plus" }} trailing={{ type: "chevron" }} onPress={() => undefined} />
      </List>
    </Canvas>
  ),
};
