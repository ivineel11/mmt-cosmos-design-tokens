import { useCallback, useMemo, useState, type CSSProperties, type ReactNode, type Ref } from "react";
import { createPortal } from "react-dom";
import { aliasLabel, cssVar, data, formatValue, groupsOf, inBrand, select, useBrand, type FlatToken, type Platform, type TokenSet } from "./data";
import { Icon } from "../components/Icon/Icon";
import { SegmentedControl } from "../components/SegmentedControl/SegmentedControl";
import "./blocks.css";

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
];

/** `sb-unstyled` opts out of the Storybook docs typography so the blocks render in the brand typeface with tokens. */
const Doc = ({ children, ref }: { children: ReactNode; ref?: Ref<HTMLDivElement> }) => (
  <div ref={ref} className="doc sb-unstyled">
    {children}
  </div>
);

/** `fallback` marks the toolbar copy of a switch that also sits in a heading; CSS shows one of the two by column width. */
function PlatformSwitch({ value, onChange, fallback = false }: { value: Platform; onChange: (platform: Platform) => void; fallback?: boolean }) {
  return (
    <div className={fallback ? "doc-platforms doc-platforms-fallback" : "doc-platforms"}>
      <SegmentedControl aria-label="Platform" items={PLATFORMS} value={value} onChange={(id) => onChange(id as Platform)} />
    </div>
  );
}

/**
 * Adds a copy of a block's platform switch to the nearest h1–h3 above it, on the right and
 * top-aligned with the heading, and marks the intro text between them so it stops short of
 * the switch. Returns a ref for the block and the slot to portal into, which is null when
 * the block has no heading of its own, so the switch stays in the toolbar.
 */
function useHeadingSlot() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const ref = useCallback((block: HTMLDivElement | null) => {
    const intro: Element[] = [];
    let node = block?.previousElementSibling;
    while (node && !/^H[1-3]$/.test(node.tagName)) {
      if (/^(P|UL|OL)$/.test(node.tagName)) intro.push(node);
      node = node.previousElementSibling;
    }
    if (!(node instanceof HTMLElement) || node.querySelector(".doc-heading-switch")) return;
    const heading = node;
    for (const element of intro) element.setAttribute("data-beside-switch", "");
    const host = heading.ownerDocument.createElement("div");
    host.className = "doc-heading-switch sb-unstyled";
    // Keep the heading's accessible name to its own text, without the switch labels.
    heading.setAttribute("aria-label", heading.textContent?.trim() ?? "");
    // First child, so the float sits on the heading's first line.
    heading.prepend(host);
    setSlot(host);
    return () => {
      host.remove();
      heading.removeAttribute("aria-label");
      for (const element of intro) element.removeAttribute("data-beside-switch");
      setSlot(null);
    };
  }, []);
  return [ref, slot] as const;
}

/** Token name for the chosen platform; clicking copies the ready-to-paste usage. */
function TokenName({ token, platform }: { token: Pick<FlatToken, "names" | "copy">; platform: Platform }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="doc-copy mono"
      title="Copy"
      onClick={() => {
        navigator.clipboard?.writeText(token.copy[platform]).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
    >
      {copied ? "Copied" : token.names[platform]}
    </button>
  );
}

function Alias({ token }: { token: FlatToken }) {
  const alias = aliasLabel(token.reference);
  return alias ? <div className="doc-muted doc-small mono">→ {alias}</div> : null;
}

const isColor = (token: FlatToken) => token.type === "color";

function ValueCell({ token }: { token: FlatToken }) {
  return (
    <span className="doc-value">
      {isColor(token) && <span className="doc-chip" style={{ background: token.value as string }} />}
      <code>{formatValue(token)}</code>
    </span>
  );
}

// ---------------------------------------------------------------- tables ----

type TableProps = {
  tokens: FlatToken[];
  /** Extra visual column, for example a spacing bar or a radius box. */
  preview?: (token: FlatToken) => ReactNode;
  initialPlatform?: Platform;
};

/** Name, alias, value and description for a fixed list of tokens. */
export function TokenRows({ tokens, preview, initialPlatform = "css" }: TableProps) {
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [block, slot] = useHeadingSlot();
  return (
    <Doc ref={block}>
      {slot && createPortal(<PlatformSwitch value={platform} onChange={setPlatform} />, slot)}
      <div className={slot ? "doc-toolbar doc-toolbar-fallback" : "doc-toolbar"}>
        <PlatformSwitch value={platform} onChange={setPlatform} fallback={Boolean(slot)} />
      </div>
      <Rows tokens={tokens} preview={preview} platform={platform} />
    </Doc>
  );
}

function Rows({ tokens, preview, platform }: { tokens: FlatToken[]; preview?: TableProps["preview"]; platform: Platform }) {
  const brand = useBrand();
  return (
    <table className="doc-table">
      <thead>
        <tr>
          <th scope="col">Token</th>
          {preview && <th scope="col">Preview</th>}
          <th scope="col">Value</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => inBrand(token, brand)).map((token) => (
          <tr key={`${token.set}:${token.path}`}>
            <td>
              <TokenName token={token} platform={platform} />
              <Alias token={token} />
            </td>
            {preview && <td>{preview(token)}</td>}
            <td>
              <ValueCell token={token} />
            </td>
            <td className="doc-small doc-muted">{token.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Searchable, filterable table of every token in a set. */
export function TokenTable({ set }: { set: TokenSet }) {
  const groups = useMemo(() => groupsOf(set), [set]);
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform>("css");
  const brand = useBrand();

  const tokens = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.all.map((token) => inBrand(token, brand)).filter(
      (token) =>
        token.set === set &&
        (group === "all" || token.path.split(".")[0] === group) &&
        (!needle ||
          token.path.toLowerCase().includes(needle) ||
          Object.values(token.names).some((name) => name.toLowerCase().includes(needle)) ||
          formatValue(token).toLowerCase().includes(needle) ||
          (token.reference ?? "").toLowerCase().includes(needle) ||
          (token.description ?? "").toLowerCase().includes(needle)),
    );
  }, [set, group, query, brand]);
  const [block, slot] = useHeadingSlot();

  return (
    <Doc ref={block}>
      <div className="doc-toolbar">
        <input type="search" placeholder="Search names, values, aliases or descriptions" aria-label="Search tokens" value={query} onChange={(event) => setQuery(event.target.value)} />
        <span className="doc-select">
          <select aria-label="Group" value={group} onChange={(event) => setGroup(event.target.value)}>
            <option value="all">All groups</option>
            {groups.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" size="var(--icon-sm)" className="doc-select-icon" />
        </span>
        {slot && createPortal(<PlatformSwitch value={platform} onChange={setPlatform} />, slot)}
        <PlatformSwitch value={platform} onChange={setPlatform} fallback={Boolean(slot)} />
      </div>
      <Rows tokens={tokens} platform={platform} />
      <p className="doc-count doc-small doc-muted">
        {tokens.length} of {data.all.filter((token) => token.set === set).length} tokens
      </p>
    </Doc>
  );
}

// ---------------------------------------------------------------- colour ----

export function Palettes() {
  const alpha = select("primitives", "color.alpha.");
  return (
    <Doc>
      <div className="doc-palettes">
        {data.primitives.palettes
          .filter((palette) => palette.name !== "alpha")
          .map((palette) => (
            <section key={palette.name} className="doc-palette">
              <h4>{palette.name}</h4>
              <div className="doc-ramp">
                {palette.steps.map((step) => (
                  <div key={step.path} className="doc-step">
                    <div className="doc-step-fill" style={{ background: cssVar(step) }} />
                    <div className="doc-step-meta">
                      <strong>{step.key}</strong>
                      <div className="mono doc-muted">{step.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        <section className="doc-palette">
          <h4>alpha</h4>
          <div className="doc-ramp">
            {alpha.map((step) => (
              <div key={step.path} className="doc-step doc-checker">
                <div className="doc-step-fill" style={{ background: cssVar(step) }} />
                <div className="doc-step-meta" style={{ background: "var(--color-bg)" }}>
                  <strong>{step.key}</strong>
                  <div className="mono doc-muted">{formatValue(step)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Doc>
  );
}

/** Semantic colours for one role group (bg, surface, fill, text, border, icon). */
/** showPreview={false} drops the contrast sample column, for roles that are never text, such as surfaces. */
export function ColorRole({ role, showPreview = true }: { role: string; showPreview?: boolean }) {
  const brand = useBrand();
  const group = data.semantic.colorGroups.find((candidate) => candidate.id === role);
  const flat = new Map(select("semantic", "color.").map((token) => [token.path, token]));
  if (!group) return null;
  const tokens = group.tokens.map((token) => flat.get(token.path)).filter((token): token is FlatToken => Boolean(token));
  const contrast = new Map(brand.contrastPairs.map((pair) => [pair.text.path, { ratio: pair.ratio, against: pair.background.path }]));
  return (
    <TokenRows
      tokens={tokens}
      preview={showPreview ? (token) => {
        const ratio = contrast.get(token.path);
        if (!ratio) return null;
        const against = select("semantic", ratio.against)[0];
        return (
          <span className="doc-value">
            <span className="doc-sample-text" style={{ color: cssVar(token), background: against ? cssVar(against) : undefined }}>
              Aa
            </span>
            <Pass ratio={ratio.ratio} />
          </span>
        );
      } : undefined}
    />
  );
}

function Pass({ ratio }: { ratio: number }) {
  const level = ratio >= 7 ? "aaa" : ratio >= 4.5 ? "aa" : ratio >= 3 ? "large" : "fail";
  const label = { aaa: "AAA", aa: "AA", large: "AA large", fail: "Fail" }[level];
  return (
    <span className="doc-pass" data-pass={level}>
      {ratio.toFixed(2)}:1 {label}
    </span>
  );
}

/** Every text token against the background it is designed for. */
export function ContrastTable() {
  const brand = useBrand();
  return (
    <Doc>
      <table className="doc-table">
        <thead>
          <tr>
            <th scope="col">Text</th>
            <th scope="col">On</th>
            <th scope="col">Sample</th>
            <th scope="col">Ratio</th>
          </tr>
        </thead>
        <tbody>
          {brand.contrastPairs.map((pair) => (
            <tr key={pair.text.path}>
              <td className="mono">{pair.text.path.replace("color.", "")}</td>
              <td className="mono doc-muted">{pair.background.path.replace("color.", "")}</td>
              <td>
                <span className="doc-sample-text" style={{ color: pair.text.value, background: pair.background.value }}>
                  Book now
                </span>
              </td>
              <td>
                <Pass ratio={pair.ratio} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Doc>
  );
}

/** The two canvases and the container that pairs with each. */
export function CanvasPairing() {
  const pairs = [
    { canvas: "bg", canvasVar: "var(--color-bg)", container: "bg-surface", containerVar: "var(--color-bg-surface)", note: "Grey wells and grouped sections on a white page" },
    {
      canvas: "bg-secondary",
      canvasVar: "var(--color-bg-secondary)",
      container: "bg-surface-secondary",
      containerVar: "var(--color-bg-surface-secondary)",
      note: "White cards, sheets and menus on a grey page",
    },
  ];
  return (
    <Doc>
      <div className="doc-pairs">
        {pairs.map((pair) => (
          <div key={pair.canvas} className="doc-canvas" style={{ background: pair.canvasVar }}>
            <div className="mono doc-small">{pair.canvas}</div>
            <div className="doc-container" style={{ background: pair.containerVar, marginBlockStart: "var(--space-sm)" }}>
              <div className="mono doc-small">{pair.container}</div>
              <div className="doc-small doc-muted">{pair.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Doc>
  );
}

// ------------------------------------------------------------ typography ----

export function TypeScale() {
  const sample = "Flights to Goa from ₹3,499";
  const brand = useBrand();
  return (
    <Doc>
      {data.semantic.typography.map((group) => (
        <section key={group.id} className="doc-type-group">
          <h3>{group.title}</h3>
          <p className="doc-muted doc-small">{group.description}</p>
          {group.sizes.map((size) => (
            <div key={size.size} className="doc-type-row">
              <div>
                <strong className="mono">
                  {group.id}.{size.size}
                </strong>
                <div className="doc-small doc-muted">
                  {size.fontSize} / {size.lineHeight}
                </div>
              </div>
              <div className="doc-type-samples">
                {size.variants.map((variant) => {
                  const value = (brand.tokens[`semantic:${variant.path}`]?.value as typeof variant.value | undefined) ?? variant.value;
                  const base = variant.names.css.replace(/-\*$/, "");
                  const style: CSSProperties = {
                    fontFamily: `var(${base}-font-family)`,
                    fontWeight: `var(${base}-font-weight)` as CSSProperties["fontWeight"],
                    fontSize: `var(${base}-font-size)`,
                    lineHeight: `var(${base}-line-height)`,
                  };
                  return (
                    <div key={variant.path} className="doc-type-sample">
                      <span style={style}>{sample}</span>
                      <span className="mono doc-muted doc-small">
                        {variant.weightKey} {value.fontWeight}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
    </Doc>
  );
}

// ---------------------------------------------------------------- scales ----

type ScaleKind = "space" | "radius" | "stroke" | "icon";

const SCALE_PREVIEW: Record<ScaleKind, (token: FlatToken) => ReactNode> = {
  space: (token) => <div className="doc-bar" style={{ inlineSize: cssVar(token) }} />,
  radius: (token) => <div className="doc-radius-box" style={{ borderRadius: cssVar(token) }} />,
  stroke: (token) => <div className="doc-stroke-line" style={{ blockSize: cssVar(token) }} />,
  icon: (token) => <div className="doc-icon-box" style={{ inlineSize: cssVar(token), blockSize: cssVar(token) }} />,
};

/** A scale with a visual preview per step; `prefix` picks the group, such as `space` or `spacing`. */
export function Scale({ kind, set = "semantic", prefix }: { kind: ScaleKind; set?: TokenSet; prefix: string }) {
  return <TokenRows tokens={select(set, `${prefix}.`)} preview={SCALE_PREVIEW[kind]} />;
}

// ------------------------------------------------------------- elevation ----

export function Shadows() {
  return (
    <Doc>
      <div className="doc-shadows">
        {select("semantic", "shadow.").map((token) => (
          <div key={token.path} className="doc-shadow-card" style={{ boxShadow: cssVar(token) }}>
            <strong className="mono">{token.path}</strong>
            <code className="doc-muted">{formatValue(token)}</code>
            <span className="doc-small doc-muted">{token.description}</span>
          </div>
        ))}
      </div>
    </Doc>
  );
}

// --------------------------------------------------------------- opacity ----

export function OpacityScale() {
  return (
    <TokenRows
      tokens={select("semantic", "opacity.")}
      preview={(token) => (
        <span className="doc-opacity doc-checker">
          <span style={{ opacity: cssVar(token) }} />
        </span>
      )}
    />
  );
}

// --------------------------------------------------------------- inverse ----

/** Every semantic colour meant for dark sections, drawn on bg-surface-inverse. */
export function InverseSamples() {
  const tokens = select("semantic", "color.").filter((token) => /inverse/.test(token.path) && !token.path.startsWith("color.bg-surface-inverse"));
  return (
    <Doc>
      <div className="doc-inverse">
        {tokens.map((token) => {
          const role = token.path.replace("color.", "");
          const isFill = role.startsWith("bg-") || role.startsWith("border-");
          return (
            <div key={token.path} className="doc-inverse-row">
              {isFill ? (
                <span className="doc-chip" style={{ background: cssVar(token), borderColor: "var(--color-border-inverse)" }} />
              ) : (
                <span style={{ color: cssVar(token), fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"] }}>{role.startsWith("icon") ? "●" : "View offer"}</span>
              )}
              <span className="mono doc-small">{role}</span>
            </div>
          );
        })}
      </div>
    </Doc>
  );
}
