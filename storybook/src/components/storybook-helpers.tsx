import type { ReactNode } from "react";

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
  const label = { font: "var(--label-medium-regular-font-weight) var(--label-medium-regular-font-size) ui-monospace, monospace", color: inverse ? "var(--color-text-inverse-secondary)" : "var(--color-text-tertiary)" } as const;
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
