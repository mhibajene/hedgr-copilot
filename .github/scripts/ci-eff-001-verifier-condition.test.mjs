import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const read = (name) => readFileSync(new URL(`../workflows/${name}`, import.meta.url), 'utf8');
const verifier = read('verifier-gate.yml');
const condition = (text) => text.match(/^    if: >-\n((?:      .+\n)+)/m)[1].trim();
const eligible = (text, github) => Boolean(runInNewContext(condition(text)
  .replace('labels.*.name', 'labels.map(label => label.name)'), {
  github,
  contains: (value, search) => value?.includes(search) ?? false,
}));
const binding = verifier.split('          script: |\n')[1];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const bind = new AsyncFunction('github', 'context', 'core', binding.replace(/^            /gm, ''));
const head = '1234567890abcdef1234567890abcdef12345678';
const event = (action, body, isPr = true) => ({
  event_name: 'issue_comment',
  event: { action, issue: { pull_request: isPr ? {} : undefined }, comment: { body } },
});

async function status(comments) {
  const written = [];
  const listComments = () => {};
  await bind({
    rest: {
      pulls: { get: async (args) => {
        assert.equal(args.pull_number, 1);
        return { data: { head: { sha: head, repo: { full_name: 'example/example' } } } };
      } },
      issues: { listComments },
      repos: { createCommitStatus: async (value) => written.push(value) },
    },
    paginate: async (method, args) => {
      assert.equal(method, listComments);
      assert.equal(args.per_page, 100);
      return comments;
    },
  }, { repo: { owner: 'example', repo: 'example' }, eventName: 'issue_comment', payload: { issue: { number: 1 } } },
  { info() {}, warning() {}, setFailed: assert.fail });
  assert.equal(written.length, 1);
  assert.equal(written[0].sha, head);
  assert.equal(written[0].context, 'hedgr/verifier');
  return written[0];
}

test('CI-EFF-001 verifier binding script is unchanged', () => {
  assert.equal(createHash('sha256').update(binding).digest('hex'), 'ef8dc2e1fe7ffca269902bf482349e0b013cf547682bb200825b4039e3246eef');
});

test('CI-EFF-001 verifier processes PR events and every edited PR comment', () => {
  for (const action of ['opened', 'synchronize', 'reopened', 'ready_for_review']) {
    assert.ok(eligible(verifier, { event_name: 'pull_request', event: { action } }));
  }
  assert.ok(eligible(verifier, event('edited', 'ordinary comment')));
  assert.ok(eligible(verifier, event('edited', '')));
  assert.ok(eligible(verifier, event('created', 'Hedgr-Verifier:')));
  assert.equal(eligible(verifier, event('created', 'ordinary comment')), false);
  assert.equal(eligible(verifier, event('created', '')), false);
  assert.equal(eligible(verifier, event('edited', 'Hedgr-Verifier:', false)), false);
});

for (const result of ['PASS', 'FAIL']) {
  test(`CI-EFF-001 edited ${result} marker removal returns current head to pending`, async () => {
    const comment = {
      id: 1, author_association: 'OWNER', updated_at: '2026-01-01T00:00:00Z',
      body: `Hedgr-Verifier: ${result} sha=${head} run=https://github.com/example/example/actions/runs/1`,
    };
    assert.ok(eligible(verifier, event('created', comment.body)));
    const before = await status([comment]);
    assert.equal(before.state, result === 'PASS' ? 'success' : 'failure');
    const edited = { ...comment, body: 'CI-EFF-001 comment updated', updated_at: '2026-01-01T00:01:00Z' };
    assert.ok(eligible(verifier, event('edited', edited.body)));
    const after = await status([edited]);
    assert.equal(after.state, 'pending');
    assert.equal(after.description, 'Verification required: no PASS on current head');
    assert.equal(after.target_url, undefined);
  });
}

test('CI-EFF-001 evidence-pack event condition', () => {
  const workflow = read('agent-evidence-pack.yml');
  const event = (action, labels, label) => ({ event: {
    action, pull_request: { labels: labels.map((name) => ({ name })) }, label: { name: label },
  } });
  for (const action of ['opened', 'edited', 'synchronize']) {
    assert.ok(eligible(workflow, event(action, ['source:agent'])));
    assert.equal(eligible(workflow, event(action, [])), false);
  }
  assert.ok(eligible(workflow, event('labeled', ['source:agent'], 'source:agent')));
  assert.equal(eligible(workflow, event('unlabeled', [], 'source:agent')), false);
  for (const action of ['labeled', 'unlabeled']) {
    assert.equal(eligible(workflow, event(action, ['source:agent'], 'area:ci')), false);
  }
});

test('CI-EFF-001 E2E reporters and cache paths are mutually exclusive', () => {
  const e2e = read('e2e-smoke.yml');
  const step = (name) => e2e.split(`      - name: ${name}\n`)[1]?.split(/\n      - name: /)[0];
  const enabled = (name, docsOnly, cacheHit, success = true, failure = false, cancelled = false) => {
    const expression = step(name).match(/^        if: \$\{\{ (.+) \}\}/m)[1]
      .replaceAll('steps.classify.outputs.docs_only', 'docsOnly')
      .replaceAll('steps.playwright_cache.outputs.cache-hit', 'cacheHit');
    return runInNewContext(expression, { docsOnly, cacheHit, success: () => success, failure: () => failure, cancelled: () => cancelled });
  };
  for (const docsOnly of ['true', 'false', undefined]) {
    assert.equal(enabled('Report E2E status (docs-only)', docsOnly), docsOnly === 'true');
    assert.equal(enabled('Report E2E status (success)', docsOnly), docsOnly !== 'true');
    for (const hit of ['true', 'false', undefined]) {
      assert.equal(enabled('Install Playwright system dependencies', docsOnly, hit), docsOnly !== 'true' && hit === 'true');
      assert.equal(enabled('Install Playwright', docsOnly, hit), docsOnly !== 'true' && hit !== 'true');
    }
    assert.equal(enabled('Report E2E status (success)', docsOnly, '', false), false);
    assert.equal(enabled('Report E2E status (docs-only)', docsOnly, '', false), false);
    assert.ok(enabled('Report E2E status (failure)', docsOnly, '', false, false, true));
  }
});
