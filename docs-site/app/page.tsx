import Link from "next/link";
import { BrandCards } from "@/components/home/BrandCards";
import { HeroDemo } from "@/components/home/HeroDemo";
import { NavCard, Stat } from "@/components/site/Blocks";
import { ComponentsVisual, FoundationsVisual, StorybookVisual, TokensVisual } from "@/components/home/Visuals";
import { tokenCount } from "@/lib/data";
import { COMPONENTS, STORYBOOK_URL } from "@/lib/site";

function SectionTitle({ title, lede }: { title: string; lede: string }) {
  return (
    <div className="mb-[var(--space-3xl)] max-w-[60ch]">
      <h2 className="text-[length:var(--headline-large-black-font-size)] leading-[var(--headline-large-black-line-height)] font-black tracking-tight">{title}</h2>
      <p className="mt-[var(--space-xs)] text-[length:var(--title-medium-regular-font-size)] leading-[var(--title-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
        {lede}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto px-[var(--space-md)] pb-[var(--space-7xl)] lg:px-[var(--space-xl)]" style={{ maxWidth: "var(--site-home)" }}>
      {/* Hero */}
      <section
        className="mt-[var(--space-md)] grid items-center gap-[var(--space-5xl)] overflow-hidden rounded-[var(--radius-3xl)] px-[var(--space-xl)] py-[var(--space-6xl)] md:px-[var(--space-6xl)] lg:mt-[var(--space-xl)] grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:py-[var(--space-7xl)]"
        style={{ background: "var(--color-bg-surface-brand)" }}
      >
        <div>
          <p className="mb-[var(--space-sm)] text-[length:var(--label-large-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand)" }}>
            Cosmos design system
          </p>
          <h1 className="text-[length:var(--site-display-size-compact)] leading-[var(--site-display-line-compact)] font-black tracking-tight md:text-[length:var(--site-display-size)] md:leading-[var(--site-display-line)]">
            One system for every trip we sell.
          </h1>
          <p className="mt-[var(--space-xl)] max-w-[48ch] text-[length:var(--title-medium-regular-font-size)] leading-[var(--title-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
            Guidelines, foundations, components and tokens for MakeMyTrip, myBiz and Goibibo. Every example on this site is the real
            component, so switch the brand at the top and watch it all follow.
          </p>
          <div className="mt-[var(--space-3xl)] flex flex-wrap gap-[var(--space-sm)]">
            <Link href="/components/" className="site-link-button" data-hierarchy="primary">
              Browse components
            </Link>
            <Link href="/foundations/" className="site-link-button" data-hierarchy="secondary">
              Read the foundations
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroDemo />
        </div>
      </section>

      {/* Numbers */}
      <section aria-label="Cosmos at a glance" className="mt-[var(--space-6xl)] grid grid-cols-2 gap-[var(--space-xl)] px-[var(--space-xs)] md:grid-cols-5">
        <Stat value="3" label="Brands, one codebase" />
        <Stat value={COMPONENTS.length} label="Components" />
        <Stat value={tokenCount("semantic")} label="Semantic tokens" />
        <Stat value={tokenCount("component")} label="Component tokens" />
        <Stat value="3" label="Platforms: web, iOS, Android" />
      </section>

      {/* Explore */}
      <section className="mt-[var(--space-7xl)]">
        <SectionTitle title="Start here" lede="Designers start with the guidelines. Engineers start with the tokens. Both end up in the same place." />
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 xl:grid-cols-4">
          <NavCard href="/foundations/" title="Foundations" description="Colour, type, space, shape and elevation, and the rules that tie them together." visual={<FoundationsVisual />} />
          <NavCard href="/components/" title="Components" description="When to use each component, how it is built, and how to keep it accessible." visual={<ComponentsVisual />} />
          <NavCard href="/tokens/" title="Tokens" description="Every token in every tier, searchable, with names for CSS, JS, Swift and Kotlin." visual={<TokensVisual />} />
          <NavCard href={STORYBOOK_URL} external title="Storybook" description="Every prop and state as a live playground, for engineers wiring components in." visual={<StorybookVisual />} />
        </div>
      </section>

      {/* Brands */}
      <section className="mt-[var(--space-7xl)]">
        <SectionTitle
          title="Three brands, one set of tokens"
          lede="A brand only re-points a few semantic tokens: its colour ramp and, for Goibibo, its typeface. Components never know which brand they are in."
        />
        <BrandCards />
      </section>
    </div>
  );
}
