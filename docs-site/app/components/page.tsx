import type { Metadata } from "next";
import { NavCard } from "@/components/site/Blocks";
import { PageHeader } from "@/components/site/Page";
import { Preview } from "@/components/catalog/Previews";
import { COMPONENTS, storybookDocs } from "@/lib/site";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <div className="mx-auto px-[var(--space-xl)] pb-[var(--space-7xl)] lg:px-[var(--space-6xl)]" style={{ maxWidth: "var(--site-home)" }}>
      <PageHeader
        eyebrow="Components"
        title="Components"
        lede="Every Cosmos component, rendered live from the same React code engineers ship. Guidelines cover when to use each one, how it is built and how to keep it accessible; the rest link to their Storybook playground while their guidelines are written."
      />
      <div className="mt-[var(--space-6xl)] grid gap-[var(--space-md)] sm:grid-cols-2 xl:grid-cols-3">
        {COMPONENTS.map((component) => {
          const ready = "ready" in component;
          return (
            <NavCard
              key={component.slug}
              href={ready ? `/components/${component.slug}/` : storybookDocs(component.storybook)}
              external={!ready}
              badge={ready ? undefined : "Storybook"}
              title={component.name}
              description={component.summary}
              visual={<Preview slug={component.slug} />}
            />
          );
        })}
      </div>
    </div>
  );
}
