export type NavItem = { id: string; label: string };
export type NavGroup = { label: string; items?: NavItem[]; id?: string };

/** Sidebar structure. Group labels without an `id` are headings, not links. */
export const NAV: NavGroup[] = [
  {
    label: "Color",
    items: [
      { id: "primitive-palettes", label: "Primitive palettes" },
      { id: "semantic-colors", label: "Semantic colors" },
      { id: "expressive", label: "Expressive" },
      { id: "contrast", label: "Contrast" },
    ],
  },
  {
    label: "Typography",
    items: [
      { id: "type-headline", label: "Headline" },
      { id: "type-title", label: "Title" },
      { id: "type-body", label: "Body" },
      { id: "type-label", label: "Label" },
    ],
  },
  { label: "Spacing", id: "spacing" },
  { label: "Radius", id: "radius" },
  { label: "Icon size", id: "icon-size" },
  { label: "Border width", id: "border-width" },
  { label: "Motion", id: "motion" },
  { label: "Font family", id: "font-family" },
  { label: "Font weight", id: "font-weight" },
  { label: "Font size", id: "font-size" },
  { label: "Line height", id: "line-height" },
];

export const ALL_SECTION_IDS = NAV.flatMap((group) =>
  group.items ? group.items.map((item) => item.id) : group.id ? [group.id] : [],
);
