import type { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  type?: "count" | "text" | "dot";
  /** For `type="count"`. Above `max` it shows "{max}+"; 0 hides the badge. */
  count?: number;
  max?: number;
  /** For `type="text"`. One or two words in sentence case. */
  label?: string;
  /** Defaults to warning for count and dot, neutral for text. */
  intent?: "neutral" | "brand" | "info" | "success" | "caution" | "warning";
  /** Ignored for dots, which are always strong. */
  emphasis?: "strong" | "subtle";
  size?: "small" | "medium";
  /**
   * What a screen reader says. Badges are hidden from assistive tech by default
   * because the host should carry the meaning ("Notifications, 3 new"); pass this
   * only when the badge stands alone.
   */
  accessibilityLabel?: string;
};

/** Badge: components/badge.md (Figma 683:2823). Never focusable, never interactive. */
export function Badge({
  type = "count",
  count = 0,
  max = 99,
  label = "",
  intent,
  emphasis = "strong",
  size = "small",
  accessibilityLabel,
  className,
  ...rest
}: BadgeProps) {
  if (type === "count" && count <= 0) return null;
  const resolvedIntent = intent ?? (type === "text" ? "neutral" : "warning");
  const content = type === "count" ? (count > max ? `${max.toLocaleString()}+` : count.toLocaleString()) : type === "text" ? label : null;
  const a11y = accessibilityLabel ? { role: "img" as const, "aria-label": accessibilityLabel } : { "aria-hidden": true as const };
  return (
    <span
      {...rest}
      {...(type === "text" && !accessibilityLabel ? {} : a11y)}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-type={type}
      data-intent={resolvedIntent}
      data-emphasis={type === "dot" ? "strong" : emphasis}
      data-size={size}
    >
      {content}
    </span>
  );
}
