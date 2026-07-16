import policy from "./phase0-policy.json" with { type: "json" };

const AUTHORITY_FIELDS = Object.freeze([
  "execution_authority",
  "mutation_allowed",
  "ticket_activation_allowed",
  "sequencing_allowed"
]);

const ENVELOPE_FIELDS = new Set([
  "mode",
  ...AUTHORITY_FIELDS,
  "authority_class",
  "source_commit",
  "generated_at",
  "freshness",
  "coverage",
  "sources",
  "conflicts",
  "payload"
]);

const SOURCE_FIELDS = new Set([
  "source_path",
  "source_role",
  "requirement",
  "source_classification",
  "expected_revision",
  "actual_revision",
  "freshness_requirement",
  "freshness",
  "structural_validation",
  "stable_locator_support",
  "inclusion_status",
  "reason",
  "conflict_status"
]);

const PROVENANCE_FIELDS = new Set([
  "value",
  "source_path",
  "source_section",
  "source_commit",
  "recorded_at",
  "source_classification",
  "freshness"
]);

const CONFLICT_FIELDS = new Set([
  "conflict_id",
  "concept",
  "stronger_source_path",
  "stronger_source_section",
  "stronger_source_revision",
  "stronger_source_classification",
  "lower_source_path",
  "lower_source_section",
  "lower_source_revision",
  "lower_source_classification",
  "description",
  "resolved",
  "detected_at",
  "non_resolution_statement"
]);

const RAP_REQUIRED_ROLES = Object.freeze([
  "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY",
  "REPO_EXECUTION_CONTRACT",
  "ACCEPTED_ADR_INDEX"
]);

const READ_ONLY_AUTHORITY_CLASS = "REPO_AUTHORITY_PROJECTION";
const DESCRIPTIVE_CONTRACT_FIELDS = new Set([
  "source_commit",
  "sequencing_posture",
  "active_ticket_ids",
  "authority_boundaries",
  "source_classification",
  "stronger_source_classification",
  "lower_source_classification"
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isIsoTimestamp(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isRepoRelativePath(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !value.startsWith("/") &&
    !value.split("/").includes("..")
  );
}

function failClosedError(code, path, message) {
  return {
    code,
    path,
    message,
    authorizing: false,
    freshness: "UNKNOWN",
    coverage: "INSUFFICIENT"
  };
}

function sortErrors(errors) {
  const unique = new Map();

  for (const error of errors) {
    unique.set(`${error.code}\u0000${error.path}\u0000${error.message}`, error);
  }

  return [...unique.values()].sort((a, b) =>
    `${a.code}\u0000${a.path}\u0000${a.message}`.localeCompare(
      `${b.code}\u0000${b.path}\u0000${b.message}`
    )
  );
}

function checkUnknownKeys(value, allowed, path, errors) {
  if (!isRecord(value)) return;

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      errors.push(
        failClosedError(
          "UNKNOWN_SCHEMA_CONCEPT",
          `${path}.${key}`,
          "Unknown extension fields cannot imply authority or institutional meaning."
        )
      );
    }
  }
}

function prohibitedFieldCode(key) {
  if (AUTHORITY_FIELDS.includes(key) || DESCRIPTIVE_CONTRACT_FIELDS.has(key)) return null;
  if (/(mutat|write|commit|merge|deploy)/i.test(key)) {
    return "ATTEMPTED_MUTATION_FIELD";
  }
  if (/(activat|approv)/i.test(key)) return "ATTEMPTED_ACTIVATION_FIELD";
  if (/(sequenc|next_action|priority)/i.test(key)) {
    return "ATTEMPTED_SEQUENCING_FIELD";
  }
  if (/(readiness|safe|compatib|recommended|winner|synthesi|supersession|product_direction)/i.test(key)) {
    return "UNSUPPORTED_INFERENCE_FIELD";
  }
  return null;
}

function inspectProhibitedFields(value, path, errors) {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      inspectProhibitedFields(item, `${path}[${index}]`, errors)
    );
    return;
  }
  if (!isRecord(value)) return;

  for (const [key, nested] of Object.entries(value)) {
    const code = prohibitedFieldCode(key);
    if (code) {
      errors.push(
        failClosedError(
          code,
          `${path}.${key}`,
          "The field is outside the Phase 0 read-only evidence contract."
        )
      );
    }
    inspectProhibitedFields(nested, `${path}.${key}`, errors);
  }
}

function validateSourceEntry(source, path = "$.sources[0]") {
  const errors = [];

  if (!isRecord(source)) {
    return [
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        path,
        "Source entry must be an object."
      )
    ];
  }

  checkUnknownKeys(source, SOURCE_FIELDS, path, errors);

  if (!isRepoRelativePath(source.source_path)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.source_path`,
        "Source path must be repo-relative and cannot traverse parent directories."
      )
    );
  }
  if (typeof source.source_role !== "string" || source.source_role.length === 0) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.source_role`,
        "Source role is required."
      )
    );
  }
  if (!["MANDATORY", "OPTIONAL"].includes(source.requirement)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.requirement`,
        "Source requirement must be MANDATORY or OPTIONAL."
      )
    );
  }
  if (!policy.source_classifications.includes(source.source_classification)) {
    errors.push(
      failClosedError(
        "INVALID_SOURCE_CLASSIFICATION",
        `${path}.source_classification`,
        "Source classification is not in the closed allow-list."
      )
    );
  }
  for (const field of ["expected_revision", "actual_revision"]) {
    if (source[field] !== null && (typeof source[field] !== "string" || source[field].length === 0)) {
      errors.push(
        failClosedError(
          "STRUCTURALLY_INVALID_SOURCE",
          `${path}.${field}`,
          "Revision must be a non-empty immutable identifier or null when not evaluated."
        )
      );
    }
  }
  if (!["CURRENT_REQUIRED", "CURRENT_OR_STALE_RECORDED"].includes(source.freshness_requirement)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.freshness_requirement`,
        "Freshness requirement is invalid."
      )
    );
  }
  if (!policy.freshness.includes(source.freshness)) {
    errors.push(
      failClosedError(
        "UNKNOWN_FRESHNESS",
        `${path}.freshness`,
        "Freshness must use the closed enum."
      )
    );
  }
  if (!["VALID", "INVALID", "UNREADABLE", "NOT_EVALUATED"].includes(source.structural_validation)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.structural_validation`,
        "Structural validation state is invalid."
      )
    );
  }
  if (!["REQUIRED", "SUPPORTED", "UNSUPPORTED", "NOT_EVALUATED"].includes(source.stable_locator_support)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.stable_locator_support`,
        "Stable locator state is invalid."
      )
    );
  }
  if (!["INCLUDED", "OMITTED", "MISSING", "NOT_EVALUATED"].includes(source.inclusion_status)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.inclusion_status`,
        "Inclusion state is invalid."
      )
    );
  }
  if (typeof source.reason !== "string" || source.reason.length === 0) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.reason`,
        "Inclusion or exclusion reason is required."
      )
    );
  }
  if (!["NONE", "DETECTED", "NOT_EVALUATED"].includes(source.conflict_status)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        `${path}.conflict_status`,
        "Conflict state is invalid."
      )
    );
  }

  return sortErrors(errors);
}

function evaluateSourceSet(sources, commonRevision, { requireAuthoritySet = false } = {}) {
  const errors = [];
  const sortedSources = Array.isArray(sources)
    ? [...sources].sort((a, b) =>
        String(a?.source_path).localeCompare(String(b?.source_path))
      )
    : [];

  if (!Array.isArray(sources)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        "$.sources",
        "Sources must be an array."
      )
    );
  }

  sortedSources.forEach((source, index) => {
    const path = `$.sources[${index}]`;
    errors.push(...validateSourceEntry(source, path));
    if (!isRecord(source)) return;

    const mandatory = source.requirement === "MANDATORY";
    const missing = ["OMITTED", "MISSING", "NOT_EVALUATED"].includes(
      source.inclusion_status
    );
    const included = source.inclusion_status === "INCLUDED";

    if (mandatory && missing) {
      errors.push(
        failClosedError(
          "MISSING_MANDATORY_SOURCE",
          path,
          "Mandatory source is missing or has not been evaluated."
        )
      );
    }
    if (included && source.structural_validation === "UNREADABLE") {
      errors.push(
        failClosedError(
          "UNREADABLE_SOURCE",
          path,
          "Included source is unreadable."
        )
      );
    }
    if (included && source.structural_validation === "INVALID") {
      errors.push(
        failClosedError(
          "STRUCTURALLY_INVALID_SOURCE",
          path,
          "Included source failed structural validation."
        )
      );
    }
    if (mandatory && source.freshness === "STALE") {
      errors.push(
        failClosedError(
          "STALE_MANDATORY_SOURCE",
          path,
          "Mandatory source is stale."
        )
      );
    }
    if (mandatory && source.freshness === "UNKNOWN") {
      errors.push(
        failClosedError(
          "UNKNOWN_FRESHNESS",
          path,
          "Mandatory source freshness is unknown."
        )
      );
    }
    if (
      included &&
      (commonRevision === null ||
        source.expected_revision !== commonRevision ||
        source.actual_revision !== commonRevision)
    ) {
      errors.push(
        failClosedError(
          "REVISION_MISMATCH",
          path,
          "Included source is not bound to the common source revision."
        )
      );
    }
    if (source.conflict_status === "DETECTED") {
      errors.push(
        failClosedError(
          "UNRESOLVED_AUTHORITY_CONFLICT",
          path,
          "Detected conflicts are reported and never automatically resolved."
        )
      );
    }
  });

  if (requireAuthoritySet) {
    const roles = new Set(sortedSources.map((source) => source?.source_role));
    for (const role of RAP_REQUIRED_ROLES) {
      const entry = sortedSources.find((source) => source?.source_role === role);
      if (!entry || entry.requirement !== "MANDATORY") {
        errors.push(
          failClosedError(
            "MISSING_MANDATORY_SOURCE",
            "$.sources",
            `Repo Authority Projection requires source role ${role}.`
          )
        );
      }
    }
    if (
      !sortedSources.some(
        (source) =>
          String(source?.source_role).startsWith("ACTIVE_DOCTRINE_SET_") &&
          source?.requirement === "MANDATORY"
      )
    ) {
      errors.push(
        failClosedError(
          "MISSING_MANDATORY_SOURCE",
          "$.sources",
          "Repo Authority Projection requires an explicit relevant doctrine declaration."
        )
      );
    }
  }

  const sortedErrors = sortErrors(errors);
  const optionalOmission = sortedSources.some(
    (source) =>
      source?.requirement === "OPTIONAL" &&
      ["OMITTED", "MISSING"].includes(source?.inclusion_status)
  );

  return {
    ok: sortedErrors.length === 0,
    freshness: sortedErrors.length === 0 ? "CURRENT" : "UNKNOWN",
    coverage:
      sortedErrors.length > 0
        ? "INSUFFICIENT"
        : optionalOmission
          ? "PARTIAL"
          : "COMPLETE",
    sources: sortedSources,
    errors: sortedErrors
  };
}

function validateProvenance(provenance, path = "$.payload.fields.value") {
  const errors = [];
  if (!isRecord(provenance)) {
    return [
      failClosedError(
        "MISSING_MATERIAL_PROVENANCE",
        path,
        "Material fields require direct field-level provenance."
      )
    ];
  }

  checkUnknownKeys(provenance, PROVENANCE_FIELDS, path, errors);
  if (!("value" in provenance)) {
    errors.push(
      failClosedError(
        "MISSING_MATERIAL_PROVENANCE",
        `${path}.value`,
        "Repo-recorded value is required and is never inferred."
      )
    );
  }
  if (!isRepoRelativePath(provenance.source_path)) {
    errors.push(
      failClosedError(
        "MISSING_MATERIAL_PROVENANCE",
        `${path}.source_path`,
        "Provenance source_path must be repo-relative."
      )
    );
  }
  for (const field of ["source_section", "source_commit"]) {
    if (typeof provenance[field] !== "string" || provenance[field].length === 0) {
      errors.push(
        failClosedError(
          "MISSING_MATERIAL_PROVENANCE",
          `${path}.${field}`,
          `${field} is required for material provenance.`
        )
      );
    }
  }
  if ("recorded_at" in provenance && !isIsoTimestamp(provenance.recorded_at)) {
    errors.push(
      failClosedError(
        "MISSING_MATERIAL_PROVENANCE",
        `${path}.recorded_at`,
        "recorded_at may appear only when a valid timestamp is recorded."
      )
    );
  }
  if (!policy.source_classifications.includes(provenance.source_classification)) {
    errors.push(
      failClosedError(
        "INVALID_SOURCE_CLASSIFICATION",
        `${path}.source_classification`,
        "Provenance source classification is not in the closed allow-list."
      )
    );
  }
  if (!policy.freshness.includes(provenance.freshness)) {
    errors.push(
      failClosedError(
        "UNKNOWN_FRESHNESS",
        `${path}.freshness`,
        "Provenance freshness must use the closed enum."
      )
    );
  }

  return sortErrors(errors);
}

function fnv1a(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function conflictIdentity(conflict) {
  const identity = [
    conflict.concept,
    conflict.stronger_source_path,
    conflict.stronger_source_section,
    conflict.stronger_source_revision,
    conflict.lower_source_path,
    conflict.lower_source_section,
    conflict.lower_source_revision
  ].join("\u001f");
  return `conflict-${fnv1a(identity)}`;
}

function validateConflict(conflict, path = "$.conflicts[0]") {
  const errors = [];
  if (!isRecord(conflict)) {
    return [
      failClosedError(
        "UNRESOLVED_AUTHORITY_CONFLICT",
        path,
        "Conflict record must be structured and attributable."
      )
    ];
  }
  checkUnknownKeys(conflict, CONFLICT_FIELDS, path, errors);
  const requiredStrings = [
    "concept",
    "stronger_source_path",
    "stronger_source_section",
    "stronger_source_revision",
    "lower_source_path",
    "lower_source_section",
    "lower_source_revision",
    "description",
    "non_resolution_statement"
  ];
  for (const field of requiredStrings) {
    if (typeof conflict[field] !== "string" || conflict[field].length === 0) {
      errors.push(
        failClosedError(
          "UNRESOLVED_AUTHORITY_CONFLICT",
          `${path}.${field}`,
          `${field} is required for an attributable conflict.`
        )
      );
    }
  }
  for (const field of ["stronger_source_path", "lower_source_path"]) {
    if (!isRepoRelativePath(conflict[field])) {
      errors.push(
        failClosedError(
          "UNRESOLVED_AUTHORITY_CONFLICT",
          `${path}.${field}`,
          "Conflict source paths must be repo-relative and traversal-free."
        )
      );
    }
  }
  for (const field of ["stronger_source_classification", "lower_source_classification"]) {
    if (!policy.source_classifications.includes(conflict[field])) {
      errors.push(
        failClosedError(
          "INVALID_SOURCE_CLASSIFICATION",
          `${path}.${field}`,
          "Conflict source classification is invalid."
        )
      );
    }
  }
  if (conflict.resolved !== false) {
    errors.push(
      failClosedError(
        "UNRESOLVED_AUTHORITY_CONFLICT",
        `${path}.resolved`,
        "Phase 0 conflict records cannot resolve or synthesize authority."
      )
    );
  }
  if (!isIsoTimestamp(conflict.detected_at)) {
    errors.push(
      failClosedError(
        "UNRESOLVED_AUTHORITY_CONFLICT",
        `${path}.detected_at`,
        "Conflict detection timestamp is required."
      )
    );
  }
  if (conflict.conflict_id !== conflictIdentity(conflict)) {
    errors.push(
      failClosedError(
        "UNRESOLVED_AUTHORITY_CONFLICT",
        `${path}.conflict_id`,
        "Conflict identity must be deterministic from both source locators and revisions."
      )
    );
  }
  return sortErrors(errors);
}

function validateEvidencePayload(payload, authorityClass) {
  const errors = [];
  const rootPath = "$.payload";
  if (!isRecord(payload)) {
    return [
      failClosedError(
        "UNKNOWN_SCHEMA_CONCEPT",
        rootPath,
        "Payload must be a mapped canonical concept."
      )
    ];
  }

  if (!policy.canonical_concepts.includes(payload.concept)) {
    errors.push(
      failClosedError(
        "UNKNOWN_SCHEMA_CONCEPT",
        `${rootPath}.concept`,
        "Payload concept has no canonical Phase 0 source mapping."
      )
    );
  }

  if (authorityClass === READ_ONLY_AUTHORITY_CLASS) {
    checkUnknownKeys(payload, new Set(["concept", "fields"]), rootPath, errors);
    if (payload.concept !== "repo_authority_projection" || !isRecord(payload.fields)) {
      errors.push(
        failClosedError(
          "UNKNOWN_SCHEMA_CONCEPT",
          rootPath,
          "Repo Authority Projection requires its closed canonical field map."
        )
      );
      return sortErrors(errors);
    }
    const allowedFields = new Set([
      "active_ticket_ids",
      "sequencing_posture",
      "authority_boundaries"
    ]);
    checkUnknownKeys(payload.fields, allowedFields, `${rootPath}.fields`, errors);
    for (const field of allowedFields) {
      errors.push(
        ...validateProvenance(payload.fields[field], `${rootPath}.fields.${field}`)
      );
    }
  } else {
    checkUnknownKeys(payload, new Set(["concept", "records"]), rootPath, errors);
    const expectedConcept =
      authorityClass === "REVIEW_EVIDENCE" ? "review_evidence" : "supporting_evidence";
    const expectedRecordConcept =
      authorityClass === "REVIEW_EVIDENCE" ? "review.record" : "supporting.record";

    if (payload.concept !== expectedConcept || !Array.isArray(payload.records)) {
      errors.push(
        failClosedError(
          "UNKNOWN_SCHEMA_CONCEPT",
          rootPath,
          "Evidence payload does not match its closed authority class."
        )
      );
      return sortErrors(errors);
    }
    payload.records.forEach((record, index) => {
      const path = `${rootPath}.records[${index}]`;
      checkUnknownKeys(record, new Set(["concept", "data"]), path, errors);
      if (!isRecord(record) || record.concept !== expectedRecordConcept) {
        errors.push(
          failClosedError(
            "UNKNOWN_SCHEMA_CONCEPT",
            `${path}.concept`,
            "Evidence record concept is not mapped for this authority class."
          )
        );
      }
      errors.push(...validateProvenance(record?.data, `${path}.data`));
    });
  }

  return sortErrors(errors);
}

function validatePayloadRevisionBinding(value, expectedRevision, path = "$.payload") {
  const errors = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      errors.push(
        ...validatePayloadRevisionBinding(item, expectedRevision, `${path}[${index}]`)
      );
    });
    return errors;
  }
  if (!isRecord(value)) return errors;

  if (
    Object.hasOwn(value, "source_commit") &&
    value.source_commit !== expectedRevision
  ) {
    errors.push(
      failClosedError(
        "REVISION_MISMATCH",
        `${path}.source_commit`,
        "Field-level provenance must bind to the response source revision."
      )
    );
  }
  for (const [key, nested] of Object.entries(value)) {
    errors.push(
      ...validatePayloadRevisionBinding(nested, expectedRevision, `${path}.${key}`)
    );
  }
  return errors;
}

function validateResponseEnvelope(value) {
  const errors = [];
  if (!isRecord(value)) {
    const resultErrors = [
      failClosedError(
        "UNKNOWN_SCHEMA_CONCEPT",
        "$",
        "Response envelope must be an object."
      )
    ];
    return { ok: false, errors: resultErrors };
  }

  checkUnknownKeys(value, ENVELOPE_FIELDS, "$", errors);
  inspectProhibitedFields(value, "$", errors);

  if (value.mode !== policy.mode) {
    errors.push(
      failClosedError(
        "INVALID_READ_ONLY_MODE",
        "$.mode",
        "Bridge mode must always be READ_ONLY."
      )
    );
  }
  for (const field of AUTHORITY_FIELDS) {
    if (value[field] !== false) {
      const code =
        field === "mutation_allowed"
          ? "ATTEMPTED_MUTATION_FIELD"
          : field === "ticket_activation_allowed"
            ? "ATTEMPTED_ACTIVATION_FIELD"
            : field === "sequencing_allowed"
              ? "ATTEMPTED_SEQUENCING_FIELD"
              : "ATTEMPTED_ACTIVATION_FIELD";
      errors.push(
        failClosedError(
          code,
          `$.${field}`,
          "Authority Boolean fields are constant false."
        )
      );
    }
  }
  if (!policy.authority_classes.includes(value.authority_class)) {
    errors.push(
      failClosedError(
        "UNSUPPORTED_AUTHORITY_CLASS",
        "$.authority_class",
        "Authority class is not in the closed allow-list."
      )
    );
  }
  if (typeof value.source_commit !== "string" || value.source_commit.length === 0) {
    errors.push(
      failClosedError(
        "REVISION_MISMATCH",
        "$.source_commit",
        "An explicit immutable source revision is required."
      )
    );
  }
  if (!isIsoTimestamp(value.generated_at)) {
    errors.push(
      failClosedError(
        "UNKNOWN_FRESHNESS",
        "$.generated_at",
        "A valid generation timestamp is required but is excluded from semantic equality."
      )
    );
  }
  if (!policy.freshness.includes(value.freshness)) {
    errors.push(
      failClosedError(
        "UNKNOWN_FRESHNESS",
        "$.freshness",
        "Freshness must use the closed enum."
      )
    );
  }
  if (!policy.coverage.includes(value.coverage)) {
    errors.push(
      failClosedError(
        "INSUFFICIENT_COVERAGE",
        "$.coverage",
        "Coverage must use the closed enum."
      )
    );
  }

  const sourceEvaluation = evaluateSourceSet(value.sources, value.source_commit, {
    requireAuthoritySet: value.authority_class === READ_ONLY_AUTHORITY_CLASS
  });
  errors.push(...sourceEvaluation.errors);

  if (value.authority_class === READ_ONLY_AUTHORITY_CLASS) {
    if (value.freshness !== "CURRENT") {
      errors.push(
        failClosedError(
          "UNKNOWN_FRESHNESS",
          "$.freshness",
          "Repo Authority Projection cannot be interpreted unless freshness is CURRENT."
        )
      );
    }
    if (value.coverage !== "COMPLETE") {
      errors.push(
        failClosedError(
          "INSUFFICIENT_COVERAGE",
          "$.coverage",
          "Repo Authority Projection requires COMPLETE mandatory-source coverage."
        )
      );
    }
  }
  if (
    sourceEvaluation.errors.length === 0 &&
    (value.freshness !== sourceEvaluation.freshness ||
      value.coverage !== sourceEvaluation.coverage)
  ) {
    errors.push(
      failClosedError(
        value.freshness !== sourceEvaluation.freshness
          ? "UNKNOWN_FRESHNESS"
          : "INSUFFICIENT_COVERAGE",
        value.freshness !== sourceEvaluation.freshness ? "$.freshness" : "$.coverage",
        "Envelope freshness and coverage must match deterministic source evaluation."
      )
    );
  }

  if (!Array.isArray(value.conflicts)) {
    errors.push(
      failClosedError(
        "UNRESOLVED_AUTHORITY_CONFLICT",
        "$.conflicts",
        "Conflicts must be a structured array."
      )
    );
  } else {
    value.conflicts.forEach((conflict, index) => {
      errors.push(...validateConflict(conflict, `$.conflicts[${index}]`));
    });
    if (value.conflicts.length > 0) {
      errors.push(
        failClosedError(
          "UNRESOLVED_AUTHORITY_CONFLICT",
          "$.conflicts",
          "Unresolved authority conflicts fail closed and are never smoothed by precedence or recency."
        )
      );
    }
  }

  errors.push(...validateEvidencePayload(value.payload, value.authority_class));
  errors.push(...validatePayloadRevisionBinding(value.payload, value.source_commit));

  const sortedErrors = sortErrors(errors);
  return {
    ok: sortedErrors.length === 0,
    freshness: sortedErrors.length === 0 ? value.freshness : "UNKNOWN",
    coverage: sortedErrors.length === 0 ? value.coverage : "INSUFFICIENT",
    errors: sortedErrors
  };
}

function validateSourceManifestStructure(manifest) {
  const errors = [];
  if (!isRecord(manifest)) {
    return {
      ok: false,
      errors: [
        failClosedError(
          "STRUCTURALLY_INVALID_SOURCE",
          "$",
          "Source manifest must be an object."
        )
      ]
    };
  }
  checkUnknownKeys(
    manifest,
    new Set([
      "manifest_id",
      "revision_policy",
      "common_source_revision",
      "freshness_policy_reference",
      "sources"
    ]),
    "$",
    errors
  );
  if (typeof manifest.manifest_id !== "string" || manifest.manifest_id.length === 0) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        "$.manifest_id",
        "Manifest identifier is required."
      )
    );
  }
  if (manifest.revision_policy !== "COMMON_SOURCE_REVISION_REQUIRED") {
    errors.push(
      failClosedError(
        "REVISION_MISMATCH",
        "$.revision_policy",
        "Phase 0 authority manifests require common revision binding."
      )
    );
  }
  if (
    manifest.common_source_revision !== null &&
    (typeof manifest.common_source_revision !== "string" ||
      manifest.common_source_revision.length === 0)
  ) {
    errors.push(
      failClosedError(
        "REVISION_MISMATCH",
        "$.common_source_revision",
        "Common source revision must be immutable or null before evaluation."
      )
    );
  }
  if (
    typeof manifest.freshness_policy_reference !== "string" ||
    manifest.freshness_policy_reference.length === 0
  ) {
    errors.push(
      failClosedError(
        "UNKNOWN_FRESHNESS",
        "$.freshness_policy_reference",
        "Freshness policy reference is required; no TTL is invented."
      )
    );
  }
  if (!Array.isArray(manifest.sources)) {
    errors.push(
      failClosedError(
        "STRUCTURALLY_INVALID_SOURCE",
        "$.sources",
        "Manifest sources must be an array."
      )
    );
  } else {
    manifest.sources.forEach((source, index) => {
      errors.push(...validateSourceEntry(source, `$.sources[${index}]`));
    });
  }
  const sortedErrors = sortErrors(errors);
  return { ok: sortedErrors.length === 0, errors: sortedErrors };
}

function evaluateSourceManifest(manifest) {
  const structure = validateSourceManifestStructure(manifest);
  if (!structure.ok) {
    return {
      ok: false,
      freshness: "UNKNOWN",
      coverage: "INSUFFICIENT",
      sources: [],
      errors: structure.errors
    };
  }
  return evaluateSourceSet(manifest.sources, manifest.common_source_revision, {
    requireAuthoritySet: true
  });
}

function precedenceKeyForSource(source) {
  const role = String(source?.source_role ?? "");
  if (role === "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY") return "HEDGR_STATUS";
  if (role === "REPO_EXECUTION_CONTRACT") return "AGENTS";
  if (role.startsWith("ACCEPTED_ADR")) return "ACCEPTED_ADRS";
  if (role.startsWith("ACTIVE_DOCTRINE")) return "ACTIVE_DOCTRINE";
  if (role.startsWith("ACTIVE_GOVERNANCE")) return "ACTIVE_GOVERNANCE_REGISTERS";
  if (role.startsWith("PRODUCT_") || role.startsWith("EXPERIMENT_") || role.startsWith("USER_")) {
    return "PRODUCT_EXPERIMENT_USER_EVIDENCE";
  }
  if (role.startsWith("WEEKLY_") || role.startsWith("MVP_PROCESS_")) {
    return "WEEKLY_MVP_PROCESS_REVIEWS";
  }
  return "SUPPORTING_ARTIFACTS";
}

function compareSourcePrecedence(left, right) {
  const leftIndex = policy.source_precedence.indexOf(precedenceKeyForSource(left));
  const rightIndex = policy.source_precedence.indexOf(precedenceKeyForSource(right));
  return leftIndex - rightIndex;
}

function classifyConflict({ stronger, lower, concept, description, detectedAt }) {
  const ordered = compareSourcePrecedence(stronger, lower) <= 0
    ? { stronger, lower }
    : { stronger: lower, lower: stronger };
  const conflict = {
    concept,
    stronger_source_path: ordered.stronger.source_path,
    stronger_source_section: ordered.stronger.source_section,
    stronger_source_revision: ordered.stronger.source_commit,
    stronger_source_classification: ordered.stronger.source_classification,
    lower_source_path: ordered.lower.source_path,
    lower_source_section: ordered.lower.source_section,
    lower_source_revision: ordered.lower.source_commit,
    lower_source_classification: ordered.lower.source_classification,
    description,
    resolved: false,
    detected_at: detectedAt,
    non_resolution_statement:
      "Precedence classifies this conflict; it does not resolve, synthesize, or supersede either source."
  };
  return { conflict_id: conflictIdentity(conflict), ...conflict };
}

function semanticCanonicalize(value) {
  if (Array.isArray(value)) {
    return value
      .map(semanticCanonicalize)
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }
  if (!isRecord(value)) return value;

  const result = {};
  for (const key of Object.keys(value).sort()) {
    if (["generated_at", "detected_at"].includes(key)) continue;
    result[key] = semanticCanonicalize(value[key]);
  }
  return result;
}

function semanticStringify(value) {
  return JSON.stringify(semanticCanonicalize(value));
}

export {
  classifyConflict,
  compareSourcePrecedence,
  conflictIdentity,
  evaluateSourceManifest,
  failClosedError,
  policy,
  semanticCanonicalize,
  semanticStringify,
  validateConflict,
  validateProvenance,
  validateResponseEnvelope,
  validateSourceEntry,
  validateSourceManifestStructure
};
