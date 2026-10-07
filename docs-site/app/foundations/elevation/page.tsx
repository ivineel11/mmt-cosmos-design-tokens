import type { Metadata } from "next";
import { DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { componentsUsing, select } from "@/lib/data";
import { cssVar } from "@/lib/css";

export const metadata: Metadata = { title: "Elevation" };

export default function ElevationPage() {
  const shadows = select("semantic", "shadow.");
  const usedBy = componentsUsing("shadow.");

  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Elevation"
          lede="One scale of shadows, named by what sits at each height. A shadow only ever means height: the edge of a card is a border, not a shadow."
        />
      }
    >
      <H2 id="scale">The scale</H2>
      <p>
        Every shadow has two layers: a tight <strong>key</strong> layer that draws the edge and a soft <strong>ambient</strong> layer
        that carries the height. There is no spread and no inner shadow, because SwiftUI and Compose cannot draw them, so all three
        platforms match.
      </p>
      <div className="site-block grid gap-[var(--space-md)] rounded-[var(--radius-2xl)] p-[var(--space-xl)] sm:grid-cols-2" style={{ background: "var(--color-bg-surface)" }}>
        {shadows.map((shadow) => (
          <div key={shadow.path} className="flex flex-col rounded-[var(--radius-xl)] p-[var(--space-xl)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: cssVar(shadow.names.css) }}>
            <p className="mono text-[length:var(--label-medium-bold-font-size)] font-bold">{shadow.path}</p>
            <p className="mt-[var(--space-xs)] flex-1 text-[length:var(--body-small-regular-font-size)] leading-[var(--body-small-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
              {shadow.description}
            </p>
            {usedBy[shadow.path] && (
              <p className="mt-[var(--space-sm)] text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
                Used by {usedBy[shadow.path].join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      <H2 id="choosing">Choosing a height</H2>
      <ul>
        <li>
          <strong>Resting content</strong> uses <code>card</code>, or <code>card-subtle</code> and <code>card-soft</code> for a
          lighter or more diffuse touch.
        </li>
        <li>
          <strong>Things that move</strong> step up to <code>raised</code> while hovered or dragged, and sticky bars use{" "}
          <code>raised</code> or <code>sticky-bottom</code>.
        </li>
        <li>
          <strong>Layers on top of the page</strong> use <code>overlay</code> when the page stays usable (menus, tooltips, toasts) and{" "}
          <code>modal</code> when a scrim blocks it.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Give a menu the overlay shadow, so it reads as floating above the card it opened from.">
          <span className="flex flex-col gap-[var(--space-2xs)] rounded-[var(--radius-lg)] p-[var(--space-xs)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-overlay)" }}>
            {["Sort by price", "Sort by rating", "Sort by distance"].map((item) => (
              <span key={item} className="rounded-[var(--radius-md)] px-[var(--space-sm)] py-[var(--space-xs)] text-[length:var(--body-medium-regular-font-size)]">
                {item}
              </span>
            ))}
          </span>
        </DoDont>
        <DoDont kind="dont" caption="Use a heavy shadow to outline a resting card. Use card, or a border, and save the large shadows for layers.">
          <span className="h-24 w-40 rounded-[var(--radius-xl)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-modal)" }} />
        </DoDont>
      </DoDontGrid>
    </PageFrame>
  );
}
