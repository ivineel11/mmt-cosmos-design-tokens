import { create } from "storybook/theming";

/**
 * One theme for the Storybook UI and the docs pages, so both are set in Lato (loaded
 * from Google Fonts in manager-head.html and preview-head.html). The manager cannot
 * read tokens.css, so the colour mirrors color.azure.700.
 */
export const cosmosTheme = create({
  base: "light",
  brandTitle: "Cosmos",
  colorSecondary: "#0067E8",
  fontBase: '"Lato", system-ui, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace',
});
