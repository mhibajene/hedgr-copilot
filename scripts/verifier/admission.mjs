// MERGE-TIERS-ACT-001. Run this trusted main module inside Iris's controller.
// No network, credentials, clock, signer or replay storage is hidden in this module.
import { createHash } from 'node:crypto';

export const identities = Object.freeze({
  founder: 216588125,
  dex: { user: 347652043, app: 5463521, login: 'hedgr-dex[bot]' },
  builders: [
    { user: 347652043, app: 5463521, login: 'hedgr-dex[bot]' },
    { user: 351051048, app: null, login: 'hedgr-vera[bot]' }, // User API confirmed; App ID UNVERIFIED.
  ],
  requesters: {
    216588125: { app: null, type: 'User' },
    // Numeric bot IDs: public users API; App IDs: live performed_via_github_app.
    347654255: { app: 5463600, type: 'Bot' },
    347654527: { app: 5463604, type: 'Bot' },
  },
  irisApp: 5653778,
  irisUser: 353659287, // Public users API; App 5653778 Founder-confirmed (§471).
});
const sha = (s) => /^[0-9a-f]{40}$/.test(s ?? '');
const positive = (n) => Number.isSafeInteger(n) && n > 0;
const requireThat = (condition, reason) => { if (!condition) throw new Error(reason); };
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const stamp = (value) => typeof value === 'string' && Number.isFinite(Date.parse(value));

// Follow actual Link headers; never treat an unvalidated/partial page as complete.
export async function collectPages(fetchPage, { count, max = 10000 } = {}) {
  const all = []; const visited = new Set(); let page = 1;
  while (page) {
    requireThat(!visited.has(page), 'pagination loop'); visited.add(page);
    const response = await fetchPage(page);
    requireThat(response?.status === 200 && Array.isArray(response.data) && response.headers &&
      response.data.length <= 100, 'incomplete API response');
    all.push(...response.data);
    requireThat(all.length <= max, 'enumeration limit');
    const link = response.headers.link;
    if (!link) {
      // Without an expected count a full terminal page is ambiguous. Refuse it.
      requireThat(response.data.length < 100 || (count !== undefined && all.length === count), 'missing pagination link');
      page = 0;
    } else {
      requireThat(typeof link === 'string', 'invalid pagination link');
      const next = link.split(',').find((part) => /rel="next"/.test(part));
      if (next) {
        const match = /^\s*<([^>]+)>;\s*rel="next"\s*$/.exec(next);
        requireThat(match, 'invalid pagination link');
        const nextPage = Number(new URL(match[1]).searchParams.get('page'));
        requireThat(nextPage === page + 1, 'nonsequential pagination'); page = nextPage;
      } else {
        requireThat(/rel="(?:prev|first|last)"/.test(link), 'invalid pagination link'); page = 0;
      }
    }
  }
  if (count !== undefined) requireThat(all.length === count, 'commit count mismatch');
  return all;
}

function requestBinding(request, config, now) {
  requireThat(positive(request?.id) && positive(request?.user?.id), 'missing request identity');
  requireThat(stamp(request.created_at) && request.updated_at === request.created_at, 'edited request');
  const actor = config.requesters[request.user.id];
  requireThat(actor && actor.type === request.user.type, 'requester not allowlisted');
  const app = request.performed_via_github_app?.id ?? null;
  requireThat(actor.type === 'User' ? app === null : positive(actor.app) && app === actor.app, 'request App mismatch');
  let body;
  try { body = JSON.parse(request.body); } catch { throw new Error('invalid request JSON'); }
  const keys = ['schema', 'repository_id', 'pr', 'head', 'base', 'nonce', 'expires_at'];
  requireThat(Object.keys(body).sort().join() === keys.sort().join() && body.schema === 'v1' &&
    positive(body.repository_id) && positive(body.pr) && sha(body.head) && sha(body.base) &&
    /^[a-zA-Z0-9_-]{16,64}$/.test(body.nonce) && stamp(body.expires_at), 'invalid request schema');
  const created = Date.parse(request.created_at); const expires = Date.parse(body.expires_at);
  requireThat(Number.isFinite(now) && now >= created && now < expires &&
    expires > created && expires <= created + 86400000, 'expired request');
  return { body, app, snapshot: digest(request) };
}

function bindPR(pr, request, repositoryId) {
  requireThat(pr?.state === 'open' && pr.base?.ref === 'main' &&
    pr.base.repo?.id === repositoryId && pr.head?.repo?.id === repositoryId &&
    pr.number === request.pr && repositoryId === request.repository_id &&
    sha(pr.head.sha) && sha(pr.base.sha) && pr.head.sha === request.head && pr.base.sha === request.base &&
    positive(pr.user?.id), 'PR/head/base binding mismatch');
  requireThat(positive(pr.commits) && pr.commits <= 250, 'unsupported commit count');
}

// The trusted adapter fetches the private comment from its fixed, allowlisted
// repository/ticket, GETs the PR and GETs each public commit (Contents R).
// No locator, fetch target, author or producer claim is taken from request text.
export async function admitReview({ api, repositoryId, commentId, runId, state, now, config = identities }) {
  requireThat(positive(config.irisUser) && config.irisApp === 5653778, 'Iris mapping UNVERIFIED');
  requireThat(/^[a-zA-Z0-9_-]{1,32}$/.test(runId ?? '') && state?.schema === 'v1' &&
    Array.isArray(state.used) && state.active && typeof state.active === 'object', 'missing protected run state');
  const request = await api.getRequest(commentId);
  requireThat(request.id === commentId, 'request ID mismatch');
  const binding = requestBinding(request, config, now);
  requireThat(!state.used.some((entry) => entry.commentId === commentId || entry.nonce === binding.body.nonce), 'request already used');
  const pr = await api.getPR(binding.body.pr); bindPR(pr, binding.body, repositoryId);
  requireThat(!state.active[pr.number], 'active run must be superseded explicitly');
  const prBuilder = config.builders.find((builder) => builder.user === pr.user.id);
  requireThat(prBuilder && pr.user.type === 'Bot', 'unsupported PR author');
  requireThat(pr.user.id !== config.irisUser && request.user.id !== pr.user.id, 'self request');
  requireThat(binding.app === null || (positive(prBuilder.app) && binding.app !== prBuilder.app), 'requester App equals or lacks author App');
  const commits = await collectPages((page) => api.listCommits(pr.number, page), { count: pr.commits, max: 250 });
  requireThat(new Set(commits.map((c) => c.sha)).size === pr.commits && commits.at(-1)?.sha === pr.head.sha, 'incomplete commit enumeration');
  const evidence = [];
  for (const entry of commits) {
    requireThat(sha(entry.sha), 'invalid commit SHA');
    const commit = await api.getCommit(entry.sha);
    requireThat(commit?.sha === entry.sha, 'commit response mismatch');
    // Author authenticates the allowlisted builder; GitHub may assign its
    // web-flow signing service as committer. Human/owner authors still reject.
    const producer = config.builders.find((builder) => builder.user === commit.author?.id);
    requireThat(producer && commit.author.type === 'Bot' && commit.author.login === producer.login,
      'owner/unknown producer');
    requireThat(commit.committer?.id === 19864447 || commit.committer?.id === producer.user,
      'unsupported committer');
    const v = commit.commit?.verification;
    requireThat(v?.verified === true && v.reason === 'valid', 'invalid bot signature provenance');
    requireThat(request.user.id !== producer.user && config.irisUser !== producer.user &&
      (binding.app === null || (positive(producer.app) && binding.app !== producer.app)), 'requester/author App overlap');
    requireThat(!(request.user.id === 347654037 && producer.user === 347652043), 'ops-dex cannot request Dex work');
    evidence.push({ sha: entry.sha, author: commit.author.id, committer: commit.committer.id, verification: digest(v) });
  }
  const fresh = await api.getPR(pr.number); bindPR(fresh, binding.body, repositoryId);
  requireThat(fresh.commits === pr.commits && fresh.user.id === pr.user.id, 'PR changed during admission');
  const reservation = { schema: 'v1', repositoryId, pr: pr.number, head: pr.head.sha, base: pr.base.sha,
    author: pr.user.id, starter: request.user.id, commentId, nonce: binding.body.nonce,
    snapshot: binding.snapshot, runId, commits: evidence, expiresAt: binding.body.expires_at };
  const nextState = { schema: 'v1', used: [...state.used, { commentId, nonce: binding.body.nonce }],
    active: { ...state.active, [pr.number]: digest(reservation) } };
  // Controller MUST atomically compare-and-swap protected state before starting.
  return { reservation, nextState };
}

export async function guardPublication({ api, reservation, state, now, config = identities }) {
  requireThat(state?.active?.[reservation.pr] === digest(reservation), 'superseded run');
  const request = await api.getRequest(reservation.commentId);
  const binding = requestBinding(request, config, now);
  requireThat(binding.snapshot === reservation.snapshot, 'request changed/deleted');
  const admitted = await admitReview({ api, repositoryId: reservation.repositoryId,
    commentId: reservation.commentId, runId: reservation.runId, now, config,
    state: { schema: 'v1', used: [], active: {} } });
  requireThat(digest(admitted.reservation) === digest(reservation), 'publication evidence changed');
  return reservation; // Receipt-first publication and final H/B reread are the controller's next steps.
}
