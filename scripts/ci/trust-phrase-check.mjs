#!/usr/bin/env node
/**
 * trust-phrase-check.mjs
 *
 * Scans apps/frontend for banned "guarantee / urgency / nudge" phrases
 * that erode user trust. An allowlist mechanism lets teams mark
 * intentional exceptions (e.g. disclaimers that negate the phrase).
 *
 * Usage:
 *   node scripts/ci/trust-phrase-check.mjs
 *   pnpm run trust:phrases
 *
 * Allowlist: scripts/trust-phrases.allowlist.txt
 *   - One substring per line (case-insensitive).
 *   - Lines starting with # are comments.
 *   - If a matched line also contains an allowlisted substring, the match is skipped.
 */

import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SCAN_ROOT = path.join(ROOT, 'apps', 'frontend');
const ALLOWLIST_PATH = path.join(ROOT, 'scripts', 'trust-phrases.allowlist.txt');

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.txt']);
const IGNORE_DIRS = new Set([
  'node_modules', '.next', 'dist', 'build', 'coverage', 'out', '.turbo', '.git',
  '__tests__', 'tests-e2e',
]);

const BANNED_PHRASES = [
  'guaranteed',
  'risk-free',
  'deposit now',
  'act now',
  'hurry',
  'limited time',
  'get rich',
  'instant profit',
];

async function loadAllowlist() {
  try {
    const raw = await fs.readFile(ALLOWLIST_PATH, 'utf8');
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));

    const substrings = [];
    const files = new Set();

    for (const line of lines) {
      if (line.startsWith('file:')) {
        files.add(line.slice(5).trim());
      } else {
        substrings.push(line.toLowerCase());
      }
    }
    return { substrings, files };
  } catch {
    return { substrings: [], files: new Set() };
  }
}

async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, acc);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      acc.push(full);
    }
  }
  return acc;
}

function scanContent(content, substrings) {
  const lines = content.split('\n');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    for (const phrase of BANNED_PHRASES) {
      if (!lower.includes(phrase)) continue;
      const isAllowed = substrings.some((a) => lower.includes(a));
      if (isAllowed) continue;
      hits.push({ line: i + 1, phrase, text: lines[i].trimStart() });
    }
  }
  return hits;
}

async function main() {
  console.log('🔐 Trust Phrase Check — Scanning apps/frontend for banned copy\n');

  const { substrings, files: exemptFiles } = await loadAllowlist();
  const exemptCount = substrings.length + exemptFiles.size;
  if (exemptCount) {
    console.log(`  Allowlist loaded: ${substrings.length} substring(s), ${exemptFiles.size} file(s)`);
  }

  const files = await walk(SCAN_ROOT);
  console.log(`  Scanning ${files.length} file(s)...\n`);

  const violations = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (exemptFiles.has(rel)) continue;
    const content = await fs.readFile(file, 'utf8');
    const hits = scanContent(content, substrings);
    if (hits.length) {
      violations.push({ file: rel, hits });
    }
  }

  if (violations.length === 0) {
    console.log('✅ Trust phrase check passed. No banned phrases found.');
    process.exit(0);
  }

  console.error('Trust phrase violations found\n');
  for (const { file, hits } of violations) {
    console.error(`  ${file}`);
    for (const h of hits) {
      console.error(`    line ${h.line}: "${h.phrase}" → ${h.text}`);
    }
    console.error('');
  }

  const total = violations.reduce((n, v) => n + v.hits.length, 0);
  console.error(`❌ ${total} violation(s) in ${violations.length} file(s).`);
  console.error('');
  console.error('Fix: Remove or rephrase the flagged copy.');
  console.error('     To allowlist, add a substring to scripts/trust-phrases.allowlist.txt');
  process.exit(1);
}

main().catch((e) => {
  console.error('Trust phrase check errored:', e);
  process.exit(2);
});
