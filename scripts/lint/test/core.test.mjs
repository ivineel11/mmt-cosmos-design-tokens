import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { opacityProblems } from "../../lib/opacity.mjs";
import { ignoreMatches } from "../lib/config.mjs";
import { JsonSyntaxError, parseJsonWithLocations, pathKey } from "../lib/json-source.mjs";
import { parseMarkdown, slugify } from "../lib/markdown.mjs";
import { fixture, lint, realTokens } from "./helpers.mjs";

describe("parseJsonWithLocations", () => {
  it("returns what JSON.parse returns, with positions", () => {
    const text = '{\n  "a": {\n    "b": [1, "x\\"y", null]\n  },\n  "c": -1.5e3\n}\n';
    const { value, locations, duplicates } = parseJsonWithLocations(text);
    assert.deepEqual(value, JSON.parse(text));
    assert.deepEqual(locations.get(pathKey(["a", "b"])), { line: 3, column: 5 });
    assert.deepEqual(locations.get(pathKey(["c"])), { line: 5, column: 3 });
    assert.deepEqual(duplicates, []);
  });

  it("reports duplicate keys, which JSON.parse drops silently", () => {
    const { value, duplicates } = parseJsonWithLocations('{"a": 1,\n "a": 2}');
    assert.equal(value.a, 2);
    assert.equal(duplicates.length, 1);
    assert.deepEqual([duplicates[0].line, duplicates[0].first.line], [2, 1]);
  });

  it("locates syntax errors", () => {
    assert.throws(() => parseJsonWithLocations('{\n  "a": 1,\n}'), (e) => e instanceof JsonSyntaxError && e.line === 3);
    assert.throws(() => parseJsonWithLocations('{"a": 01}'), JsonSyntaxError);
    assert.throws(() => parseJsonWithLocations('{"a": 1} x'), JsonSyntaxError);
  });

  it("parses the real tokens.json identically to JSON.parse", () => {
    const text = JSON.stringify(realTokens(), null, 2);
    assert.deepEqual(parseJsonWithLocations(text).value, JSON.parse(text));
  });
});

describe("opacityProblems (shared with build-tokens.mjs)", () => {
  it("accepts the real tokens", () => {
    assert.deepEqual(opacityProblems(realTokens()), []);
  });

  it("reports every problem, not just the first", () => {
    const json = realTokens();
    json.primitives.opacityScale["32"].value = "32";
    json.primitives.opacityScale["45"].value = "0.5";
    delete json.semantic.opacity["10"];
    // "32" is both out of range and not its key as a decimal: two problems.
    assert.deepEqual(
      opacityProblems(json).map((p) => p.path.join(".")),
      ["opacityScale.32", "opacityScale.32", "opacityScale.45", "opacityScale.10"],
    );
  });
});

describe("markdown", () => {
  it("slugs headings the way GitHub does", () => {
    assert.equal(slugify("11. Opacity tokens"), "11-opacity-tokens");
    assert.equal(slugify("Primitive → Semantic Mappings"), "primitive--semantic-mappings");
    assert.equal(slugify("Background — canvas and surface (15)"), "background--canvas-and-surface-15");
    assert.equal(slugify("Adding `descriptions` to other_platforms"), "adding-descriptions-to-other_platforms");
  });

  it("ignores headings and tables inside fenced code", () => {
    const doc = parseMarkdown("# A\n```\n# not a heading\n| a | b |\n|---|---|\n```\n| x | y |\n|---|---|\n| 1 | 2 |\n");
    assert.deepEqual(doc.headings.map((h) => h.text), ["A"]);
    assert.equal(doc.tables.length, 1);
    assert.deepEqual(doc.tables[0].rows[0].cells, ["1", "2"]);
  });
});

describe("config", () => {
  const d = { rule: "docs/unknown-token", file: "a.md", subject: "x.y", message: "x.y is not a token" };

  it("matches ignores on rule, file, subject and message", () => {
    assert.ok(ignoreMatches({ rule: "docs/unknown-token" }, d));
    assert.ok(ignoreMatches({ rule: "docs/unknown-token", file: "a.md", subject: "x.y" }, d));
    assert.ok(!ignoreMatches({ rule: "docs/unknown-token", file: "b.md" }, d));
    assert.ok(!ignoreMatches({ rule: "docs/broken-link" }, d));
    assert.ok(ignoreMatches({ rule: "docs/unknown-token", message: "not a token" }, d));
  });

  it("suppresses matched findings and reports ignores that match nothing", async () => {
    const root = fixture({ tokens: (j) => { j.semantic.color.bg.description = "Page background"; } });
    const config = {
      rules: {},
      file: "lint.config.mjs",
      ignores: [
        { rule: "tokens/description-style", subject: "color.bg", reason: "Accepted for the test.", index: 0 },
        { rule: "tokens/description-style", subject: "color.nope", reason: "Stale entry for the test.", index: 1 },
      ],
    };
    const diagnostics = await lint(root, "tokens/description-style", { config });
    assert.deepEqual(diagnostics.map((x) => x.rule), ["lint/unused-ignore"]);
    assert.match(diagnostics[0].message, /ignores\[1\]/);
  });

  it("applies severity overrides", async () => {
    const root = fixture({ tokens: (j) => { j.semantic.color.bg.description = "Page background"; } });
    const config = { rules: { "tokens/description-style": "warn" }, ignores: [] };
    const diagnostics = await lint(root, "tokens/description-style", { config });
    assert.ok(diagnostics.length > 0 && diagnostics.every((x) => x.severity === "warn"));
    const off = await lint(root, "tokens/description-style", { config: { rules: { "tokens/description-style": "off" }, ignores: [] } });
    assert.deepEqual(off, []);
  });
});
