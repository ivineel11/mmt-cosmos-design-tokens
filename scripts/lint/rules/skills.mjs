/**
 * The vendored uSpec skills and their configuration (README → Component specifications).
 * These files are rendered by `npx uspec-skills` and must never be hand-edited, so the
 * checks are about the two installs agreeing with each other and with the config.
 */

const PLATFORM_DIRS = { "claude-code": ".claude/skills", cursor: ".cursor/skills", codex: ".agents/skills" };

// Only the Stage 2 create-* skills differ between platform renders, and only in
// invocation syntax. Everything else is byte-identical across platforms.
const isPlatformSpecific = (skill) => skill.startsWith("create-") && skill !== "create-component-md";

function skillsIn(api, dir) {
  const skills = new Map();
  for (const file of api.files()) {
    if (!file.startsWith(`${dir}/`)) continue;
    const rest = file.slice(dir.length + 1);
    const [skill] = rest.split("/");
    if (!skills.has(skill)) skills.set(skill, new Set());
    skills.get(skill).add(rest.slice(skill.length + 1));
  }
  return skills;
}

const parity = {
  id: "skills/parity",
  description: "Every installed platform carries the same uSpec skills, and the platform-independent ones (create-component-md, extract-*, firstrun) are byte-identical across installs — a difference means one copy was hand-edited or not re-rendered.",
  check(api) {
    const installed = Object.values(PLATFORM_DIRS).filter((dir) => api.files().some((f) => f.startsWith(`${dir}/`)));
    if (installed.length < 2) return;
    const sets = installed.map((dir) => [dir, skillsIn(api, dir)]);
    const [baseDir, base] = sets[0];
    for (const [dir, skills] of sets.slice(1)) {
      for (const skill of new Set([...base.keys(), ...skills.keys()])) {
        const inBase = base.get(skill);
        const inOther = skills.get(skill);
        if (!inBase || !inOther) {
          const [has, lacks] = inBase ? [baseDir, dir] : [dir, baseDir];
          api.report({ file: `${has}/${skill}/SKILL.md`, subject: skill, message: `Skill "${skill}" is installed in ${has} but not ${lacks}. Run \`npx uspec-skills install --platform <p>\` for the missing platform.` });
          continue;
        }
        if (isPlatformSpecific(skill)) continue;
        for (const file of new Set([...inBase, ...inOther])) {
          const a = api.read(`${baseDir}/${skill}/${file}`);
          const b = api.read(`${dir}/${skill}/${file}`);
          if (a !== b) {
            api.report({ file: `${dir}/${skill}/${file}`, subject: skill, message: `Differs from ${baseDir}/${skill}/${file}, but ${skill} is platform-independent and should be byte-identical. Re-render the skills rather than editing them.` });
          }
        }
      }
    }
  },
};

const config = {
  id: "skills/uspec-config",
  description: "uspecs.config.json names a platform whose skills are installed, and its pinned cliVersion is the one the README documents and every `npx uspec-skills@…` command uses.",
  check(api) {
    const text = api.read("uspecs.config.json");
    if (text === null) return;
    let cfg;
    try {
      cfg = JSON.parse(text);
    } catch (error) {
      api.report({ file: "uspecs.config.json", message: `Invalid JSON: ${error.message}` });
      return;
    }
    const dir = PLATFORM_DIRS[cfg.environment];
    if (!dir) {
      api.report({ file: "uspecs.config.json", message: `environment is ${JSON.stringify(cfg.environment)}; expected one of ${Object.keys(PLATFORM_DIRS).join(", ")}.` });
    } else if (!api.files().some((f) => f.startsWith(`${dir}/`))) {
      api.report({ file: "uspecs.config.json", message: `environment is "${cfg.environment}" but ${dir}/ has no skills, so the orchestrator would dispatch into nothing.` });
    }
    if (!/^\d+\.\d+\.\d+$/.test(cfg.cliVersion ?? "")) {
      api.report({ file: "uspecs.config.json", message: `cliVersion should be an exact pinned version, got ${JSON.stringify(cfg.cliVersion)}.` });
      return;
    }
    for (const file of api.files().filter((f) => f.endsWith(".md") && !/^(\.claude|\.cursor|\.agents|references)\//.test(f))) {
      const src = api.read(file) ?? "";
      src.split("\n").forEach((line, i) => {
        for (const m of line.matchAll(/uspec-skills@(\d+\.\d+\.\d+)/g)) {
          if (m[1] !== cfg.cliVersion) {
            api.report({ file, line: i + 1, column: m.index + 1, message: `Pins uspec-skills@${m[1]} but uspecs.config.json pins ${cfg.cliVersion}. Schema drift between the two is a known failure mode.` });
          }
        }
        const row = /^\|\s*`uspec-skills` CLI\s*\|\s*`([^`]+)`/.exec(line);
        if (row && row[1] !== cfg.cliVersion) {
          api.report({ file, line: i + 1, column: 1, message: `Documents CLI version ${row[1]} but uspecs.config.json pins ${cfg.cliVersion}.` });
        }
      });
    }
  },
};

export default [parity, config];
