import {describe, expect, test} from "bun:test";
import {Linter} from "eslint";
import {commentHygiene} from "./comment-hygiene.ts";

const linter = new Linter();
const lint = (code: string): string[] =>
  linter.verify(code, {
    plugins: {local: {rules: {"comment-hygiene": commentHygiene}}},
    rules: {"local/comment-hygiene": "error"},
  }).map(message => message.message);

const cases: {comment: string; length: number; kind: string}[] = [
  {comment: "// We used to bump the counter here.", length: 1, kind: "habitual after subject"},
  {comment: "// We used to be a map, now a dict.", length: 1, kind: "stative after subject"},
  {comment: "// Used to be a map, now a dict.", length: 1, kind: "line-initial stative"},
  {comment: "// This is used to pin the viewer's order.", length: 0, kind: "aux-preceded passive"},
  {comment: "// Used to pin the table viewer's pagination order.", length: 0, kind: "ellipsed-subject passive"},
  {comment: "// It used to warn on bad input.", length: 0, kind: "warn carve-out"},
  {comment: "// No longer a map.", length: 1, kind: "no-longer branch"},
];

describe("local/comment-hygiene resolved-transition wording", () => {
  for (const {comment, length, kind} of cases) {
    test(`${length > 0 ? "flags" : "passes"} (${kind}): ${comment}`, () => {
      expect(lint(`${comment}\nconst x = 1;`)).toHaveLength(length);
    });
  }
});
