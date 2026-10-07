import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const here = dirname(fileURLToPath(import.meta.url));

// The guidelines pages render the real Cosmos components from ../storybook/src/components
// (imported as @cosmos/*), so Turbopack's root is the repository rather than this folder.
// Those files would otherwise resolve React from storybook/node_modules, a second copy that
// breaks hooks, so React always comes from this package.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  agentRules: false,
  turbopack: {
    root: join(here, ".."),
    resolveAlias: {
      react: "./docs-site/node_modules/react",
      "react-dom": "./docs-site/node_modules/react-dom",
    },
  },
};

export default nextConfig;
