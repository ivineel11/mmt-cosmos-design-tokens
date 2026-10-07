/**
 * Site map for the guidelines shell. The rail shows one entry per section; a section with
 * pages also gets a drawer listing them. Paths end in a slash to match `trailingSlash`.
 */

export const STORYBOOK_URL = "https://ivineel11.github.io/mmt-cosmos-design-tokens/";
export const REPO_URL = "https://github.com/ivineel11/mmt-cosmos-design-tokens";
export const FIGMA_URL = "https://www.figma.com/design/byPBTSedTYOO0AYwmIlncH/";

export type SiteIcon = "home" | "foundations" | "components" | "tokens";

export type SitePage = {
  label: string;
  href: string;
  /** Not built yet: listed in the drawer so the map is complete, but not a link. */
  soon?: boolean;
};

export type SiteSection = {
  id: string;
  label: string;
  href: string;
  icon: SiteIcon;
  pages?: SitePage[];
};

/** Every Cosmos component, in the order the Components page lists them. `slug` is the
 * guidelines route once it exists; `storybook` is the Storybook docs id. */
export const COMPONENTS = [
  { name: "Button", slug: "button", storybook: "components-button--docs", summary: "Starts an action: search, book, pay, confirm.", ready: true },
  { name: "Badge", slug: "badge", storybook: "components-badge--docs", summary: "A count, status or short label attached to something else." },
  { name: "Checkbox", slug: "checkbox", storybook: "components-checkbox--docs", summary: "Turns options on or off, alone or as a set." },
  { name: "Chip", slug: "chip", storybook: "components-chip--docs", summary: "Filters, choices and compact actions in a row." },
  { name: "List", slug: "list", storybook: "components-list--docs", summary: "Rows of related items: settings, travellers, results." },
  { name: "Menu", slug: "menu", storybook: "components-menu--docs", summary: "Actions or choices that open from a trigger." },
  { name: "Radio", slug: "radio", storybook: "components-radio--docs", summary: "Picks exactly one option from a small set." },
  { name: "Segmented control", slug: "segmented-control", storybook: "components-segmented-control--docs", summary: "Switches between two to five views of the same content." },
  { name: "Slider", slug: "slider", storybook: "components-slider--docs", summary: "Picks a value or a range along a track, such as a budget." },
  { name: "Snackbar", slug: "snackbar", storybook: "components-snackbar--docs", summary: "A brief message about something that just happened." },
  { name: "Switch", slug: "switch", storybook: "components-switch--docs", summary: "Turns a setting on or off straight away." },
  { name: "Tabs", slug: "tabs", storybook: "components-tabs--docs", summary: "Moves between sections of the same page." },
  { name: "Tooltip", slug: "tooltip", storybook: "components-tooltip--docs", summary: "A short hint, or a tour step, anchored to an element." },
] as const satisfies { name: string; slug: string; storybook: string; summary: string; ready?: boolean }[];

export const storybookDocs = (id: string) => `${STORYBOOK_URL}?path=/docs/${id}`;

export const FOUNDATIONS: SitePage[] = [
  { label: "Overview", href: "/foundations/" },
  { label: "How tokens work", href: "/foundations/design-tokens/" },
  { label: "Colour", href: "/foundations/color/" },
  { label: "Typography", href: "/foundations/typography/" },
  { label: "Spacing", href: "/foundations/spacing/" },
  { label: "Shape", href: "/foundations/shape/" },
  { label: "Elevation", href: "/foundations/elevation/" },
  { label: "Iconography", href: "/foundations/iconography/" },
];

export const SECTIONS: SiteSection[] = [
  { id: "home", label: "Home", href: "/", icon: "home" },
  { id: "foundations", label: "Foundations", href: "/foundations/", icon: "foundations", pages: FOUNDATIONS },
  {
    id: "components",
    label: "Components",
    href: "/components/",
    icon: "components",
    pages: [
      { label: "Overview", href: "/components/" },
      ...COMPONENTS.map((component) => ({
        label: component.name,
        href: `/components/${component.slug}/`,
        soon: !("ready" in component),
      })),
    ],
  },
  { id: "tokens", label: "Tokens", href: "/tokens/", icon: "tokens" },
];

/** The section a path belongs to: the longest section href that prefixes it. */
export function sectionFor(pathname: string): SiteSection {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    SECTIONS.filter((section) => section.href !== "/" && path.startsWith(section.href)).sort(
      (a, b) => b.href.length - a.href.length,
    )[0] ?? SECTIONS[0]
  );
}
