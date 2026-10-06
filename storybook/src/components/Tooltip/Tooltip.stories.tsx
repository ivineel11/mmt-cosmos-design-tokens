import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Chip } from "../Chip/Chip";
import photo from "../Chip/sample-photo.jpg";
import { Icon } from "../Icon/Icon";
import { Matrix } from "../storybook-helpers";
import helpers from "../storybook-helpers.module.css";
import { Tooltip, TooltipBubble, type TooltipTriggerProps } from "./Tooltip";

const SURFACES = ["dark", "light", "info"] as const;

const meta = {
  title: "Components/Tooltip",
  component: TooltipBubble,
  args: { type: "plain", surface: "dark", side: "top", caret: "center", label: "Label", title: "Title", message: "Message", showClose: true },
  argTypes: {
    type: { control: "inline-radio", options: ["plain", "rich"] },
    surface: { control: "inline-radio", options: SURFACES },
    side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
    caret: { control: "inline-radio", options: ["center", "start", "end", "none"] },
    icon: { control: false },
    media: { control: false },
  },
} satisfies Meta<typeof TooltipBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The bubble on its own. In product it floats over its trigger; see Examples. */
export const Playground: Story = {};

/** Plain and Rich on each surface, with placeholder copy. Hover a Rich action to see its states. */
export const Surfaces: Story = {
  render: () => (
    <Matrix
      rows={["plain", "rich"] as const}
      columns={SURFACES}
      cell={(type, surface) =>
        type === "plain" ? (
          <TooltipBubble surface={surface} label="Label" side="bottom" />
        ) : (
          <TooltipBubble type="rich" surface={surface} side="bottom" icon="auto-awesome" title="Title" message="Message" step={{ current: 1, total: 3 }} secondaryAction={{ label: "Skip" }} primaryAction={{ label: "Next" }} />
        )
      }
    />
  ),
};

/** Side is where the bubble sits; the caret sits at the start, centre or end of the edge facing the trigger. */
export const SideAndCaret: Story = {
  args: { surface: "dark" },
  render: (args) => (
    <Matrix
      rows={["top", "bottom", "left", "right"] as const}
      columns={["start", "center", "end", "none"] as const}
      cell={(side, caret) => <TooltipBubble surface={args.surface} side={side} caret={caret} label="Label" />}
    />
  ),
};

/** An info icon trigger: a real button with an accessible name and a 48 hit area. */
const infoTrigger = (name: string) => (props: TooltipTriggerProps) => (
  <button {...props} type="button" aria-label={name} className={helpers.iconButton} style={{ margin: "calc(var(--space-md) * -1) 0" }}>
    <Icon name="info" size="var(--icon-xs)" />
  </button>
);

const row = { display: "flex", alignItems: "center", gap: "var(--space-2xs)", font: "var(--body-medium-regular-font-weight) var(--body-medium-regular-font-size)/var(--body-medium-regular-line-height) var(--typeface-default)", color: "var(--color-text-primary)" } as const;

function Tour() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const steps = [
    { title: "New: Filter by airline", message: "Pick the airlines you prefer and we will show their flights first." },
    { title: "Sort your way", message: "Cheapest, fastest or earliest: change the order any time." },
    { title: "Save a search", message: "We will tell you when the fare drops." },
  ];
  const current = steps[step - 1];
  return (
    <Tooltip
      type="rich"
      side="bottom"
      caret="start"
      icon="auto-awesome"
      title={current.title}
      message={current.message}
      step={{ current: step, total: steps.length }}
      showClose={false}
      secondaryAction={{ label: "Skip", onAction: () => setStep(1) }}
      primaryAction={{ label: step === steps.length ? "Done" : "Next", onAction: () => setStep(step === steps.length ? 1 : step + 1) }}
      open={open}
      onOpenChange={setOpen}
    >
      {(props) => <Chip {...props} label="Airlines" trailingIcon="chevron-down" selectionRole="none" aria-haspopup="dialog" onClick={() => setOpen(!open)} />}
    </Tooltip>
  );
}

/**
 * The spec examples, live. Hover or focus the info icons for Plain tooltips; click a trigger
 * for the Rich ones. Esc closes; only one tooltip is open at a time.
 */
export const Examples: Story = {
  parameters: { layout: "padded", docs: { story: { inline: false, height: "620px" } } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-7xl)", padding: "var(--space-7xl) var(--space-3xl)", justifyItems: "start" }}>
      <span style={row}>
        Free cancellation
        <Tooltip side="bottom" label="Cancel up to 24 hrs before check-in for a full refund">{infoTrigger("About free cancellation")}</Tooltip>
      </span>
      <Tour />
      <span style={row}>
        ₹4,520 per night
        <Tooltip side="top" caret="start" surface="light" label="Includes GST and the hotel service fee">{infoTrigger("Price details")}</Tooltip>
      </span>
      <span style={row}>
        Convenience fee ₹350
        <Tooltip label="Charged per traveller for booking online">{infoTrigger("Fee info")}</Tooltip>
      </span>
      <span style={row}>
        Zero cancellation add-on
        <Tooltip type="rich" surface="light" side="right" media={photo} title="Zero cancellation" message="Cancel any time before departure and get a full refund of your fare." primaryAction={{ label: "Got it" }}>
          {infoTrigger("About zero cancellation")}
        </Tooltip>
      </span>
      <span style={row}>
        Traveller details
        <Tooltip type="rich" surface="info" side="bottom" caret="end" icon="info" title="Fill this in with one tap" message="Pick a traveller you have booked with before and we will add their details for you.">
          {infoTrigger("Saved travellers")}
        </Tooltip>
      </span>
    </div>
  ),
};
