import {
  classifyConflict
} from "../../contracts/phase0/validate.mjs";

const SOURCE_COMMIT = "9a2140f3373562d883b89a739ba446637dcd7729";
const GENERATED_AT = "2026-07-16T00:00:00.000Z";

function source({
  path,
  role,
  requirement = "MANDATORY",
  classification = "REPO_AUTHORITY"
}) {
  return {
    source_path: path,
    source_role: role,
    requirement,
    source_classification: classification,
    expected_revision: SOURCE_COMMIT,
    actual_revision: SOURCE_COMMIT,
    freshness_requirement: "CURRENT_REQUIRED",
    freshness: "CURRENT",
    structural_validation: "VALID",
    stable_locator_support: "SUPPORTED",
    inclusion_status: "INCLUDED",
    reason: "Included by the deterministic Phase 0 fixture.",
    conflict_status: "NONE"
  };
}

const authoritySources = Object.freeze([
  source({
    path: "docs/ops/HEDGR_STATUS.md",
    role: "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY"
  }),
  source({ path: "AGENTS.md", role: "REPO_EXECUTION_CONTRACT" }),
  source({
    path: "docs/decisions/SPRINT-2-ADR-INDEX.md",
    role: "ACCEPTED_ADR_INDEX"
  }),
  source({
    path: "docs/doctrine/hedgr-constitutional-charter.md",
    role: "ACTIVE_DOCTRINE_SET_CONSTITUTIONAL_CHARTER"
  }),
  source({
    path: "docs/doctrine/hedgr-governance-philosophy.md",
    role: "ACTIVE_DOCTRINE_SET_GOVERNANCE_PHILOSOPHY"
  })
]);

function provenance(value, path = "docs/ops/HEDGR_STATUS.md", section = "§7") {
  return {
    value,
    source_path: path,
    source_section: section,
    source_commit: SOURCE_COMMIT,
    source_classification: "REPO_AUTHORITY",
    freshness: "CURRENT"
  };
}

function baseEnvelope(authorityClass, payload, sources = authoritySources) {
  return {
    mode: "READ_ONLY",
    execution_authority: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    sequencing_allowed: false,
    authority_class: authorityClass,
    source_commit: SOURCE_COMMIT,
    generated_at: GENERATED_AT,
    freshness: "CURRENT",
    coverage: "COMPLETE",
    sources: structuredClone(sources),
    conflicts: [],
    payload
  };
}

function repoAuthorityProjection() {
  return baseEnvelope("REPO_AUTHORITY_PROJECTION", {
    concept: "repo_authority_projection",
    fields: {
      active_ticket_ids: provenance(["CLASS-A-VAL-001", "BRIDGE-P0-001"]),
      sequencing_posture: provenance("CONTROLLED_PARALLELISM_V6", "docs/ops/HEDGR_STATUS.md", "§6f.6"),
      authority_boundaries: provenance(
        ["READ_ONLY", "NO_MUTATION", "NO_PHASE_1"],
        "docs/ops/HEDGR_STATUS.md",
        "§7a Lane R"
      )
    }
  });
}

function evidenceEnvelope(authorityClass) {
  const review = authorityClass === "REVIEW_EVIDENCE";
  return baseEnvelope(
    authorityClass,
    {
      concept: review ? "review_evidence" : "supporting_evidence",
      records: [
        {
          concept: review ? "review.record" : "supporting.record",
          data: {
            ...provenance(
              review ? "recorded review evidence" : "recorded supporting evidence",
              review
                ? "docs/ops/reviews/weekly/2026-07-10-weekly-review.md"
                : "docs/ops/bridge/README.md",
              review ? "Review window" : "Current snapshots"
            ),
            source_classification: review
              ? "REVIEW_EVIDENCE"
              : "SUPPORTING_EVIDENCE"
          }
        }
      ]
    },
    [
      source({
        path: review
          ? "docs/ops/reviews/weekly/2026-07-10-weekly-review.md"
          : "docs/ops/bridge/README.md",
        role: review ? "WEEKLY_REVIEW" : "SUPPORTING_BRIDGE_DOCUMENTATION",
        requirement: "OPTIONAL",
        classification: review ? "REVIEW_EVIDENCE" : "SUPPORTING_EVIDENCE"
      })
    ]
  );
}

function partialSupportingEvidence() {
  const fixture = evidenceEnvelope("SUPPORTING_EVIDENCE");
  fixture.sources.push({
    ...source({
      path: "docs/ops/bridge/optional-supporting-note.md",
      role: "SUPPORTING_OPTIONAL_NOTE",
      requirement: "OPTIONAL",
      classification: "SUPPORTING_EVIDENCE"
    }),
    expected_revision: null,
    actual_revision: null,
    freshness: "UNKNOWN",
    structural_validation: "NOT_EVALUATED",
    stable_locator_support: "NOT_EVALUATED",
    inclusion_status: "OMITTED",
    reason: "Optional source is absent and the omission is explicit.",
    conflict_status: "NOT_EVALUATED"
  });
  fixture.coverage = "PARTIAL";
  return fixture;
}

function mutate(base, change) {
  const fixture = structuredClone(base);
  change(fixture);
  return fixture;
}

const validFixtures = Object.freeze([
  {
    name: "complete current revision-consistent Repo Authority Projection",
    value: repoAuthorityProjection()
  },
  {
    name: "partial supporting-evidence response with recorded optional omission",
    value: partialSupportingEvidence()
  },
  {
    name: "valid review-evidence response",
    value: evidenceEnvelope("REVIEW_EVIDENCE")
  },
  {
    name: "valid supporting-evidence response",
    value: evidenceEnvelope("SUPPORTING_EVIDENCE")
  }
]);

const baseRap = repoAuthorityProjection();
const conflict = classifyConflict({
  stronger: {
    source_path: "docs/ops/HEDGR_STATUS.md",
    source_role: "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY",
    source_section: "§7",
    source_commit: SOURCE_COMMIT,
    source_classification: "REPO_AUTHORITY"
  },
  lower: {
    source_path: "docs/ops/NOTION_GOVERNANCE_STAGING.md",
    source_role: "SUPPORTING_ARTIFACT",
    source_section: "Executive / Strategy surfaces",
    source_commit: SOURCE_COMMIT,
    source_classification: "SUPPORTING_EVIDENCE"
  },
  concept: "repo.active_ticket_ids",
  description: "Sources record different active-ticket sets.",
  detectedAt: GENERATED_AT
});

const invalidFixtures = Object.freeze([
  {
    name: "missing HEDGR_STATUS.md",
    expectedCode: "MISSING_MANDATORY_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources = value.sources.filter(
        (item) => item.source_role !== "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY"
      );
    })
  },
  {
    name: "missing AGENTS.md",
    expectedCode: "MISSING_MANDATORY_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources = value.sources.filter(
        (item) => item.source_role !== "REPO_EXECUTION_CONTRACT"
      );
    })
  },
  {
    name: "missing relevant ADR declaration",
    expectedCode: "MISSING_MANDATORY_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources = value.sources.filter(
        (item) => item.source_role !== "ACCEPTED_ADR_INDEX"
      );
    })
  },
  {
    name: "missing doctrine declaration",
    expectedCode: "MISSING_MANDATORY_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources = value.sources.filter(
        (item) => !item.source_role.startsWith("ACTIVE_DOCTRINE_SET_")
      );
    })
  },
  {
    name: "mixed source commits",
    expectedCode: "REVISION_MISMATCH",
    value: mutate(baseRap, (value) => {
      value.sources[0].actual_revision = "different-revision";
    })
  },
  {
    name: "unreadable mandatory source",
    expectedCode: "UNREADABLE_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources[0].structural_validation = "UNREADABLE";
    })
  },
  {
    name: "structurally invalid mandatory source",
    expectedCode: "STRUCTURALLY_INVALID_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources[0].structural_validation = "INVALID";
    })
  },
  {
    name: "unknown freshness",
    expectedCode: "UNKNOWN_FRESHNESS",
    value: mutate(baseRap, (value) => {
      value.freshness = "UNKNOWN";
      value.sources[0].freshness = "UNKNOWN";
    })
  },
  {
    name: "stale mandatory source",
    expectedCode: "STALE_MANDATORY_SOURCE",
    value: mutate(baseRap, (value) => {
      value.freshness = "STALE";
      value.sources[0].freshness = "STALE";
    })
  },
  {
    name: "unreadable mandatory source",
    expectedCode: "UNREADABLE_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources[0].structural_validation = "UNREADABLE";
    })
  },
  {
    name: "structurally invalid mandatory source",
    expectedCode: "STRUCTURALLY_INVALID_SOURCE",
    value: mutate(baseRap, (value) => {
      value.sources[0].structural_validation = "INVALID";
    })
  },
  {
    name: "insufficient coverage",
    expectedCode: "INSUFFICIENT_COVERAGE",
    value: mutate(baseRap, (value) => {
      value.coverage = "INSUFFICIENT";
    })
  },
  {
    name: "unresolved conflict",
    expectedCode: "UNRESOLVED_AUTHORITY_CONFLICT",
    value: mutate(baseRap, (value) => {
      value.conflicts = [conflict];
    })
  },
  {
    name: "missing field-level provenance",
    expectedCode: "MISSING_MATERIAL_PROVENANCE",
    value: mutate(baseRap, (value) => {
      delete value.payload.fields.sequencing_posture;
    })
  },
  {
    name: "invalid source classification",
    expectedCode: "INVALID_SOURCE_CLASSIFICATION",
    value: mutate(baseRap, (value) => {
      value.sources[0].source_classification = "CONVERSATION_MEMORY";
    })
  },
  {
    name: "unexpected execution authority Boolean",
    expectedCode: "ATTEMPTED_ACTIVATION_FIELD",
    value: mutate(baseRap, (value) => {
      value.execution_authority = true;
    })
  },
  {
    name: "sequencing_allowed true",
    expectedCode: "ATTEMPTED_SEQUENCING_FIELD",
    value: mutate(baseRap, (value) => {
      value.sequencing_allowed = true;
    })
  },
  {
    name: "mutation_allowed true",
    expectedCode: "ATTEMPTED_MUTATION_FIELD",
    value: mutate(baseRap, (value) => {
      value.mutation_allowed = true;
    })
  },
  {
    name: "ticket_activation_allowed true",
    expectedCode: "ATTEMPTED_ACTIVATION_FIELD",
    value: mutate(baseRap, (value) => {
      value.ticket_activation_allowed = true;
    })
  },
  {
    name: "mutation-related field",
    expectedCode: "ATTEMPTED_MUTATION_FIELD",
    value: mutate(baseRap, (value) => {
      value.payload.mutation_request = "write status";
    })
  },
  {
    name: "activation-related field",
    expectedCode: "ATTEMPTED_ACTIVATION_FIELD",
    value: mutate(baseRap, (value) => {
      value.payload.ticket_activation_request = "activate successor";
    })
  },
  {
    name: "unsupported inferred product field",
    expectedCode: "UNSUPPORTED_INFERENCE_FIELD",
    value: mutate(baseRap, (value) => {
      value.payload.product_readiness = "ready";
    })
  },
  {
    name: "schema concept without canonical mapping",
    expectedCode: "UNKNOWN_SCHEMA_CONCEPT",
    value: mutate(baseRap, (value) => {
      value.payload.concept = "repo.future_direction";
    })
  },
  {
    name: "unsupported authority class",
    expectedCode: "UNSUPPORTED_AUTHORITY_CLASS",
    value: mutate(baseRap, (value) => {
      value.authority_class = "FOUNDER_DECISION";
    })
  }
]);

export {
  GENERATED_AT,
  SOURCE_COMMIT,
  authoritySources,
  conflict,
  evidenceEnvelope,
  invalidFixtures,
  partialSupportingEvidence,
  provenance,
  repoAuthorityProjection,
  source,
  validFixtures
};
