// Side-effect CSS imports carry no typed exports; this stops tsc from treating
// `import "./Button.css"` as an unresolved module.
declare module "*.css";
