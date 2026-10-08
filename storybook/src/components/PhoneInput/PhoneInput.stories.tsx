import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Matrix } from "../storybook-helpers";
import { PhoneInput, type PhoneValue } from "./PhoneInput";

const meta = {
  title: "Components/Phone input",
  component: PhoneInput,
  args: { label: "Mobile number", defaultCountry: "IN", supportingText: "We will send a 6-digit OTP to this number.", invalid: false, disabled: false, clearable: false },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: "var(--spacing-320)" }}>{Story()}</div>],
};

/** Empty and filled, at rest, invalid and disabled. Click into a field for Active and type for Typing. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={["empty", "populated"] as const}
      columns={["default", "error", "disabled"] as const}
      cell={(row, column) => (
        <div style={{ width: "var(--spacing-320)" }}>
          <PhoneInput
            defaultValue={row === "populated" ? "9876543210" : undefined}
            invalid={column === "error"}
            disabled={column === "disabled"}
            supportingText={column === "error" ? "Enter a valid 10-digit mobile number." : "We will send a 6-digit OTP to this number."}
          />
        </div>
      )}
    />
  ),
};

function Validated() {
  const [phone, setPhone] = useState<PhoneValue | null>(null);
  const [touched, setTouched] = useState(false);
  const invalid = touched && !!phone?.nationalNumber && !phone.isValid;
  return (
    <div style={{ display: "grid", gap: "var(--space-sm)", width: "var(--spacing-320)" }}>
      <PhoneInput
        clearable
        onValueChange={(next) => setPhone(next)}
        onBlur={() => setTouched(true)}
        onFocus={() => setTouched(false)}
        invalid={invalid}
        supportingText={invalid ? "Enter a valid mobile number for the selected country." : "We will send a 6-digit OTP to this number."}
      />
      <code style={{ font: "var(--label-small-regular-font-weight) var(--label-small-regular-font-size)/var(--label-small-regular-line-height) ui-monospace, monospace", color: "var(--color-text-secondary)" }}>
        {phone ? `${phone.e164 ?? "(incomplete)"} · ${phone.isValid ? "valid" : "not valid yet"}` : "Type a number"}
      </code>
    </div>
  );
}

/** Grouping as you type, a length cap per country and validation on blur. Change the country to see the format follow. */
export const Validation: Story = { render: () => <Validated /> };

/** The same field for a few countries. */
export const Countries: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)", width: "var(--spacing-320)" }}>
      <PhoneInput defaultCountry="IN" defaultValue="9876543210" />
      <PhoneInput defaultCountry="AE" defaultValue="501234567" />
      <PhoneInput defaultCountry="US" defaultValue="2015550123" />
      <PhoneInput defaultCountry="GB" defaultValue="7400123456" />
      <PhoneInput defaultCountry="SG" defaultValue="81234567" />
    </div>
  ),
};
