/**
 * A strict JSON parser that remembers where things are.
 *
 * `JSON.parse` is not enough for linting tokens/tokens.json: it silently keeps the last
 * of two duplicate keys (the classic merge-conflict failure), and it throws away every
 * position, so a diagnostic could only say *which* token is wrong, never *where*. This
 * parser returns the same value `JSON.parse` would, plus the line/column of every
 * property and a list of duplicate keys.
 *
 * Locations are keyed by `pathKey(path)`, where `path` is the array of property names
 * (and array indices) leading to the node.
 */

export class JsonSyntaxError extends Error {
  constructor(message, line, column) {
    super(message);
    this.line = line;
    this.column = column;
  }
}

export const pathKey = (path) => JSON.stringify(path);

export function parseJsonWithLocations(text) {
  let i = 0;
  let line = 1;
  let lineStart = 0;
  const locations = new Map();
  const duplicates = [];

  const here = () => ({ line, column: i - lineStart + 1 });
  const fail = (message) => {
    const { line: l, column } = here();
    throw new JsonSyntaxError(`${message} at line ${l}, column ${column}`, l, column);
  };

  function skipWhitespace() {
    while (i < text.length) {
      const c = text[i];
      if (c === "\n") {
        i += 1;
        line += 1;
        lineStart = i;
      } else if (c === " " || c === "\t" || c === "\r") {
        i += 1;
      } else {
        break;
      }
    }
  }

  function parseString() {
    // Delegate escape handling to JSON.parse on the exact literal.
    const start = i;
    i += 1;
    while (i < text.length) {
      const c = text[i];
      if (c === "\\") {
        i += 2;
      } else if (c === '"') {
        i += 1;
        return JSON.parse(text.slice(start, i));
      } else if (c === "\n") {
        fail("Unterminated string");
      } else {
        i += 1;
      }
    }
    return fail("Unterminated string");
  }

  function parseLiteral() {
    const match = /^(?:-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/.exec(
      text.slice(i, i + 64),
    );
    if (!match) fail(`Unexpected character ${JSON.stringify(text[i] ?? "end of input")}`);
    i += match[0].length;
    return JSON.parse(match[0]);
  }

  function parseValue(path) {
    skipWhitespace();
    const c = text[i];
    if (c === "{") return parseObject(path);
    if (c === "[") return parseArray(path);
    if (c === '"') return parseString();
    return parseLiteral();
  }

  function parseObject(path) {
    i += 1;
    const out = {};
    const seen = new Set();
    skipWhitespace();
    if (text[i] === "}") {
      i += 1;
      return out;
    }
    for (;;) {
      skipWhitespace();
      if (text[i] !== '"') fail("Expected a property name");
      const at = here();
      const key = parseString();
      const childPath = [...path, key];
      if (seen.has(key)) {
        duplicates.push({ path: childPath, ...at, first: locations.get(pathKey(childPath)) });
      } else {
        seen.add(key);
        locations.set(pathKey(childPath), at);
      }
      skipWhitespace();
      if (text[i] !== ":") fail("Expected ':'");
      i += 1;
      // Object.defineProperty so a key like "__proto__" is stored as data.
      Object.defineProperty(out, key, {
        value: parseValue(childPath),
        enumerable: true,
        writable: true,
        configurable: true,
      });
      skipWhitespace();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "}") {
        i += 1;
        return out;
      }
      fail("Expected ',' or '}'");
    }
  }

  function parseArray(path) {
    i += 1;
    const out = [];
    skipWhitespace();
    if (text[i] === "]") {
      i += 1;
      return out;
    }
    for (;;) {
      const childPath = [...path, out.length];
      skipWhitespace();
      locations.set(pathKey(childPath), here());
      out.push(parseValue(childPath));
      skipWhitespace();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "]") {
        i += 1;
        return out;
      }
      fail("Expected ',' or ']'");
    }
  }

  const value = parseValue([]);
  skipWhitespace();
  if (i < text.length) fail("Unexpected content after the top-level value");
  return { value, locations, duplicates };
}
