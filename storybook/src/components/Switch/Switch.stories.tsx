import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { Matrix } from "../storybook-helpers";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: { size: "medium", showIcon: false, disabled: false, defaultChecked: false, "aria-label": "Label" },
  argTypes: {
    size: { control: "inline-radio", options: ["medium", "small"] },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Off and on, enabled and disabled, with and without the glyph. Hover and press it to see the states. */
export const States: Story = {
  render: (args) => (
    <Matrix
      rows={["medium", "medium icon", "small", "small icon"] as const}
      columns={["off", "on", "off disabled", "on disabled"] as const}
      cell={(row, column) => (
        <Switch
          aria-label="Label"
          size={row.startsWith("small") ? "small" : "medium"}
          showIcon={row.endsWith("icon") || args.showIcon}
          checked={column.startsWith("on")}
          disabled={column.endsWith("disabled")}
        />
      )}
    />
  ),
};

function Row({ title, supporting, defaultOn = false, disabled = false, size = "medium" as const }: { title: string; supporting?: string; defaultOn?: boolean; disabled?: boolean; size?: "medium" | "small" }) {
  const [on, setOn] = useState(defaultOn);
  const id = useId();
  const text = disabled ? "var(--color-text-disabled)" : undefined;
  return (
    // The whole row toggles the switch (components/switch.md, Behaviour).
    <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-sm) var(--space-md)", cursor: disabled ? "not-allowed" : "pointer" }}>
      <span style={{ flex: 1, display: "grid", gap: "var(--space-3xs)" }}>
        <span id={`${id}-title`} style={{ color: text ?? "var(--color-text-primary)", font: "var(--body-medium-regular-font-weight) var(--body-medium-regular-font-size)/var(--body-medium-regular-line-height) var(--typeface-default)" }}>{title}</span>
        {supporting && (
          <span id={`${id}-supporting`} style={{ color: text ?? "var(--color-text-secondary)", font: "var(--body-small-regular-font-weight) var(--body-small-regular-font-size)/var(--body-small-regular-line-height) var(--typeface-default)" }}>{supporting}</span>
        )}
      </span>
      <Switch id={id} aria-labelledby={`${id}-title`} aria-describedby={supporting ? `${id}-supporting` : undefined} size={size} checked={on} onChange={setOn} disabled={disabled} />
    </label>
  );
}

/** The spec examples: settings rows where the row text names the switch. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2xl)", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ width: "var(--spacing-320)", background: "var(--color-bg-surface-secondary)", borderRadius: "var(--radius-lg)" }}>
        <Row title="Trip updates on WhatsApp" supporting="Booking confirmations and gate changes" defaultOn />
        <Row title="Price drop alerts" supporting="For routes you searched in the last 30 days" />
        <Row title="Pay at hotel" supporting="Not available for this property" disabled />
      </div>
      <div style={{ width: "var(--spacing-320)" }}>
        <Row title="Free cancellation" size="small" defaultOn />
        <Row title="Breakfast included" size="small" />
      </div>
    </div>
  ),
};
