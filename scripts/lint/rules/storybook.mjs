/**
 * Rules for storybook/: it must agree with dist/ the way the docs site does, and its
 * components must take every visual value from a token.
 */
import { cssVarRule, typecheckRule } from "./generated.mjs";

const storybookCssVar = cssVarRule({
  id: "storybook/css-var",
  site: "Storybook's",
  description: "Every var(--…) Storybook uses is defined by dist/web/tokens.css or by its own styles, so a renamed token cannot silently unstyle a component or a docs page.",
  include: /^storybook\/(src|\.storybook)\/.*\.(css|tsx?|mdx)$/,
});

const storybookTypecheck = typecheckRule({
  id: "storybook/typecheck",
  dir: "storybook",
  description: "Storybook type-checks (tsc --noEmit) against freshly generated token data.",
});

// A hex colour, or a non-zero length in px/rem/em. Percentages, unitless numbers and
// keywords stay allowed: they are layout arithmetic, not design values.
const RAW_VALUE = /#[0-9a-fA-F]{3,8}\b|(?<![\w-])(?:\d*\.)?\d+(?:px|rem|em)\b/g;

const componentRawValue = {
  id: "storybook/component-raw-value",
  description: "Component stylesheets in storybook/src/components use token variables only: no hex colours and no px, rem or em lengths (0 is fine). A value the tokens lack needs a token, not a literal.",
  check(api) {
    const files = api.files().filter((f) => /^storybook\/src\/components\/.*\.css$/.test(f));
    for (const file of files) {
      const lines = (api.read(file) ?? "").split("\n");
      let inComment = false;
      lines.forEach((text, i) => {
        // Strip block comments, which may span lines.
        let code = "";
        let rest = text;
        while (rest.length) {
          if (inComment) {
            const close = rest.indexOf("*/");
            if (close === -1) { rest = ""; break; }
            inComment = false;
            rest = rest.slice(close + 2);
          } else {
            const open = rest.indexOf("/*");
            if (open === -1) { code += rest; break; }
            code += rest.slice(0, open);
            inComment = true;
            rest = rest.slice(open + 2);
          }
        }
        for (const m of code.matchAll(RAW_VALUE)) {
          if (/^0+(?:\.0+)?(?:px|rem|em)$/.test(m[0])) continue;
          api.report({ file, line: i + 1, column: m.index + 1, subject: m[0], message: `${m[0]} is a raw value. Use the component or semantic token for it.` });
        }
      });
    }
  },
};

const mdxProseBrace = {
  id: "storybook/mdx-prose-brace",
  description: "MDX prose has no bare {name}: MDX evaluates it as JavaScript, so the page builds but throws \"name is not defined\" when opened. Put it in backticks or escape the braces.",
  check(api) {
    const files = api.files().filter((f) => /^storybook\/src\/.*\.mdx$/.test(f));
    for (const file of files) {
      let fenced = false;
      (api.read(file) ?? "").split("\n").forEach((text, i) => {
        if (/^\s*```/.test(text)) {
          fenced = !fenced;
          return;
        }
        // Code fences, imports and JSX lines are code, where braces are meant.
        if (fenced || /^\s*(import|export|<)/.test(text)) return;
        const prose = text.replace(/`[^`]*`/g, "");
        for (const m of prose.matchAll(/\{\s*[A-Za-z_$][\w$.]*\s*\}/g)) {
          api.report({ file, line: i + 1, subject: m[0], message: `${m[0]} in MDX prose is evaluated as JavaScript. Wrap it in backticks or escape the braces.` });
        }
      });
    }
  },
};

export default [storybookCssVar, storybookTypecheck, componentRawValue, mdxProseBrace];
