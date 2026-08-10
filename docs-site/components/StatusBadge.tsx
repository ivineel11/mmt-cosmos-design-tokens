import type { TokenStatus } from "@/lib/types";

/**
 * Flags tokens that must not be reached for. `stable` and `internal` render
 * nothing — a badge on every row would be noise, and the absence of a badge is
 * the signal that a token is safe to use.
 */
const VARIANTS: Partial<
  Record<TokenStatus, { label: string; background: string; color: string; title: string }>
> = {
  deprecated: {
    label: "deprecated",
    background: "var(--color-bg-fill-danger-subtle)",
    color: "var(--color-text-danger-on-bg-fill-subtle)",
    title: "Do not use in new code.",
  },
  experimental: {
    label: "experimental",
    background: "var(--color-bg-fill-caution-subtle)",
    // The caution foreground fails AA on this fill, so pair with text-primary.
    color: "var(--color-text-primary)",
    title: "Not a role token — for prototyping only. Do not use in product code.",
  },
};

export function StatusBadge({ status, replacedBy }: { status: TokenStatus; replacedBy?: string | null }) {
  const variant = VARIANTS[status];
  if (!variant) return null;

  return (
    <span
      className="mono rounded px-1 py-0.5 text-xs leading-4 font-semibold"
      style={{ background: variant.background, color: variant.color }}
      title={replacedBy ? `${variant.title} Use ${replacedBy} instead.` : variant.title}
    >
      {variant.label}
      {replacedBy && ` → ${replacedBy}`}
    </span>
  );
}
