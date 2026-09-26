import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { RuleTester } from "eslint";
import cosmos from "../eslint-plugin-cosmos.mjs";
import { loadConfig } from "../lib/config.mjs";
import { fixture, lint, ofRule, REPO } from "./helpers.mjs";

const DIST = ["dist"];

describe("the repository itself", () => {
  it("passes every rule", async () => {
    const diagnostics = await lint(REPO, [], { config: await loadConfig(REPO) });
    assert.deepEqual(diagnostics.map((d) => `${d.rule} ${d.file}:${d.line} ${d.message}`), []);
  });
});

describe("docs rules", () => {
  const readme = (body) => fixture({ copy: DIST, files: { "README.md": body } });

  it("docs/broken-link: missing files and anchors", async () => {
    const root = readme("# Title\n\nSee [a](missing.md), [b](#title), [c](#nope) and [d](https://example.com).\n");
    const hits = ofRule(await lint(root, "docs/broken-link"), "docs/broken-link");
    assert.deepEqual(hits.map((h) => h.subject), ["missing.md", "#nope"]);
  });

  it("docs/unknown-token: every spelling of a token", async () => {
    const root = readme([
      "# T",
      "Real: `color.text-primary`, `button/bg-primary-default`, `{color.brand.700}`, `--space-md`, `CosmosTokens.colorBgFillBrand`, `spacing.minus8`, `CosmosTokens.swift`.",
      "Dead: `color.text-primry`, `button/bg-nope`, `{color.brand.1000}`, `--space-huge`, `CosmosTokens.colorNope`.",
      "Not tokens: `color.*`, `{group}.{size}`, `README.md`.",
      "```css",
      ".a { color: var(--color-text-nope); }",
      "```",
      "```ts",
      "tokens.colorNope; import t from \"./tokens.ts\";",
      "```",
    ].join("\n"));
    const hits = ofRule(await lint(root, "docs/unknown-token"), "docs/unknown-token");
    assert.deepEqual(hits.map((h) => h.subject), [
      "color.text-primry",
      "button/bg-nope",
      "{color.brand.1000}",
      "--space-huge",
      "CosmosTokens.colorNope",
      "--color-text-nope",
      "tokens.colorNope",
    ]);
  });

  it("docs/token-facts: stale aliases, values, palette hexes, typography and counts", async () => {
    const root = readme([
      "# T",
      "| Semantic token | Primitive reference(s) |",
      "|---|---|",
      "| `bg` | `color.neutral.0` |",
      "| `border-focus` | `color.brand.400` |",
      "",
      "| Token | Value |",
      "|---|---|",
      "| `spacing.16` | 16px |",
      "| `fontSize.14` | 15px |",
      "",
      "| Step | Neutral | Brand |",
      "|---|---|---|",
      "| `0` | #FFFFFF | #000000 |",
      "| `50` | #FAFAFA | #EDF8FF |",
      "",
      "| Group | Tokens |",
      "|---|---|",
      "| `button/*` | 104 |",
      "",
      "- `body.medium.regular` → fontFamily.lato · fontWeight.regular · 14px · 24px",
    ].join("\n"));
    const hits = ofRule(await lint(root, "docs/token-facts"), "docs/token-facts");
    const text = hits.map((h) => h.message).join("\n");
    assert.equal(hits.length, 5, text);
    assert.match(text, /border-focus aliases color\.brand\.400; tokens\.json has \{color\.brand\.600\}/);
    assert.match(text, /fontSize\.14 is 15px; it resolves to 14px/);
    assert.match(text, /color\.brand\.0 \(#000000\), which does not exist/);
    assert.match(text, /button\/\* has 104 tokens; tokens\.json has 120/);
    assert.match(text, /body\.medium\.regular/);
  });

  it("docs/readme-counts: headings, totals and prose counts", async () => {
    const root = readme([
      "### Primitive tokens (1)",
      "#### Font size — 3 tokens",
      "##### Text (2)",
      "| Token | Role |",
      "|---|---|",
      "| `color.text-primary` | Body |",
      "**Totals:** 1 primitive tokens · 2 semantic tokens (199 colors + 36 typography) · 3 component tokens (120 `button/*` + 1 `checkbox/*`) · **896 values per platform** · **0 gradients**",
      "Button (120 tokens) and Radio (5 tokens) qualify.",
    ].join("\n"));
    const hits = ofRule(await lint(root, "docs/readme-counts"), "docs/readme-counts");
    const subjects = hits.map((h) => h.subject).sort();
    assert.deepEqual(subjects, [
      "checkbox/* tokens",
      "component tokens",
      "primitive tokens",
      "primitives tokens",
      "primitives.fontSize tokens",
      "radio/* tokens",
      'rows in the "Text (2)" table',
      "semantic tokens",
    ]);
  });

  it("docs/readme-coverage: a semantic colour with no inventory row", async () => {
    const root = fixture({ copy: DIST, tokens: (j) => { j.semantic.color["text-new"] = { ...j.semantic.color["text-primary"] }; }, files: { "README.md": "### Semantic tokens (1)\n" } });
    const hits = ofRule(await lint(root, "docs/readme-coverage"), "docs/readme-coverage");
    assert.ok(hits.some((h) => h.subject === "color.text-new"));
  });

  it("docs/component-spec: a component group without a spec", async () => {
    const root = readme("| Group |\n|---|\n| `button/*` |\n");
    const hits = ofRule(await lint(root, "docs/component-spec"), "docs/component-spec");
    assert.deepEqual(hits.map((h) => h.subject).sort(), ["button", "checkbox", "checkbox", "radio", "radio"]);
  });
});

describe("generated output", () => {
  it("dist/fresh: a hand-edited, stale or orphaned dist/ file", async () => {
    const root = fixture({
      copy: ["dist", "build-tokens.mjs", "scripts/lib"],
      linkModules: true,
      files: { "package.json": '{ "type": "module" }\n', "dist/web/extra.css": "" },
    });
    const css = join(root, "dist/web/tokens.css");
    writeFileSync(css, readFileSync(css, "utf8").replace("--color-neutral-0: #FFFFFF;", "--color-neutral-0: #FFFFFE;"));
    const hits = ofRule(await lint(root, "dist/fresh"), "dist/fresh");
    assert.deepEqual(hits.map((h) => h.file).sort(), ["dist/web/extra.css", "dist/web/tokens.css"]);
    assert.ok(hits.find((h) => h.file === "dist/web/tokens.css").line > 1);
  });

  it("dist/fresh: surfaces a build that throws", async () => {
    const root = fixture({
      copy: ["dist", "build-tokens.mjs", "scripts/lib"],
      linkModules: true,
      files: { "package.json": '{ "type": "module" }\n' },
      tokens: (j) => { j.primitives.opacityScale["32"].value = "32"; },
    });
    const hits = ofRule(await lint(root, "dist/fresh"), "dist/fresh");
    assert.equal(hits.length, 1);
    assert.match(hits[0].message, /decimal between 0 and 1/);
  });

  it("docs-site/css-var: an undefined custom property", async () => {
    const root = fixture({
      copy: DIST,
      files: {
        "docs-site/app/globals.css": ":root { --page-max: 1px; }\n.a { width: var(--page-max); color: var(--color-text-primary); }\n",
        "docs-site/components/A.tsx": 'export const A = () => <p style={{ color: "var(--color-text-gone)" }} />;\n',
      },
    });
    const hits = ofRule(await lint(root, "docs-site/css-var"), "docs-site/css-var");
    assert.deepEqual(hits.map((h) => `${h.file}:${h.line} ${h.subject}`), ["docs-site/components/A.tsx:1 --color-text-gone"]);
  });
});

describe("skills rules", () => {
  it("skills/parity and skills/uspec-config", async () => {
    const root = fixture({
      files: {
        ".claude/skills/extract-api/SKILL.md": "a",
        ".cursor/skills/extract-api/SKILL.md": "b",
        ".claude/skills/create-api/SKILL.md": "claude syntax",
        ".cursor/skills/create-api/SKILL.md": "cursor syntax",
        ".claude/skills/firstrun/SKILL.md": "x",
        "uspecs.config.json": '{ "environment": "codex", "cliVersion": "0.3.2" }',
        "README.md": "Run `npx uspec-skills@0.3.1 doctor`.\n",
      },
    });
    const diagnostics = await lint(root, "skills");
    assert.deepEqual(diagnostics.map((d) => `${d.rule} ${d.file}`).sort(), [
      "skills/parity .claude/skills/firstrun/SKILL.md",
      "skills/parity .cursor/skills/extract-api/SKILL.md",
      "skills/uspec-config README.md",
      "skills/uspec-config uspecs.config.json",
    ]);
  });
});

describe("cosmos/no-hardcoded-color", () => {
  const tester = new RuleTester({ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } });
  tester.run("no-hardcoded-color", cosmos.rules["no-hardcoded-color"], {
    valid: [
      'const a = <div style={{ color: "var(--color-text-primary)" }} />;',
      'const a = <div className="bg-(--color-bg) text-[11px]" />;',
      'const isWhite = (hex) => hex === "#ffffff";',
      'const a = <div style={{ boxShadow: "0 1px 2px color-mix(in srgb, var(--color-bg-surface-inverse) 8%, transparent)" }} />;',
    ],
    invalid: [
      { code: 'const a = <div style={{ color: "#fff" }} />;', errors: [{ messageId: "style" }] },
      { code: "const a = <div style={{ boxShadow: `0 1px ${x} rgba(0,0,0,0.1)` }} />;", errors: [{ messageId: "style" }] },
      { code: 'const a = <div style={{ color: on ? "var(--c)" : "hsl(0 0% 0%)" }} />;', errors: [{ messageId: "style" }] },
      { code: 'const a = <div className="p-2 bg-[#F5F5F5]" />;', errors: [{ messageId: "className" }] },
    ],
  });
});
