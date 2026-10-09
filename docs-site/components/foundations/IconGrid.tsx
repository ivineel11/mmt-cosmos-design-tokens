"use client";

import { Icon } from "@cosmos/Icon/Icon";
import { ICON_NAMES } from "@cosmos/Icon/paths";
import { Copyable } from "@/components/Copyable";

/** Every Cosmos glyph. Click one to copy its name for the Icon component's `name` prop. */
export function IconGrid() {
  return (
    <div className="site-block grid grid-cols-3 gap-[var(--space-xs)] sm:grid-cols-4 lg:grid-cols-6">
      {ICON_NAMES.map((name) => (
        <Copyable
          key={name}
          value={name}
          label={`icon name ${name}`}
          className="flex flex-col items-center gap-[var(--space-xs)] rounded-[var(--radius-xl)] px-[var(--space-xs)] py-[var(--space-xl)] hover:bg-[var(--color-bg-surface-hover)]"
          style={{ background: "var(--color-bg-surface)", color: "var(--color-icon)" }}
        >
          <Icon name={name} size="var(--icon-md)" />
          <span className="mono text-center text-[length:var(--label-small-regular-font-size)]" style={{ color: "var(--color-text-secondary)" }}>
            {name}
          </span>
        </Copyable>
      ))}
    </div>
  );
}
