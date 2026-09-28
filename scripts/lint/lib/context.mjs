/**
 * Shared, lazily-computed facts about the repository that rules read from. Everything
 * is cached for the run, so ten rules asking for tokens.json parse it once.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { JsonSyntaxError, parseJsonWithLocations } from "./json-source.mjs";
import { buildTokenModel } from "./tokens.mjs";

export const TOKENS_FILE = "tokens/tokens.json";

const toPosix = (p) => p.split(sep).join("/");

export function createContext(root, { tokensFile = TOKENS_FILE } = {}) {
  const cache = new Map();
  const once = (key, compute) => {
    if (!cache.has(key)) cache.set(key, compute());
    return cache.get(key);
  };

  const abs = (rel) => join(root, rel);
  const read = (rel) => {
    try {
      return readFileSync(abs(rel), "utf8");
    } catch {
      return null;
    }
  };

  const ctx = {
    root,
    abs,
    read,
    exists: (rel) => existsSync(abs(rel)),
    tokensFile,

    /** Parsed tokens file: { text, value, locations, duplicates, model } or { error }. */
    tokens: () =>
      once("tokens", () => {
        const text = read(tokensFile);
        if (text === null) return { text: null, error: { message: `${tokensFile} is missing` } };
        try {
          const parsed = parseJsonWithLocations(text);
          return { text, ...parsed, model: buildTokenModel(parsed.value, parsed.locations) };
        } catch (error) {
          if (error instanceof JsonSyntaxError) {
            return { text, error: { message: error.message, line: error.line, column: error.column } };
          }
          throw error;
        }
      }),

    /**
     * Files in the repo that are tracked or would be (untracked but not ignored). Falls
     * back to a directory walk when git is unavailable, skipping the usual build dirs.
     */
    files: () =>
      once("files", () => {
        try {
          const out = execFileSync(
            "git",
            ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
            { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
          );
          return out
            .split("\0")
            .filter(Boolean)
            .filter((f) => existsSync(abs(f)));
        } catch {
          const skip = new Set(["node_modules", ".git", ".next", "out", ".uspec-cache"]);
          const found = [];
          const walk = (dir) => {
            for (const name of readdirSync(dir)) {
              if (skip.has(name)) continue;
              const full = join(dir, name);
              if (statSync(full).isDirectory()) walk(full);
              else found.push(toPosix(relative(root, full)));
            }
          };
          walk(root);
          return found;
        }
      }),

    /** Custom properties declared in the generated CSS. */
    distCssVars: () =>
      once("distCssVars", () => {
        const css = read("dist/web/tokens.css");
        if (css === null) return null;
        return new Set([...css.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1]));
      }),

    /** `CosmosTokens.<name>` members across the Swift and Kotlin outputs. */
    platformNames: () =>
      once("platformNames", () => {
        const names = new Set();
        for (const file of ["dist/ios/CosmosTokens.swift", "dist/android/CosmosTokens.kt"]) {
          const src = read(file);
          if (src === null) return null;
          for (const m of src.matchAll(/\b(?:static let|val)\s+(\w+)\s*=/g)) names.add(m[1]);
        }
        return names;
      }),
  };
  return ctx;
}
