import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Matrix } from "../storybook-helpers";
import { Snackbar, SnackbarViewport, useSnackbarQueue } from "./Snackbar";

const INTENTS = ["neutral", "info", "success", "caution", "warning"] as const;

const meta = {
  title: "Components/Snackbar",
  component: Snackbar,
  args: { message: "Message", appearance: "inverse", intent: "neutral", action: { label: "Action" }, showClose: false, duration: "indefinite", layout: "auto" },
  argTypes: {
    appearance: { control: "inline-radio", options: ["inverse", "tinted"] },
    intent: { control: "select", options: INTENTS },
    layout: { control: "inline-radio", options: ["auto", "inline", "stacked"] },
    icon: { control: false },
    onDismiss: { control: false },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single snackbars render at 360, the Figma mock width (web widths are untokenised). */
const mock: NonNullable<Story["decorators"]> = [(Story) => <div style={{ width: "360px" }}><Story /></div>];

export const Playground: Story = { decorators: mock };

/** Under trial: both appearances for every intent, with placeholder copy. Only one appearance will ship. */
export const AppearanceAndIntent: Story = {
  name: "Under trial: appearance × intent",
  render: () => (
    <Matrix
      rows={INTENTS}
      columns={["inverse", "tinted"] as const}
      cell={(intent, appearance) => (
        <div style={{ width: "360px" }}>
          <Snackbar message="Message" intent={intent} appearance={appearance} action={{ label: "Action" }} showClose duration="indefinite" />
        </div>
      )}
    />
  ),
};

/** Inline keeps the action beside the message; Stacked moves it to its own row. */
export const Layouts: Story = {
  decorators: mock,
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      <Snackbar {...args} message="Message" layout="inline" />
      <Snackbar {...args} title="Title" message="Message" layout="inline" showClose />
      <Snackbar {...args} message="Message" layout="stacked" showClose />
      <Snackbar {...args} message="Message" action={undefined} />
    </div>
  ),
};

/** The spec examples with realistic copy. */
export const Examples: Story = {
  decorators: mock,
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      <Snackbar appearance={args.appearance} message="Item removed from cart" action={{ label: "Undo" }} icon={false} duration="indefinite" />
      <Snackbar appearance={args.appearance} intent="success" title="Booking confirmed" message="Booking ID MMT-4821 sent to your email." showClose duration="indefinite" />
      <Snackbar appearance={args.appearance} intent="warning" message="Payment failed. No money was deducted." action={{ label: "Retry" }} duration="indefinite" />
      <Snackbar appearance={args.appearance} intent="caution" message="Only 2 rooms left at this price" action={{ label: "Book" }} duration="indefinite" />
      <Snackbar appearance={args.appearance} intent="info" message="Fares for your dates may rise tomorrow" action={{ label: "Set a reminder" }} layout="stacked" showClose duration="indefinite" />
    </div>
  ),
};

function Live() {
  const { current, show, dismiss } = useSnackbarQueue();
  return (
    <div style={{ position: "relative", height: "260px", width: "100%", display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", alignContent: "flex-start" }}>
      <Button label="Remove item" hierarchy="secondary" size="small" onClick={() => show({ message: "Item removed from cart", action: { label: "Undo" }, icon: false })} />
      <Button label="Confirm booking" hierarchy="secondary" size="small" onClick={() => show({ intent: "success", title: "Booking confirmed", message: "Booking ID MMT-4821 sent to your email.", showClose: true })} />
      <Button label="Fail payment" hierarchy="secondary" size="small" onClick={() => show({ intent: "warning", message: "Payment failed. No money was deducted.", action: { label: "Retry", onAction: () => show({ message: "Retrying payment…", icon: false }) } })} />
      <SnackbarViewport current={current} onDismiss={dismiss} contained />
    </div>
  );
}

/**
 * Live: one at a time, queued first in first out. Message-only snackbars leave after 4 s,
 * with an action after 7 s; hovering or focusing one pauses its timer. Esc dismisses it.
 */
export const Queue: Story = {
  decorators: [(Story) => <div style={{ width: "640px" }}><Story /></div>],
  parameters: { docs: { story: { inline: false, height: "320px" } } },
  render: () => <Live />,
};
