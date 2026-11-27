import test from "node:test";
import { fileURLToPath } from "node:url";

import { verifyArtifact } from "../generate-repo-authority-projection.mjs";

test("committed RAP matches raw checkout content and deterministic serialization", async (t) => {
  await verifyArtifact({ repoRoot: fileURLToPath(new URL("../../../", import.meta.url)), strict: false });
  t.diagnostic("CONTENT_ONLY");
});
