import { Icon } from "@cosmos/Icon/Icon";
import type { BrandedToken } from "@/lib/data";
import { cssVar } from "@/lib/css";

type Kind = "space" | "radius" | "icon";

function Visual({ kind, name }: { kind: Kind; name: string }) {
  const value = cssVar(name);
  if (kind === "space") {
    return (
      <span className="flex h-8 items-center">
        <span className="h-full rounded-[var(--radius-xs)]" style={{ width: value, background: "var(--color-bg-fill-brand)" }} />
      </span>
    );
  }
  if (kind === "radius") {
    return <span className="block h-14 w-20" style={{ borderRadius: value, background: "var(--color-bg-surface-brand)", boxShadow: "inset 0 0 0 var(--stroke-strong) var(--color-border-brand)" }} />;
  }
  return (
    <span className="flex h-16 items-center" style={{ color: "var(--color-icon)" }}>
      <Icon name="flight" size={value} />
    </span>
  );
}

/** A scale of semantic tokens: a drawn sample, the name and value, and the description
 * that says where each step is used. */
export function ScaleList({ tokens, kind, usedBy }: { tokens: BrandedToken[]; kind: Kind; usedBy?: Record<string, string[]> }) {
  return (
    <div className="site-block">
      {tokens.map((token) => (
        <div
          key={token.path}
          className="grid items-center gap-x-[var(--space-xl)] gap-y-[var(--space-xs)] border-t py-[var(--space-md)] md:grid-cols-[var(--site-scale-visual)_var(--site-palette-label)_1fr]"
          style={{ borderColor: "var(--color-border-secondary)" }}
        >
          <Visual kind={kind} name={token.names.css} />
          <div>
            <p className="mono text-[length:var(--label-medium-bold-font-size)] font-bold">{token.path}</p>
            <p className="mono text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              {String(token.value)}
            </p>
          </div>
          <div>
            <p className="text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
              {token.description}
            </p>
            {usedBy?.[token.path] && (
              <p className="mt-[var(--space-2xs)] text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
                Used by {usedBy[token.path].join(", ")}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
