/**
 * ESLint rules for code that consumes Cosmos tokens (the docs site today).
 *
 * cosmos/no-hardcoded-color — "Don't hardcode hex colors … in application code"
 * (README → Do's and Don'ts). Flags colour literals where they style something: inside a
 * JSX `style={{…}}` object and inside Tailwind arbitrary values in `className`
 * (`bg-[#fff]`). Comparing a value against "#fff" in logic is not styling and is left
 * alone. Reach for var(--color-…) instead; for a translucent colour, mix a colour token
 * with an opacity token (color-mix), as the README's Opacity section shows.
 */

const COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/;
const ARBITRARY_COLOR = /\[(?:#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?)\([^\]]*\))\]/;

function stringsIn(node) {
  if (!node) return [];
  if (node.type === "Literal" && typeof node.value === "string") return [{ node, text: node.value }];
  if (node.type === "TemplateLiteral") return node.quasis.map((q) => ({ node: q, text: q.value.cooked ?? "" }));
  if (node.type === "ConditionalExpression") return [...stringsIn(node.consequent), ...stringsIn(node.alternate)];
  if (node.type === "LogicalExpression" || node.type === "BinaryExpression") return [...stringsIn(node.left), ...stringsIn(node.right)];
  return [];
}

const noHardcodedColor = {
  meta: {
    type: "problem",
    docs: { description: "Style with Cosmos colour tokens, not colour literals." },
    schema: [],
    messages: {
      style: "Colour literal {{value}} in a style. Use a token (var(--color-…)); for a translucent colour, color-mix a colour token with an opacity token.",
      className: "Colour literal {{value}} in a Tailwind arbitrary value. Use a token, e.g. bg-(--color-bg-surface).",
    },
  },
  create(context) {
    return {
      JSXAttribute(attr) {
        const name = attr.name?.name;
        const expr = attr.value?.type === "JSXExpressionContainer" ? attr.value.expression : attr.value;
        if (name === "style" && expr?.type === "ObjectExpression") {
          for (const prop of expr.properties) {
            if (prop.type !== "Property") continue;
            for (const { node, text } of stringsIn(prop.value)) {
              const m = COLOR_LITERAL.exec(text);
              if (m) context.report({ node, messageId: "style", data: { value: m[0] } });
            }
          }
        }
        if (name === "className") {
          for (const { node, text } of stringsIn(expr)) {
            const m = ARBITRARY_COLOR.exec(text);
            if (m) context.report({ node, messageId: "className", data: { value: m[0] } });
          }
        }
      },
    };
  },
};

export default {
  meta: { name: "eslint-plugin-cosmos" },
  rules: { "no-hardcoded-color": noHardcodedColor },
};
