import type { Preview } from "@storybook/react-vite";
import "../../dist/web/tokens.css";
import "../src/styles/base.css";
import { cosmosTheme } from "./theme";

const preview: Preview = {
  parameters: {
    layout: "centered",
    docs: { theme: cosmosTheme },
    controls: { expanded: true, sort: "requiredFirst" },
    backgrounds: {
      options: {
        bg: { name: "bg (white canvas)", value: "var(--color-bg)" },
        "bg-secondary": { name: "bg-secondary (grey canvas)", value: "var(--color-bg-secondary)" },
        inverse: { name: "bg-surface-inverse (dark section)", value: "var(--color-bg-surface-inverse)" },
      },
    },
    a11y: { test: "error" },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colour", "Typography", "Spacing", "Radius", "Stroke", "Iconography", "Elevation", "Opacity", "Inverse surface"],
          "Tokens",
          ["Primitives", "Semantic", "Component"],
          "Components",
        ],
      },
    },
  },
  initialGlobals: { backgrounds: { value: "bg" } },
};

export default preview;
