import { cpSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runLint } from "../lib/engine.mjs";
import rules from "../rules/index.mjs";

export const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
export const realTokens = () => JSON.parse(readFileSync(join(REPO, "tokens/tokens.json"), "utf8"));

/**
 * A throwaway repository root. `tokens` is either a function that mutates a copy of the
 * real tokens.json, or raw file text. `files` adds or overrides other files.
 */
export function fixture({ tokens = () => {}, files = {}, copy = [], linkModules = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), "cosmos-lint-test-"));
  mkdirSync(join(root, "tokens"));
  let text;
  if (typeof tokens === "string") text = tokens;
  else {
    const json = realTokens();
    tokens(json);
    text = `${JSON.stringify(json, null, 2)}\n`;
  }
  writeFileSync(join(root, "tokens/tokens.json"), text);
  for (const path of copy) cpSync(join(REPO, path), join(root, path), { recursive: true });
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  if (linkModules) symlinkSync(join(REPO, "node_modules"), join(root, "node_modules"), "dir");
  return root;
}

export async function lint(root, only, { config = { rules: {}, ignores: [] }, fix = false } = {}) {
  const result = await runLint({ root, rules, config, only: [].concat(only), fix });
  return result.diagnostics;
}

export const ofRule = (diagnostics, rule) => diagnostics.filter((d) => d.rule === rule);
