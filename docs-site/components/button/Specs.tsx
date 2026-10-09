import { Button } from "@cosmos/Button/Button";
import { token } from "@/lib/data";
import { cssVar } from "@/lib/css";

const SIZES = [
  { id: "large", label: "Large", suffix: "lg", radius: "lg", type: "label/large/bold" },
  { id: "medium", label: "Medium", suffix: "md", radius: "md", type: "label/medium/bold" },
  { id: "small", label: "Small", suffix: "sm", radius: "md", type: "label/small/bold" },
] as const;

const TINT = "color-mix(in srgb, var(--color-bg-fill-warning-strong) 22%, transparent)";
const px = (path: string) => String(token("component", `button.${path}`).value).replace("px", "");

/** The three sizes with their padding tinted and their height measured, plus the
 * values behind them, read from the button/* tokens. */
export function SizeSpecs() {
  const rows = [
    { label: "Min height", key: (s: (typeof SIZES)[number]) => `min-height-${s.suffix}` },
    { label: "Padding x", key: (s: (typeof SIZES)[number]) => `padding-x-${s.suffix}` },
    { label: "Padding y", key: (s: (typeof SIZES)[number]) => `padding-y-${s.suffix}` },
    { label: "Corner radius", key: (s: (typeof SIZES)[number]) => `radius-${s.radius}` },
    { label: "Icon size", key: (s: (typeof SIZES)[number]) => `icon-size-${s.suffix}` },
    { label: "Icon to label", key: () => "gap-sm" },
    { label: "Min width", key: () => "min-width" },
  ];

  return (
    <>
      <div className="site-block grid gap-[var(--space-md)] rounded-[var(--radius-2xl)] p-[var(--space-3xl)] md:grid-cols-3" style={{ background: "var(--color-bg-surface)" }}>
        {SIZES.map((size) => (
          <div key={size.id} className="flex flex-col items-center gap-[var(--space-md)]">
            <div className="relative inline-flex" aria-hidden="true">
              <Button label="Label" size={size.id} leadingIcon="plus" tabIndex={-1} />
              <span className="pointer-events-none absolute inset-y-0 left-0" style={{ width: cssVar(`--button-padding-x-${size.suffix}`), background: TINT, borderRadius: `${cssVar(`--button-radius-${size.radius}`)} 0 0 ${cssVar(`--button-radius-${size.radius}`)}` }} />
              <span className="pointer-events-none absolute inset-y-0 right-0" style={{ width: cssVar(`--button-padding-x-${size.suffix}`), background: TINT, borderRadius: `0 ${cssVar(`--button-radius-${size.radius}`)} ${cssVar(`--button-radius-${size.radius}`)} 0` }} />
              <span className="absolute inset-y-0 -right-[var(--space-md)] w-[var(--space-xs)] border-y border-r" style={{ borderColor: "var(--color-border-warning-strong)" }} />
              <span className="mono absolute top-1/2 -right-[var(--space-xs)] translate-x-full -translate-y-1/2 pl-[var(--space-md)] text-[length:var(--label-small-bold-font-size)] font-bold" style={{ color: "var(--color-text-warning)" }}>
                {px(`min-height-${size.suffix}`)}
              </span>
            </div>
            <span className="text-[length:var(--label-medium-bold-font-size)] font-bold">{size.label}</span>
          </div>
        ))}
      </div>
      <div className="site-block overflow-x-auto">
        <table className="w-full text-left text-[length:var(--body-medium-regular-font-size)]">
          <thead>
            <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
              <th className="pb-[var(--space-xs)]">Property</th>
              {SIZES.map((size) => (
                <th key={size.id} className="pb-[var(--space-xs)]">
                  {size.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
                <td className="py-[var(--space-sm)] pr-[var(--space-md)] font-bold">{row.label}</td>
                {SIZES.map((size) => (
                  <td key={size.id} className="py-[var(--space-sm)] pr-[var(--space-md)]">
                    <span className="text-[length:var(--title-small-bold-font-size)] font-bold">{px(row.key(size))}</span>{" "}
                    <span className="mono text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
                      button/{row.key(size)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
              <td className="py-[var(--space-sm)] pr-[var(--space-md)] font-bold">Label style</td>
              {SIZES.map((size) => (
                <td key={size.id} className="mono py-[var(--space-sm)] pr-[var(--space-md)] text-[length:var(--label-small-regular-font-size)]">
                  {size.type}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

const HIERARCHIES = ["primary", "secondary", "tertiary", "text"] as const;
const STATES = ["default", "hover", "pressed", "disabled"] as const;

/** Each hierarchy and intent in each state, drawn with the button/* colour tokens
 * themselves, so it follows the brand switcher. */
export function StateMatrix() {
  const rows = HIERARCHIES.flatMap((hierarchy) => [
    { hierarchy, intent: "" },
    { hierarchy, intent: "-destructive" },
  ]);
  return (
    <div className="site-block overflow-x-auto rounded-[var(--radius-2xl)] p-[var(--space-xl)]" style={{ background: "var(--color-bg)", boxShadow: "inset 0 0 0 var(--stroke-default) var(--color-border-secondary)" }}>
      <table className="w-full border-separate text-left" style={{ borderSpacing: "var(--space-xs)" }}>
        <thead>
          <tr className="text-[length:var(--label-small-bold-font-size)]" style={{ color: "var(--color-text-tertiary)" }}>
            <th />
            {STATES.map((state) => (
              <th key={state} className="text-center capitalize">
                {state === "default" ? "Rest" : state}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ hierarchy, intent }) => (
            <tr key={hierarchy + intent}>
              <th className="pr-[var(--space-sm)] text-[length:var(--label-medium-bold-font-size)] font-bold whitespace-nowrap capitalize">
                {hierarchy}
                {intent && <span className="block text-[length:var(--label-small-regular-font-size)] font-normal" style={{ color: "var(--color-text-warning)" }}>destructive</span>}
              </th>
              {STATES.map((state) => {
                const suffix = `${hierarchy}${intent}-${state}`;
                return (
                  <td key={state} className="text-center">
                    <span
                      className="inline-flex items-center justify-center px-[var(--button-padding-x-sm)] text-[length:var(--label-small-bold-font-size)] font-bold"
                      title={`button/bg-${suffix}`}
                      style={{
                        minWidth: "var(--space-7xl)",
                        minHeight: "var(--button-min-height-sm)",
                        borderRadius: "var(--button-radius-md)",
                        background: cssVar(`--button-bg-${suffix}`),
                        color: cssVar(`--button-label-${suffix}`),
                        boxShadow: `inset 0 0 0 var(--button-border-width) ${cssVar(`--button-border-${suffix}`)}`,
                      }}
                    >
                      Label
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
