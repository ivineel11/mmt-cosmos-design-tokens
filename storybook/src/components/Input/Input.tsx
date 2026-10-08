import { useId, useRef, type InputHTMLAttributes, type ReactNode, type Ref } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Input.module.css";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & {
  /** Visible label. It rests inside an empty field and moves above the value once the field is active or has a value. */
  label: string;
  /** Hint under the field, such as a format or a character count. Carries the error message when invalid. */
  supportingText?: string;
  /** Fixed text before the value, such as +91. Shown once the field is active or has a value. */
  prefix?: string;
  /** Decorative glyph at the start of the field. */
  leadingIcon?: IconName;
  /** Glyph at the end of the field. With onTrailingIconClick it becomes a button named by trailingIconLabel. */
  trailingIcon?: IconName;
  /** Accessible name of the trailing button, such as "Show password". */
  trailingIconLabel?: string;
  onTrailingIconClick?: () => void;
  /** The Typing state: while the field is active and has a value, a Clear button empties it. */
  clearable?: boolean;
  /** Accessible name of the Clear button. */
  clearLabel?: string;
  /** Called after Clear empties the field. onChange also fires, with an empty value. */
  onClear?: () => void;
  /** Tints the field, turns the outline, label and message red, and sets aria-invalid. Disabled wins over it. */
  invalid?: boolean;
  /** Content between the leading icon and the text, such as the country segment of PhoneInput. */
  start?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

/**
 * Input: components/input.md (Figma 1011:900). A native single-line input inside the drawn field.
 * readOnly is the Read-only state, a picker trigger: it shows a chevron unless trailingIcon replaces it.
 */
export function Input({
  label,
  supportingText,
  prefix,
  leadingIcon,
  trailingIcon,
  trailingIconLabel,
  onTrailingIconClick,
  clearable = false,
  clearLabel = "Clear",
  onClear,
  invalid = false,
  disabled = false,
  readOnly = false,
  start,
  ref: forwardedRef,
  placeholder,
  className,
  id,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const setRef = (node: HTMLInputElement | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
  const autoId = useId();
  const inputId = id ?? autoId;
  const supportingId = supportingText ? `${inputId}-supporting` : undefined;
  const showError = invalid && !disabled;
  const trailing = trailingIcon ?? (readOnly ? "chevron-down" : undefined);
  const clear = () => {
    const input = ref.current;
    if (!input) return;
    // Set through the native setter and fire an input event, so a controlled field's onChange runs too.
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    onClear?.();
    input.focus();
  };
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-invalid={showError} data-disabled={disabled} data-readonly={readOnly}>
      <div className={styles.field}>
        {leadingIcon && <Icon name={leadingIcon} size="var(--input-icon-size)" className={styles.icon} />}
        {start}
        <div className={styles.content}>
          <label htmlFor={inputId} className={styles.label}>
            <span className={styles.labelText}>{label}</span>
          </label>
          <div className={styles.row}>
            {prefix && (
              <span className={styles.prefix} aria-hidden="true">
                {prefix}
              </span>
            )}
            <input
              {...rest}
              ref={setRef}
              id={inputId}
              className={styles.input}
              disabled={disabled}
              readOnly={readOnly}
              // :placeholder-shown tells CSS the field is empty, so an input without a placeholder gets a blank one.
              placeholder={placeholder ?? " "}
              aria-invalid={showError ? true : undefined}
              aria-describedby={supportingId}
            />
          </div>
        </div>
        {clearable && !disabled && !readOnly && (
          <button type="button" className={`${styles.action} ${styles.clear}`} aria-label={clearLabel} onClick={clear}>
            <Icon name="cancel" size="var(--input-icon-size)" className={styles.icon} />
          </button>
        )}
        {trailing &&
          (onTrailingIconClick ? (
            <button type="button" className={styles.action} aria-label={trailingIconLabel} onClick={onTrailingIconClick} disabled={disabled}>
              <Icon name={trailing} size="var(--input-icon-size)" className={styles.icon} />
            </button>
          ) : (
            <Icon name={trailing} size="var(--input-icon-size)" className={styles.icon} />
          ))}
      </div>
      {supportingText && (
        <p id={supportingId} className={styles.supporting}>
          {showError && <Icon name="alert-circle" size="var(--input-supporting-icon-size)" className={styles.errorIcon} />}
          <span className={styles.supportingText}>{supportingText}</span>
        </p>
      )}
    </div>
  );
}
