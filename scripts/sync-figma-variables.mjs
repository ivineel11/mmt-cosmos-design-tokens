/**
 * Sync tokens/tokens.json into the Figma variables panel through the Variables REST API.
 *
 *   node scripts/sync-figma-variables.mjs            # dry run: print the plan, change nothing
 *   node scripts/sync-figma-variables.mjs --apply    # send the plan to Figma
 *
 * Env: FIGMA_TOKEN (personal access token with file_variables:read + file_variables:write;
 * the API is Enterprise-only) and FIGMA_FILE_KEY (defaults to the Cosmos library file).
 *
 * What it does, per token in the primitives / semantic / component sets:
 *   - creates the variable if its collection has no variable of that name
 *   - updates the value, description and code syntax when they differ
 * What it never does:
 *   - delete or rename. Variables that exist only in Figma are listed and left alone.
 *   - touch the scopes of an existing variable. Scopes are set once, on create.
 *   - sync typography. Composite typography tokens are Figma text styles, which the
 *     REST API cannot write.
 *
 * Conventions it mirrors from the file: the JSON path joined with `/` is the variable
 * name, each set is a collection of the same name with one mode, semantic variables alias
 * primitives and component variables alias semantic ones. Opacity is held as a percentage
 * in Figma (`32`) and as a decimal in JSON (`0.32`).
 *
 * Everything goes in one POST, which Figma applies atomically: any validation error
 * rejects the whole request and the file is left untouched.
 */
import { readFileSync, appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const ROOT = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, ROOT), "utf8");
const DEFAULT_FILE_KEY = "byPBTSedTYOO0AYwmIlncH";
const SETS = ["primitives", "semantic", "component"];

// --- Tokens -------------------------------------------------------------------

const isToken = (node) => node && typeof node === "object" && "value" in node && "type" in node;

/** Flatten the three sets into [{ set, name, type, value, description }]. */
export function flattenTokens(json) {
  const out = [];
  const walk = (node, path, set) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) continue;
      if (isToken(child)) {
        out.push({
          set,
          name: [...path, key].join("/"),
          type: child.type,
          value: child.value,
          description: child.description ?? "",
        });
      } else if (child && typeof child === "object") {
        walk(child, [...path, key], set);
      }
    }
  };
  for (const set of SETS) walk(json[set] ?? {}, [], set);
  return out;
}

const figmaType = (type) =>
  type === "color" ? "COLOR" : type === "fontFamilies" ? "STRING" : "FLOAT";

const ALIAS = /^\{([^{}]+)\}$/;

/** Desired Figma value for a token: { alias: "color/brand/700" } or a literal. */
export function desiredValue(token) {
  const raw = token.value;
  if (typeof raw === "string") {
    const ref = raw.match(ALIAS);
    if (ref) return { alias: ref[1].replaceAll(".", "/") };
    if (raw.includes("{")) throw new Error(`${token.name}: references inside a value are not supported`);
  }
  switch (figmaType(token.type)) {
    case "COLOR":
      return hexToRgba(raw);
    case "STRING":
      return String(raw);
    default: {
      const n = typeof raw === "number" ? raw : parseFloat(String(raw).replace(/px$/, ""));
      if (!Number.isFinite(n)) throw new Error(`${token.name}: cannot read "${raw}" as a number`);
      // Figma holds opacity as a percentage; JSON holds the 0–1 decimal.
      return token.type === "opacity" ? round(n * 100) : n;
    }
  }
}

const round = (n) => Math.round(n * 10000) / 10000;

function hexToRgba(hex) {
  const m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(hex);
  if (!m) throw new Error(`Unsupported colour "${hex}" (expected #RRGGBB or #RRGGBBAA)`);
  const n = (i) => parseInt(m[1].slice(i, i + 2), 16) / 255;
  return { r: n(0), g: n(2), b: n(4), a: m[2] ? parseInt(m[2], 16) / 255 : 1 };
}

const toHex = ({ r, g, b, a = 1 }) =>
  "#" +
  [r, g, b, ...(a < 1 ? [a] : [])]
    .map((c) => Math.round(c * 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

// --- Code syntax ----------------------------------------------------------------

/** Style Dictionary's kebab name for a token path, including the minus rename. */
const kebab = (name) =>
  name
    .split("/")
    .map((part) => part.replace(/^-(\d)/, "minus$1").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())
    .join("-");
const camel = (k) => k.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

/**
 * Code syntax for each platform, derived the same way the build names things and kept
 * only where the name really exists in dist/, so Figma never points at a missing symbol.
 */
export function makeCodeSyntax(dist) {
  return (name) => {
    const k = kebab(name);
    const c = camel(k);
    const out = {};
    if (dist.css.has(k)) out.WEB = `var(--${k})`;
    if (dist.kotlin.has(c)) out.ANDROID = `CosmosTokens.${c}`;
    if (dist.swift.has(c)) out.iOS = `CosmosTokens.${c}`;
    return out;
  };
}

export function loadDistNames() {
  const grab = (text, re) => new Set([...text.matchAll(re)].map((m) => m[1]));
  return {
    css: grab(read("dist/web/tokens.css"), /^\s*--([a-z0-9-]+):/gm),
    kotlin: grab(read("dist/android/CosmosTokens.kt"), /\bval ([A-Za-z0-9]+)\b/g),
    swift: grab(read("dist/ios/CosmosTokens.swift"), /\bstatic let ([A-Za-z0-9]+)\b/g),
  };
}

// --- Scopes (new variables only) ----------------------------------------------------

const FLOAT_SCOPES = {
  spacing: ["GAP"],
  sizing: ["WIDTH_HEIGHT"],
  borderRadius: ["CORNER_RADIUS"],
  borderWidth: ["STROKE_FLOAT"],
  opacity: ["OPACITY"],
  fontSizes: ["FONT_SIZE"],
  lineHeights: ["LINE_HEIGHT"],
  fontWeights: ["FONT_WEIGHT"],
  fontFamilies: ["FONT_FAMILY"],
};

// First match on the last path segment wins. Mirrors the scopes already in the file.
const COLOR_SCOPES = [
  [/^exp-/, ["ALL_FILLS", "STROKE_COLOR"]],
  [/^transparent$/, ["FRAME_FILL", "SHAPE_FILL", "STROKE_COLOR"]],
  [/^(bg|state-layer|container)\b/, ["FRAME_FILL", "SHAPE_FILL"]],
  [/^(text|label|description|value|placeholder|prefix|supporting)\b/, ["TEXT_FILL"]],
  [/^(border|focus-ring|indicator)\b/, ["STROKE_COLOR"]],
  [/^icon\b/, ["SHAPE_FILL", "STROKE_COLOR"]],
  [/^(dot|caret)\b/, ["SHAPE_FILL"]],
];

/** Primitives stay out of every picker, so designers reach for semantic roles. */
export function scopesFor(token) {
  if (token.set === "primitives") return [];
  if (figmaType(token.type) !== "COLOR") return FLOAT_SCOPES[token.type] ?? ["ALL_SCOPES"];
  const leaf = token.name.split("/").pop();
  return COLOR_SCOPES.find(([re]) => re.test(leaf))?.[1] ?? ["ALL_FILLS", "STROKE_COLOR"];
}

// --- Plan -----------------------------------------------------------------------

// Figma's description setter HTML-escapes some characters. Compare on the decoded text,
// or a description with an apostrophe would show as changed on every run.
const decode = (s = "") =>
  s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/**
 * Compare the tokens with the file and return the request body plus a readable report.
 * `meta` is the `meta` object of GET /v1/files/:key/variables/local.
 */
export function plan(tokens, meta, codeSyntaxFor) {
  const body = { variableCollections: [], variables: [], variableModeValues: [] };
  const report = { create: [], value: [], description: [], codeSyntax: [], figmaOnly: [], skipped: [], errors: [], apostrophes: [] };

  const collections = Object.values(meta.variableCollections ?? {}).filter((c) => !c.remote);
  const variables = Object.values(meta.variables ?? {}).filter((v) => !v.remote && !v.deletedButReferenced);

  // One collection per set, created if the file does not have it yet.
  const coll = {};
  for (const set of SETS) {
    const found = collections.find((c) => c.name === set);
    if (found) {
      coll[set] = { id: found.id, modeId: found.defaultModeId };
    } else {
      coll[set] = { id: `tmp-collection-${set}`, modeId: `tmp-mode-${set}` };
      body.variableCollections.push({ action: "CREATE", id: coll[set].id, name: set, initialModeId: coll[set].modeId });
    }
  }
  const setOfCollection = Object.fromEntries(SETS.map((s) => [coll[s].id, s]));

  const existing = new Map(); // "set::name" -> variable
  const nameById = new Map();
  for (const v of variables) {
    nameById.set(v.id, v.name);
    const set = setOfCollection[v.variableCollectionId];
    if (set) existing.set(`${set}::${v.name}`, v);
  }

  const syncable = tokens.filter((t) => {
    if (t.type === "typography") {
      report.skipped.push(t.name);
      return false;
    }
    return true;
  });

  // Where each token lives in Figma: the real id, or a temporary id for this request.
  const idOf = new Map();
  const setOfName = new Map();
  for (const t of syncable) {
    setOfName.set(t.name, t.set);
    const v = existing.get(`${t.set}::${t.name}`);
    idOf.set(t.name, v ? v.id : `tmp-${t.set}-${t.name}`);
  }

  for (const t of syncable) {
    const key = `${t.set}::${t.name}`;
    const current = existing.get(key);
    const type = figmaType(t.type);
    const { modeId } = coll[t.set];
    if (t.description.includes("'")) report.apostrophes.push(t.name);

    let want;
    try {
      want = desiredValue(t);
      if (want.alias && !idOf.has(want.alias)) throw new Error(`${t.name}: alias target {${want.alias}} is not a token`);
      if (want.alias && SETS.indexOf(setOfName.get(want.alias)) > SETS.indexOf(t.set)) {
        throw new Error(`${t.name}: aliases ${want.alias}, which sits in a higher tier`);
      }
    } catch (err) {
      report.errors.push(err.message);
      continue;
    }
    const value = want.alias ? { type: "VARIABLE_ALIAS", id: idOf.get(want.alias) } : want;
    const shown = want.alias ? `{${want.alias}}` : type === "COLOR" ? toHex(want) : String(want);
    const codeSyntax = codeSyntaxFor(t.name);

    if (!current) {
      body.variables.push({
        action: "CREATE",
        id: idOf.get(t.name),
        name: t.name,
        variableCollectionId: coll[t.set].id,
        resolvedType: type,
        description: t.description,
        scopes: scopesFor(t),
        ...(Object.keys(codeSyntax).length && { codeSyntax }),
      });
      body.variableModeValues.push({ variableId: idOf.get(t.name), modeId, value });
      report.create.push(`${t.set} · ${t.name} = ${shown}`);
      continue;
    }

    if (current.resolvedType !== type) {
      report.errors.push(`${t.name}: is ${current.resolvedType} in Figma but ${type} in JSON; Figma cannot change a variable type`);
      continue;
    }

    const update = { action: "UPDATE", id: current.id };
    const have = current.valuesByMode?.[modeId];
    const was = describeFigmaValue(have, type, nameById);
    if (was !== shown) {
      body.variableModeValues.push({ variableId: current.id, modeId, value });
      report.value.push(`${t.name}: ${was} → ${shown}`);
    }
    if (decode(current.description).trim() !== t.description.trim()) {
      update.description = t.description;
      report.description.push(t.name);
    }
    const cs = current.codeSyntax ?? {};
    if (Object.entries(codeSyntax).some(([platform, s]) => cs[platform] !== s)) {
      update.codeSyntax = codeSyntax;
      report.codeSyntax.push(t.name);
    }
    if (Object.keys(update).length > 2) body.variables.push(update);
  }

  const wanted = new Set(syncable.map((t) => `${t.set}::${t.name}`));
  for (const [key] of existing) if (!wanted.has(key)) report.figmaOnly.push(key.replace("::", " · "));

  for (const k of Object.keys(body)) if (!body[k].length) delete body[k];
  const changes =
    report.create.length + report.value.length + new Set([...report.description, ...report.codeSyntax]).size;
  return { body, report, changes };
}

/** Render a Figma value the same way `plan` renders a desired one, so they compare as strings. */
function describeFigmaValue(v, type, nameById) {
  if (v == null) return "(empty)";
  if (v.type === "VARIABLE_ALIAS") return `{${nameById.get(v.id) ?? v.id}}`;
  if (type === "COLOR") return toHex(v);
  if (type === "FLOAT") return String(round(v));
  return String(v);
}

// --- Report -----------------------------------------------------------------------

export function formatReport({ report, changes }, { applied, fileKey }) {
  const lines = [];
  const section = (title, items, limit = 50) => {
    if (!items.length) return;
    lines.push(`\n### ${title} (${items.length})\n`);
    for (const item of items.slice(0, limit)) lines.push(`- ${item}`);
    if (items.length > limit) lines.push(`- …and ${items.length - limit} more`);
  };
  lines.push(`## Figma variable sync: ${applied ? "applied" : "dry run"}\n`);
  lines.push(`File \`${fileKey}\`. ${changes === 0 ? "Figma already matches tokens.json." : `${changes} variable(s) to change.`}`);
  section("Errors: nothing was sent", report.errors);
  section("New variables", report.create);
  section("Value changes", report.value);
  section("Description changes", report.description, 25);
  section("Code syntax changes", report.codeSyntax, 25);
  section("Only in Figma: left alone, delete by hand if they are obsolete", report.figmaOnly, 100);
  section("Descriptions with an apostrophe (Figma may store it as &#39;)", report.apostrophes, 25);
  if (report.skipped.length) {
    lines.push(`\n_${report.skipped.length} typography tokens skipped: they are Figma text styles, which the REST API cannot edit._`);
  }
  return lines.join("\n");
}

// --- Figma API ----------------------------------------------------------------------

async function figma(path, token, init = {}) {
  const res = await fetch(`https://api.figma.com${path}`, {
    ...init,
    headers: { "X-Figma-Token": token, "Content-Type": "application/json", ...init.headers },
  });
  const text = await res.text();
  if (!res.ok) {
    const hint = res.status === 403 ? " Check the token has file_variables scopes and an Enterprise Editor seat." : "";
    throw new Error(`Figma API ${init.method ?? "GET"} ${path} failed: ${res.status} ${text.slice(0, 500)}${hint}`);
  }
  return JSON.parse(text);
}

// --- CLI ----------------------------------------------------------------------------

export async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const maxIndex = args.indexOf("--max-changes");
  const maxChanges = maxIndex >= 0 ? Number(args[maxIndex + 1]) : Infinity;
  const token = process.env.FIGMA_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY;
  if (!token) throw new Error("Set FIGMA_TOKEN to a Figma personal access token.");

  const tokens = flattenTokens(JSON.parse(read("tokens/tokens.json")));
  const { meta } = await figma(`/v1/files/${fileKey}/variables/local`, token);
  const result = plan(tokens, meta, makeCodeSyntax(loadDistNames()));

  const blocked = result.report.errors.length > 0;
  const tooMany = result.changes > maxChanges;
  const send = apply && !blocked && !tooMany && result.changes > 0;
  if (send) {
    await figma(`/v1/files/${fileKey}/variables`, token, { method: "POST", body: JSON.stringify(result.body) });
  }

  let summary = formatReport(result, { applied: send, fileKey });
  if (apply && tooMany) {
    summary += `\n\n**Not applied:** ${result.changes} changes exceeds the limit of ${maxChanges}. Run the workflow by hand to apply a large sync.`;
  }
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  if (blocked || (apply && tooMany)) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
