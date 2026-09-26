/**
 * Runs rules against the repository and applies config (severity overrides, ignores).
 *
 * A rule is { id, description, severity, check(api), fix?(api) }. `check` reports
 * diagnostics through `api.report({ file, line, column, message, subject })`, or calls
 * `api.skip(reason)` when it cannot run (a missing install, say) — a skipped rule is
 * surfaced in the summary rather than passing silently.
 */
import { ignoreMatches } from "./config.mjs";
import { createContext } from "./context.mjs";

export const selects = (id, patterns) =>
  patterns.some((p) => id === p || id.startsWith(`${p.replace(/\/$/, "")}/`));

export function selectRules(rules, { only = [], skip = [], config = { rules: {} } } = {}) {
  return rules.filter((rule) => {
    if (only.length && !selects(rule.id, only)) return false;
    if (skip.length && selects(rule.id, skip)) return false;
    return (config.rules[rule.id] ?? rule.severity ?? "error") !== "off";
  });
}

async function runRule(rule, ctx, extra = {}) {
  const diagnostics = [];
  let skipped = null;
  const api = {
    ...ctx,
    ...extra,
    report(d) {
      diagnostics.push({ rule: rule.id, fixable: Boolean(rule.fix), ...d });
    },
    skip(reason) {
      skipped = reason;
    },
  };
  try {
    await rule.check(api);
  } catch (error) {
    diagnostics.push({
      rule: rule.id,
      message: `rule crashed: ${error?.stack ?? error}`,
      severity: "error",
    });
  }
  return { diagnostics, skipped, api };
}

export async function runLint({ root, rules, config, only = [], skip = [], fix = false, contextOptions }) {
  const selected = selectRules(rules, { only, skip, config });
  const fixed = [];

  if (fix) {
    // Fix in registry order with a fresh context each time, because an earlier fix (a
    // rewritten tokens.json, say) changes what a later rule (dist/ freshness) sees.
    for (const rule of selected.filter((r) => r.fix)) {
      const ctx = createContext(root, contextOptions);
      const { diagnostics, skipped, api } = await runRule(rule, ctx);
      if (skipped || diagnostics.length === 0) continue;
      await rule.fix(api, diagnostics);
      fixed.push(rule.id);
    }
  }

  const ctx = createContext(root, contextOptions);
  const diagnostics = [];
  const skipped = [];
  for (const rule of selected) {
    const result = await runRule(rule, ctx);
    if (result.skipped) skipped.push({ rule: rule.id, reason: result.skipped });
    const severity = config.rules[rule.id] ?? rule.severity ?? "error";
    for (const d of result.diagnostics) diagnostics.push({ severity: d.severity ?? severity, ...d });
  }

  for (const problem of config.problems ?? []) {
    diagnostics.push({ rule: "lint/config", file: config.file, message: problem, severity: "error" });
  }

  const kept = diagnostics.filter((d) => {
    const entry = config.ignores.find((e) => ignoreMatches(e, d));
    if (entry) entry.used = true;
    return !entry;
  });

  // Only judge an ignore stale if its rule actually ran this time.
  const ran = new Set(selected.map((r) => r.id));
  const skippedIds = new Set(skipped.map((s) => s.rule));
  for (const entry of config.ignores) {
    if (!entry.used && ran.has(entry.rule) && !skippedIds.has(entry.rule)) {
      kept.push({
        rule: "lint/unused-ignore",
        file: config.file,
        severity: "warn",
        message: `ignores[${entry.index}] for ${entry.rule}${entry.subject ? ` (${entry.subject})` : ""} no longer matches anything — remove it`,
      });
    }
  }

  const errors = kept.filter((d) => d.severity === "error").length;
  return {
    diagnostics: kept,
    summary: {
      errors,
      warnings: kept.length - errors,
      fixable: kept.filter((d) => d.fixable).length,
      skipped,
      fixed,
      rulesRun: selected.length,
    },
  };
}
