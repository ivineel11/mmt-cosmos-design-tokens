import { Icon } from "@cosmos/Icon/Icon";
import { cssVar } from "@/lib/css";

/** Card art for the Foundations overview. Everything is drawn with tokens, so it re-tints
 * with the brand. Decorative only. */

export function TokensThumb() {
  return (
    <div className="flex items-center gap-[var(--space-xs)]" aria-hidden="true">
      {["--color-bg", "--color-bg", "--color-bg-fill-brand"].map((bg, i) => (
        <span
          key={i}
          className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] mono text-[length:var(--label-small-bold-font-size)] font-bold"
          style={{ background: `var(${bg})`, color: i === 2 ? "var(--color-text-brand-on-bg-fill)" : "var(--color-text-secondary)", boxShadow: "var(--shadow-card-subtle)" }}
        >
          {["P", "S", "C"][i]}
        </span>
      ))}
    </div>
  );
}

export function ColorThumb() {
  const fills = ["brand", "info", "success", "caution", "warning"];
  return (
    <div className="flex gap-[var(--space-2xs)]" aria-hidden="true">
      {fills.map((intent) => (
        <span key={intent} className="flex flex-col gap-[var(--space-2xs)]">
          <span className="h-14 w-8 rounded-[var(--radius-full)]" style={{ background: intent === "brand" ? "var(--color-bg-fill-brand)" : cssVar(`--color-bg-fill-${intent}-strong`) }} />
          <span className="h-8 w-8 rounded-[var(--radius-full)]" style={{ background: intent === "brand" ? "var(--color-bg-surface-brand-hover)" : cssVar(`--color-bg-fill-${intent}-subtle`) }} />
        </span>
      ))}
    </div>
  );
}

export function TypeThumb() {
  return (
    <div className="flex items-baseline gap-[var(--space-xs)]" aria-hidden="true">
      <span className="text-[length:var(--site-display-size)] leading-none font-black">Aa</span>
      <span className="text-[length:var(--headline-large-bold-font-size)] font-bold">Aa</span>
      <span className="text-[length:var(--title-large-regular-font-size)]">Aa</span>
    </div>
  );
}

export function SpacingThumb() {
  return (
    <div className="flex items-end gap-[var(--space-2xs)]" aria-hidden="true">
      {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "5xl"].map((step) => (
        <span key={step} className="rounded-[var(--radius-xs)]" style={{ width: "var(--space-sm)", height: cssVar(`--space-${step}`), background: "var(--color-bg-fill-brand)" }} />
      ))}
    </div>
  );
}

export function ShapeThumb() {
  return (
    <div className="flex items-center gap-[var(--space-sm)]" aria-hidden="true">
      {["none", "md", "xl", "full"].map((step) => (
        <span key={step} className="h-12 w-12" style={{ borderRadius: cssVar(`--radius-${step}`), background: "var(--color-bg)", boxShadow: "inset 0 0 0 var(--stroke-strong) var(--color-border-brand)" }} />
      ))}
    </div>
  );
}

export function ElevationThumb() {
  return (
    <div className="flex items-center gap-[var(--space-md)]" aria-hidden="true">
      {["card-subtle", "raised", "modal"].map((step) => (
        <span key={step} className="h-14 w-14 rounded-[var(--radius-lg)]" style={{ background: "var(--color-bg)", boxShadow: cssVar(`--shadow-${step}`) }} />
      ))}
    </div>
  );
}

export function IconThumb() {
  return (
    <div className="grid grid-cols-4 gap-[var(--space-sm)]" aria-hidden="true" style={{ color: "var(--color-icon)" }}>
      {(["flight", "hotel", "train", "bus", "map", "favorite", "search", "bell"] as const).map((name) => (
        <Icon key={name} name={name} size="var(--icon-md)" />
      ))}
    </div>
  );
}
