import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

const scriptPath = fileURLToPath(new URL("./fixtures/oauth-coordinator-worker.js", import.meta.url));
const coordinatorPath = fileURLToPath(new URL("../src/oauth-coordinator.js", import.meta.url));
const modulesRoot = fileURLToPath(new URL("../", import.meta.url));
const id = "a".repeat(64);

async function runtime() {
  return new Miniflare(convertV4MiniflareOptions({
    name: "oauth-coordinator-test", modulesRoot, modules: [
      { type: "ESModule", path: scriptPath, contents: readFileSync(scriptPath, "utf8") },
      { type: "ESModule", path: coordinatorPath, contents: readFileSync(coordinatorPath, "utf8") }
    ],
    compatibilityDate: "2026-06-24", cf: false,
    durableObjects: { OAUTH_SINGLE_USE: { className: "OAuthSingleUse", useSQLite: true } }
  }));
}

async function call(mf, path, body) {
  return mf.dispatchFetch(`http://localhost:8787${path}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body)
  });
}

test("old read/delete can let two observations pass, while DO transaction consumes exactly once", async () => {
  const stale = { browserNonce: "browser" };
  const oldValues = new Map([[id, stale]]);
  const oldRead = async () => oldValues.get(id);
  const [firstRead, secondRead] = await Promise.all([oldRead(), oldRead()]);
  oldValues.delete(id);
  oldValues.delete(id);
  assert.ok(firstRead && secondRead, "separate reads both observed an unconsumed credential");

  const mf = await runtime();
  try {
    assert.equal((await call(mf, "/put-flow", {
      kind: "consent", id, value: { browserNonce: "browser", clientId: "client-a" }
    })).status, 201);
    const results = await Promise.all(Array.from({ length: 20 }, () => call(mf, "/consume-flow", {
      kind: "consent", id, browserNonce: "browser"
    })));
    assert.equal(results.filter((result) => result.status === 200).length, 1);
    assert.equal(results.filter((result) => result.status === 409).length, 19);
    assert.equal((await call(mf, "/consume-flow", {
      kind: "consent", id, browserNonce: "browser"
    })).status, 409);
  } finally { await mf.dispose(); }
});

test("callback browser proof and code claims use the same durable transaction after retries", async () => {
  const mf = await runtime();
  try {
    assert.equal((await call(mf, "/put-flow", {
      kind: "access", id, value: { browserNonce: "founder-browser", nonce: "oidc-nonce" }
    })).status, 201);
    assert.equal((await call(mf, "/consume-flow", {
      kind: "access", id, browserNonce: "other-browser"
    })).status, 409);
    const [a, b] = await Promise.all(["founder-browser", "founder-browser"].map((browserNonce) =>
      call(mf, "/consume-flow", { kind: "access", id, browserNonce })));
    assert.deepEqual([a.status, b.status].sort(), [200, 409]);
    const claims = await Promise.all(Array.from({ length: 20 }, () => call(mf, "/claim-code", {
      userId: "founder-subject", grantId: "grant-1"
    })));
    assert.equal(claims.filter((result) => result.status === 200).length, 1);
    assert.equal(claims.filter((result) => result.status === 409).length, 19);
    assert.equal((await call(mf, "/claim-code", {
      userId: "founder-subject", grantId: "grant-1"
    })).status, 409);
    await mf.unsafeEvictDurableObject("oauth-coordinator-test", "OAuthSingleUse", {
      name: "hedgrops-bridge-oauth-single-use-v1"
    });
    assert.equal((await call(mf, "/claim-code", {
      userId: "founder-subject", grantId: "grant-1"
    })).status, 409, "durable claim survives object eviction");
    assert.equal((await call(mf, "/test-expired-flow", {
      kind: "consent", id: "b".repeat(64), browserNonce: "old-browser"
    })).status, 200);
    assert.equal((await call(mf, "/consume-flow", {
      kind: "consent", id: "b".repeat(64), browserNonce: "old-browser"
    })).status, 409, "expired state cannot be consumed");
  } finally { await mf.dispose(); }
});
