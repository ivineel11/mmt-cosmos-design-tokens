import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// The token repo above this folder has its own lockfile, so the root is explicit.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  agentRules: false,
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
