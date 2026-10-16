import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';

async function labels() {
  expect(existsSync(resolve(__dirname, '../app/(app)/dashboard/lineLabels.ts')), 'V2–V6: label policy is absent').toBe(true);
  const path = '../app/(app)/dashboard/lineLabels';
  return import(path);
}
const at = Date.parse('2026-10-09T12:00:00Z');
const events = Array.from({ length: 4 }, (_, i) => ({ id: String(i), at: at + i * 1000, x: 40 + i * 80 }));

test('V2 label-budget-phone-desktop', async () => {
  const { labelBudget, selectLabels } = await labels();
  expect(labelBudget(390)).toBe(2); expect(labelBudget(480)).toBe(2); expect(labelBudget(481)).toBe(3); expect(labelBudget(1440)).toBe(3);
  expect(selectLabels(events.slice(0, 3), at - 1, 390)).toHaveLength(1);
  expect(selectLabels(events.slice(0, 3), at - 1, 1440)).toHaveLength(1);
});
test('V3 labels-since-last-visit-else-latest', async () => {
  const { selectLabels } = await labels();
  expect(selectLabels(events, at + 1500, 1440).map((label: { id: string }) => label.id)).toEqual(['3']);
  expect(selectLabels(events, null, 1440).map((label: { id: string }) => label.id)).toEqual(['3']);
  expect(selectLabels(events, at + 9000, 1440)).toEqual([]);
  expect(selectLabels([], null, 390)).toEqual([]);
});
test('V4 overflow-summary-counts-only', async () => {
  const { selectLabels, countChanges } = await labels();
  const selected = selectLabels(events, at - 1, 390);
  expect(selected).toHaveLength(1); expect(selected[0].text).toBe('4 changes since your last visit');
  expect(selected[0].text).not.toMatch(/\$|\d+\.\d{2}/);
  expect(countChanges(0, true)).toBe('No changes since your last visit');
  expect(countChanges(1, true)).toBe('1 change since your last visit');
  expect(countChanges(1, false)).toBe('1 change'); expect(countChanges(2, false)).toBe('2 changes');
});
test('V5 dots-merge-under-14px', async () => {
  const { mergeDots } = await labels();
  expect(mergeDots([{ ...events[0], x: 0 }, { ...events[1], x: 13 }]).map((dot: { events: unknown[] }) => dot.events.length)).toEqual([2]);
  expect(mergeDots([{ ...events[0], x: 0 }, { ...events[1], x: 14 }]).map((dot: { events: unknown[] }) => dot.events.length)).toEqual([1, 1]);
});
test('V6 label-flip-on-collision', async () => {
  const { placeLabels } = await labels();
  expect(placeLabels([{ id: 'a', x: 50, text: '1 change', width: 100 }, { id: 'b', x: 70, text: '1 change', width: 100 }], 300).map((label: { placement: string }) => label.placement)).toEqual(['above', 'below']);
});

for (const [name, count] of [['S1 one-count-label-two-changes', 2], ['S2 one-count-label-three-changes', 3], ['S3 one-change-singular', 1]] as const) {
  test(name, async () => {
    const { selectLabels } = await labels();
    for (const width of [320, 390, 480, 481, 1440]) {
      const latest = events[count - 1];
      expect(selectLabels(events.slice(0, count), at - 1, width)).toEqual([
        { id: latest.id, x: latest.x, text: `${count} ${count === 1 ? 'change' : 'changes'} since your last visit` },
      ]);
    }
  });
}
test('S4 no-visit-unchanged-no-change-empty', async () => {
  const { selectLabels } = await labels();
  for (const width of [320, 390, 1440]) {
    expect(selectLabels(events, null, width)).toEqual([{ id: '3', x: 280, text: '1 change' }]);
    expect(selectLabels(events, at + 9000, width)).toEqual([]);
    expect(selectLabels([], at, width)).toEqual([]);
  }
});
