/**
 * Server-side access to the generated token data. The file is about 2 MB, so pages pick
 * the slice they show here and hand it to client components as props; nothing imports
 * the JSON into the browser bundle.
 */
import raw from "@/data/tokens.json";
import type { BrandData, FlatToken, TokenData } from "@/lib/types";

export const data = raw as unknown as TokenData;

export type BrandSummary = { id: string; name: string };

/** Brands for the switcher, the default first. */
export const BRAND_LIST: BrandSummary[] = data.brands.map(({ id, name }) => ({ id, name }));

/** A token plus the value and alias it takes in every brand, so a client component can
 * print the right value for the brand on screen without the whole data file. */
export type BrandedToken = FlatToken & {
  byBrand: Record<string, { value: FlatToken["value"]; reference: string | null }>;
};

const brandValue = (token: FlatToken, brand: BrandData) =>
  brand.tokens[`${token.set}:${token.path}`] ?? { value: token.value, reference: token.reference };

export function branded(token: FlatToken): BrandedToken {
  return {
    ...token,
    byBrand: Object.fromEntries(data.brands.map((brand) => [brand.id, brandValue(token, brand)])),
  };
}

/** Tokens in one set whose path starts with `prefix`, for example `button.` or `color.text-`. */
export function select(set: FlatToken["set"], prefix: string): BrandedToken[] {
  return data.all.filter((token) => token.set === set && token.path.startsWith(prefix)).map(branded);
}

/** One token by set and exact path. Throws, so a renamed token fails the build. */
export function token(set: FlatToken["set"], path: string): BrandedToken {
  const found = data.all.find((entry) => entry.set === set && entry.path === path);
  if (!found) throw new Error(`Unknown ${set} token: ${path}`);
  return branded(found);
}

export type ChainLink = Pick<FlatToken, "set" | "path" | "names" | "description"> & {
  value: FlatToken["value"];
};

const lookup = (path: string) =>
  data.all.find((entry) => entry.set === "semantic" && entry.path === path) ??
  data.all.find((entry) => entry.set === "primitives" && entry.path === path);

/** The reference chain from a token down to its primitive, top tier first
 * (component → semantic → primitive), once per brand: a brand can re-point the
 * semantic link, so each brand can end on a different primitive. */
export function chainByBrand(set: FlatToken["set"], path: string): Record<string, ChainLink[]> {
  const start = data.all.find((entry) => entry.set === set && entry.path === path);
  if (!start) throw new Error(`Unknown ${set} token: ${path}`);
  return Object.fromEntries(
    data.brands.map((brand) => {
      const links: ChainLink[] = [];
      let current: FlatToken | undefined = start;
      while (current) {
        const { value, reference } = brandValue(current, brand);
        links.push({ set: current.set, path: current.path, names: current.names, description: current.description, value });
        current = reference ? lookup(reference.replace(/^\{|\}$/g, "")) : undefined;
      }
      return [brand.id, links];
    }),
  );
}

export const tokenCount = (set: FlatToken["set"]) => data.all.filter((entry) => entry.set === set).length;

/** For each semantic token under `prefix` (such as `radius.`), the components whose
 * component tokens alias it, in source order. */
export function componentsUsing(prefix: string): Record<string, string[]> {
  const usage: Record<string, string[]> = {};
  for (const entry of data.all) {
    if (entry.set !== "component" || !entry.reference?.startsWith(prefix)) continue;
    const component = entry.path.split(".")[0];
    const list = (usage[entry.reference] ??= []);
    if (!list.includes(component)) list.push(component);
  }
  return usage;
}
