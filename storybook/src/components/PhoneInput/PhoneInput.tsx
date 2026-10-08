import { useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { AsYouType, getCountryCallingCode, parsePhoneNumberFromString, validatePhoneNumberLength } from "libphonenumber-js";
import { Icon } from "../Icon/Icon";
import { Input, type InputProps } from "../Input/Input";
import { ALL_COUNTRIES, POPULAR_COUNTRIES, countryOf, flagUrl, type CountryCode } from "./countries";
import styles from "./PhoneInput.module.css";

export type PhoneValue = {
  country: CountryCode;
  /** Digits as typed, without the dial code, such as "9876543210". */
  nationalNumber: string;
  /** The full number in E.164, such as "+919876543210", once it parses. */
  e164?: string;
  /** True when the number has a valid length and pattern for the country. */
  isValid: boolean;
};

export type PhoneInputProps = Omit<InputProps, "label" | "prefix" | "start" | "value" | "defaultValue" | "onChange" | "type"> & {
  /** Visible label. */
  label?: string;
  /** The selected country, when controlled. */
  country?: CountryCode;
  /** The country selected at first, when uncontrolled. */
  defaultCountry?: CountryCode;
  onCountryChange?: (country: CountryCode) => void;
  /** National number digits, when controlled. */
  value?: string;
  /** National number digits at first, when uncontrolled. */
  defaultValue?: string;
  /** Called on every edit and country change with the parsed number. */
  onValueChange?: (phone: PhoneValue) => void;
  /** Accessible name of the country picker. */
  countryLabel?: string;
};

const digitsOf = (text: string) => text.replace(/\D/g, "");

/** The national significant number: drops a trunk prefix such as the 0 in 07400 for the UK. */
const nationalOf = (country: CountryCode, digits: string) => {
  if (!digits) return "";
  const typing = new AsYouType(country);
  typing.input(digits);
  return typing.getNationalNumber();
};

const isValidNational = (country: CountryCode, national: string) =>
  !!national && (parsePhoneNumberFromString(`+${getCountryCallingCode(country)}${national}`)?.isValid() ?? false);

/**
 * Fits what was typed or pasted to the country: a number that already carries the dial code
 * (919876543210 for India) loses it, and anything past a complete number is cut, so India
 * stops at 10 digits. An incomplete number is left as it is.
 */
const fitNational = (country: CountryCode, national: string) => {
  if (!national || isValidNational(country, national)) return national;
  const code = getCountryCallingCode(country);
  if (national.startsWith(code) && isValidNational(country, national.slice(code.length))) return national.slice(code.length);
  for (let length = national.length - 1; length > 0; length--) if (isValidNational(country, national.slice(0, length))) return national.slice(0, length);
  return national;
};

/**
 * Groups the national number the way the country writes it internationally, without the dial
 * code: 98765 43210, 50 123 4567, 7400 123456. National formats need the trunk 0 to group.
 */
const formatNational = (country: CountryCode, national: string) => {
  if (!national) return "";
  const code = getCountryCallingCode(country);
  const international = new AsYouType().input(`+${code}${national}`);
  return international.startsWith(`+${code} `) ? international.slice(code.length + 2) : international.slice(code.length + 1);
};

/**
 * PhoneInput: components/input.md, "Phone number field" (Figma Input with Show Country, 1011:900,
 * and Input / Country, 1026:410). The number is grouped as it is typed and capped at the longest
 * length the country allows. Until the country picker sheet exists, a native select picks the country.
 */
export function PhoneInput({
  label = "Mobile number",
  country: countryProp,
  defaultCountry = "IN",
  onCountryChange,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  countryLabel = "Country code",
  disabled = false,
  readOnly = false,
  onBlur,
  ...rest
}: PhoneInputProps) {
  const [countryState, setCountryState] = useState<CountryCode>(defaultCountry);
  const [digitsState, setDigitsState] = useState(() => nationalOf(countryProp ?? defaultCountry, digitsOf(defaultValue)));
  const country = countryProp ?? countryState;
  const digits = valueProp !== undefined ? nationalOf(country, digitsOf(valueProp)) : digitsState;
  const inputRef = useRef<HTMLInputElement>(null);
  const caretDigits = useRef<number | null>(null);
  const formatted = formatNational(country, digits);
  const current = countryOf(country);

  const report = (nextCountry: CountryCode, nextDigits: string) => {
    const parsed = nextDigits ? parsePhoneNumberFromString(`+${getCountryCallingCode(nextCountry)}${nextDigits}`) : undefined;
    onValueChange?.({ country: nextCountry, nationalNumber: nextDigits, e164: parsed?.number, isValid: isValidNational(nextCountry, nextDigits) });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    let next = digitsOf(input.value);
    let caret = digitsOf(input.value.slice(0, input.selectionStart ?? input.value.length)).length;
    // Deleting a space or bracket removes no digit; take out the digit before it instead.
    if (next === digits && input.value.length < formatted.length) {
      next = digits.slice(0, Math.max(caret - 1, 0)) + digits.slice(caret);
      caret = Math.max(caret - 1, 0);
    }
    // A pasted international number, such as +971 50 123 4567, also sets the country.
    const international = input.value.trim().startsWith("+") ? parsePhoneNumberFromString(input.value) : undefined;
    let nextCountry = country;
    if (international?.country) {
      nextCountry = international.country;
      next = international.nationalNumber;
      caret = next.length;
      if (countryProp === undefined) setCountryState(nextCountry);
      if (nextCountry !== country) onCountryChange?.(nextCountry);
    }
    next = fitNational(nextCountry, nationalOf(nextCountry, next));
    if (next && validatePhoneNumberLength(next, nextCountry) === "TOO_LONG") return;
    caret = Math.min(caret, next.length);
    caretDigits.current = caret;
    if (valueProp === undefined) setDigitsState(next);
    report(nextCountry, next);
  };

  // Keep the caret after the same digit once the number is regrouped.
  useLayoutEffect(() => {
    const input = inputRef.current;
    const count = caretDigits.current;
    if (!input || count === null || document.activeElement !== input) return;
    caretDigits.current = null;
    let seen = 0;
    let at = 0;
    while (at < formatted.length && seen < count) if (/\d/.test(formatted[at++])) seen++;
    input.setSelectionRange(at, at);
  }, [formatted]);

  const pickCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as CountryCode;
    if (countryProp === undefined) setCountryState(next);
    onCountryChange?.(next);
    report(next, digits);
  };

  const flag = flagUrl(country);
  const segment = (
    <div className={styles.country} data-disabled={disabled}>
      <span className={styles.selector}>
        <span className={styles.flag}>{flag && <img src={flag} alt="" />}</span>
        <span className={styles.code}>{current.dialCode}</span>
        <Icon name="chevron-down" size="var(--input-country-chevron-size)" className={styles.chevron} />
        <select className={styles.select} aria-label={countryLabel} value={country} onChange={pickCountry} disabled={disabled || readOnly}>
          <optgroup label="Popular">
            {POPULAR_COUNTRIES.map((c) => (
              <option key={`p-${c.code}`} value={c.code}>{`${c.name} (${c.dialCode})`}</option>
            ))}
          </optgroup>
          <optgroup label="All countries">
            {ALL_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{`${c.name} (${c.dialCode})`}</option>
            ))}
          </optgroup>
        </select>
      </span>
      <span className={styles.divider} aria-hidden="true" />
    </div>
  );

  return (
    <Input
      {...rest}
      ref={inputRef}
      label={label}
      start={segment}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      value={formatted}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}
