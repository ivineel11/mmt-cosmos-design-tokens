export type Platform = "css" | "js" | "swift" | "kotlin";

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
];

export type PlatformStrings = Record<Platform, string>;

export type Contrast = {
  ratio: number;
  against: string;
  aa: boolean;
  aaa: boolean;
};

export type Token = {
  path: string;
  key: string;
  value: string;
  type: string;
  reference: string | null;
  names: PlatformStrings;
  copy: PlatformStrings;
  contrast?: Contrast;
};

export type Palette = {
  name: string;
  steps: Token[];
};

export type ColorGroup = {
  id: string;
  title: string;
  description: string;
  tokens: Token[];
};

export type TypeVariant = {
  path: string;
  weightKey: string;
  value: {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: string;
  };
  references: Record<string, string | null>;
  names: PlatformStrings;
  copy: PlatformStrings;
};

export type TypeSize = {
  size: string;
  fontSize: string;
  lineHeight: string;
  variants: TypeVariant[];
};

export type TypeGroup = {
  id: string;
  title: string;
  description: string;
  sizes: TypeSize[];
};

export type ContrastPair = {
  text: { path: string; value: string };
  background: { path: string; value: string };
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
};

export type TokenData = {
  meta: {
    generatedAt: string;
    source: string;
    stats: { label: string; value: number }[];
  };
  primitives: {
    palettes: Palette[];
    fontFamily: Token[];
    fontWeight: Token[];
    fontSize: Token[];
    lineHeight: Token[];
    spacing: Token[];
    borderRadius: Token[];
    iconSize: Token[];
  };
  semantic: {
    colorGroups: ColorGroup[];
    expressive: Palette[];
    typography: TypeGroup[];
    space: Token[];
    radius: Token[];
    icon: Token[];
  };
  contrastPairs: ContrastPair[];
};
