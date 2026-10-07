type Part = { text: string; label: string };

const TINTS = ["--color-bg-fill-brand", "--color-bg-fill-success-strong", "--color-bg-fill-caution-strong", "--color-bg-fill-neutral-strong"];

/** A token name split into its parts, each underlined and labelled. */
export function NameAnatomy({ parts, joiner = "-" }: { parts: Part[]; joiner?: string }) {
  return (
    <div className="flex flex-wrap items-start" aria-label={parts.map((part) => `${part.text}: ${part.label}`).join(", ")} role="img">
      {parts.map((part, i) => (
        <div key={part.text} className="flex items-start">
          {i > 0 && (
            <span className="mono text-[length:var(--headline-small-regular-font-size)] leading-[var(--headline-small-regular-line-height)]" style={{ color: "var(--color-text-tertiary)" }}>
              {joiner}
            </span>
          )}
          <div className="flex flex-col">
            <span className="mono text-[length:var(--headline-small-bold-font-size)] leading-[var(--headline-small-bold-line-height)] font-bold">{part.text}</span>
            <span className="mt-[var(--space-2xs)] h-1 rounded-[var(--radius-full)]" style={{ background: `var(${TINTS[i % TINTS.length]})` }} />
            <span className="mt-[var(--space-2xs)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
              {part.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
