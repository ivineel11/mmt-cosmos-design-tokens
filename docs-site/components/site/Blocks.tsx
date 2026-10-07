import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SiteIcon, type SiteGlyph } from "@/components/site/SiteIcon";

/** Backgrounds a demo can sit on. `canvas` is the grey page canvas, `inverse` a dark section. */
export type StageTone = "canvas" | "white" | "inverse" | "brand";

const STAGE_BG: Record<StageTone, string> = {
  canvas: "var(--color-bg-surface)",
  white: "var(--color-bg)",
  inverse: "var(--color-bg-surface-inverse)",
  brand: "var(--color-bg-surface-brand)",
};

/** A rounded demo canvas for live components, with an optional caption. */
export function Stage({
  children,
  tone = "canvas",
  caption,
  minHeight,
  padding = "var(--space-5xl)",
  align = "center",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: StageTone;
  caption?: ReactNode;
  minHeight?: string;
  padding?: string;
  align?: "center" | "start" | "stretch";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className="site-block">
      <div
        className={`flex flex-wrap gap-[var(--space-md)] rounded-[var(--radius-2xl)] ${className}`}
        style={{
          background: STAGE_BG[tone],
          border: tone === "white" ? "var(--stroke-default) solid var(--color-border-secondary)" : undefined,
          padding,
          minHeight,
          alignItems: align === "stretch" ? "stretch" : "center",
          justifyContent: align === "start" ? "flex-start" : "center",
          ...style,
        }}
      >
        {children}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption
      className="mt-[var(--space-sm)] max-w-[72ch] text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]"
      style={{ color: "var(--color-text-secondary)" }}
    >
      {children}
    </figcaption>
  );
}

type Verdict = "do" | "dont" | "caution";

const VERDICT: Record<Verdict, { label: string; icon: SiteGlyph; bar: string; text: string }> = {
  do: { label: "Do", icon: "check", bar: "var(--color-bg-fill-success-strong)", text: "var(--color-text-success)" },
  dont: { label: "Don’t", icon: "cross", bar: "var(--color-bg-fill-warning-strong)", text: "var(--color-text-warning)" },
  caution: { label: "Caution", icon: "warn", bar: "var(--color-bg-fill-caution-strong)", text: "var(--color-text-caution)" },
};

/** A do, don’t or caution example: a live demo, a coloured verdict bar and the reason. */
export function DoDont({
  kind,
  children,
  caption,
  tone = "canvas",
  minHeight = "220px",
}: {
  kind: Verdict;
  children: ReactNode;
  caption: ReactNode;
  tone?: StageTone;
  minHeight?: string;
}) {
  const verdict = VERDICT[kind];
  return (
    <figure className="flex min-w-0 flex-col">
      <div
        className="flex flex-1 flex-wrap items-center justify-center gap-[var(--space-sm)] rounded-t-[var(--radius-2xl)] p-[var(--space-3xl)]"
        style={{ background: STAGE_BG[tone], minHeight }}
      >
        {children}
      </div>
      <div className="h-1" style={{ background: verdict.bar }} />
      <figcaption className="pt-[var(--space-sm)]">
        <span className="flex items-center gap-[var(--space-2xs)] text-[length:var(--title-small-bold-font-size)] font-bold" style={{ color: verdict.text }}>
          <SiteIcon name={verdict.icon} size={20} />
          {verdict.label}
        </span>
        <span
          className="mt-[var(--space-2xs)] block text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/** Two do/don’t cards side by side, stacked on narrow screens. */
export function DoDontGrid({ children }: { children: ReactNode }) {
  return <div className="site-block grid gap-x-[var(--space-xl)] gap-y-[var(--space-3xl)] md:grid-cols-2">{children}</div>;
}

/** A highlighted note: `info` for context, `draft` for guidance awaiting design review. */
export function Callout({ tone = "info", title, children }: { tone?: "info" | "draft"; title?: string; children: ReactNode }) {
  const colours =
    tone === "draft"
      ? { bg: "var(--color-bg-surface-caution)", text: "var(--color-text-caution-on-bg-fill-subtle)", border: "var(--color-border-caution)" }
      : { bg: "var(--color-bg-surface-info)", text: "var(--color-text-info-on-bg-fill-subtle)", border: "var(--color-border-info)" };
  return (
    <aside
      className="site-block rounded-[var(--radius-xl)] border-l-4 px-[var(--space-xl)] py-[var(--space-md)] text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]"
      style={{ background: colours.bg, borderColor: colours.border, color: "var(--color-text-primary)" }}
    >
      {title && (
        <p className="mb-[var(--space-2xs)] font-bold" style={{ color: colours.text }}>
          {title}
        </p>
      )}
      {children}
    </aside>
  );
}

/** A large navigation card with a visual on top, used on the home and overview pages. */
export function NavCard({
  href,
  title,
  description,
  visual,
  tone = "canvas",
  external = false,
  badge,
}: {
  href: string;
  title: string;
  description: ReactNode;
  visual?: ReactNode;
  tone?: StageTone;
  external?: boolean;
  badge?: string;
}) {
  const inner = (
    <>
      {visual && (
        <div
          className="flex h-[180px] items-center justify-center overflow-hidden rounded-[var(--radius-xl)] transition-transform duration-[var(--motion-duration-panel)] ease-[var(--motion-ease-standard)] group-hover:scale-[1.015]"
          style={{ background: STAGE_BG[tone] }}
        >
          {visual}
        </div>
      )}
      <div className="px-[var(--space-2xs)] pt-[var(--space-md)] pb-[var(--space-2xs)]">
        <p className="flex items-center gap-[var(--space-xs)] text-[length:var(--title-medium-bold-font-size)] leading-[var(--title-medium-bold-line-height)] font-bold">
          {title}
          {external && <SiteIcon name="external" size={16} />}
          {badge && (
            <span
              className="rounded-[var(--radius-full)] px-[var(--space-xs)] text-[length:var(--label-small-bold-font-size)] leading-[var(--label-small-bold-line-height)]"
              style={{ background: "var(--color-bg-surface)", color: "var(--color-text-secondary)" }}
            >
              {badge}
            </span>
          )}
        </p>
        <p className="mt-[var(--space-2xs)] text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>
      </div>
    </>
  );
  const className = "site-focus group block rounded-[var(--radius-2xl)] p-[var(--space-xs)] transition-colors hover:bg-[var(--color-bg-surface-secondary-hover)]";
  return external ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

/** A labelled key fact, for strips of numbers such as token counts. */
export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <p className="text-[length:var(--headline-medium-black-font-size)] leading-[var(--headline-medium-black-line-height)] font-black tracking-tight">{value}</p>
      <p className="text-[length:var(--label-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </p>
    </div>
  );
}

/** A code sample. `bare` drops the frame, for code inside a do/don’t card. */
export function CodeBlock({ children, bare = false }: { children: string; bare?: boolean }) {
  return (
    <pre
      className={`mono overflow-x-auto text-[length:var(--body-small-regular-font-size)] leading-[var(--body-small-regular-line-height)] ${bare ? "" : "site-block rounded-[var(--radius-xl)] p-[var(--space-xl)]"}`}
      style={bare ? undefined : { background: "var(--color-bg-surface)" }}
    >
      <code style={{ background: "none", padding: 0 }}>{children}</code>
    </pre>
  );
}

/** Inline token name, styled like code. */
export function T({ children }: { children: ReactNode }) {
  return <code>{children}</code>;
}
