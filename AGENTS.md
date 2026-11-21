# Project: `eslint-rules`

Personal ESLint rules package (`@rprtr258/eslint-rules`), consumed directly from GitHub: `bun add github:rprtr258/eslint-rules`. Local jj repo, colocated with git; the GitHub remote is added by hand when the repo goes public.

- Bun + TypeScript source, no build step — bun transpiles `.ts` in dependencies.
- One rule per file in `rules/`, each exposed via a subpath export in `package.json`.
- Rules resolve the consumer repo root from `context.cwd` (eslint cwd), never `import.meta.dirname` — installed copies run from inside `node_modules`.
- After any complete change, run `bun run ci` (lint + typecheck + tests) and fix all failures before considering the change done.
