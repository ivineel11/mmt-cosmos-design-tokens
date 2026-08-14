"use client";

import { Copyable } from "@/components/Copyable";
import { Card } from "@/components/Section";
import type { Platform, TypeGroup } from "@/lib/types";

/** Keeps oversized specimens from dominating the row while staying proportional. */
const SPECIMEN_MAX_PX = 40;

const SAMPLE = "The quick brown fox jumps over the lazy dog";

export function Typography({ group, platform }: { group: TypeGroup; platform: Platform }) {
  return (
    <Card>
      {group.sizes.map((size) =>
        size.variants.map((variant, index) => {
          const declared = Number.parseFloat(variant.value.fontSize);
          const scale = Math.min(1, SPECIMEN_MAX_PX / declared);
          const isFirstOfSize = index === 0;

          return (
            <Copyable
              key={variant.path}
              value={variant.copy[platform]}
              label={`${variant.path} as ${platform}`}
              className="flex w-full items-center gap-6 border-b px-5 py-5 last:border-b-0"
              style={{
                borderColor: "var(--color-border)",
                background: isFirstOfSize ? "transparent" : "transparent",
              }}
            >
              <div className="min-w-0 flex-1 overflow-hidden">
                <span
                  className="block truncate"
                  style={{
                    fontFamily: `var(--font-lato), ${variant.value.fontFamily}, sans-serif`,
                    fontSize: `${declared * scale}px`,
                    lineHeight: `${Number.parseFloat(variant.value.lineHeight) * scale}px`,
                    fontWeight: variant.value.fontWeight,
                  }}
                >
                  {SAMPLE}
                </span>
              </div>

              <div className="shrink-0 text-right">
                <div className="mono text-[11px] font-bold">{variant.path}</div>
                <div
                  className="mono mt-1 text-[10px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {variant.value.fontSize} · lh {variant.value.lineHeight} · wght{" "}
                  {variant.value.fontWeight}
                </div>
              </div>
            </Copyable>
          );
        }),
      )}
    </Card>
  );
}
