"use client";

import { Fragment, useState } from "react";
import { Chip } from "@cosmos/Chip/Chip";
import { useBrand } from "@/components/site/BrandProvider";
import { formatValue } from "@/components/site/TokenTable";
import type { ChainLink } from "@/lib/data";

export type ChainExample = { label: string; chains: Record<string, ChainLink[]> };

const TIER: Record<ChainLink["set"], string> = {
  component: "Component",
  semantic: "Semantic",
  primitives: "Primitive",
};

const displayName = (link: ChainLink) => (link.set === "component" ? link.path.replace(".", "/") : link.path.replace(/^color\./, ""));

/** Follows one token down its alias chain in the brand on screen. Switching brand moves
 * the semantic link to a different primitive while the component token stays put. */
export function ChainExplorer({ examples }: { examples: ChainExample[] }) {
  const brand = useBrand();
  const [index, setIndex] = useState(0);
  const chain = examples[index].chains[brand.id] ?? Object.values(examples[index].chains)[0];
  const primitive = chain[chain.length - 1];
  const semantic = chain.find((link) => link.set === "semantic");

  return (
    <div className="site-block">
      <div role="radiogroup" aria-label="Example token" className="mb-[var(--space-md)] flex flex-wrap gap-[var(--space-xs)]">
        {examples.map((example, i) => (
          <Chip key={example.label} label={example.label} size="small" selectionRole="radio" selected={i === index} onSelectedChange={() => setIndex(i)} />
        ))}
      </div>
      <div className="flex flex-col items-stretch gap-[var(--space-xs)] rounded-[var(--radius-2xl)] p-[var(--space-xl)] md:flex-row md:items-center" style={{ background: "var(--color-bg-surface)" }}>
        {chain.map((link, i) => (
          <Fragment key={link.set + link.path}>
            {i > 0 && (
              <span aria-hidden="true" className="self-center text-[length:var(--title-large-regular-font-size)] md:rotate-0" style={{ color: "var(--color-text-tertiary)" }}>
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </span>
            )}
            <div className="min-w-0 flex-1 rounded-[var(--radius-xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-card-subtle)" }}>
              <p className="text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand)" }}>
                {TIER[link.set]}
              </p>
              <p className="mono mt-[var(--space-2xs)] text-[length:var(--label-medium-bold-font-size)] font-bold break-all">{displayName(link)}</p>
              <p className="mt-[var(--space-sm)] flex items-center gap-[var(--space-xs)] text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
                <span className="h-5 w-5 shrink-0 rounded-[var(--radius-sm)]" style={{ background: formatValue(link.value), boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }} />
                <span className="mono">{formatValue(link.value)}</span>
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      {semantic && primitive && (
        <p className="mt-[var(--space-sm)] text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
          In <strong style={{ color: "var(--color-text-primary)" }}>{brand.name}</strong>, <code>{displayName(semantic)}</code> points at{" "}
          <code>{displayName(primitive)}</code>. Switch the brand at the top: the component token never changes, only the semantic link does.
        </p>
      )}
    </div>
  );
}
