import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    // GitHub-flavoured Markdown, so MDX pages can use Markdown tables.
    { name: "@storybook/addon-docs", options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react-vite",
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  // Token CSS and token data live outside this package
  // (dist/web and docs-site/data).
  viteFinal: (vite) => ({
    ...vite,
    server: { ...vite.server, fs: { ...vite.server?.fs, allow: [repoRoot] } },
  }),
};

export default config;
