"use client";

import { useBrandId } from "@/components/site/BrandProvider";
import type { ContrastPair } from "@/lib/types";

/** Text roles on the surface each was designed for, with the measured contrast in the
 * brand on screen. AA is 4.5:1 for body text and 3:1 for large text and UI. */
export function TextContrast({ pairsByBrand, paths }: { pairsByBrand: Record<string, ContrastPair[]>; paths: string[] }) {
  const brand = useBrandId();
  const pairs = pairsByBrand[brand] ?? Object.values(pairsByBrand)[0];
  const rows = paths.map((path) => pairs.find((pair) => pair.text.path === path)).filter((pair): pair is ContrastPair => Boolean(pair));

  return (
    <div className="site-block grid gap-[var(--space-sm)] sm:grid-cols-2">
      {rows.map((pair) => {
        const grade = pair.aa ? "AA" : pair.aaLarge ? "AA large" : "Below AA";
        const pass = pair.aa || pair.aaLarge;
        return (
          <div key={pair.text.path} className="flex items-center gap-[var(--space-md)] rounded-[var(--radius-xl)] p-[var(--space-sm)]" style={{ boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-[length:var(--title-large-bold-font-size)] font-bold"
              style={{ background: pair.background.value, color: pair.text.value, boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}
            >
              Aa
            </span>
            <span className="min-w-0 flex-1">
              <span className="mono block truncate text-[length:var(--label-medium-bold-font-size)] font-bold">{pair.text.path.replace("color.", "")}</span>
              <span className="mono block truncate text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
                on {pair.background.path.replace("color.", "")} · {pair.text.value}
              </span>
            </span>
            <span className="text-right">
              <span className="block text-[length:var(--title-medium-black-font-size)] font-black">{pair.ratio.toFixed(1)}</span>
              <span
                className="block rounded-[var(--radius-full)] px-[var(--space-xs)] text-[length:var(--label-small-bold-font-size)] font-bold whitespace-nowrap"
                style={{
                  background: pass ? "var(--color-bg-fill-success-subtle)" : "var(--color-bg-fill-warning-subtle)",
                  color: pass ? "var(--color-text-success-on-bg-fill-subtle)" : "var(--color-text-warning-on-bg-fill-subtle)",
                }}
              >
                {grade}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
