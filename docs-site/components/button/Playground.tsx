"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@cosmos/Button/Button";
import { SegmentedControl } from "@cosmos/SegmentedControl/SegmentedControl";
import { Switch } from "@cosmos/Switch/Switch";
import { CodeBlock } from "@/components/site/Blocks";

type Config = Required<Pick<ButtonProps, "hierarchy" | "intent" | "size" | "surface">> & {
  label: string;
  leading: boolean;
  trailing: boolean;
  loading: boolean;
  disabled: boolean;
};

const DEFAULTS: Config = { label: "Book now", hierarchy: "primary", intent: "default", size: "medium", surface: "default", leading: false, trailing: false, loading: false, disabled: false };

/** The JSX for the current configuration, leaving out props at their default. */
function snippet(config: Config) {
  const props = [`label="${config.label}"`];
  for (const key of ["hierarchy", "intent", "size", "surface"] as const) {
    if (config[key] !== DEFAULTS[key]) props.push(`${key}="${config[key]}"`);
  }
  if (config.leading) props.push(`leadingIcon="plus"`);
  if (config.trailing) props.push(`trailingIcon="chevron-right"`);
  if (config.loading) props.push("isLoading");
  if (config.disabled) props.push("isDisabled");
  return `<Button ${props.join(" ")} />`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-xs)]">
      <span className="text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (on: boolean) => void }) {
  const id = `playground-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex items-center justify-between gap-[var(--space-sm)]">
      <span id={id} className="text-[length:var(--body-medium-regular-font-size)]">
        {label}
      </span>
      <Switch aria-labelledby={id} checked={checked} onChange={onChange} size="small" />
    </div>
  );
}

/** Every Button prop as a control, with the live result and its code. */
export function Playground() {
  const [config, setConfig] = useState(DEFAULTS);
  const set = <K extends keyof Config>(key: K) => (value: Config[K]) => setConfig((current) => ({ ...current, [key]: value }));

  return (
    <div className="site-block overflow-hidden rounded-[var(--radius-2xl)]" style={{ boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
      <div
        className="flex min-h-[var(--site-stage)] items-center justify-center p-[var(--space-3xl)] transition-colors"
        style={{ background: config.surface === "inverse" ? "var(--color-bg-surface-inverse)" : "var(--color-bg-surface)" }}
      >
        <Button
          label={config.label || "Label"}
          hierarchy={config.hierarchy}
          intent={config.intent}
          size={config.size}
          surface={config.surface}
          leadingIcon={config.leading ? "plus" : undefined}
          trailingIcon={config.trailing ? "chevron-right" : undefined}
          isLoading={config.loading}
          isDisabled={config.disabled}
        />
      </div>
      <div className="grid gap-[var(--space-xl)] p-[var(--space-xl)] md:grid-cols-2">
        <div className="flex flex-col gap-[var(--space-md)]">
          <Field label="Hierarchy">
            <SegmentedControl
              aria-label="Hierarchy"
              size="small"
              value={config.hierarchy}
              onChange={(id) => set("hierarchy")(id as Config["hierarchy"])}
              items={[
                { id: "primary", label: "Primary" },
                { id: "secondary", label: "Secondary" },
                { id: "tertiary", label: "Tertiary" },
                { id: "text", label: "Text" },
              ]}
            />
          </Field>
          <Field label="Size">
            <SegmentedControl
              aria-label="Size"
              size="small"
              value={config.size}
              onChange={(id) => set("size")(id as Config["size"])}
              items={[
                { id: "small", label: "Small" },
                { id: "medium", label: "Medium" },
                { id: "large", label: "Large" },
              ]}
            />
          </Field>
          <div className="grid gap-[var(--space-md)] sm:grid-cols-[1.4fr_1fr]">
            <Field label="Intent">
              <SegmentedControl
                aria-label="Intent"
                size="small"
                value={config.intent}
                onChange={(id) => set("intent")(id as Config["intent"])}
                items={[
                  { id: "default", label: "Default" },
                  { id: "destructive", label: "Destructive" },
                ]}
              />
            </Field>
            <Field label="Surface">
              <SegmentedControl
                aria-label="Surface"
                size="small"
                value={config.surface}
                onChange={(id) => set("surface")(id as Config["surface"])}
                items={[
                  { id: "default", label: "Default" },
                  { id: "inverse", label: "Inverse" },
                ]}
              />
            </Field>
          </div>
        </div>
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Field label="Label">
            <input
              value={config.label}
              onChange={(event) => set("label")(event.target.value)}
              maxLength={32}
              aria-label="Label"
              className="site-focus rounded-[var(--radius-md)] px-[var(--space-sm)] py-[var(--space-xs)] text-[length:var(--body-medium-regular-font-size)]"
              style={{ background: "var(--color-bg-fill)", boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border)" }}
            />
          </Field>
          <Toggle label="Leading icon" checked={config.leading} onChange={set("leading")} />
          <Toggle label="Trailing icon" checked={config.trailing} onChange={set("trailing")} />
          <Toggle label="Loading" checked={config.loading} onChange={set("loading")} />
          <Toggle label="Disabled" checked={config.disabled} onChange={set("disabled")} />
        </div>
      </div>
      <div className="border-t px-[var(--space-xl)] py-[var(--space-md)]" style={{ borderColor: "var(--color-border-secondary)" }}>
        <CodeBlock bare>{snippet(config)}</CodeBlock>
      </div>
    </div>
  );
}
