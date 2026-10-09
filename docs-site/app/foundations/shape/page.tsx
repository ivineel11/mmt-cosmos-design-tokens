import type { Metadata } from "next";
import { DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { ScaleList } from "@/components/foundations/ScaleList";
import { componentsUsing, select } from "@/lib/data";

export const metadata: Metadata = { title: "Shape" };

export default function ShapePage() {
  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Shape"
          lede="Corner radius tells people what kind of thing they are looking at. Small radii belong to controls, large radii to containers, and fully round to pills, chips and avatars."
        >
          <div className="flex flex-wrap items-end gap-[var(--space-md)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }} aria-hidden="true">
            {[
              ["--radius-xs", "var(--space-6xl)"],
              ["--radius-md", "var(--space-7xl)"],
              ["--radius-xl", "calc(var(--space-7xl) * 1.5)"],
              ["--radius-2xl", "calc(var(--space-7xl) * 2)"],
              ["--radius-full", "var(--space-7xl)"],
            ].map(([radius, size]) => (
              <span key={radius} style={{ width: size, height: size, borderRadius: `var(${radius})`, background: "var(--color-bg-fill-brand)" }} />
            ))}
          </div>
        </PageHeader>
      }
    >
      <H2 id="scale">The scale</H2>
      <p>
        Ten steps from square to pill. The list shows which components use each step, read straight from their component tokens, so
        it is always current.
      </p>
      <ScaleList tokens={select("semantic", "radius.")} kind="radius" usedBy={componentsUsing("radius.")} />

      <H2 id="nesting">Nesting</H2>
      <p>
        When one rounded shape sits inside another, give the inner one a smaller radius: roughly the outer radius minus the padding
        between them. Matching radii make the inner corners look too round.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Outer radius-2xl (24) with 16 of padding, inner radius-md (8). The corners stay parallel.">
          <span className="rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-card)" }}>
            <span className="block h-20 w-40 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg-surface-brand-hover)" }} />
          </span>
        </DoDont>
        <DoDont kind="dont" caption="Use the same large radius inside and out. The gap between the corners swells and the inner box looks inflated.">
          <span className="rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-card)" }}>
            <span className="block h-20 w-40 rounded-[var(--radius-2xl)]" style={{ background: "var(--color-bg-surface-brand-hover)" }} />
          </span>
        </DoDont>
      </DoDontGrid>

      <H2 id="stroke">Stroke</H2>
      <p>
        Outlines come in two weights. <code>stroke.default</code> (1) draws inputs, cards, chips and outlined buttons;{" "}
        <code>stroke.strong</code> (2) is for controls drawn as their outline, such as the Radio circle. Focus rings use{" "}
        <code>stroke.focus</code>, which can change on its own.
      </p>
      <div className="site-block flex flex-wrap gap-[var(--space-xl)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }}>
        {[
          ["stroke.default", "var(--stroke-default)", "var(--color-border)"],
          ["stroke.strong", "var(--stroke-strong)", "var(--color-border-strong)"],
          ["stroke.focus", "var(--stroke-focus)", "var(--color-border-focus)"],
        ].map(([name, width, colour]) => (
          <div key={name} className="flex flex-col items-center gap-[var(--space-xs)]">
            <span className="h-14 w-28 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg)", boxShadow: `inset 0 0 0 ${width} ${colour}` }} />
            <span className="mono text-[length:var(--label-small-regular-font-size)]">{name}</span>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
