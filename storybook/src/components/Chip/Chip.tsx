import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Chip.module.css";

/** How the chip reports selection: a toggle (filter), a radio in a group (choice), or none (an action or menu trigger). */
export type ChipSelectionRole = "toggle" | "radio" | "none";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange"> & {
  label: string;
  /** Supporting line under the label, such as a price or a date. */
  secondaryText?: string;
  /** The value. Leave undefined for an uncontrolled chip that starts at `defaultSelected`. */
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  selectionRole?: ChipSelectionRole;
  size?: "small" | "medium" | "large";
  /** On for white canvases, off for the grey bg-secondary canvas. */
  bordered?: boolean;
  /** Glyph before the label. Mutually exclusive with `leadingImage`. */
  leadingIcon?: IconName;
  /** Image source before the label: a logo, flag, avatar or photo. Decorative. */
  leadingImage?: string;
  imageShape?: "circle" | "square";
  /** Decorative glyph after the label, such as a chevron. Ignored when `onRemove` is set. */
  trailingIcon?: IconName;
  /** Makes the chip removable: renders a separate "Remove {label}" button. */
  onRemove?: () => void;
  disabled?: boolean;
};

/** Chip: components/chip.md (Figma 559:2943). */
export function Chip({
  label,
  secondaryText,
  selected,
  defaultSelected = false,
  onSelectedChange,
  selectionRole = "toggle",
  size = "medium",
  bordered = true,
  leadingIcon,
  leadingImage,
  imageShape = "circle",
  trailingIcon,
  onRemove,
  disabled = false,
  className,
  onClick,
  ...rest
}: ChipProps) {
  const [inner, setInner] = useState(defaultSelected);
  const isSelected = selected ?? inner;
  const selectionAttrs =
    selectionRole === "toggle" ? { "aria-pressed": isSelected } : selectionRole === "radio" ? { role: "radio", "aria-checked": isSelected } : {};

  let leading: ReactNode = null;
  if (leadingImage) leading = <img className={styles.image} data-shape={imageShape} src={leadingImage} alt="" />;
  else if (leadingIcon) leading = <Icon name={leadingIcon} size="var(--_glyph)" className={styles.icon} />;

  return (
    <span
      className={[styles.surface, styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-selected={!disabled && isSelected}
      data-bordered={bordered}
      data-disabled={disabled}
    >
      <button
        {...rest}
        {...selectionAttrs}
        type="button"
        className={styles.main}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || selectionRole === "none") return;
          // A radio is set by its group: activating a selected one does not clear it.
          const next = selectionRole === "radio" ? true : !isSelected;
          if (selected === undefined) setInner(next);
          onSelectedChange?.(next);
        }}
      >
        {leading}
        <span className={styles.text}>
          <span className={styles.label}>{label}</span>
          {secondaryText && <span className={styles.secondary}>{secondaryText}</span>}
        </span>
        {!onRemove && trailingIcon && <Icon name={trailingIcon} size="var(--_glyph)" className={styles.icon} />}
      </button>
      {onRemove && (
        <button type="button" className={styles.remove} aria-label={`Remove ${label}`} disabled={disabled} onClick={onRemove}>
          <Icon name="close" size="var(--_glyph)" />
        </button>
      )}
    </span>
  );
}
