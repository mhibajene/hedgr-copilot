import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./guard-workflows.mjs', import.meta.url));
const pinnedSetupNode = '49933ea5288caeca8642d1e84afbd3f7d6820020';
const diagnostic = 'setup-node uses cache: pnpm (forbidden; enable Corepack first)';

function runGuard(t, ref, cache) {
  const root = mkdtempSync(path.join(tmpdir(), 'identity-001-workflow-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, '.github', 'workflows'), { recursive: true });
  writeFileSync(path.join(root, '.nvmrc'), '24.22.1\n');
  writeFileSync(path.join(root, '.github', 'workflows', 'fixture.yml'), `name: Fixture
on: workflow_dispatch
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@${ref}
        with:
          node-version: 24.22.1
          cache: ${cache}
`);
  const result = spawnSync(process.execPath, [guard], {
    cwd: root,
    encoding: 'utf8',
    timeout: 10_000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}

test('pinned setup-node rejects forbidden pnpm caching', t => {
  const result = runGuard(t, `${pinnedSetupNode} # v4`, 'pnpm');
  assert.equal(result.status, 1, JSON.stringify(result));
  assert.ok(result.stderr.includes(diagnostic), result.stderr);
});

test('valid pinned setup-node passes the actual guard', t => {
  const result = runGuard(t, `${pinnedSetupNode} # v4`, 'npm');
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes('Workflow guard OK'), result.stdout);
});

test('tag-based setup-node still rejects forbidden pnpm caching', t => {
  const result = runGuard(t, 'v4', 'pnpm');
  assert.equal(result.status, 1, result.stderr);
  assert.ok(result.stderr.includes(diagnostic), result.stderr);
});
