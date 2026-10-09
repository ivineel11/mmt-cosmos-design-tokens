import type { Metadata } from "next";
import Link from "next/link";
import { Callout, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageFrame, PageHeader } from "@/components/site/Page";
import { CanvasPairing, IntentMatrix, InverseSample, Palettes } from "@/components/foundations/ColorBlocks";
import { TextContrast } from "@/components/foundations/TextContrast";
import { data } from "@/lib/data";

export const metadata: Metadata = { title: "Colour" };

const ROLES = [
  { name: "bg", label: "Background", text: "The page canvas: white (bg) or grey (bg-secondary)." },
  { name: "bg-surface", label: "Surface", text: "Containers on the canvas: cards, sheets, sections." },
  { name: "bg-fill", label: "Fill", text: "Controls and emphasis: buttons, badges, banners." },
  { name: "text", label: "Text", text: "Copy, each paired with the surface it was checked on." },
  { name: "border", label: "Border", text: "Outlines and dividers. An edge, never height." },
  { name: "icon", label: "Icon", text: "Glyphs, tuned separately from text so weight can differ." },
];

const TEXT_PATHS = [
  "color.text-primary",
  "color.text-secondary",
  "color.text-tertiary",
  "color.text-disabled",
  "color.text-brand",
  "color.text-link",
  "color.text-success",
  "color.text-caution",
  "color.text-warning",
  "color.text-info",
];

function RoleSwatch({ role }: { role: string }) {
  const box = "flex h-20 items-center justify-center rounded-[var(--radius-lg)]";
  switch (role) {
    case "bg":
      return (
        <div className={`${box} gap-[var(--space-xs)]`} style={{ background: "var(--color-bg-secondary)" }}>
          <span className="h-12 w-12 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-card-subtle)" }} />
          <span className="h-12 w-12 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg-secondary)", boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border)" }} />
        </div>
      );
    case "bg-surface":
      return (
        <div className={box} style={{ background: "var(--color-bg)", boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
          <span className="h-12 w-24 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg-surface)" }} />
        </div>
      );
    case "bg-fill":
      return (
        <div className={`${box} gap-[var(--space-xs)]`} style={{ background: "var(--color-bg-surface)" }}>
          <span className="h-8 w-16 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg-fill-brand)" }} />
          <span className="h-8 w-16 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg-fill)", boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border)" }} />
        </div>
      );
    case "text":
      return (
        <div className={`${box} gap-[var(--space-sm)] text-[length:var(--headline-small-black-font-size)] font-black`} style={{ background: "var(--color-bg-surface)" }}>
          <span style={{ color: "var(--color-text-primary)" }}>Aa</span>
          <span style={{ color: "var(--color-text-secondary)" }}>Aa</span>
          <span style={{ color: "var(--color-text-brand)" }}>Aa</span>
        </div>
      );
    case "border":
      return (
        <div className={`${box} gap-[var(--space-xs)]`} style={{ background: "var(--color-bg-surface)" }}>
          {["--color-border-secondary", "--color-border", "--color-border-strong", "--color-border-brand"].map((name) => (
            <span key={name} className="h-10 w-10 rounded-[var(--radius-md)]" style={{ background: "var(--color-bg)", boxShadow: `inset 0 0 0 var(--stroke-strong) var(${name})` }} />
          ))}
        </div>
      );
    default:
      return (
        <div className={`${box} gap-[var(--space-sm)]`} style={{ background: "var(--color-bg-surface)" }}>
          {["--color-icon", "--color-icon-secondary", "--color-icon-brand", "--color-icon-success"].map((name) => (
            <svg key={name} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke={`var(${name})`} strokeWidth="2" />
              <circle cx="12" cy="12" r="3.5" fill={`var(${name})`} />
            </svg>
          ))}
        </div>
      );
  }
}

export default function ColorPage() {
  const pairsByBrand = Object.fromEntries(data.brands.map((brand) => [brand.id, brand.contrastPairs]));

  return (
    <PageFrame
      header={
        <PageHeader
          eyebrow="Foundations"
          title="Colour"
          lede="Cosmos names colour by the job it does, never by its hue. A role such as bg-fill-brand tells you where it goes and what it means, and it can change colour per brand without anything else changing."
        >
          <div className="flex h-36 overflow-hidden rounded-[var(--radius-2xl)]" aria-hidden="true">
            {[
              "--color-bg-surface-brand",
              "--color-bg-surface-brand-hover",
              "--color-bg-fill-brand",
              "--color-bg-fill-brand-hover",
              "--color-bg-fill-brand-pressed",
              "--color-bg-fill-success-strong",
              "--color-bg-fill-caution-strong",
              "--color-bg-fill-warning-strong",
              "--color-bg-surface-inverse",
            ].map((name, i) => (
              <span key={name} className="flex-1" style={{ background: `var(${name})`, flexGrow: i === 2 ? 3 : 1 }} />
            ))}
          </div>
        </PageHeader>
      }
    >
      <H2 id="roles">Roles</H2>
      <p>
        Every semantic colour belongs to one of six roles. Pick the role first, then the intent and the state. Use semantic tokens in
        product and in Figma; the primitive palettes at the bottom of this page exist so a colour can be re-tinted in one place.
      </p>
      <div className="site-block grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role.name}>
            <RoleSwatch role={role.name} />
            <p className="mt-[var(--space-sm)] text-[length:var(--title-small-bold-font-size)] font-bold">
              {role.label} <span className="mono font-normal" style={{ color: "var(--color-text-tertiary)" }}>{role.name}-*</span>
            </p>
            <p className="text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
              {role.text}
            </p>
          </div>
        ))}
      </div>

      <H2 id="intents">Intents</H2>
      <p>
        Five intents carry meaning across every role. Each has a strong fill for emphasis, a subtle fill for quieter moments, and
        text, border and icon partners. In Cosmos <strong>warning is red</strong> and means something went wrong;{" "}
        <strong>caution is amber</strong> and means take care. Only brand changes between MakeMyTrip, myBiz and Goibibo.
      </p>
      <IntentMatrix />
      <DoDontGrid>
        <DoDont kind="do" caption="Say what happened in the copy as well as in colour, so the message survives colour blindness and screen readers.">
          <span className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-lg)] px-[var(--space-md)] py-[var(--space-sm)] text-[length:var(--body-medium-bold-font-size)] font-bold" style={{ background: "var(--color-bg-fill-warning-subtle)", color: "var(--color-text-warning-on-bg-fill-subtle)" }}>
            Payment failed. Try another card.
          </span>
        </DoDont>
        <DoDont kind="dont" caption="Use brand colour for an error, or rely on colour alone to say something went wrong.">
          <span className="flex items-center gap-[var(--space-xs)] rounded-[var(--radius-lg)] px-[var(--space-md)] py-[var(--space-sm)] text-[length:var(--body-medium-bold-font-size)] font-bold" style={{ background: "var(--color-bg-surface-brand)", color: "var(--color-text-brand)" }}>
            Payment
          </span>
        </DoDont>
      </DoDontGrid>

      <H2 id="canvas-and-container">Canvas and container</H2>
      <p>
        A screen sits on one of two canvases, white or grey, and a container on it is always the other colour. Match the suffix:{" "}
        <code>bg</code> pairs with <code>bg-surface</code>, and <code>bg-secondary</code> pairs with <code>bg-surface-secondary</code>.
        Controls take their body colour from <code>bg-fill</code>, so a button stays white on either canvas.
      </p>
      <CanvasPairing />
      <DoDontGrid>
        <DoDont kind="do" caption="Put a white container (bg-surface-secondary) on the grey canvas, so the card reads without needing a border.">
          <span className="h-24 w-40 rounded-[var(--radius-xl)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-card-subtle)" }} />
        </DoDont>
        <DoDont kind="dont" caption="Put a grey container (bg-surface) on the grey canvas. The two are the same value, and the card disappears.">
          <span className="h-24 w-40 rounded-[var(--radius-xl)]" style={{ background: "var(--color-bg-surface)" }} />
        </DoDont>
      </DoDontGrid>

      <H2 id="text-and-contrast">Text and contrast</H2>
      <p>
        Each text token is measured against the surface it was designed for, in the brand on screen. Body copy needs 4.5:1; large text
        and interface glyphs need 3:1. Brand text in myBiz and Goibibo, and azure text in MakeMyTrip, is held to the 3:1 floor, so use
        it for large or bold text and links, not long paragraphs.
      </p>
      <TextContrast pairsByBrand={pairsByBrand} paths={TEXT_PATHS} />
      <Callout title="Text on a coloured fill">
        Use the partner token whose name ends in the fill you are on: <code>text-success-on-bg-fill-strong</code> on{" "}
        <code>bg-fill-success-strong</code>. Every <code>on-</code> pair is checked by the token linter in all three brands.
      </Callout>

      <H2 id="inverse">Inverse surfaces</H2>
      <p>
        Cosmos has one light theme, but products still place content on dark sections: offer banners, dark tooltips and snackbars,
        photos under a scrim. The <code>-inverse</code> roles are for those. Labels sit at step 300 and icons and outlines at 400, and
        hover and pressed get lighter instead of darker. Inverse is a surface inside the light theme, not a dark mode.
      </p>
      <InverseSample />
      <p>
        Components take a <code>surface</code> prop for this. <Link href="/components/button/">Button</Link> is the first to support it.
      </p>

      <H2 id="palettes">Primitive palettes</H2>
      <p>
        Fifteen ramps from 50 to 950, plus white. Each brand primary is outlined on its ramp. Primitives never change between brands;
        a brand changes which step a role points at. You will rarely pick from these directly.
      </p>
      <Palettes palettes={data.primitives.palettes} />
      <div className="site-block">
        <Link href="/tokens/#semantic-colors" className="site-link-button" data-hierarchy="secondary">
          All colour tokens
        </Link>
      </div>
    </PageFrame>
  );
}
