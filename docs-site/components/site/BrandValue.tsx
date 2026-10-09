"use client";

import { useBrandId } from "@/components/site/BrandProvider";

/** Prints whichever of `values` belongs to the brand on screen, such as a typeface name. */
export function BrandValue({ values }: { values: Record<string, string> }) {
  const brand = useBrandId();
  return <>{values[brand] ?? Object.values(values)[0]}</>;
}
