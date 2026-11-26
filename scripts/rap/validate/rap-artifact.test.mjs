import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdir, mkdtemp, readFile, realpath, rename, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  OUTPUT_PATH, SOURCE_DEFINITIONS, assertFullGitSha, buildProjection, compareVectors, exactCommit,
  generateFromGit, git, readCheckout, readVector, serializeProjection, standaloneProofMessage, verifyArtifact
} from "../generate-repo-authority-projection.mjs";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const REPOSITORY = "mhibajene/hedgr-copilot";
const SOURCES = SOURCE_DEFINITIONS.map(({ source_path }) => source_path);
const INPUTS = [...SOURCES, OUTPUT_PATH];
const ABSENT = "f".repeat(40);
const UTC_DAY = "2026-11-25T00:00:00.000Z";
const ACTIONS_KEYS = [
  "GITHUB_ACTIONS", "GITHUB_EVENT_NAME", "GITHUB_EVENT_PATH",
  "GITHUB_REF", "GITHUB_SHA", "GITHUB_REPOSITORY", "GITHUB_WORKSPACE"
];

async function hostedValidation(repoRoot, env, diagnostic) {
  assert.equal(env.GITHUB_ACTIONS, "true", "Invalid GitHub Actions context");
  assert.equal(env.GITHUB_EVENT_NAME, "pull_request", "Expected pull_request Actions event");
  assert.equal(env.GITHUB_REPOSITORY, REPOSITORY, "Unexpected Actions repository");
  assert.ok(path.isAbsolute(env.GITHUB_WORKSPACE ?? ""), "Missing Actions workspace");
  assert.equal(await realpath(env.GITHUB_WORKSPACE), await realpath(repoRoot), "Wrong Actions workspace");
  assert.ok(path.isAbsolute(env.GITHUB_EVENT_PATH ?? ""), "Missing absolute Actions event path");
  assert.equal((await git(repoRoot, ["rev-parse", "--is-shallow-repository"])).toString().trim(),
    "false", "Hosted RAP validation requires full history");

  const event = JSON.parse(await readFile(env.GITHUB_EVENT_PATH, "utf8"));
  const pr = event.pull_request;
  const N = event.number;
  assert.ok(Number.isSafeInteger(N) && N > 0 && pr?.number === N, "Invalid event PR number");
  assert.equal(env.GITHUB_REF, `refs/pull/${N}/merge`, "Expected the event PR merge ref");
  assert.equal(event.repository?.full_name, REPOSITORY, "Unexpected event repository");
  assert.equal(pr.base?.repo?.full_name, REPOSITORY, "Unexpected event base repository");
  assert.equal(pr.base.ref, "main", "Expected main PR target");

  const B = pr.base.sha;
  const H = pr.head?.sha;
  const C = env.GITHUB_SHA;
  for (const revision of [B, H, C]) assertFullGitSha(revision);
  const mergeObject = await exactCommit(repoRoot, C);
  const parents = mergeObject.split("\n\n", 1)[0].split("\n")
    .filter((line) => line.startsWith("parent ")).map((line) => line.slice("parent ".length));
  assert.deepEqual(parents, [B, H], "Raw merge parents differ from the pinned event base/head");
  const checkout = await readCheckout(repoRoot);
  assert.equal(checkout.revision, C, "Checkout HEAD differs from GITHUB_SHA");
  const head = await readVector(repoRoot, H);
  assert.deepEqual(compareVectors(head, checkout.vector), [], "PR head and merge checkout differ on RAP inputs");
  const base = await readVector(repoRoot, B);
  const changes = compareVectors(base, checkout.vector);
  const route = changes.length ? "STRICT_OPTION_A" : "UNCHANGED_FROM_BASE";
  const tuple = `N=${N} B=${B} H=${H} C=${C}`;
  diagnostic(`${route} ${tuple}`);
  if (changes.length) {
    const result = await verifyArtifact({ repoRoot, checkout, strict: true, ancestorsOf: [H, C] });
    diagnostic(`STRICT_OPTION_A_VERIFIED ${tuple} S=${result.projection.source_commit}`);
  }
  return route;
}

test("live strict RAP proof", async (t) => {
  try {
    if (ACTIONS_KEYS.some((key) => Object.hasOwn(process.env, key))) {
      await hostedValidation(ROOT, process.env, (line) => t.diagnostic(line));
      return;
    }
    const { projection } = await verifyArtifact({ repoRoot: ROOT, strict: true, mainAdvisory: true });
    t.diagnostic(standaloneProofMessage(projection.source_commit));
  } catch (error) {
    t.diagnostic("UNKNOWN / INSUFFICIENT");
    throw error;
  }
});

const DOCUMENTS = {
  [SOURCES[0]]: [
    "# Status",
    "**Sequencing authority:** Governed fixture only.",
    "## 7. Current sequence and active status",
    "Current active ticket status:",
    "- **Lane V:** `ACTIVE-001`",
    "- **Sequencing posture:** ACTIVE-001 is the only ticket.",
    "",
    "---",
    "## 7a. Tickets",
    ""
  ].join("\n"),
  [SOURCES[1]]: "Current parallelism posture: Singular-ticket posture is active with `ACTIVE-001` the sole active ticket.\n",
  [SOURCES[2]]: "# Sprint 2 ADR Index\n",
  [SOURCES[3]]: "# Hedgr Active Doctrine Index\n## Active doctrine set\n## Change control\n"
};

function fixtureGit(root, ...args) {
  return execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1",
      GIT_AUTHOR_NAME: "RAP fixture", GIT_AUTHOR_EMAIL: "rap@example.invalid",
      GIT_COMMITTER_NAME: "RAP fixture", GIT_COMMITTER_EMAIL: "rap@example.invalid",
      GIT_AUTHOR_DATE: "2026-11-25T03:04:05Z", GIT_COMMITTER_DATE: "2026-11-25T09:08:07Z"
    },
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

async function temporary(t) {
  const root = await realpath(await mkdtemp(path.join(tmpdir(), "rap-attribution-")));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

async function bareRemote(t) {
  const remote = await temporary(t);
  fixtureGit(remote, "init", "--bare", "-q");
  return remote;
}

async function put(root, file, contents) {
  const location = path.join(root, file);
  await mkdir(path.dirname(location), { recursive: true });
  await writeFile(location, contents);
}

function commit(root, message) {
  fixtureGit(root, "add", "--all");
  fixtureGit(root, "commit", "--quiet", "--allow-empty", "-m", message);
  return fixtureGit(root, "rev-parse", "HEAD");
}

function commitTree(root, treeish, parents, message) {
  return fixtureGit(root, "commit-tree", `${treeish}^{tree}`,
    ...parents.flatMap((parent) => ["-p", parent]), "-m", message);
}

async function generate(root, S) {
  const result = await generateFromGit({ repoRoot: root, requestedCommit: S });
  assert.equal(result.validation.ok, true);
  const serialized = serializeProjection(result.projection);
  await put(root, OUTPUT_PATH, serialized);
  return { serialized, projection: result.projection };
}

async function fixture(t, { source = SOURCES[2], legacy = true } = {}) {
  const root = await temporary(t);
  fixtureGit(root, "init", "-q", "-b", "main");
  for (const [file, text] of Object.entries(DOCUMENTS)) await put(root, file, text);
  const seed = commit(root, "original sources");
  const original = await generate(root, seed);
  if (legacy) {
    const entry = structuredClone(original.projection);
    for (const source of entry.sources) {
      delete source.content_sha256;
      source.reason = "Loaded from the explicit Phase 1 allow-list at the bound git commit.";
    }
    await put(root, OUTPUT_PATH, serializeProjection(entry));
  }
  const B = commit(root, "base artifact");
  fixtureGit(root, "switch", "-q", "-c", "head");
  if (source) await put(root, source, DOCUMENTS[source] + "\nSource-only byte edit.\n");
  const S = commit(root, "exact source revision");
  const modern = await generate(root, S);
  const H = commit(root, "modern artifact");
  return { root, seed, B, S, H, ...modern };
}

async function hosted(root, B, H, { tree = H, checkout = true } = {}) {
  const C = commitTree(root, tree, [B, H], "synthetic PR merge");
  if (checkout) fixtureGit(root, "switch", "-q", "--detach", C);
  const eventPath = path.join(root, ".git", "fixture-event.json");
  const event = {
    number: 41, repository: { full_name: REPOSITORY },
    pull_request: {
      number: 41, head: { sha: H }, base: { sha: B, ref: "main", repo: { full_name: REPOSITORY } }
    }
  };
  await writeFile(eventPath, JSON.stringify(event));
  const env = {
    GITHUB_ACTIONS: "true", GITHUB_EVENT_NAME: "pull_request", GITHUB_REPOSITORY: REPOSITORY,
    GITHUB_EVENT_PATH: eventPath, GITHUB_REF: "refs/pull/41/merge", GITHUB_SHA: C, GITHUB_WORKSPACE: root
  };
  return { C, env, event, eventPath };
}

async function runFixture(t, root, env) {
  return hostedValidation(root, env, (line) => t.diagnostic(`ISOLATED_FIXTURE ${line}`));
}

test("strict source edit and RAP-only migration reproduce canonical bytes from S", async (t) => {
  for (const source of [SOURCES[2], null]) {
    const { root, B, S, H, serialized, projection } = await fixture(t, { source });
    const second = await generate(root, S);
    assert.equal(second.serialized, serialized);
    assert.equal(projection.generated_at, UTC_DAY);
    for (const { source_path, content_sha256 } of projection.sources) {
      const raw = await readFile(path.join(root, source_path));
      assert.equal(content_sha256, createHash("sha256").update(raw).digest("hex"));
    }
    const { env } = await hosted(root, B, H);
    assert.equal(await runFixture(t, root, env), "STRICT_OPTION_A");
  }
});

test("squash, source-ref deletion, later unchanged PR with S absent, and depth-one content", async (t) => {
  const { root, B, H, S } = await fixture(t);
  const M = commitTree(root, H, [B], "squash seed");
  const archive = await bareRemote(t);
  const producingRef = "refs/pull/41/head";
  fixtureGit(root, "push", "--quiet", archive, `${H}:${producingRef}`);
  fixtureGit(root, "update-ref", "refs/heads/main", M);
  fixtureGit(root, "switch", "-q", "main");
  fixtureGit(root, "update-ref", "-d", "refs/heads/head", H);
  assert.throws(() => fixtureGit(root, "show-ref", "--verify", "refs/heads/head"));
  assert.equal(fixtureGit(root, "rev-parse", "--verify", "main"), M);
  t.diagnostic(`ISOLATED_FIXTURE SOURCE_REF_DELETED H=${H} M=${M}`);
  const fresh = await temporary(t);
  fixtureGit(fresh, "clone", "--quiet", "--no-local", "--single-branch", "--branch", "main", root, ".");
  await assert.rejects(exactCommit(fresh, S), /missing, unreadable or not a commit/);
  await assert.rejects(verifyArtifact({ repoRoot: fresh, strict: true }), /missing, unreadable or not a commit/);
  await verifyArtifact({ repoRoot: fresh, strict: false });

  // Create and undo an intermediate source edit. Selection is the net delivered tree.
  await put(fresh, SOURCES[2], DOCUMENTS[SOURCES[2]]);
  commit(fresh, "temporary undo of seeded source");
  const sourceBytes = await readFile(path.join(root, SOURCES[2]));
  await put(fresh, SOURCES[2], sourceBytes);
  const laterHead = commit(fresh, "restore seeded bytes before delivery");
  const { C, env } = await hosted(fresh, M, laterHead);
  assert.equal(await runFixture(t, fresh, env), "UNCHANGED_FROM_BASE");
  fixtureGit(fresh, "branch", "shallow-pr", C);

  for (const branch of ["main", "shallow-pr"]) {
    const shallow = await temporary(t);
    fixtureGit(shallow, "clone", "--quiet", "--no-local", "--depth=1", "--branch", branch, fresh, ".");
    assert.equal(fixtureGit(shallow, "rev-parse", "--is-shallow-repository"), "true");
    await assert.rejects(exactCommit(shallow, S), /missing/);
    await verifyArtifact({ repoRoot: shallow, strict: false });
    t.diagnostic(`ISOLATED_FIXTURE CONTENT_ONLY ${branch}`);
    await assert.rejects(verifyArtifact({ repoRoot: shallow, strict: true }), /missing/);
    await assert.rejects(runFixture(t, shallow, { ...env, GITHUB_WORKSPACE: shallow }), /requires full history/);
    fixtureGit(shallow, "fetch", "--quiet", archive, producingRef);
    assert.equal(fixtureGit(shallow, "rev-parse", "FETCH_HEAD"), H);
    await verifyArtifact({ repoRoot: shallow, strict: true });
  }

  fixtureGit(fresh, "fetch", "--quiet", archive, producingRef);
  assert.equal(fixtureGit(fresh, "rev-parse", "FETCH_HEAD"), H);
  assert.equal(await runFixture(t, fresh, env), "UNCHANGED_FROM_BASE");
  fixtureGit(fresh, "switch", "-q", "--detach", M);
  assert.throws(() => fixtureGit(fresh, "merge-base", "--is-ancestor", S, M), { status: 1 });
  assert.equal(fixtureGit(fresh, "merge-base", S, H), S);
  const { projection } = await verifyArtifact({ repoRoot: fresh, strict: true });
  assert.equal(standaloneProofMessage(projection.source_commit),
    `STANDALONE_BYTES_VERIFIED S=${S}. Lineage not verified. The operator must separately verify the producing-head ancestry and squash lineage under §7a condition 11.`);
  // The same source state would be a changed-path revert against the seeded base.
  fixtureGit(root, "switch", "-q", "--detach", M);
  await put(root, SOURCES[2], DOCUMENTS[SOURCES[2]]);
  const revertSource = commit(root, "revert old source bytes");
  await generate(root, revertSource);
  const revertHead = commit(root, "regenerate revert RAP");
  assert.equal(await runFixture(t, root, (await hosted(root, M, revertHead)).env), "STRICT_OPTION_A");
});

test("strict rejects missing, mis-typed and unconnected S while content needs no object", async (t) => {
  const { root, B, H, S, projection } = await fixture(t);
  const unrelated = commitTree(root, S, [], "unconnected equal inputs");
  const objectTypes = [
    ABSENT, S.slice(0, 12), S.toUpperCase(), unrelated,
    fixtureGit(root, "rev-parse", `${S}^{tree}`),
    fixtureGit(root, "rev-parse", `${S}:${SOURCES[0]}`)
  ];
  fixtureGit(root, "tag", "-a", "fixture", S, "-m", "synthetic tag");
  objectTypes.push(fixtureGit(root, "rev-parse", "refs/tags/fixture"));
  for (const source of objectTypes) {
    await t.test(source, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      const forged = structuredClone(projection);
      forged.source_commit = source;
      for (const entry of forged.sources) entry.actual_revision = entry.expected_revision = source;
      for (const entry of Object.values(forged.payload.fields)) entry.source_commit = source;
      await put(root, OUTPUT_PATH, serializeProjection(forged));
      const changed = commit(root, "fixture bad S");
      const { env } = await hosted(root, B, changed);
      if (source === ABSENT || source === unrelated) await verifyArtifact({ repoRoot: root, strict: false });
      await assert.rejects(runFixture(t, root, env), /Exact commit object|full lowercase|not verified as an ancestor/);
    });
  }
});

test("strict rejects source mismatches for each fixed path and requires the H lineage", async (t) => {
  const { root, B, H, S } = await fixture(t);
  for (const file of SOURCES) {
    await t.test(file, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      const bytes = await readFile(path.join(root, file));
      await put(root, file, Buffer.concat([bytes, Buffer.from("\nByte edit only.\n")]));
      const changed = commit(root, "fixture changes bytes after S");
      const { env } = await hosted(root, B, changed);
      await assert.rejects(runFixture(t, root, env), /disagrees with checkout bytes or modes/);
    });
  }
  fixtureGit(root, "switch", "-q", "--detach", B);
  const baseOnly = commitTree(root, S, [B], "S reachable only through base");
  const regenerated = buildProjection({
    sourceCommit: baseOnly, generatedAt: UTC_DAY,
    sourceDocuments: Object.fromEntries(await Promise.all(SOURCES.map(async (file) => [
      file, await git(root, ["cat-file", "blob", `${S}:${file}`])
    ])))
  });
  fixtureGit(root, "switch", "-q", "--detach", H);
  await put(root, OUTPUT_PATH, serializeProjection(regenerated.projection));
  const forgedH = commit(root, "self-consistent RAP points to base-only commit");
  await verifyArtifact({ repoRoot: root, strict: false });
  const { env } = await hosted(root, baseOnly, forgedH);
  await assert.rejects(runFixture(t, root, env), /not verified as an ancestor/);
});

test("strict and content reject changed shape, metadata, digests and serialization", async (t) => {
  const { root, B, H, projection } = await fixture(t);
  const cases = [
    ["wrong date", (p) => { p.generated_at = "2026-11-26T00:00:00.000Z"; }, true],
    ["noncanonical date", (p) => { p.generated_at = "2026-11-25T01:00:00.000Z"; }],
    ["missing hash", (p) => { delete p.sources[0].content_sha256; }],
    ["malformed digest", (p) => { p.sources[0].content_sha256 = "A".repeat(64); }],
    ["false digest", (p) => { p.sources[0].content_sha256 = "a".repeat(64); }],
    ["extra entry", (p) => { p.sources.push(p.sources[0]); }],
    ["missing entry", (p) => { p.sources.pop(); }],
    ["swapped order", (p) => { p.sources.reverse(); }],
    ["duplicate entry", (p) => { p.sources[1] = p.sources[0]; }],
    ["wrong role", (p) => { p.sources[0].source_role = "WRONG_ROLE"; }],
    ["false provenance", (p) => { p.payload.fields.sequencing_posture.source_commit = ABSENT; }],
    ["unknown provenance", (p) => { delete p.payload.fields.sequencing_posture.source_section; }],
    ["unknown key", (p) => { p.sources[0].extra = "unexpected"; }],
    ...["execution_authority", "mutation_allowed", "ticket_activation_allowed", "sequencing_allowed"]
      .map((field) => [field, (p) => { p[field] = true; }]),
    ["noncanonical bytes", () => {}, false, (text) => text.trimEnd()]
  ];
  for (const [label, mutate, contentOk, render = (text) => text] of cases) {
    await t.test(label, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      const candidate = structuredClone(projection);
      mutate(candidate);
      await put(root, OUTPUT_PATH, render(serializeProjection(candidate)));
      const changed = commit(root, "fixture bad artifact");
      const { env } = await hosted(root, B, changed);
      await assert.rejects(runFixture(t, root, env), /does not match deterministic generation|canonical UTC midnight/);
      if (contentOk) await verifyArtifact({ repoRoot: root, strict: false });
      else await assert.rejects(verifyArtifact({ repoRoot: root, strict: false }));
    });
  }
});

test("every fixed path and a regular mode-only change selects strict", async (t) => {
  for (const file of SOURCES) {
    await t.test(file, async (subtest) => {
      const { root, H, B } = await fixture(subtest, { source: file, legacy: false });
      assert.equal(await runFixture(subtest, root, (await hosted(root, B, H)).env), "STRICT_OPTION_A");
    });
  }
  const { root, H, S } = await fixture(t);
  await chmod(path.join(root, OUTPUT_PATH), 0o755);
  const modeOnly = commit(root, "mode-only fixture");
  const { env, C } = await hosted(root, H, modeOnly);
  assert.deepEqual(compareVectors(await readVector(root, H), await readVector(root, C)), [OUTPUT_PATH]);
  assert.equal(await runFixture(t, root, env), "STRICT_OPTION_A");
  await assert.rejects(verifyArtifact({ repoRoot: root, strict: true, requestedCommit: H }), /differs from the artifact/);
  await verifyArtifact({ repoRoot: root, strict: true, requestedCommit: S });
});

test("fixed paths reject rename, deletion, non-regular entries and checkout/index drift", async (t) => {
  const { root, B, H } = await fixture(t);
  for (const file of INPUTS) {
    await t.test(`delete ${file}`, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      await rm(path.join(root, file));
      const changed = commit(root, "delete a fixed input");
      const { env } = await hosted(root, B, changed);
      await assert.rejects(runFixture(t, root, env), /missing from/);
    });
  }
  const target = SOURCES[2];
  for (const kind of ["rename", "symlink", "directory", "gitlink"]) {
    await t.test(kind, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      const location = path.join(root, target);
      if (kind === "rename") await rename(location, location + ".renamed");
      else {
        await rm(location);
        if (kind === "symlink") await symlink("../ops/HEDGR_STATUS.md", location);
        if (kind === "directory") await put(root, target + "/nested", "substitute");
        if (kind === "gitlink") {
          fixtureGit(root, "update-index", "--cacheinfo", `160000,${H},${target}`);
          fixtureGit(root, "commit", "-qm", "substitute a gitlink");
        }
      }
      const changed = kind === "gitlink" ? fixtureGit(root, "rev-parse", "HEAD") : commit(root, "replace a fixed input");
      const { env } = await hosted(root, B, changed);
      await assert.rejects(runFixture(t, root, env), /non-regular|missing/);
    });
  }

  fixtureGit(root, "switch", "-q", "--detach", H);
  const { env } = await hosted(root, B, H);
  for (const file of [target, OUTPUT_PATH]) {
    const original = await readFile(path.join(root, file));
    await put(root, file, original.toString().replaceAll("\n", "\r\n"));
    await assert.rejects(runFixture(t, root, env), /working bytes or mode differ/);
    fixtureGit(root, "add", "--", file);
    await put(root, file, original);
    await assert.rejects(runFixture(t, root, env), /staged changes/);
    fixtureGit(root, "restore", "--staged", "--", file);
  }
  const directory = path.dirname(path.join(root, target));
  await rename(directory, directory + ".real");
  await symlink(directory + ".real", directory);
  await assert.rejects(runFixture(t, root, env), /traverses a non-directory or symlink/);
});

test("UTF-8 conversion cannot hide committed bytes and invalid encodings fail closed", async (t) => {
  const { root, B, H } = await fixture(t);
  for (const [name, prefix] of [
    ["UTF-8 BOM", Buffer.from([0xef, 0xbb, 0xbf])],
    ["invalid UTF-8", Buffer.from([0xff])]
  ]) {
    await t.test(name, async () => {
      fixtureGit(root, "switch", "-q", "--detach", H);
      await put(root, SOURCES[2], Buffer.concat([prefix, Buffer.from(DOCUMENTS[SOURCES[2]])]));
      const badSource = commit(root, "fixture invalid encoding");
      await assert.rejects(generateFromGit({ repoRoot: root, requestedCommit: badSource }), new RegExp(name));
      const { env } = await hosted(root, B, badSource);
      await assert.rejects(runFixture(t, root, env), /disagrees with checkout bytes/);
    });
  }
});

test("pinning rejects invalid Actions context and stale or masked tuples", async (t) => {
  const { root, B, H, S } = await fixture(t);
  const { C, env, event, eventPath } = await hosted(root, B, H);
  for (const [key, invalid, reason] of [
    ["GITHUB_ACTIONS", "false", /Invalid GitHub Actions/],
    ["GITHUB_EVENT_NAME", "pull_request_target", /Expected pull_request/],
    ["GITHUB_REPOSITORY", "foreign/repo", /Unexpected Actions repository/],
    ["GITHUB_WORKSPACE", path.join(root, ".git"), /Wrong Actions workspace/],
    ["GITHUB_EVENT_PATH", undefined, /Missing absolute/],
    ["GITHUB_REF", "refs/pull/99/merge", /Expected the event PR merge ref/],
    ["GITHUB_SHA", undefined, /full lowercase/],
    ["GITHUB_SHA", ABSENT, /Exact commit object/],
    ["GITHUB_SHA", H, /Raw merge parents/]
  ]) {
    await assert.rejects(runFixture(t, root, { ...env, [key]: invalid }), reason);
  }
  for (const [label, change, reason] of [
    ["wrong base", (e) => { e.pull_request.base.sha = S; }, /Raw merge parents/],
    ["wrong head", (e) => { e.pull_request.head.sha = S; }, /Raw merge parents/],
    ["swapped parents", (e) => { e.pull_request.base.sha = H; e.pull_request.head.sha = B; }, /Raw merge parents/],
    ["non-main target", (e) => { e.pull_request.base.ref = "elsewhere"; }, /Expected main/],
    ["wrong base repo", (e) => { e.pull_request.base.repo.full_name = "foreign/repo"; }, /Unexpected event base/],
    ["wrong event repo", (e) => { e.repository.full_name = "foreign/repo"; }, /Unexpected event repository/],
    ["wrong event number", (e) => { e.pull_request.number = 42; }, /Invalid event PR number/],
    ["missing event SHA", (e) => { delete e.pull_request.head.sha; }, /full lowercase/]
  ]) {
    await t.test(label, async () => {
      const forged = structuredClone(event);
      change(forged);
      await writeFile(eventPath, JSON.stringify(forged));
      await assert.rejects(runFixture(t, root, env), reason);
    });
  }
  await writeFile(eventPath, JSON.stringify(event));
  fixtureGit(root, "update-ref", "refs/remotes/origin/main", H);
  fixtureGit(root, "update-ref", "refs/pull/41/head", S);
  assert.equal(await runFixture(t, root, { ...env, RAP_MODE: "CONTENT_ONLY", PR_BASE: H }), "STRICT_OPTION_A");
  fixtureGit(root, "switch", "-q", "--detach", S);
  await assert.rejects(runFixture(t, root, env), /Checkout HEAD differs/);
  fixtureGit(root, "switch", "-q", "--detach", C);
  const masked = await hosted(root, B, H, { tree: B });
  await assert.rejects(runFixture(t, root, masked.env), /PR head and merge checkout differ/);
});

async function removeLooseObject(root, oid) {
  await rm(path.join(root, ".git", "objects", oid.slice(0, 2), oid.slice(2)));
}

test("unreadable base/merge inputs fail closed without a promisor fetch", async (t) => {
  for (const type of ["parent", "tree", "blob", "source"]) {
    await t.test(type, async (subtest) => {
      const { root, B, H, S } = await fixture(subtest);
      const { env, C } = await hosted(root, B, H);
      const oid = {
        parent: B, tree: fixtureGit(root, "rev-parse", `${B}^{tree}`),
        blob: fixtureGit(root, "rev-parse", `${B}:${OUTPUT_PATH}`),
        source: S
      }[type];
      const hook = path.join(root, ".git", "guard-upload-pack");
      await writeFile(hook, "#!/bin/sh\nprintf called > \"$0.called\"\nexit 1\n", { mode: 0o755 });
      fixtureGit(root, "config", "remote.guard.promisor", "true");
      fixtureGit(root, "config", "protocol.ext.allow", "always");
      fixtureGit(root, "config", "remote.guard.url", "ext::" + hook);
      await removeLooseObject(root, oid);
      await assert.rejects(runFixture(subtest, root, env), /Exact commit object|cat-file|ls-tree/);
      await assert.rejects(readFile(hook + ".called"), { code: "ENOENT" });
      assert.notEqual(oid, C);
    });
  }
});

test("replacement objects and grafts cannot influence immutable selection or ancestry", async (t) => {
  const { root, B, H, S } = await fixture(t);
  const { env, C } = await hosted(root, B, H);
  fixtureGit(root, "replace", S, B);
  fixtureGit(root, "replace", B, H);
  await put(root, ".git/info/grafts", `${C} ${H}\n`);
  assert.equal(await runFixture(t, root, env), "STRICT_OPTION_A");
});

test("an isolated force-push during the strict check leaves proof pinned to the old tuple", async (t) => {
  const { root, B, H, S } = await fixture(t);
  const remote = await bareRemote(t);
  const ref = "refs/heads/pr-head";
  const replacement = commitTree(root, B, [B], "non-fast-forward replacement head");
  assert.throws(() => fixtureGit(root, "merge-base", "--is-ancestor", H, replacement), { status: 1 });
  fixtureGit(root, "push", "--quiet", remote, `${H}:${ref}`);
  const { C, env, event, eventPath } = await hosted(root, B, H);
  const tuple = `N=41 B=${B} H=${H} C=${C}`;
  const diagnostics = [];
  assert.equal(await hostedValidation(root, env, (message) => {
    diagnostics.push(message);
    if (message === `STRICT_OPTION_A ${tuple}`) {
      fixtureGit(root, "push", "--quiet", `--force-with-lease=${ref}:${H}`, remote, `${replacement}:${ref}`);
      assert.equal(fixtureGit(remote, "rev-parse", ref), replacement);
      t.diagnostic(`ISOLATED_FIXTURE FORCE_PUSH_AFTER_SELECTION ${tuple} replacement=${replacement}`);
    }
  }), "STRICT_OPTION_A");
  assert.deepEqual(diagnostics, [`STRICT_OPTION_A ${tuple}`, `STRICT_OPTION_A_VERIFIED ${tuple} S=${S}`]);
  for (const message of diagnostics) t.diagnostic(`ISOLATED_FIXTURE ${message}`);

  event.pull_request.head.sha = fixtureGit(remote, "rev-parse", ref);
  await writeFile(eventPath, JSON.stringify(event));
  await assert.rejects(runFixture(t, root, env), /Raw merge parents differ/);
  const fresh = await hosted(root, B, replacement);
  assert.notEqual(fresh.C, C);
  assert.equal(await runFixture(t, root, fresh.env), "UNCHANGED_FROM_BASE");
});

// The review fixtures apply §7a's independent continuity check outside hosted routing.
const EVALUATORS = [
  "package.json", "scripts/rap", "scripts/bridge", ".github", "scripts/ci",
  ".nvmrc", "pnpm-lock.yaml", "turbo.json", ":(glob)**/.gitattributes"
];

function reviewedChanges(root, left, right, paths) {
  const names = fixtureGit(root, "diff", "--no-renames", "--name-only", "-z", left, right, "--", ...paths);
  return names.split("\0").filter(Boolean);
}

function reviewAnchorContinuity(root, record, tip, receipt) {
  const history = fixtureGit(root, "rev-list", "--first-parent", tip).split("\n");
  const anchorIndex = history.indexOf(record);
  if (anchorIndex < 0 || (receipt && receipt !== record)) return "NO_TRUSTED_ANCHOR";
  for (let index = anchorIndex; index > 0; index -= 1) {
    if (reviewedChanges(root, history[index], history[index - 1], [...INPUTS, ...EVALUATORS]).length) {
      return "CONTINUITY_BROKEN";
    }
  }
  return receipt ? "EFFECTIVE_ANCHOR" : "PENDING_EFFECTIVITY";
}

test("an admitted unchanged squash preserves pending effectivity and a source-changing squash breaks continuity", async (t) => {
  const { root, B, H } = await fixture(t);
  const record = commitTree(root, H, [B], "record delivered, receipt pending");
  fixtureGit(root, "switch", "-q", "--detach", record);
  // The fixture stipulates independent authorisation and ordinary gates for this separate change.
  await put(root, "admitted-work.txt", "Separately authorised non-dependent fixture.\n");
  const admitted = commit(root, "admitted unrelated work");
  assert.equal(await runFixture(t, root, (await hosted(root, record, admitted)).env), "UNCHANGED_FROM_BASE");
  const intervening = commitTree(root, admitted, [record], "admitted squash");
  assert.equal(reviewAnchorContinuity(root, record, intervening), "PENDING_EFFECTIVITY");
  assert.equal(reviewAnchorContinuity(root, record, intervening, record), "EFFECTIVE_ANCHOR");
  assert.equal(reviewAnchorContinuity(root, record, intervening, admitted), "NO_TRUSTED_ANCHOR");
  assert.equal(reviewAnchorContinuity(root, H, intervening), "NO_TRUSTED_ANCHOR");

  fixtureGit(root, "switch", "-q", "--detach", intervening);
  const source = SOURCES[2];
  await put(root, source, (await readFile(path.join(root, source), "utf8")) + "\nGoverned byte change.\n");
  const changedSource = commit(root, "source change during hold");
  await generate(root, changedSource);
  const changedHead = commit(root, "technically valid artifact");
  assert.equal(await runFixture(t, root, (await hosted(root, intervening, changedHead)).env), "STRICT_OPTION_A");
  const forbiddenSquash = commitTree(root, changedHead, [intervening], "hypothetical forbidden squash");
  assert.equal(reviewAnchorContinuity(root, record, forbiddenSquash), "CONTINUITY_BROKEN");
  assert.equal(reviewAnchorContinuity(root, record, forbiddenSquash, record), "CONTINUITY_BROKEN");
  t.diagnostic(`ISOLATED_FIXTURE PENDING_WINDOW record=${record} admitted=${intervening} forbidden=${forbiddenSquash} pending=PENDING_EFFECTIVITY forbidden_result=CONTINUITY_BROKEN`);
});

test("independent evaluator review rejects dispatch and selector rewrites on a green continuity tuple", async (t) => {
  const { root } = await fixture(t);
  const dispatch = "package.json";
  const selector = "scripts/rap/validate/rap-artifact.test.mjs";
  function manifest(trustCheck) {
    return JSON.stringify({ scripts: { "trust:check": trustCheck } }) + "\n";
  }
  await put(root, dispatch, manifest("node ./scripts/ci/trust-check.mjs && pnpm -w bridge:rap:test:strict"));
  await put(root, selector,
    'export const select = (changed) => changed ? "STRICT_OPTION_A" : "UNCHANGED_FROM_BASE";\n');
  const base = commit(root, "reviewed synthetic evaluator");
  for (const [file, contents] of [
    [dispatch, manifest("node --version")],
    [selector, 'export const select = () => "UNCHANGED_FROM_BASE";\n']
  ]) {
    await t.test(file, async (subtest) => {
      fixtureGit(root, "switch", "-q", "--detach", base);
      await put(root, file, contents);
      const changed = commit(root, "unreviewed evaluator rewrite");
      const { C, env } = await hosted(root, base, changed);
      assert.deepEqual(reviewedChanges(root, base, C, INPUTS), []);
      assert.equal(await runFixture(subtest, root, env), "UNCHANGED_FROM_BASE");
      assert.deepEqual(reviewedChanges(root, base, changed, EVALUATORS), [file]);
      const attempted = commitTree(root, changed, [base], "hypothetical evaluator rewrite squash");
      assert.equal(reviewAnchorContinuity(root, base, attempted, base), "CONTINUITY_BROKEN");
      subtest.diagnostic(`ISOLATED_FIXTURE EVALUATOR_REWRITE_REJECTED B=${base} H=${changed} C=${C} path=${file}`);
    });
  }
});
