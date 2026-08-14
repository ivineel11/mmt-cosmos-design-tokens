"use client";

import { Copyable } from "@/components/Copyable";
import type { Palette, Platform } from "@/lib/types";

type PaletteVariant = "primitive" | "expressive";

const VARIANT = {
  primitive: {
    listClass: "",
    groupClass: "pt-8",
    gridClass: "grid gap-2",
    gridStyle: { gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))" } as const,
    swatchClass: "w-full",
    nameGap: "mt-2",
    hexClass: "mono mt-1 text-xs leading-4",
  },
  expressive: {
    listClass: "flex flex-col gap-7",
    groupClass: "w-fit max-w-full",
    gridClass: "flex flex-wrap gap-x-3 gap-y-5",
    gridStyle: undefined,
    swatchClass: "w-20 shrink-0 self-start",
    nameGap: "mt-1.5",
    hexClass: "mono mt-1 text-[11px] leading-[14px]",
  },
} as const;

export function Palettes({
  palettes,
  platform,
  label,
  variant = "primitive",
}: {
  palettes: Palette[];
  platform: Platform;
  /** Overrides the per-palette heading with one fixed label. */
  label?: string;
  variant?: PaletteVariant;
}) {
  const styles = VARIANT[variant];

  return (
    <div className={styles.listClass}>
      {palettes.map((palette) => (
        <div key={palette.name} className={styles.groupClass}>
          <div className={`mb-3 text-sm font-bold ${label ? "" : "capitalize"}`}>
            {label ?? palette.name.replace("exp-", "")}
          </div>
          <div className={styles.gridClass} style={styles.gridStyle}>
            {palette.steps.map((step) => (
              <Copyable
                key={step.path}
                value={step.copy[platform]}
                label={`${step.path} as ${platform}`}
                className={styles.swatchClass}
              >
                <div
                  className="h-14 w-full rounded-md"
                  style={{ background: step.value }}
                />
                <div className={`mono ${styles.nameGap} text-xs leading-4`}>{step.key}</div>
                <div
                  className={styles.hexClass}
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {step.value}
                </div>
              </Copyable>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
