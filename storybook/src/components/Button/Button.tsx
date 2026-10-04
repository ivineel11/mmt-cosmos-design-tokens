import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Button.module.css";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> & {
  /** Visible text. Word it as the action, including its consequence for destructive actions. */
  label: string;
  /** Visual priority of the action. */
  hierarchy?: "primary" | "secondary" | "tertiary" | "text";
  /** `destructive` recolours every hierarchy for an irreversible action. */
  intent?: "default" | "destructive";
  size?: "small" | "medium" | "large";
  /** The background the button sits on. `inverse` is for dark sections. */
  surface?: "default" | "inverse";
  /** Glyph before the label. Omit to hide the slot. */
  leadingIcon?: IconName;
  /** Glyph after the label. Omit to hide the slot. */
  trailingIcon?: IconName;
  /** Shows a spinner ahead of the label and sets aria-busy. The label stays. */
  isLoading?: boolean;
  /** Inert and out of the tab order. Wins over isLoading. */
  isDisabled?: boolean;
};

/** Button: components/button.md (Figma 58:202). */
export function Button({
  label,
  hierarchy = "primary",
  intent = "default",
  size = "medium",
  surface = "default",
  leadingIcon,
  trailingIcon,
  isLoading = false,
  isDisabled = false,
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const iconSize = "var(--_icon-size)";
  return (
    <button
      {...rest}
      type={type}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-hierarchy={hierarchy}
      data-intent={intent}
      data-size={size}
      data-surface={surface}
      disabled={isDisabled}
      // A disabled control is inert, so its busy state is not announced.
      aria-busy={isLoading && !isDisabled ? true : undefined}
    >
      {isLoading && <Icon name="spinner" size={iconSize} className={`${styles.icon} ${styles.spinner}`} />}
      {leadingIcon && <Icon name={leadingIcon} size={iconSize} className={styles.icon} />}
      <span>{label}</span>
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} className={styles.icon} />}
    </button>
  );
}
