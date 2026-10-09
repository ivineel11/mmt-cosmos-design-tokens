import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@cosmos/Button/Button";
import { Chip } from "@/components/site/cosmos-client";
import { Callout, DoDont, DoDontGrid } from "@/components/site/Blocks";
import { H2, PageBody } from "@/components/site/Page";

export const metadata: Metadata = { title: "Button guidelines" };

const row = "flex flex-wrap items-center justify-center gap-[var(--space-xs)]";

export default function ButtonGuidelines() {
  return (
    <PageBody>
      <Callout tone="draft" title="Draft for design review">
        This guidance was drafted by Claude from the Button spec, the Figma component and common travel-app patterns. It has not been
        reviewed by the Cosmos designers yet, so treat placement and copy rules as proposals.
      </Callout>

      <H2 id="usage">Usage</H2>
      <p>
        Use a button when tapping it does something: submits a form, books, pays, saves or opens a step in a flow. If it only takes
        people somewhere else to read, use a link.
      </p>
      <ul>
        <li>
          <strong>To filter or choose</strong> from a set, use a <Link href="/components/">Chip</Link>.
        </li>
        <li>
          <strong>To switch between views</strong> of the same content, use a Segmented control or Tabs.
        </li>
        <li>
          <strong>To turn a setting on or off</strong> that applies straight away, use a Switch.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Use a button for an action that changes something: here, adding a traveller to the booking.">
          <Button label="Add traveller" hierarchy="secondary" leadingIcon="plus" />
        </DoDont>
        <DoDont kind="dont" caption="Use buttons as filters. Filters are selections, so they need a selected state that a button does not have.">
          <div className={row}>
            <Button label="Non-stop" size="small" hierarchy="secondary" />
            <Button label="Morning" size="small" hierarchy="secondary" />
          </div>
        </DoDont>
      </DoDontGrid>

      <H2 id="hierarchy">Choosing a hierarchy</H2>
      <p>
        Start from the most important action on the screen and give it Primary. Everything else steps down. The fewer loud buttons a
        screen has, the easier it is to know what to do next.
      </p>
      <div className="site-block grid gap-[var(--space-sm)]">
        {[
          ["primary", "Primary", "The main action of a screen or step: Search flights, Continue, Pay. Use one per view."],
          ["secondary", "Secondary", "A real alternative next to the primary: Keep booking beside Cancel booking, Modify search."],
          ["tertiary", "Tertiary", "Supporting actions that need a visible target but should not compete: Add to trip, Apply coupon."],
          ["text", "Text", "Low-emphasis or repeated actions: View details on every card, Skip, Terms."],
        ].map(([id, name, text]) => (
          <div key={id} className="grid items-center gap-[var(--space-md)] rounded-[var(--radius-xl)] p-[var(--space-md)] sm:grid-cols-[var(--site-scale-visual)_1fr]" style={{ background: "var(--color-bg-surface)" }}>
            <div className="flex justify-center">
              <Button label={name} hierarchy={id as "primary"} size="small" />
            </div>
            <p className="text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]">{text}</p>
          </div>
        ))}
      </div>
      <DoDontGrid>
        <DoDont kind="do" caption="Pair one Primary with a Secondary, so the next step is obvious and the alternative is still easy to find.">
          <div className={row}>
            <Button label="Modify search" hierarchy="secondary" />
            <Button label="Search flights" />
          </div>
        </DoDont>
        <DoDont kind="dont" caption="Put two Primary buttons side by side. People have to stop and compare them before they can act.">
          <div className={row}>
            <Button label="Modify search" />
            <Button label="Search flights" />
          </div>
        </DoDont>
      </DoDontGrid>

      <H2 id="size">Size</H2>
      <p>
        <strong>Large</strong> (48) is for the main action of a screen, usually in a sticky footer. <strong>Medium</strong> (40) is the
        default everywhere else. <strong>Small</strong> (32) is for dense places such as cards and list rows. Only Large meets the 44
        touch target on its own; give Medium and Small extra tap area from the layout, see{" "}
        <Link href="/components/button/accessibility/#touch-targets">Accessibility</Link>.
      </p>
      <div className="site-block flex flex-wrap items-end justify-center gap-[var(--space-xl)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: "var(--color-bg-surface)" }}>
        <Button label="Large" size="large" />
        <Button label="Medium" />
        <Button label="Small" size="small" />
      </div>

      <H2 id="destructive">Destructive actions</H2>
      <p>
        Use <code>intent=&quot;destructive&quot;</code> for actions that lose something and cannot be undone: cancel a booking,
        delete a traveller, remove a saved card. Red is not announced by screen readers, so the label has to say what will be lost.
        Ask for confirmation before the action runs, and make the safe option easy to reach.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Name the consequence in the label, and offer a clear way back.">
          <div className={row}>
            <Button label="Keep booking" hierarchy="secondary" />
            <Button label="Cancel booking" intent="destructive" />
          </div>
        </DoDont>
        <DoDont kind="dont" caption="Rely on red to explain what Yes and OK will do. Nobody can tell which choice cancels the trip.">
          <div className={row}>
            <Button label="No" hierarchy="secondary" />
            <Button label="Yes" intent="destructive" />
          </div>
        </DoDont>
      </DoDontGrid>

      <H2 id="icons">Icons</H2>
      <p>
        A <strong>leading icon</strong> reinforces what the action does, such as plus for Add. A <strong>trailing chevron</strong>{" "}
        says the action moves people on to another step. Use them when they add meaning, not to decorate.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Use a chevron for an action that continues the flow.">
          <Button label="Continue" trailingIcon="chevron-right" size="large" />
        </DoDont>
        <DoDont kind="dont" caption="Add an icon to every button, or icons on both sides, just for decoration. It slows reading and blurs meaning.">
          <Button label="Continue" leadingIcon="plus" trailingIcon="chevron-right" size="large" />
        </DoDont>
      </DoDontGrid>

      <H2 id="loading">Loading</H2>
      <p>
        When an action takes a moment, set <code>isLoading</code>. A spinner appears ahead of the label, the label stays, and the
        button keeps its width, so nothing jumps. Stop people from activating it twice in your own code; the button stays focusable so
        focus is not lost when the work finishes.
      </p>
      <DoDontGrid>
        <DoDont kind="do" caption="Keep a clear label while the spinner runs. It can say what is happening.">
          <Button label="Paying ₹4,820" isLoading size="large" />
        </DoDont>
        <DoDont kind="caution" caption="Disable the button while it works. A disabled button drops out of focus, and its busy state is not announced.">
          <Button label="Paying ₹4,820" isLoading isDisabled size="large" />
        </DoDont>
      </DoDontGrid>

      <H2 id="inverse">On dark surfaces</H2>
      <p>
        On a dark banner, a navy offer card or a photo under a scrim, set <code>surface=&quot;inverse&quot;</code>. Primary keeps its
        fill; the other hierarchies switch to light labels and translucent tints so they read on any dark background.
      </p>
      <DoDontGrid>
        <DoDont kind="do" tone="inverse" caption="Use the inverse surface on a dark section.">
          <div className={row}>
            <Button label="Explore stays" surface="inverse" />
            <Button label="Terms" surface="inverse" hierarchy="text" />
          </div>
        </DoDont>
        <DoDont kind="dont" tone="inverse" caption="Use default-surface buttons on dark. Their labels and outlines are tuned for white, and their hover states darken instead of lighten.">
          <div className={row}>
            <Button label="Explore stays" hierarchy="secondary" />
            <Button label="Terms" hierarchy="text" />
          </div>
        </DoDont>
      </DoDontGrid>

      <H2 id="writing">Writing labels</H2>
      <ul>
        <li>
          <strong>Start with a verb</strong> and name the result: Book room, Pay ₹4,820, Add traveller.
        </li>
        <li>
          <strong>Keep it short.</strong> One to three words. Sentence case, no full stop.
        </li>
        <li>
          <strong>Be specific.</strong> Avoid OK, Submit and Click here; they make people read the screen again to know what will
          happen.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Say exactly what the button does, including the amount when money moves.">
          <Button label="Pay ₹4,820" size="large" />
        </DoDont>
        <DoDont kind="dont" caption="Use a generic word, or write the label in capitals.">
          <Button label="SUBMIT" size="large" />
        </DoDont>
      </DoDontGrid>

      <H2 id="placement">Placement</H2>
      <ul>
        <li>
          <strong>Sticky footers</strong> hold one Large Primary on the right, with the price or summary on the left.
        </li>
        <li>
          <strong>Dialogs</strong> put the confirming action last: on the right in a row, at the bottom when buttons stack on narrow
          screens.
        </li>
        <li>
          <strong>Cards</strong> use Small buttons, and Text for repeated actions such as View details, so a list of cards stays calm.
        </li>
      </ul>
      <DoDontGrid>
        <DoDont kind="do" caption="Keep the action next to what it acts on.">
          <div className="w-full max-w-[var(--site-card)] rounded-[var(--radius-xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-surface-secondary)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[length:var(--title-small-bold-font-size)] font-bold">IndiGo 6E 2134</span>
              <Chip label="Non-stop" size="small" />
            </div>
            <div className="mt-[var(--space-sm)] flex justify-end">
              <Button label="Select" size="small" />
            </div>
          </div>
        </DoDont>
        <DoDont kind="dont" caption="Stretch a small card action to full width. It reads as the main action of the whole screen.">
          <div className="w-full max-w-[var(--site-card)] rounded-[var(--radius-xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-surface-secondary)" }}>
            <span className="text-[length:var(--title-small-bold-font-size)] font-bold">IndiGo 6E 2134</span>
            <div className="mt-[var(--space-sm)]">
              <Button label="Select" size="large" style={{ width: "100%" }} />
            </div>
          </div>
        </DoDont>
      </DoDontGrid>
    </PageBody>
  );
}
