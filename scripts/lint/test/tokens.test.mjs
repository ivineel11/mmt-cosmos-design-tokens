import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { buildTokenModel } from "../lib/tokens.mjs";
import { emittedPaths } from "../rules/tokens.mjs";
import { fixture, lint, ofRule, realTokens } from "./helpers.mjs";

const TOKENS_RULES = "tokens";

describe("token rules on the real tokens.json", () => {
  it("report nothing", async () => {
    const diagnostics = await lint(fixture(), TOKENS_RULES);
    assert.deepEqual(diagnostics, []);
  });
});

/** Each case breaks exactly one convention and names the rule that must catch it. */
const cases = [
  ["tokens/json-syntax", '{ "primitives": { ', "line 1"],
  ["tokens/duplicate-key", null, 'Duplicate key "0"', {
    text: () => readFileSync(join(fixture(), "tokens/tokens.json"), "utf8").replace('"0": {\n          "value": "#FFFFFF"', '"0": { "value": "#000000", "type": "color" },\n        "0": {\n          "value": "#FFFFFF"'),
  }],
  ["tokens/format", null, "canonical format", { text: () => JSON.stringify(realTokens(), null, 4) }],
  ["tokens/structure", (j) => j.$metadata.tokenSetOrder.reverse(), "tokenSetOrder"],
  ["tokens/structure", (j) => delete j.semantic.color.bg.type, "no type"],
  ["tokens/structure", (j) => { j.semantic.color.bg.$value = j.semantic.color.bg.value; }, "$value/$type"],
  ["tokens/structure", (j) => { j.semantic.color.bg.extra = 1; }, 'Unexpected key "extra"'],
  ["tokens/structure", (j) => { j.semantic.color["bg-new"] = { type: "color", description: "A new canvas." }; }, 'no "value"'],
  ["tokens/key-format", (j) => { j.semantic.color["Bg Fill"] = { ...j.semantic.color.bg }; }, "not kebab-case"],
  ["tokens/key-format", (j) => { j.primitives.borderRadius["-2"] = { value: "-2px", type: "borderRadius" }; }, "Negative key"],
  ["tokens/type", (j) => { j.semantic.color.bg.type = "colour"; }, "no transform"],
  ["tokens/type", (j) => { j.primitives.spacing["2"].type = "sizing"; }, "rest of primitives.spacing"],
  ["tokens/value-format", (j) => { j.primitives.color.red["500"].value = "#fb2c36"; }, "uppercase"],
  ["tokens/value-format", (j) => { j.primitives.color.red["500"].value = "rgb(251, 44, 54)"; }, "rgb()"],
  ["tokens/value-format", (j) => { j.primitives.color.red["500"].value = "#FB2C3680"; }, "bakes alpha"],
  ["tokens/value-format", (j) => { j.primitives.spacing["16"].value = "16"; }, "px strings"],
  ["tokens/value-format", (j) => { j.primitives.fontWeight.bold.value = 750; }, "100–900"],
  ["tokens/primitive-scale-name", (j) => { j.primitives.spacing["16"].value = "18px"; }, "its name says 16px"],
  ["tokens/reference", (j) => { j.semantic.color.bg.value = "{color.neutral.5}"; }, "does not exist"],
  ["tokens/reference", (j) => { j.semantic.color.bg.value = "{color.neutral}"; }, "is a group"],
  ["tokens/reference", (j) => { j.semantic.space.xs.value = "{spacing.minus8}"; }, "as authored"],
  ["tokens/reference", (j) => { j.semantic.color.bg.value = "tint of {color.neutral.0}"; }, "longer string"],
  ["tokens/reference", (j) => {
    j.semantic.color.bg.value = "{color.bg-secondary}";
    j.semantic.color["bg-secondary"].value = "{color.bg}";
  }, "circular reference"],
  ["tokens/tier-reference", (j) => { j.primitives.color.red["500"].value = "{color.red.600}"; }, "Primitives hold raw values"],
  ["tokens/tier-reference", (j) => { j.semantic.color.bg.value = "{color.bg-fill}"; }, "Semantic tokens alias primitives only"],
  ["tokens/tier-reference", (j) => { j.component.button["bg-primary-default"].value = "{color.brand.700}"; }, "{color.bg-fill-brand}"],
  ["tokens/tier-reference", (j) => { j.component.button["bg-primary-hover"].value = "{button.bg-primary-default}"; }, "another component token"],
  ["tokens/alias-required", (j) => { j.semantic.color.bg.value = "#FFFFFF"; }, "raw value"],
  ["tokens/alias-required", (j) => { j.semantic.body.medium.regular.value.fontSize = "14px"; }, ".fontSize holds the raw value"],
  ["tokens/reference-type", (j) => { j.semantic.color.bg.value = "{spacing.0}"; }, "aliases the spacing token"],
  ["tokens/opacity", (j) => { j.primitives.opacityScale["32"].value = "32"; }, "decimal between 0 and 1"],
  ["tokens/opacity", (j) => { delete j.semantic.opacity["45"]; }, "no semantic mirror"],
  ["tokens/opacity", (j) => { j.semantic.opacity.scrim.value = "0.32"; }, "Only primitives"],
  ["tokens/no-disabled-opacity", (j) => { j.semantic.opacity.disabled = { value: "{opacityScale.40}", type: "opacity", description: "Dims a disabled control to forty percent." }; }, "disabled state as opacity"],
  ["tokens/canvas-as-fill", (j) => { j.component.checkbox["bg-unselected-default"].value = "{color.bg}"; }, "aliases the canvas"],
  ["tokens/typography", (j) => { j.semantic.body.medium.bold.value.fontWeight = "{fontWeight.regular}"; }, 'named "bold"'],
  ["tokens/typography", (j) => { delete j.semantic.body.medium.bold.value.lineHeight; }, "missing lineHeight"],
  ["tokens/typography", (j) => { j.semantic.body.medium.bold.value.fontSize = "{fontSize.16}"; }, "share metrics"],
  ["tokens/shadow", (j) => { j.semantic.shadow.card.value[0].spread = "{shadowOffset.0}"; }, "has a spread"],
  ["tokens/shadow", (j) => { j.semantic.shadow.card.value[0].type = "innerShadow"; }, "sets a type"],
  ["tokens/shadow", (j) => { delete j.semantic.shadow.card.value[1].blur; }, "layer 2 is missing blur"],
  ["tokens/shadow", (j) => { j.semantic.shadow.card.value[0].blur = "{spacing.4}"; }, "should alias a shadowBlur"],
  ["tokens/shadow", (j) => { j.semantic.shadow.card.value[0].color = "{color.neutral.950}"; }, "should alias a color.alpha"],
  ["tokens/shadow", (j) => { j.semantic.shadow.card.value.push({ ...j.semantic.shadow.card.value[0] }); }, "has 3 layers"],
  ["tokens/value-format", (j) => { j.semantic.shadow.card.value = j.semantic.shadow.card.value[0]; }, "array of shadow layers"],
  ["tokens/alias-required", (j) => { j.semantic.shadow.card.value[0].y = "1px"; }, ".1.y holds the raw value"],
  ["tokens/reference", (j) => { j.semantic.shadow.card.value[0].y = "{shadowOffset.3}"; }, "does not exist"],
  ["tokens/typography", (j) => { j.semantic.body.medium.regular.value.lineHeight = "{lineHeight.12}"; }, "smaller than its font size"],
  ["tokens/scale-order", (j) => { j.semantic.space.md.value = "{spacing.8}"; }, "must grow with size"],
  ["tokens/color-ramp", (j) => { j.primitives.color.red["500"].value = "#FFE2E2"; }, "not darker"],
  ["tokens/semantic-color-role", (j) => { j.semantic.color.primary = { ...j.semantic.color.bg }; }, "role taxonomy"],
  ["tokens/semantic-color-role", (j) => { j.semantic.color["text-red-700"] = { ...j.semantic.color["text-warning"] }; }, "palette value"],
  ["tokens/expressive-mirror", (j) => { j.semantic.color["exp-red-500"].value = "{color.red.600}"; }, "should alias {color.red.500}"],
  ["tokens/namespace-collision", (j) => { j.primitives.color.bg = { fill: { value: "#FFFFFF", type: "color", description: "Collides with the semantic bg-fill role." } }; }, "--color-bg-fill"],
  ["tokens/namespace-collision", (j) => { j.semantic.spacing = { 16: { value: "{spacing.16}", type: "spacing", description: "Collides with the primitive spacing step." } }; }, "exists in both"],
  ["tokens/contrast", (j) => { j.semantic.color["text-info-on-bg-fill-strong"].value = "{color.brand.300}"; }, "WCAG 1.4.3"],
  ["tokens/contrast", (j) => { j.component.button["label-primary-hover"].value = "{color.text-brand}"; }, "button.label-primary-hover"],
  ["tokens/contrast", (j) => { j.component.checkbox["icon-selected-default"].value = "{color.bg-fill-brand}"; }, "WCAG 1.4.11"],
  ["tokens/contrast", (j) => { j.semantic.color["text-teal-on-bg-fill-strong"] = { ...j.semantic.color["text-info-on-bg-fill-strong"] }; }, "does not exist"],
  ["tokens/contrast", (j) => { j.semantic.color["bg-surface-brand-pressed-subtle"].value = "{color.brand.800}"; }, "on color.bg-surface-brand-pressed-subtle"],
  // An -inverse key over a transparent fill is checked on the dark canvas, not on white.
  ["tokens/contrast", (j) => { j.component.button["label-secondary-inverse-default"].value = "{color.text-brand}"; }, "on color.bg-surface-inverse"],
  // A tint with a bg-opacity-* companion is blended over the canvas, so a heavier tint can fail.
  ["tokens/contrast", (j) => { j.component.button["bg-opacity-tertiary-inverse-default"].value = "{opacity.90}"; }, "at 90% over color.bg-surface-inverse"],
  // Titles and subtitles are text foregrounds too, paired with the bar fill of the same suffix.
  ["tokens/contrast", (j) => { j.component["top-app-bar"]["title-inverse"].value = "{color.text-primary}"; }, "top-app-bar.title-inverse"],
  ["tokens/description-required", (j) => { delete j.semantic.color.bg.description; }, "has no description"],
  ["tokens/description-required", (j) => { delete j.primitives.color.red["500"].description; }, "describe-primitives"],
  ["tokens/description-style", (j) => { j.semantic.color.bg.description = "The page's white background canvas."; }, "apostrophe"],
  ["tokens/description-style", (j) => { j.semantic.color.bg.description = "Page background"; }, "full stop"],
  ["tokens/description-style", (j) => { j.semantic.color.bg.description = "Page background."; }, "too short"],
  ["tokens/primitive-descriptions", (j) => { j.primitives.color.red["500"].description = "Red, step 500."; }, "stale"],
  ["tokens/primitive-descriptions", (j) => { j.component.radio["dot-size-md"].value = "{space.xs}"; }, "spacing.10 description is stale"],
  // A primitive that gains a consumer must lose its "Not referenced" note.
  ["tokens/primitive-descriptions", (j) => { j.component.button["gap-xs"].value = "{fontSize.9}"; }, "fontSize.9 has a description the generator would drop"],
];

describe("each token rule catches the convention it guards", () => {
  for (const [rule, mutate, expected, opts = {}] of cases) {
    it(`${rule}: ${expected}`, async () => {
      const tokens = opts.text ? opts.text() : mutate;
      const diagnostics = await lint(fixture({ tokens }), rule);
      const hits = ofRule(diagnostics, rule);
      assert.ok(hits.length > 0, `${rule} reported nothing`);
      assert.ok(
        hits.some((d) => d.message.includes(expected)),
        `no ${rule} message mentions ${JSON.stringify(expected)}:\n${hits.map((d) => d.message).join("\n")}`,
      );
      for (const d of hits.filter((h) => h.rule !== "tokens/json-syntax")) {
        assert.equal(d.file, "tokens/tokens.json");
        assert.ok(d.line > 0, `${rule} diagnostic has no line: ${d.message}`);
      }
    });
  }
});

describe("component tokens may reach a primitive the semantic tier does not alias", () => {
  it("accepts radio/dot-size-md → spacing.10 and button/border-width → borderWidth.1", async () => {
    const diagnostics = await lint(fixture(), "tokens/tier-reference");
    assert.deepEqual(diagnostics, []);
    assert.equal(realTokens().component.radio["dot-size-md"].value, "{spacing.10}");
  });
});

describe("--fix", () => {
  it("restores canonical formatting and regenerated primitive descriptions", async () => {
    const json = realTokens();
    json.primitives.color.red["500"].description = "Stale.";
    const root = fixture({ tokens: JSON.stringify(json, null, 4) });
    await lint(root, ["tokens/primitive-descriptions", "tokens/format"], { fix: true });
    const after = readFileSync(join(root, "tokens/tokens.json"), "utf8");
    assert.equal(after, `${JSON.stringify(realTokens(), null, 2)}\n`);
  });

  it("does not auto-format over duplicate keys", async () => {
    const text = '{\n    "primitives": {}, "primitives": {}\n}\n';
    const root = fixture({ tokens: text });
    await lint(root, "tokens/format", { fix: true });
    assert.equal(readFileSync(join(root, "tokens/tokens.json"), "utf8"), text);
  });
});

describe("emittedPaths", () => {
  it("expands an aliased shadow into its target's layers on native, as the build does", () => {
    const model = buildTokenModel(realTokens());
    const card = model.byId.get("shadow.card");
    const alias = { path: ["demo", "thumb-shadow"], type: "boxShadow", value: "{shadow.card}" };
    assert.equal(emittedPaths(alias, "web", model).length, 1);
    assert.equal(emittedPaths(alias, "native", model).length, emittedPaths(card, "native", model).length);
    assert.equal(emittedPaths(alias, "native", model).length, 8);
  });
});
