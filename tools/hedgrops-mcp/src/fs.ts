import { lstat, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  ADR_INDEX_PATH,
  CANONICAL_STATUS_PATH,
  REPO_ROOT,
  guardDraftAdrWritePath,
  guardReadPath,
  guardStatusWritePath,
} from "./guards.js";

function reject(message: string): never {
  throw new Error(message);
}

function assertTextFile(buffer: Buffer): void {
  if (buffer.includes(0)) {
    reject("Binary files are not supported.");
  }
}

export async function readStatus(): Promise<string> {
  return readDoc(CANONICAL_STATUS_PATH);
}

export async function readDoc(requestedPath: string): Promise<string> {
  const { absolutePath } = await guardReadPath(requestedPath);
  const contents = await readFile(absolutePath);
  assertTextFile(contents);
  return contents.toString("utf8");
}

export async function updateStatus(content: string): Promise<string> {
  const { absolutePath, relativePath } = await guardStatusWritePath();
  await writeFile(absolutePath, content, "utf8");
  return relativePath;
}

export async function listAdrs(): Promise<string[]> {
  const decisionsDirectory = path.join(REPO_ROOT, "docs/decisions");
  const entries = await readdir(decisionsDirectory, { withFileTypes: true });

  const markdownFiles = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const relativePath = path.posix.join("docs/decisions", entry.name);
        const { absolutePath } = await guardReadPath(relativePath);
        const fileInfo = await lstat(absolutePath);

        if (fileInfo.isSymbolicLink()) {
          reject("Symlinked ADR files are not supported.");
        }

        return relativePath;
      }),
  );

  return markdownFiles.sort((left, right) => left.localeCompare(right));
}

export async function draftAdr(requestedPath: string, content = ""): Promise<string> {
  const { absolutePath, relativePath } = await guardDraftAdrWritePath(requestedPath);

  try {
    await lstat(absolutePath);
    reject("ADR draft already exists.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  if (relativePath === ADR_INDEX_PATH) {
    reject("Writing the ADR index is not allowed.");
  }

  await writeFile(absolutePath, content, {
    encoding: "utf8",
    flag: "wx",
  });

  return relativePath;
}
