/**
 * Rules about generated output: dist/ must be exactly what the build produces from the
 * current tokens.json, and the docs site must agree with it.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";

const toPosix = (p) => p.split(sep).join("/");

function listFiles(dir) {
  const out = [];
  const walk = (d) => {
    let names;
    try {
      names = readdirSync(d);
    } catch {
      return;
    }
    for (const name of names) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(toPosix(relative(dir, full)));
    }
  };
  walk(dir);
  return out.sort();
}

const tail = (text, n = 12) => text.trim().split("\n").slice(-n).join("\n");

const distFresh = {
  id: "dist/fresh",
  description: "dist/ is byte-identical to a fresh `npm run build:tokens` of the current tokens.json — never hand-edited, never left stale (README → Commit and ship).",
  check(api) {
    if (!api.exists("node_modules/style-dictionary")) {
      api.skip("root dependencies are not installed (run `npm ci`)");
      return;
    }
    if (api.tokens().error) return; // tokens/json-syntax reports it; the build would only repeat it
    const out = mkdtempSync(join(tmpdir(), "cosmos-dist-"));
    try {
      const build = spawnSync(process.execPath, ["build-tokens.mjs", "--out", out], {
        cwd: api.root,
        encoding: "utf8",
      });
      if (build.status !== 0) {
        api.report({
          file: "build-tokens.mjs",
          message: `The token build fails, so dist/ cannot be checked:\n${tail(`${build.stdout}\n${build.stderr}`)}`,
        });
        return;
      }
      const fresh = listFiles(out);
      const committed = listFiles(api.abs("dist"));
      for (const file of fresh) {
        const path = `dist/${file}`;
        if (!committed.includes(file)) {
          api.report({ file: path, message: "The build produces this file but it is not in dist/. Run `npm run build:tokens` and commit the result." });
          continue;
        }
        const want = readFileSync(join(out, file), "utf8").split("\n");
        const have = readFileSync(api.abs(path), "utf8").split("\n");
        let line = 0;
        while (line < Math.max(want.length, have.length) && want[line] === have[line]) line += 1;
        if (line < Math.max(want.length, have.length)) {
          api.report({
            file: path,
            line: line + 1,
            column: 1,
            message: `Out of date with tokens/tokens.json (or edited by hand). Expected ${JSON.stringify(want[line] ?? "<end of file>")}. Run \`npm run build:tokens\`.`,
          });
        }
      }
      for (const file of committed) {
        if (!fresh.includes(file)) {
          api.report({ file: `dist/${file}`, message: "Not produced by the build — a stale or hand-written file in a generated directory. Delete it or add it to build-tokens.mjs." });
        }
      }
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  },
  fix(api) {
    spawnSync(process.execPath, ["build-tokens.mjs"], { cwd: api.root, stdio: "ignore" });
  },
};

const docsSiteNames = {
  id: "docs-site/generated-names",
  description: "The CSS names the docs site derives for every token exist in dist/web/tokens.css, i.e. docs-site/scripts/generate-tokens.mjs still names tokens the way build-tokens.mjs does.",
  check(api) {
    if (!api.exists("docs-site/scripts/generate-tokens.mjs") || api.tokens().error) return;
    const run = spawnSync(process.execPath, ["docs-site/scripts/generate-tokens.mjs", "--check"], {
      cwd: api.root,
      encoding: "utf8",
    });
    if (run.status !== 0) {
      api.report({ file: "docs-site/scripts/generate-tokens.mjs", message: tail(`${run.stdout}\n${run.stderr}`) || "Generator check failed." });
    }
  },
};

/**
 * Every var(--…) a site uses is defined by dist/web/tokens.css or by the site's own
 * styles. Shared by the docs site and Storybook.
 */
export function cssVarRule({ id, site, description, include, exclude = [] }) {
  return {
    id,
    description,
    check(api) {
      const tokenVars = api.distCssVars();
      if (!tokenVars) return; // dist/fresh reports a missing dist
      const files = api.files().filter((f) => include.test(f) && !exclude.includes(f));
      const defined = new Set(tokenVars);
      const sources = new Map(files.map((f) => [f, api.read(f) ?? ""]));
      for (const src of sources.values()) {
        for (const m of src.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1]);
        for (const m of src.matchAll(/variable:\s*["'](--[\w-]+)["']/g)) defined.add(m[1]);
      }
      for (const [file, src] of sources) {
        src.split("\n").forEach((text, i) => {
          for (const m of text.matchAll(/var\(\s*(--[\w-]+)/g)) {
            const name = m[1];
            if (defined.has(name) || name.startsWith("--tw-")) continue;
            api.report({ file, line: i + 1, column: m.index + 1, subject: name, message: `${name} is not defined by dist/web/tokens.css or ${site} own styles. Was the token renamed?` });
          }
        });
      }
    },
  };
}

/** A package type-checks (tsc --noEmit) against freshly generated docs-site token data. */
export function typecheckRule({ id, dir, description }) {
  return {
    id,
    description,
    check(api) {
      if (!api.exists(`${dir}/node_modules/typescript`)) {
        api.skip(`${dir} dependencies are not installed (run \`npm ci\` in ${dir}/)`);
        return;
      }
      if (api.tokens().error) return;
      // tsc needs docs-site/data/tokens.json, which is generated and gitignored.
      const gen = spawnSync(process.execPath, ["scripts/generate-tokens.mjs"], { cwd: api.abs("docs-site"), encoding: "utf8" });
      if (gen.status !== 0) {
        api.report({ file: "docs-site/scripts/generate-tokens.mjs", message: `Token data generation failed:\n${tail(gen.stderr)}` });
        return;
      }
      const tsc = spawnSync(process.execPath, ["node_modules/typescript/bin/tsc", "--noEmit", "-p", "."], {
        cwd: api.abs(dir),
        encoding: "utf8",
      });
      if (tsc.status === 0) return;
      const lines = `${tsc.stdout}\n${tsc.stderr}`.split("\n").filter(Boolean);
      let reported = 0;
      for (const line of lines) {
        const m = /^(.+?)\((\d+),(\d+)\): (error .*)$/.exec(line);
        if (!m) continue;
        reported += 1;
        api.report({ file: `${dir}/${toPosix(m[1])}`, line: Number(m[2]), column: Number(m[3]), message: m[4] });
      }
      if (!reported) api.report({ file: `${dir}/tsconfig.json`, message: tail(lines.join("\n")) });
    },
  };
}

const docsSiteCssVar = cssVarRule({
  id: "docs-site/css-var",
  site: "the site's",
  description: "Every var(--…) the docs site uses is defined — by dist/web/tokens.css, by the site's own stylesheet, or by a next/font variable — so a renamed token cannot silently unstyle the site.",
  include: /^docs-site\/(app|components|lib)\/.*\.(css|tsx?|mjs)$/,
  exclude: ["docs-site/app/tokens.css"],
});

const docsSiteTypecheck = typecheckRule({
  id: "docs-site/typecheck",
  dir: "docs-site",
  description: "The docs site type-checks (tsc --noEmit) against freshly generated token data.",
});

export default [distFresh, docsSiteNames, docsSiteCssVar, docsSiteTypecheck];
