import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@cosmos/Button/Button";
import { Callout, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageBody } from "@/components/site/Page";
import { contrast } from "@/lib/contrast";
import { data, token } from "@/lib/data";

export const metadata: Metadata = { title: "Button accessibility" };

const th = "pb-[var(--space-xs)] pr-[var(--space-md)] text-[length:var(--label-small-bold-font-size)] font-bold";
const td = "border-t py-[var(--space-sm)] pr-[var(--space-md)] align-top";

const ANNOUNCEMENTS = [
  { state: "Rest, hover, pressed, focus", voiceover: "Book room, button", talkback: "Book room, button, double-tap to activate", web: "Book room, button" },
  { state: "Loading", voiceover: "Book room, loading, button", talkback: "Book room, button, loading", web: "Book room, button, busy" },
  { state: "Disabled", voiceover: "Not reached: out of the focus order", talkback: "Not reached: out of the focus order", web: "Not reached: out of the tab order" },
];

/** Label against fill at rest, per brand. Transparent fills are measured on the white page. */
function contrastRows() {
  const rows = [];
  for (const hierarchy of ["primary", "secondary", "tertiary", "text"]) {
    for (const intent of ["", "-destructive"]) {
      const bg = token("component", `button.bg-${hierarchy}${intent}-default`);
      const label = token("component", `button.label-${hierarchy}${intent}-default`);
      rows.push({
        name: `${hierarchy[0].toUpperCase()}${hierarchy.slice(1)}${intent ? " destructive" : ""}`,
        ratios: data.brands.map((brand) => contrast(String(label.byBrand[brand.id].value), String(bg.byBrand[brand.id].value))),
      });
    }
  }
  return rows;
}

function Ratio({ value }: { value: number }) {
  const aa = value >= 4.5;
  return (
    <span className="flex items-center gap-[var(--space-xs)]">
      <span className="font-bold">{value.toFixed(2)}</span>
      <span
        className="rounded-[var(--radius-full)] px-[var(--space-xs)] text-[length:var(--label-small-bold-font-size)] font-bold whitespace-nowrap"
        style={
          aa
            ? { background: "var(--color-bg-fill-success-subtle)", color: "var(--color-text-success-on-bg-fill-subtle)" }
            : { background: "var(--color-bg-fill-caution-subtle)", color: "var(--color-text-caution-on-bg-fill-subtle)" }
        }
      >
        {aa ? "AA" : value >= 3 ? "3:1 floor" : "Below 3:1"}
      </span>
    </span>
  );
}

export default function ButtonAccessibility() {
  const rows = contrastRows();
  const brandRatios = rows.filter((row) => !row.name.includes("destructive")).flatMap((row) => row.ratios);
  const destructivePasses = rows.filter((row) => row.name.includes("destructive")).every((row) => row.ratios.every((ratio) => ratio >= 4.5));
  return (
    <PageBody>
      <H2 id="principles">Principles</H2>
      <ul>
        <li>
          <strong>One stop.</strong> The whole button is one focus stop on every platform. The visible label is its name; icons, the
          spinner and the focus ring are hidden from assistive technology.
        </li>
        <li>
          <strong>Use the native control.</strong> <code>&lt;button&gt;</code> on the web, <code>Button</code> in SwiftUI and
          Compose. Never a clickable <code>div</code>.
        </li>
        <li>
          <strong>Meaning survives without colour.</strong> Destructive intent is colour only, so the label names the consequence:
          Delete account, not a red Delete.
        </li>
        <li>
          <strong>Disabled wins over loading.</strong> A disabled button is inert, so it never announces that it is busy.
        </li>
      </ul>

      <H2 id="keyboard">Keyboard</H2>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr style={{ color: "var(--color-text-tertiary)" }}>
              <th className={th}>Key</th>
              <th className={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Tab, Shift + Tab", "Moves focus to the next or previous button. Disabled buttons are skipped."],
              ["Enter", "Activates the button."],
              ["Space", "Activates the button."],
            ].map(([key, action]) => (
              <tr key={key} style={{ borderColor: "var(--color-border-secondary)" }}>
                <td className={`${td} mono font-bold whitespace-nowrap`} style={{ borderColor: "var(--color-border-secondary)" }}>
                  {key}
                </td>
                <td className={td} style={{ borderColor: "var(--color-border-secondary)" }}>
                  {action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>The focus ring appears on keyboard focus only. Try it: press Tab until a button below is focused.</p>
      <div className="site-block flex flex-wrap justify-center gap-[var(--space-sm)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }}>
        <Button label="Modify search" hierarchy="secondary" />
        <Button label="Search flights" />
        <Button label="Unavailable" isDisabled />
      </div>

      <H2 id="screen-readers">Screen readers</H2>
      <p>What each platform says when it reaches a button labelled Book room.</p>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr style={{ color: "var(--color-text-tertiary)" }}>
              <th className={th}>State</th>
              <th className={th}>VoiceOver (iOS)</th>
              <th className={th}>TalkBack (Android)</th>
              <th className={th}>Web</th>
            </tr>
          </thead>
          <tbody>
            {ANNOUNCEMENTS.map((row) => (
              <tr key={row.state}>
                <td className={`${td} font-bold`} style={{ borderColor: "var(--color-border-secondary)" }}>
                  {row.state}
                </td>
                {[row.voiceover, row.talkback, row.web].map((text, i) => (
                  <td key={i} className={td} style={{ borderColor: "var(--color-border-secondary)", color: "var(--color-text-secondary)" }}>
                    {text.startsWith("Not") ? text : <>&ldquo;{text}&rdquo;</>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Loading</strong> rides on the state, never the name: <code>aria-busy</code> on the web,{" "}
          <code>accessibilityValue</code> on iOS, <code>stateDescription</code> on Android. Keep the button in the focus order so focus
          is not lost when the work finishes.
        </li>
        <li>
          <strong>Disabled</strong> uses the native disabled state, so the button leaves the focus order. If people need to find it and
          learn why it is unavailable, use <code>aria-disabled</code> instead, block activation in code and explain why nearby.
        </li>
      </ul>

      <H2 id="touch-targets">Touch targets</H2>
      <p>
        Every tappable area should be at least 44 by 44. Only Large (48) is tall enough on its own. Give Medium (40) and Small (32)
        the rest from the layout: padding in a list row, or space around a card action.
      </p>
      <div className="site-block flex flex-wrap items-center justify-center gap-[var(--space-5xl)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }}>
        {(["large", "medium", "small"] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-[var(--space-sm)]">
            <span className="relative inline-flex items-center justify-center" style={{ minHeight: "calc(var(--space-6xl) - var(--space-2xs))" }}>
              <span
                className="absolute inset-x-[calc(-1*var(--space-2xs))] top-1/2 -translate-y-1/2 rounded-[var(--radius-md)] border border-dashed"
                style={{ height: "calc(var(--space-6xl) - var(--space-2xs))", borderColor: "var(--color-border-warning-strong)" }}
                aria-hidden="true"
              />
              <Button label={size[0].toUpperCase() + size.slice(1)} size={size} tabIndex={-1} />
            </span>
            <span className="text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              {size === "large" ? "48: meets 44 on its own" : size === "medium" ? "40: needs 4 more" : "32: needs 12 more"}
            </span>
          </div>
        ))}
      </div>

      <H2 id="contrast">Contrast</H2>
      <p>
        Label against fill at rest, measured in each brand. Transparent fills are measured on the white page. Button labels are 12 to
        16 bold, which WCAG AA treats as body text needing 4.5:1.
      </p>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr style={{ color: "var(--color-text-tertiary)" }}>
              <th className={th}>Hierarchy</th>
              {data.brands.map((brand) => (
                <th key={brand.id} className={th}>
                  {brand.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className={`${td} font-bold`} style={{ borderColor: "var(--color-border-secondary)" }}>
                  {row.name}
                </td>
                {row.ratios.map((ratio, i) => (
                  <td key={i} className={td} style={{ borderColor: "var(--color-border-secondary)" }}>
                    <Ratio value={ratio} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout title="Brand buttons sit below 4.5:1 by design">
        Brand-coloured button labels measure between {Math.min(...brandRatios).toFixed(2)} and {Math.max(...brandRatios).toFixed(2)}:1.
        Cosmos holds brand colour to a 3:1 floor so the primaries keep their brand character (see{" "}
        <Link href="/foundations/color/#text-and-contrast">Colour</Link>).{" "}
        {destructivePasses ? "Destructive buttons pass AA in every brand. " : ""}Keep brand button labels short and bold, and never put
        long text in a brand colour.
      </Callout>

      <H2 id="naming">Naming</H2>
      <DoDontGrid>
        <DoDont kind="do" caption="Write the label as the action and its result. It is also what screen readers announce.">
          <Button label="Delete traveller" intent="destructive" />
        </DoDont>
        <DoDont kind="dont" caption="Leave the meaning to colour or to text around the button. Delete on its own does not say what goes.">
          <Button label="Delete" intent="destructive" />
        </DoDont>
      </DoDontGrid>
    </PageBody>
  );
}
