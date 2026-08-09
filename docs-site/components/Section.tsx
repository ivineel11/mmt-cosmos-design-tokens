import type { ReactNode } from "react";

const CONTENT_GAP = { sm: "mt-4", md: "mt-6" } as const;

export function Section({
  id,
  title,
  description,
  contentGap = "md",
  children,
}: {
  id: string;
  title: string;
  description: string;
  contentGap?: keyof typeof CONTENT_GAP;
  children: ReactNode;
}) {
  return (
    <section id={id} data-section className="pt-14">
      <h2 className="text-[24px] leading-[32px] font-extrabold">{title}</h2>
      <p
        className="mt-2 max-w-2xl text-sm leading-6"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {description}
      </p>
      <div className={CONTENT_GAP[contentGap]}>{children}</div>
    </section>
  );
}

export function SubHeading({ title }: { title: string }) {
  return (
    <div className="mt-8 mb-3 first:mt-0">
      <h3 className="text-sm font-bold">{title}</h3>
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--color-border)" }}
    >
      {children}
    </div>
  );
}

export function TokenName({ children }: { children: ReactNode }) {
  return <span className="mono text-xs">{children}</span>;
}

export function Muted({ children }: { children: ReactNode }) {
  return (
    <span className="mono text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
      {children}
    </span>
  );
}
