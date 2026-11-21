import js from "@eslint/js";
import {defineConfig} from "eslint/config";
import tseslint from "typescript-eslint";
import {commentHygiene, mdParser} from "./rules/comment-hygiene.ts";
import {noBooleanLiteralCompare} from "./rules/no-boolean-literal-compare.ts";
import {noRestatingComments} from "./rules/no-restating-comments.ts";
import {noUnusedClassMembers} from "./rules/no-unused-class-members.ts";

export default defineConfig([
  {
    files: ["**/*.ts"],
    plugins: {js},
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({...config, files: ["**/*.ts"]})),
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts"],
    plugins: {local: {rules: {
      "no-unused-class-members": noUnusedClassMembers,
      "comment-hygiene": commentHygiene,
      "no-boolean-literal-compare": noBooleanLiteralCompare,
      "no-restating-comments": noRestatingComments,
    }}},
    rules: {
      "local/no-unused-class-members": "error",
      "local/comment-hygiene": "error",
      "@typescript-eslint/array-type": "error",
      "local/no-boolean-literal-compare": "error",
      "local/no-restating-comments": "error",
    },
  },
  {
    files: ["**/*.md"],
    plugins: {local: {rules: {"comment-hygiene": commentHygiene}}},
    languageOptions: {parser: mdParser},
    rules: {"local/comment-hygiene": ["error", {prose: true}]},
  },
]);
