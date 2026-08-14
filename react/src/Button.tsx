import * as React from "react";

import "./Button.css";

/**
 * Emphasis level. This is *not* state — Primary/Secondary/Tertiary/Text describe how
 * much weight an action carries; hover/pressed/focus/disabled describe what is
 * happening to it. Two separate axes, deliberately never collapsed into one prop.
 *
 * Maps to the `Hierarchy` variant property in Figma.
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

/** Maps to the Figma `Size` property: lg = Large, md = Medium, sm = Small. */
export type ButtonSize = "lg" | "md" | "sm";

/** Maps to the Figma `Intent` property. */
export type ButtonIntent = "default" | "destructive";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Emphasis level. Figma: `Hierarchy`. */
  variant?: ButtonVariant;
  /** Figma: `Size` (Large / Medium / Small). */
  size?: ButtonSize;
  /** Figma: `Intent`. */
  intent?: ButtonIntent;
  /**
   * Stretch to fill the container. There is no full-width variant in Figma — a
   * designer expresses this by setting the instance's horizontal resizing to
   * *Fill container*. This prop is the code equivalent of that resize behaviour.
   */
  fullWidth?: boolean;
  /**
   * Show a spinner and block interaction. Separate from `disabled` because a
   * loading button can still be hovered, and separate from any notion of state
   * because loading coexists with hover rather than replacing it.
   */
  loading?: boolean;
  /** Icon before the label. Figma: the `Icon Leading` boolean plus the `Icon` swap. */
  leadingIcon?: React.ReactNode;
  /** Icon after the label. Figma: the `Icon Trailing` boolean plus the `Icon` swap. */
  trailingIcon?: React.ReactNode;
  /** The label. Figma: the `Label` text property. */
  children: React.ReactNode;
}

const Spinner = () => (
  <span className="cosmos-button__spinner" aria-hidden="true">
    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round">
      {/* Three-quarter arc — a full circle would not read as rotating. */}
      <path d="M12 2.75a9.25 9.25 0 1 1-6.54 2.71" />
    </svg>
  </span>
);

/**
 * Cosmos Button.
 *
 * Paired with the `Button` component set in the Cosmos Design Tokens Figma file.
 * Property names match on both sides on purpose: a model reading the Figma node has
 * to be able to infer the prop without a translation table.
 *
 * Two things intentionally do *not* have props, because they are not the component's
 * to decide:
 *
 * - **Hover, pressed and focus.** They exist in Figma as design-only `State`
 *   variants. Here they are `:hover`, `:active` and `:focus-visible`, handled in
 *   CSS. There is no `state` prop and there should never be one. `State=Disabled`
 *   is the one exception — it maps to the real `disabled` attribute.
 * - **Width.** The button hugs its content; `fullWidth` opts into stretching.
 *
 * Nothing here is named `type` for the component's own API — that name belongs to
 * the native `type="submit" | "button" | "reset"` attribute, which passes through.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      intent = "default",
      fullWidth = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      disabled = false,
      children,
      className,
      // Default to "button": an unspecified <button> inside a form submits it, which
      // is almost never what a design-system button is meant to do implicitly.
      type = "button",
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={className ? `cosmos-button ${className}` : "cosmos-button"}
        data-variant={variant}
        data-size={size}
        data-intent={intent}
        data-full-width={fullWidth || undefined}
        data-loading={loading || undefined}
        disabled={isDisabled}
        aria-busy={loading || undefined}
      >
        {loading ? <Spinner /> : null}
        {leadingIcon ? (
          <span className="cosmos-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span className="cosmos-button__label">{children}</span>
        {trailingIcon ? (
          <span className="cosmos-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        ) : null}
      </button>
    );
  },
);
