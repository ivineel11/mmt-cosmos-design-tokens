"use client";

import { useMemo, useState } from "react";
import { MobileNav } from "@/components/MobileNav";
import { PlatformSwitcher } from "@/components/PlatformSwitcher";
import { Section, SubHeading } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { Contrast } from "@/components/sections/Contrast";
import { Palettes } from "@/components/sections/Palettes";
import { ScaleTable, previews } from "@/components/sections/ScaleTable";
import { SemanticColors } from "@/components/sections/SemanticColors";
import { Typography } from "@/components/sections/Typography";
import { filterData, populatedSections } from "@/lib/filter";
import type { Platform, TokenData } from "@/lib/types";

export function DocsApp({ data }: { data: TokenData }) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform>("css");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => filterData(data, query), [data, query]);
  const populated = useMemo(() => populatedSections(filtered), [filtered]);
  const { primitives, semantic } = filtered;

  return (
    <div className="flex">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((value) => !value)}
        query={query}
        onQueryChange={setQuery}
        populated={populated}
        matchCount={populated.size}
      />

      <main className="min-w-0 flex-1">
        <MobileNav query={query} onQueryChange={setQuery} />
        <div className="mx-auto px-6 pb-32 lg:px-10" style={{ maxWidth: "var(--page-max)" }}>
          <header id="top" className="pt-12">
            <h1 className="text-[36px] leading-[40px] font-extrabold">Design Tokens</h1>
            <p
              className="mt-3 max-w-[792px] text-base leading-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              The complete Cosmos token reference — color, typography, spacing, radius, and sizing.
              Primitives are raw values; semantic tokens reference them and are what product code
              should consume. Click any token to copy it.
            </p>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <dl className="flex flex-wrap gap-x-8 gap-y-3">
                {data.meta.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="text-2xl font-black tracking-tight">{stat.value}</dd>
                    <dt className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <PlatformSwitcher platform={platform} onChange={setPlatform} />
            </div>
          </header>

          {populated.size === 0 && (
            <p className="pt-16 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              No tokens match <span className="mono">{query}</span>.
            </p>
          )}

          {populated.has("primitive-palettes") && (
            <Section
              id="primitive-palettes"
              title="Primitive Palettes"
              contentGap="sm"
              description="Raw color scales — 13 palettes with steps 0/50–950. Primitives are the source values; consume semantic tokens in product code."
            >
              <Palettes palettes={primitives.palettes} platform={platform} />
            </Section>
          )}

          {populated.has("semantic-colors") && (
            <Section
              id="semantic-colors"
              title="Semantic colors"
              description="Role-based colors that reference a primitive. Use these everywhere so a palette change flows through the product without touching component code."
            >
              <SemanticColors groups={semantic.colorGroups} platform={platform} />
            </Section>
          )}

          {populated.has("expressive") && (
            <Section
              id="expressive"
              title="Expressive"
              description="Full hue ramps exposed as semantic aliases for illustration, data visualization, and marketing surfaces where role tokens are too narrow."
            >
              <Palettes palettes={semantic.expressive} platform={platform} variant="expressive" />
            </Section>
          )}

          {populated.has("contrast") && (
            <Section
              id="contrast"
              title="Contrast"
              description="Every text token measured against the surface it is designed for. WCAG 2.1 requires 4.5:1 for body text (AA) and 3:1 for large text."
            >
              <Contrast pairs={filtered.contrastPairs} />
            </Section>
          )}

          {semantic.typography.map((group) => (
            <Section
              key={group.id}
              id={`type-${group.id}`}
              title={group.title}
              description={group.description}
            >
              <Typography group={group} platform={platform} />
            </Section>
          ))}

          {populated.has("spacing") && (
            <Section
              id="spacing"
              title="Spacing"
              description="Padding, gap, and margin. Semantic t-shirt sizes are the default choice; the primitive scale exists for one-off optical adjustments."
            >
              {semantic.space.length > 0 && (
                <>
                  <SubHeading title="Semantic" />
                  <ScaleTable
                    tokens={semantic.space}
                    platform={platform}
                    preview={previews.spacing}
                  />
                </>
              )}
              {primitives.spacing.length > 0 && (
                <>
                  <SubHeading title="Primitive" />
                  <ScaleTable
                    tokens={primitives.spacing}
                    platform={platform}
                    preview={previews.spacing}
                  />
                </>
              )}
            </Section>
          )}

          {populated.has("radius") && (
            <Section
              id="radius"
              title="Radius"
              description="Corner rounding from square to fully pill-shaped. Semantic sizes map onto the primitive pixel scale."
            >
              {semantic.radius.length > 0 && (
                <>
                  <SubHeading title="Semantic" />
                  <ScaleTable
                    tokens={semantic.radius}
                    platform={platform}
                    preview={previews.radius}
                  />
                </>
              )}
              {primitives.borderRadius.length > 0 && (
                <>
                  <SubHeading title="Primitive" />
                  <ScaleTable
                    tokens={primitives.borderRadius}
                    platform={platform}
                    preview={previews.radius}
                  />
                </>
              )}
            </Section>
          )}

          {populated.has("icon-size") && (
            <Section
              id="icon-size"
              title="Icon size"
              description="Square icon dimensions. Pair icon sizes with the type size they sit beside so optical weight stays balanced."
            >
              {semantic.icon.length > 0 && (
                <>
                  <SubHeading title="Semantic" />
                  <ScaleTable tokens={semantic.icon} platform={platform} preview={previews.size} />
                </>
              )}
              {primitives.iconSize.length > 0 && (
                <>
                  <SubHeading title="Primitive" />
                  <ScaleTable
                    tokens={primitives.iconSize}
                    platform={platform}
                    preview={previews.size}
                  />
                </>
              )}
            </Section>
          )}

          {populated.has("border-width") && (
            <Section
              id="border-width"
              title="Border width"
              description="Stroke weights for borders, dividers, and the focus ring. Focus indication is tokenised so it looks identical on every component rather than being re-decided per control."
            >
              {semantic.borderWidth.length > 0 && (
                <>
                  <SubHeading title="Semantic" />
                  <ScaleTable
                    tokens={semantic.borderWidth}
                    platform={platform}
                    preview={previews.borderWidth}
                  />
                </>
              )}
              {semantic.focusRing.length > 0 && (
                <>
                  <SubHeading title="Focus ring" />
                  <ScaleTable
                    tokens={semantic.focusRing}
                    platform={platform}
                    preview={previews.borderWidth}
                  />
                </>
              )}
              {primitives.strokeWidth.length > 0 && (
                <>
                  <SubHeading title="Primitive" />
                  <ScaleTable
                    tokens={primitives.strokeWidth}
                    platform={platform}
                    preview={previews.borderWidth}
                  />
                </>
              )}
            </Section>
          )}

          {populated.has("motion") && (
            <Section
              id="motion"
              title="Motion"
              description="Durations and easing curves, named for what they are for rather than how long they last. Entrances are slower than exits; anything the user triggers directly should feel immediate."
            >
              {semantic.motionDuration.length > 0 && (
                <>
                  <SubHeading title="Duration" />
                  <ScaleTable
                    tokens={semantic.motionDuration}
                    platform={platform}
                    preview={previews.duration}
                  />
                </>
              )}
              {semantic.motionEasing.length > 0 && (
                <>
                  <SubHeading title="Easing" />
                  <ScaleTable
                    tokens={semantic.motionEasing}
                    platform={platform}
                    preview={previews.easing}
                  />
                </>
              )}
              {primitives.duration.length > 0 && (
                <>
                  <SubHeading title="Primitive duration" />
                  <ScaleTable
                    tokens={primitives.duration}
                    platform={platform}
                    preview={previews.duration}
                  />
                </>
              )}
              {primitives.easing.length > 0 && (
                <>
                  <SubHeading title="Primitive easing" />
                  <ScaleTable
                    tokens={primitives.easing}
                    platform={platform}
                    preview={previews.easing}
                  />
                </>
              )}
            </Section>
          )}

          {populated.has("font-family") && (
            <Section
              id="font-family"
              title="Font family"
              description="Cosmos is a single-family system. Every type style resolves to this family."
            >
              <ScaleTable
                tokens={primitives.fontFamily}
                platform={platform}
                preview={previews.fontFamily}
              />
            </Section>
          )}

          {populated.has("font-weight") && (
            <Section
              id="font-weight"
              title="Font weight"
              description="Three weights carry the whole system: regular for reading, bold for emphasis, black for display moments."
            >
              <ScaleTable
                tokens={primitives.fontWeight}
                platform={platform}
                preview={previews.fontWeight}
              />
            </Section>
          )}

          {populated.has("font-size") && (
            <Section
              id="font-size"
              title="Font size"
              description="The primitive type scale. Semantic type styles reference these rather than hard-coding pixel values."
            >
              <ScaleTable
                tokens={primitives.fontSize}
                platform={platform}
                preview={previews.fontSize}
              />
            </Section>
          )}

          {populated.has("line-height") && (
            <Section
              id="line-height"
              title="Line height"
              description="Absolute line heights, paired with font sizes inside the semantic type styles."
            >
              <ScaleTable
                tokens={primitives.lineHeight}
                platform={platform}
                preview={previews.lineHeight}
              />
            </Section>
          )}

          <footer
            className="mt-24 border-t pt-6 text-xs"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-tertiary)" }}
          >
            Generated from <span className="mono">{data.meta.source}</span> · Style Dictionary
            outputs for web, iOS, and Android live in <span className="mono">dist/</span>.
          </footer>
        </div>
      </main>
    </div>
  );
}
