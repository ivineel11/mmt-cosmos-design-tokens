import { useId, type InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  /** The group key. Radios sharing a name are mutually exclusive. */
  name: string;
  label?: string;
  description?: string;
  size?: "small" | "medium" | "large";
  /** Set on every member of the group: the error belongs to the group. */
  invalid?: boolean;
  /**
   * The wrapper element. Use "span" when the control sits inside another label, such as
   * a List selection row, where the whole row is the label.
   */
  wrapper?: "label" | "span";
};

/** Radio: components/radio.md (Figma 442:415). A native radio under a drawn circle. */
export function Radio({ label, description, size = "medium", invalid = false, disabled = false, wrapper = "label", className, id, ...rest }: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const Wrapper = wrapper;
  return (
    <Wrapper className={[styles.root, className].filter(Boolean).join(" ")} data-size={size} data-invalid={invalid} data-disabled={disabled}>
      <input
        {...rest}
        id={inputId}
        type="radio"
        className={styles.input}
        disabled={disabled}
        aria-invalid={invalid && !disabled ? true : undefined}
        aria-describedby={descriptionId}
      />
      <span className={styles.control} aria-hidden="true">
        <span className={styles.dot} />
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
    </Wrapper>
  );
}
