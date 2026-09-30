/**
 * Rules for the Markdown that documents the tokens: README.md, components/*.md,
 * proposals/ and the docs-site notes. The README restates hundreds of facts from
 * tokens.json (values, aliases, counts), and those drift every time the tokens change;
 * these rules make the drift a lint error instead of a review comment.
 */
import { dirname, join, normalize } from "node:path";
import { HEX } from "../../lib/color.mjs";
import { inlineCode, links, parseMarkdown } from "../lib/markdown.mjs";
import { aliasTarget, isLeaf, isPlainObject } from "../lib/tokens.mjs";
import { cssName, emittedPaths } from "./tokens.mjs";

const VENDORED = /^(\.claude|\.cursor|\.agents|references)\//;
const FILE_EXT = /\.(md|json|mjs|js|ts|tsx|css|swift|kt|yml|yaml)$/;
// `CosmosTokens.swift` and `tokens.ts` are file names, not members.
const isFileName = (name) => FILE_EXT.test(name);

const markdownFiles = (api) => api.files().filter((f) => f.endsWith(".md") && !VENDORED.test(f));

const docCache = new WeakMap();
function doc(api, file) {
  if (!docCache.has(api.files)) docCache.set(api.files, new Map());
  const cache = docCache.get(api.files);
  if (!cache.has(file)) cache.set(file, parseMarkdown(api.read(file) ?? ""));
  return cache.get(file);
}

/** Lookup tables that map every way the docs name a token back to the token. */
function tokenIndex(api) {
  const t = api.tokens();
  if (t.error) return null;
  const { model } = t;
  const cssToLeaf = new Map();
  for (const leaf of model.leaves) {
    for (const parts of emittedPaths(leaf, "web", model)) {
      if (parts.length === leaf.path.length) cssToLeaf.set(cssName(parts), leaf);
    }
  }
  const componentGroups = new Set(Object.keys(t.value.component ?? {}));
  const cssVars = api.distCssVars() ?? new Set([...model.leaves.flatMap((l) => emittedPaths(l, "web", model).map(cssName))]);
  const cssPrefixes = new Set([...cssVars].map((v) => v.slice(2).split("-")[0]));

  /** Resolve a doc spelling (`color.bg`, `bg`, `button/bg-x`, `--space-md`, `{x}`) to a leaf. */
  const find = (raw) => {
    const code = raw.replace(/^\{(.+)\}$/, "$1").replace(/^var\((--[\w-]+)\)$/, "$1");
    if (model.byId.has(code)) return model.byId.get(code);
    const comp = /^(\w+)\/([\w-]+)$/.exec(code);
    if (comp && componentGroups.has(comp[1])) return model.byId.get(`${comp[1]}.${comp[2]}`) ?? null;
    if (code.startsWith("--")) return cssToLeaf.get(code) ?? null;
    return model.byId.get(`color.${code}`) ?? null;
  };

  return { t, model, componentGroups, cssVars, cssPrefixes, find, platformNames: api.platformNames() };
}

// ------------------------------------------------------------------ links ---

const brokenLink = {
  id: "docs/broken-link",
  description: "Relative links and #anchors in the repository's Markdown point at files and headings that exist.",
  check(api) {
    const files = new Set(api.files());
    for (const file of markdownFiles(api)) {
      for (const link of links(doc(api, file))) {
        const { target } = link;
        if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) continue;
        const [pathPart, anchor] = target.split("#");
        const resolved = pathPart ? normalize(join(dirname(file), decodeURIComponent(pathPart))).split("\\").join("/") : file;
        const report = (message) => api.report({ file, line: link.line, column: link.column, subject: target, message });
        const isDir = [...files].some((f) => f.startsWith(`${resolved.replace(/\/$/, "")}/`));
        if (pathPart && !files.has(resolved) && !isDir) {
          report(`Link target ${pathPart} does not exist.`);
          continue;
        }
        if (anchor && resolved.endsWith(".md") && files.has(resolved) && !doc(api, resolved).slugs.has(anchor.toLowerCase())) {
          report(`${pathPart ? `${resolved} has` : "There is"} no heading for #${anchor}.`);
        }
      }
    }
  },
};

// ---------------------------------------------------------- unknown tokens ---

function classify(code, idx) {
  if (/[*…\s]|\.\.\./.test(code)) return null;
  const ref = /^\{([^{}]+)\}$/.exec(code);
  if (ref) {
    return idx.model.topGroups.has(ref[1].split(".")[0]) ? { name: code, ok: idx.model.byId.has(ref[1]) } : null;
  }
  const dotted = /^([A-Za-z]+)\.([\w.-]+)$/.exec(code);
  if (dotted && idx.model.topGroups.has(dotted[1])) {
    if (idx.model.exists(code)) return { name: code, ok: true };
    // The docs cite the build's renamed output key (spacing.minus8) next to the authored one.
    if (idx.model.exists(code.replace(/\.minus(\d+)/, ".-$1"))) return { name: code, ok: true };
    if (FILE_EXT.test(code)) return null;
    return { name: code, ok: false };
  }
  const comp = /^(\w+)\/([\w-]+)$/.exec(code);
  if (comp && idx.componentGroups.has(comp[1])) return { name: code, ok: idx.model.byId.has(`${comp[1]}.${comp[2]}`) };
  const css = /^(?:var\()?(--[\w-]+)\)?$/.exec(code);
  if (css && idx.cssPrefixes.has(css[1].slice(2).split("-")[0])) return { name: css[1], ok: idx.cssVars.has(css[1]) };
  const platform = /^CosmosTokens\.(\w+)$/.exec(code);
  if (platform && idx.platformNames && !isFileName(code)) return { name: code, ok: idx.platformNames.has(platform[1]) };
  return null;
}

const unknownToken = {
  id: "docs/unknown-token",
  description: "Every token the docs name in code — color.text-primary, button/bg-primary-default, {color.brand.700}, --space-md, CosmosTokens.colorBgFillBrand, tokens.colorBgFillBrand — exists, so a rename or removal cannot leave dead references behind.",
  check(api) {
    const idx = tokenIndex(api);
    if (!idx) return;
    for (const file of markdownFiles(api)) {
      const d = doc(api, file);
      for (const line of d.lines) {
        const report = (name, column) =>
          api.report({ file, line: line.n, column, subject: name, message: `${name} is not a token${name.startsWith("--") ? " in dist/web/tokens.css" : ""}. Was it renamed or removed?` });
        if (!line.inFence) {
          for (const { code, column } of inlineCode(line.text)) {
            const hit = classify(code, idx);
            if (hit && !hit.ok) report(hit.name, column);
          }
          continue;
        }
        if (line.fenceOpen) continue;
        for (const m of line.text.matchAll(/var\((--[\w-]+)\)/g)) {
          const hit = classify(m[1], idx);
          if (hit && !hit.ok) report(hit.name, m.index + 1);
        }
        for (const m of line.text.matchAll(/\bCosmosTokens\.(\w+)/g)) {
          if (idx.platformNames && !idx.platformNames.has(m[1]) && !isFileName(m[0])) report(m[0], m.index + 1);
        }
        if (/^(ts|js|tsx|jsx|typescript|javascript)$/.test(line.lang ?? "")) {
          for (const m of line.text.matchAll(/\btokens\.(\w+)/g)) {
            if (idx.platformNames && !idx.platformNames.has(m[1]) && !isFileName(m[0])) report(m[0], m.index + 1);
          }
        }
        if (line.lang === "json") {
          for (const m of line.text.matchAll(/"(\{[\w.-]+\})"/g)) {
            const hit = classify(m[1], idx);
            if (hit && !hit.ok) report(hit.name, m.index + 1);
          }
        }
      }
    }
  },
};

// ------------------------------------------------------------- token facts ---

const firstCode = (cell) => inlineCode(cell)[0]?.code ?? null;
const cellText = (cell) => cell.replace(/`/g, "").trim();

/** Does a documented literal agree with a resolved token value? */
function sameValue(documented, actual) {
  const d = documented.split(/\s+\(/)[0].trim();
  if (typeof actual === "number" || /^-?\d+(\.\d+)?$/.test(String(actual))) {
    return /^-?\d+(\.\d+)?$/.test(d) ? Number(d) === Number(actual) : null;
  }
  if (typeof actual !== "string") return null;
  if (HEX.test(actual)) return HEX.test(d) ? d.toUpperCase() === actual.toUpperCase() : null;
  if (/^-?\d+(\.\d+)?px$/.test(actual)) return /^-?\d+(\.\d+)?px$/.test(d) ? d === actual : null;
  return /^[\w -]+$/.test(d) ? d === actual : null;
}

const ALIAS_HEADER = /^(primitive|primitive reference\(s\)|alias|aliases)$/i;
const VALUE_HEADER = /^(value|resolves to|meaning)$/i;

const tokenFacts = {
  id: "docs/token-facts",
  description: "Values, aliases and palette hexes that the Markdown tables and lists restate from tokens.json still match it.",
  check(api) {
    const idx = tokenIndex(api);
    if (!idx) return;
    const { model, t } = idx;
    const palettes = t.value.primitives?.color ?? {};

    for (const file of markdownFiles(api)) {
      const d = doc(api, file);
      for (const table of d.tables) {
        const headers = table.headers.map((h) => cellText(h).toLowerCase());

        // Palette grid: | Step | Neutral | Brand | … |
        if (headers[0] === "step" && headers.slice(1).every((h) => h in palettes)) {
          for (const row of table.rows) {
            const step = cellText(row.cells[0]);
            row.cells.slice(1).forEach((cell, i) => {
              const family = headers[i + 1];
              const leaf = model.byId.get(`color.${family}.${step}`);
              const text = cellText(cell);
              const report = (message) => api.report({ file, line: row.line, column: 1, subject: `color.${family}.${step}`, message });
              if (/^[—–-]$/.test(text)) {
                if (leaf) report(`The palette table marks color.${family}.${step} as absent, but it exists (${leaf.value}).`);
              } else if (!leaf) report(`The palette table lists color.${family}.${step} (${text}), which does not exist.`);
              else if (HEX.test(text) && text.toUpperCase() !== String(leaf.value).toUpperCase()) {
                report(`The palette table says color.${family}.${step} is ${text}; tokens.json has ${leaf.value}.`);
              }
            });
          }
          continue;
        }

        // Typography scale: | Category | Size | Font size | Line height | … |
        const [ci, si, fi, li] = ["category", "size", "font size", "line height"].map((h) => headers.indexOf(h));
        if (ci >= 0 && si >= 0 && fi >= 0 && li >= 0) {
          for (const row of table.rows) {
            const group = model.source.semantic?.[cellText(row.cells[ci])]?.[cellText(row.cells[si])];
            if (!isPlainObject(group)) continue;
            for (const [weight, node] of Object.entries(group)) {
              if (!isLeaf(node)) continue;
              const r = model.resolve(`${cellText(row.cells[ci])}.${cellText(row.cells[si])}.${weight}`).value ?? {};
              for (const [col, member] of [[fi, "fontSize"], [li, "lineHeight"]]) {
                if (sameValue(cellText(row.cells[col]), r[member]) === false) {
                  api.report({ file, line: row.line, column: 1, subject: `${cellText(row.cells[ci])}.${cellText(row.cells[si])}`, message: `The table gives ${cellText(row.cells[ci])} ${cellText(row.cells[si])} a ${member} of ${cellText(row.cells[col])}; tokens.json has ${r[member]}.` });
                }
              }
              break;
            }
          }
          continue;
        }

        // Token rows: first cell names a token; other cells restate its alias or value.
        for (const row of table.rows) {
          const subjectCode = firstCode(row.cells[0] ?? "");
          if (!subjectCode) continue;

          // | `button/*` | 120 | … — a count of the group's tokens.
          const star = /^(\w+)\/\*$/.exec(subjectCode);
          const countCol = headers.indexOf("tokens");
          if (star && idx.componentGroups.has(star[1]) && countCol > 0) {
            const documented = Number(cellText(row.cells[countCol] ?? ""));
            const actual = Object.values(t.value.component[star[1]]).filter(isLeaf).length;
            if (Number.isFinite(documented) && documented !== actual) {
              api.report({ file, line: row.line, column: 1, subject: subjectCode, message: `Says ${subjectCode} has ${documented} tokens; tokens.json has ${actual}.` });
            }
            continue;
          }

          const leaf = idx.find(subjectCode);
          if (!leaf) continue;
          headers.forEach((header, col) => {
            if (col === 0 || row.cells[col] === undefined) return;
            const cell = row.cells[col];
            const report = (message) => api.report({ file, line: row.line, column: 1, subject: leaf.id, message });
            if (ALIAS_HEADER.test(header)) {
              const code = firstCode(cell);
              if (!code || /[*…]/.test(code)) return;
              const documented = idx.find(code);
              const actual = aliasTarget(leaf.value);
              if (actual && documented && documented.id !== actual) {
                report(`Says ${subjectCode} aliases ${code}; tokens.json has {${actual}}.`);
              }
            } else if (VALUE_HEADER.test(header)) {
              const text = cellText(cell);
              const resolved = model.resolve(leaf.id).value;
              if (text && sameValue(text, resolved) === false) report(`Says ${subjectCode} is ${text}; it resolves to ${resolved}.`);
            }
          });
        }
      }

      // - `body.medium.regular` → fontFamily.lato · fontWeight.regular · 14px · 20px
      for (const line of d.lines) {
        if (line.inFence) continue;
        const m = /^\s*[-*]\s+`([\w.]+)`\s+→\s+(.+)$/.exec(line.text);
        const leaf = m && model.byId.get(m[1]);
        if (!leaf || leaf.type !== "typography") continue;
        const parts = m[2].split("·").map((p) => p.trim());
        const r = model.resolve(leaf.id).value ?? {};
        const expected = [
          aliasTarget(leaf.value.fontFamily),
          aliasTarget(leaf.value.fontWeight),
          r.fontSize,
          r.lineHeight,
        ];
        if (parts.join(" · ") !== expected.join(" · ")) {
          api.report({ file, line: line.n, column: 1, subject: leaf.id, message: `Documents ${leaf.id} as "${parts.join(" · ")}"; tokens.json gives "${expected.join(" · ")}".` });
        }
      }
    }
  },
};

// ------------------------------------------------------------ README counts ---

function counts(t) {
  const leavesIn = (node) => {
    let n = 0;
    const walk = (x) => {
      if (isLeaf(x)) n += 1;
      else if (isPlainObject(x)) Object.values(x).forEach(walk);
    };
    walk(node);
    return n;
  };
  const { model } = t;
  const byTier = (tier) => model.inTier(tier).length;
  const typographyIn = (tier) => model.inTier(tier).filter((l) => l.type === "typography").length;
  const colors = (tier) => model.inTier(tier).filter((l) => l.type === "color").length;
  const palettes = Object.keys(t.value.primitives?.color ?? {}).filter((p) => p !== "alpha");
  return {
    leavesIn,
    byTier,
    typographyIn,
    colors,
    palettes,
    paletteSteps: palettes.reduce((n, p) => n + leavesIn(t.value.primitives.color[p]), 0),
    total: model.leaves.length,
    emittedWeb: model.leaves.reduce((n, l) => n + emittedPaths(l, "web", model).length, 0),
    emittedNative: model.leaves.reduce((n, l) => n + emittedPaths(l, "native", model).length, 0),
    gradients: model.leaves.filter((l) => typeof l.value === "string" && /linear-gradient\(/.test(l.value)).length,
  };
}

const readmeCounts = {
  id: "docs/readme-counts",
  description: "The inventory numbers the README states — per-tier and per-group token counts, section heading counts, the totals line, palettes and the values emitted on web and on iOS and Android — match tokens.json.",
  check(api) {
    const t = api.tokens();
    if (t.error || !api.exists("README.md")) return;
    const file = "README.md";
    const d = doc(api, file);
    const c = counts(t);
    const sem = t.value.semantic ?? {};
    const comp = t.value.component ?? {};
    const report = (line, message, subject) => api.report({ file, line, column: 1, subject, message });
    const expect = (line, what, documented, actual) => {
      if (Number(documented) !== actual) report(line, `Says ${documented} ${what}; tokens.json has ${actual}.`, what);
    };

    // Headings: "### Primitive tokens (250)", "#### Font size — 18 tokens", "##### Text (21)".
    let tier = null;
    for (const [i, h] of d.headings.entries()) {
      const tierHeading = /^(Primitive|Semantic|Component) tokens \((\d+)\)$/.exec(h.text);
      if (tierHeading) {
        tier = { Primitive: "primitives", Semantic: "semantic", Component: "component" }[tierHeading[1]];
        expect(h.line, `${tier} tokens`, tierHeading[2], c.byTier(tier));
        continue;
      }
      if (h.level <= 3) tier = null;
      const group = /^(.+?) — (\d+) (?:composite )?tokens\b/.exec(h.text);
      if (group && tier) {
        const name = group[1].replace(/\s+/g, "").toLowerCase();
        const set = t.value[tier] ?? {};
        const key = Object.keys(set).find((k) => k.toLowerCase() === name);
        if (key) expect(h.line, `${tier}.${key} tokens`, group[2], c.leavesIn(set[key]));
        else if (name === "typography") expect(h.line, `${tier} typography tokens`, group[2], c.typographyIn(tier));
        const paletteNote = /\((\d+) palettes, (\d+) steps/.exec(h.text);
        if (paletteNote && key === "color" && tier === "primitives") {
          expect(h.line, "palettes", paletteNote[1], c.palettes.length);
          expect(h.line, "palette steps", paletteNote[2], c.paletteSteps);
        }
      }
      // "##### Text (21)" over a single table: the number counts its rows.
      const rowCount = /\((\d+)\)$/.exec(h.text);
      if (rowCount && !tierHeading) {
        const next = d.headings[i + 1]?.line ?? Infinity;
        const tables = d.tables.filter((tb) => tb.line > h.line && tb.line < next);
        if (tables.length === 1) expect(h.line, `rows in the "${h.text}" table`, rowCount[1], tables[0].rows.length);
      }
    }

    let sawTotals = false;
    for (const line of d.lines) {
      if (line.inFence) continue;
      const text = line.text;
      const totals = /\*\*Totals:\*\*\s*(\d+) primitive tokens · (\d+) semantic tokens \(([^)]*)\) · (\d+) component tokens \(([^)]*)\) · \*\*(\d+) values on web\*\* · \*\*(\d+) on iOS and Android\*\* · \*\*(\d+) gradients\*\*/.exec(text);
      if (text.includes("**Totals:**")) sawTotals = true;
      if (totals) {
        expect(line.n, "primitive tokens", totals[1], c.byTier("primitives"));
        expect(line.n, "semantic tokens", totals[2], c.byTier("semantic"));
        for (const m of totals[3].matchAll(/(\d+) (\w+)/g)) {
          const name = m[2] === "colors" ? "color" : m[2];
          if (name === "typography") expect(line.n, "semantic typography tokens", m[1], c.typographyIn("semantic"));
          else if (sem[name]) expect(line.n, `semantic.${name} tokens`, m[1], c.leavesIn(sem[name]));
        }
        expect(line.n, "component tokens", totals[4], c.byTier("component"));
        for (const m of totals[5].matchAll(/(\d+) `(\w+)\/\*`/g)) {
          if (comp[m[2]]) expect(line.n, `${m[2]}/* tokens`, m[1], c.leavesIn(comp[m[2]]));
        }
        expect(line.n, "values on web", totals[6], c.emittedWeb);
        expect(line.n, "values on iOS and Android", totals[7], c.emittedNative);
        expect(line.n, "gradient tokens", totals[8], c.gradients);
      } else if (text.includes("**Totals:**")) {
        report(line.n, "Could not parse the **Totals:** line, so its numbers are unchecked. Keep the shape `N primitive tokens · N semantic tokens (…) · N component tokens (…) · **N values on web** · **N on iOS and Android** · **N gradients**`.");
      }

      const colorsLine = /all (\d+) color tokens \((\d+) primitive — (\d+) palette steps plus [^—]+ — \+ (\d+) semantic roles \+ (\d+) component tokens\)/.exec(text);
      if (colorsLine) {
        expect(line.n, "color tokens", colorsLine[1], c.colors("primitives") + c.colors("semantic") + c.colors("component"));
        expect(line.n, "primitive color tokens", colorsLine[2], c.colors("primitives"));
        expect(line.n, "palette steps", colorsLine[3], c.paletteSteps);
        expect(line.n, "semantic color tokens", colorsLine[4], c.colors("semantic"));
        expect(line.n, "component color tokens", colorsLine[5], c.colors("component"));
      }
      const source = /exceeds the (\d+) source tokens because the build expands each of the (\d+) composite typography tokens/.exec(text);
      if (source) {
        expect(line.n, "source tokens", source[1], c.total);
        expect(line.n, "composite typography tokens", source[2], c.typographyIn("semantic") + c.typographyIn("component"));
      }
      const gradients = /(\d+) gradient tokens/.exec(text);
      if (gradients) expect(line.n, "gradient tokens", gradients[1], c.gradients);
      const paletteList = /^- \*\*(\d+) palettes:\*\* (.+)$/.exec(text);
      if (paletteList) {
        expect(line.n, "palettes", paletteList[1], c.palettes.length);
        const listed = paletteList[2].split(",").map((s) => s.trim());
        if (listed.join(",") !== c.palettes.join(",")) report(line.n, `Lists palettes ${listed.join(", ")}; tokens.json has ${c.palettes.join(", ")}.`, "palettes");
      }
      for (const m of text.matchAll(/\b([A-Z][a-z]+) \((\d+) tokens\)/g)) {
        const group = m[1].toLowerCase();
        if (comp[group]) expect(line.n, `${group}/* tokens`, m[2], c.leavesIn(comp[group]));
      }
    }
    if (!sawTotals) report(1, "No **Totals:** line found in the Token Inventory, so the inventory counts are unchecked.");
  },
};

// ----------------------------------------------------------- README coverage ---

const readmeCoverage = {
  id: "docs/readme-coverage",
  description: "The README's Token Inventory is exhaustive for semantic colour roles: every semantic colour (bar the exp-* expressive aliases) has a row, so a new role cannot ship undocumented.",
  check(api) {
    const t = api.tokens();
    if (t.error || !api.exists("README.md")) return;
    const d = doc(api, "README.md");
    const inventory = d.headings.find((h) => /^Semantic tokens \(\d+\)$/.test(h.text));
    if (!inventory) {
      api.report({ file: "README.md", line: 1, column: 1, message: 'No "Semantic tokens (N)" heading in the Token Inventory, so semantic colour coverage is unchecked.' });
      return;
    }
    // Only rows inside the semantic inventory count; a mention in another table does not.
    const end = d.headings.find((h) => h.line > inventory.line && h.level <= inventory.level)?.line ?? Infinity;
    const listed = new Set();
    for (const table of d.tables.filter((tb) => tb.line > inventory.line && tb.line < end)) {
      for (const row of table.rows) {
        const code = firstCode(row.cells[0] ?? "");
        if (code) listed.add(code);
      }
    }
    for (const leaf of t.model.inTier("semantic")) {
      if (leaf.path[0] !== "color" || leaf.path[1].startsWith("exp-")) continue;
      if (!listed.has(leaf.id)) {
        api.report({
          file: "README.md",
          line: inventory.line,
          column: 1,
          subject: leaf.id,
          message: `${leaf.id} has no row in the semantic colour tables of the Token Inventory. Add it under its role heading (and bump that heading's count).`,
        });
      }
    }
  },
};

// ---------------------------------------------------------- component specs ---

const componentSpec = {
  id: "docs/component-spec",
  description: "Every component token group has a spec in components/{group}.md and a row in the README's component table (README → Component tokens).",
  check(api) {
    const t = api.tokens();
    if (t.error) return;
    const readme = api.exists("README.md") ? doc(api, "README.md") : null;
    const rows = new Set(readme ? readme.tables.flatMap((tb) => tb.rows.map((r) => firstCode(r.cells[0] ?? ""))) : []);
    for (const group of Object.keys(t.value.component ?? {})) {
      const leaf = t.model.inTier("component").find((l) => l.path[0] === group);
      const loc = t.locations.get(JSON.stringify(["component", group])) ?? {};
      if (!api.exists(`components/${group}.md`)) {
        api.report({ file: "tokens/tokens.json", ...loc, subject: group, message: `component.${group} has no spec at components/${group}.md. Component tokens mirror a Figma component set, and the spec records its bindings.` });
      }
      if (readme && leaf && !rows.has(`${group}/*`)) {
        api.report({ file: "README.md", line: 1, column: 1, subject: group, message: `The README's component table has no \`${group}/*\` row.` });
      }
    }
  },
};

export default [brokenLink, unknownToken, tokenFacts, readmeCounts, readmeCoverage, componentSpec];
