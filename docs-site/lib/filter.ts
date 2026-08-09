import type { Palette, Token, TokenData, TypeGroup } from "./types";

const includes = (haystack: string | null | undefined, needle: string) =>
  typeof haystack === "string" && haystack.toLowerCase().includes(needle);

function matchToken(token: Token, query: string) {
  return (
    includes(token.path, query) ||
    includes(token.value, query) ||
    includes(token.reference, query) ||
    includes(token.names.css, query) ||
    includes(token.names.js, query) ||
    includes(token.names.swift, query)
  );
}

const filterPalettes = (palettes: Palette[], query: string): Palette[] =>
  palettes
    .map((palette) => ({
      ...palette,
      steps: includes(palette.name, query)
        ? palette.steps
        : palette.steps.filter((step) => matchToken(step, query)),
    }))
    .filter((palette) => palette.steps.length > 0);

const filterTypography = (groups: TypeGroup[], query: string): TypeGroup[] =>
  groups
    .map((group) => ({
      ...group,
      sizes: group.sizes
        .map((size) => ({
          ...size,
          variants: size.variants.filter(
            (variant) =>
              includes(variant.path, query) ||
              includes(variant.value.fontSize, query) ||
              includes(variant.value.lineHeight, query) ||
              includes(String(variant.value.fontWeight), query) ||
              includes(variant.names.css, query),
          ),
        }))
        .filter((size) => size.variants.length > 0),
    }))
    .filter((group) => group.sizes.length > 0);

/**
 * Narrows every collection to tokens matching the search query. Returns the
 * data untouched for an empty query so the common case does no work.
 */
export function filterData(data: TokenData, rawQuery: string): TokenData {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return data;

  const tokens = (list: Token[]) => list.filter((token) => matchToken(token, query));

  return {
    ...data,
    primitives: {
      palettes: filterPalettes(data.primitives.palettes, query),
      fontFamily: tokens(data.primitives.fontFamily),
      fontWeight: tokens(data.primitives.fontWeight),
      fontSize: tokens(data.primitives.fontSize),
      lineHeight: tokens(data.primitives.lineHeight),
      spacing: tokens(data.primitives.spacing),
      borderRadius: tokens(data.primitives.borderRadius),
      iconSize: tokens(data.primitives.iconSize),
    },
    semantic: {
      colorGroups: data.semantic.colorGroups
        .map((group) => ({ ...group, tokens: tokens(group.tokens) }))
        .filter((group) => group.tokens.length > 0),
      expressive: filterPalettes(data.semantic.expressive, query),
      typography: filterTypography(data.semantic.typography, query),
      space: tokens(data.semantic.space),
      radius: tokens(data.semantic.radius),
      icon: tokens(data.semantic.icon),
    },
    contrastPairs: data.contrastPairs.filter(
      (pair) => includes(pair.text.path, query) || includes(pair.background.path, query),
    ),
  };
}

/** Section ids that still have content after filtering, used to dim the nav. */
export function populatedSections(data: TokenData): Set<string> {
  const present = new Set<string>();
  const mark = (id: string, hasContent: boolean) => {
    if (hasContent) present.add(id);
  };

  mark("primitive-palettes", data.primitives.palettes.length > 0);
  mark("semantic-colors", data.semantic.colorGroups.length > 0);
  mark("expressive", data.semantic.expressive.length > 0);
  mark("contrast", data.contrastPairs.length > 0);
  for (const group of data.semantic.typography) mark(`type-${group.id}`, group.sizes.length > 0);
  mark("spacing", data.semantic.space.length + data.primitives.spacing.length > 0);
  mark("radius", data.semantic.radius.length + data.primitives.borderRadius.length > 0);
  mark("icon-size", data.semantic.icon.length + data.primitives.iconSize.length > 0);
  mark("font-family", data.primitives.fontFamily.length > 0);
  mark("font-weight", data.primitives.fontWeight.length > 0);
  mark("font-size", data.primitives.fontSize.length > 0);
  mark("line-height", data.primitives.lineHeight.length > 0);

  return present;
}
