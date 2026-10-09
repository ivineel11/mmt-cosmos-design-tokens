import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@cosmos/Button/Button";
import { InContext } from "@/components/button/Examples";
import { Playground } from "@/components/button/Playground";
import { H2, PageBody } from "@/components/site/Page";
import { REPO_URL, STORYBOOK_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Button" };

const HIERARCHIES = [
  { id: "primary", name: "Primary", text: "The one action the screen is for. One per view." },
  { id: "secondary", name: "Secondary", text: "An alternative to the primary action, with an outline." },
  { id: "tertiary", name: "Tertiary", text: "A quieter, tinted action that still needs a target." },
  { id: "text", name: "Text", text: "The lowest emphasis: inline, dense or optional paths." },
] as const;

export default function ButtonOverview() {
  return (
    <PageBody>
      <H2 id="playground">Playground</H2>
      <p>Every prop of the real component. Change the brand at the top of the page and the button follows.</p>
      <Playground />

      <H2 id="hierarchy">Four hierarchies</H2>
      <p>
        Hierarchy sets how much attention a button asks for. Every hierarchy has the same size and footprint, so you can swap one for
        another without moving the layout. <Link href="/components/button/guidelines/#hierarchy">Choosing a hierarchy</Link> explains
        when to use each.
      </p>
      <div className="site-block grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-4">
        {HIERARCHIES.map((hierarchy) => (
          <div key={hierarchy.id} className="flex flex-col rounded-[var(--radius-2xl)]" style={{ background: "var(--color-bg-surface)" }}>
            <div className="flex h-32 items-center justify-center">
              <Button label="Book now" hierarchy={hierarchy.id} />
            </div>
            <div className="px-[var(--space-md)] pb-[var(--space-md)]">
              <p className="text-[length:var(--title-small-bold-font-size)] font-bold">{hierarchy.name}</p>
              <p className="text-[length:var(--body-small-regular-font-size)] leading-[var(--body-small-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
                {hierarchy.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <H2 id="in-context">In context</H2>
      <InContext />

      <H2 id="availability">Availability</H2>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              <th className="pb-[var(--space-xs)]">Platform</th>
              <th className="pb-[var(--space-xs)]">Status</th>
              <th className="pb-[var(--space-xs)]">Where</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Figma", "Available", "Component set 58:202. Hierarchy, Size, State, Intent and Surface: 240 variants."],
              ["Web (React)", "Available", "storybook/src/components/Button, with a Code Connect snippet in Dev Mode."],
              ["iOS", "Tokens only", "button/* tokens in CosmosTokens and CosmosBrand. No SwiftUI component yet."],
              ["Android", "Tokens only", "button/* tokens in CosmosTokens and CosmosBrand. No Compose component yet."],
            ].map(([platform, status, where]) => (
              <tr key={platform} className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
                <td className="py-[var(--space-sm)] pr-[var(--space-md)] font-bold">{platform}</td>
                <td className="py-[var(--space-sm)] pr-[var(--space-md)] whitespace-nowrap">
                  <span
                    className="rounded-[var(--radius-full)] px-[var(--space-xs)] text-[length:var(--label-small-bold-font-size)] font-bold"
                    style={
                      status === "Available"
                        ? { background: "var(--color-bg-fill-success-subtle)", color: "var(--color-text-success-on-bg-fill-subtle)" }
                        : { background: "var(--color-bg-surface)", color: "var(--color-text-secondary)" }
                    }
                  >
                    {status}
                  </span>
                </td>
                <td className="py-[var(--space-sm)]" style={{ color: "var(--color-text-secondary)" }}>
                  {where}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Engineers: every prop is in <a href={`${STORYBOOK_URL}?path=/docs/components-button--docs`}>Storybook</a>, and the full
        generated spec is <a href={`${REPO_URL}/blob/main/components/button.md`}>components/button.md</a>.
      </p>
    </PageBody>
  );
}
