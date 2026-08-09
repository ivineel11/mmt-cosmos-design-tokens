"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";

type CopyableProps = {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Click-to-copy wrapper that flashes a confirmation without shifting layout. */
export function Copyable({ value, label, className = "", style, children }: CopyableProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${value}`}
      aria-label={`Copy ${label}`}
      className={`group relative cursor-pointer text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      style={{ outlineColor: "var(--color-border-focus)", ...style }}
    >
      {children}
      <span
        aria-live="polite"
        className="pointer-events-none absolute top-1 right-1 z-10 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase transition-opacity"
        style={{
          opacity: copied ? 1 : 0,
          background: "var(--color-bg-fill-success-strong)",
          color: "var(--color-text-success-on-bg-fill-strong)",
        }}
      >
        Copied
      </span>
    </button>
  );
}
