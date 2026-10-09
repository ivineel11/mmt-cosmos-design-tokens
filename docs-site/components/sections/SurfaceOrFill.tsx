import type { ReactNode } from "react";
import { Card } from "@/components/Section";

const FILL_USES = [
  "Buttons, including the tinted secondary, tertiary and text states",
  "Checkbox and radio boxes, switch tracks and thumbs",
  "Chips, segmented control tracks and thumbs",
  "Slider tracks and halos",
  "Input field bodies",
  "Badges, counters and status dots",
  "Icon wells, such as the leading circle of a list row",
  "Skeleton blocks",
];

const SURFACE_USES = [
  "Page sections, wells and grouped areas",
  "Cards, sheets, dialogs and popovers",
  "Menu panels and list groups",
  "Banners, snackbars and tooltips",
  "Tappable rows and cards, at rest and on hover or press",
  "Scrims and dark overlays (bg-surface-inverse)",
  "A disabled section or card (bg-surface-disabled)",
];

const RULES: { title: string; body: ReactNode }[] = [
  {
    title: "Tappable rows stay surfaces.",
    body: (
      <>
        A menu item or list row is interactive, but it is a slice of its container and holds other
        content. Its hover and pressed steps come from the surface it sits in:{" "}
        <Code>bg-surface-hover</Code>, <Code>bg-surface-secondary-hover</Code>, or{" "}
        <Code>bg-surface-warning-hover</Code> for a destructive item. If an element holds other
        components or lines of content, it is a surface; if it is a single control or mark, it is a
        fill.
      </>
    ),
  },
  {
    title: "A control inside a surface is still a fill.",
    body: (
      <>
        A button in a snackbar or a chip on a card takes <Code>bg-fill-*</Code>, whatever it sits
        on.
      </>
    ),
  },
  {
    title: "Disabled follows the same split.",
    body: (
      <>
        A disabled control uses <Code>bg-fill-disabled-*</Code>; an unavailable section or card uses{" "}
        <Code>bg-surface-disabled</Code>. The one exception is the disabled chip and the disabled
        list icon well, which use <Code>bg-surface-disabled-subtle</Code> (neutral.50): no disabled
        fill is that light, and <Code>bg-fill-disabled-subtlest</Code> (neutral.100) would vanish on
        the grey canvas.
      </>
    ),
  },
  {
    title: "Pair the foreground with the same role.",
    body: (
      <>
        On a fill, use <Code>*-on-bg-fill-*</Code> labels and icons; on a surface, use{" "}
        <Code>*-on-bg-surface-*</Code>. Keep the pairing even where the two resolve to the same
        colour, so they can diverge later, for example in another brand.
      </>
    ),
  },
];

function Code({ children }: { children: ReactNode }) {
  return <code className="mono text-xs">{children}</code>;
}

function Tag({ kind, children }: { kind: "surface" | "fill"; children: ReactNode }) {
  const fill = kind === "fill";
  return (
    <span
      className="mono inline-block rounded border px-1.5 py-0.5 text-[11px] leading-4"
      style={{
        borderStyle: fill ? "solid" : "dashed",
        borderColor: fill ? "var(--color-border-brand)" : "var(--color-border-strong)",
        color: fill ? "var(--color-text-brand)" : "var(--color-text-secondary)",
      }}
    >
      {fill ? "Fill" : "Surface"} · {children}
    </span>
  );
}

/** A card on the grey canvas with each part labelled by the role its background takes. */
function Example() {
  return (
    <div className="rounded-xl p-6" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="mono text-xs" style={{ color: "var(--color-text-tertiary)" }}>
        bg-secondary (canvas)
      </div>
      <div
        className="mt-3 grid gap-3 rounded-xl p-5"
        style={{ background: "var(--color-bg-surface-secondary)" }}
      >
        <div>
          <Tag kind="surface">bg-surface-secondary: the card holds content</Tag>
        </div>
        <div
          className="flex items-center justify-between gap-3 rounded-lg p-3"
          style={{ background: "var(--color-bg-surface-secondary-hover)" }}
        >
          <div>
            <div className="text-sm leading-5 font-bold">Mumbai to Goa</div>
            <div className="text-xs leading-4" style={{ color: "var(--color-text-secondary)" }}>
              Fri, 14 Nov · 1 traveller
            </div>
          </div>
          <span
            className="rounded px-1.5 py-0.5 text-xs leading-4 font-bold"
            style={{
              background: "var(--color-bg-fill-brand-subtlest)",
              color: "var(--color-text-brand)",
            }}
          >
            Cheapest
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag kind="surface">bg-surface-secondary-hover: a hovered row is still part of the card</Tag>
          <Tag kind="fill">bg-fill-brand-subtlest: the badge is a mark</Tag>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-lg px-3 py-1.5 text-sm leading-5 font-bold"
            style={{
              background: "var(--color-bg-fill-brand-subtlest)",
              color: "var(--color-text-brand)",
            }}
          >
            Add traveller
          </span>
          <span
            className="rounded-full border px-3 py-1.5 text-sm leading-5"
            style={{
              background: "var(--color-bg-fill-brand-subtlest)",
              borderColor: "var(--color-border-brand)",
              color: "var(--color-text-brand)",
            }}
          >
            Non-stop
          </span>
          <span
            className="rounded-full border px-3 py-1.5 text-sm leading-5"
            style={{ background: "var(--color-bg-fill)", borderColor: "var(--color-border)" }}
          >
            Refundable
          </span>
        </div>
        <div>
          <Tag kind="fill">bg-fill-*: each control colours its own body</Tag>
        </div>
      </div>
    </div>
  );
}

export function SurfaceOrFill() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            title: "Fill",
            body: "The colour is the body of the element itself, the shape that is the control or the mark. Take the colour away and the element loses its shape.",
          },
          {
            title: "Surface",
            body: "The colour is an area that holds other content. Take the colour away and the content is still there, just without a backdrop.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--color-border-secondary)" }}
          >
            <h3 className="text-sm leading-5 font-bold">{item.title}</h3>
            <p className="mt-1 text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <Example />

      <Card>
        <div className="grid sm:grid-cols-2">
          {[
            { title: "Use bg-fill-* for", items: FILL_USES },
            { title: "Use bg-surface-* for", items: SURFACE_USES },
          ].map((column, i) => (
            <div
              key={column.title}
              className={`p-4${i === 1 ? " border-t sm:border-t-0 sm:border-l" : ""}`}
              style={{ borderColor: "var(--color-border)" }}
            >
              <h3 className="mono text-xs font-bold">{column.title}</h3>
              <ul
                className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <div className="max-w-2xl space-y-4">
        {RULES.map((rule) => (
          <p key={rule.title} className="text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
            <strong style={{ color: "var(--color-text-primary)" }}>{rule.title}</strong> {rule.body}
          </p>
        ))}
      </div>
    </div>
  );
}
