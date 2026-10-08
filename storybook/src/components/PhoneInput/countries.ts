import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";

export type { CountryCode };

// Flag artwork: flag-icons 4 by 3 SVGs (MIT), bundled as asset URLs keyed by ISO code.
const FLAG_FILES = import.meta.glob("../../../node_modules/flag-icons/flags/4x3/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const FLAGS: Record<string, string> = Object.fromEntries(
  Object.entries(FLAG_FILES).map(([path, url]) => [path.slice(path.lastIndexOf("/") + 1, -4).toUpperCase(), url]),
);

/** The flag image for a country, or undefined when flag-icons has none. */
export const flagUrl = (country: CountryCode): string | undefined => FLAGS[country];

/** Countries listed first in the picker, India first. */
export const POPULAR: CountryCode[] = ["IN", "AE", "US", "GB", "SG", "SA", "QA", "KW", "OM", "BH", "TH", "MY", "AU", "CA", "NP", "LK"];

const names = new Intl.DisplayNames(["en"], { type: "region" });

export type Country = { code: CountryCode; name: string; dialCode: string };

const toCountry = (code: CountryCode): Country => ({ code, name: names.of(code) ?? code, dialCode: `+${getCountryCallingCode(code)}` });

/** Every country with a dialling code, A to Z by English name. */
export const ALL_COUNTRIES: Country[] = getCountries()
  .map(toCountry)
  .sort((a, b) => a.name.localeCompare(b.name));

export const POPULAR_COUNTRIES: Country[] = POPULAR.map(toCountry);

export const countryOf = (code: CountryCode): Country => toCountry(code);
