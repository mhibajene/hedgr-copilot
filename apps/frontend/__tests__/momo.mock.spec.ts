import { test, expect } from 'vitest';
import { momoMock } from '../lib/payments/momo.mock';

test('momo mock confirms within 5s', async () => {
  const tx = await momoMock.createDeposit(100);
  expect(await momoMock.status(tx.id)).toBe('PENDING');
  await new Promise(r => setTimeout(r, 1600)); // default 1500ms
  expect(await momoMock.status(tx.id)).toBe('CONFIRMED');
});

