/**
 * Loads lint.config.mjs from the repo root.
 *
 *   export default {
 *     rules: { "tokens/description-style": "warn", "docs/broken-link": "off" },
 *     ignores: [
 *       { rule: "docs/unknown-token", file: "components/radio.md", subject: "borderWidth.3",
 *         reason: "Historical mention of a primitive that was removed with the focus ring." },
 *     ],
 *   };
 *
 * An ignore must say why. One that no longer matches anything is reported, so accepted
 * exceptions cannot outlive the thing they excused.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const SEVERITIES = ["error", "warn", "off"];

export async function loadConfig(root, file = "lint.config.mjs") {
  const full = join(root, file);
  if (!existsSync(full)) return { rules: {}, ignores: [], file: null };
  const mod = await import(pathToFileURL(full).href);
  const config = mod.default ?? {};
  const problems = [];

  const rules = config.rules ?? {};
  for (const [id, severity] of Object.entries(rules)) {
    if (!SEVERITIES.includes(severity)) {
      problems.push(`rules["${id}"] must be one of ${SEVERITIES.join(", ")}, got ${JSON.stringify(severity)}`);
    }
  }

  const ignores = (config.ignores ?? []).map((entry, index) => {
    if (!entry.rule) problems.push(`ignores[${index}] needs a "rule"`);
    if (typeof entry.reason !== "string" || entry.reason.trim().length < 10) {
      problems.push(`ignores[${index}] (${entry.rule}) needs a "reason" explaining why it is accepted`);
    }
    return { ...entry, index, used: false };
  });

  return { rules, ignores, file, problems };
}

/** Does this ignore entry cover this diagnostic? Unset fields match anything. */
export function ignoreMatches(entry, diagnostic) {
  if (entry.rule !== diagnostic.rule) return false;
  if (entry.file && entry.file !== diagnostic.file) return false;
  if (entry.subject && entry.subject !== diagnostic.subject) return false;
  if (entry.message && !diagnostic.message.includes(entry.message)) return false;
  return true;
}
