/** WCAG 2.1 colour maths, shared by the linter and scripts/describe-primitives.mjs. */

export const HEX = /^#(?:[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

export function parseHex(hex) {
  const h = hex.slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) : 255,
  };
}

const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

export function luminance(hex) {
  const { r, g, b } = parseHex(hex);
  return 0.2126 * channel(r / 255) + 0.7152 * channel(g / 255) + 0.0722 * channel(b / 255);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
}

export const isFullyTransparent = (hex) => HEX.test(hex) && parseHex(hex).a === 0;

// Floor rather than round, so a reported ratio never overstates the contrast.
export const formatRatio = (r) => `${(Math.floor(r * 100) / 100).toFixed(2)}:1`;

/** Lay `fg` at `alpha` (0–1) over the solid `bg`, returning the blended #RRGGBB a viewer sees. */
export function composite(fg, alpha, bg) {
  const [f, b] = [parseHex(fg), parseHex(bg)];
  const mix = (x, y) => Math.round(alpha * x + (1 - alpha) * y).toString(16).padStart(2, "0").toUpperCase();
  return `#${mix(f.r, b.r)}${mix(f.g, b.g)}${mix(f.b, b.b)}`;
}
