import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// B-P0-min drift test: the AGENTS.md operating card is a verbatim, non-authoritative
// index. Every bullet must be quoted byte-for-byte from the section named in the
// bold line above it, and the card must sit inside the first 16 KiB of AGENTS.md.

const ROOT = new URL("../../../", import.meta.url);
const BEGIN = "<!-- BEGIN OPERATING CARD -->";
const END = "<!-- END OPERATING CARD -->";
const HEADING = "## Operating card (non-authoritative index)";
const HEADER =
  "This card is a non-authoritative index for tools that load only the start of this file. " +
  "Each bullet is quoted verbatim from the AGENTS.md section named in the bold line above it. " +
  "The card adds and changes no rule: the rest of this file, including the Standing PR invariant above and the numbered sections below, " +
  "remains the binding text, and if a quoted line ever differs from its source, the source controls.";
const BEFORE_ANCHOR =
  "6. Once all required gates are satisfied, automated merge is permitted and preferred where supported.";
const AFTER_ANCHOR = "**Founder disposition — PR Posture execution refinement";
const MAX_CARD_END_BYTES = 16 * 1024;
const EXPECTED_GROUPS = [
  "2) Authority model",
  "1) Purpose",
  "12) Context provenance rule",
  "10) Execution modes and action controls",
  "Ticket sequencing / governed parallelism (deny-by-default)",
  "8) Execution Rules",
  "4) Non-Negotiables",
  "Green Lane operator rules (ADR 0025 / §6g)",
  "7) Testing Standards",
  "Validation commands",
  "9) Registered agent roles",
  "9.1 Implementer",
  "9.2 Verifier",
  "9.3 Repo Steward",
  "9.11 Engineering Operator",
  "13) Conflict handling rule",
  "15) Escalation rules",
  "14) Required output contract"
];

const count = (text, needle) => text.split(needle).length - 1;
const bytes = (text) => Buffer.byteLength(text, "utf8");

async function load() {
  const agents = await readFile(new URL("AGENTS.md", ROOT), "utf8");
  assert.equal(count(agents, BEGIN), 1, "AGENTS.md must contain exactly one operating-card BEGIN marker");
  assert.equal(count(agents, END), 1, "AGENTS.md must contain exactly one operating-card END marker");
  const start = agents.indexOf(BEGIN);
  const end = agents.indexOf(END) + END.length;
  assert.ok(start < end, "BEGIN marker must precede END marker");
  const card = agents.slice(start, end);
  // Source text for quotations: everything outside the card.
  const rest = agents.slice(0, start) + agents.slice(end);
  return { agents, card, rest, start, end };
}

function sectionByHeading(text, title) {
  const lines = text.split("\n");
  const hits = lines.flatMap((line, index) =>
    line === `## ${title}` || line === `### ${title}` ? [index] : []
  );
  assert.equal(hits.length, 1, `Cited section "${title}" must match exactly one ## or ### heading outside the card`);
  const level = lines[hits[0]].indexOf(" ");
  let stop = hits[0] + 1;
  while (stop < lines.length) {
    const match = /^(#{1,6}) /.exec(lines[stop]);
    if (match && match[1].length <= level) break;
    stop += 1;
  }
  return lines.slice(hits[0], stop).join("\n");
}

function parseCard(card) {
  const lines = card.split("\n");
  assert.equal(lines[0], BEGIN);
  assert.equal(lines[1], HEADING);
  assert.equal(lines[2], "");
  assert.equal(lines[3], HEADER, "Card header text is locked");
  assert.equal(lines.at(-1), END);
  const groups = [];
  for (const line of lines.slice(4, -1)) {
    if (line === "") continue;
    const title = /^\*\*(.+)\*\*$/.exec(line);
    if (title) {
      groups.push({ title: title[1], quotes: [] });
      continue;
    }
    const bullet = /^(?: {2})?- (.+)$/.exec(line);
    assert.ok(bullet, `Card line is neither a group title nor a quoted bullet: ${line}`);
    assert.ok(groups.length > 0, "Quoted bullet appears before any group title");
    groups.at(-1).quotes.push(bullet[1]);
  }
  return groups;
}

test("operating card exists once, between the PR invariant and §331, within the first 16 KiB", async () => {
  const { agents, start, end } = await load();
  assert.equal(count(agents, HEADING), 1);
  const before = agents.indexOf(BEFORE_ANCHOR);
  const after = agents.indexOf(AFTER_ANCHOR);
  assert.ok(before >= 0 && after >= 0, "Insertion anchors must exist");
  assert.ok(before < start, "Card must follow Standing PR invariant item 6");
  assert.ok(end < after, "Card must precede the §331 PR Posture disposition");
  assert.ok(bytes(agents.slice(0, end)) <= MAX_CARD_END_BYTES,
    `Card must end within the first ${MAX_CARD_END_BYTES} bytes of AGENTS.md`);
});

test("every card bullet is quoted verbatim from its cited AGENTS.md section", async () => {
  const { card, rest } = await load();
  const groups = parseCard(card);
  assert.deepEqual(groups.map((group) => group.title), EXPECTED_GROUPS);
  for (const { title, quotes } of groups) {
    assert.ok(quotes.length > 0, `Group "${title}" must quote at least one line`);
    const section = sectionByHeading(rest, title);
    for (const quote of quotes) {
      assert.ok(section.includes(quote), `Not verbatim in "${title}": ${quote}`);
    }
  }
});

test("operating card carries no live state and cannot disturb RAP or Fork 1 parsing", async () => {
  const { agents, card } = await load();
  assert.doesNotMatch(card, /^Current parallelism posture:/m);
  assert.doesNotMatch(card, /^Last updated:/m);
  assert.doesNotMatch(card, /^# /m);
  assert.doesNotMatch(card, /## 1\) Purpose|## 9\) Registered agent roles/);
  assert.doesNotMatch(card, /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{3}\b/, "Card must not name tickets or decision IDs");
  assert.doesNotMatch(card, /\bD-\d+\b/);
  assert.equal((agents.match(/^# AGENTS.md/gm) ?? []).length, 1);
  assert.equal((agents.match(/^Current parallelism posture:/gm) ?? []).length, 1);
});
