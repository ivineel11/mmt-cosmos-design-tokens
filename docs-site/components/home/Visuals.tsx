"use client";

// The Cosmos components carry no "use client" directive of their own, so any page part
// that renders a stateful one lives in a client module like this.
import { Badge } from "@cosmos/Badge/Badge";
import { Button } from "@cosmos/Button/Button";
import { Checkbox } from "@cosmos/Checkbox/Checkbox";
import { Chip } from "@cosmos/Chip/Chip";
import { Switch } from "@cosmos/Switch/Switch";

/** Card art for Foundations: a type specimen over swatches and radius steps. */
export function FoundationsVisual() {
  return (
    <div className="flex items-end gap-[var(--space-md)]" aria-hidden="true">
      <span className="text-[length:var(--site-display-size)] leading-none font-black">Aa</span>
      <div className="flex flex-col gap-[var(--space-2xs)]">
        <div className="flex gap-[var(--space-2xs)]">
          {["--color-bg-fill-brand", "--color-bg-fill-success-strong", "--color-bg-fill-caution-strong", "--color-bg-fill-warning-strong"].map((name) => (
            <span key={name} className="h-6 w-6 rounded-[var(--radius-full)]" style={{ background: `var(${name})` }} />
          ))}
        </div>
        <div className="flex items-end gap-[var(--space-2xs)]">
          {["--radius-none", "--radius-md", "--radius-xl", "--radius-full"].map((name) => (
            <span key={name} className="h-6 w-6" style={{ borderRadius: `var(${name})`, border: "var(--stroke-strong) solid var(--color-border-strong)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Card art for Components: a few live controls. */
export function ComponentsVisual() {
  return (
    <div className="pointer-events-none flex scale-90 flex-col items-center gap-[var(--space-sm)]" aria-hidden="true" inert>
      <div className="flex items-center gap-[var(--space-xs)]">
        <Button label="Book" size="small" />
        <Switch defaultChecked size="small" aria-label="Sample" />
        <Badge type="count" count={3} intent="warning" />
      </div>
      <div className="flex items-center gap-[var(--space-xs)]">
        <Chip label="Non-stop" size="small" defaultSelected />
        <Checkbox defaultChecked aria-label="Sample" />
      </div>
    </div>
  );
}

/** Card art for Tokens: one alias chain, primitive to component. */
export function TokensVisual() {
  const step = "rounded-[var(--radius-md)] px-[var(--space-xs)] py-[var(--space-2xs)] mono text-[length:var(--label-small-regular-font-size)]";
  return (
    <div className="flex flex-col items-center gap-[var(--space-2xs)]" aria-hidden="true">
      <span className={step} style={{ background: "var(--color-bg)" }}>
        button/bg-primary
      </span>
      <span style={{ color: "var(--color-text-tertiary)" }}>↓</span>
      <span className={step} style={{ background: "var(--color-bg)" }}>
        bg-fill-brand
      </span>
      <span style={{ color: "var(--color-text-tertiary)" }}>↓</span>
      <span className={`${step} flex items-center gap-[var(--space-2xs)]`} style={{ background: "var(--color-bg)" }}>
        <span className="h-3 w-3 rounded-[var(--radius-full)]" style={{ background: "var(--color-bg-fill-brand)" }} />
        primitive
      </span>
    </div>
  );
}

/** Card art for Storybook: a props panel beside a canvas. */
export function StorybookVisual() {
  return (
    <div className="flex w-4/5 overflow-hidden rounded-[var(--radius-lg)]" aria-hidden="true" style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-card)" }}>
      <div className="flex flex-1 items-center justify-center py-[var(--space-xl)]">
        <span className="rounded-[var(--radius-md)] px-[var(--space-sm)] py-[var(--space-2xs)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ background: "var(--color-bg-fill-brand)", color: "var(--color-text-brand-on-bg-fill)" }}>
          Label
        </span>
      </div>
      <div className="flex w-2/5 flex-col justify-center gap-[var(--space-2xs)] border-l p-[var(--space-sm)]" style={{ borderColor: "var(--color-border-secondary)" }}>
        {[70, 50, 85, 40].map((width) => (
          <span key={width} className="h-1.5 rounded-[var(--radius-full)]" style={{ width: `${width}%`, background: "var(--color-bg-surface-hover)" }} />
        ))}
      </div>
    </div>
  );
}
