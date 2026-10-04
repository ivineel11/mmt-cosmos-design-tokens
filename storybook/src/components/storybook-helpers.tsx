import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

/**
 * A labelled grid for variant matrices, like the Figma showcase frames: row labels down
 * the side, column labels across the top. Storybook-only, not part of any component.
 */
export function Matrix<R extends string, C extends string>({
  rows,
  columns,
  cell,
  inverse = false,
}: {
  rows: readonly R[];
  columns: readonly C[];
  cell: (row: R, column: C) => ReactNode;
  /** Set on dark backgrounds so the legend stays readable. */
  inverse?: boolean;
}) {
  const label = { font: "var(--label-medium-regular-font-weight) var(--label-medium-regular-font-size) ui-monospace, monospace", color: inverse ? "var(--color-text-inverse-secondary)" : "var(--color-text-secondary)" } as const;
  return (
    // Scrolls sideways instead of clipping when the grid is wider than the canvas. The
    // padding leaves room for focus rings and the Radio state layer, which overhang.
    <div style={{ maxWidth: "100%", overflowX: "auto", padding: "var(--space-sm)" }}>
      <div style={{ display: "grid", gridTemplateColumns: `auto repeat(${columns.length}, auto)`, gap: "var(--space-3xl) var(--space-5xl)", alignItems: "center", justifyItems: "start", width: "max-content" }}>
        <span />
        {columns.map((column) => (
          <span key={column} style={label}>
            {column}
          </span>
        ))}
        {rows.map((row) => [
          <span key={`${row}-label`} style={label}>
            {row}
          </span>,
          ...columns.map((column) => <div key={`${row}-${column}`}>{cell(row, column)}</div>),
        ])}
      </div>
    </div>
  );
}

/** A dark section for Inverse stories, drawn by the story so docs pages show it too. */
export function InverseSection({ children }: { children: ReactNode }) {
  return <div style={{ background: "var(--color-bg-surface-inverse)", padding: "var(--space-5xl)", borderRadius: "var(--radius-xl)" }}>{children}</div>;
}

/** A white canvas or the grey bg-secondary canvas, for components that adapt to the page. */
export function Canvas({ tone = "white", children }: { tone?: "white" | "grey"; children: ReactNode }) {
  return (
    <div style={{ background: tone === "grey" ? "var(--color-bg-secondary)" : "var(--color-bg)", padding: "var(--space-5xl)", borderRadius: "var(--radius-xl)", border: tone === "white" ? "var(--stroke-default) solid var(--color-border-secondary)" : undefined }}>
      {children}
    </div>
  );
}

/**
 * Arrow-key roving focus for a single-choice group (role="radiogroup"). Pass the handler
 * to each radio. Left/Right and Up/Down move and select, wrapping at the ends; disabled items are skipped.
 */
export function useRovingRadio<T extends string>(ids: readonly T[], value: T, onChange: (id: T) => void, isDisabled: (id: T) => boolean = () => false) {
  return (event: ReactKeyboardEvent<HTMLElement>) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    let index = ids.indexOf(value);
    for (let i = 0; i < ids.length; i += 1) {
      index = (index + step + ids.length) % ids.length;
      if (!isDisabled(ids[index])) break;
    }
    onChange(ids[index]);
    const group = event.currentTarget.closest('[role="radiogroup"]');
    group?.querySelectorAll<HTMLElement>('[role="radio"]')[index]?.focus();
  };
}
