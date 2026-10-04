import { useState, type ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Switch.module.css";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "children"> & {
  /** The value. Leave undefined for an uncontrolled switch that starts at `defaultChecked`. */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Fires as soon as the switch is toggled. Apply the setting right away. */
  onChange?: (checked: boolean) => void;
  /** Small is for pointer-first web layouts only. */
  size?: "medium" | "small";
  /** Adds a check (on) or close (off) glyph so the value does not rely on colour. */
  showIcon?: boolean;
  disabled?: boolean;
};

/**
 * Switch: components/switch.md (Figma 731:172). Renders no label of its own: name it
 * with the row text through `aria-labelledby`, a wrapping `label`, or `aria-label`.
 */
export function Switch({ checked, defaultChecked = false, onChange, size = "medium", showIcon = false, disabled = false, className, onClick, ...rest }: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const isOn = checked ?? inner;
  return (
    <button
      {...rest}
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      data-size={size}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (checked === undefined) setInner(!isOn);
        onChange?.(!isOn);
      }}
    >
      <span className={styles.thumb}>{showIcon && <Icon name={isOn ? "check" : "close"} size="var(--_glyph)" />}</span>
    </button>
  );
}
