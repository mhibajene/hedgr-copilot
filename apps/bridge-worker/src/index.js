const BRIDGE_NAME = "HedgrOps Read-Only Review Evidence Bridge";

const NON_AUTHORIZATION_STATEMENT =
  "This response is evidence/retrieval only. It does not authorize implementation, sequencing, ticket activation, or repo mutation.";

const MODE = "READ_ONLY";

const ALLOWED_FILES = Object.freeze({
  "/hedgr/status/authority-summary": "docs/ops/bridge/current-status.json",
  "/hedgr/reviews/latest-weekly": "docs/ops/bridge/latest-weekly-review.json",
  "/hedgr/reviews/latest-mvp-process": "docs/ops/bridge/latest-mvp-process-review.json",
  "/hedgr/reviews/index": "docs/ops/bridge/review-index.json"
});

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function unauthorized() {
  return jsonResponse(401, { error: "Unauthorized" });
}

function methodNotAllowed() {
  return jsonResponse(405, { error: "Method Not Allowed" });
}

function notFound() {
  return jsonResponse(404, { error: "Not Found" });
}

function missingSnapshotSource() {
  return jsonResponse(502, { error: "Snapshot source unavailable" });
}

function hasValidApiKey(request, env) {
  const expectedApiKey = env?.HEDGROPS_BRIDGE_API_KEY;

  if (!expectedApiKey) {
    return false;
  }

  return request.headers.get("x-hedgrops-api-key") === expectedApiKey;
}

function requireGitHubEnv(env) {
  const required = ["GITHUB_OWNER", "GITHUB_REPO", "GITHUB_BRANCH", "GITHUB_TOKEN"];

  return required.every((key) => typeof env?.[key] === "string" && env[key].length > 0);
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function buildGitHubContentsUrl(env, sourcePath) {
  const owner = encodeURIComponent(env.GITHUB_OWNER);
  const repo = encodeURIComponent(env.GITHUB_REPO);
  const branch = encodeURIComponent(env.GITHUB_BRANCH);

  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodePath(sourcePath)}?ref=${branch}`;
}

async function parseGitHubSnapshotResponse(response) {
  const bodyText = await response.text();

  try {
    const maybeJson = JSON.parse(bodyText);

    if (
      typeof maybeJson?.content === "string" &&
      maybeJson.encoding === "base64"
    ) {
      const decoded = atob(maybeJson.content.replace(/\s/g, ""));
      return JSON.parse(decoded);
    }

    return maybeJson;
  } catch {
    return JSON.parse(bodyText);
  }
}

async function retrieveSnapshot(env, sourcePath) {
  if (!requireGitHubEnv(env)) {
    return null;
  }

  const response = await fetch(buildGitHubContentsUrl(env, sourcePath), {
    method: "GET",
    headers: {
      accept: "application/vnd.github.raw",
      authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "user-agent": "hedgrops-read-only-review-evidence-bridge"
    }
  });

  if (!response.ok) {
    return null;
  }

  try {
    return await parseGitHubSnapshotResponse(response);
  } catch {
    return null;
  }
}

function envelope(sourcePath, data) {
  return {
    bridge: {
      name: BRIDGE_NAME,
      mode: MODE,
      execution_authority: false,
      mutation_allowed: false,
      ticket_activation_allowed: false,
      retrieved_at: new Date().toISOString(),
      source_path: sourcePath,
      non_authorization_statement: NON_AUTHORIZATION_STATEMENT
    },
    data
  };
}

async function handleRequest(request, env) {
  if (request.method !== "GET") {
    return methodNotAllowed();
  }

  const { pathname } = new URL(request.url);

  if (pathname === "/health") {
    return jsonResponse(200, { status: "ok", mode: MODE });
  }

  const sourcePath = ALLOWED_FILES[pathname];

  if (!sourcePath) {
    return notFound();
  }

  if (!hasValidApiKey(request, env)) {
    return unauthorized();
  }

  const snapshot = await retrieveSnapshot(env, sourcePath);

  if (!snapshot) {
    return missingSnapshotSource();
  }

  return jsonResponse(200, envelope(sourcePath, snapshot));
}

export { ALLOWED_FILES, handleRequest };

export default {
  fetch: handleRequest
};
