/**
 * ESLint for the repository's JavaScript and TypeScript. Run through `npm run lint`,
 * which folds these results into the same report as the token and docs rules.
 *
 * TypeScript is parsed with the root's typescript@6 because typescript-eslint cannot
 * load TypeScript 7 (the docs site's compiler). Linting is syntax-level only; type
 * checking is the docs-site/typecheck rule, which runs the site's own tsc.
 */
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import cosmos from "./scripts/lint/eslint-plugin-cosmos.mjs";

export default defineConfig([
  globalIgnores([
    "dist/",
    "**/node_modules/",
    "docs-site/.next/",
    "docs-site/out/",
    "docs-site/next-env.d.ts",
    "storybook/storybook-static/",
    // Vendored uSpec files, re-rendered by `npx uspec-skills update` — never hand-edited.
    ".claude/",
    ".cursor/",
    ".agents/",
    "references/",
  ]),

  {
    name: "cosmos/node-scripts",
    files: ["**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
    },
  },

  {
    name: "cosmos/docs-site",
    files: ["docs-site/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
      nextPlugin.configs["core-web-vitals"],
    ],
    plugins: { cosmos },
    languageOptions: { globals: globals.browser },
    settings: { next: { rootDir: "docs-site/" } },
    rules: {
      "cosmos/no-hardcoded-color": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },

  {
    name: "cosmos/storybook",
    files: ["storybook/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
    plugins: { cosmos },
    languageOptions: { globals: globals.browser },
    rules: {
      "cosmos/no-hardcoded-color": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
]);
