import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// B-P2-min (§353): numbered records form one ascending region from `## 8.` to the
// end of HEDGR_STATUS.md; §7 and §7a contain no numbered record, so §7a runs
// contiguously from its heading to `## 8.`. New records are appended at EOF.

const ROOT = new URL("../../../", import.meta.url);
const RECORD = /^## (\d+)([a-z]?)\. /;
// Pre-existing placement at main when §353 was recorded (§52 sits between §44 and
// §45). B-P2-min relocated only §323–§352 and deliberately left this untouched.
const KNOWN_OUT_OF_ORDER = new Set(["52"]);

async function statusHeadings() {
  const text = await readFile(new URL("docs/ops/HEDGR_STATUS.md", ROOT), "utf8");
  return text.split("\n").flatMap((line, index) => (line.startsWith("## ") ? [{ line, index }] : []));
}

const one = (headings, prefix) => {
  const hits = headings.filter(({ line }) => line.startsWith(prefix));
  assert.equal(hits.length, 1, `HEDGR_STATUS.md must contain exactly one "${prefix}" heading`);
  return hits[0];
};

const records = (headings) => headings.flatMap(({ line, index }) => {
  const match = RECORD.exec(line);
  return match && Number(match[1]) >= 8 ? [{ index, number: Number(match[1]), suffix: match[2], id: match[1] + match[2] }] : [];
});

test("§7a is contiguous: the next ## heading after ## 7a. is ## 8.", async () => {
  const headings = await statusHeadings();
  const section7a = one(headings, "## 7a. ");
  const next = headings.find(({ index }) => index > section7a.index);
  assert.ok(next, "A ## heading must follow ## 7a.");
  assert.ok(next.line.startsWith("## 8. "), `Numbered record or other ## heading inside §7a: ${next.line.slice(0, 80)}`);
});

test("numbered records (§8 onward) all sit in one region from ## 8. to EOF, each number once", async () => {
  const headings = await statusHeadings();
  const section8 = one(headings, "## 8. ");
  const list = records(headings);
  const misplaced = list.filter(({ index }) => index < section8.index).map(({ id }) => `§${id}`);
  assert.deepEqual(misplaced, [], "Numbered records must not appear above ## 8. (inside §7 / §7a)");
  const unnumbered = headings.filter(({ line, index }) => index > section8.index && !RECORD.test(line));
  assert.deepEqual(unnumbered.map(({ line }) => line.slice(0, 80)), [], "Only numbered records may follow ## 8.");
  const ids = list.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length, "Each numbered record heading must appear exactly once");
});

test("numbered records ascend to EOF; new records are appended after the highest number", async () => {
  const list = records(await statusHeadings()).filter(({ id }) => !KNOWN_OUT_OF_ORDER.has(id));
  for (let i = 1; i < list.length; i += 1) {
    const [a, b] = [list[i - 1], list[i]];
    const ascending = a.number < b.number || (a.number === b.number && a.suffix < b.suffix);
    assert.ok(ascending, `§${b.id} follows §${a.id}: numbered records must be in ascending order with new records at EOF`);
  }
});
