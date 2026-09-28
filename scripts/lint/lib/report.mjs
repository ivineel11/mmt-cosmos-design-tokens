/** Output formats: a human one, JSON for tooling and agents, and GitHub annotations. */

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (useColor ? `\u001b[${code}m${s}\u001b[0m` : s);
const red = paint(31);
const yellow = paint(33);
const dim = paint(2);
const bold = paint(1);
const underline = paint(4);

function position(d) {
  return d.line ? `${d.line}:${d.column ?? 1}` : "";
}

export function formatStylish(diagnostics, summary) {
  const byFile = new Map();
  for (const d of diagnostics) {
    const key = d.file ?? "(repository)";
    if (!byFile.has(key)) byFile.set(key, []);
    byFile.get(key).push(d);
  }
  const lines = [];
  for (const [file, list] of [...byFile].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push("", underline(file));
    list.sort((a, b) => (a.line ?? 0) - (b.line ?? 0) || (a.column ?? 0) - (b.column ?? 0));
    const width = Math.max(...list.map((d) => position(d).length), 0);
    for (const d of list) {
      const sev = d.severity === "error" ? red("error") : yellow("warn ");
      const fix = d.fixable ? dim(" (fixable)") : "";
      lines.push(`  ${dim(position(d).padEnd(width))}  ${sev}  ${d.message}  ${dim(d.rule)}${fix}`);
    }
  }
  lines.push("", summaryLine(summary));
  return lines.join("\n");
}

export function summaryLine({ errors, warnings, fixable, skipped, rulesRun }) {
  const parts = [];
  if (errors === 0 && warnings === 0) parts.push(bold(`✓ ${rulesRun} rules passed`));
  else {
    const text = `✖ ${errors + warnings} problem${errors + warnings === 1 ? "" : "s"} (${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"})`;
    parts.push(errors ? red(bold(text)) : yellow(bold(text)));
  }
  if (fixable) parts.push(dim(`  ${fixable} fixable with --fix`));
  for (const s of skipped) parts.push(yellow(`  ⚠ skipped ${s.rule}: ${s.reason}`));
  return parts.join("\n");
}

export function formatJson(diagnostics, summary) {
  return JSON.stringify({ summary, diagnostics }, null, 2);
}

/** https://docs.github.com/actions/reference/workflow-commands-for-github-actions */
export function formatGithub(diagnostics) {
  const esc = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const prop = (s) => esc(s).replace(/:/g, "%3A").replace(/,/g, "%2C");
  return diagnostics
    .map((d) => {
      const level = d.severity === "error" ? "error" : "warning";
      const props = [
        d.file && `file=${prop(d.file)}`,
        d.line && `line=${d.line}`,
        d.column && `col=${d.column}`,
        `title=${prop(d.rule)}`,
      ].filter(Boolean);
      return `::${level} ${props.join(",")}::${esc(d.message)}`;
    })
    .join("\n");
}
