"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", path: "" },
  { label: "Guidelines", path: "guidelines/" },
  { label: "Specs", path: "specs/" },
  { label: "Accessibility", path: "accessibility/" },
];

/** Overview, Guidelines, Specs and Accessibility for one component, as links. */
export function ComponentTabs({ base }: { base: string }) {
  const pathname = usePathname() ?? "";
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    <nav aria-label="Component pages" className="overflow-x-auto border-b" style={{ borderColor: "var(--color-border-secondary)" }}>
      <ul className="flex gap-[var(--space-xs)]">
        {TABS.map((tab) => {
          const href = `${base}${tab.path}`;
          const active = current === href;
          return (
            <li key={tab.label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="site-focus relative block rounded-t-[var(--radius-md)] px-[var(--space-md)] pt-[var(--space-xs)] pb-[var(--space-sm)] text-[length:var(--label-large-bold-font-size)] whitespace-nowrap transition-colors hover:bg-[var(--color-bg-surface-hover)]"
                style={{ fontWeight: "var(--weight-bold)", color: active ? "var(--color-text-brand)" : "var(--color-text-secondary)" }}
              >
                {tab.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[var(--space-md)] bottom-0 rounded-t-[var(--radius-full)]"
                    style={{ height: "var(--space-2xs)", background: "var(--color-bg-fill-brand)" }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
