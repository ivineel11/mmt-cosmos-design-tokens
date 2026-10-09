/**
 * var() for a custom property whose name is built at runtime, such as one per intent.
 * The docs-site/css-var lint only checks names written out in full, so prefer a literal
 * var() where the name is fixed.
 */
export const cssVar = (name: string) => `var(${name})`;
