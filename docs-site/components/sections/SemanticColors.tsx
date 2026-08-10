"use client";

import { Copyable } from "@/components/Copyable";
import { StatusBadge } from "@/components/StatusBadge";
import type { ColorGroup, Platform, Token } from "@/lib/types";

/** True when a fill would disappear against the white card surface. */
function isWhite(value: string) {
  const hex = value.trim().toLowerCase();
  return hex === "#fff" || hex === "#ffffff" || hex === "white" || hex === "rgb(255, 255, 255)";
}

/** Previews the token the way it is actually applied, not just as a fill. */
function Chip({ token, role }: { token: Token; role: string }) {
  // Surface/fill chips are stroke-less except pure white, which needs an edge on the card.
  const stroked =
    (role !== "surface" && role !== "fill") || isWhite(token.value);
  const base = `flex h-11 w-11 shrink-0 items-center justify-center rounded-lg${stroked ? " border" : ""}`;
  const border = "var(--color-border)";

  if (role === "text") {
    return (
      <div
        className={base}
        style={{ background: "var(--color-bg-surface-secondary)", borderColor: border }}
      >
        <span className="text-base font-bold" style={{ color: token.value }}>
          Ag
        </span>
      </div>
    );
  }

  if (role === "border") {
    return (
      <div
        className={base}
        style={{ background: "var(--color-bg-surface-secondary)", borderColor: border }}
      >
        <span
          className="block h-6 w-6 rounded-md"
          style={{ border: `2px solid ${token.value}` }}
        />
      </div>
    );
  }

  if (role === "icon") {
    return (
      <div
        className={base}
        style={{ background: "var(--color-bg-surface-secondary)", borderColor: border }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke={token.value} strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" fill={token.value} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={base}
      style={{
        background: token.value,
        ...(stroked ? { borderColor: border } : {}),
      }}
    />
  );
}

function ContrastBadge({ ratio, aa, aaa }: { ratio: number; aa: boolean; aaa: boolean }) {
  const level = aaa ? "AAA" : aa ? "AA" : "Fail";
  const palette = aa
    ? { bg: "var(--color-bg-fill-success-subtle)", fg: "var(--color-text-success-on-bg-fill-subtle)" }
    : { bg: "var(--color-bg-fill-warning-subtle)", fg: "var(--color-text-warning-on-bg-fill-subtle)" };

  return (
    <span
      className="mono rounded px-1 py-0.5 text-xs leading-4 font-semibold"
      style={{ background: palette.bg, color: palette.fg }}
      title={`Contrast ratio ${ratio}:1 against its paired background`}
    >
      {ratio}:1 {level}
    </span>
  );
}

export function SemanticColors({
  groups,
  platform,
}: {
  groups: ColorGroup[];
  platform: Platform;
}) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.id} className="first:mt-8">
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg leading-6 font-bold">{group.title}</h3>
            <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              {group.tokens.length} {group.tokens.length === 1 ? "token" : "tokens"}
            </span>
          </div>
          <p
            className="mt-1 max-w-2xl text-sm leading-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {group.description}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {group.tokens.map((token) => (
              <Copyable
                key={token.path}
                value={token.copy[platform]}
                label={`${token.path} as ${platform}`}
                className="rounded-xl border p-3"
                style={{ borderColor: "var(--color-border-secondary)" }}
              >
                <div className="flex items-start gap-3">
                  <Chip token={token} role={group.id} />
                  <div className="min-w-0 flex-1">
                    <div className="mono truncate text-sm leading-5 font-medium">{token.key}</div>
                    <div
                      className="mono mt-1.5 truncate text-xs leading-4"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {token.value}
                      {token.reference && ` · ${token.reference.replace("color.", "")}`}
                    </div>
                    {(token.contrast || token.status !== "stable") && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {token.contrast && (
                          <ContrastBadge
                            ratio={token.contrast.ratio}
                            aa={token.contrast.aa}
                            aaa={token.contrast.aaa}
                          />
                        )}
                        <StatusBadge status={token.status} replacedBy={token.replacedBy} />
                      </div>
                    )}
                    {token.description && (
                      <p
                        className="mt-2 text-[11px] leading-4"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {token.description}
                      </p>
                    )}
                  </div>
                </div>
              </Copyable>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
