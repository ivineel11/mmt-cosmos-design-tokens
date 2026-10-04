import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./SegmentedControl.module.css";

export type SegmentItem = { id: string; label: string; icon?: IconName; disabled?: boolean };

export type SegmentedControlProps = {
  /** Two to five segments. */
  items: SegmentItem[];
  /** The selected segment. Leave undefined for an uncontrolled control starting at the first enabled segment. */
  value?: string;
  defaultValue?: string;
  /** Fires once, when a tap or drag ends on a different segment. */
  onChange?: (id: string) => void;
  size?: "medium" | "small";
  /** Names the group, such as "Trip type". */
  "aria-label": string;
  /** Under test: neutral (white, raised), brand (solid) or tinted (tint and outline). */
  thumbStyle?: "neutral" | "brand" | "tinted";
  /** Under test: rounded corners or fully round. */
  shape?: "rounded" | "pill";
};

/** Pixels a press must travel before it becomes a drag. */
const DRAG_THRESHOLD = 4;

/** Segmented control: components/segmented-control.md (Figma 765:186 and 764:131). */
export function SegmentedControl({ items, value, defaultValue, onChange, size = "medium", thumbStyle = "neutral", shape = "rounded", ...rest }: SegmentedControlProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? items[0]?.id;
  const [inner, setInner] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? inner;
  const selectedIndex = Math.max(0, items.findIndex((item) => item.id === selected));

  const rootRef = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; y: number; startIndex: number; onThumb: boolean; dragging: boolean; cancelled: boolean } | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [thumbPressed, setThumbPressed] = useState(false);
  const [drag, setDrag] = useState<number | null>(null); // thumb offset in px while dragging
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // segment under the dragged thumb centre

  const commit = (index: number) => {
    const item = items[index];
    if (!item || item.disabled || item.id === selected) return;
    if (value === undefined) setInner(item.id);
    onChange?.(item.id);
  };

  /** Width of one segment, and the index under a viewport x. */
  const geometry = () => {
    const root = rootRef.current!;
    const rect = root.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(root).paddingLeft);
    const width = (rect.width - 2 * pad) / items.length;
    const indexAt = (x: number) => Math.min(items.length - 1, Math.max(0, Math.floor((x - rect.left - pad) / width)));
    return { width, indexAt };
  };

  /** Nearest enabled segment to a (fractional) position. */
  const nearestEnabled = (position: number) =>
    items
      .map((item, index) => ({ index, distance: Math.abs(index - position), disabled: item.disabled }))
      .filter((entry) => !entry.disabled)
      .sort((a, b) => a.distance - b.distance)[0]?.index ?? selectedIndex;

  const reset = () => {
    press.current = null;
    setPressedIndex(null);
    setThumbPressed(false);
    setDrag(null);
    setHoverIndex(null);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const { indexAt } = geometry();
    const startIndex = indexAt(event.clientX);
    if (items[startIndex]?.disabled) return;
    const onThumb = startIndex === selectedIndex;
    press.current = { x: event.clientX, y: event.clientY, startIndex, onThumb, dragging: false, cancelled: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (onThumb) setThumbPressed(true);
    else setPressedIndex(startIndex);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p || p.cancelled) return;
    const dx = event.clientX - p.x;
    const dy = event.clientY - p.y;
    if (!p.dragging) {
      // A mostly vertical move is a scroll: cancel and return the thumb.
      if (Math.abs(dy) > DRAG_THRESHOLD * 2 && Math.abs(dy) > Math.abs(dx)) {
        p.cancelled = true;
        reset();
        return;
      }
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      p.dragging = true;
    }
    const { width, indexAt } = geometry();
    if (p.onThumb) {
      const min = -selectedIndex * width;
      const max = (items.length - 1 - selectedIndex) * width;
      const offset = Math.min(max, Math.max(min, dx));
      setDrag(offset);
      setHoverIndex(Math.round(selectedIndex + offset / width));
    } else {
      const index = indexAt(event.clientX);
      setPressedIndex(items[index]?.disabled ? null : index);
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p || p.cancelled) return reset();
    const { width, indexAt } = geometry();
    if (p.onThumb && p.dragging && drag !== null) commit(nearestEnabled(selectedIndex + drag / width));
    else if (!p.onThumb) commit(indexAt(event.clientX));
    reset();
  };

  // Radio keyboard behaviour: arrows move and select, wrapping, skipping disabled segments.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    let index = selectedIndex;
    for (let i = 0; i < items.length; i += 1) {
      index = (index + step + items.length) % items.length;
      if (!items[index].disabled) break;
    }
    commit(index);
    rootRef.current?.querySelectorAll<HTMLElement>('[role="radio"]')[index]?.focus();
  };

  const activeIndex = hoverIndex ?? selectedIndex;
  const style = { "--_count": items.length, "--_index": selectedIndex, ...(drag !== null ? { "--_drag": `${drag}px` } : {}) } as CSSProperties;

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={rest["aria-label"]}
      className={styles.root}
      style={style}
      data-size={size}
      data-style={thumbStyle}
      data-shape={shape}
      data-thumb-pressed={thumbPressed}
      data-dragging={drag !== null}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={reset}
    >
      <span className={styles.thumb} data-disabled={Boolean(items[selectedIndex]?.disabled)} aria-hidden="true" />
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          role="radio"
          aria-checked={index === selectedIndex}
          tabIndex={index === selectedIndex ? 0 : -1}
          disabled={item.disabled}
          className={styles.segment}
          data-active={index === activeIndex}
          data-pressed={pressedIndex === index}
          onKeyDown={onKeyDown}
          // Pointer selection is handled on the track (tap and drag); this covers keyboard and assistive tech.
          onClick={(event) => {
            if (event.detail === 0) commit(index);
          }}
        >
          {item.icon && <Icon name={item.icon} size="var(--segmented-control-icon-size)" className={styles.icon} />}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
