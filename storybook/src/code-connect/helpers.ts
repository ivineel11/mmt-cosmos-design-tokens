// Shared helpers for the Code Connect templates (*.figma.ts). The CLI bundles this file into each
// template that imports it. Everything here builds plain strings, so templates can join them freely;
// only nested template output (executeTemplate().example) must go straight into figma.tsx.
import type { ErrorHandle, InstanceHandle } from "figma";

type Handle = InstanceHandle | ErrorHandle | undefined | null;
type Attr = string | undefined | null | false;

const isInstance = (node: Handle): node is InstanceHandle => !!node && node.type === "INSTANCE";

/** The metadata.props a connected child template exposes, or {} when the child is not connected. */
export function childProps(node: Handle): Record<string, unknown> {
  if (!isInstance(node)) return {};
  const metadata = node.executeTemplate().metadata;
  return (metadata?.props ?? {}) as Record<string, unknown>;
}

/** The code name of a connected `Icon / *` instance, such as "plus". */
export function iconName(node: Handle): string | undefined {
  const name = childProps(node).name;
  return typeof name === "string" ? name : undefined;
}

/** The icon behind an instance-swap property, when its Show boolean (if any) is on. */
export function swapIcon(instance: InstanceHandle, swapProp: string, showProp?: string): string | undefined {
  if (showProp && !instance.getBoolean(showProp)) return undefined;
  return iconName(instance.getInstanceSwap(swapProp));
}

/** A text attribute. Values with a double quote use braces so the JSX stays valid. */
export function str(name: string, value: string | undefined | null | false): Attr {
  if (value === undefined || value === null || value === false) return undefined;
  return value.includes('"') ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
}

/** An expression attribute: name={code}. */
export function expr(name: string, code: string | undefined | null | false): Attr {
  return code === undefined || code === null || code === false ? undefined : `${name}={${code}}`;
}

/** A bare boolean attribute, present only when on. */
export function flag(name: string, on: boolean | undefined): Attr {
  return on ? name : undefined;
}

/** A self-closing element: one line when short, one attribute per line otherwise. */
export function tag(name: string, attrs: Attr[]): string {
  const list = attrs.filter((a): a is string => !!a);
  if (!list.length) return `<${name} />`;
  const line = `<${name} ${list.join(" ")} />`;
  return line.length <= 72 && !line.includes("\n") ? line : `<${name}\n  ${list.join("\n  ")}\n/>`;
}

/** An opening tag for an element with children. */
export function openTag(name: string, attrs: Attr[]): string {
  const list = attrs.filter((a): a is string => !!a);
  if (!list.length) return `<${name}>`;
  const line = `<${name} ${list.join(" ")}>`;
  return line.length <= 72 ? line : `<${name}\n  ${list.join("\n  ")}\n>`;
}

/** Marks a string as code to embed as is in literal(), such as a function. */
export const code = (source: string) => ({ __code: source });

/** A JavaScript literal for plain data, dropping undefined keys. Objects stay on one line when short. */
export function literal(value: unknown, indent = 0): string {
  if (value && typeof value === "object" && "__code" in value) return String((value as { __code: string }).__code);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value !== "object" || value === null) return String(value);
  const pad = "  ".repeat(indent + 1);
  const end = "  ".repeat(indent);
  if (Array.isArray(value)) {
    const items = value.map((v) => literal(v, indent + 1));
    const line = `[${items.join(", ")}]`;
    return line.length <= 60 && !line.includes("\n") ? line : `[\n${items.map((i) => pad + i).join(",\n")},\n${end}]`;
  }
  const entries = Object.entries(value).filter(([, v]) => v !== undefined);
  const parts = entries.map(([k, v]) => `${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${literal(v, indent + 1)}`);
  const line = `{ ${parts.join(", ")} }`;
  return line.length <= 80 && !line.includes("\n") ? line : `{\n${parts.map((p) => pad + p).join(",\n")},\n${end}}`;
}

/** A stable id from a label: "Price, low to high" → "price-low-to-high". */
export function slug(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
}

/** The numbers in a piece of copy: "₹2,000 – ₹8,000" → [2000, 8000]. */
export function numbers(text: string): number[] {
  return (text.replace(/,/g, "").match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
}

/** The first number in a piece of copy, or undefined. */
export function firstNumber(text: string): number | undefined {
  return numbers(text)[0];
}
