/**
 * Configuration for `npm run lint` (scripts/lint/cli.mjs).
 *
 * rules:   override a rule's severity — "error", "warn" or "off".
 * ignores: accept one specific finding. Each entry names the rule and narrows it with
 *          `file`, `subject` (the token or name the finding is about) or `message`
 *          (a substring), and must give a `reason`. An entry that stops matching is
 *          reported, so an exception cannot outlive what it excused.
 *
 * `npm run lint -- --list` describes every rule.
 */
export default {
  rules: {},

  ignores: [
    {
      rule: "docs/unknown-token",
      file: "components/radio.md",
      subject: "borderWidth.3",
      reason: "Historical note: the primitive was added for the Material focus ring and removed with it; the spec records that on purpose.",
    },
    {
      rule: "docs/unknown-token",
      file: "README.md",
      subject: "{color.family.step}",
      reason: "Placeholder syntax in the pipeline table describing which references the gradient preprocessor resolves.",
    },
  ],
};
