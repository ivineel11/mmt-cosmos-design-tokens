"use client";

import { Button } from "@cosmos/Button/Button";
import { Switch } from "@cosmos/Switch/Switch";
import { setBrand, useBrandId, useBrands } from "@/components/site/BrandProvider";

/** One line per brand. The colours and typefaces themselves come from the tokens. */
const ABOUT: Record<string, string> = {
  mmt: "Leisure travel. Azure primary, set in Lato.",
  mybiz: "Business travel inside the MakeMyTrip app. Pomegranate primary, set in Lato.",
  goibibo: "Value travel. Thunderbird primary, set in Rubik.",
};

const RAMP = ["--color-bg-surface-brand-hover", "--color-bg-surface-brand-pressed-strong", "--color-bg-fill-brand", "--color-bg-fill-brand-hover", "--color-bg-fill-brand-pressed"];

/** Each card scopes data-brand to itself, so all three brands render side by side
 * whatever the switcher says. Choosing a card switches the whole site. */
export function BrandCards() {
  const brands = useBrands();
  const current = useBrandId();

  return (
    <div className="grid gap-[var(--space-md)] md:grid-cols-3">
      {brands.map((brand) => {
        const active = brand.id === current;
        return (
          <div
            key={brand.id}
            data-brand={brand.id}
            className="flex flex-col rounded-[var(--radius-2xl)] p-[var(--space-xl)]"
            style={{
              background: "var(--color-bg-surface-brand)",
              boxShadow: active ? "inset 0 0 0 var(--stroke-strong) var(--color-border-brand)" : undefined,
              fontFamily: "var(--typeface-default), system-ui, sans-serif",
            }}
          >
            <div className="flex items-start justify-between gap-[var(--space-sm)]">
              <div>
                <p className="text-[length:var(--headline-small-black-font-size)] leading-[var(--headline-small-black-line-height)] font-black">{brand.name}</p>
                <p className="mt-[var(--space-2xs)] text-[length:var(--body-medium-regular-font-size)] leading-[var(--body-medium-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
                  {ABOUT[brand.id] ?? ""}
                </p>
              </div>
              <span className="text-[56px] leading-none font-black" aria-hidden="true" style={{ color: "var(--color-text-brand)" }}>
                Aa
              </span>
            </div>
            <div className="mt-[var(--space-xl)] flex overflow-hidden rounded-[var(--radius-md)]" aria-hidden="true">
              {RAMP.map((name) => (
                <span key={name} className="h-8 flex-1" style={{ background: `var(${name})` }} />
              ))}
            </div>
            <div className="mt-[var(--space-xl)] flex items-center justify-between gap-[var(--space-sm)]">
              <Button label="Book now" size="small" />
              <Switch aria-label={`${brand.name} sample switch`} defaultChecked size="small" />
            </div>
            <button
              type="button"
              onClick={() => setBrand(brand.id)}
              aria-pressed={active}
              className="site-focus mt-[var(--space-xl)] rounded-[var(--radius-full)] py-[var(--space-xs)] text-[length:var(--label-medium-bold-font-size)] font-bold transition-colors"
              style={{
                background: active ? "var(--color-bg-fill-brand)" : "var(--color-bg-fill)",
                color: active ? "var(--color-text-brand-on-bg-fill)" : "var(--color-text-primary)",
              }}
            >
              {active ? "Viewing the site as " + brand.name : "View the site as " + brand.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
