import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import test from "node:test";

import {
  ProjectionGenerationError,
  SOURCE_DEFINITIONS,
  assertFullGitSha,
  buildProjection,
  generateFromGit,
  serializeProjection
} from "../scripts/generate-repo-authority-projection.mjs";

const REPO_ROOT = new URL("../../../", import.meta.url);
const SOURCE_COMMIT = "93c75ed1b2c4d5e6f708192a3b4c5d6e7f8091ab";
const GENERATED_AT = "2026-07-19T10:00:00.000Z";

async function currentSourceDocuments() {
  const entries = await Promise.all(
    SOURCE_DEFINITIONS.map(async ({ source_path: sourcePath }) => [
      sourcePath,
      await readFile(new URL(sourcePath, REPO_ROOT), "utf8")
    ])
  );
  return Object.fromEntries(entries);
}

test("generator uses the exact mandatory Phase 1 source allow-list", () => {
  assert.deepEqual(
    SOURCE_DEFINITIONS.map((source) => source.source_path),
    [
      "docs/ops/HEDGR_STATUS.md",
      "AGENTS.md",
      "docs/decisions/SPRINT-2-ADR-INDEX.md",
      "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md"
    ]
  );
});

test("identical source revision produces byte-identical current RAP output", async () => {
  const sourceDocuments = await currentSourceDocuments();
  const first = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments
  });
  const second = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments: structuredClone(sourceDocuments)
  });

  assert.equal(first.validation.ok, true);
  assert.equal(first.projection.freshness, "CURRENT");
  assert.equal(first.projection.coverage, "COMPLETE");
  assert.equal(first.projection.generated_at, "2026-07-19T00:00:00.000Z");
  assert.equal(serializeProjection(first.projection), serializeProjection(second.projection));
  assert.deepEqual(first.projection.payload.fields.active_ticket_ids.value, [
    "CLASS-A-VAL-002",
    "SE-REASON-001"
  ]);
  assert.equal(first.projection.execution_authority, false);
  assert.equal(first.projection.mutation_allowed, false);
  assert.equal(first.projection.ticket_activation_allowed, false);
  assert.equal(first.projection.sequencing_allowed, false);
});

test("all material RAP fields carry the common source revision", async () => {
  const result = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments: await currentSourceDocuments()
  });

  for (const field of Object.values(result.projection.payload.fields)) {
    assert.equal(field.source_commit, SOURCE_COMMIT);
    assert.equal(field.source_path, "docs/ops/HEDGR_STATUS.md");
    assert.equal(field.source_classification, "REPO_AUTHORITY");
    assert.equal(field.freshness, "CURRENT");
    assert.ok(field.source_section.length > 0);
  }
  assert.ok(
    result.projection.sources.every(
      (source) =>
        source.expected_revision === SOURCE_COMMIT &&
        source.actual_revision === SOURCE_COMMIT
    )
  );
});

test("missing explicit active-ticket records fail instead of being inferred", async () => {
  const sourceDocuments = await currentSourceDocuments();
  sourceDocuments["docs/ops/HEDGR_STATUS.md"] = sourceDocuments[
    "docs/ops/HEDGR_STATUS.md"
  ].replace(/^\s*- \*\*Lane [^\n]+$/gm, "");

  assert.throws(
    () =>
      buildProjection({
        sourceCommit: SOURCE_COMMIT,
        generatedAt: GENERATED_AT,
        sourceDocuments
      }),
    (error) =>
      error instanceof ProjectionGenerationError &&
      /does not explicitly record any active Lane ticket/.test(error.message)
  );
});

test("authority disagreement is attributed and never resolved", async () => {
  const sourceDocuments = await currentSourceDocuments();
  sourceDocuments["AGENTS.md"] = sourceDocuments["AGENTS.md"].replaceAll(
    "CLASS-A-VAL-002",
    "WRONG-TICKET-001"
  );

  const result = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments
  });

  assert.equal(result.projection.freshness, "UNKNOWN");
  assert.equal(result.projection.coverage, "INSUFFICIENT");
  assert.equal(result.projection.conflicts.length, 1);
  assert.equal(result.projection.conflicts[0].resolved, false);
  assert.equal(
    result.projection.conflicts[0].stronger_source_path,
    "docs/ops/HEDGR_STATUS.md"
  );
  assert.equal(result.projection.conflicts[0].lower_source_path, "AGENTS.md");
  assert.match(result.projection.conflicts[0].non_resolution_statement, /does not resolve/i);
  assert.equal(result.validation.ok, false);
  assert.ok(
    result.validation.errors.some(
      (error) => error.code === "UNRESOLVED_AUTHORITY_CONFLICT"
    )
  );
});

test("revision identifiers fail closed unless they are full lowercase git SHAs", () => {
  for (const invalid of ["HEAD", "93c75ed", "A".repeat(40), "", "g".repeat(40)]) {
    assert.throws(() => assertFullGitSha(invalid), ProjectionGenerationError);
  }
  assert.doesNotThrow(() => assertFullGitSha(SOURCE_COMMIT));
});

test("generator implementation contains no discovery or external retrieval", async () => {
  const generator = await readFile(
    new URL("../scripts/generate-repo-authority-projection.mjs", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(generator, /\breaddir\b|\bglob\b|\bfetch\b|https?:\/\//i);
});

// Fixed synthetic sources avoid relying on the live repo's historical wording.
function legibilityFixture({ lag = false, conflict = false, delegated = true, completed = true } = {}) {
  return {
    "docs/ops/HEDGR_STATUS.md": [
      "# Synthetic status",
      "**Sequencing authority:** " +
        (delegated ? "Only **§7** / **§7a** name approved active ticket(s). " : "") +
        "Controlled Parallelism is active and names `ACTIVE-001`" +
        (lag ? " and `RETIRED-001`" : "") + ".",
      "## 7. Current sequence and active status",
      "Current active ticket status:",
      "- **Lane V:** `ACTIVE-001`",
      ...(completed ? ["- **Completed historical Lane N tickets:** `RETIRED-001`."] : []),
      "- **Sequencing posture:** Only ACTIVE-001 is active; consult §7a.",
      "\n---",
      "## 7a. Active execution tickets",
      "ACTIVE-001 is the sole active ticket in this synthetic fixture."
    ].join("\n"),
    "AGENTS.md": "Current parallelism posture: Singular-ticket posture is active with `" +
      (conflict ? "INCOMPATIBLE-001" : "ACTIVE-001") + "` as the sole active ticket.\n",
    "docs/decisions/SPRINT-2-ADR-INDEX.md": "# Sprint 2 ADR Index\n",
    "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md":
      "# Hedgr Active Doctrine Index\n## Active doctrine set\n## Change control\n"
  };
}

function projectFixture(sourceDocuments) {
  return buildProjection({ sourceCommit: SOURCE_COMMIT, generatedAt: GENERATED_AT, sourceDocuments });
}

test("clean authority has no hygiene warning or additional authority fields", () => {
  const result = projectFixture(legibilityFixture());
  assert.equal(result.validation.ok, true);
  assert.deepEqual(result.hygieneWarnings, []);
  assert.equal(result.projection.freshness, "CURRENT");
  assert.deepEqual(Object.keys(result.projection.payload.fields), [
    "active_ticket_ids", "sequencing_posture", "authority_boundaries"
  ]);
});

test("explicit subordinate lag is attributable and cannot repair source or projected authority", () => {
  const sources = legibilityFixture({ lag: true });
  const before = structuredClone(sources);
  const result = projectFixture(sources);
  assert.deepEqual(sources, before);
  assert.equal(result.validation.ok, true);
  assert.equal(result.projection.freshness, "CURRENT");
  assert.deepEqual(result.projection.conflicts, []);
  assert.deepEqual(result.projection.payload.fields.active_ticket_ids.value, ["ACTIVE-001"]);
  const [warning] = result.hygieneWarnings;
  assert.equal(result.hygieneWarnings.length, 1);
  assert.equal(warning.code, "SUPERSEDED_LANE_NARRATIVE");
  assert.equal(warning.source_path, "docs/ops/HEDGR_STATUS.md");
  assert.equal(warning.source_section, "§2 Sequencing authority");
  assert.equal(warning.source_commit, SOURCE_COMMIT);
  assert.equal(warning.ticket_reference, "RETIRED-001");
  assert.equal(warning.effect_on_authority, "none");
  assert.match(warning.canonical_authority, /Permanent-main.*§7 \/ §7a/);
  assert.match(warning.required_action, /steward.*do not auto-repair/);
  assert.match(warning.reason, /completed Lane entry/);
  assert.match(warning.limitation, /not every narrative statement/);
  const field = result.projection.payload.fields.authority_boundaries;
  assert.match(field.value, /is active and names `ACTIVE-001` and `RETIRED-001`/);
  assert.equal(field.source_path, warning.source_path);
  assert.equal(field.source_section, warning.source_section);
  assert.equal(field.source_commit, SOURCE_COMMIT);
  assert.equal(field.freshness, "CURRENT");
  assert.doesNotMatch(serializeProjection(result.projection), /hygieneWarnings|SUPERSEDED_LANE_NARRATIVE/);
});

test("genuine current-authority conflict remains fail-closed even when narrative lag exists", () => {
  const result = projectFixture(legibilityFixture({ lag: true, conflict: true }));
  assert.equal(result.validation.ok, false);
  assert.equal(result.projection.freshness, "UNKNOWN");
  assert.equal(result.projection.conflicts.length, 1);
  assert.equal(result.projection.conflicts[0].resolved, false);
  assert.ok(result.validation.errors.some((error) => error.code === "UNRESOLVED_AUTHORITY_CONFLICT"));
  assert.deepEqual(result.hygieneWarnings, []);
});

test("unclassified prose is not guessed into a non-blocking lag classification", () => {
  for (const controls of [{ delegated: false }, { completed: false }]) {
    const result = projectFixture(legibilityFixture({ lag: true, ...controls }));
    assert.deepEqual(result.hygieneWarnings, []);
  }
});

const execute = promisify(execFileCallback);
const GENERATOR_PATH = "apps/bridge-worker/scripts/generate-repo-authority-projection.mjs";

async function gitFixture(t, sources) {
  const repoRoot = await realpath(await mkdtemp(path.join(tmpdir(), "hedgr-legibility-")));
  t.after(() => rm(repoRoot, { recursive: true, force: true }));
  const runGit = async (...args) => (await execute("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: repoRoot,
    env: { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1" }
  })).stdout.trim();
  // Only the generator's existing contract dependencies are copied into the disposable repo.
  for (const file of [
    GENERATOR_PATH,
    "apps/bridge-worker/contracts/phase0/validate.mjs",
    "apps/bridge-worker/contracts/phase0/phase0-policy.json"
  ]) {
    const destination = path.join(repoRoot, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, await readFile(new URL(file, REPO_ROOT)));
  }
  for (const [file, contents] of Object.entries(sources)) {
    const destination = path.join(repoRoot, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, contents);
  }
  await mkdir(path.join(repoRoot, "docs/ops/bridge"), { recursive: true });
  await runGit("init", "-b", "main");
  await runGit("config", "user.name", "Synthetic Fixture");
  await runGit("config", "user.email", "fixture@example.invalid");
  await runGit("config", "commit.gpgsign", "false");
  await runGit("add", ".");
  await runGit("commit", "-m", "synthetic permanent-main baseline");
  const mainCommit = await runGit("rev-parse", "HEAD");
  await runGit("update-ref", "refs/remotes/origin/main", mainCommit);
  const cli = (...args) => execute(process.execPath, [path.join(repoRoot, GENERATOR_PATH), ...args], { cwd: repoRoot });
  return { repoRoot, runGit, mainCommit, cli };
}

test("RAP commands keep clean state quiet and warn on lag without rewriting sources", async (t) => {
  for (const lag of [false, true]) {
    const sources = legibilityFixture({ lag });
    const { repoRoot, cli } = await gitFixture(t, sources);
    const written = await cli("--write");
    const artifact = await readFile(path.join(repoRoot, "docs/ops/bridge/repo-authority-projection.json"), "utf8");
    const checked = await cli("--check");
    const stdout = await cli();
    assert.equal(stdout.stdout, artifact);
    assert.equal(await readFile(path.join(repoRoot, "docs/ops/bridge/repo-authority-projection.json"), "utf8"), artifact);
    for (const result of [written, checked, stdout]) {
      if (lag) assert.match(result.stderr, /Authority legibility WARN:.*SUPERSEDED_LANE_NARRATIVE/);
      else assert.equal(result.stderr, "");
    }
    for (const [file, contents] of Object.entries(sources)) {
      assert.equal(await readFile(path.join(repoRoot, file), "utf8"), contents);
    }
  }
});

test("draft decision references and missing local main history cannot become accepted authority", async (t) => {
  const { repoRoot, runGit, mainCommit, cli } = await gitFixture(t, legibilityFixture());
  const accepted = await generateFromGit({ repoRoot, requestedCommit: mainCommit });
  await runGit("switch", "-c", "draft");
  const agentsPath = path.join(repoRoot, "AGENTS.md");
  const draftSource = (await readFile(agentsPath, "utf8")) + "\nProposed decision D-999 in an unmerged synthetic draft; not accepted.\n";
  await writeFile(agentsPath, draftSource);
  await runGit("add", "AGENTS.md");
  await runGit("commit", "-m", "unmerged synthetic decision reference");
  const draftCommit = await runGit("rev-parse", "HEAD");
  const draft = await generateFromGit({ repoRoot, requestedCommit: draftCommit });
  assert.equal(draft.validation.ok, true);
  assert.equal(draft.hygieneWarnings[0].code, "MAIN_HISTORY_UNVERIFIED");
  assert.equal(draft.hygieneWarnings[0].observed_main_commit, mainCommit);
  assert.equal(draft.hygieneWarnings[0].effect_on_authority, "none");
  assert.equal(await runGit("rev-parse", "refs/remotes/origin/main"), mainCommit);
  assert.equal(await runGit("rev-parse", "main"), mainCommit);
  for (const key of Object.keys(accepted.projection.payload.fields)) {
    assert.deepEqual(draft.projection.payload.fields[key].value, accepted.projection.payload.fields[key].value);
  }
  for (const field of ["execution_authority", "mutation_allowed", "ticket_activation_allowed", "sequencing_allowed"]) {
    assert.equal(draft.projection[field], false);
  }
  const output = await cli();
  assert.match(output.stderr, /MAIN_HISTORY_UNVERIFIED/);
  assert.doesNotMatch(output.stdout, /D-999/);
  assert.equal(await readFile(agentsPath, "utf8"), draftSource);
  await runGit("update-ref", "-d", "refs/remotes/origin/main");
  const withoutMain = await generateFromGit({ repoRoot, requestedCommit: draftCommit });
  assert.equal(withoutMain.validation.ok, true);
  assert.equal(withoutMain.hygieneWarnings[0].observed_main_commit, null);
});

test("conflict and deterministic-artifact failures retain command exit failure ahead of warnings", async (t) => {
  const { cli } = await gitFixture(t, legibilityFixture({ lag: true, conflict: true }));
  await assert.rejects(cli("--write"), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /UNRESOLVED_AUTHORITY_CONFLICT/);
    assert.doesNotMatch(error.stderr, /Authority legibility WARN/);
    return true;
  });
  const clean = await gitFixture(t, legibilityFixture({ lag: true }));
  await clean.cli("--write");
  await writeFile(path.join(clean.repoRoot, "docs/ops/bridge/repo-authority-projection.json"), "{}\n");
  await assert.rejects(clean.cli("--check", "--source-commit", clean.mainCommit), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /does not match deterministic generation/);
    assert.doesNotMatch(error.stderr, /Authority legibility WARN/);
    return true;
  });
});
