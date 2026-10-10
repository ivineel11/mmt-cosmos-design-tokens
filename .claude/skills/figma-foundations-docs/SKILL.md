---
name: figma-foundations-docs
description: Build or update a "Foundations Documentation" page in a Figma design file. It draws one dark documentation frame per token category (primitive, semantic and component colours, typography variables, text styles, spacing, sizing, radius, borders and stroke, opacity, effects and shadows, other variables), each with one table per variable group. Every row shows a live preview, the value in every mode and brand, the alias it points to, the description and the developer token. Use when the user asks to document Figma variables or styles, or to create, refresh, regenerate or sync the token documentation page or doc frames.
---

# Figma Foundations Documentation

This skill turns the variables, text styles and effect styles of a Figma file into a documentation page. The page reads straight from the file. It never reads code, and it never changes a variable or a style. It only writes frames on the documentation page.

It works with any Figma design file. The worked example throughout is the Cosmos file: collections `primitives`, `MakeMyTrip` (with brand extensions `myBiz` and `Goibibo`) and `component`, plus 42 text styles and 7 shadow styles.

## Where it runs

The skill is plain Figma Plugin API JavaScript, so it runs anywhere that can execute a script inside the file:

| Tool | How to run a script |
|---|---|
| Claude Code, Cursor | Figma MCP `use_figma` with the file key from the URL. Load the `figma-use` skill first when it is available. |
| Figma Agent | Its built-in code execution, inside the open file. |

`use_figma` limits each call to 50 KB of code and 20 KB of returned data, and nothing carries over between calls. So every call is **the Library below, pasted unchanged, followed by one short job**. The Library is about 27 KB, which leaves room for the job. If your tool has no such limits, you can run every job in one script with a loop.

Only standard Plugin API calls are used: no `figma.createAutoLayout`, `node.query` or plugin data. A design file is required, because the page is created with `figma.createPage()`.

## Settings

Every job starts with a `CFG` object:

```js
const CFG = {
  pageName: 'Foundations Documentation', // created if it does not exist
  originX: 0, originY: 0,                // top-left of the first section; sections run left to right
  tiers: {},                             // optional override, e.g. { primitives: 'primitive', MakeMyTrip: 'semantic', component: 'component' }
  textStyleToken: null,                  // developer token pattern for text styles, e.g. '--{path}-*'
  effectStyleToken: null,                // developer token pattern for effect styles, e.g. '--{path}'
};
```

- **Tiers** decide which colour section a colour variable goes to. They are detected automatically:
  - A collection with no aliases is `primitive`.
  - A collection whose aliases mostly point at a primitive collection is `semantic`.
  - Anything else is `component`.
  Set `tiers` only when the plan shows a wrong guess.
- **Style tokens.** Text and effect styles have no code syntax field in Figma, so their Developer Token comes from a pattern you declare. `{path}` is the style name in kebab case, so `headline/large/bold` becomes `headline-large-bold`. Leave the pattern `null` when you do not know the code names. The cell then shows `—` and the style is reported.

Cosmos uses `textStyleToken: '--{path}-*'` and `effectStyleToken: '--{path}'`. Its typography builds as four variables per style (`--headline-large-bold-font-family`, `-font-weight`, `-font-size`, `-line-height`), and its shadows as `--shadow-card` and so on.

## Workflow

1. **Confirm the target.** You need the file URL and the page name, which defaults to `Foundations Documentation`. If that page already exists, the run updates it in place. Rebuild from scratch only when the user asks for it. To rebuild, delete the old section frames first, after the user confirms.
2. **Plan (read-only).** Run the Library plus `return await planJobs(CFG);`. Show the user:
   - the sections that will exist,
   - the collections with their detected tier and column count,
   - the number of jobs,
   - any **stale** sections: frames on the page whose category no longer has variables.
   If a tier is wrong, set `CFG.tiers` and plan again.
3. **Run the jobs in plan order.**
   - Build jobs: `return await runJob(CFG, { section: 'Spacing' });`
   - Chunked jobs pass the row range: `{ section: 'Semantic Colors', from: 0, to: 100 }`.
   - Jobs marked `prune: true` run `return await pruneSection(CFG, 'Semantic Colors');` after the last chunk of a section. Pruning removes rows, groups and blocks that no longer exist.
   - Small jobs can share one call: loop over them and return a short line per job.
   - If a call times out, plan again with a smaller budget, e.g. `planJobs(CFG, 120)`.
4. **Stale sections.** List them and ask the user before deleting any. A whole section is never removed without a yes.
5. **Check.**
   - Screenshot two or three sections, one of them with brand columns if the file has extensions. Compare them with the design spec below.
   - Look for clipped text and empty tables.
   - A second run of any job must report `created 0, replaced 0`.
6. **Report** back in plain words:
   - rows created, replaced, unchanged and removed per section,
   - every variable or style **without code syntax** (its Developer Token shows `—`),
   - every one without a description,
   - the style-token patterns used,
   - stale sections and what the user decided about them.
   Remind the user that hand edits inside the page are overwritten on the next run.

## Rules

- **Never invent a developer token.** A variable's token is its WEB code syntax with `var( )` removed. With no code syntax the cell shows `—` and the variable goes in the report. Guessing a name from the variable path is how a page ends up full of names that do not exist in code.
- **Descriptions are copied verbatim.** An empty description shows `—`.
- **Document, do not edit.** This skill never changes variables, styles, code syntax or descriptions. If the report shows gaps, fix them in the variables panel and run the skill again.
- **Touch only nodes in the naming contract** (below), on the documentation page. Any other frame on the page is left alone.
- **Never rename layers by hand.** Layer names are the keys that update-in-place matches on. A renamed row is treated as removed, and a fresh one is built.

## What the page contains

### Sections, in order, left to right

| Section | What goes in it |
|---|---|
| Primitive Colors | Colour variables in primitive collections |
| Semantic Colors | Colour variables in semantic collections, with one value column per mode and per brand extension |
| Component Colors · {group} | One section per top-level group of a component collection, e.g. `Component Colors · button` |
| Typography · fontFamily, fontWeight, fontSize, lineHeight, letterSpacing | Number and string variables for type, from every collection |
| Typography Styles | Local text styles |
| Spacing, Sizing, Radius, Borders & Stroke, Opacity | Number variables of that kind, from every collection |
| Effects & Shadows | Local effect styles |
| Other Variables | Everything else, e.g. durations, easing curves, springs and unscoped numbers |

A section appears only when it has content. Sections are 1568 wide, sit 160 apart and share one top edge at `originY`.

### Which section a variable goes to

Rules are applied in this order. Scopes are checked first, because they are the designer's own statement of use. Names are only a fallback for unscoped variables.

1. **Colours** go by collection tier: primitive, semantic or component.
2. **Typography:** a `FONT_FAMILY`/`FONT_STYLE` scope, or a group named `fontFamily`, `typeface` or `family`, goes to Typography · fontFamily. Similarly `FONT_WEIGHT` or `weight` goes to fontWeight, `FONT_SIZE` to fontSize, `LINE_HEIGHT` to lineHeight and `LETTER_SPACING` to letterSpacing.
3. **Other strings and booleans** go to Other Variables.
4. **Numbers by scope:** `CORNER_RADIUS` goes to Radius, `GAP` to Spacing, `WIDTH_HEIGHT` to Sizing, `STROKE_FLOAT` to Borders & Stroke and `OPACITY` to Opacity. Any other explicit scope goes to Other Variables.
5. **Unscoped numbers by group name:** `radius` goes to Radius, `spacing`/`space` to Spacing, `…size`/`sizing` to Sizing, `borderWidth`/`stroke` to Borders & Stroke, `opacity` to Opacity, and everything else to Other Variables.

### Inside a section

```
Docs / Section — {title}                 1568 wide, fill #0F0F0F, radius 16, padding 48, gap 24
  Title                                  Inter Semi Bold 28/34 #F5F5F5
  Docs / Content                         gap 48
    Docs / Source Block — {label}        gap 24. Label: "Variables · {category} · {collection}" or "Styles · Typography"
      Label                              Inter Medium 14/20 #8C8C8C
      Docs / Groups                      gap 32
        Docs / Group — {group}           gap 12. The group is the variable path without its last part, "/" shown as " / "
          Group Title                    Inter Semi Bold 16/22 #F1F1F1
          Docs / Table Shell             fill #181818, radius 8, clip
            Docs / Table Header          fill #222222, padding 10/16, gap 16; Inter Medium 11/15 #8F8F8F
            Docs / Table Body
              Docs / Variable Row — {leaf}   padding 12/16, gap 16, fill #181818, 1 px bottom line #2A2A2A
```

One source block per collection (or per style list). One group per variable path prefix, so `color/neutral/50` sits in group `color / neutral`. Rows follow the order of the variables panel. Typography rows are named `Docs / Typography Row — {leaf}`, effect rows `Docs / Effect Row — {leaf}`. A checkerboard component, `Docs / Preview / Checkerboard` (96 × 48, 8 px squares #F2F2F2 and #D9D9D9), sits left of the first section and backs every transparent preview.

### Columns

The row's inner width is 1440, and the columns are separated by 16.

| Table | Columns (width) |
|---|---|
| Variables, one value column | Token Name 280 · value 552 · Description 240 · Developer Token 320 |
| Variables, k value columns | Token Name 280 (240 when k ≥ 3) · k values sharing the rest · Description 240 · Developer Token 320 (280 when k ≥ 3) |
| Text styles | Preview 120 · Style Name 200 · Font 120 · Weight 100 · Size 80 · Line Height 90 · Letter Spacing 100 · Description 222 · Developer Token 280 |
| Effect styles | Preview 120 · Style Name 200 · Effect Data 496 · Description 280 · Developer Token 280 |

- **Value column headers.** A value column is headed by its mode name. When the collection has brand extensions, every header gets a second line with the collection or brand name, e.g. `Light / MakeMyTrip`, `Light / myBiz`, `Light / Goibibo`. That makes the header 50 tall instead of 40.
- **Cells.** Each cell stretches to the row height and centres its content vertically.
- **Text styles.** Body text is Inter Regular 13/18 #F1F1F1. Alias lines and preview captions are Inter Regular 12/17 #8C8C8C. Developer tokens are Inter Regular 12/17 #6EA8E5.

### What a value cell shows

A value cell stacks a **Preview**, then **Value**, then **Alias** (only when the variable is an alias), 4 apart. Value is the fully resolved value in that column's mode or brand. Alias is the first hop, written `→ {collection}: {variable}`.

| Section | Preview | Value text |
|---|---|---|
| Colours | 72 × 48, radius 8, 1 px #3A3A3A inside stroke, fill **bound to the variable**. A checkerboard sits behind it when alpha < 1 | `#RRGGBB`, or `#RRGGBB · 7.8%` with alpha |
| Spacing | 120 × 48, bar 8 tall at y 20, width bound to the variable (hidden when ≤ 0) | number |
| Sizing | 96 × 64, square with width and height bound | number |
| Radius | 48 × 48, 40 × 40 square at 4,4 with all four corner radii bound | number |
| Borders & Stroke | 96 × 48, 80 × 32 outlined box at 8,8 with all four stroke weights bound | number |
| Opacity | 96 × 48, #F1F1F1 block over the checkerboard, layer opacity bound | `35%` |
| Typography variables, Other | 96 × 48 clipped caption showing the value | value as text |

Brand and mode columns set the explicit variable mode on their Preview frame, so the bound previews render each brand's own colour. Numbers are rounded to 4 decimals (`0.1`, not `0.10000000149`). Previews are clipped, so a 320 value shows its first 120 and the Value text carries the number.

**Text style rows:**
- **Preview:** `Ag` with the style applied.
- **Style Name:** the last part of the name.
- **Font:** the family.
- **Weight:** the number, a line break, then the style name, e.g. `700` then `Bold`. The number comes from a bound weight variable when there is one.
- **Size:** `32px`.
- **Line Height:** `40px`, `150%` or `Auto`.
- **Letter Spacing:** `0`, `0.5px` or `2%`.
- **Description**, then **Developer Token** from `textStyleToken`.

**Effect style rows:**
- **Preview:** a white 56 × 36 card, radius 8, with the style applied, on a #F2F2F2 96 × 64 stage.
- **Effect Data:** one block per layer, for example:

  ```
  Drop Shadow
  X 0 → primitives: shadowOffset/0 · Y 1 → primitives: shadowOffset/1
  Blur 2 → primitives: shadowBlur/2 · Spread 0
  #0A0A0A · 7.8% → primitives: color/alpha/neutral-950-8
  ```

  Bound effect fields show their variable after the value. A blur layer shows only its type and blur.
- **Description**, then **Developer Token** from `effectStyleToken`.

## Update in place

The page is matched by layer names, the **naming contract**: `Docs / Section — …`, `Docs / Content`, `Docs / Source Block — …`, `Docs / Groups`, `Docs / Group — …`, `Docs / Table Shell`, `Docs / Table Header`, `Docs / Table Body` and the three row prefixes. On each run:

- Sections, blocks and groups that exist are kept, with the same node IDs, and moved into plan order. Missing ones are created.
- A table whose header text differs, for example because a mode or brand was added, is rebuilt.
- Each row is compared by its text, in layer order, plus the presence of a checkerboard.
  - An identical row is kept untouched.
  - A different row is rebuilt in the same place.
  - A missing row is created.
- Rows, groups and blocks that are no longer in the plan are removed: by a full-section job, or by the `prune` job after chunked jobs.
- Bound previews follow the variables on their own, so a changed colour value updates the swatch without a rebuild. The Value text is still refreshed on the next run.

## Library

Paste everything between the markers, unchanged, at the top of every job.

```js
// ===== foundations-docs library v1 — paste unchanged above each job =====
const SPEC = { width: 1568, gap: 160, inner: 1440,
  c: { section: '#0F0F0F', shell: '#181818', header: '#222222', rowLine: '#2A2A2A', swatchLine: '#3A3A3A', title: '#F5F5F5', text: '#F1F1F1', label: '#8C8C8C', head: '#8F8F8F', muted: '#8C8C8C', token: '#6EA8E5', checkA: '#F2F2F2', checkB: '#D9D9D9', stage: '#F2F2F2', card: '#FFFFFF' } };
const FONT = { r: { family: 'Inter', style: 'Regular' }, m: { family: 'Inter', style: 'Medium' }, s: { family: 'Inter', style: 'Semi Bold' } };
const ORDER = ['Primitive Colors', 'Semantic Colors', 'Component Colors', 'Typography · fontFamily', 'Typography · fontWeight', 'Typography · fontSize', 'Typography · lineHeight', 'Typography · letterSpacing', 'Typography Styles', 'Spacing', 'Sizing', 'Radius', 'Borders & Stroke', 'Opacity', 'Effects & Shadows', 'Other Variables'];
const KIND = { Spacing: 'bar', Sizing: 'box', Radius: 'radius', 'Borders & Stroke': 'stroke', Opacity: 'opacity' };
const W = 'Docs / ';
const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const solid = h => [{ type: 'SOLID', color: rgb(h) }];
const hx2 = x => Math.round(x * 255).toString(16).padStart(2, '0').toUpperCase();
const fmtColor = c => '#' + hx2(c.r) + hx2(c.g) + hx2(c.b) + (c.a !== undefined && c.a < 1 ? ' · ' + Math.round(c.a * 1000) / 10 + '%' : '');
const fmtNum = n => String(Math.round(n * 10000) / 10000);
const kebab = name => name.split('/').map(p => p.trim().replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()).join('-');
const isAlias = x => x && typeof x === 'object' && x.type === 'VARIABLE_ALIAS';

function frame(name, dir, o = {}) {
  const f = figma.createFrame(); f.name = name; f.fills = o.fill ? solid(o.fill) : []; f.clipsContent = !!o.clip;
  if (dir) { f.layoutMode = dir; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.itemSpacing = o.gap || 0;
    [f.paddingTop, f.paddingRight, f.paddingBottom, f.paddingLeft] = o.pad || [0, 0, 0, 0];
    if (o.main) f.primaryAxisAlignItems = o.main; if (o.cross) f.counterAxisAlignItems = o.cross; }
  if (o.radius) f.cornerRadius = o.radius; if (o.w) f.resize(o.w, o.h || 20); return f;
}
function put(parent, child, h = 'FILL', v = 'HUG', at) { at === undefined ? parent.appendChild(child) : parent.insertChild(at, child); if (parent.layoutMode && parent.layoutMode !== 'NONE') { child.layoutSizingHorizontal = h; child.layoutSizingVertical = v; } if (child.type === 'TEXT' && h === 'FILL') child.textAutoResize = 'HEIGHT'; return child; }
function text(chars, font, size, lh, color, name) { const t = figma.createText(); t.fontName = font; t.fontSize = size; t.lineHeight = { unit: 'PIXELS', value: lh }; t.fills = solid(color); t.characters = chars; t.name = name || chars.slice(0, 80); return t; }
function cell(name, width, gap = 0) { return frame('Cell / ' + name, 'VERTICAL', { gap, main: 'CENTER', cross: 'MIN', w: width }); }
function putCell(row, c) { return put(row, c, 'FIXED', 'FILL'); }
function child(parent, name) { return parent.children.find(n => n.name === name); }
function place(parent, node, i) { if (parent.children.indexOf(node) !== i) parent.insertChild(Math.min(i, parent.children.length - 1), node); }
function texts(node) { return node.findAll(n => n.type === 'TEXT').map(t => t.characters); }
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

async function loadModel(CFG) {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const vars = await figma.variables.getLocalVariablesAsync();
  const byId = {}; for (const v of vars) byId[v.id] = v;
  const colById = {}; for (const c of cols) colById[c.id] = c;
  const base = cols.filter(c => !c.isExtension), exts = cols.filter(c => c.isExtension);
  const tier = {};
  for (const c of base) if (!c.variableIds.some(id => byId[id] && Object.values(byId[id].valuesByMode).some(isAlias))) tier[c.id] = 'primitive';
  for (const c of base) if (!tier[c.id]) { let p = 0, n = 0; for (const id of c.variableIds) for (const x of Object.values(byId[id].valuesByMode)) if (isAlias(x)) { n++; if (byId[x.id] && tier[byId[x.id].variableCollectionId] === 'primitive') p++; } tier[c.id] = p * 2 >= n ? 'semantic' : 'component'; }
  for (const c of base) if (CFG.tiers && CFG.tiers[c.name]) tier[c.id] = CFG.tiers[c.name];
  const columns = c => [...c.modes.map(m => ({ coll: c, ext: null, modeId: m.modeId, mode: m.name })),
    ...exts.filter(e => e.parentVariableCollectionId === c.id).flatMap(e => e.modes.map(m => ({ coll: c, ext: e, modeId: m.modeId, parentModeId: m.parentModeId, mode: m.name })))];
  const raw = (v, col) => { if (col.ext) { const o = col.ext.variableOverrides[v.id]; return o && o[col.modeId] !== undefined ? o[col.modeId] : v.valuesByMode[col.parentModeId]; } return v.valuesByMode[col.modeId]; };
  const hop = (v, col) => colById[v.variableCollectionId].id === col.coll.id ? col : columns(colById[v.variableCollectionId])[0];
  const resolve = (v, col) => { let x = raw(v, col), c = col, n = 0, first = null; while (isAlias(x) && n++ < 20) { const t = byId[x.id]; if (!t) return { value: null, first }; if (!first) first = t; c = hop(t, c); x = raw(t, c); } return { value: x, first }; };
  return { cols, base, exts, byId, colById, tier, columns, resolve,
    textStyles: await figma.getLocalTextStylesAsync(), effectStyles: await figma.getLocalEffectStylesAsync() };
}

function sectionOf(v, tier) {
  const t = v.resolvedType, s = v.scopes || [], segs = v.name.split('/'), grp = segs.length > 1 ? segs.slice(0, -1) : segs;
  const has = x => s.includes(x), kw = re => grp.some(p => re.test(p));
  if (t === 'COLOR') return tier === 'primitive' ? 'Primitive Colors' : tier === 'component' ? 'Component Colors · ' + segs[0] : 'Semantic Colors';
  if (has('FONT_FAMILY') || has('FONT_STYLE') || kw(/^(font-?family|typeface|family)$/i)) return 'Typography · fontFamily';
  if (has('FONT_WEIGHT') || kw(/^(font-?weight|weight)$/i)) return 'Typography · fontWeight';
  if (has('FONT_SIZE') || kw(/^font-?size$/i)) return 'Typography · fontSize';
  if (has('LINE_HEIGHT') || kw(/^line-?height$/i)) return 'Typography · lineHeight';
  if (has('LETTER_SPACING') || kw(/^letter-?spacing$/i)) return 'Typography · letterSpacing';
  if (t !== 'FLOAT') return 'Other Variables';
  for (const [sc, sec] of [['CORNER_RADIUS', 'Radius'], ['GAP', 'Spacing'], ['WIDTH_HEIGHT', 'Sizing'], ['STROKE_FLOAT', 'Borders & Stroke'], ['OPACITY', 'Opacity']]) if (has(sc)) return sec;
  if (s.length && !has('ALL_SCOPES')) return 'Other Variables';
  if (kw(/radius/i)) return 'Radius';
  if (kw(/^(spacing|space)$/i)) return 'Spacing';
  if (kw(/(size|sizing)$/i)) return 'Sizing';
  if (kw(/^(border-?width|stroke)$/i)) return 'Borders & Stroke';
  if (kw(/opacity/i)) return 'Opacity';
  return 'Other Variables';
}
const blockCat = sec => sec.startsWith('Typography · ') ? 'Typography Primitives' : /Colors/.test(sec) ? 'Colors' : sec;

function plan(M) {
  const S = new Map(); const sec = t => { if (!S.has(t)) S.set(t, { title: t, blocks: new Map() }); return S.get(t); };
  for (const c of M.base) for (const id of c.variableIds) {
    const v = M.byId[id]; if (!v) continue; const title = sectionOf(v, M.tier[c.id]); const segs = v.name.split('/');
    const label = 'Variables · ' + blockCat(title) + ' · ' + c.name; const s = sec(title);
    if (!s.blocks.has(label)) s.blocks.set(label, { label, coll: c, groups: new Map() });
    const g = segs.length > 1 ? segs.slice(0, -1).join(' / ') : c.name; const b = s.blocks.get(label);
    if (!b.groups.has(g)) b.groups.set(g, []); b.groups.get(g).push({ type: 'var', v, leaf: segs[segs.length - 1] });
  }
  for (const [title, list, label] of [['Typography Styles', M.textStyles, 'Styles · Typography'], ['Effects & Shadows', M.effectStyles, 'Styles · Effects & Shadows']]) if (list.length) {
    const b = { label, coll: null, groups: new Map() }; sec(title).blocks.set(label, b);
    for (const st of list) { const segs = st.name.split('/'); const g = segs.length > 1 ? segs.slice(0, -1).join(' / ') : title; if (!b.groups.has(g)) b.groups.set(g, []); b.groups.get(g).push({ type: title === 'Typography Styles' ? 'text' : 'effect', st, leaf: segs[segs.length - 1] }); }
  }
  const rank = t => { const i = ORDER.indexOf(t.startsWith('Component Colors') ? 'Component Colors' : t); return i < 0 ? 99 : i; };
  return [...S.values()].sort((a, b) => rank(a.title) - rank(b.title)); // stable: component sections keep collection order
}

// ---------- tables ----------
function tableCols(type, cols) {
  if (type === 'text') return [['Preview', 120], ['Style Name', 200], ['Font', 120], ['Weight', 100], ['Size', 80], ['Line Height', 90], ['Letter Spacing', 100], ['Description', 222], ['Developer Token', 280]].map(([n, w]) => ({ name: n, w, lines: [n] }));
  if (type === 'effect') return [['Preview', 120], ['Style Name', 200], ['Effect Data', 496], ['Description', 280], ['Developer Token', 280]].map(([n, w]) => ({ name: n, w, lines: [n] }));
  const k = cols.length, tok = k >= 3 ? 240 : 280, dev = k >= 3 ? 280 : 320, desc = 240, two = cols.some(c => c.ext);
  const val = Math.floor((SPEC.inner - tok - desc - dev - 16 * (k + 2)) / k);
  return [{ name: 'Token Name', w: tok, lines: ['Token Name'] }, ...cols.map(c => ({ name: c.mode, w: val, lines: two ? [c.mode, c.ext ? c.ext.name : c.coll.name] : [c.mode], col: c })),
    { name: 'Description', w: desc, lines: ['Description'] }, { name: 'Developer Token', w: dev, lines: ['Developer Token'] }];
}
function buildHeader(cols) {
  const h = frame(W + 'Table Header', 'HORIZONTAL', { gap: 16, pad: [10, 16, 10, 16], fill: SPEC.c.header });
  for (const c of cols) { const x = putCell(h, cell(c.name, c.w)); for (const l of c.lines) put(x, text(l, FONT.m, 11, 15, SPEC.c.head)); }
  return h;
}
function newRow(prefix, leaf) { return frame(W + prefix + ' Row — ' + leaf, 'HORIZONTAL', { gap: 16, pad: [12, 16, 12, 16], fill: SPEC.c.shell }); }
function finishRow(r) { r.strokes = solid(SPEC.c.rowLine); r.strokeAlign = 'INSIDE'; r.strokeTopWeight = 0; r.strokeRightWeight = 0; r.strokeLeftWeight = 0; r.strokeBottomWeight = 1; }
function checker(ctx, w, h) { const i = ctx.checker.createInstance(); i.resize(Math.max(w, 96), Math.max(h, 48)); return i; }

function varSpec(item, cols, kind, M, report) {
  const v = item.v, out = [item.leaf], cells = [];
  for (const c of cols.filter(c => c.col)) {
    const { value, first } = M.resolve(v, c.col); const a = first ? '→ ' + M.colById[first.variableCollectionId].name + ': ' + first.name : null;
    let val = value == null ? '—' : typeof value === 'object' ? fmtColor(value) : typeof value === 'number' ? fmtNum(value) + (kind === 'opacity' ? '%' : '') : String(value);
    const alpha = typeof value === 'object' && value && value.a !== undefined && value.a < 1;
    if (kind === 'text') out.push(val); out.push(val); if (a) out.push(a);
    cells.push({ c, value, val, a, alpha });
  }
  const desc = v.description && v.description.trim() ? v.description : '—';
  const web = v.codeSyntax && v.codeSyntax.WEB ? v.codeSyntax.WEB.replace(/^var\((.*)\)$/, '$1') : '—';
  if (web === '—') report.noCode.push(v.name); if (desc === '—') report.noDesc.push(v.name);
  out.push(desc, web);
  return { name: W + 'Variable Row — ' + item.leaf, sig: out.concat(cells.filter(x => x.alpha || kind === 'opacity').map(() => '#checker')), build: ctx => buildVarRow(item, cols, kind, cells, desc, web, ctx) };
}
function buildVarRow(item, cols, kind, cells, desc, web, ctx) {
  const r = newRow('Variable', item.leaf), v = item.v;
  put(putCell(r, cell('Token Name', cols[0].w)), text(item.leaf, FONT.r, 13, 18, SPEC.c.text));
  for (const x of cells) {
    const k = putCell(r, cell(x.c.name, x.c.w, 4)); const n = typeof x.value === 'number' ? x.value : 0;
    const size = { color: [72, 48], bar: [120, 48], box: [96, 64], radius: [48, 48], stroke: [96, 48], opacity: [96, 48], text: [96, 48] }[kind];
    const p = put(k, frame('Preview', null, { w: size[0], h: size[1], clip: true, radius: kind === 'color' ? 8 : 0 }), 'FIXED', 'FIXED');
    if (x.c.col.ext || x.c.col.coll.modes.length > 1) p.setExplicitVariableModeForCollection(x.c.col.ext || x.c.col.coll, x.c.col.modeId);
    const rect = figma.createRectangle(); rect.name = 'Source Preview';
    if (kind === 'color') { if (x.alpha) p.appendChild(checker(ctx, 72, 48)); rect.resize(72, 48); rect.cornerRadius = 8; rect.strokes = solid(SPEC.c.swatchLine); rect.strokeWeight = 1; rect.strokeAlign = 'INSIDE';
      const hex = x.value && typeof x.value === 'object' ? x.value : { r: 0, g: 0, b: 0, a: 0 }; rect.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: hex.r, g: hex.g, b: hex.b }, opacity: hex.a === undefined ? 1 : hex.a }, 'color', v)]; p.appendChild(rect); }
    else if (kind === 'bar') { rect.resize(Math.max(n, 1), 8); rect.y = 20; rect.fills = solid(SPEC.c.text); p.appendChild(rect); if (n > 0) rect.setBoundVariable('width', v); else rect.visible = false; }
    else if (kind === 'box') { rect.resize(Math.max(n, 1), Math.max(n, 1)); rect.fills = solid(SPEC.c.text); p.appendChild(rect); if (n > 0) { rect.setBoundVariable('width', v); rect.setBoundVariable('height', v); } }
    else if (kind === 'radius') { rect.resize(40, 40); rect.x = 4; rect.y = 4; rect.fills = solid(SPEC.c.text); p.appendChild(rect); for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) rect.setBoundVariable(f, v); }
    else if (kind === 'stroke') { rect.resize(80, 32); rect.x = 8; rect.y = 8; rect.fills = solid(SPEC.c.shell); rect.strokes = solid(SPEC.c.text); rect.strokeAlign = 'INSIDE'; p.appendChild(rect); for (const f of ['strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight']) rect.setBoundVariable(f, v); }
    else if (kind === 'opacity') { p.appendChild(checker(ctx, 96, 48)); rect.resize(96, 48); rect.fills = solid(SPEC.c.text); rect.opacity = Math.min(Math.max(n / 100, 0), 1); p.appendChild(rect); try { rect.setBoundVariable('opacity', v); } catch (e) {} }
    else { rect.remove(); const sp = frame('Source Preview', null, { w: 96, h: 48, clip: true }); p.appendChild(sp); const t = text(x.val, FONT.r, 12, 17, SPEC.c.muted); sp.appendChild(t); t.textAutoResize = 'HEIGHT'; t.resize(96, t.height); t.y = 16; }
    put(k, text(x.val, FONT.r, 13, 18, SPEC.c.text, 'Value'));
    if (x.a) put(k, text(x.a, FONT.r, 12, 17, SPEC.c.muted, 'Alias'));
  }
  put(putCell(r, cell('Description', cols[cols.length - 2].w)), text(desc, FONT.r, 13, 18, SPEC.c.text));
  put(putCell(r, cell('Developer Token', cols[cols.length - 1].w)), text(web, FONT.r, 12, 17, SPEC.c.token));
  finishRow(r); return r;
}
const WEIGHT = { thin: 100, hairline: 100, extralight: 200, ultralight: 200, light: 300, regular: 400, normal: 400, book: 400, medium: 500, semibold: 600, demibold: 600, bold: 700, extrabold: 800, ultrabold: 800, black: 900, heavy: 900 };
function styleToken(tpl, name, report) { if (!tpl) { report.noCode.push(name); return '—'; } return tpl.replace('{path}', kebab(name)); }
function textSpec(item, cols, M, CFG, report) {
  const s = item.st, fw = s.boundVariables && s.boundVariables.fontWeight ? M.resolve(M.byId[s.boundVariables.fontWeight.id], M.columns(M.colById[M.byId[s.boundVariables.fontWeight.id].variableCollectionId])[0]).value : WEIGHT[s.fontName.style.toLowerCase().replace(/[\s-]|italic/g, '')] || '';
  const lh = s.lineHeight.unit === 'AUTO' ? 'Auto' : s.lineHeight.unit === 'PERCENT' ? fmtNum(s.lineHeight.value) + '%' : fmtNum(s.lineHeight.value) + 'px';
  const ls = s.letterSpacing.value === 0 ? '0' : fmtNum(s.letterSpacing.value) + (s.letterSpacing.unit === 'PERCENT' ? '%' : 'px');
  const desc = s.description && s.description.trim() ? s.description : '—'; if (desc === '—') report.noDesc.push(s.name);
  const vals = ['Ag', item.leaf, s.fontName.family, fw + '\n' + s.fontName.style, fmtNum(s.fontSize) + 'px', lh, ls, desc, styleToken(CFG.textStyleToken, s.name, report)];
  return { name: W + 'Typography Row — ' + item.leaf, sig: vals, build: async ctx => {
    const r = newRow('Typography', item.leaf); const pc = putCell(r, cell('Preview', cols[0].w));
    const p = put(pc, frame('Preview', 'VERTICAL', { main: 'CENTER', cross: 'CENTER' }), 'FILL', 'HUG');
    await figma.loadFontAsync(s.fontName); const t = text('Ag', s.fontName, s.fontSize, 20, SPEC.c.text, 'Source Preview'); await t.setTextStyleIdAsync(s.id); t.fills = solid(SPEC.c.text); put(p, t, 'HUG', 'HUG');
    vals.slice(1).forEach((x, i) => put(putCell(r, cell(cols[i + 1].name, cols[i + 1].w)), text(x, FONT.r, i === 7 ? 12 : 13, i === 7 ? 17 : 18, i === 7 ? SPEC.c.token : SPEC.c.text)));
    finishRow(r); return r; } };
}
function effectSpec(item, cols, M, CFG, report) {
  const s = item.st, a = (e, f) => { const b = e.boundVariables && e.boundVariables[f]; const t = b && M.byId[b.id]; return t ? ' → ' + M.colById[t.variableCollectionId].name + ': ' + t.name : ''; };
  const label = { DROP_SHADOW: 'Drop Shadow', INNER_SHADOW: 'Inner Shadow', LAYER_BLUR: 'Layer Blur', BACKGROUND_BLUR: 'Background Blur' };
  const blocks = s.effects.map(e => e.type.endsWith('SHADOW') ? [label[e.type], 'X ' + fmtNum(e.offset.x) + a(e, 'offsetX') + ' · Y ' + fmtNum(e.offset.y) + a(e, 'offsetY'), 'Blur ' + fmtNum(e.radius) + a(e, 'radius') + ' · Spread ' + fmtNum(e.spread || 0) + a(e, 'spread'), fmtColor(e.color) + a(e, 'color')] : [label[e.type] || e.type, 'Blur ' + fmtNum(e.radius) + a(e, 'radius')]);
  const desc = s.description && s.description.trim() ? s.description : '—'; if (desc === '—') report.noDesc.push(s.name);
  const tok = styleToken(CFG.effectStyleToken, s.name, report);
  return { name: W + 'Effect Row — ' + item.leaf, sig: [item.leaf, ...blocks.flat(), desc, tok], build: async ctx => {
    const r = newRow('Effect', item.leaf); const pc = putCell(r, cell('Preview', cols[0].w));
    const p = put(pc, frame('Preview', null, { w: 96, h: 64, clip: true, fill: SPEC.c.stage }), 'FIXED', 'FIXED');
    const card = figma.createRectangle(); card.name = 'Source Preview'; card.resize(56, 36); card.x = 20; card.y = 14; card.cornerRadius = 8; card.fills = solid(SPEC.c.card); p.appendChild(card); await card.setEffectStyleIdAsync(s.id);
    put(putCell(r, cell('Style Name', cols[1].w)), text(item.leaf, FONT.r, 13, 18, SPEC.c.text));
    const d = putCell(r, cell('Effect Data', cols[2].w, 8));
    for (const b of blocks) { const eb = put(d, frame('Effect Block', 'VERTICAL', { gap: 2 })); for (const l of b) put(eb, text(l, FONT.r, 13, 18, SPEC.c.text)); }
    put(putCell(r, cell('Description', cols[3].w)), text(desc, FONT.r, 13, 18, SPEC.c.text));
    put(putCell(r, cell('Developer Token', cols[4].w)), text(tok, FONT.r, 12, 17, SPEC.c.token));
    finishRow(r); return r; } };
}

// ---------- page, sections, reconcile ----------
async function ensurePage(CFG) {
  let page = figma.root.children.find(p => p.name === CFG.pageName);
  if (!page) { page = figma.createPage(); page.name = CFG.pageName; }
  await figma.setCurrentPageAsync(page);
  let chk = page.children.find(n => n.type === 'COMPONENT' && n.name === W + 'Preview / Checkerboard');
  if (!chk) { chk = figma.createComponent(); chk.name = W + 'Preview / Checkerboard'; chk.resize(96, 48); chk.fills = [];
    for (let y = 0; y < 6; y++) for (let x = 0; x < 12; x++) { const q = figma.createRectangle(); q.resize(8, 8); q.x = x * 8; q.y = y * 8; q.fills = solid((x + y) % 2 ? SPEC.c.checkB : SPEC.c.checkA); chk.appendChild(q); }
    page.appendChild(chk); chk.x = (CFG.originX || 0) - 300; chk.y = CFG.originY || 0; }
  return { page, checker: chk };
}
function ensureFrame(parent, name, i, make) { let n = child(parent, name); if (!n) { n = make(); put(parent, n, 'FILL', 'HUG', Math.min(i, parent.children.length)); } else place(parent, n, i); return n; }
function setText(t, s) { if (t.characters !== s) t.characters = s; }

async function runJob(CFG, job) {
  for (const f of Object.values(FONT)) await figma.loadFontAsync(f);
  const ctx = await ensurePage(CFG); const M = await loadModel(CFG); const P = plan(M);
  const report = { section: job.section, created: 0, replaced: 0, unchanged: 0, removed: 0, noCode: [], noDesc: [] };
  const si = P.findIndex(s => s.title === job.section); if (si < 0) throw new Error('No section ' + job.section + '. Sections: ' + P.map(s => s.title).join(', '));
  const S = P[si]; const sname = W + 'Section — ' + S.title;
  let sec = ctx.page.children.find(n => n.type === 'FRAME' && n.name === sname);
  if (!sec) { sec = frame(sname, 'VERTICAL', { gap: 24, pad: [48, 48, 48, 48], fill: SPEC.c.section, radius: 16, w: SPEC.width, h: 100 }); sec.counterAxisSizingMode = 'FIXED';
    ctx.page.appendChild(sec); put(sec, text(S.title, FONT.s, 28, 34, SPEC.c.title, 'Title')); put(sec, frame(W + 'Content', 'VERTICAL', { gap: 48 })); report.newSection = true; }
  sec.x = (CFG.originX || 0) + si * (SPEC.width + SPEC.gap); sec.y = CFG.originY || 0;
  setText(child(sec, 'Title'), S.title); const content = child(sec, W + 'Content');
  const blocks = [...S.blocks.values()]; let bi = 0, rowIndex = 0; const from = job.from || 0, to = job.to === undefined ? Infinity : job.to;
  for (const B of blocks) {
    const bCount = [...B.groups.values()].reduce((n, g) => n + g.length, 0);
    if (rowIndex + bCount <= from || rowIndex >= to) { rowIndex += bCount; bi++; continue; }
    const bname = W + 'Source Block — ' + B.label;
    const blk = ensureFrame(content, bname, bi++, () => { const f = frame(bname, 'VERTICAL', { gap: 24 }); put(f, text(B.label, FONT.m, 14, 20, SPEC.c.label, 'Label')); put(f, frame(W + 'Groups', 'VERTICAL', { gap: 32 })); return f; });
    const groups = child(blk, W + 'Groups'); let gi = 0;
    for (const [gtitle, items] of B.groups) {
      const type = items[0].type, kind = /Colors/.test(S.title) ? 'color' : KIND[S.title] || 'text';
      const cols = tableCols(type, B.coll ? M.columns(B.coll) : []);
      const gname = W + 'Group — ' + gtitle; const gStart = rowIndex; rowIndex += items.length;
      if (gStart + items.length <= from || gStart >= to) { gi++; continue; }
      const grp = ensureFrame(groups, gname, gi++, () => { const f = frame(gname, 'VERTICAL', { gap: 12 }); put(f, text(gtitle, FONT.s, 16, 22, SPEC.c.text, 'Group Title')); return f; });
      let shell = child(grp, W + 'Table Shell');
      const want = cols.flatMap(c => c.lines);
      if (shell && !same(texts(child(shell, W + 'Table Header')), want)) { shell.remove(); shell = null; }
      if (!shell) { shell = frame(W + 'Table Shell', 'VERTICAL', { fill: SPEC.c.shell, radius: 8, clip: true }); put(grp, shell); put(shell, buildHeader(cols)); put(shell, frame(W + 'Table Body', 'VERTICAL', { fill: SPEC.c.shell })); }
      const body = child(shell, W + 'Table Body');
      const specs = items.map(it => type === 'var' ? varSpec(it, cols, kind, M, report) : it.type === 'text' ? textSpec(it, cols, M, CFG, report) : effectSpec(it, cols, M, CFG, report));
      const a = Math.max(0, from - gStart), z = Math.min(items.length, to - gStart);
      for (let i = a; i < z; i++) {
        const sp = specs[i]; const old = child(body, sp.name);
        const oldSig = old ? texts(old).concat(old.findAll(n => n.type === 'INSTANCE').map(() => '#checker')) : null;
        if (old && same(oldSig, sp.sig)) { place(body, old, i); report.unchanged++; continue; }
        const r = await sp.build(ctx); put(body, r, 'FILL', 'HUG', Math.min(i, body.children.length));
        if (old) { old.remove(); report.replaced++; } else report.created++;
      }
      if (z >= items.length) { const keep = new Set(specs.map(s => s.name)); for (const n of [...body.children]) if (!keep.has(n.name)) { n.remove(); report.removed++; } }
    }
    if (from === 0 && to === Infinity) { const keepG = new Set([...B.groups.keys()].map(g => W + 'Group — ' + g)); for (const n of [...groups.children]) if (!keepG.has(n.name)) { n.remove(); report.removed++; } }
  }
  if (from === 0 && to === Infinity) { const keepB = new Set(blocks.map(b => W + 'Source Block — ' + b.label)); for (const n of [...content.children]) if (!keepB.has(n.name)) { n.remove(); report.removed++; } }
  report.sectionId = sec.id; report.rowsInSection = rowIndex;
  report.noCode = { n: report.noCode.length, list: report.noCode.slice(0, 40) }; report.noDesc = { n: report.noDesc.length, list: report.noDesc.slice(0, 20) };
  return report;
}

async function pruneSection(CFG, title) {
  const ctx = await ensurePage(CFG); const M = await loadModel(CFG); const S = plan(M).find(s => s.title === title);
  const sec = ctx.page.children.find(n => n.type === 'FRAME' && n.name === W + 'Section — ' + title); let removed = 0;
  if (!S || !sec) return { section: title, removed, note: !S ? 'no longer has any variables or styles' : 'section frame missing' };
  const content = child(sec, W + 'Content'); const keepB = new Set();
  for (const B of S.blocks.values()) {
    const bname = W + 'Source Block — ' + B.label; keepB.add(bname); const blk = child(content, bname); if (!blk) continue;
    const groups = child(blk, W + 'Groups'); const keepG = new Set();
    for (const [g, items] of B.groups) {
      const gname = W + 'Group — ' + g; keepG.add(gname); const grp = child(groups, gname); const shell = grp && child(grp, W + 'Table Shell'); const body = shell && child(shell, W + 'Table Body'); if (!body) continue;
      const prefix = items[0].type === 'var' ? 'Variable' : items[0].type === 'text' ? 'Typography' : 'Effect'; const keep = new Set(items.map(it => W + prefix + ' Row — ' + it.leaf));
      for (const n of [...body.children]) if (!keep.has(n.name)) { n.remove(); removed++; }
    }
    for (const n of [...groups.children]) if (!keepG.has(n.name)) { n.remove(); removed++; }
  }
  for (const n of [...content.children]) if (!keepB.has(n.name)) { n.remove(); removed++; }
  return { section: title, removed };
}

async function planJobs(CFG, budget = 300) {
  const M = await loadModel(CFG); const P = plan(M); const jobs = [];
  for (const S of P) { let n = 0, cells = 0; for (const B of S.blocks.values()) { const k = B.coll ? M.columns(B.coll).length : 1; for (const items of B.groups.values()) { n += items.length; cells += items.length * k; } }
    const per = Math.max(20, Math.floor(budget / Math.max(1, cells / Math.max(n, 1))));
    if (n <= per) jobs.push({ section: S.title }); else { for (let f = 0; f < n; f += per) jobs.push({ section: S.title, from: f, to: f + per }); jobs.push({ section: S.title, prune: true }); }
  }
  const page = figma.root.children.find(p => p.name === CFG.pageName); let stale = [];
  if (page) { await figma.setCurrentPageAsync(page); const want = new Set(P.map(s => W + 'Section — ' + s.title)); stale = page.children.filter(n => n.type === 'FRAME' && n.name.startsWith(W + 'Section — ') && !want.has(n.name)).map(n => n.name + ' ' + n.id); }
  return { sections: P.map(s => s.title), jobs, stale, collections: M.base.map(c => c.name + ' (' + M.tier[c.id] + ', ' + M.columns(c).length + ' col)') };
}
// ===== end library =====
```

### Jobs

```js
// Plan (read-only)
const CFG = { pageName: 'Foundations Documentation', originX: 0, originY: 0, textStyleToken: '--{path}-*', effectStyleToken: '--{path}' };
return await planJobs(CFG);
```

```js
// One build job
const CFG = { /* same as the plan */ };
const r = await runJob(CFG, { section: 'Semantic Colors', from: 0, to: 100 });
return r;
```

```js
// Several small jobs in one call
const CFG = { /* same as the plan */ };
const out = [];
for (const job of [{ section: 'Radius' }, { section: 'Borders & Stroke' }, { section: 'Opacity' }]) {
  const r = await runJob(CFG, job);
  out.push(`${r.section}: new ${r.created}, replaced ${r.replaced}, same ${r.unchanged}, removed ${r.removed}, no code syntax ${r.noCode.n}`);
}
return out;
```

```js
// Prune after the last chunk of a chunked section
const CFG = { /* same as the plan */ };
return await pruneSection(CFG, 'Semantic Colors');
```

Each `runJob` report lists `noCode` and `noDesc`, capped at 40 and 20 names, with the full count in `n`. Collect them across jobs for the final report.

## Known limits

- A component collection gets one section per top-level group. Colour variables directly at the root of a component collection would make a section named after the variable, so keep component colours in groups.
- Only local variables and styles are documented, not ones from libraries.
- Very large previews are clipped. The Value text always carries the real number.
- Booleans and strings go to Other Variables, with the value shown as a caption.
