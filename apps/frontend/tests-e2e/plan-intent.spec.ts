import { expect, test, type Locator } from '@playwright/test';
import { PLAN_INTENT_COPY as copy } from '../lib/copy/plan-intent-copy';
import { formatExampleRateLine } from '../app/(app)/dashboard/RateLine';
import { getSimulationDisplayRate } from '../lib/state/simulation-display-currency';

test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('plan-intent@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test('PLAN-INTENT-001 hierarchy places movement before intent and removes Home targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'plan-intent-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1000, updated_at: 1000 },
      { txn_ref: 'plan-intent-withdrawal', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 2, fx_rate: 0, created_at: 2000, updated_at: 2000 },
    ] }));
    localStorage.setItem('hedgr:last-home-visit', String(Date.now()));
  });
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  const regions = [page.locator('[data-component="HomeHero"]'), ...[
    'dashboard-current-status', 'dashboard-simulation-utilities', 'dashboard-position-line',
    'planning-read-card', 'currency-insight', 'dashboard-disclosures', 'dashboard-restart-journey',
  ].map(id => page.getByTestId(id))];
  for (let i = 1; i < regions.length; i++) {
    const previous = (await regions[i - 1].boundingBox())!;
    const next = (await regions[i].boundingBox())!;
    expect(next.y).toBeGreaterThanOrEqual(previous.y + previous.height);
  }
  await expect(page.getByTestId('research-planning-targets')).toHaveCount(0);
  const rate = page.locator('[data-component="RateLine"]');
  await expect(rate).toHaveText('Example rate: ZMW 27 per US dollar. Not a live rate.');
  await expect(page.getByTestId('currency-insight').locator('..').locator('[data-component="RateLine"]')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toBeVisible();
});

test('PLAN-INTENT-001 own simulation offers its optional purpose question', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.locator('[data-component="HomeHero"]')).toBeVisible();
  const card = page.getByTestId('planning-read-card');
  await expect(card.getByRole('group', { name: copy.question })).toBeVisible();
  await card.getByRole('radio', { name: copy.answers.dated, exact: true }).check();
  await expect(card.getByTestId('planning-read-labels').getByRole('heading').first()).toHaveText(copy.labels.goals);
});

async function checkCard(card: Locator) {
  const text = await card.innerText();
  expect(text.split(copy.limits)).toHaveLength(2);
  expect(text).not.toMatch(/\d|[$£€%]|\b(?:USD|ZMW|KES|NGN|GHS|PHP|yield|first|then|before|priority|ready|covered|enough|safe|protected|locked|growth|earnings|returns)\b|your money|emergency fund|will be there/i);
  const aria = await card.locator('[aria-label], [aria-description]').evaluateAll(nodes => nodes.map(n => `${n.getAttribute('aria-label')} ${n.getAttribute('aria-description')}`).join(' '));
  expect(aria).not.toMatch(/\d|[$£€%]|yield/i);
  await expect(card.getByRole('switch')).toHaveCount(0);
  await expect(card.getByRole('checkbox')).toHaveCount(0);
  await expect(card.getByRole('radio')).toHaveCount(4);
  expect(text).not.toMatch(/You told us|Nothing has moved/);
}

test('merged default, each answer, changing choice and Skip preserve hero without Home targets', async ({ page }) => {
  await page.goto('/dashboard?journey=class-a-val-002&example=own');
  const card = page.getByTestId('planning-read-card');
  const hero = page.locator('[data-component="HomeHero"]');
  await expect(hero.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.skipped);
  expect(await page.getByTestId('dashboard-position-line').evaluate(n => n.nextElementSibling?.getAttribute('data-testid'))).toBe('planning-read-card');
  const originalHero = await hero.innerHTML();
  await expect(page.getByTestId('research-planning-targets')).toHaveCount(0);
  const orders = { regular: ['regular', 'reserve', 'goals'], dated: ['goals', 'regular', 'reserve'], reserve: ['reserve', 'regular', 'goals'] } as const;
  for (const purpose of ['regular', 'dated', 'reserve'] as const) {
    await card.getByRole('radio', { name: copy.answers[purpose], exact: true }).check();
    await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.confirmation(copy.answers[purpose]));
    await expect(card.getByTestId('planning-read-labels').getByRole('heading')).toHaveText(orders[purpose].map(label => copy.labels[label]));
    await expect(card.getByTestId('planning-read-why')).toHaveText(copy.why[orders[purpose][0]]);
    await expect(card.getByTestId('planning-read-dated')).toHaveCount(purpose === 'dated' ? 1 : 0);
    if (purpose === 'dated') await expect(card.getByTestId('planning-read-dated')).toHaveText(copy.dated);
    await checkCard(card);
    expect(await hero.innerHTML()).toBe(originalHero);
    await expect(page.getByTestId('research-planning-targets')).toHaveCount(0);
  }
  await card.getByRole('radio', { name: copy.answers.skip, exact: true }).check();
  await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.skipped);
  await expect(card.getByTestId('planning-read-labels')).toHaveCount(0);
  await expect(card.getByTestId('planning-read-why')).toHaveCount(0);
  await checkCard(card);
});

test('only own-simulation routes expose the card', async ({ page }) => {
  for (const route of ['/dashboard', '/dashboard?example=own', '/dashboard-synthetic-journey?example=sarah', '/dashboard-synthetic-journey?example=daniel', '/dashboard?journey=class-a-val-002&example=sarah', '/dashboard?journey=class-a-val-002&example=daniel']) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('planning-read-card')).toHaveCount(0);
  }
});

test('intent survives client navigation in the session and resets on a document reload', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  const card = page.getByTestId('planning-read-card');
  await card.getByRole('radio', { name: copy.answers.dated, exact: true }).check();
  await page.getByTestId('synthetic-bottom-nav').getByRole('link', { name: 'Activity', exact: true }).click();
  await expect(page).toHaveURL(/\/activity/);
  await page.getByTestId('synthetic-bottom-nav').getByRole('link', { name: 'Home', exact: true }).click();
  await expect(card.getByRole('radio', { name: copy.answers.dated, exact: true })).toBeChecked();
  await page.reload();
  await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.skipped);
  await expect(card.locator('input:checked')).toHaveCount(0);
  const keys = await page.evaluate(() => [...Object.keys(localStorage), ...Object.keys(sessionStorage)]);
  expect(keys.join(' ')).not.toMatch(/intent|purpose|planning-read/);
});

for (const currency of ['ZMW', 'KES', 'NGN', 'GHS', 'PHP'] as const) for (const [width, textScale] of [[390, 1], [320, 2]]) {
  test(`${currency} at ${width}px with ${textScale * 100}% root text: words only, scroll and nav clearance`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/dashboard-synthetic-journey');
    const hero = page.locator('[data-component="HomeHero"]');
    await hero.getByRole('combobox').selectOption(currency);
    await expect(hero.getByTestId('local-balance-figure')).toContainText(`≈ ${currency} `);
    await expect(page.locator('[data-component="RateLine"]')).toHaveText(formatExampleRateLine(currency, getSimulationDisplayRate(currency)));
    const card = page.getByTestId('planning-read-card');
    const normalFont = await card.evaluate(n => parseFloat(getComputedStyle(n).fontSize));
    if (textScale === 2) await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    expect(await card.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBe(normalFont * textScale);
    await card.getByRole('radio', { name: copy.answers.dated, exact: true }).check();
    await checkCard(card);
    const read = card.getByTestId('planning-read-labels');
    await expect(read.getByRole('heading')).toHaveText(['Goals', 'Regular costs', 'Reserve']);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    for (const element of [...await card.getByRole('radio').all(), read.getByRole('listitem').last()]) {
      await element.scrollIntoViewIfNeeded();
      const box = (await element.boundingBox())!;
      const nav = (await page.getByTestId('synthetic-bottom-nav').boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(nav.y + 1);
    }
    const styles = await card.locator('*').evaluateAll(nodes => nodes.flatMap(node => {
      const s = getComputedStyle(node);
      return [s.color, s.backgroundColor, s.borderColor, s.accentColor];
    }));
    for (const color of styles) {
      const rgb = color.match(/^rgb[a]?\((\d+), (\d+), (\d+)/)?.slice(1).map(Number);
      if (rgb) {
        const [r, g, b] = rgb;
        expect(r > g * 1.3 && r > b * 1.3, color).toBe(false);
        expect(g > r * 1.3 && g > b * 1.3, color).toBe(false);
      }
    }
    await info.attach(`${currency}-${width}-${textScale * 100}pct-text`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  });
}
