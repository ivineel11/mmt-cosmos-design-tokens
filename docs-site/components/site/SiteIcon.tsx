import type { ReactNode } from "react";

/** Line glyphs for the site chrome only. Product glyphs come from the Cosmos Icon set. */
const GLYPHS: Record<string, ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z" />,
  foundations: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="8.5" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 20a2.5 2.5 0 0 1 0-5h2.5" />
    </>
  ),
  components: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="3.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  tokens: (
    <>
      <path d="m12 4 8 4-8 4-8-4z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  external: <path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" />,
  code: <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />,
  book: <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H19v14H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  cross: <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />,
  warn: <path d="M12 4 3 20h18zM12 10v4.5M12 17.2v.3" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  figma: (
    <>
      <path d="M9 3h3v6H9a3 3 0 0 1 0-6zM12 3h3a3 3 0 0 1 0 6h-3zM9 9h3v6H9a3 3 0 0 1 0-6zM9 15h3v3a3 3 0 1 1-3-3z" />
      <circle cx="15" cy="12" r="3" />
    </>
  ),
};

export type SiteGlyph = keyof typeof GLYPHS;

export function SiteIcon({ name, size = 24, className }: { name: SiteGlyph; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flex: "none" }}
    >
      {GLYPHS[name]}
    </svg>
  );
}
