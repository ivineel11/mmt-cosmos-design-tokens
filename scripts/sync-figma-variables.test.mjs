// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { flattenTokens, plan, makeCodeSyntax, loadDistNames, scopesFor, desiredValue } from "./sync-figma-variables.mjs";

const tokens = flattenTokens(JSON.parse(readFileSync(new URL("../tokens/tokens.json", import.meta.url), "utf8")));
const codeSyntaxFor = makeCodeSyntax(loadDistNames());
const empty = { variableCollections: {}, variables: {} };

/** Apply a POST body to a GET-shaped `meta`, the way Figma would, resolving temporary ids. */
function applyBody(meta, body) {
  const next = structuredClone(meta);
  const real = new Map();
  let n = 0;
  const resolve = (id) => real.get(id) ?? id;
  for (const c of body.variableCollections ?? []) {
    const id = `VariableCollectionId:${++n}`;
    const modeId = `${n}:0`;
    real.set(c.id, id).set(c.initialModeId, modeId);
    next.variableCollections[id] = { id, name: c.name, defaultModeId: modeId, modes: [{ modeId, name: "Mode 1" }], remote: false };
  }
  for (const v of body.variables ?? []) {
    if (v.action === "CREATE") {
      const id = `VariableID:${++n}`;
      real.set(v.id, id);
      next.variables[id] = { ...v, id, variableCollectionId: resolve(v.variableCollectionId), valuesByMode: {}, remote: false };
      delete next.variables[id].action;
    } else {
      const { action, id, ...fields } = v;
      Object.assign(next.variables[id], fields);
    }
  }
  for (const { variableId, modeId, value } of body.variableModeValues ?? []) {
    const v = value.type === "VARIABLE_ALIAS" ? { ...value, id: resolve(value.id) } : value;
    next.variables[resolve(variableId)].valuesByMode[resolve(modeId)] = v;
  }
  return next;
}

const synced = applyBody(empty, plan(tokens, empty, codeSyntaxFor).body);
const byName = (meta, name) => Object.values(meta.variables).find((v) => v.name === name);

test("an empty file gets every non-typography token, with no errors", () => {
  const { body, report } = plan(tokens, empty, codeSyntaxFor);
  assert.deepEqual(report.errors, []);
  assert.equal(body.variableCollections.length, 3);
  assert.equal(report.create.length, tokens.filter((t) => t.type !== "typography").length);
  assert.equal(report.skipped.length, 36);
});

test("a second run against the synced file changes nothing", () => {
  const { changes, body } = plan(tokens, synced, codeSyntaxFor);
  assert.equal(changes, 0);
  assert.deepEqual(body, {});
});

test("aliases point at the tier below, and opacity lands as a percentage", () => {
  const scrim = byName(synced, "opacity/scrim");
  const target = synced.variables[Object.values(scrim.valuesByMode)[0].id];
  assert.equal(target.name, "opacityScale/32");
  assert.equal(Object.values(target.valuesByMode)[0], 32);
  assert.deepEqual(desiredValue({ name: "x", type: "color", value: "#FFFFFF00" }), { r: 1, g: 1, b: 1, a: 0 });
});

test("code syntax matches the generated names on all three platforms", () => {
  assert.deepEqual(byName(synced, "spacing/-12").codeSyntax, {
    WEB: "var(--spacing-minus12)",
    ANDROID: "CosmosTokens.spacingMinus12",
    iOS: "CosmosTokens.spacingMinus12",
  });
  assert.equal(byName(synced, "radio/border-width").codeSyntax.WEB, "var(--radio-border-width)");
  for (const v of Object.values(synced.variables)) assert.equal(Object.keys(v.codeSyntax).length, 3, v.name);
});

test("scopes follow the conventions already in the file", () => {
  const scope = (name) => byName(synced, name).scopes;
  assert.deepEqual(scope("color/brand/700"), []);
  assert.deepEqual(scope("color/bg-fill-brand"), ["FRAME_FILL", "SHAPE_FILL"]);
  assert.deepEqual(scope("color/text-primary"), ["TEXT_FILL"]);
  assert.deepEqual(scope("button/min-height-md"), ["WIDTH_HEIGHT"]);
  assert.deepEqual(scope("radio/dot-selected-default"), ["SHAPE_FILL"]);
  assert.deepEqual(scopesFor({ set: "semantic", name: "color/exp-red-50", type: "color" }), ["ALL_FILLS", "STROKE_COLOR"]);
});

test("edits in JSON become updates; Figma-only variables are reported, never deleted", () => {
  const drifted = structuredClone(synced);
  const brand = byName(drifted, "color/brand/700");
  brand.valuesByMode[Object.keys(brand.valuesByMode)[0]] = { r: 0, g: 0, b: 0, a: 1 };
  byName(drifted, "color/text-primary").description = "old text";
  byName(drifted, "radio/radius").codeSyntax = {};
  const extra = { ...byName(drifted, "color/bg"), id: "VariableID:extra", name: "input/height" };
  drifted.variables[extra.id] = extra;
  delete drifted.variables[byName(drifted, "color/bg-secondary").id];

  const { report, body } = plan(tokens, drifted, codeSyntaxFor);
  assert.deepEqual(report.value, ["color/brand/700: #000000 → #0067E8"]);
  assert.deepEqual(report.description, ["color/text-primary"]);
  assert.deepEqual(report.codeSyntax, ["radio/radius"]);
  assert.deepEqual(report.create, ["semantic · color/bg-secondary = {color/neutral/100}"]);
  assert.deepEqual(report.figmaOnly, ["semantic · input/height"]);
  assert.ok(body.variables.every((v) => v.action !== "DELETE"));
});

test("an HTML-escaped apostrophe in Figma does not count as a change", () => {
  const withApostrophe = tokens.find((t) => t.set !== "primitives" && t.description.includes("'"));
  if (!withApostrophe) return;
  const escaped = structuredClone(synced);
  const v = byName(escaped, withApostrophe.name);
  v.description = v.description.replaceAll("'", "&#39;");
  assert.equal(plan(tokens, escaped, codeSyntaxFor).report.description.length, 0);
});
