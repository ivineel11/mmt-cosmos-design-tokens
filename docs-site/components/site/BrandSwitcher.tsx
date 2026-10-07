"use client";

import { useSyncExternalStore } from "react";
import { SegmentedControl } from "@cosmos/SegmentedControl/SegmentedControl";
import { setBrand, useBrandId, useBrands } from "@/components/site/BrandProvider";

const noop = () => () => {};

/** Switches every live component, colour value and type specimen on the site. It is the
 * Cosmos Segmented control itself; on narrow screens it falls back to a native select. */
export function BrandSwitcher() {
  const brands = useBrands();
  const current = useBrandId();
  // Static HTML starts on the default brand. Remounting once after hydration puts the thumb
  // straight on a stored brand instead of sliding it there on every page load.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);

  return (
    <>
      <div className="hidden md:block" style={{ width: "var(--site-brand-switch)" }}>
        <SegmentedControl
          key={hydrated ? "client" : "server"}
          aria-label="Brand"
          size="small"
          items={brands.map((brand) => ({ id: brand.id, label: brand.name }))}
          value={current}
          onChange={setBrand}
        />
      </div>
      <label className="md:hidden">
        <span className="sr-only">Brand</span>
        <select
          value={current}
          onChange={(event) => setBrand(event.target.value)}
          className="site-focus rounded-[var(--radius-md)] border px-[var(--space-sm)] py-[var(--space-2xs)] text-[length:var(--label-medium-bold-font-size)] font-bold"
          style={{ borderColor: "var(--color-border)", background: "var(--color-bg-fill)" }}
        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
