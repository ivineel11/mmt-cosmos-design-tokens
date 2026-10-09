"use client";

import { useMemo, useState } from "react";
import { Chip } from "@cosmos/Chip/Chip";
import { Copyable } from "@/components/Copyable";
import { useBrandId } from "@/components/site/BrandProvider";
import type { BrandedToken } from "@/lib/data";
import type { FlatToken } from "@/lib/types";

/** One-line rendering of a value; shadows become their CSS shorthand. */
export function formatValue(value: FlatToken["value"]): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((layer) => `${layer.x} ${layer.y} ${layer.blur} ${layer.color}`).join(", ");
  return Object.values(value).join(" / ");
}

/** `color.bg-fill-brand` → `bg-fill-brand`, the way the README writes an alias. */
export const aliasLabel = (reference: string | null) => (reference ? reference.replace(/^color\./, "") : null);

/** The token's value and alias in the brand on screen. */
export function useBranded(token: BrandedToken) {
  const brand = useBrandId();
  return token.byBrand[brand] ?? { value: token.value, reference: token.reference };
}

export function Preview({ token, value }: { token: BrandedToken; value: FlatToken["value"] }) {
  const box = "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)]";
  const text = formatValue(value);
  if (token.type === "color") {
    return (
      <span
        className={box}
        style={{
          // A checkerboard under the swatch makes translucent colours readable.
          backgroundImage: `linear-gradient(${text}, ${text}), repeating-conic-gradient(var(--color-bg-surface-hover) 0 25%, var(--color-bg) 0 50%)`,
          backgroundSize: "100% 100%, 10px 10px",
          boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)",
        }}
      />
    );
  }
  if (token.type === "boxShadow") {
    return <span className={box} style={{ background: "var(--color-bg)", boxShadow: text }} />;
  }
  if (token.type === "opacity") {
    return <span className={box} style={{ background: "var(--color-bg-fill-brand)", opacity: Number(text) }} />;
  }
  if (token.type === "borderRadius") {
    return <span className={box} style={{ border: "var(--stroke-strong) solid var(--color-border-strong)", borderRadius: text }} />;
  }
  return (
    <span className={`${box} mono text-[length:var(--label-small-regular-font-size)]`} style={{ background: "var(--color-bg-surface)", color: "var(--color-text-secondary)" }}>
      {/^\d/.test(text) ? text.replace(/px$/, "") : "··"}
    </span>
  );
}

function Row({ token, prefix }: { token: BrandedToken; prefix: string }) {
  const { value, reference } = useBranded(token);
  const alias = aliasLabel(reference);
  const shortName = token.path.startsWith(prefix) ? token.path.slice(prefix.length) : token.path;
  return (
    <tr className="border-t align-top" style={{ borderColor: "var(--color-border-secondary)" }}>
      <td className="py-[var(--space-sm)] pr-[var(--space-md)]">
        <Preview token={token} value={value} />
      </td>
      <td className="py-[var(--space-sm)] pr-[var(--space-md)]">
        <Copyable value={token.copy.css} label={token.names.css} className="rounded-[var(--radius-sm)]">
          <span className="mono text-[length:var(--label-medium-bold-font-size)] font-bold">{shortName}</span>
        </Copyable>
        {token.description && (
          <p className="mt-[var(--space-2xs)] max-w-[56ch] text-[length:var(--body-small-regular-font-size)] leading-[var(--body-small-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
            {token.description}
          </p>
        )}
      </td>
      <td className="py-[var(--space-sm)] text-right whitespace-nowrap">
        {alias && (
          <span className="mono block text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-brand)" }}>
            {alias}
          </span>
        )}
        <span className="mono block text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
          {formatValue(value)}
        </span>
      </td>
    </tr>
  );
}

/**
 * Tokens with a live preview, their alias and value in the brand on screen, and their
 * description. `filters` adds Cosmos Chips that narrow the rows by a path fragment.
 */
export function TokenTable({
  tokens,
  prefix = "",
  filters,
  caption,
}: {
  tokens: BrandedToken[];
  /** Stripped from displayed names, for example `button.`. */
  prefix?: string;
  /** A row shows under a filter when its path contains any of the fragments. */
  filters?: { label: string; contains: string[] }[];
  caption?: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const rows = useMemo(() => {
    const active = filters?.find((entry) => entry.label === filter);
    return active ? tokens.filter((token) => active.contains.some((fragment) => token.path.includes(fragment))) : tokens;
  }, [tokens, filters, filter]);

  return (
    <div className="site-block">
      {filters && (
        <div role="radiogroup" aria-label="Filter tokens" className="mb-[var(--space-md)] flex flex-wrap gap-[var(--space-xs)]">
          {[{ label: "All" }, ...filters].map((entry) => {
            const selected = (filter ?? "All") === entry.label;
            return (
              <Chip
                key={entry.label}
                label={entry.label}
                size="small"
                selectionRole="radio"
                selected={selected}
                onSelectedChange={() => setFilter(entry.label === "All" ? null : entry.label)}
              />
            );
          })}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              <th className="w-14 pb-[var(--space-xs)] font-bold">
                <span className="sr-only">Preview</span>
              </th>
              <th className="pb-[var(--space-xs)] font-bold">Token</th>
              <th className="pb-[var(--space-xs)] text-right font-bold">Alias · value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((token) => (
              <Row key={token.path} token={token} prefix={prefix} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-[var(--space-xs)] text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
        {rows.length} token{rows.length === 1 ? "" : "s"} · values follow the brand switcher · click a name to copy its CSS variable
      </p>
    </div>
  );
}
