#!/usr/bin/env node
/**
 * Cosmos repository linter.
 *
 *   npm run lint                      run every rule
 *   npm run lint -- --fix             apply the automatic fixes, then report what is left
 *   npm run lint -- --only tokens     one category (tokens, dist, docs, docs-site, skills, js)
 *   npm run lint -- --skip dist/fresh skip a rule or category
 *   npm run lint -- --list            describe every rule
 *   npm run lint -- --format json     machine-readable output (also: github)
 *
 * Exit code: 0 clean, 1 lint errors (or warnings over --max-warnings), 2 the linter
 * itself failed.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { loadConfig } from "./lib/config.mjs";
import { runLint, selectRules } from "./lib/engine.mjs";
import { formatGithub, formatJson, formatStylish } from "./lib/report.mjs";
import rules from "./rules/index.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const list = (values) => values.flatMap((v) => v.split(",")).map((v) => v.trim()).filter(Boolean);

async function main() {
  const { values } = parseArgs({
    options: {
      fix: { type: "boolean", default: false },
      only: { type: "string", multiple: true, default: [] },
      skip: { type: "string", multiple: true, default: [] },
      format: { type: "string", default: process.env.GITHUB_ACTIONS ? "github" : "stylish" },
      "max-warnings": { type: "string" },
      quiet: { type: "boolean", default: false },
      list: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (values.help) {
    const doc = (await import("node:fs")).readFileSync(fileURLToPath(import.meta.url), "utf8");
    console.log(doc.split("/**")[1].split("*/")[0].replace(/^ \* ?/gm, "").trim());
    return 0;
  }

  const config = await loadConfig(ROOT);
  const only = list(values.only);
  const skip = list(values.skip);

  if (values.list) {
    for (const rule of selectRules(rules, { only, skip, config: { rules: {} } })) {
      const severity = config.rules[rule.id] ?? rule.severity ?? "error";
      console.log(`${rule.id}${rule.fix ? "  (fixable)" : ""}  [${severity}]\n  ${rule.description}\n`);
    }
    return 0;
  }

  const { diagnostics, summary } = await runLint({ root: ROOT, rules, config, only, skip, fix: values.fix });
  const shown = values.quiet ? diagnostics.filter((d) => d.severity === "error") : diagnostics;

  if (values.format === "json") console.log(formatJson(shown, summary));
  else {
    if (values.format === "github" && shown.length) console.log(formatGithub(shown));
    if (summary.fixed.length) console.log(`Applied fixes: ${summary.fixed.join(", ")}`);
    console.log(formatStylish(shown, summary));
  }

  const maxWarnings = values["max-warnings"] === undefined ? Infinity : Number(values["max-warnings"]);
  return summary.errors > 0 || summary.warnings > maxWarnings ? 1 : 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error) => {
    console.error(error);
    process.exitCode = 2;
  },
);
