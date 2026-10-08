import { useId, type InputHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Input.module.css";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & {
  /** Visible label. It rests inside an empty field and moves above the value on focus or input. */
  label: string;
  /** Hint under the field, such as a format or a character count. Carries the error message when invalid. */
  supportingText?: string;
  /** Fixed text before the value, such as +91. Shown once the field has focus or a value. */
  prefix?: string;
  /** Decorative glyph at the start of the field. */
  leadingIcon?: IconName;
  /** Glyph at the end of the field. With onTrailingIconClick it becomes a button named by trailingIconLabel. */
  trailingIcon?: IconName;
  /** Accessible name of the trailing button, such as "Clear" or "Show password". */
  trailingIconLabel?: string;
  onTrailingIconClick?: () => void;
  /** Tints the field, turns the outline, label and message red, and sets aria-invalid. Disabled wins over it. */
  invalid?: boolean;
};

/** Input: components/input.md (Figma 1011:900). A native single-line input inside the drawn field. */
export function Input({
  label,
  supportingText,
  prefix,
  leadingIcon,
  trailingIcon,
  trailingIconLabel,
  onTrailingIconClick,
  invalid = false,
  disabled = false,
  placeholder,
  className,
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const supportingId = supportingText ? `${inputId}-supporting` : undefined;
  const showError = invalid && !disabled;
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-invalid={showError} data-disabled={disabled}>
      <div className={styles.field}>
        {leadingIcon && <Icon name={leadingIcon} size="var(--input-icon-size)" className={styles.icon} />}
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
              id={inputId}
              className={styles.input}
              disabled={disabled}
              // :placeholder-shown tells CSS the field is empty, so an input without a placeholder gets a blank one.
              placeholder={placeholder ?? " "}
              aria-invalid={showError ? true : undefined}
              aria-describedby={supportingId}
            />
          </div>
        </div>
        {trailingIcon &&
          (onTrailingIconClick ? (
            <button type="button" className={styles.action} aria-label={trailingIconLabel} onClick={onTrailingIconClick} disabled={disabled}>
              <Icon name={trailingIcon} size="var(--input-icon-size)" className={styles.icon} />
            </button>
          ) : (
            <Icon name={trailingIcon} size="var(--input-icon-size)" className={styles.icon} />
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
