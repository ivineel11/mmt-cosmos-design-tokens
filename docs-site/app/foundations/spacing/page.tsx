import type { Metadata } from "next";
import { Button } from "@cosmos/Button/Button";
import { Caption, CodeBlock, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { ScaleList } from "@/components/foundations/ScaleList";
import { select } from "@/lib/data";

export const metadata: Metadata = { title: "Spacing" };

const TINT = "color-mix(in srgb, var(--color-bg-fill-brand) 18%, transparent)";

/** A highlighted gap with its token name, standing in for a CSS gap so it can be seen. */
function Gap({ size, label }: { size: string; label: string }) {
  return (
    <div className="relative" style={{ height: size, background: TINT }}>
      <span className="mono absolute top-1/2 right-[calc(-1*var(--space-xs))] translate-x-full -translate-y-1/2 text-[length:var(--label-small-regular-font-size)] whitespace-nowrap" style={{ color: "var(--color-text-brand)" }}>
        {label}
      </span>
    </div>
  );
}

function Specimen() {
  return (
    <figure className="site-block">
      <div className="flex justify-center rounded-[var(--radius-2xl)] px-[var(--space-xl)] py-[var(--space-5xl)]" style={{ background: "var(--color-bg-surface)" }}>
        <div className="relative w-full max-w-[var(--site-card)] rounded-[var(--radius-xl)] p-[var(--space-xl)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: `inset 0 0 0 var(--space-xl) ${TINT}` }}>
          <span className="mono absolute top-[var(--space-2xs)] left-[var(--space-xs)] text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-brand)" }}>
            space-xl padding
          </span>
          <div className="mr-[var(--space-7xl)]">
            <p className="text-[length:var(--title-medium-bold-font-size)] leading-[var(--title-medium-bold-line-height)] font-bold">Hotel Sea Breeze</p>
            <Gap size="var(--space-2xs)" label="space-2xs" />
            <p className="text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              Calangute, 300 m from the beach
            </p>
            <Gap size="var(--space-md)" label="space-md" />
            <div className="flex">
              <Button label="Select room" size="small" />
              <span className="w-[var(--space-xs)]" style={{ background: TINT }} />
              <Button label="Details" size="small" hierarchy="secondary" />
            </div>
          </div>
        </div>
      </div>
      <Caption>Padding, the gap between a title and its supporting line, and the gap between groups. The tinted areas are the tokens.</Caption>
    </figure>
  );
}

export default function SpacingPage() {
  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Spacing"
          lede="One T-shirt sized scale for padding, gaps and layout. Each step aliases a pixel value, so no screen or component ever holds a raw number."
        />
      }
    >
      <H2 id="scale">The scale</H2>
      <p>
        Fourteen steps from <code>space.none</code> to <code>space.7xl</code>. The small end builds controls, the middle builds
        cards and forms, and the large end separates regions of a page.
      </p>
      <ScaleList tokens={select("semantic", "space.")} kind="space" />

      <H2 id="in-a-component">Spacing in a card</H2>
      <p>
        Space shows relationships. The tighter the gap, the closer two things belong together: a title and its subtitle sit closer
        than the title and the actions below them.
      </p>
      <Specimen />

      <H2 id="rules">Rules of thumb</H2>
      <ul>
        <li>
          <strong>Related things sit closer.</strong> Use a smaller step inside a group than between groups.
        </li>
        <li>
          <strong>Pad containers evenly.</strong> Cards take <code>space-md</code> to <code>space-xl</code> on every side; let
          content set the height.
        </li>
        <li>
          <strong>Stay on the scale.</strong> The primitive <code>spacing.*</code> steps behind it, including the negative ones, are
          only for optical corrections inside a component.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Use a semantic space token, so the gap can be tuned across the product in one place.">
          <CodeBlock bare>{`.card {\n  padding: var(--space-xl);\n  gap: var(--space-md);\n}`}</CodeBlock>
        </DoDont>
        <DoDont kind="dont" caption="Type in a number that is not on the scale. It cannot be tuned, and it drifts from every other screen.">
          <CodeBlock bare>{`.card {\n  padding: 22px;\n  gap: 15px;\n}`}</CodeBlock>
        </DoDont>
      </DoDontGrid>
    </PageFrame>
  );
}
