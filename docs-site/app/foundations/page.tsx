import type { Metadata } from "next";
import { NavCard } from "@/components/site/Blocks";
import { PageHeader } from "@/components/site/Page";
import { ColorThumb, ElevationThumb, IconThumb, ShapeThumb, SpacingThumb, TokensThumb, TypeThumb } from "@/components/foundations/Thumbs";

export const metadata: Metadata = { title: "Foundations" };

const CARDS = [
  { href: "/foundations/design-tokens/", title: "How tokens work", description: "Three tiers, one naming scheme, four platforms and three brands.", visual: <TokensThumb /> },
  { href: "/foundations/color/", title: "Colour", description: "Roles, intents, canvases and contrast. Colour is named by job, never by hue.", visual: <ColorThumb /> },
  { href: "/foundations/typography/", title: "Typography", description: "One typeface per brand and a 36-style scale in four groups.", visual: <TypeThumb /> },
  { href: "/foundations/spacing/", title: "Spacing", description: "A T-shirt sized scale for padding, gaps and layout rhythm.", visual: <SpacingThumb /> },
  { href: "/foundations/shape/", title: "Shape", description: "Corner radius from square to pill, and which components use each step.", visual: <ShapeThumb /> },
  { href: "/foundations/elevation/", title: "Elevation", description: "Seven shadows, named by what sits at each height.", visual: <ElevationThumb /> },
  { href: "/foundations/iconography/", title: "Iconography", description: "The glyph set, the size scale and the icon colour roles.", visual: <IconThumb /> },
];

export default function FoundationsPage() {
  return (
    <div className="mx-auto px-[var(--space-xl)] pb-[var(--space-7xl)] lg:px-[var(--space-6xl)]" style={{ maxWidth: "var(--site-home)" }}>
      <PageHeader
        eyebrow="Foundations"
        title="The building blocks"
        lede="Colour, type, space, shape and elevation are the decisions every screen shares. Each one is a set of tokens, so a decision made here reaches web, iOS and Android at once."
      />
      <div className="mt-[var(--space-6xl)] grid gap-[var(--space-md)] sm:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((card) => (
          <NavCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
