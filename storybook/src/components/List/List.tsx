import { createContext, useContext, useId, type ReactNode } from "react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon, type IconName } from "../Icon/Icon";
import { Radio } from "../Radio/Radio";
import { Switch } from "../Switch/Switch";
import styles from "./List.module.css";

type Density = "comfortable" | "compact";
type ListContextValue = { density: Density; radioName?: string; wrapper: "li" | "div" };
const ListContext = createContext<ListContextValue>({ density: "comfortable", wrapper: "li" });

export type ListProps = {
  children: ReactNode;
  variant?: "plain" | "grouped";
  /** Compact is for pointer-first web layouts only. */
  density?: Density;
  /** Optional section header above the rows. */
  header?: string;
  /** Heading level for the section header. */
  headerLevel?: 2 | 3 | 4;
  dividers?: boolean;
  /** single makes the rows one radio group (arrow keys move the selection). */
  selectionMode?: "none" | "single" | "multiple";
  /** Names the list when it has no header. */
  "aria-label"?: string;
};

/** List: components/list.md (Figma 797:4533). */
export function List({ children, variant = "plain", density = "comfortable", header, headerLevel = 3, dividers = true, selectionMode = "none", ...rest }: ListProps) {
  const headerId = useId();
  const radioName = useId();
  const Heading = `h${headerLevel}` as const;
  const single = selectionMode === "single";
  const Container = single ? "div" : "ul";
  return (
    <ListContext.Provider value={{ density, radioName: single ? radioName : undefined, wrapper: single ? "div" : "li" }}>
      <section className={styles.section}>
        {header && (
          <Heading id={headerId} className={`${styles.list} ${styles.header}`} data-density={density}>
            {header}
          </Heading>
        )}
        <Container
          role={single ? "radiogroup" : undefined}
          aria-labelledby={header ? headerId : undefined}
          aria-label={header ? undefined : rest["aria-label"]}
          className={styles.list}
          data-variant={variant}
          data-density={density}
          data-dividers={dividers}
        >
          {children}
        </Container>
      </section>
    </ListContext.Provider>
  );
}

type Leading =
  | { type: "icon"; icon: IconName }
  | { type: "iconContainer"; icon: IconName; tone?: "neutral" | "brand" }
  | { type: "avatar" | "thumbnail"; src: string; alt?: string }
  | { type: "checkbox" | "radio" };

type Trailing =
  | { type: "chevron" }
  | { type: "meta"; meta: string }
  | { type: "metaChevron"; meta: string }
  | { type: "badge"; count?: number; label?: string; dot?: boolean }
  | { type: "button"; label: string; accessibleLabel?: string; onPress?: () => void }
  | { type: "switch" };

export type ListItemProps = {
  title: string;
  supportingText?: string;
  /** Needs supportingText. Use it rarely. */
  thirdLine?: string;
  leading?: Leading;
  trailing?: Trailing;
  /** Makes the row a button. Leave unset on rows with a trailing Button. */
  onPress?: () => void;
  /** Makes the row a link. Pair with a chevron. */
  href?: string;
  /** For checkbox, radio and switch rows. */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  disabled?: boolean;
};

/** One List row: navigation (onPress or href), selection (checkbox or radio), setting (switch), static or display. */
export function ListItem({ title, supportingText, thirdLine, leading, trailing, onPress, href, selected = false, onSelectedChange, disabled = false }: ListItemProps) {
  const { density, radioName, wrapper: Wrapper } = useContext(ListContext);
  const controlId = useId();
  const compact = density === "compact";
  const lines = thirdLine && supportingText ? 3 : supportingText ? 2 : 1;
  const selection = leading?.type === "checkbox" || leading?.type === "radio";
  const setting = trailing?.type === "switch";
  const interactive = Boolean(onPress || href || selection || setting);

  let lead: ReactNode = null;
  if (leading) {
    if (leading.type === "icon") lead = <Icon name={leading.icon} size="var(--_icon)" className={styles.leadingIcon} />;
    else if (leading.type === "iconContainer")
      lead = (
        <span className={styles.container} data-tone={leading.tone ?? "neutral"}>
          <Icon name={leading.icon} size="var(--_container-icon)" />
        </span>
      );
    else if (leading.type === "avatar" || leading.type === "thumbnail")
      lead = <img className={styles.image} data-shape={leading.type === "thumbnail" ? "square" : "circle"} src={leading.src} alt={leading.alt ?? ""} />;
    else if (leading.type === "checkbox")
      lead = <Checkbox wrapper="span" id={controlId} size={compact ? "small" : "medium"} checked={selected} disabled={disabled} onChange={(event) => onSelectedChange?.(event.target.checked)} />;
    else lead = <Radio wrapper="span" id={controlId} name={radioName ?? controlId} size={compact ? "small" : "medium"} checked={selected} disabled={disabled} onChange={() => onSelectedChange?.(true)} />;
  }

  let trail: ReactNode = null;
  if (trailing) {
    const chevron = <Icon name="chevron-right" size="var(--_chevron)" className={styles.chevron} />;
    if (trailing.type === "chevron") trail = chevron;
    else if (trailing.type === "meta" || trailing.type === "metaChevron")
      trail = (
        <>
          <span className={styles.meta}>{trailing.meta}</span>
          {trailing.type === "metaChevron" && chevron}
        </>
      );
    else if (trailing.type === "badge")
      trail = disabled ? null : trailing.dot ? (
        <Badge type="dot" size={compact ? "small" : "medium"} />
      ) : trailing.label ? (
        <Badge type="text" label={trailing.label} intent="warning" emphasis="strong" size={compact ? "small" : "medium"} accessibilityLabel={trailing.label} />
      ) : (
        <Badge type="count" count={trailing.count} size={compact ? "small" : "medium"} accessibilityLabel={`${trailing.count} new`} />
      );
    else if (trailing.type === "button")
      trail = <Button label={trailing.label} aria-label={trailing.accessibleLabel} hierarchy="secondary" size={compact ? "small" : "medium"} isDisabled={disabled} onClick={trailing.onPress} />;
    else trail = <Switch id={controlId} size={compact ? "small" : "medium"} checked={selected} disabled={disabled} onChange={(value) => onSelectedChange?.(value)} />;
  }

  const content = (
    <>
      {lead && <span className={styles.leading}>{lead}</span>}
      <span className={styles.main}>
        <span className={styles.text}>
          <span className={styles.title}>{title}</span>
          {supportingText && <span className={styles.supporting}>{supportingText}</span>}
          {thirdLine && supportingText && <span className={`${styles.supporting} ${styles.third}`}>{thirdLine}</span>}
        </span>
        {trail && <span className={styles.trailing}>{trail}</span>}
        <span className={styles.divider} aria-hidden="true" />
      </span>
    </>
  );

  const common = { className: styles.row, "data-lines": lines, "data-interactive": interactive, "data-disabled": disabled };
  let row: ReactNode;
  if (selection || setting)
    // The whole row is the label of its control, so a tap anywhere toggles it.
    row = (
      <label {...common} htmlFor={controlId}>
        {content}
      </label>
    );
  else if (href)
    row = (
      <a {...common} href={disabled ? undefined : href} aria-disabled={disabled || undefined}>
        {content}
      </a>
    );
  else if (onPress)
    row = (
      <button {...common} type="button" disabled={disabled} onClick={onPress}>
        {content}
      </button>
    );
  else row = <div {...common}>{content}</div>;

  return <Wrapper>{row}</Wrapper>;
}
