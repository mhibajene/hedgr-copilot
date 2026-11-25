import { execFile as execFileCallback } from "node:child_process";
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { lstat, open, realpath } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import {
  classifyConflict,
  validateResponseEnvelope
} from "./contracts/phase0/validate.mjs";

const execFile = promisify(execFileCallback);
const FULL_GIT_SHA = /^[0-9a-f]{40}$/;

const SOURCE_DEFINITIONS = Object.freeze([
  Object.freeze({
    source_path: "docs/ops/HEDGR_STATUS.md",
    source_role: "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY"
  }),
  Object.freeze({
    source_path: "AGENTS.md",
    source_role: "REPO_EXECUTION_CONTRACT"
  }),
  Object.freeze({
    source_path: "docs/decisions/SPRINT-2-ADR-INDEX.md",
    source_role: "ACCEPTED_ADR_INDEX"
  }),
  Object.freeze({
    source_path: "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md",
    source_role: "ACTIVE_DOCTRINE_SET_INDEX"
  })
]);

const OUTPUT_PATH = "docs/ops/bridge/repo-authority-projection.json";
const SOURCE_PATHS = SOURCE_DEFINITIONS.map(({ source_path }) => source_path);
const INPUT_PATHS = Object.freeze([...SOURCE_PATHS, OUTPUT_PATH]);
const NON_RESOLUTION_DESCRIPTION =
  "HEDGR_STATUS.md and AGENTS.md record different active-ticket sets.";
const MAIN_REFERENCE = "refs/remotes/origin/main";
const CANONICAL_AUTHORITY =
  "Permanent-main docs/ops/HEDGR_STATUS.md §7 / §7a, AGENTS.md, accepted ADRs, active doctrine and applicable repo-native delegation.";

class ProjectionGenerationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProjectionGenerationError";
  }
}

function assertFullGitSha(sourceCommit) {
  if (typeof sourceCommit !== "string" || sourceCommit.length !== 40 || !FULL_GIT_SHA.test(sourceCommit)) {
    throw new ProjectionGenerationError(
      "source_commit must be a full lowercase 40-character git commit SHA."
    );
  }
}

function unique(values) {
  return [...new Set(values)];
}

function sameValues(left, right) {
  return (
    left.length === right.length &&
    [...left].sort().every((value, index) => value === [...right].sort()[index])
  );
}

function extractSection(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  if (start === -1) {
    throw new ProjectionGenerationError(`Missing explicit ${label} start marker.`);
  }
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (end === -1) {
    throw new ProjectionGenerationError(`Missing explicit ${label} end marker.`);
  }
  return source.slice(start, end);
}

function extractLiveSection(statusSource) {
  const heading = /^## 7\. Current sequence and active status$/gm;
  if ([...statusSource.matchAll(heading)].length !== 1) {
    throw new ProjectionGenerationError(
      "HEDGR_STATUS.md must contain exactly one explicit live §7 heading."
    );
  }
  return extractSection(
    statusSource,
    "## 7. Current sequence and active status",
    "\n## 7a.",
    "HEDGR_STATUS.md live §7"
  );
}

function extractLiveActiveStatus(liveSection) {
  return extractSection(
    liveSection,
    "Current active ticket status:",
    "\n---",
    "HEDGR_STATUS.md current-active-ticket"
  );
}

function extractStatusProjection(statusSource) {
  const liveSection = extractLiveSection(statusSource);
  const activeStatus = extractLiveActiveStatus(liveSection);
  const activeTicketIds = unique(
    [...activeStatus.matchAll(/^\s*- \*\*Lane [^:]+:\*\* `([A-Z][A-Z0-9-]+)`/gm)].map(
      (match) => match[1]
    )
  );
  if (activeTicketIds.length === 0) {
    throw new ProjectionGenerationError(
      "HEDGR_STATUS.md does not explicitly record any active Lane ticket in §7."
    );
  }

  const prefix = "- **Sequencing posture:** ";
  const sequencingLines = liveSection.split("\n").filter((line) => line.trimStart().startsWith(prefix.trimEnd()));
  const [line] = sequencingLines;
  const sequencingPosture = line?.slice(prefix.length);
  if (sequencingLines.length !== 1 || !line.startsWith(prefix) || !sequencingPosture ||
      sequencingPosture !== sequencingPosture.trim() || /[\r\u2028\u2029]/u.test(sequencingPosture) ||
      !activeStatus.split("\n").includes(line)) {
    throw new ProjectionGenerationError(
      "HEDGR_STATUS.md must contain exactly one valid §7 sequencing-posture field."
    );
  }

  const boundaryMatch = statusSource.match(/^\*\*Sequencing authority:\*\* (.+)$/m);
  if (!boundaryMatch) {
    throw new ProjectionGenerationError(
      "HEDGR_STATUS.md does not contain the explicit §2 sequencing-authority field."
    );
  }

  return {
    activeTicketIds,
    sequencingPosture,
    authorityBoundaries: boundaryMatch[1]
  };
}

function extractAgentsActiveTicketIds(agentsSource) {
  const postureLines = agentsSource.match(/^Current parallelism posture:.*$/gm) ?? [];
  if (postureLines.length === 0) {
    throw new ProjectionGenerationError(
      "AGENTS.md does not contain an explicit current parallelism posture."
    );
  }

  const ticketSets = postureLines.map((line) => {
    const parallel = line.match(
      /Active governed-parallel pass:.*? names (.+?) under (?:\*\*|`)§7(?:\*\*|`) \/ (?:\*\*|`)§7a(?:\*\*|`)/
    );
    const singular = line.match(
      /Singular-ticket posture is active with .*?`([A-Z][A-Z0-9-]+)`.*?sole active ticket/
    );
    if (parallel) {
      return unique(
        [...parallel[1].matchAll(/`([A-Z][A-Z0-9-]+)`/g)].map(
          (match) => match[1]
        )
      );
    }
    if (singular) return [singular[1]];
    throw new ProjectionGenerationError(
      "AGENTS.md current parallelism posture does not explicitly name its active ticket set."
    );
  });

  if (ticketSets.some((ticketSet) => !sameValues(ticketSet, ticketSets[0]))) {
    throw new ProjectionGenerationError(
      "Repeated AGENTS.md current parallelism posture records are inconsistent."
    );
  }
  return ticketSets[0];
}

function assertStructuralSource(sourcePath, source) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new ProjectionGenerationError(`${sourcePath} is empty or unreadable.`);
  }
  if (
    sourcePath === "docs/decisions/SPRINT-2-ADR-INDEX.md" &&
    !source.includes("# Sprint 2 ADR Index")
  ) {
    throw new ProjectionGenerationError(
      "Accepted ADR index is missing its canonical heading."
    );
  }
  if (
    sourcePath === "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md" &&
    (!source.includes("# Hedgr Active Doctrine Index") ||
      !source.includes("## Active doctrine set") ||
      !source.includes("## Change control"))
  ) {
    throw new ProjectionGenerationError(
      "Active doctrine index is missing its canonical completeness markers."
    );
  }
}

function provenance(value, sourceSection, sourceCommit, freshness) {
  return {
    value,
    source_path: "docs/ops/HEDGR_STATUS.md",
    source_section: sourceSection,
    source_commit: sourceCommit,
    source_classification: "REPO_AUTHORITY",
    freshness
  };
}

// Diagnostics are separate from the RAP and never feed authority extraction or validation.
function hygieneWarning(code, sourceCommit, detail) {
  return {
    code,
    source_commit: sourceCommit,
    ...detail,
    canonical_authority: CANONICAL_AUTHORITY,
    effect_on_authority: "none",
    required_action: "Surface to steward; consult permanent main; do not auto-repair."
  };
}

function narrativeWarnings(statusSource, statusProjection, sourceCommit) {
  const narrative = statusProjection.authorityBoundaries;
  // Only this explicitly subordinate field and explicit completed-Lane records qualify.
  // Other disagreements must not be guessed into the non-blocking category.
  if (!narrative.startsWith("Only **§7** / **§7a** name approved active ticket(s).")) {
    return [];
  }
  const activeStatus = extractLiveActiveStatus(extractLiveSection(statusSource));
  const completed = new Set(
    [...activeStatus.matchAll(/^- \*\*Completed(?: historical)? Lane [^*]+:\*\* ([^\n]+)/gm)]
      .flatMap((record) => [...record[1].matchAll(/`([A-Z][A-Z0-9-]+)`/g)])
      .map((match) => match[1])
  );
  const namedActive = unique(
    [...narrative.matchAll(/\bis active and names (.+?)\.(?=\s|$)/g)]
      .flatMap((statement) => [...statement[1].matchAll(/`([A-Z][A-Z0-9-]+)`/g)])
      .map((match) => match[1])
  );
  return namedActive
    .filter((ticket) => completed.has(ticket) && !statusProjection.activeTicketIds.includes(ticket))
    .map((ticket) => hygieneWarning("SUPERSEDED_LANE_NARRATIVE", sourceCommit, {
      source_path: "docs/ops/HEDGR_STATUS.md",
      source_section: "§2 Sequencing authority",
      projected_field: "payload.fields.authority_boundaries",
      ticket_reference: ticket,
      reason: `This subordinate narrative names ${ticket} as active; §7 explicitly records it in a completed Lane entry and omits it from active Lane records. §2 itself delegates active-ticket naming to §7 / §7a.`,
      limitation: "CURRENT checks source/projection freshness, not every narrative statement; conflicts: [] is not a universal lag check."
    }));
}

function buildProjection({ sourceCommit, generatedAt, sourceDocuments }) {
  assertFullGitSha(sourceCommit);
  const generatedAtDate = new Date(generatedAt);
  if (Number.isNaN(generatedAtDate.getTime())) {
    throw new ProjectionGenerationError("generated_at must be a valid timestamp.");
  }
  generatedAtDate.setUTCHours(0, 0, 0, 0);
  const deterministicGeneratedAt = generatedAtDate.toISOString();

  const digests = new Map();
  const documents = {};
  for (const sourcePath of SOURCE_PATHS) {
    const document = sourceDocuments[sourcePath];
    if (typeof document !== "string" && !Buffer.isBuffer(document)) {
      throw new ProjectionGenerationError(`${sourcePath} is empty or unreadable.`);
    }
    const bytes = Buffer.isBuffer(document) ? document : Buffer.from(document);
    digests.set(sourcePath, createHash("sha256").update(bytes).digest("hex"));
    documents[sourcePath] = decodeUtf8(bytes, sourcePath);
    assertStructuralSource(sourcePath, documents[sourcePath]);
  }

  const statusProjection = extractStatusProjection(
    documents["docs/ops/HEDGR_STATUS.md"]
  );
  const agentsActiveTicketIds = extractAgentsActiveTicketIds(
    documents["AGENTS.md"]
  );
  const hasConflict = !sameValues(
    statusProjection.activeTicketIds,
    agentsActiveTicketIds
  );
  const freshness = hasConflict ? "UNKNOWN" : "CURRENT";
  const coverage = hasConflict ? "INSUFFICIENT" : "COMPLETE";

  const sources = SOURCE_DEFINITIONS.map((definition) => ({
    ...definition,
    content_sha256: digests.get(definition.source_path),
    requirement: "MANDATORY",
    source_classification: "REPO_AUTHORITY",
    expected_revision: sourceCommit,
    actual_revision: sourceCommit,
    freshness_requirement: "CURRENT_REQUIRED",
    freshness,
    structural_validation: "VALID",
    stable_locator_support: "SUPPORTED",
    inclusion_status: "INCLUDED",
    reason: "Bound to the named immutable source revision and its raw bytes.",
    conflict_status:
      hasConflict &&
      ["CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY", "REPO_EXECUTION_CONTRACT"].includes(
        definition.source_role
      )
        ? "DETECTED"
        : "NONE"
  }));

  const conflicts = hasConflict
    ? [
        classifyConflict({
          stronger: {
            source_path: "docs/ops/HEDGR_STATUS.md",
            source_role: "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY",
            source_section: "§7 Current active ticket status",
            source_commit: sourceCommit,
            source_classification: "REPO_AUTHORITY"
          },
          lower: {
            source_path: "AGENTS.md",
            source_role: "REPO_EXECUTION_CONTRACT",
            source_section: "Ticket sequencing / governed parallelism",
            source_commit: sourceCommit,
            source_classification: "REPO_AUTHORITY"
          },
          concept: "repo.active_ticket_ids",
          description: NON_RESOLUTION_DESCRIPTION,
          detectedAt: deterministicGeneratedAt
        })
      ]
    : [];

  const projection = {
    mode: "READ_ONLY",
    execution_authority: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    sequencing_allowed: false,
    authority_class: "REPO_AUTHORITY_PROJECTION",
    source_commit: sourceCommit,
    generated_at: deterministicGeneratedAt,
    freshness,
    coverage,
    sources,
    conflicts,
    payload: {
      concept: "repo_authority_projection",
      fields: {
        active_ticket_ids: provenance(
          statusProjection.activeTicketIds,
          "§7 Current active ticket status",
          sourceCommit,
          freshness
        ),
        sequencing_posture: provenance(
          statusProjection.sequencingPosture,
          "§7 Current active ticket status",
          sourceCommit,
          freshness
        ),
        authority_boundaries: provenance(
          statusProjection.authorityBoundaries,
          "§2 Sequencing authority",
          sourceCommit,
          freshness
        )
      }
    }
  };

  const validation = validateResponseEnvelope(projection);
  return {
    projection,
    validation,
    hygieneWarnings: validation.ok
      ? narrativeWarnings(documents["docs/ops/HEDGR_STATUS.md"], statusProjection, sourceCommit)
      : []
  };
}

function serializeProjection(projection) {
  return `${JSON.stringify(projection, null, 2)}\n`;
}

function decodeUtf8(bytes, label) {
  if (bytes.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]))) {
    throw new ProjectionGenerationError(`${label} contains a UTF-8 BOM.`);
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new ProjectionGenerationError(`${label} contains invalid UTF-8.`);
  }
}

async function git(repoRoot, args) {
  // Git environment overrides must not replace the repository, object database, index or config.
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_")));
  const { stdout } = await execFile("git", [
    "--no-replace-objects", "--literal-pathspecs", "-c", "advice.graftFileDeprecated=false", ...args
  ], {
    cwd: repoRoot,
    env: {
      ...env,
      GIT_NO_LAZY_FETCH: "1",
      GIT_GRAFT_FILE: "/dev/null",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1"
    },
    encoding: "buffer",
    maxBuffer: 16 * 1024 * 1024
  });
  return stdout;
}

async function exactCommit(repoRoot, oid) {
  assertFullGitSha(oid);
  try {
    if ((await git(repoRoot, ["cat-file", "-t", oid])).toString().trim() === "commit") {
      return (await git(repoRoot, ["cat-file", "commit", oid])).toString();
    }
  } catch {
    // Treat an unavailable object the same as an object of the wrong type.
  }
  throw new ProjectionGenerationError(`Exact commit object ${oid} is missing, unreadable or not a commit.`);
}

function entriesByPath(raw, pattern, expectedPaths, label) {
  const entries = new Map();
  for (const row of raw.toString().split("\0").filter(Boolean)) {
    const match = row.match(pattern);
    if (!match || !expectedPaths.includes(match[3]) || entries.has(match[3])) {
      throw new ProjectionGenerationError(`${label} contains a non-regular, substituted or ambiguous input entry.`);
    }
    const [, mode, oid, file] = match;
    entries.set(file, { mode, oid });
  }
  for (const file of expectedPaths) {
    if (!entries.has(file)) {
      throw new ProjectionGenerationError(`${file} is missing from ${label}.`);
    }
  }
  return entries;
}

async function readVector(repoRoot, revision, paths = INPUT_PATHS) {
  await exactCommit(repoRoot, revision);
  const entries = entriesByPath(
    await git(repoRoot, ["ls-tree", "-z", revision, "--", ...paths]),
    /^(100644|100755) blob ([0-9a-f]{40})\t(.+)$/u, paths, revision
  );
  const vector = await Promise.all(paths.map(async (file) => {
    const entry = entries.get(file);
    if ((await git(repoRoot, ["cat-file", "-t", entry.oid])).toString().trim() !== "blob") {
      throw new ProjectionGenerationError(`${file} does not reference a blob at ${revision}.`);
    }
    return [file, { ...entry, bytes: await git(repoRoot, ["cat-file", "blob", entry.oid]) }];
  }));
  return new Map(vector);
}

function compareVectors(left, right) {
  return [...left].filter(([file, entry]) => {
    const other = right.get(file);
    return !other || entry.mode !== other.mode || !entry.bytes.equals(other.bytes);
  }).map(([file]) => file);
}

async function workingPath(repoRoot, file) {
  let directory = repoRoot;
  for (const part of file.split("/").slice(0, -1)) {
    directory = path.join(directory, part);
    if (!(await lstat(directory)).isDirectory()) {
      throw new ProjectionGenerationError(`${file} traverses a non-directory or symlink.`);
    }
  }
  return path.join(repoRoot, file);
}

async function assertWorkingFile(repoRoot, file, entry) {
  const location = await workingPath(repoRoot, file);
  const stat = await lstat(location);
  if (!stat.isFile()) {
    throw new ProjectionGenerationError(`${file} is not a regular working file.`);
  }
  const fileHandle = await open(location, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const opened = await fileHandle.stat();
    const mode = opened.mode & 0o100 ? "100755" : "100644";
    if (!opened.isFile() || opened.dev !== stat.dev || opened.ino !== stat.ino ||
        mode !== entry.mode || !(await fileHandle.readFile()).equals(entry.bytes)) {
      throw new ProjectionGenerationError(`${file} working bytes or mode differ from the committed checkout.`);
    }
  } finally {
    await fileHandle.close();
  }
}

async function readCheckout(repoRoot, paths = INPUT_PATHS) {
  const [root, prefix] = await Promise.all([
    realpath(repoRoot),
    git(repoRoot, ["rev-parse", "--show-prefix"])
  ]);
  if (prefix.toString().trim() !== "" || root !== await realpath(
    (await git(repoRoot, ["rev-parse", "--show-toplevel"])).toString().trim()
  )) {
    throw new ProjectionGenerationError("RAP must be evaluated from the exact repository root.");
  }
  const revision = (await git(root, ["rev-parse", "--verify", "HEAD"])).toString().trim();
  const vector = await readVector(root, revision, paths);
  const index = entriesByPath(
    await git(root, ["ls-files", "--stage", "-z", "--", ...paths]),
    /^(100644|100755) ([0-9a-f]{40}) 0\t(.+)$/u, paths, "the index"
  );
  await Promise.all([...vector].map(async ([file, entry]) => {
    const staged = index.get(file);
    if (staged.oid !== entry.oid || staged.mode !== entry.mode) {
      throw new ProjectionGenerationError(`${file} has staged changes.`);
    }
    await assertWorkingFile(root, file, entry);
  }));
  return { revision, vector };
}

function sourceDocuments(vector) {
  return Object.fromEntries(SOURCE_PATHS.map((file) => [file, vector.get(file).bytes]));
}

function sourceTimestamp(commit) {
  const headers = commit.split("\n\n", 1)[0];
  const match = headers.match(/^committer .+ (\d+) [+-]\d{4}$/mu);
  if (!match) {
    throw new ProjectionGenerationError("Immutable source commit has no valid committer time.");
  }
  return new Date(Number(match[1]) * 1000);
}

async function mainHistoryWarnings(repoRoot, sourceCommit, source) {
  let observedMainCommit;
  let mismatches;
  try {
    observedMainCommit = (await git(repoRoot, ["rev-parse", "--verify", MAIN_REFERENCE])).toString().trim();
    const observed = await readVector(repoRoot, observedMainCommit, SOURCE_PATHS);
    mismatches = compareVectors(source, observed);
    await git(repoRoot, ["merge-base", "--is-ancestor", sourceCommit, observedMainCommit]);
    if (mismatches.length === 0) return [];
  } catch {
    // Only local objects are consulted, and a missing ref or incomplete history is advisory.
  }
  return [hygieneWarning("MAIN_HISTORY_UNVERIFIED", sourceCommit, {
    source_path: "git metadata",
    source_section: MAIN_REFERENCE,
    observed_main_commit: observedMainCommit ?? null,
    observed_content: mismatches ? (mismatches.length ? "MISMATCH" : "MATCH") : "UNKNOWN",
    differing_paths: mismatches ?? [],
    reason: "The bound revision or source bytes differ from, or cannot be verified against, locally observed origin/main. Draft decision references do not establish accepted history.",
    limitation: "Local history is not a live remote check, acceptance of each statement, or ticket activation."
  })];
}

function requireValid(result) {
  if (!result.validation.ok) {
    const codes = unique(result.validation.errors.map((error) => error.code));
    throw new ProjectionGenerationError(`Projection failed closed validation: ${codes.join(", ")}`);
  }
}

async function verifySource({ repoRoot, checkout, sourceCommit, ancestorsOf = [] }) {
  const sourceObject = await exactCommit(repoRoot, sourceCommit);
  for (const revision of ancestorsOf) {
    assertFullGitSha(revision);
    try {
      await git(repoRoot, ["merge-base", "--is-ancestor", sourceCommit, revision]);
    } catch {
      throw new ProjectionGenerationError(`Source ${sourceCommit} is not verified as an ancestor of ${revision}.`);
    }
  }
  const vector = await readVector(repoRoot, sourceCommit, SOURCE_PATHS);
  const differences = compareVectors(vector, checkout.vector);
  if (differences.length) {
    throw new ProjectionGenerationError(`Source ${sourceCommit} disagrees with checkout bytes or modes: ${differences.join(", ")}.`);
  }
  return { vector, date: sourceTimestamp(sourceObject) };
}

async function generateFromGit({ repoRoot, requestedCommit }) {
  const checkout = await readCheckout(repoRoot, SOURCE_PATHS);
  const sourceCommit = requestedCommit ?? checkout.revision;
  const { vector, date } = await verifySource({ repoRoot, checkout, sourceCommit, ancestorsOf: [checkout.revision] });
  const result = buildProjection({ sourceCommit, generatedAt: date, sourceDocuments: sourceDocuments(vector) });
  if (result.validation.ok) {
    result.hygieneWarnings.push(...await mainHistoryWarnings(repoRoot, sourceCommit, vector));
  }
  return result;
}

async function verifyArtifact({ repoRoot, checkout, strict, requestedCommit, ancestorsOf, mainAdvisory = false }) {
  checkout ??= await readCheckout(repoRoot);
  const artifactBytes = checkout.vector.get(OUTPUT_PATH).bytes;
  const artifact = JSON.parse(decodeUtf8(artifactBytes, OUTPUT_PATH));
  const sourceCommit = artifact?.source_commit;
  assertFullGitSha(sourceCommit);
  if (requestedCommit !== undefined && requestedCommit !== sourceCommit) {
    throw new ProjectionGenerationError("The supplied source commit differs from the artifact's source_commit.");
  }
  if (typeof artifact.generated_at !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/u.test(artifact.generated_at)) {
    throw new ProjectionGenerationError("Artifact generated_at must be canonical UTC midnight.");
  }
  // Hosted proof supplies H and C. Standalone proof also supports a retrieved S
  // outside squash history, whose lineage is checked by the effectivity operator.
  const source = strict ? await verifySource({ repoRoot, checkout, sourceCommit, ancestorsOf }) : undefined;
  const result = buildProjection({
    sourceCommit,
    generatedAt: source?.date ?? artifact.generated_at,
    sourceDocuments: sourceDocuments(source?.vector ?? checkout.vector)
  });
  requireValid(result);
  if (!artifactBytes.equals(Buffer.from(serializeProjection(result.projection)))) {
    throw new ProjectionGenerationError(`${OUTPUT_PATH} does not match deterministic generation for its bound revision.`);
  }
  if (strict && mainAdvisory) {
    result.hygieneWarnings.push(...await mainHistoryWarnings(repoRoot, sourceCommit, source.vector));
  }
  return result;
}

function parseArgs(args) {
  const options = { mode: "stdout", requestedCommit: undefined };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--write" || argument === "--check") {
      if (options.mode !== "stdout") {
        throw new ProjectionGenerationError("Choose exactly one of --write or --check.");
      }
      options.mode = argument.slice(2);
      continue;
    }
    if (argument === "--source-commit") {
      options.requestedCommit = args[index + 1];
      index += 1;
      if (!options.requestedCommit) {
        throw new ProjectionGenerationError("--source-commit requires a full git SHA.");
      }
      continue;
    }
    throw new ProjectionGenerationError(`Unsupported argument: ${argument}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const scriptPath = fileURLToPath(import.meta.url);
  const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
  const result = options.mode === "check"
    ? await verifyArtifact({ repoRoot, strict: true, requestedCommit: options.requestedCommit, mainAdvisory: true })
    : await generateFromGit({ repoRoot, requestedCommit: options.requestedCommit });
  requireValid(result);
  const serialized = serializeProjection(result.projection);
  const reportWarnings = () => {
    for (const warning of result.hygieneWarnings) {
      process.stderr.write(`Authority legibility WARN: ${JSON.stringify(warning)}\n`);
    }
  };

  if (options.mode === "write") {
    const handle = await open(
      await workingPath(repoRoot, OUTPUT_PATH),
      constants.O_WRONLY | constants.O_CREAT | constants.O_NOFOLLOW | constants.O_NONBLOCK
    );
    try {
      if (!(await handle.stat()).isFile()) {
        throw new ProjectionGenerationError(`${OUTPUT_PATH} is not a regular file.`);
      }
      await handle.truncate();
      await handle.writeFile(serialized, "utf8");
    } finally {
      await handle.close();
    }
    reportWarnings();
    process.stdout.write(`Wrote ${OUTPUT_PATH} bound to ${result.projection.source_commit}.\n`);
    return;
  }
  if (options.mode === "check") {
    reportWarnings();
    process.stdout.write(
      `${OUTPUT_PATH} matches deterministic generation for ${result.projection.source_commit}.\n`
    );
    return;
  }
  reportWarnings();
  process.stdout.write(serialized);
}

const isEntrypoint =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntrypoint) {
  main().catch((error) => {
    process.stderr.write(`UNKNOWN / INSUFFICIENT — ${error.name}: ${error.message}\n`);
    process.exitCode = 1;
  });
}

export {
  OUTPUT_PATH,
  ProjectionGenerationError,
  SOURCE_DEFINITIONS,
  assertFullGitSha,
  buildProjection,
  extractAgentsActiveTicketIds,
  extractStatusProjection,
  generateFromGit,
  serializeProjection,
  git,
  exactCommit,
  compareVectors,
  readCheckout,
  readVector,
  verifyArtifact
};
