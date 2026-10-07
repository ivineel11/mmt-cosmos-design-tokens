import type { Metadata } from "next";
import { Button } from "@cosmos/Button/Button";
import { Icon } from "@cosmos/Icon/Icon";
import { DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { IconGrid } from "@/components/foundations/IconGrid";
import { ScaleList } from "@/components/foundations/ScaleList";
import { componentsUsing, select } from "@/lib/data";

export const metadata: Metadata = { title: "Iconography" };

const COLOURS = [
  ["--color-icon", "icon", "Default glyphs"],
  ["--color-icon-secondary", "icon-secondary", "Supporting glyphs"],
  ["--color-icon-tertiary", "icon-tertiary", "Quiet hints"],
  ["--color-icon-brand", "icon-brand", "Selected and brand"],
  ["--color-icon-success", "icon-success", "Confirmed"],
  ["--color-icon-warning", "icon-warning", "Errors"],
  ["--color-icon-disabled", "icon-disabled", "Disabled"],
] as const;

export default function IconographyPage() {
  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Iconography"
          lede="Glyphs on a 24 grid, sized from one scale and coloured from their own roles, so an icon can be tuned without touching the text beside it."
        >
          <div className="flex flex-wrap items-center justify-center gap-[var(--space-3xl)] rounded-[var(--radius-2xl)] p-[var(--space-5xl)]" style={{ background: "var(--color-bg-surface-brand)", color: "var(--color-icon-brand)" }} aria-hidden="true">
            {(["flight", "hotel", "homestay", "train", "bus", "map"] as const).map((name) => (
              <Icon key={name} name={name} size="var(--icon-2xl)" />
            ))}
          </div>
        </PageHeader>
      }
    >
      <H2 id="glyphs">Glyphs</H2>
      <p>
        The Cosmos set, exported from the Figma Icons page. Click a glyph to copy its name. Every glyph has a Code Connect template, so
        Figma Dev Mode shows the matching snippet.
      </p>
      <IconGrid />

      <H2 id="sizes">Sizes</H2>
      <p>
        Eight sizes. Inside a control, match the icon to the line height of the label beside it, so text and glyph share one centre
        line: 24 with label large, 20 with label medium and 16 with label small.
      </p>
      <ScaleList tokens={select("semantic", "icon.")} kind="icon" usedBy={componentsUsing("icon.")} />

      <H2 id="colour">Colour</H2>
      <p>Icons take their colour from the <code>icon-*</code> roles, never from text tokens.</p>
      <div className="site-block grid grid-cols-2 gap-[var(--space-sm)] sm:grid-cols-4 lg:grid-cols-7">
        {COLOURS.map(([name, label, use]) => (
          <div key={name} className="flex flex-col items-center gap-[var(--space-xs)] rounded-[var(--radius-xl)] p-[var(--space-md)] text-center" style={{ background: "var(--color-bg-surface)" }}>
            <span style={{ color: `var(${name})` }}>
              <Icon name="favorite" size="var(--icon-lg)" />
            </span>
            <span className="mono text-[length:var(--label-small-bold-font-size)] font-bold">{label}</span>
            <span className="text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              {use}
            </span>
          </div>
        ))}
      </div>

      <H2 id="accessibility">Accessibility</H2>
      <p>
        Cosmos glyphs are decorative by default and hidden from assistive technology. The control around them carries the name. An
        icon without visible text needs an accessible label on its control.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Pair a glyph with a label, or give an icon-only control an accessible name such as Share this hotel.">
          <Button label="Share" hierarchy="secondary" leadingIcon="share" />
        </DoDont>
        <DoDont kind="dont" caption="Use an unfamiliar glyph on its own and expect people to guess. Only a handful of icons, such as search and close, are understood without words.">
          <span className="flex gap-[var(--space-md)]" style={{ color: "var(--color-icon)" }}>
            <Icon name="drive-file-move" size="var(--icon-md)" />
            <Icon name="auto-awesome" size="var(--icon-md)" />
          </span>
        </DoDont>
      </DoDontGrid>
    </PageFrame>
  );
}
