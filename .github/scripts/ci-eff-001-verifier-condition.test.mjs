import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import '../../scripts/verifier/admission.test.mjs';
import { runInNewContext } from 'node:vm';

const read = (name) => readFileSync(new URL(`../workflows/${name}`, import.meta.url), 'utf8');
const verifier = read('verifier-gate.yml');
const condition = (text) => text.match(/^    if: >-\n((?:      .+\n)+)/m)[1].trim();
const eligible = (text, github) => Boolean(runInNewContext(condition(text)
  .replace('labels.*.name', 'labels.map(label => label.name)'), {
  github, contains: (value, search) => value?.includes(search) ?? false,
}));
const source = verifier.split('          script: |\n')[1].replace(/^            /gm, '');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const head = '1'.repeat(40); const old = '2'.repeat(40); const base = '3'.repeat(40);
const iris = 353659287; // Confirmed public bot-user mapping, distinct from App ID.
const time = '2026-11-09T12:00:00Z';
const raw = () => ({ id: 5, context: 'hedgr/verifier', state: 'success', created_at: time,
  creator: { id: iris, type: 'Bot' }, description: 'v1 PASS pr=1 run=fixture author=hedgr-dex[bot] starter=216588125' });
const comment = () => ({ id: 1, author_association: 'OWNER', created_at: time, updated_at: time,
  body: `Hedgr-Verifier: PASS sha=${head} run=https://github.com/example/example/actions/runs/1` });
const pr = () => ({ number: 1, state: 'open', commits: 1,
  user: { id: 347652043, login: 'hedgr-dex[bot]' },
  head: { sha: head, repo: { full_name: 'example/example' } },
  base: { ref: 'main', sha: base, repo: { full_name: 'example/example' } } });
async function evaluate(options = {}) {
  const writes = []; const reads = []; let gets = 0; let statusGets = 0; let commentGets = 0;
  const response = (data, headers = {}) => ({ status: 200, data, headers });
  const current = options.pr ?? pr();
  const github = { rest: {
    pulls: {
      get: async () => response(++gets > 1 && options.fresh ? options.fresh : current),
      list: async () => response([current]),
      listCommits: async () => options.incomplete ?? response([{ sha: head, author: { id: 347652043 }, committer: { id: 347652043 } }]),
    },
    issues: { listComments: async () => response(++commentGets > 1 && options.freshComments ? options.freshComments : options.comments ?? [comment()]) },
    repos: {
      listCommitStatusesForRef: async (args) => {
        reads.push(args.ref); statusGets++;
        const attestation = options.raws ?? (options.raw === null ? [] : [options.raw ?? raw()]);
        return response([...(options.history ?? []), ...(options.revoke && statusGets > 1 ? [{ ...raw(), id: 20, state: 'failure' }] : attestation), {
          id: 4, context: 'E2E smoke (@hedgr/frontend)', state: 'success', created_at: time,
          creator: { id: 41898282 }, target_url: 'https://github.com/example/example/actions/runs/1',
        }]);
      },
      createCommitStatus: async (s) => {
        writes.push(s);
        if (options.history) options.history.push({ ...s, id: 100 + options.history.length,
          created_at: options.now, creator: { id: 41898282, type: 'Bot' } });
      },
    },
    actions: { getWorkflowRun: async () => response({ head_sha: options.e2eHead ?? head,
      status: 'completed', conclusion: 'success', path: '.github/workflows/e2e-smoke.yml',
      event: 'pull_request', repository: { full_name: 'example/example' } }) },
  } };
  const code = source.replace("const TRANSITION_MODE = 'legacy'", `const TRANSITION_MODE = '${options.mode ?? 'iris'}'`)
    .replace('const IRIS_BOT_USER_ID = 353659287', `const IRIS_BOT_USER_ID = ${options.unknown ? 'null' : iris}`);
  await new AsyncFunction('github', 'context', 'core', code)(github, {
    repo: { owner: 'example', repo: 'example' }, eventName: options.event ?? 'pull_request_target',
    payload: options.payload ?? { pull_request: { number: 1, head: { sha: old } } },
  }, { info() {} });
  for (const s of writes) { assert.equal(s.sha, head); assert.equal(s.target_url, undefined); }
  return { writes, reads, policy: writes.find((w) => w.context === 'hedgr/verifier-policy') };
}

test('PR B actual inline policy accepts exact-head Iris metadata and never writes raw after cutover', async () => {
  const r = await evaluate(); assert.equal(r.policy.state, 'success');
  assert.deepEqual([...new Set(r.reads)], [head]);
  assert.equal(r.writes.some((w) => w.context === 'hedgr/verifier'), false);
});
for (const [login, id, type] of [['mhibajene',216588125,'User'], ['github-actions[bot]',41898282,'Bot'], ['cursor[bot]',123,'Bot'], ['wrong-app[bot]',5653778,'Bot']]) {
  test(`PR B identical PASS by ${login} rejects`, async () => {
    assert.equal((await evaluate({ raw: { ...raw(), creator: { login, id, type } } })).policy.state, 'failure');
  });
}
test('PR B unknown Iris mapping rejects', async () => assert.equal((await evaluate({ unknown: true })).policy.state, 'failure'));
test('PR B stale-head PASS cannot satisfy newly fetched head', async () => assert.equal((await evaluate({ raw: null })).policy.state, 'failure'));
test('PR B OWNER PASS after cutover is only legacy evidence', async () => {
  const r = await evaluate({ raw: null }); assert.equal(r.policy.state, 'failure');
  assert.equal(r.writes.find((w) => w.context === 'hedgr/verifier-legacy').state, 'success');
  assert.equal(r.writes.some((w) => w.context === 'hedgr/verifier'), false);
});
test('PR B transition retains effective binder only before cutover', async () => {
  assert.equal((await evaluate({ mode: 'legacy' })).writes.find((w) => w.context === 'hedgr/verifier').state, 'success');
});
for (const result of ['PASS', 'FAIL']) {
  test(`CI-EFF-001 edited ${result} marker removal returns legacy current head to pending`, async () => {
    const c = { ...comment(), body: comment().body.replace('PASS', result) };
    assert.equal((await evaluate({ comments: [c] })).writes.find((s) => s.context === 'hedgr/verifier-legacy').state, result === 'PASS' ? 'success' : 'failure');
    const edited = { ...c, body: 'CI-EFF-001 comment updated', updated_at: '2026-11-09T12:01:00Z' };
    assert.equal((await evaluate({ comments: [edited] })).writes.find((s) => s.context === 'hedgr/verifier-legacy').state, 'pending');
  });
}
test('PR B edited legacy PASS is pending', async () => {
  const r = await evaluate({ comments: [{ ...comment(), updated_at: '2026-11-09T12:01:00Z' }] });
  assert.equal(r.writes.find((s) => s.context === 'hedgr/verifier-legacy').state, 'pending');
});
for (const change of [{ state: 'pending' }, { state: 'failure' }, { description: 'invalid' }, { target_url: 'https://example.test' },
  { description: raw().description.replace('starter=216588125','starter=347652043') },
  { description: raw().description.replace('pr=1','pr=2') }]) {
  test(`PR B invalid latest raw status ${JSON.stringify(change)} rejects`, async () => assert.equal((await evaluate({ raw: { ...raw(), ...change } })).policy.state, 'failure'));
}
test('PR B incomplete commit API response rejects', async () => assert.equal((await evaluate({ incomplete: { status: 200, data: [] } })).policy.state, 'failure'));
test('PR B head race aborts output', async () => assert.rejects(evaluate({ fresh: { ...pr(), head: { ...pr().head, sha: old } } }), /changed/));
test('PR B later revocation wins', async () => assert.equal((await evaluate({ revoke: true })).policy.state, 'failure'));
test('PR B old E2E head rejects', async () => assert.equal((await evaluate({ e2eHead: old })).policy.state, 'failure'));
test('PR B status events cannot trigger themselves recursively', async () => {
  for (const name of ['hedgr/verifier-policy', 'hedgr/verifier-legacy']) {
    assert.equal(eligible(verifier, { event_name: 'status', event: { context: name } }), false);
    assert.deepEqual((await evaluate({ event: 'status', payload: { context: name } })).writes, []);
  }
  const r = await evaluate({ mode: 'legacy', event: 'status', payload: { context: 'hedgr/verifier', sha: head } });
  assert.equal(r.writes.some((w) => w.context === 'hedgr/verifier'), false);
});
test('PR B default-branch event and least-permission constraints', () => {
  assert.match(verifier, /pull_request_target:/); assert.doesNotMatch(verifier, /^  pull_request:/m);
  assert.doesNotMatch(verifier, /actions\/checkout|secrets\./);
  assert.doesNotMatch(source, /\$\{\{/);
  assert.doesNotMatch(verifier, /^  (contents|checks|actions): write/m);
  for (const action of ['created','edited','deleted']) assert.ok(eligible(verifier, { event_name: 'issue_comment', event: { action, issue: { pull_request: {} } } }));
  assert.equal(eligible(verifier, { event_name: 'issue_comment', event: { issue: {} } }), false);
});

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

const concurrencyBlock = () => {
  assert.doesNotMatch(verifier, /^concurrency:/m, 'No workflow-wide pending slot');
  const block = verifier.match(/^    concurrency:\n((?:      .+\n)+)/m)?.[1];
  assert.ok(block, 'Eligible job has concurrency');
  assert.match(block, /^      cancel-in-progress: false$/m);
  assert.match(block, /^      queue: max$/m);
  assert.doesNotMatch(block, /cancel-in-progress: true|queue: single|title|body|head_ref/);
  return block;
};
const concurrencyGroup = (github) => concurrencyBlock().match(/^      group: (.+)$/m)[1]
  .replace(/\$\{\{(.*?)\}\}/g, (_, expression) => String(runInNewContext(expression, {
    github, format: (pattern, value) => pattern.replace('{0}', String(value)),
  })));
const queueEvent = (name, number, extra = {}) => ({ repository: 'example/example', event_name: name,
  run_id: 99, event: { pull_request: { number }, issue: { number }, ...extra } });
test('PR B job queues bind PR and comment events to the same PR, with separate SHA groups', () => {
  const pull = concurrencyGroup(queueEvent('pull_request_target', 1));
  assert.equal(pull, 'verifier-policy-example/example-pr-1');
  assert.equal(concurrencyGroup(queueEvent('issue_comment', 1)), pull);
  assert.notEqual(concurrencyGroup(queueEvent('issue_comment', 2)), pull);
  const status = concurrencyGroup(queueEvent('status', undefined, { sha: head }));
  assert.equal(status, `verifier-policy-example/example-status-${head}`);
  assert.notEqual(status, pull);
  assert.notEqual(concurrencyGroup(queueEvent('status', undefined, { sha: old })), status);
  assert.equal(concurrencyGroup(queueEvent('status')), 'verifier-policy-example/example-status-99');
});
test('PR B pending FAIL, edit and delete remain queued; unrelated events cannot cancel them', async () => {
  concurrencyBlock(); // Actual queue=max / cancel=false contract, within GitHub queue capacity.
  const key = concurrencyGroup(queueEvent('issue_comment', 1));
  const queued = [];
  const mutations = [
    { name: 'FAIL', comments: [comment(), { ...comment(), id: 2,
      updated_at: '2026-11-09T12:02:00Z', created_at: '2026-11-09T12:02:00Z',
      body: comment().body.replace('PASS', 'FAIL') }], action: 'created', state: 'failure' },
    { name: 'edit', comments: [{ ...comment(), body: 'marker removed', updated_at: '2026-11-09T12:03:00Z' }], action: 'edited', state: 'failure' },
    { name: 'delete', comments: [], action: 'deleted', state: 'failure' },
  ];
  // Model queue=max preserving all pending entries, instead of replacing its sole slot.
  for (const mutation of mutations) queued.push({ ...mutation, group: key });
  const other = concurrencyGroup(queueEvent('issue_comment', 2));
  assert.notEqual(other, key);
  assert.equal(eligible(verifier, { event_name: 'status', event: { context: 'Vercel' } }), false);
  assert.equal(eligible(verifier, { event_name: 'issue_comment', event: { issue: {} } }), false);
  assert.deepEqual(queued.map((entry) => entry.name), ['FAIL', 'edit', 'delete']);
  for (const entry of queued) {
    const result = await evaluate({ mode: 'legacy', event: 'issue_comment', comments: entry.comments,
      payload: { issue: { number: 1 }, action: entry.action, comment: { body: comment().body } } });
    assert.equal(result.writes.find((status) => status.context === 'hedgr/verifier').state, entry.state);
  }
});
test('PR B a delayed older event still evaluates the newest FAIL comment and raw status', async () => {
  const fail = { ...comment(), id: 2, created_at: '2026-11-09T12:04:00Z', updated_at: '2026-11-09T12:04:00Z', body: comment().body.replace('PASS', 'FAIL') };
  const result = await evaluate({ mode: 'legacy', event: 'issue_comment', comments: [fail, comment()],
    raws: [{ ...raw(), id: 6, state: 'failure' }, raw()],
    payload: { issue: { number: 1 }, action: 'created', comment: { body: comment().body } } });
  assert.equal(result.writes.find((status) => status.context === 'hedgr/verifier').state, 'failure');
  assert.equal(result.policy.state, 'failure');
});

const at = (minute) => `2026-11-09T12:${minute}:00Z`;
const failComment = () => ({ ...comment(), id: 2, created_at: at('02'), updated_at: at('02'),
  body: comment().body.replace('PASS', 'FAIL') });
const legacyOutputs = (result) => result.writes.filter((s) => ['hedgr/verifier', 'hedgr/verifier-legacy'].includes(s.context));
const assertLegacy = (result, state) => {
  assert.equal(legacyOutputs(result).length, 2);
  for (const status of legacyOutputs(result)) assert.equal(status.state, state, status.context);
};
test('F1 older PASS then newer FAIL writes failure in both legacy contexts', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null, comments: [comment(), failComment()] }), 'failure');
});
test('F1 editing newer FAIL to remove its marker cannot revive older PASS, even without edit history', async () => {
  const edited = { ...failComment(), body: 'marker removed', updated_at: at('03') };
  for (const changes of [undefined, { body: { from: failComment().body } }]) {
    assertLegacy(await evaluate({ mode: 'legacy', raw: null, event: 'issue_comment', comments: [comment(), edited],
      payload: { issue: { number: 1 }, action: 'edited', comment: edited, changes } }), 'failure');
  }
});
test('F1 deleting newer FAIL cannot revive older PASS', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null, event: 'issue_comment', comments: [comment()],
    payload: { issue: { number: 1 }, action: 'deleted', comment: failComment() } }), 'failure');
});
for (const action of ['edited', 'deleted']) {
  test(`F1 unrelated later events after ${action} revocation stay failure; fresh PASS can recover`, async () => {
    const history = [];
    const edited = { ...failComment(), body: 'marker removed', updated_at: at('03') };
    const comments = action === 'edited' ? [comment(), edited] : [comment()];
    const run = (options, now) => evaluate({ mode: 'legacy', raw: null, history, comments, now, ...options });
    assertLegacy(await run({ comments: [comment(), failComment()] }, at('02')), 'failure');
    assertLegacy(await run({ event: 'issue_comment', payload: { issue: { number: 1 }, action,
      comment: action === 'edited' ? edited : failComment(), changes: { body: { from: failComment().body } } } }, at('03')), 'failure');
    for (const options of [{}, { event: 'issue_comment', payload: { issue: { number: 1 }, action: 'created', comment: { body: 'unrelated' } } },
      { event: 'issue_comment', payload: { issue: { number: 1 }, action: 'edited', comment: { body: 'unrelated edit' }, changes: { body: { from: 'unrelated' } } } }]) {
      assertLegacy(await run(options, at('04')), 'failure');
    }
    const statusEvent = await run({ event: 'status', payload: { context: 'hedgr/verifier', sha: head } }, at('04'));
    assert.equal(statusEvent.writes.find((s) => s.context === 'hedgr/verifier-legacy').state, 'failure');
    assert.equal(statusEvent.writes.some((s) => s.context === 'hedgr/verifier'), false);
    const fresh = { ...comment(), id: 3, created_at: at('05'), updated_at: at('05') };
    assertLegacy(await run({ comments: [...comments, fresh] }, at('06')), 'success');
    assertLegacy(await run({ comments: [...comments, fresh] }, at('07')), 'success');
  });
}
for (const context of ['hedgr/verifier', 'hedgr/verifier-legacy']) {
  test(`F1 ${context} non-success history blocks older and same-second PASS despite newer success`, async () => {
    for (const state of ['failure', 'pending', 'error']) {
      for (const created_at of [time, at('01')]) {
        const history = [{ ...raw(), id: 6, context, state, created_at }, { ...raw(), id: 7, context, created_at: at('02') }];
        assertLegacy(await evaluate({ mode: 'legacy', raw: null, history, now: at('03') }), 'failure');
      }
    }
  });
}
test('F1 edited PASS cannot recover from recorded revocation', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null,
    history: [{ ...raw(), id: 6, state: 'failure', created_at: at('01') }], now: at('04'),
    comments: [comment(), { ...comment(), id: 3, created_at: at('02'), updated_at: at('03') }] }), 'pending');
});
test('F1 editing a marker-bearing PASS writes failure even when current text still says PASS', async () => {
  const edited = { ...comment(), updated_at: at('03') };
  assertLegacy(await evaluate({ mode: 'legacy', raw: null, comments: [edited], event: 'issue_comment',
    payload: { issue: { number: 1 }, action: 'edited', comment: edited, changes: { body: { from: comment().body } } } }), 'failure');
});
test('F1 revocation arriving during evaluation is re-read before legacy success', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null, revoke: true }), 'failure');
});
test('F1 FAIL removed during evaluation cannot upgrade that run to older PASS', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null,
    comments: [comment(), failComment()], freshComments: [comment()] }), 'failure');
});
test('F1 edited PASS arriving during evaluation is re-read before output', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null,
    freshComments: [{ ...comment(), updated_at: at('03') }] }), 'pending');
});
test('F1 invalid revocation metadata fails closed', async () => {
  assertLegacy(await evaluate({ mode: 'legacy', raw: null,
    history: [{ ...raw(), id: 6, state: 'failure', created_at: 'invalid' }], now: at('04') }), 'failure');
});
