#!/usr/bin/env node
// CI invariants for GitHub Actions workflows.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WF_DIR = path.join(ROOT, '.github', 'workflows');
const files = fs.readdirSync(WF_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

const errors = [];

function read(p) { return fs.readFileSync(p, 'utf8'); }

for (const f of files) {
  const p = path.join(WF_DIR, f);
  const s = read(p);

  // 1) YAML safety: colon in step name without quotes => common source of syntax errors
  const badColon = /^\s*-\s*name:\s*[^"\n]+:[^"\n]+$/m.test(s);
  if (badColon) errors.push(`${f}: unquoted colon in a step name`);

  // 2) setup-node must NOT use pnpm cache (pnpm not installed yet)
  const nodePnpmCache = /uses:\s*actions\/setup-node@v4[\s\S]{0,250}^\s*cache:\s*['"]?pnpm['"]?/m.test(s);
  if (nodePnpmCache) errors.push(`${f}: setup-node uses cache: pnpm (forbidden; enable Corepack first)`);

  // 3) E2E workflow invariants
  if (f === 'e2e-smoke.yml') {
    if (!/^name:\s*E2E smoke \(?@hedgr\/frontend\)?$/m.test(s))
      errors.push(`${f}: workflow name must be exactly 'E2E smoke (@hedgr/frontend)'`);
    if (!/workflow_dispatch:/m)
      errors.push(`${f}: must allow 'workflow_dispatch' to manually kick E2E runs`);
  }
}

// 4) .nvmrc must exist to pin Node locally/CI fallback
if (!fs.existsSync(path.join(ROOT, '.nvmrc'))) {
  errors.push(`.nvmrc missing at repo root (expected Node 20)`);
}

if (errors.length) {
  console.error('❌ Workflow guard failed:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log('✅ Workflow guard OK (naming, YAML, pnpm usage, .nvmrc present).');
