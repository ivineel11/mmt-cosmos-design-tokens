"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Entry = { id: string; label: string };

/** "On this page": every section heading in the page body, with the one being read marked. */
export function Toc() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLHeadingElement>("#content .prose > h2[id]")];
    const listed = requestAnimationFrame(() => setEntries(headings.map((heading) => ({ id: heading.id, label: heading.textContent ?? "" }))));

    // The current section is the last heading above a line a third of the way down the
    // viewport; at the very bottom of the page it is the last heading.
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight / 3;
        const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= line);
        setActive((atEnd ? headings.at(-1) : passed.at(-1) ?? headings[0])?.id ?? null);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(listed);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (entries.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky hidden shrink-0 self-start xl:block"
      style={{ top: "var(--site-anchor-offset)", width: "var(--site-toc)" }}
    >
      <p className="mb-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-tertiary)" }}>
        On this page
      </p>
      <ul className="border-l" style={{ borderColor: "var(--color-border-secondary)" }}>
        {entries.map((entry) => {
          const current = entry.id === active;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={current ? "location" : undefined}
                className="site-focus -ml-px block border-l-2 py-[var(--space-2xs)] pl-[var(--space-sm)] text-[length:var(--label-medium-regular-font-size)] leading-[var(--label-medium-regular-line-height)] transition-colors"
                style={{
                  borderColor: current ? "var(--color-border-brand)" : "transparent",
                  color: current ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontWeight: current ? "var(--weight-bold)" : undefined,
                }}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
