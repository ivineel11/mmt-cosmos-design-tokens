import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Cosmos",
    // The manager cannot read tokens.css, so these mirror color.brand.700 and the Lato stack.
    colorSecondary: "#0067E8",
    fontBase: '"Lato", system-ui, sans-serif',
  }),
});
