import { execFile as execFileCallback } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import {
  classifyConflict,
  validateResponseEnvelope
} from "../contracts/phase0/validate.mjs";

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
const NON_RESOLUTION_DESCRIPTION =
  "HEDGR_STATUS.md and AGENTS.md record different active-ticket sets.";

class ProjectionGenerationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProjectionGenerationError";
  }
}

function assertFullGitSha(sourceCommit) {
  if (!FULL_GIT_SHA.test(sourceCommit)) {
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

function extractStatusProjection(statusSource) {
  const activeStatus = extractSection(
    statusSource,
    "Current active ticket status:",
    "\n---",
    "HEDGR_STATUS.md current-active-ticket"
  );
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

  const sequencingMatch = activeStatus.match(
    /^\s*- \*\*Sequencing posture:\*\* (.+)$/m
  );
  if (!sequencingMatch) {
    throw new ProjectionGenerationError(
      "HEDGR_STATUS.md does not contain the explicit §7 sequencing-posture field."
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
    sequencingPosture: sequencingMatch[1],
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

function buildProjection({ sourceCommit, generatedAt, sourceDocuments }) {
  assertFullGitSha(sourceCommit);
  const generatedAtDate = new Date(generatedAt);
  if (Number.isNaN(generatedAtDate.getTime())) {
    throw new ProjectionGenerationError("generated_at must be a valid timestamp.");
  }
  generatedAtDate.setUTCHours(0, 0, 0, 0);
  const deterministicGeneratedAt = generatedAtDate.toISOString();

  for (const definition of SOURCE_DEFINITIONS) {
    assertStructuralSource(
      definition.source_path,
      sourceDocuments[definition.source_path]
    );
  }

  const statusProjection = extractStatusProjection(
    sourceDocuments["docs/ops/HEDGR_STATUS.md"]
  );
  const agentsActiveTicketIds = extractAgentsActiveTicketIds(
    sourceDocuments["AGENTS.md"]
  );
  const hasConflict = !sameValues(
    statusProjection.activeTicketIds,
    agentsActiveTicketIds
  );
  const freshness = hasConflict ? "UNKNOWN" : "CURRENT";
  const coverage = hasConflict ? "INSUFFICIENT" : "COMPLETE";

  const sources = SOURCE_DEFINITIONS.map((definition) => ({
    ...definition,
    requirement: "MANDATORY",
    source_classification: "REPO_AUTHORITY",
    expected_revision: sourceCommit,
    actual_revision: sourceCommit,
    freshness_requirement: "CURRENT_REQUIRED",
    freshness,
    structural_validation: "VALID",
    stable_locator_support: "SUPPORTED",
    inclusion_status: "INCLUDED",
    reason: "Loaded from the explicit Phase 1 allow-list at the bound git commit.",
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

  return {
    projection,
    validation: validateResponseEnvelope(projection)
  };
}

function serializeProjection(projection) {
  return `${JSON.stringify(projection, null, 2)}\n`;
}

async function git(repoRoot, args) {
  const { stdout } = await execFile("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024
  });
  return stdout;
}

async function resolveSourceCommit(repoRoot, requestedCommit) {
  const sourceCommit = requestedCommit ?? (await git(repoRoot, ["rev-parse", "HEAD"])).trim();
  assertFullGitSha(sourceCommit);
  await git(repoRoot, ["cat-file", "-e", `${sourceCommit}^{commit}`]);
  return sourceCommit;
}

async function loadSourceDocuments(repoRoot, sourceCommit) {
  const entries = await Promise.all(
    SOURCE_DEFINITIONS.map(async ({ source_path: sourcePath }) => {
      const content = await git(repoRoot, ["show", `${sourceCommit}:${sourcePath}`]);
      return [sourcePath, content];
    })
  );
  return Object.fromEntries(entries);
}

async function assertWorkingTreeMatchesSources(repoRoot, sourceDocuments) {
  for (const { source_path: sourcePath } of SOURCE_DEFINITIONS) {
    const workingTreeContent = await readFile(path.join(repoRoot, sourcePath), "utf8");
    if (workingTreeContent !== sourceDocuments[sourcePath]) {
      throw new ProjectionGenerationError(
        `${sourcePath} differs from the requested bound revision; commit mandatory sources before generating the RAP.`
      );
    }
  }
}

async function generateFromGit({ repoRoot, requestedCommit }) {
  const sourceCommit = await resolveSourceCommit(repoRoot, requestedCommit);
  const sourceDocuments = await loadSourceDocuments(repoRoot, sourceCommit);
  await assertWorkingTreeMatchesSources(repoRoot, sourceDocuments);
  const commitTimestamp = (
    await git(repoRoot, ["show", "-s", "--format=%cI", sourceCommit])
  ).trim();
  return buildProjection({ sourceCommit, generatedAt: commitTimestamp, sourceDocuments });
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
  const repoRoot = path.resolve(path.dirname(scriptPath), "../../..");
  const outputPath = path.join(repoRoot, OUTPUT_PATH);

  if (options.mode === "check" && !options.requestedCommit) {
    const currentArtifact = JSON.parse(await readFile(outputPath, "utf8"));
    options.requestedCommit = currentArtifact.source_commit;
  }

  const result = await generateFromGit({
    repoRoot,
    requestedCommit: options.requestedCommit
  });
  if (!result.validation.ok) {
    const codes = unique(result.validation.errors.map((error) => error.code));
    throw new ProjectionGenerationError(
      `Projection failed closed validation: ${codes.join(", ")}`
    );
  }
  const serialized = serializeProjection(result.projection);

  if (options.mode === "write") {
    await writeFile(outputPath, serialized, "utf8");
    process.stdout.write(`Wrote ${OUTPUT_PATH} bound to ${result.projection.source_commit}.\n`);
    return;
  }
  if (options.mode === "check") {
    const current = await readFile(outputPath, "utf8");
    if (current !== serialized) {
      throw new ProjectionGenerationError(
        `${OUTPUT_PATH} does not match deterministic generation for its bound revision.`
      );
    }
    process.stdout.write(
      `${OUTPUT_PATH} matches deterministic generation for ${result.projection.source_commit}.\n`
    );
    return;
  }
  process.stdout.write(serialized);
}

const isEntrypoint =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntrypoint) {
  main().catch((error) => {
    process.stderr.write(`${error.name}: ${error.message}\n`);
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
  serializeProjection
};
