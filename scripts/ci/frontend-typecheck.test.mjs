import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const frontend = join(root, 'apps/frontend');
const require = createRequire(join(frontend, 'package.json'));
const ts = require('typescript');
const compiler = require.resolve('typescript/bin/tsc');
const boundedTests = ['dashboard.page.test.tsx', 'home-small-fixes.test.tsx', 'withdraw.page.test.tsx'];
const read = (path) => readFileSync(path, 'utf8');
const json = (path) => JSON.parse(read(path));

function compile(cwd, config, extra = []) {
  const result = spawnSync(process.execPath, [compiler, '-p', config, '--noEmit', '--pretty', 'false', ...extra], {
    cwd, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024,
  });
  assert.ifError(result.error);
  assert.notEqual(result.status, null, result.stderr);
  return { status: result.status, output: result.stdout + result.stderr };
}

function disposableCopy(run) {
  const scratch = mkdtempSync(join(tmpdir(), 'hedgr-frontend-typecheck-'));
  try {
    const copy = join(scratch, 'frontend');
    cpSync(frontend, copy, {
      recursive: true,
      filter: (path) => !relative(frontend, path).split(/[\\/]/).some((part) =>
        ['node_modules', '.next', 'test-results', 'playwright-report'].includes(part) || part.endsWith('.tsbuildinfo')),
    });
    symlinkSync(join(frontend, 'node_modules'), join(copy, 'node_modules'), 'dir');
    return run(copy);
  } finally {
    // This directory is created by this invocation; never clean a checkout or shared directory.
    rmSync(scratch, { recursive: true, force: true });
  }
}

function productionLibFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : productionLibFiles(path);
    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [path] : [];
  }).sort();
}

test('OPS lib typecheck includes unreachable Engine and lib modules', () => {
  // On the tests-only red commit, interrogate the existing app check, not absent dependencies.
  const config = existsSync(join(frontend, 'tsconfig.lib.json')) ? 'tsconfig.lib.json' : 'tsconfig.json';
  const result = compile(frontend, config, ['--listFilesOnly']);
  assert.equal(result.status, 0, result.output);
  const checked = new Set(result.output.trim().split(/\r?\n/).map((path) => resolve(path)));
  const files = productionLibFiles(join(frontend, 'lib'));
  const missing = files.filter((path) => !checked.has(path)).map((path) => relative(frontend, path));
  console.log(`Production lib coverage: ${files.length - missing.length}/${files.length}; Engine: ${files.filter((path) => path.includes('/lib/engine/')).length}`);
  assert.deepEqual(missing, [], `Unchecked production modules: ${missing.join(', ')}`);
  for (const path of files) console.log(`checked: ${relative(frontend, path)}`);
  const appOptions = ts.getParsedCommandLineOfConfigFile(join(frontend, 'tsconfig.json'), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: assert.fail }).options;
  const libOptions = ts.getParsedCommandLineOfConfigFile(join(frontend, config), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: assert.fail }).options;
  assert.deepEqual({ ...libOptions, incremental: appOptions.incremental, configFilePath: appOptions.configFilePath }, appOptions);
  assert.equal(libOptions.noEmit, true);
  assert.equal(libOptions.incremental, false);
});

for (const directory of ['lib/engine', 'lib']) {
  test(`OPS lib typecheck rejects and then accepts an unimported ${directory} fixture`, () => disposableCopy((copy) => {
    const fixture = join(copy, directory, 'ops-unimported-typecheck-fixture.ts');
    writeFileSync(fixture, 'export const opsCoverageFixture: number = "broken";\n');
    const script = json(join(copy, 'package.json')).scripts['typecheck:lib'] ? 'typecheck:lib' : 'typecheck';
    const run = () => {
      const result = spawnSync('pnpm', ['run', script], { cwd: copy, encoding: 'utf8', timeout: 120_000 });
      assert.ifError(result.error);
      assert.notEqual(result.status, null, result.stderr);
      return { status: result.status, output: result.stdout + result.stderr };
    };
    const broken = run();
    assert.notEqual(broken.status, 0, `The ${script} command accepted a real unimported assignment error`);
    assert.match(broken.output, /ops-unimported-typecheck-fixture\.ts\(1,14\): error TS2322/);
    assert.equal((broken.output.match(/error TS\d+/g) ?? []).length, 1, broken.output);
    writeFileSync(fixture, 'export const opsCoverageFixture: number = 1;\n');
    const fixed = run();
    assert.equal(fixed.status, 0, fixed.output);
    console.log(`${directory}: actual ${script} rejects TS2322, then passes after fixture-only correction`);
  }));
}

test('OPS bounded test typecheck clears inherited fixture and env errors', () => disposableCopy((copy) => {
  const config = 'tsconfig.test-types.json';
  // A prospective check on red makes the inherited diagnostics visible before implementation.
  if (!existsSync(join(copy, config))) {
    writeFileSync(join(copy, config), JSON.stringify({
      extends: './tsconfig.json', compilerOptions: { incremental: false, types: ['vitest/globals', 'node'] },
      include: [...boundedTests.map((file) => `__tests__/${file}`), 'types/**/*.d.ts'], exclude: ['node_modules'],
    }));
  }
  const parsed = ts.getParsedCommandLineOfConfigFile(join(copy, config), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: assert.fail });
  assert.deepEqual(parsed.fileNames.filter((path) => path.includes('/__tests__/')).map((path) => relative(copy, path)).sort(), boundedTests.map((file) => `__tests__/${file}`).sort());
  assert.equal(parsed.options.strict, true);
  assert.equal(parsed.options.noEmit, true);
  assert.equal(parsed.options.incremental, false);
  assert.deepEqual(parsed.options.types, ['vitest/globals', 'node']);
  const result = compile(copy, config);
  const counts = Object.fromEntries(boundedTests.map((file) => [file, result.output.split('\n').filter((line) => line.startsWith(`__tests__/${file}(`) && line.includes('error TS')).length]));
  console.log(`Bounded diagnostics: ${JSON.stringify(counts)}\n${result.output}`);
  assert.equal(result.status, 0, result.output);
  assert.deepEqual(counts, Object.fromEntries(boundedTests.map((file) => [file, 0])));
}));

test('OPS typecheck remains on validate and hosted CI paths', () => {
  const scripts = json(join(frontend, 'package.json')).scripts;
  assert.equal(scripts['typecheck:lib'], 'tsc -p tsconfig.lib.json --noEmit');
  assert.equal(scripts['typecheck:test-types'], 'tsc -p tsconfig.test-types.json --noEmit');
  assert.equal(scripts['typecheck:coverage'], 'node --test ../../scripts/ci/frontend-typecheck.test.mjs');
  assert.deepEqual(scripts.typecheck.split(' && '), [
    'tsc -p tsconfig.json --noEmit', 'tsc -p tsconfig.vitest.json --noEmit',
    'pnpm typecheck:lib', 'pnpm typecheck:test-types', 'pnpm typecheck:coverage',
  ]);
  const workspace = json(join(root, 'package.json')).scripts;
  assert.equal(workspace.typecheck, 'pnpm -r --if-present run typecheck');
  assert.ok(workspace.validate.split(' && ').includes('pnpm -w typecheck'));
  for (const workflow of ['validate.yml', 'ci.yml', 'e2e-smoke.yml']) {
    assert.match(read(join(root, '.github/workflows', workflow)), /name: Typecheck \(workspace\)\s+run: pnpm -w typecheck/);
  }
});

test('OPS auto-merge recovery retains exact-head gates', () => {
  const section = read(join(root, 'docs/ops/runbook.md')).split('### Stalled auto-merge recovery')[1]?.split('\n### ')[0] ?? '';
  // Exercise documentation predicates hermetically: losing any one prerequisite must reject the recipe.
  const predicates = [/about five minutes/, /unchanged head/, /current independent PASS/, /all required checks green/, /up-to-date.*CLEAN/, /owner-account/, /disable\/re-enable.*once/, /observe.*merge/, /Never direct\/admin merge/, /root cause.*unproven/];
  const eligible = (text) => predicates.every((predicate) => predicate.test(text));
  assert.ok(eligible(section), 'Recovery must retain every evidence predicate and stop boundary');
  for (const predicate of predicates) assert.equal(eligible(section.replace(new RegExp(predicate.source, 'g'), 'missing evidence')), false);
});

test('OPS Vercel diagnosis is evidence-bounded', () => {
  const section = read(join(root, 'docs/ops/runbook.md')).split('### Vercel Git-info diagnosis')[1]?.split('\n### ')[0] ?? '';
  for (const evidence of ['dpl_2NDERTw7vbtmznaSaw5CAcFCQ6EB', 'dpl_2aKnkWeZRTmRdVjufGNbJNyzZXTf', '932233c', 'd6b02cd', 'git_info_fail', 'no build events', 'non-required', 'unresolved', 'No repo-file cause', 'vercel.json']) assert.ok(section.includes(evidence), evidence);
  assert.match(section, /stop.*separately confirmed external proposal/);
});

test('OPS verifier run URL is exact-head hosted E2E', () => {
  const runbook = read(join(root, 'docs/ops/runbook.md'));
  for (const result of ['PASS', 'FAIL']) assert.ok(runbook.includes(`Hedgr-Verifier: ${result} sha=<40-hex head sha> run=<exact-head hosted GitHub Actions E2E run URL>`));
  assert.match(runbook, /run=.*always the exact-head hosted GitHub Actions E2E run URL/);
  assert.match(runbook, /confirm that run's head and applicable E2E result before PASS/);
  assert.match(runbook, /For a PR whose exact head the CI-EFF-001 classifier marks docs-only/);
  assert.ok(runbook.includes('SKIPPED (docs-only, E2E not executed) CI-EFF-001'));
  assert.match(runbook, /Verifier must independently confirm the diff is docs-only under the recorded rule/);
  assert.match(runbook, /Every other PR, including any runtime, CI, test or script change and the CI-EFF-001 implementation PR itself, requires successful full exact-head hosted E2E/);
  assert.match(runbook, /A SKIPPED result is never described as executed or passed E2E/);
  assert.match(runbook, /docs-only exception takes practical effect only once the classifier is on main/);
  assert.match(runbook, /Immediately before posting, the Verifier re-reads the current PR head SHA and aborts without posting if it differs/);
});
