#!/usr/bin/env node
// Guard against Pages Router files that conflict with App Router routes.
import { execSync } from 'node:child_process';

const files = execSync('git ls-files "apps/frontend/pages/**/*.*"', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// Only check for page route conflicts, not API routes (which can coexist)
const conflicts = files.filter(f =>
  /(dashboard|login|deposit|withdraw)\.(tsx|jsx|ts|js)$/.test(f) && !f.includes('/api/')
);

if (conflicts.length) {
  console.error('❌ Pages Router conflicts detected, remove these files:\n' + conflicts.join('\n'));
  console.error('\nThese routes should use App Router (app/*) instead of Pages Router (pages/*).');
  process.exit(1);
}

console.log('✅ No Pages Router route conflicts detected.');

