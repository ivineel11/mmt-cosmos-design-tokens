"use client";

import type { ReactNode } from "react";
import { Badge } from "@cosmos/Badge/Badge";
import { Button } from "@cosmos/Button/Button";
import { Checkbox } from "@cosmos/Checkbox/Checkbox";
import { Chip } from "@cosmos/Chip/Chip";
import { List, ListItem } from "@cosmos/List/List";
import { Radio } from "@cosmos/Radio/Radio";
import { SegmentedControl } from "@cosmos/SegmentedControl/SegmentedControl";
import { Slider } from "@cosmos/Slider/Slider";
import { Snackbar } from "@cosmos/Snackbar/Snackbar";
import { Switch } from "@cosmos/Switch/Switch";
import { Tabs } from "@cosmos/Tabs/Tabs";
import { TooltipBubble } from "@cosmos/Tooltip/Tooltip";

/** A small static menu panel drawn with the menu/* tokens; the live Menu needs a trigger. */
function MenuSample() {
  return (
    <div
      className="flex flex-col"
      style={{
        minWidth: "var(--menu-min-width)",
        padding: "var(--menu-padding-compact)",
        borderRadius: "var(--menu-radius-compact)",
        background: "var(--menu-bg)",
        boxShadow: "inset 0 0 0 var(--menu-border-width) var(--menu-border), var(--shadow-overlay)",
      }}
    >
      {["Cheapest first", "Fastest first", "Earliest departure"].map((item, i) => (
        <span
          key={item}
          className="text-[length:var(--body-medium-regular-font-size)]"
          style={{
            padding: "var(--menu-item-padding-y-compact) var(--menu-item-padding-x-compact)",
            borderRadius: "var(--menu-item-radius-compact)",
            background: i === 0 ? "var(--menu-item-bg-hover)" : undefined,
            color: "var(--menu-label-default)",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/** One live preview per component, keyed by slug. Rendered inert: the card is the link. */
export const PREVIEWS: Record<string, ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center justify-center gap-[var(--space-xs)]">
      <Button label="Book now" />
      <Button label="Details" hierarchy="secondary" />
    </div>
  ),
  badge: (
    <div className="flex items-center gap-[var(--space-sm)]">
      <Badge type="count" count={8} intent="warning" />
      <Badge type="text" label="New" intent="brand" />
      <Badge type="text" label="Refundable" intent="success" emphasis="subtle" />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col gap-[var(--space-xs)]">
      <Checkbox label="Free cancellation" defaultChecked />
      <Checkbox label="Breakfast included" />
    </div>
  ),
  chip: (
    <div className="flex flex-wrap justify-center gap-[var(--space-xs)]">
      <Chip label="Non-stop" defaultSelected />
      <Chip label="Morning" />
      <Chip label="Refundable" />
    </div>
  ),
  list: (
    <div className="w-4/5 overflow-hidden rounded-[var(--radius-lg)]" style={{ background: "var(--color-bg)" }}>
      <List dividers>
        <ListItem title="Saved travellers" leading={{ type: "icon", icon: "person" }} trailing={{ type: "chevron" }} />
        <ListItem title="Notifications" leading={{ type: "icon", icon: "bell" }} trailing={{ type: "badge", count: 2 }} />
      </List>
    </div>
  ),
  menu: <MenuSample />,
  radio: (
    <div className="flex flex-col gap-[var(--space-xs)]">
      <Radio name="preview-fare" label="Saver fare" defaultChecked />
      <Radio name="preview-fare" label="Flexi fare" />
    </div>
  ),
  "segmented-control": (
    <div className="w-4/5">
      <SegmentedControl aria-label="Trip type" items={[{ id: "a", label: "One way" }, { id: "b", label: "Round trip" }]} defaultValue="b" />
    </div>
  ),
  slider: (
    <div className="w-4/5">
      <Slider label="Price" defaultValue={[30, 70]} showHeader={false} />
    </div>
  ),
  snackbar: (
    <div className="w-11/12">
      <Snackbar message="Booking confirmed" intent="success" duration="indefinite" />
    </div>
  ),
  switch: (
    <div className="flex items-center gap-[var(--space-md)]">
      <Switch aria-label="On" defaultChecked />
      <Switch aria-label="Off" />
    </div>
  ),
  tabs: (
    <div className="w-11/12">
      <Tabs aria-label="Sections" idPrefix="preview" items={[{ id: "a", label: "Rooms" }, { id: "b", label: "Reviews" }, { id: "c", label: "Location" }]} defaultValue="a" />
    </div>
  ),
  tooltip: <TooltipBubble label="Fare includes taxes" side="bottom" />,
};

export function Preview({ slug }: { slug: string }) {
  return (
    <div inert className="pointer-events-none flex w-full items-center justify-center">
      {PREVIEWS[slug]}
    </div>
  );
}
