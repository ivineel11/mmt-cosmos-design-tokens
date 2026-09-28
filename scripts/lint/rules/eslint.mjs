/**
 * Runs ESLint (eslint.config.mjs) through its Node API, so JavaScript and TypeScript
 * findings land in the same report, exit code and --fix pass as everything else.
 */
import { relative, sep } from "node:path";

async function loadEslint(api) {
  if (!api.exists("node_modules/eslint")) {
    api.skip("root dependencies are not installed (run `npm ci`)");
    return null;
  }
  const { ESLint } = await import("eslint");
  return ESLint;
}

const eslint = {
  id: "js/eslint",
  description: "JavaScript and TypeScript pass ESLint: recommended rules for the build scripts; typescript-eslint, React hooks, jsx-a11y, Next.js and cosmos/no-hardcoded-color for the docs site.",
  async check(api) {
    const ESLint = await loadEslint(api);
    if (!ESLint) return;
    const results = await new ESLint({ cwd: api.root }).lintFiles(["."]);
    for (const result of results) {
      const file = relative(api.root, result.filePath).split(sep).join("/");
      for (const m of result.messages) {
        api.report({
          rule: m.ruleId ? `js/${m.ruleId}` : "js/eslint",
          severity: m.severity === 2 ? "error" : "warn",
          fixable: Boolean(m.fix),
          file,
          line: m.line,
          column: m.column,
          message: m.message,
        });
      }
    }
  },
  async fix(api) {
    const ESLint = await loadEslint(api);
    if (!ESLint) return;
    const results = await new ESLint({ cwd: api.root, fix: true }).lintFiles(["."]);
    await ESLint.outputFixes(results);
  },
};

export default [eslint];
