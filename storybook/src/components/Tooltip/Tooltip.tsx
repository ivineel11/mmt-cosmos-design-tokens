import { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Tooltip.module.css";

type Side = "top" | "bottom" | "left" | "right";
type Caret = "center" | "start" | "end" | "none";
type Action = { label: string; onAction?: () => void };

export type TooltipBubbleProps = {
  type?: "plain" | "rich";
  surface?: "dark" | "light" | "info";
  /** Where the bubble sits relative to its trigger. */
  side?: Side;
  caret?: Caret;
  /** Plain text. */
  label?: string;
  /** Rich only. */
  title?: string;
  message?: string;
  icon?: IconName;
  /** Rich only: an image across the top, 2:1. Decorative. */
  media?: string;
  step?: { current: number; total: number };
  secondaryAction?: Action;
  primaryAction?: Action;
  showClose?: boolean;
  onClose?: () => void;
  id?: string;
  /** Caret position along the edge, set by the floating wrapper to aim at the trigger. */
  caretPosition?: number;
  style?: CSSProperties;
};

/** The bubble with its caret: components/tooltip.md (Figma 881:362). */
export const TooltipBubble = forwardRef<HTMLDivElement, TooltipBubbleProps>(function TooltipBubble(
  { type = "plain", surface = "dark", side = "top", caret = "center", label, title, message, icon, media, step, secondaryAction, primaryAction, showClose = true, onClose, id: idProp, caretPosition, style },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const rich = type === "rich";
  const titleId = `${id}-title`;
  const stepId = step ? `${id}-step` : undefined;
  const caretStyle = caretPosition === undefined ? undefined : ({ "--_caret-pos": `${caretPosition}px` } as CSSProperties);
  return (
    <div
      ref={ref}
      id={id}
      role={rich ? "dialog" : "tooltip"}
      // A tour step is part of the name: "1 of 3, New: Filter by airline".
      aria-labelledby={rich && title ? [stepId, titleId].filter(Boolean).join(" ") : undefined}
      aria-label={rich && !title ? message : undefined}
      tabIndex={rich ? -1 : undefined}
      className={styles.bubble}
      data-type={type}
      data-surface={surface}
      data-side={side}
      data-caret={caret}
      style={{ ...caretStyle, ...style }}
    >
      <span className={styles.caret} aria-hidden="true" />
      {!rich && <span className={styles.label}>{label}</span>}
      {rich && (
        <>
          {media && <img className={styles.media} src={media} alt="" />}
          <div className={styles.body}>
            <div className={styles.header}>
              {icon && <Icon name={icon} size="var(--tooltip-icon-size)" className={styles.icon} />}
              <div className={styles.text}>
                {title && (
                  <span id={titleId} className={styles.title}>
                    {title}
                  </span>
                )}
                {message && <span className={styles.message}>{message}</span>}
              </div>
            </div>
            {(step || secondaryAction || primaryAction) && (
              <div className={styles.footer}>
                {step && <span id={stepId} className={styles.step}>{`${step.current} of ${step.total}`}</span>}
                {secondaryAction && (
                  <button type="button" className={`${styles.control} ${styles.action} ${styles.secondary}`} onClick={secondaryAction.onAction}>
                    <span>{secondaryAction.label}</span>
                  </button>
                )}
                {primaryAction && (
                  <button type="button" className={`${styles.control} ${styles.action} ${styles.primary}`} onClick={primaryAction.onAction}>
                    <span>{primaryAction.label}</span>
                  </button>
                )}
              </div>
            )}
            {/* Last in the markup, so the tab order is secondary, primary, close; CSS places it in the header. */}
            {showClose && (
              <button type="button" className={`${styles.control} ${styles.close}`} aria-label="Close" onClick={onClose}>
                <Icon name="close" size="var(--tooltip-close-icon-size)" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export type TooltipTriggerProps = {
  ref: RefObject<HTMLButtonElement | null>;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onPointerDown: (event: { pointerType: string }) => void;
  onFocus: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur: () => void;
  onClick: () => void;
};

export type TooltipProps = Omit<TooltipBubbleProps, "id" | "caretPosition" | "style" | "onClose"> & {
  /** Renders the trigger. Spread the props onto a real button with an accessible name. */
  children: (props: TooltipTriggerProps) => ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Web hover delay for Plain. Focus opens at once. */
  delay?: number;
  /** Auto-dismiss for Plain opened by touch. Rich never auto-dismisses. */
  duration?: number;
};

const OPEN_EVENT = "cosmos-tooltip-open";
const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

/**
 * Tooltip with its trigger and behaviour (components/tooltip.md, Behaviour). Plain opens on
 * hover after `delay`, on focus at once, and on tap; it stays open while the pointer is over
 * the bubble. Rich opens on click, moves focus in, and closes on Esc, outside click, close
 * or an action. One tooltip is open at a time.
 */
export function Tooltip({ children, open, onOpenChange, delay = 300, duration = 4000, ...bubble }: TooltipProps) {
  const rich = bubble.type === "rich";
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const timer = useRef<number | undefined>(undefined);
  const [place, setPlace] = useState<{ left: number; top: number; side: Side; caret?: number } | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      window.clearTimeout(timer.current);
      if (next) window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
      if (open === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [id, open, onOpenChange],
  );
  const later = (next: boolean, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(next), ms);
  };

  // One at a time: close when another tooltip opens.
  useEffect(() => {
    const onOther = (event: Event) => {
      if ((event as CustomEvent).detail !== id) setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOther);
    return () => window.removeEventListener(OPEN_EVENT, onOther);
  }, [id, setOpen]);

  // Esc closes; Rich returns focus to the trigger. Rich also closes on an outside press.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      if (rich) triggerRef.current?.focus();
    };
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!bubbleRef.current?.contains(target) && !triggerRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (rich) document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [isOpen, rich, setOpen]);

  // Rich moves focus into the bubble when opened from the trigger.
  useEffect(() => {
    if (isOpen && rich && open === undefined) bubbleRef.current?.focus();
  }, [isOpen, rich, open]);

  // Place: the preferred side, flipped when it would cross the margin, shifted along the edge;
  // the caret keeps aiming at the trigger centre.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const t = triggerRef.current?.getBoundingClientRect();
    const b = bubbleRef.current;
    if (!t || !b) return;
    const cs = getComputedStyle(b);
    const px = (name: string) => parseFloat(cs.getPropertyValue(name));
    const gap = px("--tooltip-offset") + px("--tooltip-caret-width") / 2; // trigger to bubble edge
    const margin = px("--tooltip-viewport-margin");
    const inset = px("--tooltip-caret-inset") + px("--tooltip-caret-width") / 2;
    const w = b.offsetWidth;
    const h = b.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fits = (side: Side) =>
      side === "top" ? t.top - gap - h >= margin : side === "bottom" ? t.bottom + gap + h <= vh - margin : side === "left" ? t.left - gap - w >= margin : t.right + gap + w <= vw - margin;
    const preferred = bubble.side ?? "top";
    const side = fits(preferred) || !fits(OPPOSITE[preferred]) ? preferred : OPPOSITE[preferred];
    const vertical = side === "top" || side === "bottom";
    const cx = t.left + t.width / 2;
    const cy = t.top + t.height / 2;
    const along = vertical ? w : h;
    const caretAt = bubble.caret === "start" ? inset : bubble.caret === "end" ? along - inset : along / 2;
    let left = vertical ? cx - caretAt : side === "left" ? t.left - gap - w : t.right + gap;
    let top = vertical ? (side === "top" ? t.top - gap - h : t.bottom + gap) : cy - caretAt;
    left = Math.min(Math.max(margin, left), vw - margin - w);
    top = Math.min(Math.max(margin, top), vh - margin - h);
    const caret = Math.min(Math.max(inset, (vertical ? cx - left : cy - top)), along - inset);
    setPlace({ left, top, side, caret });
  }, [isOpen, bubble.side, bubble.caret, bubble.label, bubble.title, bubble.message]);

  // Plain on touch auto-dismisses.
  const touchOpened = useRef(false);
  useEffect(() => {
    if (!isOpen || rich || !touchOpened.current) return;
    const t = window.setTimeout(() => setOpen(false), duration);
    return () => window.clearTimeout(t);
  }, [isOpen, rich, duration, setOpen]);

  const triggerProps: TooltipTriggerProps = {
    ref: triggerRef,
    "aria-describedby": rich ? undefined : id,
    "aria-expanded": rich ? isOpen : undefined,
    "aria-controls": rich && isOpen ? id : undefined,
    onPointerEnter: () => {
      if (!rich && !touchOpened.current) later(true, delay);
    },
    onPointerLeave: () => {
      if (!rich && !touchOpened.current) later(false, 100);
    },
    onPointerDown: (event) => {
      touchOpened.current = event.pointerType === "touch";
    },
    onFocus: (event) => {
      if (!rich && event.currentTarget.matches(":focus-visible")) setOpen(true);
    },
    onBlur: () => {
      if (!rich) setOpen(false);
    },
    onClick: () => {
      if (rich || touchOpened.current) setOpen(!isOpen);
    },
  };

  const side = place?.side ?? bubble.side ?? "top";
  const enter: CSSProperties = side === "top" ? { "--_enter-y": "var(--tooltip-offset)" } as CSSProperties : side === "bottom" ? { "--_enter-y": "calc(-1 * var(--tooltip-offset))" } as CSSProperties : side === "left" ? { "--_enter-x": "var(--tooltip-offset)" } as CSSProperties : { "--_enter-x": "calc(-1 * var(--tooltip-offset))" } as CSSProperties;

  return (
    <>
      {children(triggerProps)}
      {/* Both stay mounted and hidden when closed: Plain so aria-describedby always resolves,
          and both so the bubble can fade out (CSS keeps it displayed until the fade ends).
          A closed Rich bubble is inert, so its buttons leave the tab order at once. */}
      {createPortal(
        <div
          className={styles.floating}
          hidden={!isOpen}
          inert={(rich && !isOpen) || undefined}
          style={{ left: place?.left ?? 0, top: place?.top ?? 0, opacity: place ? undefined : 0, ...enter }}
          onPointerEnter={() => !rich && window.clearTimeout(timer.current)}
          onPointerLeave={() => !rich && later(false, 100)}
        >
          <TooltipBubble
            {...bubble}
            ref={bubbleRef}
            id={id}
            side={side}
            caretPosition={place?.caret}
            onClose={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            secondaryAction={bubble.secondaryAction && { ...bubble.secondaryAction, onAction: () => { bubble.secondaryAction?.onAction?.(); setOpen(false); triggerRef.current?.focus(); } }}
            primaryAction={bubble.primaryAction && { ...bubble.primaryAction, onAction: () => { bubble.primaryAction?.onAction?.(); setOpen(false); triggerRef.current?.focus(); } }}
          />
        </div>,
        document.body,
      )}
    </>
  );
}
