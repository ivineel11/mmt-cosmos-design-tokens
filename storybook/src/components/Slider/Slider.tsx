import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import styles from "./Slider.module.css";

type Value = number | [number, number];

export type SliderProps = {
  /** A number for a single slider; a [min, max] pair makes it a range slider. Leave undefined for uncontrolled. */
  value?: Value;
  defaultValue?: Value;
  min?: number;
  max?: number;
  /** Leave unset for Continuous. When set, thumbs snap to steps. */
  step?: number;
  /** A mark at each step. Use only with 12 steps or fewer. */
  showTicks?: boolean;
  /** Range only: the closest the two thumbs can get. Defaults to one step. */
  minGap?: number;
  /** Names the slider in the header and for assistive tech. */
  label: string;
  /** Formats the header, tooltip, limits and spoken value. Without a step it receives the value rounded to a whole number. Defaults to the number. */
  formatValue?: (value: number) => string;
  showHeader?: boolean;
  showLimits?: boolean;
  /** Shows the value over a thumb while it is held or focused. */
  showTooltip?: boolean;
  tooltipCaret?: boolean;
  size?: "medium" | "small";
  disabled?: boolean;
  /** Under test: a halo behind the held thumb, or the thumb grows. */
  pressStyle?: "halo" | "grow";
  /** Fires as the value changes during a drag. */
  onChange?: (value: Value) => void;
  /** Fires once on release. Use it to fetch new results. */
  onChangeEnd?: (value: Value) => void;
};

type ThumbState = "default" | "hover" | "pressed";

/** Slider: components/slider.md (Figma 811:1622). */
export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step,
  showTicks = false,
  minGap,
  label,
  formatValue,
  showHeader = true,
  showLimits = false,
  showTooltip = true,
  tooltipCaret = true,
  size = "medium",
  disabled = false,
  pressStyle = "halo",
  onChange,
  onChangeEnd,
}: SliderProps) {
  // A continuous drag lands between whole numbers, so every label shows the rounded value.
  const format = (v: number) => (formatValue ?? String)(step ? v : Math.round(v));
  const [inner, setInner] = useState<Value>(defaultValue ?? min);
  const current = value ?? inner;
  const isRange = Array.isArray(current);
  const values = isRange ? current : [current];
  const gap = isRange ? (minGap ?? step ?? 0) : 0;

  const labelId = useId();
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null); // thumb being dragged
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null); // thumb showing the focus ring
  // A press focuses its thumb from script, which some browsers count as :focus-visible.
  // The slider tracks the input itself so a press never shows the keyboard focus ring.
  const pointerFocus = useRef(false);
  const latest = useRef<Value>(current);

  const pct = (v: number) => (max === min ? 0 : (v - min) / (max - min));
  const snap = (v: number) => {
    const clamped = Math.min(max, Math.max(min, v));
    return step ? Math.round((clamped - min) / step) * step + min : clamped;
  };

  const update = (index: number, raw: number) => {
    let next = snap(raw);
    if (isRange) next = index === 0 ? Math.min(next, values[1] - gap) : Math.max(next, values[0] + gap);
    if (next === values[index]) return;
    const nextValue: Value = isRange ? (index === 0 ? [next, values[1]] : [values[0], next]) : next;
    latest.current = nextValue;
    if (value === undefined) setInner(nextValue);
    onChange?.(nextValue);
  };

  /** Value under a viewport x, mapped onto the inset travel. */
  const valueAt = (clientX: number) => {
    const row = rowRef.current!;
    const rect = row.getBoundingClientRect();
    const thumb = parseFloat(getComputedStyle(row).getPropertyValue("--_thumb")) || 0;
    const ratio = (clientX - rect.left - thumb / 2) / Math.max(1, rect.width - thumb);
    return min + Math.min(1, Math.max(0, ratio)) * (max - min);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    const target = valueAt(event.clientX);
    // A tap moves the nearest thumb; between two thumbs at the same point, the one that can move that way.
    const index = !isRange ? 0 : Math.abs(target - values[0]) < Math.abs(target - values[1]) || (values[0] === values[1] && target < values[0]) ? 0 : 1;
    event.currentTarget.setPointerCapture(event.pointerId);
    setActive(index);
    latest.current = current;
    update(index, target);
    pointerFocus.current = true;
    setFocused(null); // a press hides a ring the keyboard left, as :focus-visible does
    (rowRef.current?.querySelectorAll<HTMLElement>('[role="slider"]')[index])?.focus({ preventScroll: true });
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (active !== null) update(active, valueAt(event.clientX));
  };
  const onPointerUp = () => {
    pointerFocus.current = false;
    if (active === null) return;
    setActive(null);
    onChangeEnd?.(latest.current);
  };

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLSpanElement>) => {
    if (disabled) return;
    const unit = step ?? (max - min) / 100;
    const page = Math.max(unit, (max - min) / 10);
    const v = values[index];
    const next =
      event.key === "ArrowRight" || event.key === "ArrowUp" ? v + unit
        : event.key === "ArrowLeft" || event.key === "ArrowDown" ? v - unit
          : event.key === "PageUp" ? v + page
            : event.key === "PageDown" ? v - page
              : event.key === "Home" ? min
                : event.key === "End" ? max
                  : null;
    if (next === null) return;
    event.preventDefault();
    setFocused(index); // the keyboard took over from a press, as :focus-visible does
    latest.current = current;
    update(index, next);
    onChangeEnd?.(latest.current);
  };

  const headerValue = isRange ? `${format(values[0])} – ${format(values[1])}` : format(values[0]);
  const fillStart = isRange ? pct(values[0]) : 0;
  const fillEnd = pct(values[values.length - 1]);
  const at = (ratio: number) => `calc(var(--_thumb) / 2 + (100% - var(--_thumb)) * ${ratio})`;
  const ticks = showTicks && step ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step) : [];
  const thumbState = (index: number): ThumbState => (disabled ? "default" : active === index ? "pressed" : hovered === index && active === null ? "hover" : "default");

  return (
    // A labelled group, marked disabled as a whole so its greyed text reads as an inactive control.
    <div role="group" aria-labelledby={showHeader ? labelId : undefined} aria-label={showHeader ? undefined : label} aria-disabled={disabled || undefined} className={styles.root} data-size={size} data-disabled={disabled} data-press={pressStyle}>
      {showHeader && (
        <div className={styles.header}>
          <span id={labelId} className={styles.label}>{label}</span>
          <span className={styles.value} aria-hidden="true">
            {headerValue}
          </span>
        </div>
      )}
      <div className={styles.body} data-tooltip={showTooltip}>
        <div ref={rowRef} className={styles.row} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          <span className={styles.track} />
          {/* Single: from the track start to the thumb. Range: between the two thumbs. */}
          <span
            className={styles.fill}
            style={isRange ? { left: at(fillStart), width: `calc((100% - var(--_thumb)) * ${fillEnd - fillStart})` } : { left: 0, width: at(fillEnd) }}
          />
          {ticks.map((t) => (
            <span key={t} className={styles.tick} style={{ left: at(pct(t)) }} data-active={pct(t) >= fillStart && pct(t) <= fillEnd} />
          ))}
          {values.map((v, index) => {
            const state = thumbState(index);
            const name = isRange ? `${index === 0 ? "Minimum" : "Maximum"} ${label.charAt(0).toLowerCase()}${label.slice(1)}` : label;
            return (
              <span key={index}>
                {pressStyle === "halo" && <span className={styles.halo} data-state={state} style={{ left: at(pct(v)) }} />}
                <span
                  role="slider"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={name}
                  aria-valuemin={isRange && index === 1 ? values[0] + gap : min}
                  aria-valuemax={isRange && index === 0 ? values[1] - gap : max}
                  aria-valuenow={v}
                  aria-valuetext={format(v)}
                  aria-disabled={disabled || undefined}
                  className={styles.thumb}
                  data-state={state}
                  data-focus-visible={focused === index}
                  style={{ left: at(pct(v)) } as CSSProperties}
                  onKeyDown={onKeyDown(index)}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={() => setHovered((h) => (h === index ? null : h))}
                  onFocus={(event) => setFocused(!pointerFocus.current && event.currentTarget.matches(":focus-visible") ? index : null)}
                  onBlur={() => setFocused((f) => (f === index ? null : f))}
                />
                {showTooltip && !disabled && (active === index || focused === index) && (
                  <span className={styles.tooltip} data-caret={tooltipCaret} data-lifted={active === index} style={{ left: at(pct(v)) }} aria-hidden="true">
                    <span className={styles.tooltipText}>{format(v)}</span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      {showLimits && (
        <div className={styles.limits} aria-hidden="true">
          <span>{format(min)}</span>
          <span>{format(max)}</span>
        </div>
      )}
    </div>
  );
}
