import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../Icon/Icon";
import { Matrix } from "../storybook-helpers";
import { Badge } from "./Badge";

const INTENTS = ["neutral", "brand", "info", "success", "caution", "warning"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { type: "count", count: 3, max: 99, label: "Label", intent: "warning", emphasis: "strong", size: "small" },
  argTypes: {
    type: { control: "inline-radio", options: ["count", "text", "dot"] },
    intent: { control: "select", options: INTENTS },
    emphasis: { control: "inline-radio", options: ["strong", "subtle"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const COLUMNS = ["count strong", "count subtle", "text strong", "text subtle", "dot"] as const;

/** Every intent and type with placeholder copy, as in the Figma showcase. */
export const Small: Story = {
  render: (args) => (
    <Matrix
      rows={INTENTS}
      columns={COLUMNS}
      cell={(intent, column) => {
        const [type, emphasis] = column.split(" ") as ["count" | "text" | "dot", "strong" | "subtle" | undefined];
        return <Badge size={args.size} type={type} emphasis={emphasis ?? "strong"} intent={intent} count={3} label="Label" />;
      }}
    />
  ),
};

export const Medium: Story = { ...Small, args: { size: "medium" } };

/** One digit is a circle; longer counts stretch into a pill and cap at "{max}+". */
export const CountOverflow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      {[3, 12, 99, 128].map((count) => (
        <Badge key={count} count={count} />
      ))}
      {[3, 12, 99, 128].map((count) => (
        <Badge key={`md-${count}`} count={count} size="medium" />
      ))}
    </div>
  ),
};

/** The spec examples with realistic copy: a count and a dot on icons, tags on hotel cards. */
export const Examples: Story = {
  render: () => {
    // Pinned to the icon corner: the badge left edge 16 in from the icon left, its top 4 above the icon top.
    const pin = { position: "absolute", left: "var(--space-md)", top: "calc(-1 * var(--space-2xs))" } as const;
    const card = {
      display: "grid",
      gap: "var(--space-xs)",
      padding: "var(--space-md)",
      background: "var(--color-bg-surface-secondary)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)",
      width: "var(--spacing-240)",
    } as const;
    return (
      <div style={{ display: "flex", gap: "var(--space-2xl)", alignItems: "flex-start", padding: "var(--space-xl)", background: "var(--color-bg-secondary)" }}>
        <button type="button" aria-label="Notifications, 3 new" style={{ position: "relative", background: "none", border: 0, padding: 0, color: "var(--color-icon)" }}>
          <Icon name="bell" size="var(--icon-md)" />
          <Badge count={3} style={pin} />
        </button>
        <button type="button" aria-label="Flights, new" style={{ position: "relative", background: "none", border: 0, padding: 0, color: "var(--color-icon)" }}>
          <Icon name="flight" size="var(--icon-md)" />
          <Badge type="dot" style={{ ...pin, top: 0, left: "var(--space-lg)" }} />
        </button>
        <article style={card}>
          <div style={{ display: "flex", gap: "var(--space-xs)", alignItems: "center" }}>
            <strong style={{ font: "var(--title-small-bold-font-weight) var(--title-small-bold-font-size)/var(--title-small-bold-line-height) var(--font-family-lato)" }}>Taj Exotica, Goa</strong>
            <Badge type="text" label="New" intent="brand" size="medium" />
          </div>
          <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
            <Badge type="text" label="Free cancellation" intent="success" emphasis="subtle" />
            <Badge type="text" label="Sold out" intent="neutral" emphasis="subtle" />
          </div>
          <span style={{ display: "flex", gap: "var(--space-xs)", alignItems: "center", color: "var(--color-text-secondary)", font: "var(--body-small-regular-font-weight) var(--body-small-regular-font-size)/var(--body-small-regular-line-height) var(--font-family-lato)" }}>
            Results <Badge count={128} intent="neutral" emphasis="subtle" />
          </span>
        </article>
      </div>
    );
  },
};
