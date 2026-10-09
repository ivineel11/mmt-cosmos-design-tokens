"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { BRAND_STORAGE_KEY } from "@/lib/brand";
import type { BrandSummary } from "@/lib/data";

/**
 * The brand on screen. Like a product page, the site sets data-brand on <html> and
 * tokens.css swaps the brandable custom properties under it, so live components follow
 * on their own. This hook is for the values and names a page prints.
 */
const BrandListContext = createContext<BrandSummary[]>([]);

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-brand"] });
  return () => observer.disconnect();
};

export function BrandProvider({ brands, children }: { brands: BrandSummary[]; children: ReactNode }) {
  return <BrandListContext.Provider value={brands}>{children}</BrandListContext.Provider>;
}

export function useBrands() {
  return useContext(BrandListContext);
}

/** The current brand id. Static HTML renders the default brand; the client re-renders
 * with the stored brand straight after hydration. */
export function useBrandId(): string {
  const brands = useBrands();
  const fallback = brands[0]?.id ?? "mmt";
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.brand ?? fallback,
    () => fallback,
  );
}

export function useBrand(): BrandSummary {
  const brands = useBrands();
  const id = useBrandId();
  return brands.find((brand) => brand.id === id) ?? brands[0];
}

export function setBrand(id: string) {
  document.documentElement.dataset.brand = id;
  try {
    localStorage.setItem(BRAND_STORAGE_KEY, id);
  } catch {
    // Private windows can block storage; the switch still applies to this page.
  }
}

