const FLOW_TTL_MS = 300_000;
const COORDINATOR_NAME = "hedgrops-bridge-oauth-single-use-v1";

function response(status, body) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function flowKey(kind, id) {
  if (!["consent", "access"].includes(kind) || !/^[a-f0-9]{64}$/.test(id)) return null;
  return `flow:${kind}:${id}`;
}

function codeKey(userId, grantId) {
  if (typeof userId !== "string" || !userId || typeof grantId !== "string" || !grantId) return null;
  return `code:${JSON.stringify([userId, grantId])}`;
}

// One fixed object ID is used for every OAuth transaction. Its storage
// transaction, rather than KV visibility or separate get/delete calls, decides
// whether a credential can be used. Claimed code markers are never removed.
class OAuthSingleUse {
  constructor(ctx) { this.ctx = ctx; }

  async fetch(request) {
    if (request.method !== "POST") return response(405, { ok: false });
    let input;
    try { input = await request.json(); } catch { return response(400, { ok: false }); }
    const path = new URL(request.url).pathname;
    if (path === "/put-flow") {
      const key = flowKey(input?.kind, input?.id);
      if (!key || !input.value || typeof input.value !== "object" || Array.isArray(input.value)) {
        return response(400, { ok: false });
      }
      const expiresAt = Date.now() + FLOW_TTL_MS;
      const created = await this.ctx.storage.transaction(async (txn) => {
        if (await txn.get(key) !== undefined) return false;
        await txn.put(key, { value: input.value, expiresAt });
        return true;
      });
      if (!created) return response(409, { ok: false });
      const existingAlarm = await this.ctx.storage.getAlarm();
      if (existingAlarm === null || existingAlarm > expiresAt) await this.ctx.storage.setAlarm(expiresAt);
      return response(201, { ok: true });
    }
    if (path === "/consume-flow") {
      const key = flowKey(input?.kind, input?.id);
      if (!key || typeof input.browserNonce !== "string" || !input.browserNonce) {
        return response(400, { ok: false });
      }
      const result = await this.ctx.storage.transaction(async (txn) => {
        const record = await txn.get(key);
        if (!record) return null;
        if (record.expiresAt <= Date.now()) {
          await txn.delete(key);
          return null;
        }
        if (record.value.browserNonce !== input.browserNonce) return null;
        await txn.delete(key);
        return record.value;
      });
      return result ? response(200, { ok: true, value: result }) : response(409, { ok: false });
    }
    if (path === "/claim-code") {
      const key = codeKey(input?.userId, input?.grantId);
      if (!key) return response(400, { ok: false });
      const claimed = await this.ctx.storage.transaction(async (txn) => {
        if (await txn.get(key) !== undefined) return false;
        await txn.put(key, { claimedAt: Date.now() });
        return true;
      });
      return claimed ? response(200, { ok: true }) : response(409, { ok: false });
    }
    return response(404, { ok: false });
  }

  async alarm() {
    const records = await this.ctx.storage.list({ prefix: "flow:" });
    let next = null;
    for (const [key, record] of records) {
      if (record.expiresAt <= Date.now()) await this.ctx.storage.delete(key);
      else next = next === null ? record.expiresAt : Math.min(next, record.expiresAt);
    }
    if (next !== null) await this.ctx.storage.setAlarm(next);
  }
}

function coordinatorStub(env) {
  if (typeof env?.OAUTH_SINGLE_USE?.idFromName !== "function" ||
    typeof env?.OAUTH_SINGLE_USE?.get !== "function") return null;
  return env.OAUTH_SINGLE_USE.get(env.OAUTH_SINGLE_USE.idFromName(COORDINATOR_NAME));
}

async function callCoordinator(env, path, input) {
  const stub = coordinatorStub(env);
  if (!stub) throw new Error("OAuth single-use coordinator unavailable");
  const result = await stub.fetch(new Request(`https://oauth-single-use.internal${path}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input)
  }));
  if (result.status !== 200 && result.status !== 201 && result.status !== 409) {
    throw new Error("OAuth single-use coordinator failed");
  }
  return { status: result.status, body: await result.json() };
}

export { OAuthSingleUse, callCoordinator, coordinatorStub };
