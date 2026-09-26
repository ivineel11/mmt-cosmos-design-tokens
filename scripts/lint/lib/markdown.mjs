/**
 * Just enough Markdown structure for the documentation rules: fenced code, headings
 * with GitHub-compatible anchors, pipe tables, inline code spans and links — each with
 * its line number.
 */

/** GitHub's heading anchor: lowercase, punctuation dropped, spaces to hyphens. */
export function slugify(text) {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links keep their text
    .replace(/`/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
    .replace(/ /g, "-");
}

const INLINE_CODE = /(`+)(?!`)([\s\S]*?[^`])\1(?!`)/g;

export function inlineCode(text) {
  return [...text.matchAll(INLINE_CODE)].map((m) => ({ code: m[2].trim(), column: m.index + 1 }));
}

export function stripInlineCode(text) {
  return text.replace(INLINE_CODE, (m) => " ".repeat(m.length));
}

export function splitRow(line) {
  let body = line.trim();
  if (body.startsWith("|")) body = body.slice(1);
  if (body.endsWith("|") && !body.endsWith("\\|")) body = body.slice(0, -1);
  // Split on unescaped pipes that are not inside inline code.
  const cells = [];
  let cell = "";
  let tick = 0;
  for (let i = 0; i < body.length; i += 1) {
    const c = body[i];
    if (c === "`") tick = tick ? 0 : 1;
    if (c === "|" && !tick && body[i - 1] !== "\\") {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += c;
    }
  }
  cells.push(cell.trim());
  return cells;
}

const isSeparator = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line);

export function parseMarkdown(text) {
  const lines = text.split("\n").map((t, i) => ({ n: i + 1, text: t, inFence: false, lang: null }));
  let fence = null;
  for (const line of lines) {
    const m = /^\s*(`{3,}|~{3,})\s*([\w-]*)/.exec(line.text);
    if (fence) {
      line.inFence = true;
      line.lang = fence.lang;
      if (m && m[1][0] === fence.marker[0] && m[1].length >= fence.marker.length && !m[2]) fence = null;
    } else if (m) {
      fence = { marker: m[1], lang: m[2] || null };
      line.inFence = true;
      line.lang = fence.lang;
      line.fenceOpen = true;
    }
  }

  const headings = [];
  const seenSlugs = new Map();
  for (const line of lines) {
    if (line.inFence) continue;
    const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line.text);
    if (!m) continue;
    const base = slugify(m[2]);
    const count = seenSlugs.get(base) ?? 0;
    seenSlugs.set(base, count + 1);
    headings.push({ level: m[1].length, text: m[2], line: line.n, slug: count ? `${base}-${count}` : base });
  }

  const tables = [];
  for (let i = 0; i + 1 < lines.length; i += 1) {
    const [head, sep] = [lines[i], lines[i + 1]];
    if (head.inFence || !head.text.includes("|") || !isSeparator(sep.text)) continue;
    const headers = splitRow(head.text);
    const rows = [];
    let j = i + 2;
    while (j < lines.length && !lines[j].inFence && lines[j].text.trim().startsWith("|")) {
      rows.push({ line: lines[j].n, cells: splitRow(lines[j].text) });
      j += 1;
    }
    const heading = [...headings].reverse().find((h) => h.line < head.n) ?? null;
    tables.push({ line: head.n, headers, rows, heading });
    i = j - 1;
  }

  return { lines, headings, tables, slugs: new Set(headings.map((h) => h.slug)) };
}

/** Links outside code: { target, line, column }. */
export function links(doc) {
  const out = [];
  for (const line of doc.lines) {
    if (line.inFence) continue;
    const text = stripInlineCode(line.text);
    for (const m of text.matchAll(/!?\[(?:[^\][]|\[[^\]]*\])*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
      out.push({ target: m[1], line: line.n, column: m.index + 1 });
    }
    for (const m of text.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/g)) {
      out.push({ target: m[1], line: line.n, column: m.index + 1 });
    }
  }
  return out;
}
