#!/usr/bin/env node
// Lockfile/manifest drift guard for critical toolchain deps (no external deps).
import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const LOCK = fs.readFileSync(path.join(ROOT, 'pnpm-lock.yaml'), 'utf8');

// Guard list: add more later if needed.
const GUARDED = [{ name: 'turbo', path: ['devDependencies', 'turbo'] }];

const get = (o, p) => p.reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), o);
const problems = [];
for (const g of GUARDED) {
  const range = get(PKG, g.path);
  if (!range) continue;
  const m = LOCK.match(new RegExp(String.raw`(?:^|\n)\s*${g.name}@(\d+\.\d+\.\d+):`, 'm'));
  const resolved = m?.[1];
  if (!resolved) { problems.push(`Lockfile missing resolved entry for ${g.name}`); continue; }
  const r = range.trim();
  const ok = (() => {
    if (/^\d+\.\d+\.\d+$/.test(r)) return resolved === r;
    if (/^\^\d+\.\d+\.\d+$/.test(r)) { const [M,m] = r.slice(1).split('.').map(Number); const [RM,Rm] = resolved.split('.').map(Number); return RM===M && Rm>=m; }
    if (/^~\d+\.\d+\.\d+$/.test(r)) { const [M,m,p] = r.slice(1).split('.').map(Number); const [RM,Rm,Rp]=resolved.split('.').map(Number); return RM===M && Rm===m && Rp>=p; }
    return resolved.startsWith(r.replace(/[^\d].*$/,''));
  })();
  if (!ok) problems.push(`${g.name}: manifest=${r} lockfile=${resolved}`);
}
if (problems.length) {
  console.error('❌ Lockfile drift detected:'); problems.forEach(p => console.error(' -', p));
  console.error('Fix: run "pnpm -r install" and commit updated pnpm-lock.yaml'); process.exit(1);
}
console.log('✅ Lockfile/manifest alignment OK for guarded packages.');
