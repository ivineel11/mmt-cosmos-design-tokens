import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Badge, type BadgeProps } from "../Badge/Badge";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Tabs.module.css";

export type TabItem = {
  id: string;
  label: string;
  /** Primary only, and required there in product use. */
  icon?: IconName;
  /** A count or a dot. Never shown on a disabled tab. */
  badge?: Pick<BadgeProps, "type" | "count" | "intent" | "emphasis">;
  disabled?: boolean;
};

export type TabsProps = {
  /** Primary puts an icon above the label; Secondary is label only. */
  type?: "primary" | "secondary";
  items: TabItem[];
  /** The selected tab. Leave undefined for an uncontrolled list starting at the first enabled tab. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** auto is fixed when every tab fits at its hug width, and scrollable otherwise. */
  layout?: "auto" | "fixed" | "scrollable";
  /** The 1px track line under the row. */
  showTrack?: boolean;
  /** Names the group for assistive tech, such as "Lines of business". */
  "aria-label": string;
  /** Prefix for tab and panel ids, so tabs can point at their panels with aria-controls. */
  idPrefix?: string;
};

/** What a badge adds to the tab name: "3 new" or "new". */
const badgeText = (badge: TabItem["badge"]) => (!badge ? "" : badge.type === "dot" ? "new" : badge.count ? `${badge.count > 99 ? "99+" : badge.count} new` : "");

/** Tabs: components/tab.md (Figma 694:2811 and 697:59). */
export function Tabs({ type = "secondary", items, value, defaultValue, onChange, layout = "auto", showTrack = true, idPrefix, ...rest }: TabsProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? items[0]?.id;
  const [inner, setInner] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? inner;
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; width: number } | null>(null);

  // Size the indicator to the selected tab, inset by the tab padding, and keep it in view.
  useLayoutEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tab) return;
    const measure = () => {
      const inset = parseFloat(getComputedStyle(tab).paddingLeft);
      setIndicator({ x: tab.offsetLeft + inset, width: tab.offsetWidth - 2 * inset });
    };
    measure();
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: Math.max(0, tab.offsetLeft - parseFloat(getComputedStyle(tab).paddingLeft)), behavior: "smooth" });
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selected, items, type, layout]);

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  // Manual activation: arrows move focus, Enter or Space selects. Disabled tabs are skipped.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabs = [...(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [])];
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    const next =
      event.key === "ArrowRight" ? (current + 1) % tabs.length : event.key === "ArrowLeft" ? (current - 1 + tabs.length) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    tabs[next].focus();
  };

  const selectedItem = items.find((item) => item.id === selected);

  return (
    <div className={styles.bar} data-track={showTrack}>
      <div ref={listRef} role="tablist" aria-label={rest["aria-label"]} className={styles.list} data-type={type} data-layout={layout}>
        {items.map((item) => {
          const isSelected = item.id === selected;
          const badge = !item.disabled && item.badge && (item.badge.type === "dot" || (item.badge.count ?? 0) > 0) ? item.badge : undefined;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={idPrefix ? `${idPrefix}-tab-${item.id}` : undefined}
              aria-controls={idPrefix ? `${idPrefix}-panel-${item.id}` : undefined}
              aria-selected={isSelected}
              // A badge adds to the name: "Rooms, 3 new". The visual badge is hidden.
              aria-label={badge ? `${item.label}, ${badgeText(badge)}` : undefined}
              onKeyDown={onKeyDown}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={styles.tab}
              onClick={() => select(item.id)}
            >
              {type === "primary" && item.icon && (
                <span className={styles.iconSlot}>
                  <Icon name={item.icon} size="var(--tab-primary-icon-size)" />
                  {badge && <Badge {...badge} className={styles.iconBadge} />}
                </span>
              )}
              <span className={styles.label}>{item.label}</span>
              {type === "secondary" && badge && <Badge {...badge} />}
            </button>
          );
        })}
        {indicator && (
          <span className={styles.indicator} data-disabled={Boolean(selectedItem?.disabled)} style={{ width: indicator.width, transform: `translateX(${indicator.x}px)` }} />
        )}
      </div>
    </div>
  );
}
