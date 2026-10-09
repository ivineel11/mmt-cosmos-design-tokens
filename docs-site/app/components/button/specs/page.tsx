import type { Metadata } from "next";
import { Button } from "@cosmos/Button/Button";
import { Anatomy } from "@/components/button/Anatomy";
import { SizeSpecs, StateMatrix } from "@/components/button/Specs";
import { Stage } from "@/components/site/Blocks";
import { H2, PageBody } from "@/components/site/Page";
import { TokenTable } from "@/components/site/TokenTable";
import { select } from "@/lib/data";

export const metadata: Metadata = { title: "Button specs" };

const FILTERS = [
  { label: "Primary", contains: ["-primary"] },
  { label: "Secondary", contains: ["-secondary"] },
  { label: "Tertiary", contains: ["-tertiary"] },
  { label: "Text", contains: ["-text"] },
  { label: "Destructive", contains: ["destructive"] },
  { label: "Inverse", contains: ["inverse"] },
  { label: "Size and shape", contains: ["min-height", "min-width", "padding", "radius", "gap", "icon-size", "border-width"] },
  { label: "Focus", contains: ["focus-ring"] },
];

export default function ButtonSpecs() {
  return (
    <PageBody>
      <H2 id="anatomy">Anatomy</H2>
      <p>
        One container, a required label and two optional glyph slots, laid out in a row in a fixed order: spinner, leading icon,
        label, trailing icon. The whole button is one focus stop.
      </p>
      <Anatomy />

      <H2 id="sizes">Sizes</H2>
      <p>
        Size is the only axis that changes measurements. Height, padding, radius, icon size and type scale together; hierarchy,
        intent and state only change colour. Tinted areas are the horizontal padding.
      </p>
      <SizeSpecs />

      <H2 id="color">Colour by state</H2>
      <p>
        Each cell is drawn with the <code>button/bg-*</code>, <code>button/label-*</code> and <code>button/border-*</code> tokens for
        that hierarchy, intent and state, so it shows the brand on screen. Only Secondary paints an outline, and it sits inside the box
        so every hierarchy has the same footprint. Hover over a live button above to compare.
      </p>
      <StateMatrix />

      <H2 id="inverse">Inverse surface</H2>
      <p>
        <code>surface=&quot;inverse&quot;</code> swaps every colour to the <code>button/*-inverse-*</code> tokens and leaves size and
        shape alone. Labels sit at step 300, icons and outlines at 400. The tertiary fill and the hover and pressed fills of Secondary
        and Text are a tint colour at a <code>button/bg-opacity-*</code> token, so they work on near-black, navy and photos.
      </p>
      <Stage tone="inverse">
        {(["default", "destructive"] as const).map((intent) => (
          <div key={intent} className="flex w-full flex-wrap justify-center gap-[var(--space-sm)]">
            {(["primary", "secondary", "tertiary", "text"] as const).map((hierarchy) => (
              <Button
                key={hierarchy}
                label={intent === "destructive" ? "Delete" : hierarchy[0].toUpperCase() + hierarchy.slice(1)}
                hierarchy={hierarchy}
                intent={intent}
                surface="inverse"
              />
            ))}
          </div>
        ))}
      </Stage>

      <H2 id="focus">Focus ring</H2>
      <p>
        The ring is drawn only on keyboard focus (<code>:focus-visible</code>), never on tap or click. It is{" "}
        <code>button/focus-ring-width</code> (2) wide, sits <code>button/focus-ring-offset</code> (2) outside the container with its
        radius raised to match, and has its own colour for destructive and inverse buttons. Press Tab to reach the buttons below.
      </p>
      <Stage>
        <Button label="Default" />
        <Button label="Destructive" intent="destructive" />
        <Button label="Secondary" hierarchy="secondary" />
      </Stage>

      <H2 id="tokens">Tokens</H2>
      <p>
        Every <code>button/*</code> token, with its alias and value in the brand on screen. Components use these; screens never do.
      </p>
      <TokenTable tokens={select("component", "button.")} prefix="button." filters={FILTERS} caption="Button tokens" />
    </PageBody>
  );
}
