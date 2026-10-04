import docs from "./docs.mjs";
import eslint from "./eslint.mjs";
import generated from "./generated.mjs";
import skills from "./skills.mjs";
import storybook from "./storybook.mjs";
import tokens from "./tokens.mjs";

// Order matters for --fix: token fixes first, then dist/ is rebuilt from the result.
export default [...tokens, ...generated, ...storybook, ...docs, ...skills, ...eslint];
