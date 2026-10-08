import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Matrix } from "../storybook-helpers";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { label: "Label", supportingText: "Supporting text", placeholder: "Placeholder", clearable: false, invalid: false, readOnly: false, disabled: false },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: "var(--spacing-320)" }}>{Story()}</div>],
};

const ROWS = ["empty", "populated", "empty error", "populated error"] as const;
const COLUMNS = ["default", "read-only", "disabled"] as const;

/**
 * Value by intent, at rest, read-only and disabled. Hover, press and click into a field for
 * Hover, Pressed and Active; type into a clearable field (Slots) for Typing.
 */
export const States: Story = {
  render: () => (
    <Matrix
      rows={ROWS}
      columns={COLUMNS}
      cell={(row, column) => (
        <div style={{ width: "var(--spacing-240)" }}>
          <Input
            label="Label"
            supportingText="Supporting text"
            placeholder="Placeholder"
            defaultValue={row.startsWith("populated") ? "Input text" : undefined}
            invalid={row.endsWith("error")}
            readOnly={column === "read-only"}
            disabled={column === "disabled"}
          />
        </div>
      )}
    />
  ),
};

function Password() {
  const [shown, setShown] = useState(false);
  return (
    <Input
      label="Password"
      type={shown ? "text" : "password"}
      autoComplete="current-password"
      defaultValue="trip2goa!"
      supportingText="Use at least 8 characters."
      trailingIcon={shown ? "visibility-off" : "visibility"}
      trailingIconLabel={shown ? "Hide password" : "Show password"}
      onTrailingIconClick={() => setShown((s) => !s)}
    />
  );
}

function Search() {
  const [value, setValue] = useState("Goa");
  return <Input label="Where to?" placeholder="City, area or hotel name" leadingIcon="search" clearable value={value} onChange={(event) => setValue(event.target.value)} />;
}

/** Prefix, icons, the Clear button of the Typing state (click into "Where to?") and the trailing icon button. */
export const Slots: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)", width: "var(--spacing-320)" }}>
      <Input label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel-national" prefix="+91" supportingText="We will send a 6-digit OTP to this number." />
      <Search />
      <Password />
      <Input label="Departure" leadingIcon="calendar" defaultValue="Fri, 24 Oct" readOnly aria-haspopup="dialog" />
    </div>
  ),
};

/** The spec examples with realistic copy. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-7xl)", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ display: "grid", gap: "var(--space-md)", width: "var(--spacing-320)" }}>
        <Input label="From" leadingIcon="flight" defaultValue="New Delhi (DEL)" />
        <Input label="To" leadingIcon="flight" defaultValue="Mumbai (BOM)" />
        <Input label="Departure" leadingIcon="calendar" defaultValue="Fri, 24 Oct" readOnly aria-haspopup="dialog" />
        <Input label="Travellers" leadingIcon="person" defaultValue="2 adults" readOnly aria-haspopup="dialog" />
      </div>
      <div style={{ display: "grid", gap: "var(--space-md)", width: "var(--spacing-320)" }}>
        <Input label="Full name as on ID" autoComplete="name" defaultValue="Priya Sharma" />
        <Input label="Email" type="email" autoComplete="email" defaultValue="priya.sharma@gmail" invalid supportingText="Enter a valid email address, such as name@example.com." />
        <Password />
      </div>
      <div style={{ display: "grid", gap: "var(--space-md)", width: "var(--spacing-320)" }}>
        <Search />
        <Input label="Promo code" supportingText="Codes are case sensitive." autoCapitalize="characters" clearable />
        <Input label="Wallet balance" defaultValue="₹0" disabled supportingText="Add money to your wallet to pay with it." />
      </div>
    </div>
  ),
};
