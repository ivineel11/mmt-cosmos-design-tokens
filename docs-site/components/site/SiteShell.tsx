"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandSwitcher } from "@/components/site/BrandSwitcher";
import { SiteIcon } from "@/components/site/SiteIcon";
import { REPO_URL, SECTIONS, STORYBOOK_URL, sectionFor, type SitePage, type SiteSection } from "@/lib/site";

const normalise = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** The Cosmos mark: an orbit around a brand-coloured core, so it re-tints with the brand. */
function Logo() {
  return (
    <Link href="/" className="site-focus flex items-center gap-[var(--space-sm)] rounded-[var(--radius-md)]">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="10" fill="var(--color-bg-fill-brand)" />
        <ellipse cx="16" cy="16" rx="11" ry="5" fill="none" stroke="var(--color-text-brand-on-bg-fill)" strokeWidth="1.6" transform="rotate(-28 16 16)" />
        <circle cx="16" cy="16" r="4.5" fill="var(--color-text-brand-on-bg-fill)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[length:var(--title-medium-black-font-size)] font-black tracking-tight">Cosmos</span>
        <span className="mt-[var(--space-3xs)] hidden text-[length:var(--label-small-regular-font-size)] sm:block" style={{ color: "var(--color-text-tertiary)" }}>
          MakeMyTrip design system
        </span>
      </span>
    </Link>
  );
}

function RailItem({ section, active }: { section: SiteSection; active: boolean }) {
  return (
    <Link
      href={section.href}
      aria-current={active ? "page" : undefined}
      className="site-focus group flex w-full flex-col items-center gap-[var(--space-2xs)] rounded-[var(--radius-lg)] py-[var(--space-2xs)]"
    >
      <span
        className="flex h-8 w-14 items-center justify-center rounded-[var(--radius-full)] transition-colors group-hover:bg-[var(--color-bg-surface-hover)]"
        style={{
          background: active ? "var(--color-bg-surface-brand-hover)" : undefined,
          color: active ? "var(--color-icon-brand)" : "var(--color-icon-secondary)",
        }}
      >
        <SiteIcon name={section.icon} />
      </span>
      <span
        className="text-[length:var(--label-small-bold-font-size)] leading-[var(--label-small-bold-line-height)]"
        style={{ fontWeight: active ? "var(--weight-black)" : "var(--weight-bold)", color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
      >
        {section.label}
      </span>
    </Link>
  );
}

function DrawerLink({ page, active, onNavigate }: { page: SitePage; active: boolean; onNavigate?: () => void }) {
  if (page.soon) {
    return (
      <span
        className="flex items-center justify-between rounded-[var(--radius-full)] px-[var(--space-md)] py-[var(--space-xs)] text-[length:var(--label-medium-regular-font-size)]"
        style={{ color: "var(--color-text-disabled)" }}
      >
        {page.label}
        <span className="text-[length:var(--label-small-regular-font-size)]">Soon</span>
      </span>
    );
  }
  return (
    <Link
      href={page.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className="site-focus block rounded-[var(--radius-full)] px-[var(--space-md)] py-[var(--space-xs)] text-[length:var(--label-medium-regular-font-size)] transition-colors hover:bg-[var(--color-bg-surface-hover)]"
      style={{
        background: active ? "var(--color-bg-surface-brand-hover)" : undefined,
        fontWeight: active ? "var(--weight-bold)" : undefined,
        color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
      }}
    >
      {page.label}
    </Link>
  );
}

/** A page matches its own href, or a deeper route such as a component tab. The section
 * overview (the first page) shares a prefix with every page, so it only matches exactly. */
const pageActive = (page: SitePage, path: string, pages: SitePage[]) =>
  path === page.href || (page !== pages[0] && path.startsWith(page.href));

/** Material-style chrome: a top app bar, a navigation rail of sections and, for sections
 * with pages, a drawer. Below the large breakpoint everything moves into a modal drawer. */
export function SiteShell({ children }: { children: ReactNode }) {
  const path = normalise(usePathname() ?? "/");
  const section = sectionFor(path);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  // The token reference brings its own sidebar, so it gets the full width.
  const showDrawer = Boolean(section.pages);

  useEffect(() => {
    if (!menuOpen) return;
    // Move focus into the drawer so keyboard and screen reader users land in it.
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen">
      <a
        href="#content"
        className="site-focus sr-only z-50 rounded-[var(--radius-md)] px-[var(--space-md)] py-[var(--space-xs)] focus:not-sr-only focus:fixed focus:top-[var(--space-xs)] focus:left-[var(--space-xs)]"
        style={{ background: "var(--color-bg-fill)" }}
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-40 flex items-center gap-[var(--space-sm)] px-[var(--space-md)] lg:px-[var(--space-xl)]"
        style={{ height: "var(--site-topbar)", background: "var(--color-bg-secondary)" }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          className="site-focus -ml-[var(--space-xs)] flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] hover:bg-[var(--color-bg-surface-hover)] lg:hidden"
        >
          <SiteIcon name="menu" />
        </button>
        <Logo />
        <div className="flex-1" />
        <BrandSwitcher />
        <nav aria-label="Resources" className="hidden items-center gap-[var(--space-2xs)] sm:flex">
          <a
            href={STORYBOOK_URL}
            className="site-focus flex items-center gap-[var(--space-2xs)] rounded-[var(--radius-full)] px-[var(--space-sm)] py-[var(--space-xs)] text-[length:var(--label-medium-bold-font-size)] font-bold hover:bg-[var(--color-bg-surface-hover)]"
          >
            <SiteIcon name="book" size={20} />
            Storybook
          </a>
          <a
            href={REPO_URL}
            aria-label="Source on GitHub"
            className="site-focus flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] hover:bg-[var(--color-bg-surface-hover)]"
          >
            <SiteIcon name="code" size={20} />
          </a>
        </nav>
      </header>

      <div className="flex">
        <nav
          aria-label="Sections"
          className="sticky hidden shrink-0 flex-col items-center gap-[var(--space-md)] px-[var(--space-2xs)] pt-[var(--space-xs)] lg:flex"
          style={{ top: "var(--site-topbar)", height: "calc(100vh - var(--site-topbar))", width: "var(--site-rail)" }}
        >
          {SECTIONS.map((item) => (
            <RailItem key={item.id} section={item} active={item.id === section.id} />
          ))}
        </nav>

        {showDrawer && section.pages && (
          <aside
            aria-label={`${section.label} pages`}
            className="sticky hidden shrink-0 overflow-y-auto pr-[var(--space-sm)] pb-[var(--space-xl)] lg:block"
            style={{ top: "var(--site-topbar)", height: "calc(100vh - var(--site-topbar))", width: "var(--site-drawer)" }}
          >
            <p
              className="px-[var(--space-md)] pt-[var(--space-sm)] pb-[var(--space-xs)] text-[length:var(--title-small-bold-font-size)] font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {section.label}
            </p>
            <ul className="flex flex-col gap-[var(--space-3xs)]">
              {section.pages.map((page) => (
                <li key={page.href}>
                  <DrawerLink page={page} active={pageActive(page, path, section.pages!)} />
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main
          id="content"
          className="min-w-0 flex-1 lg:mr-[var(--space-sm)] lg:mb-[var(--space-sm)] lg:rounded-[var(--radius-3xl)]"
          style={{ background: "var(--color-bg)", minHeight: "calc(100vh - var(--site-topbar))" }}
        >
          {children}
        </main>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 h-full w-full cursor-default"
            style={{ background: "color-mix(in srgb, var(--color-bg-surface-inverse) calc(var(--opacity-scrim) * 100%), transparent)" }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[min(320px,85vw)] flex-col overflow-y-auto rounded-r-[var(--radius-2xl)] p-[var(--space-sm)]"
            style={{ background: "var(--color-bg-secondary)" }}
          >
            <div className="mb-[var(--space-md)] flex items-center justify-between pl-[var(--space-xs)]">
              <Logo />
              <button
                ref={closeButton}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="site-focus flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] hover:bg-[var(--color-bg-surface-hover)]"
              >
                <SiteIcon name="close" />
              </button>
            </div>
            {SECTIONS.map((item) => (
              <div key={item.id} className="mb-[var(--space-xs)]">
                {item.pages ? (
                  <>
                    <p className="px-[var(--space-md)] pt-[var(--space-sm)] pb-[var(--space-2xs)] text-[length:var(--title-small-bold-font-size)] font-bold">
                      {item.label}
                    </p>
                    {item.pages.map((page) => (
                      <DrawerLink key={page.href} page={page} active={pageActive(page, path, item.pages!)} onNavigate={() => setMenuOpen(false)} />
                    ))}
                  </>
                ) : (
                  <DrawerLink page={{ label: item.label, href: item.href }} active={item.id === section.id} onNavigate={() => setMenuOpen(false)} />
                )}
              </div>
            ))}
            <a href={STORYBOOK_URL} className="site-focus mt-auto flex items-center gap-[var(--space-xs)] rounded-[var(--radius-full)] px-[var(--space-md)] py-[var(--space-xs)] text-[length:var(--label-medium-bold-font-size)] font-bold">
              <SiteIcon name="book" size={20} /> Storybook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
