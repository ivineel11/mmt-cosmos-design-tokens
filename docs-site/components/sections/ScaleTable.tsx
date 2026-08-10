"use client";

import type { ReactNode } from "react";
import { Copyable } from "@/components/Copyable";
import { Card } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import type { Platform, Token } from "@/lib/types";

type ScaleTableProps = {
  tokens: Token[];
  platform: Platform;
  preview: (token: Token) => ReactNode;
};

const COLUMNS =
  "grid grid-cols-[minmax(0,1.5fr)_88px_minmax(0,1fr)_minmax(0,1.6fr)] items-center gap-4 px-4";

export function ScaleTable({ tokens, platform, preview }: ScaleTableProps) {
  return (
    <Card>
      <div
        className={`${COLUMNS} border-b py-3 text-[11px] font-bold tracking-wide uppercase`}
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg-surface)",
          color: "var(--color-text-tertiary)",
        }}
      >
        <div>Token</div>
        <div>Value</div>
        <div>References</div>
        <div>Preview</div>
      </div>

      {tokens.map((token) => (
        <Copyable
          key={token.path}
          value={token.copy[platform]}
          label={`${token.path} as ${platform}`}
          className={`${COLUMNS} w-full border-b py-3 last:border-b-0`}
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="min-w-0">
            <div className="mono truncate text-xs">{token.names[platform]}</div>
            {token.description && (
              <p
                className="mt-1 text-[11px] leading-4"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {token.description}
              </p>
            )}
            {token.status !== "stable" && token.status !== "internal" && (
              <div className="mt-1.5">
                <StatusBadge status={token.status} replacedBy={token.replacedBy} />
              </div>
            )}
          </div>
          <div className="mono self-start text-xs" style={{ color: "var(--color-text-secondary)" }}>
            {token.value}
          </div>
          <div
            className="mono truncate self-start text-[11px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {token.reference ?? "—"}
          </div>
          <div className="flex min-h-9 items-center self-start">{preview(token)}</div>
        </Copyable>
      ))}
    </Card>
  );
}

const px = (token: Token) => Math.abs(Number.parseFloat(token.value));

export const previews = {
  spacing: (token: Token) => {
    const size = px(token);
    const negative = token.value.startsWith("-");
    return (
      <span
        className="block h-2 rounded-full"
        style={{
        width: `${Math.max(size, 1)}px`,
        background: negative
          ? "var(--color-bg-fill-warning-strong)"
          : "var(--color-bg-fill-disabled)",
        opacity: negative ? 0.6 : 1,
        }}
      />
    );
  },

  radius: (token: Token) => (
    <span
      className="block h-12 w-20 border"
      style={{
        borderRadius: token.value,
        borderColor: "var(--color-border-secondary)",
        background: "var(--color-bg-surface)",
      }}
    />
  ),

  size: (token: Token) => (
    <span
      className="block rounded-md"
      style={{
        width: token.value,
        height: token.value,
        background: "var(--color-bg-fill-brand)",
        opacity: 0.85,
      }}
    />
  ),

  fontSize: (token: Token) => (
    <span
      className="block truncate"
      style={{ fontSize: `${Math.min(px(token), 32)}px`, lineHeight: 1.2 }}
    >
      Ag — sample
    </span>
  ),

  lineHeight: (token: Token) => (
    <span
      className="block w-full max-w-56 overflow-hidden text-[11px]"
      style={{ lineHeight: token.value, maxHeight: `${px(token) * 2}px` }}
    >
      Two lines of text set at this line height to show the rhythm it creates.
    </span>
  ),

  fontWeight: (token: Token) => (
    <span className="text-lg" style={{ fontWeight: Number.parseInt(token.value, 10) }}>
      The quick brown fox
    </span>
  ),

  fontFamily: (token: Token) => (
    <span className="text-lg" style={{ fontFamily: `var(--font-lato), ${token.value}, sans-serif` }}>
      The quick brown fox jumps
    </span>
  ),

  borderWidth: (token: Token) => (
    <span
      className="block h-8 w-20 rounded-md"
      style={{
        border: `${token.value} solid var(--color-border-brand)`,
        background: "var(--color-bg-surface)",
      }}
    />
  ),

  // Duration and easing are motion, which a static swatch cannot show. The bar
  // loops so the curve and the length are both legible at a glance.
  duration: (token: Token) => (
    <span className="block h-2 w-28 overflow-hidden rounded-full" style={{ background: "var(--color-bg-fill-secondary)" }}>
      <span
        className="block h-full w-1/3 rounded-full"
        style={{
          background: "var(--color-bg-fill-brand)",
          animation: `cosmos-slide ${token.value} linear infinite alternate`,
        }}
      />
    </span>
  ),

  easing: (token: Token) => (
    <span className="block h-2 w-28 overflow-hidden rounded-full" style={{ background: "var(--color-bg-fill-secondary)" }}>
      <span
        className="block h-full w-1/3 rounded-full"
        style={{
          background: "var(--color-bg-fill-brand)",
          animation: `cosmos-slide 1.2s ${token.value} infinite alternate`,
        }}
      />
    </span>
  ),
} satisfies Record<string, (token: Token) => ReactNode>;
