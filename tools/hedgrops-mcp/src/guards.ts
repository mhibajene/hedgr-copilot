import { lstat, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));

export const CANONICAL_STATUS_PATH = "docs/ops/HEDGR_STATUS.md";
export const ADR_INDEX_PATH = "docs/decisions/SPRINT-2-ADR-INDEX.md";

const READ_ROOT_ALLOWLIST = new Set([
  "AGENTS.md",
  "README.md",
  ".cursor/rules.md",
  ".cursorrules",
]);

const ADR_DRAFT_PATTERN = /^docs\/decisions\/\d{4}-[a-z0-9][a-z0-9-]*\.md$/;

type GuardedPath = {
  relativePath: string;
  absolutePath: string;
};

function reject(message: string): never {
  throw new Error(message);
}

function ensureInsideRepoRoot(absolutePath: string): void {
  const relativeFromRoot = path.relative(REPO_ROOT, absolutePath);

  if (
    relativeFromRoot === "" ||
    relativeFromRoot === ".." ||
    relativeFromRoot.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeFromRoot)
  ) {
    reject("Path escapes the repository root.");
  }
}

function normalizeRepoPath(requestedPath: string): string {
  const trimmedPath = requestedPath.trim();

  if (!trimmedPath) {
    reject("Path is required.");
  }

  const normalizedPath = path.posix.normalize(trimmedPath.replaceAll("\\", "/"));

  if (
    normalizedPath === "." ||
    normalizedPath === ".." ||
    normalizedPath.startsWith("../") ||
    path.posix.isAbsolute(normalizedPath)
  ) {
    reject("Path traversal is not allowed.");
  }

  return normalizedPath;
}

async function assertNoSymlinkSegments(relativePath: string): Promise<void> {
  const pathSegments = relativePath.split("/").filter(Boolean);
  let currentPath = REPO_ROOT;

  for (const segment of pathSegments) {
    currentPath = path.join(currentPath, segment);

    try {
      const entry = await lstat(currentPath);

      if (entry.isSymbolicLink()) {
        reject("Symlink paths are not allowed.");
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }

      throw error;
    }
  }
}

async function resolveExistingFile(relativePath: string): Promise<string> {
  const absolutePath = path.resolve(REPO_ROOT, relativePath);
  ensureInsideRepoRoot(absolutePath);
  await assertNoSymlinkSegments(relativePath);

  const fileInfo = await stat(absolutePath);
  if (!fileInfo.isFile()) {
    reject("Requested path must reference a file.");
  }

  const realPath = await realpath(absolutePath);
  ensureInsideRepoRoot(realPath);
  return realPath;
}

async function resolveWriteTarget(relativePath: string): Promise<string> {
  const absolutePath = path.resolve(REPO_ROOT, relativePath);
  ensureInsideRepoRoot(absolutePath);
  await assertNoSymlinkSegments(relativePath);

  const parentPath = path.dirname(absolutePath);
  const parentRealPath = await realpath(parentPath);
  ensureInsideRepoRoot(parentRealPath);

  const parentInfo = await stat(parentRealPath);
  if (!parentInfo.isDirectory()) {
    reject("Write target parent must be a directory.");
  }

  return absolutePath;
}

function isReadAllowlisted(relativePath: string): boolean {
  return READ_ROOT_ALLOWLIST.has(relativePath) || relativePath.startsWith("docs/");
}

export async function guardReadPath(requestedPath: string): Promise<GuardedPath> {
  const relativePath = normalizeRepoPath(requestedPath);

  if (!isReadAllowlisted(relativePath)) {
    reject("Path is not allowlisted for reads.");
  }

  const absolutePath = await resolveExistingFile(relativePath);
  return { relativePath, absolutePath };
}

export async function guardStatusWritePath(): Promise<GuardedPath> {
  const absolutePath = await resolveExistingFile(CANONICAL_STATUS_PATH);
  return { relativePath: CANONICAL_STATUS_PATH, absolutePath };
}

export async function guardDraftAdrWritePath(requestedPath: string): Promise<GuardedPath> {
  const relativePath = normalizeRepoPath(requestedPath);

  if (relativePath === ADR_INDEX_PATH) {
    reject("Writing the ADR index is not allowed.");
  }

  if (!ADR_DRAFT_PATTERN.test(relativePath)) {
    reject("ADR drafts must target docs/decisions/NNNN-title.md.");
  }

  const absolutePath = await resolveWriteTarget(relativePath);
  return { relativePath, absolutePath };
}
