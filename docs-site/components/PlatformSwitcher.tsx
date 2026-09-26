"use client";

import { PLATFORMS, type Platform } from "@/lib/types";

export function PlatformSwitcher({
  platform,
  onChange,
}: {
  platform: Platform;
  onChange: (next: Platform) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Copy format"
      className="inline-flex rounded-lg border p-0.5"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
    >
      {PLATFORMS.map((option) => {
        const selected = option.id === platform;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className="rounded-md px-3 py-1 text-xs font-bold transition-colors"
            style={{
              background: selected ? "var(--color-bg-surface-secondary)" : "transparent",
              color: selected ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              boxShadow: selected
                ? "0 1px 2px color-mix(in srgb, var(--color-bg-surface-inverse) calc(var(--opacity-8) * 100%), transparent)"
                : "none",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
