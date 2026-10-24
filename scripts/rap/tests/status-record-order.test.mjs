import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

// §353, as restructured by OPS-GOV-STATUS-RESTRUCTURE-001: current records
// remain ordered and §7a contiguous; relocated records retain their original
// order inside each history file and are discoverable through the index.
const ROOT = new URL("../../../", import.meta.url);
const read = (path) => readFile(new URL(path, ROOT), "utf8");
const records = (text) => [...text.matchAll(/^## (\d+)([a-z]?)\. /gm)]
  .filter((m) => Number(m[1]) >= 8)
  .map((m) => ({ number: Number(m[1]), suffix: m[2], id: m[1] + m[2], index: m.index }));

function ordered(list) {
  assert.equal(new Set(list.map(({id}) => id)).size, list.length, "Record identifiers must be unique per file");
  const comparable = list.filter(({id}) => id !== "52");
  for (let i = 1; i < comparable.length; i += 1) {
    const [a, b] = [comparable[i - 1], comparable[i]];
    assert.ok(a.number < b.number || (a.number === b.number && a.suffix < b.suffix),
      `§${b.id} follows §${a.id}: records must ascend`);
  }
}

test("§7a is contiguous and continuing numbered records stay after §8", async () => {
  const status = await read("docs/ops/HEDGR_STATUS.md");
  assert.equal((status.match(/^## 7a\. /gm) ?? []).length, 1);
  const from = status.indexOf("## 7a. ");
  assert.match(status.slice(from + 1).match(/^## .+$/m)?.[0] ?? "", /^## 8\. /);
  const section8 = status.indexOf("## 8. ");
  assert.ok(section8 > from);
  const list = records(status);
  assert.ok(list.every(({index}) => index >= section8));
  ordered(list);
  for (const n of [207,213,217,219,233,234,278,286,288,290,291,292,293,303,326,331,336,339,343,346,347,352,353,354,364,410,421,437]) {
    assert.ok(list.some(({id}) => id === String(n)), `Continuing §${n} stays current`);
  }
});

test("history numbered records ascend, retain §52 placement, and each has an index row", async () => {
  const names = (await readdir(new URL("docs/ops/history/", ROOT)))
    .filter((name) => /^HEDGR_STATUS_RECORDS_.*\.md$/.test(name));
  assert.ok(names.length > 0);
  const index = await read("docs/ops/history/RELOCATION_INDEX.md");
  const all = [];
  for (const name of names) {
    const list = records(await read(`docs/ops/history/${name}`));
    ordered(list);
    for (const item of list) {
      assert.ok(index.includes(`${name}#${item.id}-`), `Missing relocation row for ${name} §${item.id}`);
      all.push(item.id);
    }
    if (list.some(({id}) => id === "52")) {
      const ids = list.map(({id}) => id);
      const at = ids.indexOf("52");
      assert.deepEqual(ids.slice(at - 1, at + 2), ["44", "52", "45"]);
    }
  }
  const current = records(await read("docs/ops/HEDGR_STATUS.md")).map(({id}) => id);
  const combined = [...current, ...all];
  assert.equal(new Set(combined).size, combined.length, "No numbered record may be duplicated across current/history");
  assert.ok(!combined.includes("153") && !combined.includes("208"), "Original absent identifiers stay absent");
});
