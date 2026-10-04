import { ICON_PATHS, type IconName } from "./paths";

export type { IconName };

type IconProps = {
  name: IconName;
  /** Rendered width and height. Pass a token, for example `var(--button-icon-size-md)`. */
  size?: string;
  className?: string;
};

/** A Cosmos glyph. Decorative by default: the host control supplies the accessible name. */
export function Icon({ name, size = "var(--icon-md)", className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" style={{ width: size, height: size, flex: "none" }}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
