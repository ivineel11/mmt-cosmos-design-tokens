import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodeBlock, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { BrandValue } from "@/components/site/BrandValue";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { data, token } from "@/lib/data";
import { cssVar } from "@/lib/css";

export const metadata: Metadata = { title: "Typography" };

const SAMPLES: Record<string, string> = {
  headline: "Weekend getaways from Delhi",
  title: "Taj Exotica Resort and Spa, Goa",
  body: "Free cancellation until 24 hours before check-in. Breakfast for two is included.",
  label: "Book now",
};

const USE: Record<string, string> = {
  headline: "Page titles and the top of a section. One per screen region.",
  title: "Card, sheet and list-row titles, and sub-sections.",
  body: "Paragraphs, descriptions and supporting text. Large is for long reading.",
  label: "Text inside controls: buttons, chips, tabs, inputs and badges.",
};

/** The composite style as CSS custom properties, so it follows the brand typeface. */
const style = (group: string, size: string, weight: string): CSSProperties => {
  const base = `--${group}-${size}-${weight}`;
  return {
    fontFamily: `var(${base}-font-family), system-ui, sans-serif`,
    fontWeight: `var(${base}-font-weight)` as CSSProperties["fontWeight"],
    fontSize: `var(${base}-font-size)`,
    lineHeight: `var(${base}-line-height)`,
  };
};

export default function TypographyPage() {
  const typeface = token("semantic", "typeface.default");
  const weights = (["regular", "bold", "black"] as const).map((weight) => {
    const entry = token("semantic", `weight.${weight}`);
    return { weight, values: Object.fromEntries(Object.entries(entry.byBrand).map(([brand, value]) => [brand, String(value.value)])) };
  });
  const faces = Object.fromEntries(Object.entries(typeface.byBrand).map(([brand, value]) => [brand, String(value.value)]));

  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Typography"
          lede="Each brand sets every style in one typeface. The scale has four groups, three sizes each and three weights, and every style is a single token that carries family, weight, size and line height together."
        >
          <div className="grid overflow-hidden rounded-[var(--radius-2xl)] md:grid-cols-[1.2fr_1fr]" style={{ background: "var(--color-bg-surface-brand)" }}>
            <div className="flex items-end p-[var(--space-3xl)]">
              <span className="font-black tracking-tight" style={{ fontSize: "calc(var(--site-display-size) * 3)", lineHeight: 1, color: "var(--color-text-brand)" }}>
                Aa
              </span>
            </div>
            <div className="flex flex-col justify-end gap-[var(--space-2xs)] p-[var(--space-3xl)]">
              <p className="text-[length:var(--label-medium-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand)" }}>
                Typeface
              </p>
              <p className="text-[length:var(--headline-large-black-font-size)] leading-[var(--headline-large-black-line-height)] font-black">
                <BrandValue values={faces} />
              </p>
              <p className="mt-[var(--space-sm)] break-all text-[length:var(--title-medium-regular-font-size)] leading-[var(--title-medium-regular-line-height)]">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ₹ → ★
              </p>
            </div>
          </div>
        </PageHeader>
      }
    >
      <H2 id="typefaces">One typeface per brand</H2>
      <p>
        MakeMyTrip and myBiz use <strong>Lato</strong>. Goibibo uses <strong>Rubik</strong>. Every style reads its family from{" "}
        <code>typeface.default</code> and its weight from <code>weight.*</code>, the only type tokens a brand changes. Sizes and line
        heights are shared, so a layout never reflows when the brand changes.
      </p>
      <div className="site-block grid gap-[var(--space-md)] sm:grid-cols-3">
        {weights.map(({ weight, values }) => (
          <div key={weight} className="rounded-[var(--radius-2xl)] p-[var(--space-xl)]" style={{ background: "var(--color-bg-surface)" }}>
            <p className="text-[length:var(--site-display-size)] leading-[var(--site-display-line)]" style={{ fontWeight: cssVar(`--weight-${weight}`) as CSSProperties["fontWeight"] }}>
              Ag
            </p>
            <p className="mt-[var(--space-xs)] text-[length:var(--title-small-bold-font-size)] font-bold capitalize">{weight}</p>
            <p className="mono text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              weight.{weight} · <BrandValue values={values} />
            </p>
          </div>
        ))}
      </div>

      <H2 id="scale">The type scale</H2>
      <p>
        Four groups, each in large, medium and small. Every size comes in regular, bold and black, which makes 36 styles. A style is
        named <code>group.size.weight</code>, for example <code>body.medium.regular</code>.
      </p>
      <div className="site-block flex flex-col">
        {data.semantic.typography.map((group) => (
          <section key={group.id} className="border-t py-[var(--space-xl)]" style={{ borderColor: "var(--color-border-secondary)" }}>
            <div className="mb-[var(--space-md)] flex flex-wrap items-baseline justify-between gap-[var(--space-xs)]">
              <h3 className="text-[length:var(--title-medium-bold-font-size)] font-bold">{group.title}</h3>
              <p className="text-[length:var(--body-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
                {USE[group.id]}
              </p>
            </div>
            <div className="flex flex-col gap-[var(--space-md)]">
              {group.sizes.map((size) => {
                const weight = group.id === "body" ? "regular" : group.id === "headline" ? "black" : "bold";
                return (
                  <div key={size.size} className="grid items-baseline gap-[var(--space-xs)] md:grid-cols-[var(--site-palette-label)_1fr_auto] md:gap-[var(--space-md)]">
                    <span className="mono text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
                      {group.id}.{size.size}
                    </span>
                    <span className="min-w-0" style={style(group.id, size.size, weight)}>
                      {SAMPLES[group.id]}
                    </span>
                    <span className="mono text-[length:var(--label-small-regular-font-size)] whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>
                      {size.fontSize.replace("px", "")} / {size.lineHeight.replace("px", "")}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <H2 id="choosing">Choosing a style</H2>
      <ul>
        <li>
          <strong>Start from the group, not the size.</strong> A card title is a Title even when it is short; a button label is a
          Label even when it is large.
        </li>
        <li>
          <strong>Regular for reading, bold for emphasis, black for display.</strong> Black belongs to headlines, prices and the
          single most important number on a card.
        </li>
        <li>
          <strong>Body large is the reading size.</strong> Use it for anything longer than two lines; body medium for supporting copy;
          body small only for captions and legal text.
        </li>
        <li>
          <strong>There is no letter-spacing token</strong> and no display scale. If a moment needs more than headline large, it is
          an illustration, not text.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Use a Label style inside controls, so text and icons share one centre line.">
          <span className="rounded-[var(--radius-full)] px-[var(--space-md)] py-[var(--space-xs)]" style={{ ...style("label", "medium", "bold"), background: "var(--color-bg-fill-brand)", color: "var(--color-text-brand-on-bg-fill)" }}>
            Book now
          </span>
        </DoDont>
        <DoDont kind="dont" caption="Set a paragraph in black or in a Label style. Black is for display, and Label line heights are too tight to read.">
          <span className="max-w-[var(--site-card)]" style={style("label", "medium", "black")}>
            Free cancellation until 24 hours before check-in. Breakfast for two is included with every booking.
          </span>
        </DoDont>
      </DoDontGrid>

      <H2 id="in-code">In code</H2>
      <p>The build expands each style into one variable per property. Use all four together rather than mixing sizes and weights by hand.</p>
      <CodeBlock>{`.card-title {
  font-family: var(--title-medium-bold-font-family);
  font-weight: var(--title-medium-bold-font-weight);
  font-size: var(--title-medium-bold-font-size);
  line-height: var(--title-medium-bold-line-height);
}`}</CodeBlock>
      <p>
        Load the fonts for the brands you serve: Lato 400, 700 and 900, and Rubik 400, 600 and 700 for Goibibo. The token package
        does not ship font files. Every size and weight is in the <Link href="/tokens/#type-headline">token reference</Link>.
      </p>
    </PageFrame>
  );
}
