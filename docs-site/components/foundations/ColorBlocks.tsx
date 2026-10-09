import { Button } from "@cosmos/Button/Button";
import { Icon } from "@cosmos/Icon/Icon";
import type { Palette } from "@/lib/types";
import { cssVar } from "@/lib/css";

const INTENTS = [
  { id: "brand", label: "Brand", use: "Primary actions, selection, the brand moment." },
  { id: "info", label: "Info", use: "Neutral news, tips and links to more detail." },
  { id: "success", label: "Success", use: "Confirmed, booked, paid, available." },
  { id: "caution", label: "Caution", use: "Amber. Act soon: few seats left, price may change." },
  { id: "warning", label: "Warning", use: "Red. Errors, failures and destructive actions." },
];

/** Strong and subtle fills, surfaces, text, border and icon for each intent, drawn with
 * the live custom properties so it follows the brand switcher. */
export function IntentMatrix() {
  return (
    <div className="site-block grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-5">
      {INTENTS.map(({ id, label, use }) => {
        const brand = id === "brand";
        const strong = brand ? "--color-bg-fill-brand" : `--color-bg-fill-${id}-strong`;
        const onStrong = brand ? "--color-text-brand-on-bg-fill" : `--color-text-${id}-on-bg-fill-strong`;
        const subtle = brand ? "--color-bg-surface-brand-hover" : `--color-bg-fill-${id}-subtle`;
        const onSubtle = brand ? "--color-text-brand" : `--color-text-${id}-on-bg-fill-subtle`;
        return (
          <div key={id} className="flex flex-col overflow-hidden rounded-[var(--radius-2xl)]" style={{ boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
            <div className="flex h-28 flex-col justify-end p-[var(--space-md)]" style={{ background: `var(${strong})`, color: `var(${onStrong})` }}>
              <span className="text-[length:var(--title-medium-black-font-size)] font-black">{label}</span>
              <span className="mono text-[length:var(--label-small-regular-font-size)]">{strong.replace("--color-", "")}</span>
            </div>
            <div className="p-[var(--space-md)]" style={{ background: `var(${subtle})`, color: `var(${onSubtle})` }}>
              <span className="mono text-[length:var(--label-small-regular-font-size)]">{subtle.replace("--color-", "")}</span>
            </div>
            <div className="flex flex-1 flex-col gap-[var(--space-sm)] p-[var(--space-md)]" style={{ background: "var(--color-bg)" }}>
              <div className="flex items-center gap-[var(--space-xs)]">
                <span style={{ color: cssVar(`--color-icon-${id}`) }}>
                  <Icon name="info" size="var(--icon-sm)" />
                </span>
                <span className="text-[length:var(--label-medium-bold-font-size)] font-bold" style={{ color: cssVar(`--color-text-${id}`) }}>
                  text-{id}
                </span>
              </div>
              <span className="block rounded-[var(--radius-md)] px-[var(--space-xs)] py-[var(--space-2xs)] mono text-[length:var(--label-small-regular-font-size)]" style={{ boxShadow: `inset 0 0 0 var(--stroke-default) ${cssVar(`--color-border-${id}`)}` }}>
                border-{id}
              </span>
              <p className="text-[length:var(--body-small-regular-font-size)] leading-[var(--body-small-regular-line-height)]" style={{ color: "var(--color-text-secondary)" }}>
                {use}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Panel({ canvas, container, title, note }: { canvas: string; container: string; title: string; note: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-[var(--site-stage)] items-center justify-center rounded-[var(--radius-2xl)] p-[var(--space-3xl)]" style={{ background: `var(${canvas})`, boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
        <div className="w-full max-w-[var(--site-card)] rounded-[var(--radius-xl)] p-[var(--space-xl)]" style={{ background: `var(${container})` }}>
          <p className="text-[length:var(--title-medium-bold-font-size)] font-bold">Goa, 3 nights</p>
          <p className="mt-[var(--space-2xs)] text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
            Flight and hotel, breakfast included
          </p>
          <div className="mt-[var(--space-md)] flex gap-[var(--space-xs)]">
            <Button label="Book" size="small" />
            <Button label="Details" size="small" hierarchy="secondary" />
          </div>
        </div>
      </div>
      <p className="mt-[var(--space-sm)] text-[length:var(--label-medium-bold-font-size)] font-bold">{title}</p>
      <p className="mono text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
        {note}
      </p>
    </div>
  );
}

/** The two canvases and the container colour each one takes. */
export function CanvasPairing() {
  return (
    <div className="site-block grid gap-[var(--space-xl)] md:grid-cols-2">
      <Panel canvas="--color-bg" container="--color-bg-surface" title="White canvas, grey container" note="bg → bg-surface" />
      <Panel canvas="--color-bg-secondary" container="--color-bg-surface-secondary" title="Grey canvas, white container" note="bg-secondary → bg-surface-secondary" />
    </div>
  );
}

/** Controls and text on a dark section, using the -inverse roles. */
export function InverseSample() {
  return (
    <div className="site-block grid overflow-hidden rounded-[var(--radius-2xl)] md:grid-cols-[1fr_1fr]" style={{ background: "var(--color-bg-surface-inverse)" }}>
      <div className="p-[var(--space-3xl)]">
        <p className="text-[length:var(--label-medium-bold-font-size)] font-bold" style={{ color: "var(--color-text-brand-inverse)" }}>
          Monsoon sale
        </p>
        <p className="mt-[var(--space-2xs)] text-[length:var(--headline-small-black-font-size)] leading-[var(--headline-small-black-line-height)] font-black" style={{ color: "var(--color-text-inverse)" }}>
          Up to 40% off Kerala stays
        </p>
        <p className="mt-[var(--space-xs)] text-[length:var(--body-medium-regular-font-size)]" style={{ color: "var(--color-text-inverse-secondary)" }}>
          Book by Sunday. Free cancellation on most properties.
        </p>
        <div className="mt-[var(--space-xl)] flex flex-wrap gap-[var(--space-xs)]">
          <Button label="Explore stays" surface="inverse" />
          <Button label="Terms" surface="inverse" hierarchy="text" />
        </div>
      </div>
      <div className="grid grid-cols-2 content-center gap-[var(--space-sm)] p-[var(--space-3xl)]">
        {(["primary", "secondary", "tertiary", "text"] as const).map((hierarchy) => (
          <Button key={hierarchy} label={hierarchy[0].toUpperCase() + hierarchy.slice(1)} hierarchy={hierarchy} surface="inverse" size="small" />
        ))}
      </div>
    </div>
  );
}

/** Brand primaries, marked on their ramps. Primitives are the same in every brand. */
const PRIMARY_STEP: Record<string, { step: string; brand: string }> = {
  azure: { step: "700", brand: "MakeMyTrip" },
  pomegranate: { step: "400", brand: "myBiz" },
  thunderbird: { step: "600", brand: "Goibibo" },
};

export function Palettes({ palettes }: { palettes: Palette[] }) {
  return (
    <div className="site-block flex flex-col gap-[var(--space-sm)]">
      {palettes
        .filter((palette) => palette.name !== "alpha")
        .map((palette) => (
          <div key={palette.name} className="grid grid-cols-[var(--site-palette-label)_1fr] items-center gap-[var(--space-md)]">
            <div>
              <p className="text-[length:var(--label-medium-bold-font-size)] font-bold capitalize">{palette.name}</p>
              {PRIMARY_STEP[palette.name] && (
                <p className="text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-brand)" }}>
                  {PRIMARY_STEP[palette.name].brand} primary
                </p>
              )}
            </div>
            <div className="flex overflow-hidden rounded-[var(--radius-lg)]">
              {palette.steps.map((step) => {
                const primary = PRIMARY_STEP[palette.name]?.step === step.key;
                return (
                  <div
                    key={step.key}
                    title={`${palette.name}.${step.key} ${step.value}`}
                    className="flex h-12 min-w-0 flex-1 items-end justify-center pb-[var(--space-2xs)]"
                    style={{ background: step.value, boxShadow: primary ? "inset 0 0 0 var(--stroke-focus) var(--color-bg), inset 0 0 0 calc(var(--stroke-focus) * 2) var(--color-text-primary)" : undefined }}
                  >
                    <span className="hidden text-[length:var(--label-small-regular-font-size)] mix-blend-difference sm:inline" style={{ color: "var(--color-text-inverse)" }}>
                      {step.key}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}
