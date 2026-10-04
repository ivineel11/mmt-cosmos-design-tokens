import { useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Checkbox.module.css";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  /** Visible text. Omit only for a bare box, and then pass `aria-label`. */
  label?: string;
  /** Supporting copy under the label; carries the error message when invalid. */
  description?: string;
  /** Partly-checked parent. Shows the dash and reports aria-checked="mixed". */
  indeterminate?: boolean;
  size?: "small" | "medium" | "large";
  /** Recolours the box and description and sets aria-invalid. Disabled wins over it. */
  invalid?: boolean;
};

/** Checkbox: components/checkbox.md (Figma 427:62). A native checkbox under a drawn box. */
export function Checkbox({ label, description, indeterminate = false, size = "medium", invalid = false, disabled = false, className, id, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  // Indeterminate is a DOM property, not an attribute.
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={[styles.root, className].filter(Boolean).join(" ")} data-size={size} data-invalid={invalid} data-disabled={disabled}>
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        aria-invalid={invalid && !disabled ? true : undefined}
        aria-describedby={descriptionId}
      />
      <span className={styles.control} aria-hidden="true">
        <Icon name="check" size="var(--_glyph)" className={`${styles.glyph} ${styles.check}`} />
        <Icon name="minus" size="var(--_glyph)" className={`${styles.glyph} ${styles.minus}`} />
      </span>
      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && (
            <span id={descriptionId} className={styles.description}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
