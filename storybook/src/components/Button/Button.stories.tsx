import type { Meta, StoryObj } from "@storybook/react-vite";
import { ICON_NAMES } from "../Icon/paths";
import { InverseSection, Matrix } from "../storybook-helpers";
import { Button, type ButtonProps } from "./Button";

const HIERARCHIES = ["primary", "secondary", "tertiary", "text"] as const;
const SIZES = ["large", "medium", "small"] as const;
const iconControl = { control: "select", options: [undefined, ...ICON_NAMES] } as const;

const meta = {
  title: "Components/Button",
  component: Button,
  args: { label: "Label", hierarchy: "primary", intent: "default", size: "medium", surface: "default", isLoading: false, isDisabled: false },
  argTypes: {
    hierarchy: { control: "inline-radio", options: HIERARCHIES },
    intent: { control: "inline-radio", options: ["default", "destructive"] },
    size: { control: "inline-radio", options: SIZES },
    surface: { control: "inline-radio", options: ["default", "inverse"] },
    leadingIcon: iconControl,
    trailingIcon: iconControl,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Every hierarchy and size, at rest and disabled. Mirrors the Figma showcase with placeholder copy. */
export const Hierarchies: Story = {
  render: (args) => (
    <Matrix
      inverse={args.surface === "inverse"}
      rows={HIERARCHIES}
      columns={["large", "medium", "small", "disabled"]}
      cell={(hierarchy, column) => (
        <Button {...args} hierarchy={hierarchy} size={column === "disabled" ? "medium" : (column as ButtonProps["size"])} isDisabled={column === "disabled"} />
      )}
    />
  ),
};

export const Destructive: Story = {
  ...Hierarchies,
  args: { intent: "destructive" },
};

/** Inverse surface for dark sections: banners, navy cards, photos under a scrim. */
export const Inverse: Story = {
  ...Hierarchies,
  args: { surface: "inverse" },
  decorators: [(Story) => <InverseSection><Story /></InverseSection>],
};

export const InverseDestructive: Story = {
  ...Hierarchies,
  args: { surface: "inverse", intent: "destructive" },
  decorators: [(Story) => <InverseSection><Story /></InverseSection>],
};

/** Icon slots are independent; the spinner renders ahead of them and keeps the label. */
export const IconsAndLoading: Story = {
  render: (args) => (
    <Matrix
      rows={SIZES}
      columns={["leading", "trailing", "both", "loading"]}
      cell={(size, column) => (
        <Button
          {...args}
          size={size}
          leadingIcon={column === "leading" || column === "both" ? "plus" : undefined}
          trailingIcon={column === "trailing" || column === "both" ? "chevron-right" : undefined}
          isLoading={column === "loading"}
        />
      )}
    />
  ),
};

/** The spec examples, with realistic copy. */
export const Examples: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", alignItems: "center" }}>
      <Button label="Submit" />
      <Button label="See all" hierarchy="secondary" trailingIcon="chevron-right" />
      <Button label="Delete account" intent="destructive" size="large" leadingIcon="plus" />
      <Button label="Submitting" isLoading />
    </div>
  ),
};
