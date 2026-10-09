import type { ReactNode } from "react";
import { Toc } from "@/components/site/Toc";

/** Page title block: an eyebrow, a display title, a lede and an optional hero visual. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  /** Hero visual under the lede, full content width. */
  children?: ReactNode;
  /** Tabs or actions pinned to the bottom of the header. */
  footer?: ReactNode;
}) {
  return (
    <header className="pt-[var(--space-5xl)] lg:pt-[var(--space-7xl)]">
      {eyebrow && (
        <p className="mb-[var(--space-xs)] text-[length:var(--label-medium-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand)" }}>
          {eyebrow}
        </p>
      )}
      <h1
        className="font-black tracking-tight text-[length:var(--site-display-size-compact)] leading-[var(--site-display-line-compact)] md:text-[length:var(--site-display-size)] md:leading-[var(--site-display-line)]"
      >
        {title}
      </h1>
      {lede && (
        <p
          className="mt-[var(--space-md)] max-w-[60ch] text-[length:var(--title-medium-regular-font-size)] leading-[var(--title-medium-regular-line-height)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {lede}
        </p>
      )}
      {children && <div className="mt-[var(--space-5xl)]">{children}</div>}
      {footer && <div className="mt-[var(--space-3xl)]">{footer}</div>}
    </header>
  );
}

/** The page column: the same width and gutters on every page. */
export function PageArticle({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto px-[var(--space-xl)] pb-[var(--space-7xl)] lg:px-[var(--space-6xl)]" style={{ maxWidth: "calc(var(--site-content) + var(--site-toc) + 160px)" }}>
      {children}
    </article>
  );
}

/** Guidance in reading width, with an "On this page" column on wide screens. */
export function PageBody({ children, toc = true }: { children: ReactNode; toc?: boolean }) {
  return (
    <div className="mt-[var(--space-6xl)] flex gap-[var(--space-6xl)]">
      <div className="prose min-w-0 flex-1" style={{ maxWidth: "var(--site-content)" }}>
        {children}
      </div>
      {toc && <Toc />}
    </div>
  );
}

/** The standard page: header, then guidance. */
export function PageFrame({ header, children, toc = true }: { header: ReactNode; children: ReactNode; toc?: boolean }) {
  return (
    <PageArticle>
      {header}
      <PageBody toc={toc}>{children}</PageBody>
    </PageArticle>
  );
}

/** A section heading the "On this page" list picks up. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id}>{children}</h2>;
}
