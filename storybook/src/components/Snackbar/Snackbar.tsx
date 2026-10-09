import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import { afterExit } from "../presence";
import styles from "./Snackbar.module.css";

export type SnackbarIntent = "neutral" | "info" | "success" | "caution" | "warning";
export type DismissReason = "timeout" | "action" | "close" | "escape" | "replaced" | "programmatic";

export type SnackbarProps = {
  /** One or two lines. */
  message: string;
  /** A bold line above the message, for richer web toasts. */
  title?: string;
  /** On trial: inverse (near-black bar) or tinted (light intent surface). */
  appearance?: "inverse" | "tinted";
  /** Sets the default glyph and the colours. Warning means an error. */
  intent?: SnackbarIntent;
  /** Defaults to the intent glyph; false hides it. Decorative. */
  icon?: IconName | false;
  /** One action at most. Activating it also dismisses with reason "action". */
  action?: { label: string; onAction?: () => void };
  showClose?: boolean;
  /** short = 4 s, long = 7 s. With an action it is at least long. */
  duration?: "short" | "long" | "indefinite" | number;
  /** auto stacks when the action would squeeze the message below about 60% of the width. */
  layout?: "auto" | "inline" | "stacked";
  onDismiss?: (reason: DismissReason) => void;
};

const INTENT_ICON: Record<SnackbarIntent, IconName> = { neutral: "check", info: "info", success: "check-circle", caution: "alert-triangle", warning: "alert-circle" };

const durationMs = (duration: SnackbarProps["duration"], hasAction: boolean) => {
  if (duration === "indefinite") return null;
  const ms = typeof duration === "number" ? duration : duration === "long" ? 7000 : 4000;
  return hasAction ? Math.max(ms, 7000) : ms;
};

/**
 * Snackbar: components/snackbar.md (Figma 637:3233). It never takes focus. The timer
 * pauses while the pointer is over it or focus is inside it, and restarts in full.
 */
export function Snackbar({ message, title, appearance = "inverse", intent = "neutral", icon, action, showClose = false, duration = "short", layout = "auto", onDismiss }: SnackbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [autoStacked, setAutoStacked] = useState(false);
  const glyph = icon === false ? null : (icon ?? INTENT_ICON[intent]);
  const ms = durationMs(duration, Boolean(action));

  useEffect(() => {
    if (ms === null || paused || !onDismiss) return;
    const timer = window.setTimeout(() => onDismiss("timeout"), ms);
    return () => window.clearTimeout(timer);
  }, [ms, paused, onDismiss]);

  // auto: stack when the action takes more than 40% of the width, leaving the message under 60%.
  useLayoutEffect(() => {
    if (layout !== "auto" || !action) return;
    const root = ref.current;
    const actionEl = root?.querySelector<HTMLElement>("[data-action]");
    if (!root || !actionEl) return;
    setAutoStacked(actionEl.offsetWidth > root.clientWidth * 0.4);
  }, [layout, action, message]);

  const stacked = layout === "stacked" || (layout === "auto" && Boolean(action) && autoStacked);

  // Esc dismisses the snackbar on screen (the most recent one).
  useEffect(() => {
    if (!onDismiss) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss("escape");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  const content = (
    <div className={styles.content}>
      {glyph && <Icon name={glyph} size="var(--snackbar-icon-size)" className={styles.icon} />}
      <div className={styles.text}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
  const actionButton = action && (
    <button
      type="button"
      data-action=""
      className={`${styles.control} ${styles.action}`}
      onClick={() => {
        // Dismiss first, so an action that shows a follow-up message is not dismissed with it.
        onDismiss?.("action");
        action.onAction?.();
      }}
    >
      <span>{action.label}</span>
    </button>
  );
  const closeButton = showClose && (
    <button type="button" aria-label="Dismiss notification" className={`${styles.control} ${styles.close}`} onClick={() => onDismiss?.("close")}>
      <Icon name="close" size="var(--snackbar-close-icon-size)" />
    </button>
  );

  return (
    <div
      ref={ref}
      className={styles.root}
      data-appearance={appearance}
      data-intent={intent}
      data-layout={stacked ? "stacked" : "inline"}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
    >
      {stacked ? (
        <>
          <div className={styles.top}>
            {content}
            {closeButton}
          </div>
          {actionButton && <div className={styles.actions}>{actionButton}</div>}
        </>
      ) : (
        <>
          {content}
          {actionButton}
          {closeButton}
        </>
      )}
    </div>
  );
}

type Queued = SnackbarProps & { key: number };

/**
 * One snackbar at a time, first in first out. `replace` shows a message at once in place
 * of the current one (reason "replaced"), such as "Retrying…" after "Payment failed".
 */
export function useSnackbarQueue() {
  const [queue, setQueue] = useState<Queued[]>([]);
  const counter = useRef(0);
  const show = useCallback((props: SnackbarProps) => setQueue((q) => [...q, { ...props, key: ++counter.current }]), []);
  const replace = useCallback((props: SnackbarProps) => {
    setQueue((q) => {
      q[0]?.onDismiss?.("replaced");
      return [{ ...props, key: ++counter.current }, ...q.slice(1)];
    });
  }, []);
  const dismiss = useCallback((reason: DismissReason = "programmatic") => {
    setQueue((q) => {
      q[0]?.onDismiss?.(reason);
      return q.slice(1);
    });
  }, []);
  return { current: queue[0] ?? null, show, replace, dismiss };
}

/**
 * Where snackbars appear: bottom of the screen, full width minus margins on mobile and
 * hugging 288 to 560 px on wider screens (widths the spec leaves untokenised). The two live
 * regions exist before a message arrives, so screen readers announce it: polite for every
 * intent except warning, which is assertive. A dismissed snackbar fades out before the next
 * one enters (spec, Motion: Replace).
 */
export function SnackbarViewport({ current, onDismiss, contained = false }: { current: Queued | null; onDismiss: (reason: DismissReason) => void; contained?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  // The snackbar on screen. It lags `current` while a dismissed one fades out.
  const [shown, setShown] = useState(current);
  const [leaving, setLeaving] = useState(false);
  if (current?.key !== shown?.key && !leaving) {
    if (shown) setLeaving(true);
    else setShown(current);
  }
  useEffect(() => {
    if (!leaving) return;
    return afterExit(viewport.current?.querySelector("[data-exiting] > *") ?? null, () => {
      setLeaving(false);
      setShown(null);
    });
  }, [leaving]);
  const visible = leaving ? shown : current;

  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth >= 600);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 600px)");
    const update = () => setWide(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const size: CSSProperties = wide ? { minWidth: 288, maxWidth: 560 } : { width: "100%" };
  const { key, ...props } = visible ?? { key: 0 };
  // While leaving, the snackbar no longer times out or answers Esc, and is inert.
  const region = (assertive: boolean): ReactNode => {
    const here = visible && (visible.intent === "warning") === assertive;
    return (
      <div role={assertive ? "alert" : "status"} style={visible ? size : undefined} data-exiting={(here && leaving) || undefined} inert={(here && leaving) || undefined}>
        {here && <Snackbar key={key} {...(props as SnackbarProps)} onDismiss={leaving ? undefined : onDismiss} />}
      </div>
    );
  };
  return (
    <div ref={viewport} className={styles.viewport} style={contained ? { position: "absolute" } : undefined}>
      {region(false)}
      {region(true)}
    </div>
  );
}
