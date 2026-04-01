import type { EnginePosture } from './types';

const ENGINE_POSTURES: readonly EnginePosture[] = [
  'normal',
  'tightening',
  'tightened',
  'recovery',
] as const;

function isEnginePosture(value: unknown): value is EnginePosture {
  return (
    typeof value === 'string' &&
    (ENGINE_POSTURES as readonly string[]).includes(value)
  );
}

/**
 * MC-S2-014 — minimal local review memory (orientation aid, not a history product).
 * At most two entries; append only after a prior fingerprint exists (same gate as MC-S2-013).
 */
export const REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY =
  'hedgr:engine-review-snapshot-memory';

export const MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES = 2;

export type ReviewSnapshotMemoryEntry = {
  viewedAt: string;
  changeVsPrior: 'unchanged' | 'changed';
  posture: EnginePosture;
};

function isMemoryEntry(value: unknown): value is ReviewSnapshotMemoryEntry {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const o = value as Record<string, unknown>;
  return (
    typeof o.viewedAt === 'string' &&
    (o.changeVsPrior === 'unchanged' || o.changeVsPrior === 'changed') &&
    isEnginePosture(o.posture)
  );
}

/**
 * Newest-first list (max length per MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES).
 */
export function readReviewSnapshotMemory(): ReviewSnapshotMemoryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY);
    if (raw === null || raw === '') {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    const entries = parsed.filter(isMemoryEntry);
    return entries.slice(0, MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES);
  } catch {
    return [];
  }
}

/**
 * Appends one memory row only when `priorFingerprintRaw` is non-null (a prior visit
 * established a fingerprint). Does not persist "initial" / first-visit rows.
 */
export function appendReviewSnapshotMemoryAfterVisit(args: {
  priorFingerprintRaw: string | null;
  currentFingerprint: string;
  posture: EnginePosture;
}): void {
  if (typeof window === 'undefined' || args.priorFingerprintRaw === null) {
    return;
  }
  const changeVsPrior: 'unchanged' | 'changed' =
    args.priorFingerprintRaw === args.currentFingerprint
      ? 'unchanged'
      : 'changed';
  const entry: ReviewSnapshotMemoryEntry = {
    viewedAt: new Date().toISOString(),
    changeVsPrior,
    posture: args.posture,
  };
  try {
    const existing = readReviewSnapshotMemory();
    const next = [entry, ...existing].slice(0, MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES);
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY,
      JSON.stringify(next),
    );
  } catch {
    // mirror MC-S2-013 localStorage resilience
  }
}
