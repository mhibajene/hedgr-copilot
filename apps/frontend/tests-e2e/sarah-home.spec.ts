import { expect, test, type Page } from '@playwright/test';
import { SYNTHETIC_RESEARCH_DISCLOSURE_COPY, type DisclosureKey } from '../components/PolicyDisclosure';
import type { ResolvedPolicy } from '../lib/policy/schema';

// §374: one USD-only U3 read, no fee semantics, no writes in Sarah mode.
const ROUTES = ['/dashboard?journey=class-a-val-002', '/dashboard-synthetic-journey'];
const OPTIONS = ['Your own simulation', "Daniel's reserve", "Sarah's course fee"];
const COPY = {
  h1: 'Example', heading: 'Fictional example · Sarah’s course fee', caption: 'ZMW 6,000.00', card: 'Course fee',
  date: 'Example date: 9 Oct 2026',
  due: 'Due 1 Oct 2027.',
  rate: 'Example rate: ZMW 27 per US dollar. Not a live rate.',
  limits: 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.',
};
const AS_OF = '2026-10-09T00:00:00.000Z';
const HIDDEN = ['dashboard-daniel-read', 'dashboard-current-overview', 'dashboard-balance', 'dashboard-position-line',
  'dashboard-current-status', 'dashboard-date-line', 'dashboard-arrival-announcement', 'dashboard-simulation-utilities',
  'dashboard-restart-journey', 'research-planning-targets', 'dashboard-education', 'engine-posture-context',
  'engine-posture-banner', 'engine-protective-guidance', 'dashboard-earn-tile', 'dashboard-error-state'];
const row = { txn_ref: 'sarah-preserve', type: 'deposit', status: 'settled', amount_usd: 800, amount_zmw: 16000,
  fx_rate: 20, created_at: 1, updated_at: 1 };
const routeFor = (route: string, example = 'sarah', extra = '') => `${route}${route.includes('?') ? '&' : '?'}example=${example}${extra ? '&' + extra : ''}`;
const picker = (page: Page) => page.getByRole('combobox', { name: 'Choose an example' });
const panel = (page: Page) => page.getByTestId('dashboard-sarah-read');

async function login(page: Page) {
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('sarah-home@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click(); await expect(page).toHaveURL(/\/dashboard/);
}
async function seed(page: Page, variant = 'activity') {
  // Seed only after the preceding Home is unmounted. Pending visit/review
  // effects otherwise race the reset-preservation snapshot (also on pre-green).
  await page.goto('/api/policy');
  await page.evaluate(({ row, variant }) => {
    for (const store of [localStorage, sessionStorage]) {
      store.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: variant === 'empty' ? [] : [row] }));
      store.setItem('hedgr:wallet', JSON.stringify({ balance: 123456 }));
      store.setItem('hedgr:last-home-visit', '2');
      store.setItem('hedgr.simulation.display-currency', variant === 'empty' ? 'PHP' : 'KES');
      store.setItem('hedgr:engine-review-snapshot-memory', variant === 'valid' ? JSON.stringify([{ viewedAt: '2026-10-01T00:00:00.000Z', changeVsPrior: 'changed', posture: 'tightened' }]) : '{corrupt');
      store.setItem('hedgr:engine-review-snapshot-fingerprint', 'prior-fingerprint');
      store.setItem('unrelated', ' byte-preserved ');
    }
  }, { row, variant });
}
async function snapshot(page: Page) {
  return page.evaluate(() => {
    const dump = (s: Storage) => Object.fromEntries(Array.from({ length: s.length }, (_, i) => s.key(i)!).sort().map(k => [k, s.getItem(k)]));
    return { local: dump(localStorage), session: dump(sessionStorage) };
  });
}
async function recordWrites(page: Page) {
  const install = () => {
    const tracked = window as typeof window & { sarahStorageWrites: string[] };
    tracked.sarahStorageWrites = [];
    for (const method of ['setItem', 'removeItem', 'clear'] as const) {
      const original = Storage.prototype[method];
      Storage.prototype[method] = function (...args: string[]) {
        tracked.sarahStorageWrites.push(`${method}:${args[0] ?? ''}`);
        return Reflect.apply(original, this, args);
      };
    }
  };
  await page.addInitScript(install); await page.evaluate(install);
}
async function noWrites(page: Page) {
  expect(await page.evaluate(() => (window as typeof window & { sarahStorageWrites: string[] }).sarahStorageWrites)).toEqual([]);
}
async function assertRead(page: Page) {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(COPY.h1);
  await expect(panel(page)).toHaveCount(1); await expect(panel(page)).toBeVisible();
  await expect(page.getByTestId('sarah-read-figure')).toHaveText('ZMW 6,000.00');
}
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test('Sarah is selectable on both journey Homes', async ({ page }) => {
  test.setTimeout(90_000); await login(page);
  for (const route of ROUTES) {
    await page.goto(routeFor(route)); await assertRead(page);
    await expect(picker(page).locator('option')).toHaveText(OPTIONS); await expect(picker(page)).toHaveValue('sarah');
    for (const value of ['unknown', '', 'SARAH', 'sarah%20', '__proto__', 'toString']) {
      await page.goto(routeFor(route, value)); await expect(picker(page)).toHaveValue('own');
      await expect(panel(page)).toHaveCount(0); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
    }
  }
  for (const route of ['/dashboard?example=sarah', '/dashboard?journey=class-a-val-002&example=sarah&scenario=unavailable-data', '/dashboard-synthetic-journey?example=sarah&scenario=unavailable-data']) {
    await page.goto(route); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
    await expect(panel(page)).toHaveCount(0); await expect(picker(page)).toHaveCount(0);
  }
  // Live/auth eligibility is covered with real environment guards in paired Vitest, without changing build flags.
});

test('Sarah hero uses $1000.00 USD and one independent fee observation', async ({ page }) => {
  await login(page);
  for (const route of ROUTES) {
    await page.goto(routeFor(route)); await assertRead(page);
    await expect(page.getByTestId('sarah-fee-card')).toHaveCount(1);
    await expect(page.getByTestId('sarah-read-as-of')).toHaveText(COPY.date);
    await expect(panel(page).locator('time')).toHaveCount(4); await expect(page.getByTestId('sarah-read-as-of').locator('time')).toHaveAttribute('datetime', AS_OF); await expect(page.getByTestId('sarah-fee-card').locator('p > time')).toHaveAttribute('datetime', '2027-10-01');
    for (const text of [COPY.due, COPY.rate, COPY.limits]) { await expect(panel(page).getByText(text, { exact: true })).toHaveCount(1); await expect(panel(page).getByText(text, { exact: true })).toBeVisible(); }
    await expect(panel(page).locator('canvas, progress, meter, [role="progressbar"], [data-delta], [data-direction]')).toHaveCount(0);
    await expect(panel(page)).not.toContainText(/history|before|after|last visit|difference|countdown|progress/i);
  }
});

test('Sarah Home has no fee selector or kwacha read', async ({ page }) => {
  await login(page);
  for (const route of ROUTES) for (const fee of ['zmw', 'usd', 'unknown']) {
    await page.goto(routeFor(route, 'sarah', `fee=${fee}&keep=1`)); await assertRead(page);
    await expect(page.getByRole('combobox')).toHaveCount(1); await expect(panel(page).locator('select, input, button:not([aria-controls]), a')).toHaveCount(0);
    await expect(page.getByLabel('Example fee', { exact: true })).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/K29,500|is set in kwacha|USD 1,000 fee|K29,500 fee/);
    await picker(page).selectOption('daniel'); await expect(page.getByTestId('dashboard-daniel-read')).toBeVisible();
    expect(new URL(page.url()).searchParams.get('fee')).toBe(fee); expect(new URL(page.url()).searchParams.get('keep')).toBe('1');
    await picker(page).selectOption('own'); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
    expect(new URL(page.url()).searchParams.get('fee')).toBe(fee);
  }
});

test('Example navigation restores the URL without changing simulation state', async ({ page }) => {
  test.setTimeout(90_000); await login(page); await seed(page);
  for (const route of ROUTES) {
    await page.goto(`${route}${route.includes('?') ? '&' : '?'}keep=1`); await expect(page.getByTestId('usd-balance')).toContainText('$800.00');
    const before = await snapshot(page); await recordWrites(page);
    // An inert reset value must also be dropped by example navigation.
    await page.evaluate(() => { const u = new URL(location.href); u.searchParams.set('reset', '0'); history.replaceState(null, '', u); });
    const ownUrl = page.url().replace(/([?&])reset=0&?/, '$1').replace(/[?&]$/, '');
    for (const selection of ['sarah', 'daniel', 'own']) {
      await picker(page).selectOption(selection);
      if (selection === 'sarah') await assertRead(page);
      else await expect(page.getByTestId(selection === 'daniel' ? 'dashboard-daniel-read' : 'dashboard-balance')).toBeVisible();
      const u = new URL(page.url()); expect(u.searchParams.get('keep')).toBe('1'); expect(u.searchParams.has('reset')).toBe(false);
      expect(u.pathname).toBe(new URL(route, page.url()).pathname);
      if (route.includes('journey=')) expect(u.searchParams.get('journey')).toBe('class-a-val-002');
      expect(await snapshot(page)).toEqual(before); await noWrites(page);
    }
    expect(page.url()).toBe(ownUrl);
    for (const selection of ['daniel', 'sarah', 'own']) {
      await page.goBack();
      if (selection === 'sarah') await assertRead(page);
      else await expect(page.getByTestId(selection === 'daniel' ? 'dashboard-daniel-read' : 'dashboard-balance')).toBeVisible();
      expect(await snapshot(page)).toEqual(before); await noWrites(page);
    }
    for (const selection of ['sarah', 'daniel', 'own']) {
      await page.goForward();
      if (selection === 'sarah') await assertRead(page);
      else await expect(page.getByTestId(selection === 'daniel' ? 'dashboard-daniel-read' : 'dashboard-balance')).toBeVisible();
      expect(await snapshot(page)).toEqual(before); await noWrites(page);
    }
    await page.goto(routeFor(route, 'sarah', 'keep=1')); await assertRead(page);
    const direct = await snapshot(page); expect(direct).toEqual(before); await noWrites(page);
    await picker(page).selectOption('own'); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
    expect(await snapshot(page)).toEqual(direct); await noWrites(page);
  }
});

test('Sarah refuses reset without clearing stored simulation', async ({ page }) => {
  await login(page);
  for (const route of ROUTES) for (const reset of ['1', '0', 'unknown']) {
    await seed(page); const before = await snapshot(page); await recordWrites(page);
    await page.goto(routeFor(route, 'sarah', `reset=${reset}&keep=1`));
    await expect.poll(async () => (await snapshot(page)).local['hedgr:wallet']).toBe(before.local['hedgr:wallet']);
    await assertRead(page); expect(await snapshot(page)).toEqual(before); await noWrites(page);
    const u = new URL(page.url()); expect(u.searchParams.has('reset')).toBe(false);
    expect(u.searchParams.get('example')).toBe('sarah'); expect(u.searchParams.get('keep')).toBe('1');
    expect(u.pathname).toBe(new URL(route, page.url()).pathname);
    if (route.includes('journey=')) expect(u.searchParams.get('journey')).toBe('class-a-val-002');
    for (const example of ['daniel', 'own']) {
      await seed(page); await page.goto(routeFor(route, example, 'reset=1'));
      await expect(page.getByTestId(example === 'daniel' ? 'dashboard-daniel-read' : 'dashboard-balance')).toBeVisible();
      await expect.poll(async () => (await snapshot(page)).local['hedgr:wallet']).toBeUndefined();
      const cleared = await snapshot(page); expect(JSON.parse(cleared.local['hedgr:ledger']!).transactions).toEqual([]);
      expect(cleared.local['hedgr:last-home-visit']).toBe(example === 'daniel' ? '2' : undefined);
      expect(new URL(page.url()).searchParams.has('reset')).toBe(false);
    }
  }
  await seed(page); await page.goto('/dashboard?example=sarah&reset=1');
  await expect(page.getByTestId('dashboard-balance')).toBeVisible(); await expect(panel(page)).toHaveCount(0);
  expect((await snapshot(page)).local['hedgr:wallet']).toBeUndefined();
});

test('Sarah stays separate from simulation and mock guidance', async ({ page }) => {
  test.setTimeout(90_000); await login(page);
  for (const route of ROUTES) for (const variant of ['empty', 'activity', 'valid']) for (const posture of ['normal', 'tightening', 'tightened', 'recovery']) {
    await seed(page, variant); const before = await snapshot(page);
    await page.goto(routeFor(route, 'sarah', `enginePosture=${posture}`)); await assertRead(page);
    for (const id of HIDDEN) await expect(page.getByTestId(id), id).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/Start here|Recent activity|Planning targets|mock guidance|APY|Retry|Today/);
    await expect(page.getByRole('combobox')).toHaveCount(1); await expect(page.getByTestId('dashboard-disclosures')).toBeVisible();
    expect(await snapshot(page)).toEqual(before);
  }
  // Loading/error projection controls use the actual page with mocked useBalance in paired Vitest.
});

test('Sarah Home uses locked copy and no funding claims', async ({ page }) => {
  await login(page);
  for (const route of ROUTES) {
    await page.goto(routeFor(route)); await assertRead(page);
    await expect(page.locator('#dashboard-sarah-label')).toHaveText(COPY.heading); await expect(page.getByTestId('sarah-read-figure')).toHaveText(COPY.caption);
    expect(await panel(page).evaluate(n => { const copy = n.cloneNode(true) as HTMLElement; copy.querySelector('[data-testid="example-line-chart"]')?.remove(); return copy.textContent; })).toBe(COPY.heading + COPY.caption + COPY.date + COPY.card + '$1000.00 USD' + COPY.due + COPY.rate + COPY.limits);
    expect(await page.getByTestId('sarah-fee-card').evaluate(n => { const copy = n.cloneNode(true) as HTMLElement; copy.querySelector('[data-testid="example-line-chart"]')?.remove(); return copy.textContent; })).toBe(COPY.card + '$1000.00 USD' + COPY.due + COPY.rate + COPY.limits);
    await expect(page.getByText(COPY.rate, { exact: true })).toHaveCount(1);
    await expect(page.getByText(COPY.limits, { exact: true })).toBeVisible();
    const text = (await panel(page).textContent())!.replace(COPY.limits, '');
    expect(text).not.toMatch(/hedg(?:e|ing)|sav(?:ing|ings)|contribut|sufficien|cover(?:age|ed|s)?|gap|progress|forecast|afford|can pay|on track|fund(?:ed|ing)|goal|guarantee|protect|gain|loss|higher|lower|increase|decrease/i);
    await expect(panel(page).locator('button:not([aria-controls]), a, input, select, progress, meter, [role="progressbar"], details')).toHaveCount(0);
    // Reading order: figure then caption/date, followed by the complete adjacent fee card.
    const order = await panel(page).locator('[data-testid]').evaluateAll(nodes => nodes.map(n => n.getAttribute('data-testid')));
    await expect(page.getByTestId('sarah-read-caption')).toHaveCount(0);
    expect(order.indexOf('sarah-read-figure')).toBeLessThan(order.indexOf('sarah-read-as-of'));
    expect(order.indexOf('sarah-read-as-of')).toBeLessThan(order.indexOf('sarah-fee-card'));
  }
});

test('Example reading order and reflow survive enlarged text', async ({ page }) => {
  test.setTimeout(120_000); const errors: string[] = []; page.on('pageerror', error => errors.push(error.message)); await login(page);
  const policy = await (await page.request.get('/api/policy')).json() as ResolvedPolicy;
  const disclosureKeys = policy.policy.disclosures.requiredKeys;
  expect(disclosureKeys.length).toBeGreaterThan(0);
  for (const viewport of [{ width: 1440, height: 1000, text: 100 }, { width: 390, height: 844, text: 100 }, { width: 320, height: 700, text: 200 }]) {
    await page.setViewportSize(viewport);
    for (const route of ROUTES) {
      await page.goto(route); await expect(picker(page)).toHaveValue('own');
      await picker(page).focus(); await page.keyboard.press('S'); await assertRead(page); await expect(picker(page)).toBeFocused();
      await page.addStyleTag({ content: `html { font-size: ${viewport.text}%; }` });
      await expect(page.getByTestId('example-picker-value')).toHaveText(OPTIONS[2]);
      await expect(page.locator('label[for="dashboard-example-picker"]')).toBeVisible();
      await page.getByTestId('dashboard-disclosures').locator('summary').focus(); await page.keyboard.press('Enter');
      await expect(page.getByTestId('dashboard-disclosures').locator('[data-disclosure-key]')).toHaveCount(disclosureKeys.length);
      for (const key of disclosureKeys) {
        expect(Object.keys(SYNTHETIC_RESEARCH_DISCLOSURE_COPY)).toContain(key);
        await expect(page.getByText(SYNTHETIC_RESEARCH_DISCLOSURE_COPY[key as DisclosureKey], { exact: true })).toBeVisible();
      }
      for (const text of [COPY.due, COPY.rate, COPY.limits]) await expect(panel(page).getByText(text, { exact: true })).toBeVisible();
      const geometry = await page.evaluate(() => {
        const visible = Array.from(document.querySelectorAll<HTMLElement>('[data-testid="dashboard-sarah-read"] *, [data-testid="example-picker-value"], label[for="dashboard-example-picker"], [data-disclosure-key], [data-testid="dashboard-disclosures"] summary'))
          .filter(n => n.textContent?.trim() && getComputedStyle(n).display !== 'none' && !n.classList.contains('sr-only') && n.getBoundingClientRect().width > 0);
        const clipped = visible.filter(n => {
          const b = n.getBoundingClientRect(); const range = document.createRange(); range.selectNodeContents(n);
          const rects = Array.from(range.getClientRects());
          // Font metrics can extend vertically beyond a line box with visible overflow.
          // Check actual clipping boundaries as well as horizontal fit; do not mistake
          // those visible glyphs for clipped accessibility text.
          const ancestorClips = rects.some(r => {
            for (let parent: HTMLElement | null = n; parent; parent = parent.parentElement) {
              const style = getComputedStyle(parent); const box = parent.getBoundingClientRect();
              const clips = (overflow: string) => ['hidden', 'clip', 'auto', 'scroll'].includes(overflow);
              if (clips(style.overflowX) && (r.left < box.left - 1 || r.right > box.right + 1)) return true;
              if (parent !== document.body && parent !== document.documentElement && clips(style.overflowY) &&
                (r.top < box.top - 1 || r.bottom > box.bottom + 1)) return true;
            }
            return false;
          });
          return n.scrollWidth > n.clientWidth + 1 && getComputedStyle(n).display !== 'inline' ||
            rects.some(r => r.left < b.left - 1 || r.right > b.right + 1) || ancestorClips || getComputedStyle(n).textOverflow === 'ellipsis';
        }).map(n => {
          const box = n.getBoundingClientRect(); const range = document.createRange(); range.selectNodeContents(n);
          return { id: n.getAttribute('data-testid') ?? n.textContent, width: n.clientWidth, scrollWidth: n.scrollWidth,
            box: box.toJSON(), rects: Array.from(range.getClientRects()).map(r => r.toJSON()),
            overflow: getComputedStyle(n).overflow, font: getComputedStyle(n).fontSize, lineHeight: getComputedStyle(n).lineHeight };
        });
        const grid = getComputedStyle(document.querySelector('[data-testid="sarah-home-grid"]')!).gridTemplateColumns;
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, clipped,
          columns: grid.split(' ').length, font: parseFloat(getComputedStyle(document.querySelector('[data-testid="example-picker-value"]')!).fontSize),
          rootFont: parseFloat(getComputedStyle(document.documentElement).fontSize) };
      });
      await test.info().attach(`layout-${viewport.width}-${viewport.text}`, { body: JSON.stringify(geometry, null, 2), contentType: 'application/json' });
      await page.screenshot({ path: test.info().outputPath(`sarah-${route.includes('journey=') ? 'query' : 'path'}-${viewport.width}-${viewport.text}.png`), fullPage: true });
      expect(geometry.overflow).toBeLessThanOrEqual(1); expect(geometry.clipped).toEqual([]);
      expect(geometry.columns).toBe(viewport.width === 1440 ? 2 : 1); expect(geometry.font).toBeGreaterThanOrEqual(viewport.text === 200 ? 28 : 14);
      expect(geometry.rootFont).toBe(viewport.text === 200 ? 32 : 16);
      await page.goBack(); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      await page.goForward(); await assertRead(page);
      await page.waitForTimeout(700); // Native type-ahead must expire before the next independent letter.
      await picker(page).focus(); await page.keyboard.press('Y'); await expect(page.getByTestId('dashboard-balance')).toBeVisible();
    }
  }
  expect(errors).toEqual([]);
});

// §391: deterministic event dates and current-year presentation.
test.use({ timezoneId: 'UTC' });
