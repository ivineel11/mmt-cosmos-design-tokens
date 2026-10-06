import type { Preview } from "@storybook/react-vite";
import { addons } from "storybook/preview-api";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import "../../dist/web/tokens.css";
import "../src/styles/base.css";
import { brands, defaultBrand, type BrandId } from "../../dist/web/brands";
import { cosmosTheme } from "./theme";

const setBrand = (brand: unknown) => {
  document.documentElement.dataset.brand = (brand as BrandId | undefined) ?? defaultBrand;
};

// Decorators only run when a story renders, so pages with no stories, such as
// Foundations/Colour, would keep the default brand. Follow the toolbar from the channel too.
const channel = addons.getChannel();
channel.on(SET_GLOBALS, ({ globals }) => setBrand(globals?.brand));
channel.on(GLOBALS_UPDATED, ({ globals }) => setBrand(globals?.brand));

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
      setBrand(context.globals.brand);
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
