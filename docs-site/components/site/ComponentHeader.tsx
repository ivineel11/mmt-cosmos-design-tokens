import type { ReactNode } from "react";
import { ComponentTabs } from "@/components/site/ComponentTabs";
import { PageHeader } from "@/components/site/Page";
import { SiteIcon, type SiteGlyph } from "@/components/site/SiteIcon";
import { FIGMA_URL, REPO_URL, storybookDocs } from "@/lib/site";

function Resource({ href, icon, children }: { href: string; icon: SiteGlyph; children: ReactNode }) {
  return (
    <a
      href={href}
      className="site-focus flex items-center gap-[var(--space-xs)] rounded-[var(--radius-full)] px-[var(--space-sm)] py-[var(--space-2xs)] text-[length:var(--label-medium-bold-font-size)] font-bold transition-colors hover:bg-[var(--color-bg-surface-hover)]"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <SiteIcon name={icon} size={18} />
      {children}
    </a>
  );
}

/** Title, summary, resource links and the four tabs at the top of every component page. */
export function ComponentHeader({
  name,
  slug,
  lede,
  figmaNode,
  storybook,
}: {
  name: string;
  slug: string;
  lede: string;
  /** Figma node id of the component set, such as 58-202. */
  figmaNode: string;
  storybook: string;
}) {
  return (
    <PageHeader
      eyebrow="Components"
      title={name}
      lede={lede}
      footer={
        <>
          <div className="mb-[var(--space-3xl)] flex flex-wrap gap-[var(--space-xs)]">
            <Resource href={`${FIGMA_URL}?node-id=${figmaNode}`} icon="figma">
              Figma
            </Resource>
            <Resource href={storybookDocs(storybook)} icon="book">
              Storybook
            </Resource>
            <Resource href={`${REPO_URL}/blob/main/components/${slug}.md`} icon="code">
              Spec
            </Resource>
          </div>
          <ComponentTabs base={`/components/${slug}/`} />
        </>
      }
    />
  );
}
