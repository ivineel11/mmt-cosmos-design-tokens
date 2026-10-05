import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { RuleTester } from "eslint";
import cosmos from "../eslint-plugin-cosmos.mjs";
import { loadConfig } from "../lib/config.mjs";
import { fixture, lint, ofRule, realTokens, REPO } from "./helpers.mjs";

const DIST = ["dist"];
// Live count, so adding a Button token does not break the count assertions below.
const BUTTON_TOKENS = Object.keys(realTokens().component.button).length;

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
      "Real: `color.text-primary`, `button/bg-primary-default`, `{color.azure.700}`, `--space-md`, `CosmosTokens.colorBgFillBrand`, `spacing.minus8`, `CosmosTokens.swift`.",
      "Dead: `color.text-primry`, `button/bg-nope`, `{color.azure.1000}`, `--space-huge`, `CosmosTokens.colorNope`.",
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
      "{color.azure.1000}",
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
      "| `border-focus` | `color.azure.400` |",
      "",
      "| Token | Value |",
      "|---|---|",
      "| `spacing.16` | 16px |",
      "| `fontSize.14` | 15px |",
      "",
      "| Step | Neutral | Azure |",
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
    assert.match(text, /border-focus aliases color\.azure\.400; tokens\.json has \{color\.azure\.600\}/);
    assert.match(text, /fontSize\.14 is 15px; it resolves to 14px/);
    assert.match(text, /color\.azure\.0 \(#000000\), which does not exist/);
    assert.match(text, new RegExp(`button/\\* has 104 tokens; tokens\\.json has ${BUTTON_TOKENS}`));
    assert.match(text, /body\.medium\.regular/);
  });

  it("docs/readme-counts: headings, totals and prose counts", async () => {
    // The semantic colour and emitted-value counts must match the real tokens.json, which the
    // fixture keeps, so they are read from the real README (itself checked by "passes every
    // rule") rather than hardcoded. Hardcoding them broke this test on every token addition.
    const real = readFileSync(join(REPO, "README.md"), "utf8");
    const [, semanticColors, web, native] = /\((\d+) colors \+[^)]*\)[^\n]*?\*\*(\d+) values on web\*\* · \*\*(\d+) on iOS and Android\*\*/.exec(real);
    const root = readme([
      "### Primitive tokens (1)",
      "#### Font size — 3 tokens",
      "##### Text (2)",
      "| Token | Role |",
      "|---|---|",
      "| `color.text-primary` | Body |",
      `**Totals:** 1 primitive tokens · 2 semantic tokens (${semanticColors} colors + 36 typography) · 3 component tokens (${BUTTON_TOKENS} \`button/*\` + 1 \`checkbox/*\`) · **${web} values on web** · **${native} on iOS and Android** · **0 gradients**`,
      `Button (${BUTTON_TOKENS} tokens) and Radio (5 tokens) qualify.`,
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
    const readme = [
      "### Semantic tokens (1)",
      "| Token | Role |",
      "|---|---|",
      "| `color.text-primary` | Body |",
      "### Mappings",
      "| Token | Role |",
      "|---|---|",
      "| `color.text-new` | Mentioned outside the inventory |",
    ].join("\n");
    const root = fixture({ copy: DIST, tokens: (j) => { j.semantic.color["text-new"] = { ...j.semantic.color["text-primary"] }; }, files: { "README.md": readme } });
    const subjects = ofRule(await lint(root, "docs/readme-coverage"), "docs/readme-coverage").map((h) => h.subject);
    assert.ok(subjects.includes("color.text-new"), "a row outside the inventory must not count");
    assert.ok(!subjects.includes("color.text-primary"));
  });

  it("docs/component-spec: a component group without a spec", async () => {
    const root = readme("| Group |\n|---|\n| `button/*` |\n");
    const hits = ofRule(await lint(root, "docs/component-spec"), "docs/component-spec");
    // The fixture has no components/*.md, so every real group lacks a spec; all but button also
    // lack a README row. Derived from tokens.json so adding a component does not break the test.
    const groups = Object.keys(realTokens().component);
    assert.deepEqual(hits.map((h) => h.subject).sort(), groups.flatMap((g) => (g === "button" ? [g] : [g, g])).sort());
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

  it("storybook/css-var: an undefined custom property in a block or an MDX page", async () => {
    const root = fixture({
      copy: DIST,
      files: {
        "storybook/src/blocks/blocks.css": ".doc { --doc-swatch: 1px; width: var(--doc-swatch); color: var(--color-text-primary); }\n",
        "storybook/src/foundations/A.mdx": '<div style={{ color: "var(--color-text-gone)" }} />\n',
      },
    });
    const hits = ofRule(await lint(root, "storybook/css-var"), "storybook/css-var");
    assert.deepEqual(hits.map((h) => `${h.file}:${h.line} ${h.subject}`), ["storybook/src/foundations/A.mdx:1 --color-text-gone"]);
  });

  it("storybook/component-raw-value: hex and lengths in component CSS, not zero or comments", async () => {
    const root = fixture({
      files: {
        "storybook/src/components/Button/Button.module.css": [
          "/* 48px tall at #0067E8 */",
          ".root { min-height: 48px; color: #fff; margin: 0px; padding: var(--button-padding-x-md); }",
          ".icon { width: 1.5rem; flex: 1 1 0; opacity: 0.5; }",
        ].join("\n"),
        "storybook/src/blocks/blocks.css": ".doc { width: 120px; }\n",
      },
    });
    const hits = ofRule(await lint(root, "storybook/component-raw-value"), "storybook/component-raw-value");
    assert.deepEqual(hits.map((h) => `${h.line} ${h.subject}`), ["2 48px", "2 #fff", "3 1.5rem"]);
  });

  it("storybook/mdx-prose-brace: a bare {name} in prose, not in code, imports or JSX", async () => {
    const root = fixture({
      files: {
        "storybook/src/components/Chip/Chip.mdx": [
          'import * as Stories from "./Chip.stories";',
          "<Canvas of={Stories.Playground} />",
          "Its \"Remove {label}\" button and its `Remove {label}` name.",
          "```css",
          ".a { color: red; }",
          "```",
        ].join("\n"),
      },
    });
    const hits = ofRule(await lint(root, "storybook/mdx-prose-brace"), "storybook/mdx-prose-brace");
    assert.deepEqual(hits.map((h) => `${h.line} ${h.subject}`), ["3 {label}"]);
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
