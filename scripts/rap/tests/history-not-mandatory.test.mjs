import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../../../", import.meta.url);
const read = async (path) => readFile(new URL(path, ROOT), "utf8");
const EXPECTED = [
  "AGENTS.md",
  "docs/decisions/SPRINT-2-ADR-INDEX.md",
  "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md",
  "docs/ops/HEDGR_STATUS.md"
].sort();

function guard(manifest, policy, history) {
  assert.deepEqual(manifest.sources.map(({source_path}) => source_path).sort(), EXPECTED,
    "Mandatory sources must remain exactly the four current sources");
  assert.doesNotMatch(JSON.stringify({manifest, policy}), /docs\/ops\/history\//,
    "History must never enter the manifest or policy");
  for (const {name, text} of history) {
    assert.match(text, /HISTORICAL \/ NON-OPERATIVE/, `${name} needs a non-authority banner`);
    assert.doesNotMatch(text, /^## 7\. Current sequence and active status$/m,
      `${name} must not contain a live §7 heading`);
    assert.doesNotMatch(text, /^Current active ticket status:$/m,
      `${name} must not contain the live active-ticket marker`);
  }
}

async function fixture() {
  const manifest = JSON.parse(await read("scripts/rap/contracts/phase0/initial-authority-source-manifest.json"));
  const policy = JSON.parse(await read("scripts/rap/contracts/phase0/phase0-policy.json"));
  const history = await Promise.all((await readdir(new URL("docs/ops/history/", ROOT)))
    .filter((name) => name.endsWith(".md"))
    .map(async (name) => ({name, text: await read(`docs/ops/history/${name}`)})));
  return {manifest, policy, history};
}

test("history is non-operative and excluded from the four mandatory sources", async () => {
  const {manifest, policy, history} = await fixture();
  // The opt-in private negative run must exit non-zero; no contract file changes.
  if (process.env.HEDGR_HISTORY_NEGATIVE_FIXTURE === "1") {
    manifest.sources.push({source_path: "docs/ops/history/RELOCATION_INDEX.md"});
  }
  guard(manifest, policy, history);
});

test("guard rejects negative fixtures for mandatory history, policy history and live markers", async () => {
  const {manifest, policy, history} = await fixture();
  const bad = structuredClone(manifest);
  bad.sources.push({source_path: "docs/ops/history/RELOCATION_INDEX.md"});
  assert.throws(() => guard(bad, policy, history), /four current sources/);
  assert.throws(() => guard(manifest, {...policy, history: "docs/ops/history/example.md"}, history), /History must never enter/);
  for (const marker of ["## 7. Current sequence and active status", "Current active ticket status:"]) {
    assert.throws(() => guard(manifest, policy, [{name: "negative.md", text: `HISTORICAL / NON-OPERATIVE\n${marker}\n`}]), /must not contain/);
  }
});
