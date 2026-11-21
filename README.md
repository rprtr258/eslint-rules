# @rprtr258/eslint-rules

Personal ESLint rules. Each rule lives in its own file and is separately importable; the package is consumed straight from GitHub, nothing is published to npm.

## Install

```sh
bun add github:rprtr258/eslint-rules
```

## Usage

Flat config, one rule at a time:

```ts
import {commentHygiene} from "@rprtr258/eslint-rules/comment-hygiene";

export default [{
  plugins: {personal: {rules: {"comment-hygiene": commentHygiene}}},
  rules: {"personal/comment-hygiene": "error"},
}];
```

Everything at once:

```ts
import * as personal from "@rprtr258/eslint-rules";

export default [{
  plugins: {personal: {rules: {
    "comment-hygiene": personal.commentHygiene,
    "no-boolean-literal-compare": personal.noBooleanLiteralCompare,
    "no-restating-comments": personal.noRestatingComments,
    "no-unused-class-members": personal.noUnusedClassMembers,
  }}},
  rules: {
    "personal/comment-hygiene": "error",
    "personal/no-boolean-literal-compare": "error",
    "personal/no-restating-comments": "error",
    "personal/no-unused-class-members": "error",
  },
}];
```

## Rules

| Import | Flags |
|---|---|
| `comment-hygiene` | history-narration comments and prose (dead provenance, off-repo labels, resolved-transition wording); also exports `mdParser`, a no-op parser so the rule can run over markdown with `{prose: true}` |
| `no-boolean-literal-compare` | `x === true` / `x === false` comparisons on exact-boolean values (type-aware); union narrowing stays allowed |
| `no-restating-comments` | comments that restate the code next to them |
| `no-unused-class-members` | class methods never referenced anywhere in the repo (repo root = eslint cwd) |

Repo-scoped rules (`comment-hygiene` allowlist, `no-unused-class-members` scan) resolve paths against the eslint cwd, which is the repo root in the usual setup.
