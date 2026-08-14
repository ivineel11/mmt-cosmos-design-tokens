"use client";

import { Card } from "@/components/Section";
import type { ContrastPair } from "@/lib/types";

const short = (path: string) => path.replace("color.", "");

export function Contrast({ pairs }: { pairs: ContrastPair[] }) {
  return (
    <Card>
      <div
        className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_88px] gap-4 border-b px-4 py-2.5 text-[11px] font-bold tracking-wide uppercase"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-surface)",
          color: "var(--color-text-tertiary)",
        }}
      >
        <div>Text token</div>
        <div>On background</div>
        <div>Preview</div>
        <div className="text-right">Ratio</div>
      </div>

      {pairs.map((pair) => (
        <div
          key={pair.text.path}
          className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_88px] items-center gap-4 border-b px-4 py-2.5 last:border-b-0"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="mono truncate text-xs">{short(pair.text.path)}</div>
          <div className="mono truncate text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
            {short(pair.background.path)}
          </div>
          <div
            className="truncate rounded-md px-2.5 py-1.5 text-xs font-bold"
            style={{ background: pair.background.value, color: pair.text.value }}
          >
            Aa — sample
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <span className="mono text-xs">{pair.ratio}</span>
            <span
              className="mono rounded px-1.5 py-0.5 text-[10px] font-bold"
              style={
                pair.aa
                  ? {
                      background: "var(--color-bg-fill-success-subtle)",
                      color: "var(--color-text-success-on-bg-fill-subtle)",
                    }
                  : pair.aaLarge
                    ? {
                        background: "var(--color-bg-fill-caution-subtle)",
                        color: "var(--color-text-caution-on-bg-fill-subtle)",
                      }
                    : {
                        background: "var(--color-bg-fill-warning-subtle)",
                        color: "var(--color-text-warning-on-bg-fill-subtle)",
                      }
              }
            >
              {pair.aaa ? "AAA" : pair.aa ? "AA" : pair.aaLarge ? "AA L" : "Fail"}
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
}
