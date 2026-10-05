import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Menu.module.css";

export type MenuEntry =
  | {
      type?: "item";
      id: string;
      label: string;
      supportingText?: string;
      icon?: IconName;
      /** A shortcut such as ⌘D, or a short value. Hidden on touch. */
      meta?: string;
      /** For a shortcut meta: the aria-keyshortcuts value, such as "Meta+D". */
      keyShortcuts?: string;
      destructive?: boolean;
      disabled?: boolean;
      onSelect?: () => void;
      /** Opens a submenu; the row never runs an action itself. One level deep. */
      submenu?: MenuEntry[];
    }
  | { type: "header"; label: string }
  | { type: "divider" };

export type MenuTriggerProps = {
  ref: RefObject<HTMLButtonElement | null>;
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
  "aria-controls"?: string;
  id: string;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

export type MenuProps = {
  /** Renders the trigger button. Spread the props onto a real button. */
  trigger: (props: MenuTriggerProps) => ReactNode;
  items: MenuEntry[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Compact is web only. */
  density?: "comfortable" | "compact";
  /** Aligns the panel to the trigger's start edge, or its end edge for an overflow (⋮) menu. */
  align?: "start" | "end";
  /** single makes the rows radio items with a trailing check. */
  selectionMode?: "none" | "single";
  value?: string;
  onValueChange?: (id: string) => void;
};

const MARGIN = 8; // viewport edge margin from the spec; space-xs

/** Menu: components/menu.md (Figma 781:3973 and 781:4046). */
export function Menu({ trigger, items, open, onOpenChange, density = "comfortable", align = "start", selectionMode = "none", value, onValueChange }: MenuProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useId();
  const menuId = useId();
  const [focusOn, setFocusOn] = useState<"first" | "last">("first");

  const setOpen = useCallback(
    (next: boolean, restoreFocus = true) => {
      if (open === undefined) setInnerOpen(next);
      onOpenChange?.(next);
      if (!next && restoreFocus) triggerRef.current?.focus();
    },
    [open, onOpenChange],
  );

  const triggerProps: MenuTriggerProps = {
    ref: triggerRef,
    id: triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? menuId : undefined,
    onClick: () => {
      setFocusOn("first");
      setOpen(!isOpen, false);
    },
    onKeyDown: (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setFocusOn(event.key === "ArrowUp" ? "last" : "first");
        setOpen(true, false);
      }
    },
  };

  return (
    <>
      {trigger(triggerProps)}
      {isOpen && (
        <Panel
          id={menuId}
          labelledBy={triggerId}
          getAnchor={() => triggerRef.current}
          placement={align === "end" ? "bottom-end" : "bottom-start"}
          items={items}
          density={density}
          selectionMode={selectionMode}
          value={value}
          focusOn={focusOn}
          onSelect={(id) => {
            if (selectionMode === "single") onValueChange?.(id);
            setOpen(false);
          }}
          onClose={(restore) => setOpen(false, restore)}
        />
      )}
    </>
  );
}

type PanelProps = {
  id: string;
  labelledBy: string;
  /** The element the panel is placed against, read after render. */
  getAnchor: () => HTMLElement | null;
  placement: "bottom-start" | "bottom-end" | "right-start";
  items: MenuEntry[];
  density: "comfortable" | "compact";
  selectionMode: "none" | "single";
  value?: string;
  /** Where focus lands on open; "none" for a submenu opened by hover. */
  focusOn: "first" | "last" | "none";
  onSelect: (id: string) => void;
  onClose: (restoreFocus: boolean) => void;
  /** Submenus close back to their parent row instead of closing everything. */
  onBack?: () => void;
};

function Panel({ id, labelledBy, getAnchor, placement, items, density, selectionMode, value, focusOn, onSelect, onClose, onBack }: PanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 }); // transparent, not hidden, so focus can move in before it is placed
  const [submenu, setSubmenu] = useState<{ id: string; focusOn: "first" | "none" } | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hoverTimer = useRef<number | undefined>(undefined);

  // Place the panel: below the trigger (or right of the parent row), flipping when there is no room.
  useLayoutEffect(() => {
    const panel = ref.current;
    const anchorEl = getAnchor();
    if (!panel || !anchorEl) return;
    const a = anchorEl.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const offset = parseFloat(getComputedStyle(panel).getPropertyValue("--menu-offset")) || 4;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left: number;
    let top: number;
    let origin: string;
    if (placement === "right-start") {
      const pad = parseFloat(getComputedStyle(panel).paddingTop);
      const roomRight = a.right + offset + p.width <= vw - MARGIN;
      left = roomRight ? a.right + offset : a.left - offset - p.width;
      top = a.top - pad - parseFloat(getComputedStyle(panel).borderTopWidth);
      origin = roomRight ? "top left" : "top right";
    } else {
      left = placement === "bottom-end" ? a.right - p.width : a.left;
      const below = a.bottom + offset + p.height <= vh - MARGIN;
      top = below ? a.bottom + offset : a.top - offset - p.height;
      origin = `${below ? "top" : "bottom"} ${placement === "bottom-end" ? "right" : "left"}`;
    }
    left = Math.min(Math.max(MARGIN, left), vw - MARGIN - p.width);
    top = Math.min(Math.max(MARGIN, top), vh - MARGIN - p.height);
    setStyle({ left, top, "--_origin": origin } as CSSProperties);
  }, [getAnchor, placement]);

  const rows = () => [...(ref.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? [])];

  // Move focus into the panel on open.
  useEffect(() => {
    if (focusOn === "none") return;
    const list = rows();
    (focusOn === "last" ? list[list.length - 1] : list[0])?.focus();
  }, [focusOn]);

  // Close on a pointer press outside every open panel.
  useEffect(() => {
    if (onBack) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (getAnchor()?.contains(target)) return;
      if ([...document.querySelectorAll("[data-cosmos-menu]")].some((panel) => panel.contains(target))) return;
      onClose(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [getAnchor, onBack, onClose]);

  const activate = (entry: Extract<MenuEntry, { id: string }>, viaKeyboard: boolean) => {
    if (entry.disabled) return;
    if (entry.submenu) return setSubmenu({ id: entry.id, focusOn: viaKeyboard ? "first" : "none" });
    entry.onSelect?.();
    onSelect(entry.id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = rows();
    const index = list.indexOf(document.activeElement as HTMLElement);
    const move = (i: number) => list[(i + list.length) % list.length]?.focus();
    switch (event.key) {
      case "ArrowDown": event.preventDefault(); move(index + 1); break;
      case "ArrowUp": event.preventDefault(); move(index - 1); break;
      case "Home": event.preventDefault(); move(0); break;
      case "End": event.preventDefault(); move(list.length - 1); break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        if (onBack) onBack();
        else onClose(true);
        break;
      case "ArrowLeft":
        if (onBack) { event.preventDefault(); event.stopPropagation(); onBack(); }
        break;
      case "Tab":
        onClose(false);
        break;
    }
  };

  let group: ReactNode[] = [];
  const groups: ReactNode[] = [];
  let groupLabel: string | undefined;
  const flush = (key: string) => {
    if (!group.length) return;
    const labelId = groupLabel ? `${id}-${key}-label` : undefined;
    groups.push(
      <div key={key} role="group" aria-labelledby={labelId} className={styles.group}>
        {groupLabel && (
          <div id={labelId} className={styles.header}>
            {groupLabel}
          </div>
        )}
        {group}
      </div>,
    );
    group = [];
    groupLabel = undefined;
  };

  items.forEach((entry, index) => {
    if (entry.type === "header") {
      flush(`g${index}`);
      groupLabel = entry.label;
      return;
    }
    if (entry.type === "divider") {
      flush(`g${index}`);
      groups.push(<div key={`d${index}`} role="separator" className={styles.divider} />);
      return;
    }
    const radio = selectionMode === "single" && !entry.submenu && !entry.destructive;
    const checked = radio && entry.id === value;
    const expanded = submenu?.id === entry.id;
    group.push(
      <div
        key={entry.id}
        id={`${id}-${entry.id}-row`}
        ref={(el) => {
          rowRefs.current[entry.id] = el;
        }}
        role={radio ? "menuitemradio" : "menuitem"}
        aria-checked={radio ? checked : undefined}
        aria-disabled={entry.disabled || undefined}
        aria-haspopup={entry.submenu ? "menu" : undefined}
        aria-expanded={entry.submenu ? expanded : undefined}
        aria-keyshortcuts={entry.keyShortcuts}
        tabIndex={-1}
        className={styles.item}
        data-destructive={entry.destructive || undefined}
        onClick={() => activate(entry, false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " " || (event.key === "ArrowRight" && entry.submenu)) {
            event.preventDefault();
            event.stopPropagation();
            activate(entry, true);
          }
        }}
        onPointerMove={(event) => {
          // The pointer and the keyboard share one highlight.
          if (document.activeElement !== event.currentTarget) event.currentTarget.focus({ preventScroll: true });
          window.clearTimeout(hoverTimer.current);
          if (entry.submenu && !expanded && !entry.disabled) hoverTimer.current = window.setTimeout(() => setSubmenu({ id: entry.id, focusOn: "none" }), 100);
          else if (!entry.submenu && submenu) hoverTimer.current = window.setTimeout(() => setSubmenu(null), 100);
        }}
      >
        {entry.icon && <Icon name={entry.icon} size="var(--_lead)" className={styles.icon} />}
        <span className={styles.main}>
          <span className={styles.text}>
            <span className={styles.label}>{entry.label}</span>
            {entry.supportingText && <span className={styles.supporting}>{entry.supportingText}</span>}
          </span>
          {entry.meta && (
            <span className={styles.meta} aria-hidden={entry.keyShortcuts ? true : undefined}>
              {entry.meta}
            </span>
          )}
          {entry.submenu && <Icon name="chevron-right" size="var(--_trail)" className={styles.chevron} />}
          {checked && <Icon name="check" size="var(--_trail)" className={styles.check} />}
        </span>
      </div>,
    );
  });
  flush("end");

  const openEntry = submenu ? items.find((entry): entry is Extract<MenuEntry, { id: string }> => "id" in entry && entry.id === submenu.id) : undefined;

  return createPortal(
    <>
      <div ref={ref} id={id} role="menu" tabIndex={-1} aria-labelledby={labelledBy} data-cosmos-menu="" className={styles.panel} data-density={density} style={style} onKeyDown={onKeyDown}>
        {groups}
      </div>
      {openEntry?.submenu && (
        <Panel
          id={`${id}-${openEntry.id}`}
          labelledBy={`${id}-${openEntry.id}-row`}
          getAnchor={() => rowRefs.current[openEntry.id] ?? null}
          placement="right-start"
          items={openEntry.submenu}
          density={density}
          selectionMode="none"
          focusOn={submenu!.focusOn}
          onSelect={onSelect}
          onClose={onClose}
          onBack={() => {
            setSubmenu(null);
            rowRefs.current[openEntry.id]?.focus();
          }}
        />
      )}
    </>,
    document.body,
  );
}
