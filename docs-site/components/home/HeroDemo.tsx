"use client";

import { useState } from "react";
import { Badge } from "@cosmos/Badge/Badge";
import { Button } from "@cosmos/Button/Button";
import { Chip } from "@cosmos/Chip/Chip";
import { SegmentedControl } from "@cosmos/SegmentedControl/SegmentedControl";
import { Slider } from "@cosmos/Slider/Slider";
import { Switch } from "@cosmos/Switch/Switch";
import { Tabs } from "@cosmos/Tabs/Tabs";

const FILTERS = ["Non-stop", "Morning", "Refundable"];

/** A flight search assembled only from live Cosmos components. Everything in it follows
 * the brand switcher, which is the point of the hero. */
export function HeroDemo() {
  const [filters, setFilters] = useState<string[]>(["Non-stop"]);
  const [flexible, setFlexible] = useState(true);
  const [searching, setSearching] = useState(false);

  const search = () => {
    setSearching(true);
    window.setTimeout(() => setSearching(false), 1400);
  };

  return (
    <div
      className="w-full max-w-[420px] rounded-[var(--radius-2xl)] p-[var(--space-xl)]"
      style={{ background: "var(--color-bg-surface-secondary)", boxShadow: "var(--shadow-overlay)" }}
    >
      <Tabs
        type="primary"
        aria-label="Lines of business"
        idPrefix="hero"
        defaultValue="flights"
        layout="fixed"
        items={[
          { id: "flights", label: "Flights", icon: "flight" },
          { id: "hotels", label: "Hotels", icon: "hotel" },
          { id: "trains", label: "Trains", icon: "train", badge: { type: "dot", intent: "warning" } },
        ]}
      />
      <div className="mt-[var(--space-xl)] flex flex-col gap-[var(--space-lg)]">
        <SegmentedControl
          aria-label="Trip type"
          items={[
            { id: "one-way", label: "One way" },
            { id: "round", label: "Round trip" },
          ]}
          defaultValue="round"
        />
        <div className="flex items-center justify-between gap-[var(--space-sm)]">
          <div>
            <p className="text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              From · To
            </p>
            <p className="text-[length:var(--title-large-black-font-size)] leading-[var(--title-large-black-line-height)] font-black">DEL → GOI</p>
          </div>
          <Badge type="text" label="Fare drop" intent="success" emphasis="subtle" />
        </div>
        <div className="flex flex-wrap gap-[var(--space-xs)]" role="group" aria-label="Filters">
          {FILTERS.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              selected={filters.includes(label)}
              onSelectedChange={(on) => setFilters((list) => (on ? [...list, label] : list.filter((entry) => entry !== label)))}
            />
          ))}
        </div>
        <Slider label="Budget" defaultValue={[4000, 12000]} min={2000} max={20000} step={500} formatValue={(value) => `₹${value.toLocaleString("en-IN")}`} showHeader size="small" />
        <div className="flex items-center justify-between gap-[var(--space-sm)] text-[length:var(--body-medium-regular-font-size)]">
          <span id="hero-flexible">Flexible dates (±3 days)</span>
          <Switch aria-labelledby="hero-flexible" checked={flexible} onChange={setFlexible} size="small" />
        </div>
        <Button label={searching ? "Searching" : "Search flights"} size="large" isLoading={searching} onClick={search} style={{ width: "100%" }} />
      </div>
    </div>
  );
}
