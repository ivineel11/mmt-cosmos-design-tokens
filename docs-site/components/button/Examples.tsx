import { Button } from "@cosmos/Button/Button";

const card = "rounded-[var(--radius-xl)] p-[var(--space-xl)]";

/** Buttons in realistic travel screens. Copy is realistic here, unlike the variants. */
export function InContext() {
  return (
    <div className="site-block grid gap-[var(--space-md)] md:grid-cols-2">
      {/* Booking footer */}
      <div className="flex flex-col justify-end rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="flex items-center justify-between gap-[var(--space-md)] rounded-[var(--radius-xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-sticky-bottom)" }}>
          <div>
            <p className="text-[length:var(--title-large-black-font-size)] leading-[var(--title-large-black-line-height)] font-black">₹4,820</p>
            <p className="text-[length:var(--body-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
              for 2 adults, taxes included
            </p>
          </div>
          <Button label="Continue" size="large" trailingIcon="chevron-right" />
        </div>
        <p className="mt-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
          Booking footer: one large Primary, the next step
        </p>
      </div>

      {/* Hotel card */}
      <div className="flex flex-col justify-end rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-secondary)" }}>
        <div className={card} style={{ background: "var(--color-bg-surface-secondary)" }}>
          <p className="text-[length:var(--title-medium-bold-font-size)] font-bold">Deluxe room, sea view</p>
          <p className="text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
            Breakfast included · Free cancellation
          </p>
          <div className="mt-[var(--space-md)] flex flex-wrap gap-[var(--space-xs)]">
            <Button label="Select room" size="small" />
            <Button label="Room details" size="small" hierarchy="text" />
          </div>
        </div>
        <p className="mt-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
          Card: small buttons, Text for the secondary path
        </p>
      </div>

      {/* Destructive dialog */}
      <div className="flex flex-col justify-end rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "color-mix(in srgb, var(--color-bg-surface-inverse) calc(var(--opacity-scrim) * 100%), var(--color-bg-secondary))" }}>
        <div className={card} style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-modal)" }}>
          <p className="text-[length:var(--title-medium-bold-font-size)] font-bold">Cancel this booking?</p>
          <p className="mt-[var(--space-2xs)] text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
            You will get ₹3,900 back within 5 working days. This cannot be undone.
          </p>
          <div className="mt-[var(--space-md)] flex flex-wrap justify-end gap-[var(--space-xs)]">
            <Button label="Keep booking" hierarchy="secondary" />
            <Button label="Cancel booking" intent="destructive" />
          </div>
        </div>
        <p className="mt-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-primary)" }}>
          Dialog: the label names the consequence
        </p>
      </div>

      {/* Inverse banner */}
      <div className="flex flex-col justify-end rounded-[var(--radius-2xl)] p-[var(--space-md)]" style={{ background: "var(--color-bg-secondary)" }}>
        <div className={card} style={{ background: "var(--color-bg-surface-inverse)" }}>
          <p className="text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand-inverse)" }}>
            Monsoon sale
          </p>
          <p className="text-[length:var(--title-large-black-font-size)] leading-[var(--title-large-black-line-height)] font-black" style={{ color: "var(--color-text-inverse)" }}>
            Kerala from ₹2,499
          </p>
          <div className="mt-[var(--space-md)] flex flex-wrap gap-[var(--space-xs)]">
            <Button label="Explore stays" surface="inverse" size="small" />
            <Button label="Terms" surface="inverse" hierarchy="text" size="small" />
          </div>
        </div>
        <p className="mt-[var(--space-sm)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
          Dark banner: surface inverse
        </p>
      </div>
    </div>
  );
}
