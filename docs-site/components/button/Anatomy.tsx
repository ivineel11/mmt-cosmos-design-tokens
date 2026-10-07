"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@cosmos/Button/Button";

type Mark = { n: number; x: number; y: number; above: boolean };

export const ANATOMY = [
  { name: "Container", text: "Sets the fill, the outline (Secondary only) and the size. Hugs its content, never narrower than button/min-width (86)." },
  { name: "Leading icon", text: "Optional. Reinforces the action, such as plus for Add. Hidden from assistive technology." },
  { name: "Label", text: "Required. The accessible name, so it says what happens: Book room, Pay ₹4,820, Delete account." },
  { name: "Trailing icon", text: "Optional. A chevron for moving onward to another step. Independent of the leading icon." },
  { name: "Focus ring", text: "Shown on keyboard focus only: 2 wide and 2 clear of the container, following its corners." },
  { name: "Spinner", text: "Shown while isLoading. Sits ahead of the label, which stays; not drawn here." },
];

const OFFSET = 44;

/** A large live Button with numbered markers measured from its real parts, so the
 * diagram stays right in every brand and typeface. */
export function Anatomy() {
  const frame = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);

  useLayoutEffect(() => {
    const root = frame.current;
    const button = root?.querySelector("button");
    if (!root || !button) return;

    const measure = () => {
      const origin = root.getBoundingClientRect();
      const box = button.getBoundingClientRect();
      const parts = [...button.children].map((child) => child.getBoundingClientRect());
      const [leading, label, trailing] = parts;
      const centre = (rect: DOMRect) => rect.left + rect.width / 2 - origin.left;
      const top = box.top - origin.top;
      const bottom = box.bottom - origin.top;
      setMarks([
        { n: 1, x: box.left - origin.left + box.width * 0.06, y: bottom, above: false },
        { n: 2, x: centre(leading), y: top, above: true },
        { n: 3, x: centre(label), y: bottom, above: false },
        { n: 4, x: centre(trailing), y: top, above: true },
        { n: 5, x: box.right - origin.left + 4, y: bottom + 4, above: false },
      ]);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(button);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="site-block">
      <div className="grid overflow-hidden rounded-[var(--radius-2xl)] md:grid-cols-[1.2fr_1fr]" style={{ background: "var(--color-bg-surface)" }}>
        <div ref={frame} className="relative flex min-h-[var(--site-stage)] items-center justify-center p-[var(--space-7xl)]" aria-hidden="true">
          {/* A drawn ring stands in for :focus-visible, which a page cannot force. */}
          <span
            className="inline-flex"
            style={{
              borderRadius: "var(--button-radius-lg)",
              outline: "var(--button-focus-ring-width) solid var(--button-focus-ring)",
              outlineOffset: "var(--button-focus-ring-offset)",
            }}
          >
            <Button label="Book room" size="large" leadingIcon="plus" trailingIcon="chevron-right" tabIndex={-1} />
          </span>
          {marks.map((mark) => (
            <span key={mark.n}>
              <span
                className="absolute w-px"
                style={{
                  left: mark.x,
                  top: mark.above ? mark.y - OFFSET + 12 : mark.y,
                  height: OFFSET - 12,
                  background: "var(--color-border-strong)",
                }}
              />
              <span
                className="absolute flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-[var(--radius-full)] text-[length:var(--label-small-bold-font-size)] font-bold"
                style={{
                  left: mark.x + 0.5,
                  top: mark.above ? mark.y - OFFSET - 12 : mark.y + OFFSET - 12,
                  background: "var(--color-bg-surface-inverse)",
                  color: "var(--color-text-inverse)",
                }}
              >
                {mark.n}
              </span>
            </span>
          ))}
        </div>
        <ol className="flex flex-col justify-center gap-[var(--space-sm)] p-[var(--space-xl)]" style={{ background: "var(--color-bg)", listStyle: "none", margin: 0 }}>
          {ANATOMY.map((part, i) => (
            <li key={part.name} className="flex gap-[var(--space-sm)]" style={{ margin: 0 }}>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-full)] text-[length:var(--label-small-bold-font-size)] font-bold"
                style={{
                  background: i < 5 ? "var(--color-bg-surface-inverse)" : "var(--color-bg-surface)",
                  color: i < 5 ? "var(--color-text-inverse)" : "var(--color-text-secondary)",
                }}
              >
                {i < 5 ? i + 1 : "·"}
              </span>
              <span className="text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]">
                <strong>{part.name}.</strong> <span style={{ color: "var(--color-text-secondary)" }}>{part.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
