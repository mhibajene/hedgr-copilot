import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const HOME = '/dashboard-synthetic-journey';
const JOURNEY = 'journey=class-a-val-002';
const SCENARIO = `${JOURNEY}&scenario=unavailable-data`;
const LINE = 'You are still on Withdraw. Your simulated balance stays visible.';
const NOW = Date.parse('2026-10-18T04:00:00Z');
test.use({ timezoneId: 'UTC' });
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.route('**/api/fx?**', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ base: 'USD', quote: 'ZMW', rate: 20, ts: NOW, provider: 'fixed' }) }));
  await page.clock.install({ time: NOW }); await page.clock.setFixedTime(NOW);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('release-gate-fix-002@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
});
async function seed(page: Page) {
  await page.goto('/api/policy');
  await page.evaluate(() => {
    localStorage.clear(); sessionStorage.clear();
    localStorage.setItem('hedgr.simulation.display-currency', 'ZMW');
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [{ txn_ref: 'release-gate-fix-002', type: 'deposit', status: 'settled', amount_usd: 50, amount_zmw: 1350, fx_rate: 27, created_at: 1000, updated_at: 1000 }] }));
  });
}
function study(url: URL) {
  return (url.pathname === '/orientation' && url.search === '?study=stability-scenarios') ||
    (url.pathname === '/research/stability-scenarios' && !url.search) ||
    (url.pathname === '/research/reserve-scenario' && ['', '?v=1'].includes(url.search));
}
for (const width of [1440, 390]) {
  test(`RELEASE-GATE-FIX-002 T1 breadth-first study and product anchors ${width}`, async ({ page }, testInfo) => {
    test.setTimeout(180_000); await page.setViewportSize({ width, height: 1000 }); await seed(page);
    const queue = ['/orientation?study=stability-scenarios', HOME, `/deposit?${SCENARIO}`, `/withdraw?${SCENARIO}`, `/dashboard?${SCENARIO}`, `/activity?${SCENARIO}`, `/settings?${SCENARIO}`];
    const visited = new Set<string>(); const escapes: string[] = []; const anchors: string[] = [];
    async function collect(stage: string) {
      const source = page.url();
      for (const a of await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => ({ href: (node as HTMLAnchorElement).href, text: node.textContent || node.getAttribute('aria-label') || '' })))) {
        const url = new URL(a.href); if (url.origin !== new URL(source).origin) continue;
        const label = `${source} [${stage}] ${a.text.trim()} -> ${url.pathname}${url.search}`;
        anchors.push(label);
        const contained = url.pathname === HOME || url.searchParams.get('journey') === 'class-a-val-002';
        if (!study(url) && (!contained || url.pathname === '/chat')) { escapes.push(label); continue; }
        if (a.text.trim() === 'Home' || a.text.trim() === 'Hedgr Home' || (url.pathname === '/dashboard' && contained && !url.searchParams.has('scenario'))) {
          if (url.pathname !== HOME) escapes.push(label);
        }
        queue.push(`${url.pathname}${url.search}`);
      }
      for (const logo of await page.locator('a[aria-label="Hedgr Home"]').all()) {
        if (new URL((await logo.getAttribute('href'))!, source).pathname !== HOME) escapes.push(`${source} [${stage}] Hedgr Home -> ${await logo.getAttribute('href')}`);
      }
    }
    while (queue.length) {
      const path = queue.shift()!; if (visited.has(path)) continue; visited.add(path);
      await page.goto(path); await expect(page.locator('main').first()).toBeVisible();
      await collect('initial / mobile closed');
      const toggle = page.getByTestId('nav-toggle');
      if (await toggle.isVisible()) { await toggle.click(); await collect('mobile open'); await toggle.click(); }
      for (const id of ['study-continue', 'study-to-hedgr', 'study-to-bridge']) {
        const button = page.getByTestId(id);
        if (await button.isVisible()) { await button.click(); await collect(id); }
      }
    }
    // Include newly revealed receipt-dock anchors after both simulated actions.
    for (const route of ['deposit', 'withdraw']) {
      await page.goto(`/${route}?${JOURNEY}`);
      await page.getByTestId(`${route}-amount`).fill(route === 'deposit' ? '100' : '1');
      await page.getByRole('button', { name: 'Confirm', exact: true }).click();
      await expect(page.getByTestId(route === 'deposit' ? 'deposit-confirmation-region' : 'withdraw-status-region')).toBeVisible();
      if (route === 'withdraw') await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute('data-status', 'SUCCESS');
      await collect(`${route} receipt`);
    }
    // Every receipt destination was already visited; follow any newly revealed destination too.
    while (queue.length) {
      const path = queue.shift()!; if (visited.has(path)) continue; visited.add(path);
      await page.goto(path); await collect('receipt destination');
    }
    await testInfo.attach('T1 crawl', { body: JSON.stringify({ visited: [...visited], anchors, escapes }, null, 2), contentType: 'application/json' });
    expect(escapes, escapes.join('\n')).toEqual([]);
    expect([...visited]).toContain('/research/stability-scenarios');
    expect([...visited]).toContain('/research/reserve-scenario?v=1');
  });
  test(`RELEASE-GATE-FIX-002 T2 T3 scenario continuity remains rendered ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await seed(page);
    await page.route('**/api/fx?**', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
    for (const route of ['deposit', 'withdraw']) {
      await page.goto(`/${route}?${SCENARIO}`);
      const panel = page.getByTestId(`${route}-market-data-continuity`); await expect(panel).toBeVisible();
      await expect(panel).toContainText("The example rate didn't load. This simulation uses a fixed example rate, not market data.");
      await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
      if (route === 'withdraw') {
        await expect(panel).toContainText(LINE);
        await expect(panel).not.toContainText(/(?:payment|payout)[ -]+methods?/i);
      } else await expect(page.getByRole('link', { name: 'Return to the simulated deposit', exact: true })).toHaveAttribute('href', `/deposit?${JOURNEY}`);
    }
  });
}

test('RELEASE-GATE-FIX-002 T4 immutable Engine golden Engine-test and D-132 controls', () => {
  // SHA-256 values captured directly from immutable 01fd6b5 Git objects before runtime edits.
  const pins: Record<string, string> = {
  "__tests__/engine-allocation-bands-panel-copy-contract.test.tsx": "d85a807cac5d3e352b123de999f2a3fdee80ed6e024738bd1d393bef93f14a1e",
  "__tests__/engine-allocation-bands.test.tsx": "86e616af920f004218a250bcc927c80a25659de74e35308367d1bd539b0c57b7",
  "__tests__/engine-daniel-read.golden.ts": "d2fe6c27bfe369e068958181da41d1d04594e41b192f47d2379fe1f9d62d8ab4",
  "__tests__/engine-daniel-read.test.ts": "eb1510838fc863357317a6904c94bb42a91ceaf4368dad8cabe16a17f5dfdbaf",
  "__tests__/engine-notices-and-mock-contract.test.ts": "6d0843b05c3b3dbbc4bbb9801b3b4d347340a3c33669b3574e21b2c92ce3a11a",
  "__tests__/engine-posture-context-contract.test.ts": "6c98725c8a739a73547376e58099f877d9e055bd50d66f09191c1f8c6f0684dc",
  "__tests__/engine-posture-header.test.tsx": "be01f75fd3baee972ca2ef72c641603809bac737341ddc0399a5317110786615",
  "__tests__/engine-protective-guidance-copy-contract.test.ts": "ed4aa42376a9168f0e8619856f0818000654287339c4ec005cac6788759f3431",
  "__tests__/engine-sarah-currency-match.golden.ts": "56c3068e8e6b916181291c9b127b8220bf702589a6d5142179188058c4405298",
  "__tests__/engine-sarah-currency-match.test.ts": "701bfdc42bc2bd00d1bea5bd606f41f5ef1a3bf5f7553c6a0b2eb4ad98365fa2",
  "__tests__/engine-sarah-read.golden.ts": "656fb25c528c85f8b8a02c026e1b95699dc5cdd6ed617e276e2cbc64ac2784f5",
  "__tests__/engine-sarah-read.test.ts": "520cf12b6d5f70f61ae9bb01b93dd1d5e9a026cca1810677d56cabbd9542a569",
  "__tests__/engine-simulator.test.ts": "b6b22881a44320333b3613546d71af8fe7b3f304cc8cf244e5700f9dc24e9025",
  "__tests__/engine-stability-explainer-copy-contract.test.ts": "cd2beb50ca35aeec9f69e04171084a0bc01664e92e1a643316b6a6ba17da01ea",
  "__tests__/engine-stability-review-snapshot-copy-contract.test.ts": "600b0feab1daf8a7faae278e388dcb77f97fb5f361449d76d6be58686c54ad7c",
  "__tests__/engine-stability-review-snapshot.test.tsx": "e777e5ff17e306567aa9a6854cb701c4f529426aaa6f833af9aa876692adb2af",
  "__tests__/engine-trust-framing-denylist.ts": "025d29a34d41dc7fe7f2cb861f2fcb27f855a074f8dd2d7a2e641d6bf24c42ad",
  "__tests__/engine-types-contract.test.ts": "36bc129eb2ac6b927a0d9ae6936d84c5b2773acde72cbc92efdc39dadf5e3893",
  "config/env.ts": "39772e69fbcc350a651c407828769b854f9c709ed570b5399b499c98d816d8c9",
  "config/market.ts": "06b257cf46ed4d73217ad06eaba119579c8e22f8b9703bf967d077bb93b4734e",
  "config/useSelectedMarket.ts": "f5ba10d5ebe840be26559c0eb228f99632ca380b0150da010ab688462ebe4c0b",
  "lib/engine/daniel-read.ts": "84fb14d81def62ffe3491fe9f3f6b64a9705e497952fa37ff4f604d018764e60",
  "lib/engine/format-engine-snapshot-updated-at.ts": "3d68b60b960d83404c9c238a2cd1915db0e6660d7294e94daeb3c5a60da01b4d",
  "lib/engine/mock.ts": "41ccb54fb7d3f57c97bb077fb7de479e5c6597747db80f3ff9d01425f8ddb2a6",
  "lib/engine/notices.ts": "8a684d482eec98408556622250a503a123c05a19bf4df4ff32af6dfe3125b05d",
  "lib/engine/posture-context.ts": "ca6e0421842489adac2458a107367abe48e74ebd135dc3e12941ca21279af0c2",
  "lib/engine/protective-guidance-copy.ts": "610441ae841a9897fefd5be8fd7c87afd3b0129bfae88a845c3720fbd5afd211",
  "lib/engine/review-snapshot-fingerprint.ts": "72f8071de0ad6ffb46e23886c0797adda6df35e1187b9b6cf97ede7aaf5b2411",
  "lib/engine/review-snapshot-memory.ts": "1f3f438de480a434dfef8441ebc80d8b5f9fbb7b17a7ffa2ddb7c0d255f32dfe",
  "lib/engine/sarah-currency-match.ts": "2c99a8af5b40d172aafe11d5ba8ac4e883e45519f23ecc2fb2eec9513cc4358d",
  "lib/engine/sarah-read.ts": "206d90bbf6fbbe6ba74bf9ea76cdd56131154bb7b656df53e3b68d7f5a98edaa",
  "lib/engine/simulator.ts": "20d61b15ad0fde22b478f1bfc953230be96006af0f73fee68a7e23f6e2bad392",
  "lib/engine/stability-explainer-copy.ts": "211ed590aa32ab356801b02c65646f3bef19dac60acb37cf8607ad3fc2c02b08",
  "lib/engine/stability-review-snapshot-copy.ts": "e7b75efc33a775e33e53c952993c23a86865d49bfb62a872bd0c8026b5125b33",
  "lib/engine/types.ts": "3f5118c8369cda1032586ea5242794ef6debebe01f54d5f9b80e9cd1dfcd8f43",
  "lib/engine/useEngineState.ts": "7a0136e81ac09967d0ef40e2312f0c45786c99bb88cb67debc586bd3afd1ddae",
  "lib/fx.ts": "a2c199d2368ed962388ce6c8881dc4ed8bb187cffc833e7d4a5eeff421f3ec18"
};
  for (const [path, hash] of Object.entries(pins)) expect(createHash('sha256').update(readFileSync(resolve(__dirname, '..', path))).digest('hex'), path).toBe(hash);
});


test('RELEASE-GATE-FIX-002 T4 ordinary no-journey rendered content matches immutable baseline', async ({ page }) => {
  const pins: Record<string, string> = {
  "/dashboard": "8c0fcbf6675babec381acb47a24afb57c176def6a227866d6f86b60565f8297e",
  "/deposit": "b8e15226a4e10650fe0427940bc09e42494508f48a8f7ce31ba84b70946d66b9",
  "/withdraw": "655673bedb4d34feee76b506bfaa59108e458364077ff4f3229f6871be5ab675"
};
  for (const [path, hash] of Object.entries(pins)) {
    await seed(page); await page.goto(path);
    if (path !== '/dashboard') await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeVisible();
    await expect.poll(async () => createHash('sha256').update(await page.locator('main').first().innerText()).digest('hex'), { message: path }).toBe(hash);
  }
});
