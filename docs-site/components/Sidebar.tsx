"use client";

import { useEffect, useState } from "react";
import { ALL_SECTION_IDS, NAV, type NavItem } from "@/lib/nav";

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  populated: Set<string>;
  matchCount: number;
};

/** Highlights the section currently closest to the top of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>(ALL_SECTION_IDS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-8% 0px -80% 0px", threshold: 0 },
    );

    for (const id of ALL_SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

function NavLink({
  item,
  active,
  muted,
  nested,
}: {
  item: NavItem;
  active: boolean;
  muted: boolean;
  nested: boolean;
}) {
  return (
    <a
      href={`#${item.id}`}
      aria-current={active ? "location" : undefined}
      className="block rounded-md text-sm transition-colors"
      style={{
        padding: nested ? "8px 10px 8px 16px" : "6px 10px",
        fontWeight: active ? 700 : 400,
        color: muted
          ? "var(--color-text-disabled)"
          : active
            ? "var(--color-text-primary)"
            : "var(--color-text-secondary)",
        background: active ? "var(--color-bg-surface)" : "transparent",
      }}
    >
      {item.label}
    </a>
  );
}

function PanelIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d={open ? "M9 4v16" : "M9 4v16M6 8h2M6 12h2"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sidebar({
  open,
  onToggle,
  query,
  onQueryChange,
  populated,
  matchCount,
}: SidebarProps) {
  const active = useActiveSection();

  return (
    <>
      {/* Spacer owns width for main recenter; rail moves on transform/opacity. */}
      <div
        className="sticky top-0 z-20 hidden h-screen shrink-0 overflow-hidden lg:block"
        data-open={open ? "true" : "false"}
        style={{
          width: open ? "var(--sidebar-width)" : 0,
          transition: open
            ? `width var(--motion-duration-panel) var(--motion-ease-standard)`
            : `width var(--motion-duration-panel-exit) var(--motion-ease-exit)`,
        }}
      >
        <aside
          aria-hidden={!open}
          className="flex h-full flex-col overflow-y-auto border-r"
          style={{
            width: "var(--sidebar-width)",
            borderColor: open ? "var(--color-border)" : "transparent",
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: open
              ? `opacity var(--motion-duration-fade) var(--motion-ease-standard) 40ms, transform var(--motion-duration-panel) var(--motion-ease-standard), border-color var(--motion-duration-fade) var(--motion-ease-standard)`
              : `opacity var(--motion-duration-fade) var(--motion-ease-standard), transform var(--motion-duration-panel-exit) var(--motion-ease-exit), border-color var(--motion-duration-fade) var(--motion-ease-exit)`,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="px-5 py-6">
            <div className="flex items-start justify-between gap-3">
              <a href="#top" className="block min-w-0">
                <div className="text-base font-black tracking-tight">Cosmos</div>
                <div
                  className="mt-0.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Design Tokens
                </div>
              </a>
              <button
                type="button"
                onClick={onToggle}
                aria-label="Collapse sidebar"
                aria-expanded={open}
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]"
              >
                <PanelIcon open />
              </button>
            </div>

            <div className="relative mt-5">
              <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search tokens…"
                aria-label="Search tokens"
                tabIndex={open ? 0 : -1}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg-surface-secondary)",
                }}
              />
            </div>
            {query.trim() !== "" && (
              <p className="mt-2 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                {matchCount} section{matchCount === 1 ? "" : "s"} with matches
              </p>
            )}

            <nav className="mt-6 space-y-6" aria-label="Token sections" inert={!open ? true : undefined}>
              {NAV.map((group) => {
                if (group.items) {
                  return (
                    <div key={group.label}>
                      <div
                        className="px-2.5 pb-3 text-xs font-bold tracking-wide uppercase"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {group.label}
                      </div>
                      <div>
                        {group.items.map((item) => (
                          <NavLink
                            key={item.id}
                            item={item}
                            active={active === item.id}
                            muted={!populated.has(item.id)}
                            nested
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                const item = { id: group.id as string, label: group.label };
                return (
                  <NavLink
                    key={item.id}
                    item={item}
                    active={active === item.id}
                    muted={!populated.has(item.id)}
                    nested={false}
                  />
                );
              })}
            </nav>
          </div>
        </aside>
      </div>

      {/* Re-entry control — sits at the edge so the page can reopen the rail. */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="Expand sidebar"
        aria-expanded={open}
        className="fixed top-6 left-4 z-30 hidden h-9 w-9 items-center justify-center rounded-lg border bg-[var(--color-bg)] text-[var(--color-text-primary)] shadow-sm transition-colors hover:bg-[var(--color-bg-surface)] lg:flex"
        style={{
          borderColor: "var(--color-border)",
          opacity: open ? 0 : 1,
          transform: open ? "translateX(-8px) scale(0.96)" : "translateX(0) scale(1)",
          pointerEvents: open ? "none" : "auto",
          transition: open
            ? `opacity 100ms var(--motion-ease-standard), transform 100ms var(--motion-ease-standard), background-color 100ms var(--motion-ease-standard)`
            : `opacity var(--motion-duration-fade) var(--motion-ease-standard) 80ms, transform var(--motion-duration-panel-exit) var(--motion-ease-standard) 40ms, background-color 100ms var(--motion-ease-standard)`,
        }}
      >
        <PanelIcon open={false} />
      </button>
    </>
  );
}
