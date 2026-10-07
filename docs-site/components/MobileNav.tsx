"use client";

import { NAV } from "@/lib/nav";

/** Below the sidebar breakpoint, search and section jumping move to the top. */
export function MobileNav({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div
      className="sticky top-[var(--site-topbar)] z-20 flex gap-2 border-b px-4 py-3 backdrop-blur lg:hidden"
      style={{
        borderColor: "var(--color-border)",
        background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
      }}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search tokens…"
        aria-label="Search tokens"
        className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-surface-secondary)",
        }}
      />
      <select
        aria-label="Jump to section"
        defaultValue=""
        onChange={(event) => {
          const id = event.target.value;
          if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
        }}
        className="rounded-lg border px-2 py-2 text-sm"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-surface-secondary)",
        }}
      >
        <option value="">Jump to…</option>
        {NAV.map((group) =>
          group.items ? (
            <optgroup key={group.label} label={group.label}>
              {group.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
