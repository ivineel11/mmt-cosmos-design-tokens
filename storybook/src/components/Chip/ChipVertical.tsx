import { useState, type ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import chip from "./Chip.module.css";
import styles from "./ChipVertical.module.css";
import type { ChipSelectionRole } from "./Chip";

export type ChipVerticalProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> & {
  label: string;
  /** What sits above the label: an icon, an image or nothing. */
  leading?: "icon" | "image" | "none";
  icon?: IconName;
  image?: string;
  imageShape?: "circle" | "square";
  secondaryText?: string;
  labelTrailingIcon?: IconName;
  secondaryTrailingIcon?: IconName;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Usually "radio": vertical chips are mostly single choice in a group. */
  selectionRole?: ChipSelectionRole;
  size?: "small" | "medium";
  /** Affects unselected chips only; selected chips always draw their border. */
  bordered?: boolean;
  disabled?: boolean;
  /** Fill the width it is given, for equal-width rows. */
  fullWidth?: boolean;
};

/** Chip / Vertical: components/chip-vertical.md (Figma 592:327). */
export function ChipVertical({
  label,
  leading = "icon",
  icon = "plus",
  image,
  imageShape = "circle",
  secondaryText,
  labelTrailingIcon,
  secondaryTrailingIcon,
  selected,
  defaultSelected = false,
  onSelectedChange,
  selectionRole = "radio",
  size = "medium",
  bordered = true,
  disabled = false,
  fullWidth = false,
  className,
  style,
  onClick,
  ...rest
}: ChipVerticalProps) {
  const [inner, setInner] = useState(defaultSelected);
  const isSelected = selected ?? inner;
  const selectionAttrs =
    selectionRole === "toggle" ? { "aria-pressed": isSelected } : selectionRole === "radio" ? { role: "radio", "aria-checked": isSelected } : {};
  return (
    <span
      className={[chip.surface, styles.root, className].filter(Boolean).join(" ")}
      style={fullWidth ? { display: "flex", ...style } : style}
      data-size={size}
      data-selected={!disabled && isSelected}
      data-bordered={bordered}
      data-disabled={disabled}
    >
      <button
        {...rest}
        {...selectionAttrs}
        type="button"
        className={`${chip.main} ${styles.stretch}`}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || selectionRole === "none") return;
          const next = selectionRole === "radio" ? true : !isSelected;
          if (selected === undefined) setInner(next);
          onSelectedChange?.(next);
        }}
      >
        {leading === "icon" && <Icon name={icon} size="var(--_glyph)" className={chip.icon} />}
        {leading === "image" && image && <img className={styles.image} data-shape={imageShape} src={image} alt="" />}
        <span className={styles.text}>
          <span className={styles.row}>
            <span className={styles.label}>{label}</span>
            {labelTrailingIcon && <Icon name={labelTrailingIcon} size="var(--_label-trailing)" className={chip.icon} />}
          </span>
          {secondaryText && (
            <span className={styles.row}>
              <span className={`${chip.secondary} ${styles.secondary}`}>{secondaryText}</span>
              {secondaryTrailingIcon && <Icon name={secondaryTrailingIcon} size="var(--_secondary-trailing)" className={chip.icon} />}
            </span>
          )}
        </span>
      </button>
    </span>
  );
}
