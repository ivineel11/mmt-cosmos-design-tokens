import type { Metadata } from "next";
import { CodeBlock, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { ChainExplorer } from "@/components/foundations/ChainExplorer";
import { NameAnatomy } from "@/components/foundations/NameAnatomy";
import { chainByBrand, data, token, tokenCount } from "@/lib/data";
import { PLATFORMS } from "@/lib/types";

export const metadata: Metadata = { title: "How tokens work" };

const TIERS = [
  {
    set: "primitives" as const,
    name: "Primitives",
    holds: "Raw values: hex colours, pixel sizes, the Lato and Rubik families.",
    who: "Token authors only",
    example: "azure.700",
  },
  {
    set: "semantic" as const,
    name: "Semantic",
    holds: "Roles that describe intent, such as text-primary and bg-fill-brand.",
    who: "Designers in Figma, and product code",
    example: "bg-fill-brand",
  },
  {
    set: "component" as const,
    name: "Component",
    holds: "One token per property, variant and state of a component.",
    who: "Cosmos components and their Figma variables",
    example: "button/bg-primary-default",
  },
];

const EXAMPLES = [
  { label: "Button fill", path: "button.bg-primary-default" },
  { label: "Switch on", path: "switch.track-on-default" },
  { label: "Selected chip", path: "chip.bg-selected-default" },
  { label: "Success badge", path: "badge.bg-strong-success" },
];

export default function DesignTokensPage() {
  const examples = EXAMPLES.map((example) => ({ label: example.label, chains: chainByBrand("component", example.path) }));
  const sample = [token("component", "button.bg-primary-default"), token("semantic", "space.md")];
  const overrides = data.brands.slice(1).map((brand) => {
    const keys = Object.keys(brand.tokens).filter((key) => key.startsWith("semantic:"));
    const colours = keys.filter((key) => key.startsWith("semantic:color.")).length;
    return { name: brand.name, total: keys.length, colours, type: keys.length - colours };
  });

  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="How tokens work"
          lede="A token is a named design decision. Cosmos keeps every decision once, in a single tokens file, and builds it into CSS, JavaScript, Swift and Kotlin, so Figma and every platform read the same values."
        />
      }
    >
      <H2 id="tiers">Three tiers</H2>
      <p>
        Tokens come in three tiers, and each tier only points at the tier below it. A component token names a semantic role, and a
        semantic role names a primitive. Change a primitive and everything above it follows; change what a role points at and only
        that role moves.
      </p>
      <div className="site-block grid gap-[var(--space-md)] md:grid-cols-3">
        {TIERS.map((tier, i) => (
          <div key={tier.set} className="flex flex-col rounded-[var(--radius-2xl)] p-[var(--space-xl)]" style={{ background: i === 1 ? "var(--color-bg-surface-brand)" : "var(--color-bg-surface)" }}>
            <p className="text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand)" }}>
              Tier {i + 1}
            </p>
            <p className="mt-[var(--space-2xs)] text-[length:var(--headline-small-black-font-size)] leading-[var(--headline-small-black-line-height)] font-black">{tier.name}</p>
            <p className="mt-[var(--space-2xs)] text-[length:var(--title-large-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              {tokenCount(tier.set)} tokens
            </p>
            <p className="mt-[var(--space-md)] flex-1 text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]">{tier.holds}</p>
            <p className="mono mt-[var(--space-md)] rounded-[var(--radius-md)] px-[var(--space-sm)] py-[var(--space-xs)] text-[length:var(--label-small-regular-font-size)]" style={{ background: "var(--color-bg)" }}>
              {tier.example}
            </p>
            <p className="mt-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
              Used by: {tier.who}
            </p>
          </div>
        ))}
      </div>

      <H2 id="follow-a-token">Follow a token</H2>
      <p>
        Pick a component token and follow it down to the colour it ends on. Then switch the brand at the top of the page. The
        component token and the semantic role stay the same; the brand only changes which primitive the role points at. The success
        badge does not change at all, because success is not a brand role.
      </p>
      <ChainExplorer examples={examples} />

      <H2 id="reading-a-name">Reading a name</H2>
      <p>
        Semantic names are built from parts, so you can tell what a token is for without looking it up. They describe a job, never a
        value: it is <code>text-caution</code>, not <code>text-yellow-700</code>.
      </p>
      <div className="site-block flex flex-col gap-[var(--space-3xl)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }}>
        <NameAnatomy parts={[{ text: "bg-fill", label: "Role" }, { text: "brand", label: "Intent" }, { text: "hover", label: "State" }]} />
        <NameAnatomy parts={[{ text: "text", label: "Role" }, { text: "info", label: "Intent" }, { text: "on-bg-fill-strong", label: "The surface it sits on" }]} />
        <NameAnatomy joiner="/" parts={[{ text: "button", label: "Component" }, { text: "bg-primary-hover", label: "Property, variant and state" }]} />
      </div>
      <ul>
        <li>
          <strong>Role</strong> is the job: <code>bg</code> for the page canvas, <code>bg-surface</code> for containers,{" "}
          <code>bg-fill</code> for controls and emphasis, then <code>text</code>, <code>border</code> and <code>icon</code>.
        </li>
        <li>
          <strong>Intent</strong> is the meaning: <code>brand</code>, <code>info</code>, <code>success</code>, <code>caution</code>{" "}
          (amber) and <code>warning</code> (red, for errors).
        </li>
        <li>
          <strong>Strength</strong> is <code>strong</code> or <code>subtle</code>, and <strong>state</strong> is <code>hover</code>,{" "}
          <code>pressed</code> or <code>disabled</code>.
        </li>
        <li>
          An <code>on-</code> suffix names the background a text or icon token was checked against, so the pair always passes
          contrast.
        </li>
      </ul>

      <H2 id="which-tier">Which tier to use</H2>
      <p>
        Design and build screens with semantic tokens. Only Cosmos components use component tokens, and nothing outside the tokens
        file uses primitives.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Use the semantic role. It re-tints for myBiz and Goibibo and survives any palette change.">
          <CodeBlock bare>{`.cta {\n  background: var(--color-bg-fill-brand);\n  color: var(--color-text-brand-on-bg-fill);\n}`}</CodeBlock>
        </DoDont>
        <DoDont kind="dont" caption="Skip the role and use a primitive or a hex value. The colour is now stuck on MakeMyTrip azure in every brand.">
          <CodeBlock bare>{`.cta {\n  background: var(--color-azure-700);\n  color: #FFFFFF;\n}`}</CodeBlock>
        </DoDont>
      </DoDontGrid>

      <H2 id="brands">Brands</H2>
      <p>
        MakeMyTrip is the default brand. Every other brand is a short list of semantic tokens that point somewhere else, and nothing
        else changes: sizes, spacing, radius and every component token are shared.
      </p>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              <th className="pb-[var(--space-xs)]">Brand</th>
              <th className="pb-[var(--space-xs)]">Semantic tokens it re-points</th>
              <th className="pb-[var(--space-xs)]">What changes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
              <td className="py-[var(--space-sm)] font-bold">{data.brands[0].name}</td>
              <td className="py-[var(--space-sm)]">None, it is the default</td>
              <td className="py-[var(--space-sm)]">Azure brand ramp, Lato</td>
            </tr>
            {overrides.map((brand) => (
              <tr key={brand.name} className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
                <td className="py-[var(--space-sm)] font-bold">{brand.name}</td>
                <td className="py-[var(--space-sm)]">{brand.total}</td>
                <td className="py-[var(--space-sm)]">
                  {brand.colours} brand colour roles{brand.type > 0 ? `, plus the typeface, weights and ${brand.type - 3} type styles` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        In Figma the semantic collection has one mode per brand through extended collections, so a frame switches brand by switching
        mode. In code, set <code>data-brand</code> on any element and everything inside it follows, exactly as the brand cards on the
        home page do.
      </p>

      <H2 id="platforms">One name, four platforms</H2>
      <p>The build turns each token path into the naming convention of each platform. The value is identical everywhere.</p>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              <th className="pb-[var(--space-xs)]">Platform</th>
              {sample.map((entry) => (
                <th key={entry.path} className="pb-[var(--space-xs)] mono font-bold">
                  {entry.set === "component" ? entry.path.replace(".", "/") : entry.path}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((platform) => (
              <tr key={platform.id} className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
                <td className="py-[var(--space-sm)] pr-[var(--space-md)] text-[length:var(--body-medium-bold-font-size)] font-bold">{platform.label}</td>
                {sample.map((entry) => (
                  <td key={entry.path} className="mono py-[var(--space-sm)] pr-[var(--space-md)] text-[length:var(--label-small-regular-font-size)]">
                    {entry.copy[platform.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageFrame>
  );
}
