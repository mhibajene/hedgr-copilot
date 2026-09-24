import { OAuthSingleUse as Coordinator } from "../../src/oauth-coordinator.js";

export class OAuthSingleUse extends Coordinator {
  async fetch(request) {
    // Local fixture only: create an already expired entry without waiting five
    // minutes. The production coordinator has no equivalent route.
    if (new URL(request.url).pathname === "/test-expired-flow") {
      const { kind, id, browserNonce } = await request.json();
      await this.ctx.storage.put(`flow:${kind}:${id}`, {
        value: { browserNonce }, expiresAt: Date.now() - 1
      });
      return Response.json({ ok: true });
    }
    return super.fetch(request);
  }
}

export default {
  fetch(request, env) {
    return env.OAUTH_SINGLE_USE.getByName("hedgrops-bridge-oauth-single-use-v1").fetch(request);
  }
};
