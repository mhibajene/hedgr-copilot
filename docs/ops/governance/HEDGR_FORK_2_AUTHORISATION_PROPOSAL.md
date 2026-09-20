# Fork 2 — mechanical RAP provenance: authorisation proposal

**Status:** PROPOSED / non-authorising. This record is for Founder review. It does not name work in `HEDGR_STATUS.md` §7/§7a, change the RAP procedure, or activate Fork 2.

**Controlling state:** The Institutional Load Design and order **Fork 1 → Fork 2 → Fork 3 pilot** are adopted under §291. Fork 1 is explicitly active under §292 after its verified permanent-main effective record and separate RAP rebind. Fork 2 and Fork 3 remain inactive. Existing source-first, governed PR, and separate projection-only permanent-main rebind requirements control until changed by a separately authorised, verified, explicitly effective repo record. This proposal is not a second live authority surface.

## Founder decision proposed

Separately authorise one bounded **Fork 2 implementation exercise**, recorded in the then-current §7 and bounded in §7a before implementation. Its purpose is to remove routine human initiation and governance routing from *non-material* RAP provenance binding while retaining review for material authority changes. Authorisation to implement would **not** make the new operating procedure active: activation would require a retained implementation, independent verification, an explicit repo-native effective record, and the applicable permanent-main RAP rebind under the procedure then in force. Do not infer a ticket, standing support lane, new D-number, or Fork 3 pilot from this proposal.

## Proposed implementation boundary

The implementation brief should distinguish three cases using §291 and the accepted [design](HEDGR_INSTITUTIONAL_LOAD_DESIGN.md#3-fork-2--authority-review-and-provenance):

| Case | Required result |
| --- | --- |
| Material authority change, whether or not a mandatory RAP source changes | Explicit Founder/repo authority review and recording; bind changed mandatory sources under the governed procedure. Ambiguity or current-source conflict returns to authority review. |
| Mandatory-source content changes without material authority change | Deterministically regenerate and verify the RAP against one immutable permanent-main source revision through an approved mechanical path, without a separate human authority decision or routine governance handoff. |
| Neither material authority nor mandatory-source content changes | No RAP event caused by that change; normal delivery checks and existing freshness/conflict controls still apply. |

For this classification, a material change includes occupancy, authorised outcomes or files, amendment envelopes, Class A/B/C or concurrency, financial/customer-money capability, participant release or Green status, trust/data/security, architecture or material narrative, exclusions, stop/rollback, material acceptance or verification obligations, and operative ADR/doctrine changes. Supplementary evidence alone is not automatically a material change. Classification is a governed input to binding, **not** a self-approval mechanism for authority changes.

The eventual §7a brief should name the precise workflow/helper/test/documentation files after checking the repository's protected-branch and credential constraints. Candidate surfaces are the RAP generation/check scripts and tests, a narrowly scoped GitHub workflow or equivalent approved automation, and `docs/ops/bridge/README.md`. `HEDGR_STATUS.md`, `AGENTS.md`, and the generated RAP are included only for source-first authorisation, effective-state recording, and binding as required by the *current* procedure. Any required credential or repository setting must be separately controlled; this proposal grants no secret-management or branch-protection bypass. No dependency, runtime route, RAP schema/meaning, accepted ADR principle, product, Form, participant, financial, or Fork 3 envelope change is in scope.

## Verification required before any activation

1. Prove the three classifications with changed-source and no-change fixtures. Material or ambiguous changes never self-route into a mechanical authority decision.
2. Demonstrate all four mandatory sources—`HEDGR_STATUS.md`, `AGENTS.md`, the accepted ADR index, and `HEDGR_ACTIVE_DOCTRINE_INDEX.md`—bound to the **same immutable permanent-main revision**, including after squash/rebase. A branch or pre-merge SHA cannot substitute for permanent-main provenance; the artifact cannot claim the SHA of its own commit as its source.
3. Preserve deterministic output, source locators, read-only/non-authoritative flags, and fail-closed behavior for missing, stale, mismatched, invalid, or conflicting sources. Keep ADR 0026's principles; a principle change requires a superseding ADR and separate authority.
4. Exercise the real protected-branch path end to end: automation opens or supplies a reviewable mechanical change, required checks run, binding evidence is retained, and the non-material case completes **without routine Founder/Repo Steward routing**. Test repeated events, races, failure recovery, and idempotence. A merely renamed manual sibling PR fails this criterion.
5. Verify that failure leaves the old binding in force and routes to the existing governed procedure; it never marks an unbound artifact `CURRENT` or bypasses CI. Retain an independently reviewable implementation/verification record and a scoped rollback.

**Feasibility to resolve before implementation selection:** GitHub documents that pull requests created by a workflow using its repository `GITHUB_TOKEN` start their resulting CI runs in an approval-required state. That would recreate human routing for a bot-authored mechanical PR. A suitable approved authentication/merge path must be proven against this repository's protections without increasing token scope or bypassing checks; if it cannot be, stop Fork 2 and retain the existing procedure. See [GitHub's `GITHUB_TOKEN` guidance](https://docs.github.com/en/actions/concepts/security/github_token).

**Guidance reconciliation:** The current `docs/ops/bridge/README.md` still describes the old §2 `NARRATIVE-007` lag as live source and RAP payload text. Fork 1 moved that passage to a historical archive. Correct this operator example during the separately authorised documentation scope, preserving diagnostic semantics and the archived historical record.

## Stop, rollback, and effective boundary

Stop if classification is ambiguous, a current authority source disagrees, common permanent-main provenance fails, protected checks cannot run without routine approval, or automation would need to decide a material authority question. Preserve the current separate-rebind procedure while investigating. Roll back only the bounded Fork 2 mechanism and documentation, then regenerate and verify through the current governed path; do not rewrite historical decisions or loosen Bridge fail-closed controls.

**Activation condition:** A later §7/§7a record must explicitly confirm the chosen mechanism, exact implementation scope, retained evidence above, successful governed delivery, and effective date/commit. Fork 2 remains **INACTIVE** until that record takes effect and its required permanent-main rebind is verified. Fork 3 remains **INACTIVE** pending separate pilot authority after Fork 2 activation. Current Lane V/E/G/N occupancy, participant distribution pause, Green retirement, financial boundaries, and all other product authority remain unchanged.
