/** WCAG 2 contrast between two hex colours. A translucent colour (#RRGGBBAA) is first
 * blended over `base`, the surface underneath it. */

type Rgb = [number, number, number];

function parse(hex: string): { rgb: Rgb; alpha: number } {
  const clean = hex.replace("#", "");
  const full = clean.length <= 4 ? [...clean].map((c) => c + c).join("") : clean;
  const rgb = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
  const alpha = full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1;
  return { rgb, alpha };
}

function over(top: string, base: string): Rgb {
  const { rgb, alpha } = parse(top);
  const under = parse(base).rgb;
  return rgb.map((channel, i) => channel * alpha + under[i] * (1 - alpha)) as Rgb;
}

function luminance([r, g, b]: Rgb) {
  const linear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrast(foreground: string, background: string, base = "#FFFFFF"): number {
  const bg = over(background, base);
  const fg = parse(foreground).alpha < 1 ? over(foreground, `#${bg.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`) : parse(foreground).rgb;
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}
