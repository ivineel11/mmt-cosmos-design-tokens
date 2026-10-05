import type { Preview } from "@storybook/react-vite";
import "../../dist/web/tokens.css";
import "../src/styles/base.css";
import { brands, defaultBrand, type BrandId } from "../../dist/web/brands";
import { cosmosTheme } from "./theme";

const preview: Preview = {
  // The Brand toolbar switches every story and docs page at once, the way data-brand
  // switches a product page: it sets data-brand on the root, and tokens.css swaps the
  // brandable custom properties under it.
  globalTypes: {
    brand: {
      description: "Brand",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: Object.entries(brands).map(([value, brand]) => ({ value, title: brand.name })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const brand = (context.globals.brand as BrandId | undefined) ?? defaultBrand;
      document.documentElement.dataset.brand = brand;
      return <Story />;
    },
  ],
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
  initialGlobals: { backgrounds: { value: "bg" }, brand: defaultBrand },
};

export default preview;
