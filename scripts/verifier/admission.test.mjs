import assert from 'node:assert/strict';
import test from 'node:test';
import { admitReview, guardPublication, collectPages, identities } from './admission.mjs';
const h = '1'.repeat(40), b = '2'.repeat(40);
const now = Date.parse('2026-11-09T13:00:00Z');
const config = { ...identities, irisUser: 999999 };
function fixture() {
  const payload = { schema: 'v1', repository_id: 101, pr: 1, head: h, base: b,
    nonce: '0123456789abcdef', expires_at: '2026-11-10T12:00:00Z' };
  const request = { id: 1, user: { id: 216588125, type: 'User' }, performed_via_github_app: null,
    created_at: '2026-11-09T12:00:00Z', updated_at: '2026-11-09T12:00:00Z', body: JSON.stringify(payload) };
  const bot = { id: config.dex.user, login: config.dex.login, type: 'Bot' };
  const pr = { number: 1, state: 'open', user: bot, commits: 1,
    head: { sha: h, repo: { id: 101 } }, base: { sha: b, ref: 'main', repo: { id: 101 } } };
  const commit = { sha: h, author: { ...bot }, committer: { ...bot }, commit: { verification: {
    verified: true, reason: 'valid', signature: '-----BEGIN PGP SIGNATURE-----\nfixture', payload: 'fixture signed payload' } } };
  const api = { getRequest: async () => request, getPR: async () => pr,
    listCommits: async () => ({ status: 200, headers: {}, data: [{ sha: h }] }), getCommit: async () => commit };
  return { payload, request, pr, commit, api, config, repositoryId: 101, commentId: 1,
    runId: 'fixture', now, state: { schema: 'v1', used: [], active: {} } };
}
test('Iris main admission and publication guards accept authenticated independent request', async () => {
  const f = fixture(), result = await admitReview(f);
  assert.equal(result.reservation.head, h); assert.equal(result.nextState.used.length, 1);
  assert.deepEqual(await guardPublication({ ...f, reservation: result.reservation, state: result.nextState }), result.reservation);
});
const negatives = [
  ['unknown Iris mapping', (f) => { f.config = { ...identities, irisUser: null }; }],
  ['edited request', (f) => { f.request.updated_at = '2026-11-09T12:01:00Z'; }],
  ['expired request', (f) => { f.now += 86400000; }],
  ['request validity beyond 24h', (f) => { f.payload.expires_at = '2026-11-11T12:00:00Z'; f.request.body = JSON.stringify(f.payload); }],
  ['ops-dex requesting hedgr-dex PR', (f) => { f.request.user = { id: 347654037, type: 'Bot' }; f.request.performed_via_github_app = { id: 5463587 }; }],
  ['requester App equal to author App', (f) => { f.request.user = { id: 347654527, type: 'Bot' }; f.request.performed_via_github_app = { id: config.dex.app }; }],
  ['missing performed_via_github_app', (f) => { f.request.user = { id: 347654527, type: 'Bot' }; }],
  ['wrong ops-hedgrops App mapping', (f) => { f.request.user = { id: 347654255, type: 'Bot' }; f.request.performed_via_github_app = { id: 99 }; }],
  ['stale head', (f) => { f.pr.head.sha = '3'.repeat(40); }],
  ['stale base', (f) => { f.pr.base.sha = '3'.repeat(40); }],
  ['unsigned commit', (f) => { f.commit.commit.verification.verified = false; f.commit.commit.verification.reason = 'unsigned'; }],
  ['owner commit', (f) => { f.commit.author.id = 216588125; f.commit.author.type = 'User'; }],
  ['owner update-branch/web-flow commit', (f) => { f.commit.author = { id: 216588125, login: 'mhibajene', type: 'User' }; f.commit.committer = { id: 19864447, login: 'web-flow', type: 'User' }; }],
  ['missing signature provenance', (f) => { f.commit.commit.verification = null; }],
  ['null author', (f) => { f.commit.author = null; }],
  ['more than 250 commits', (f) => { f.pr.commits = 251; }],
  ['incomplete API response', (f) => { f.api.listCommits = async () => ({ status: 200, data: [] }); }],
  ['partial commit enumeration', (f) => { f.pr.commits = 2; }],
  ['replayed comment', (f) => { f.state.used.push({ commentId: 1, nonce: 'old' }); }],
  ['replayed nonce', (f) => { f.state.used.push({ commentId: 2, nonce: f.payload.nonce }); }],
  ['active review generation', (f) => { f.state.active[1] = 'existing'; }],
  ['unknown request field', (f) => { f.payload.command = 'untrusted'; f.request.body = JSON.stringify(f.payload); }],
  ['fork', (f) => { f.pr.head.repo.id = 999; }],
];
for (const [name, mutate] of negatives) test(`Iris rejects ${name}`, async () => {
  const f = fixture(); mutate(f); await assert.rejects(admitReview(f));
});
test('Iris accepts separately authenticated Barry requester', async () => {
  const f = fixture(); f.request.user = { id: 347654527, type: 'Bot' };
  f.request.performed_via_github_app = { id: 5463604 };
  assert.equal((await admitReview(f)).reservation.starter, 347654527);
});
test('Iris re-fetches head after enumeration', async () => {
  const f = fixture(); let count = 0;
  f.api.getPR = async () => ++count === 1 ? f.pr : { ...f.pr, head: { ...f.pr.head, sha: '3'.repeat(40) } };
  await assert.rejects(admitReview(f), /binding/);
});
test('Iris refuses changed request and superseded run before publication', async () => {
  const f = fixture(); const { reservation, nextState } = await admitReview(f);
  await assert.rejects(guardPublication({ ...f, reservation, state: f.state }), /superseded/);
  f.request.body += ' ';
  await assert.rejects(guardPublication({ ...f, reservation, state: nextState }), /changed/);
});
test('pagination enumerates all 201 records and refuses truncated terminal pages', async () => {
  const records = Array.from({ length: 201 }, (_, id) => ({ id }));
  const fetched = [];
  const result = await collectPages(async (page) => {
    fetched.push(page); return { status: 200, data: records.slice((page - 1) * 100, page * 100),
      headers: page < 3 ? { link: `<https://api.github.com/fixed?page=${page + 1}>; rel="next"` } : {} };
  }, { count: 201 });
  assert.equal(result.length, 201); assert.deepEqual(fetched, [1, 2, 3]);
  await assert.rejects(collectPages(async () => ({ status: 200, data: records.slice(0, 100), headers: {} })), /pagination/);
});

test('Iris accepts live-mapped independent HedgrOps requester', async () => {
  const f = fixture(); f.request.user = { id: 347654255, type: 'Bot' };
  f.request.performed_via_github_app = { id: 5463600 };
  assert.equal((await admitReview(f)).reservation.starter, 347654255);
});
test('Iris refuses an unconfirmed requester App mapping', async () => {
  const f = fixture(); f.config = { ...config, requesters: { ...config.requesters, 347654255: { app: null, type: 'Bot' } } };
  f.request.user = { id: 347654255, type: 'Bot' }; f.request.performed_via_github_app = { id: 5463600 };
  await assert.rejects(admitReview(f), /App mismatch/);
});
test('Iris rejects actual requester App overlap even if requester mapping is otherwise eligible', async () => {
  const f = fixture(); f.config = { ...config, requesters: { ...config.requesters, 347654527: { app: config.dex.app, type: 'Bot' } } };
  f.request.user = { id: 347654527, type: 'Bot' }; f.request.performed_via_github_app = { id: config.dex.app };
  await assert.rejects(admitReview(f), /author App/);
});

const webFlow = { id: 19864447, login: 'web-flow', type: 'User' };
test('owner author + web-flow + valid signature rejects', async () => {
  const f = fixture(); f.commit.author = { id: 216588125, login: 'mhibajene', type: 'User' };
  f.commit.committer = webFlow; await assert.rejects(admitReview(f), /producer/);
});
test('bot author + web-flow + valid signature accepts', async () => {
  const f = fixture(); f.commit.committer = webFlow;
  assert.equal((await admitReview(f)).reservation.commits[0].committer, 19864447);
});
test('bot author + web-flow + unverified signature rejects', async () => {
  const f = fixture(); f.commit.committer = webFlow; f.commit.commit.verification.verified = false;
  await assert.rejects(admitReview(f), /signature/);
});
test('bot author + different human committer rejects', async () => {
  const f = fixture(); f.commit.committer = { id: 216588125, login: 'mhibajene', type: 'User' };
  await assert.rejects(admitReview(f), /committer/);
});
test('unknown bot author rejects even with web-flow and a valid signature', async () => {
  const f = fixture(); f.commit.author = { id: 12345, login: 'unknown[bot]', type: 'Bot' }; f.commit.committer = webFlow;
  await assert.rejects(admitReview(f), /producer/);
});
test('invalid signature reason rejects even when verified field is true', async () => {
  const f = fixture(); f.commit.committer = webFlow; f.commit.commit.verification.reason = 'invalid';
  await assert.rejects(admitReview(f), /signature/);
});
test('live-confirmed Vera bot author accepts with a Founder-origin request', async () => {
  const f = fixture(); const vera = { id: 351051048, login: 'hedgr-vera[bot]', type: 'Bot' };
  f.pr.user = vera; f.commit.author = vera; f.commit.committer = webFlow;
  assert.equal((await admitReview(f)).reservation.commits[0].author, 351051048);
});
test('unknown Vera App mapping rejects bot-origin request until confirmed', async () => {
  const f = fixture(); const vera = { id: 351051048, login: 'hedgr-vera[bot]', type: 'Bot' };
  f.pr.user = vera; f.commit.author = vera; f.commit.committer = webFlow;
  f.request.user = { id: 347654527, type: 'Bot' }; f.request.performed_via_github_app = { id: 5463604 };
  await assert.rejects(admitReview(f), /author App/);
});
