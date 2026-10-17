import { expect, test } from '@playwright/test';

const studyEntry = '/orientation?study=stability-scenarios';
const preferenceKey = 'hedgr.simulation.display-currency';
const boundary = 'This example uses the facts on this page and nothing else. No real money is involved. Nothing you do here is saved.';
const retiredPanelStrings = ['What Hedgr would add', 'What Hedgr would point out', 'What she needs', 'Same as before', 'Same savings, same due date. A different fee currency changes what Sarah needs to watch.', 'All other facts remain the same.', 'Continue to how Hedgr would put this', 'Continue to what Hedgr helps Sarah see', 'Authored research example · not a live assessment of anyone’s money', 'This is an authored research example for Sarah’s fictional situation. It is not Hedgr reading your money, not Stability Engine output, and not a live financial assessment.'];
const holdPatterns = /30000|30,000|if every planned contribution|anchored|relative to the obligation|keep visible|fewer surprises|Hedgr shows|Hedgr tracks|enough money|will be there|companion|moves with it|\bonly\b|with Hedgr|dollar-linked portion|Hedgr plays no part|no longer changes|fully funded|planned|saving for|progress|sufficien/i;

async function enterStudy(page: import('@playwright/test').Page) {
  await page.goto(studyEntry);
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
}
async function expectNoHolds(page: import('@playwright/test').Page) {
  const stimulus = page.getByTestId('stability-stimulus');
  await expect(stimulus).not.toContainText(holdPatterns);
  await expect(stimulus).not.toContainText(/position|judgement|interprets|Stability Status|posture|score/i);
  await expect(stimulus.locator('input, textarea, form, meter')).toHaveCount(0);
  await expect(stimulus.getByRole('progressbar')).toHaveCount(0);
  for (const phrase of retiredPanelStrings) await expect(stimulus).not.toContainText(phrase);
  await expect(stimulus.locator('[data-testid="study-panel-before"], [data-testid="study-panel-after"], [data-testid="study-row-marker"], [data-testid="study-authored-label"]')).toHaveCount(0);
  await expect(stimulus).not.toContainText('→');
}
async function fixedFacts(page: import('@playwright/test').Page) {
  await expect(page.getByTestId('sarah-facts')).toContainText('Situation on 9 October 2026');
  await expect(page.getByTestId('sarah-facts')).toContainText('She deposited ZMW 4,000.00 on 14 April 2026 and ZMW 2,000.00 on 21 July 2026. She holds ZMW 6,000.00.');
  await expect(page.getByTestId('course-fee')).toHaveText('Her course fee is $1000.00 USD, due on 1 October 2027.');
  await expect(page.locator('[data-slot="8"]')).toHaveText('This read does not establish whether Sarah can pay the fee.');
}

test.describe('RESEARCH-PAGES-REGISTRY-ALIGN-001', () => {
  test('keeps ordinary orientation and presents registry facts without prompts or premature interpretation', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveText('Enter Hedgr');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose how local estimates are shown.');
    await page.goto(studyEntry);
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.locator('#simulation-display-currency-helper')).toHaveCount(0);
    await expect(page.getByRole('combobox')).toHaveCount(0);
    await expect(page.getByTestId('orientation-surface')).not.toContainText(/Choose the currency|fictional savings amounts|not converted estimates/);
    await expect(page.getByTestId('orientation-continue')).toHaveText('Continue to Sarah’s example');
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sarah’s course fee');
    await expect(page.locator('[data-slot="1"]')).toHaveText('Fictional example');
    await expect(page.getByTestId('study-common-boundary')).toHaveText(boundary);
    await fixedFacts(page);
    await expect(page.getByTestId('study-hedgr-explanation')).toHaveCount(0);
    await expect(page.getByTestId('sarah-lived-caution')).toHaveCount(0);
    await expect(page.getByTestId('stability-stimulus')).not.toContainText(/what can you conclude|in your own words|what would you still need to know|does this change|what changes in your interpretation/i);
    await expectNoHolds(page);
  });

  test('moves from the locked what-if to the Hedgr stage and preserved next action', async ({ page }) => {
    await enterStudy(page);
    await page.getByTestId('study-continue').click();
    await expect(page.getByRole('heading', { name: 'What if the course provider took kwacha?' })).toBeFocused();
    await expect(page.locator('[data-slot="10"]')).toHaveText('Example scenario');
    await expect(page.locator('[data-slot="12"]')).toHaveText('Imagine the provider offered to take payment in kwacha. How much kwacha it would ask for depends on terms the provider sets. This example does not set them.');
    await expect(page.locator('[data-slot="13"]')).toHaveText('Nothing else about Sarah changes in this scenario.');
    await expect(page.getByTestId('course-fee')).toHaveCount(0);
    await expect(page.getByTestId('study-to-hedgr')).toHaveText('Continue');
    await expectNoHolds(page);
    await page.getByTestId('study-to-hedgr').click();
    const explanation = page.getByTestId('study-hedgr-explanation');
    await expect(explanation.getByRole('heading', { name: 'What Hedgr helps Sarah see' })).toBeFocused();
    await expect(explanation.locator('[data-slot="17"]')).toHaveText('Sarah holds kwacha. Her fee is in US dollars. The number of kwacha it takes to pay a US dollar fee changes when the exchange rate changes.');
    const home = page.getByRole('link', { name: 'See Sarah’s example on Home' });
    await expect(home).toHaveAttribute('href', '/dashboard-synthetic-journey?example=sarah');
    await expect(page.getByTestId('study-attribution')).toHaveText('Hedgr wrote this example in advance, from the facts about Sarah on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money.');
    await expect(page.getByTestId('study-limits')).toHaveText('This example does not predict exchange rates. It is not financial advice.');
    const order = await page.locator('[data-slot]').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-slot')));
    expect(order).toEqual(['1','2','16','17','18','19','20','21','22']);
    const attribution = await page.getByTestId('study-attribution').boundingBox();
    const limit = await page.getByTestId('study-limits').boundingBox();
    expect(limit!.y).toBeGreaterThan(attribution!.y);
    await expect(page.getByTestId('study-common-boundary')).toHaveText(boundary);
    await expect(page.getByTestId('study-to-reserve')).toHaveAttribute('href', '/research/reserve-scenario?v=1');
    await expect(page.getByTestId('study-bridge')).toHaveCount(0);
    await expect(page.getByTestId('study-simulation-link')).toHaveCount(0);
    await expect(page.getByTestId('stability-stimulus')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.getByTestId('study-to-reserve')).toHaveCSS('border-radius', '9999px');
    await expect(page.getByText('Review the introduction')).toBeVisible();
    await expectNoHolds(page);
    await home.click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey\?example=sarah$/);
    await expect(page.getByTestId('dashboard-sarah-read')).toBeVisible();
    await page.goBack();
    await page.getByTestId('study-continue').click(); await page.getByTestId('study-to-hedgr').click();
    await page.getByTestId('study-to-reserve').click();
    await expect(page).toHaveURL(/\/research\/reserve-scenario\?v=1$/);
    await expect(page.getByTestId('reserve-stimulus')).toContainText('Daniel keeps a reserve in US dollars.');
  });

  test('R11 zmw-only keeps each stored preference unchanged across all stages', async ({ page }) => {
    for (const currency of ['ZMW','KES','NGN','GHS','PHP']) {
      await page.goto('/orientation');
      await page.evaluate(({ key, currency }) => localStorage.setItem(key, currency), { key: preferenceKey, currency });
      await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveCount(0);
      await page.getByTestId('orientation-continue').click(); await fixedFacts(page);
      for (const control of ['study-continue','study-to-hedgr']) {
        await page.getByTestId(control).click(); await expectNoHolds(page);
        expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(currency);
      }
      await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveCount(0);
      expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(currency);
    }
  });

  test('keeps ZMW facts and leaves another-tab preference changes untouched', async ({ page, context }) => {
    await page.goto('/orientation');
    await page.evaluate(key => localStorage.setItem(key, 'KES'), preferenceKey);
    await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveCount(0);
    await page.getByTestId('orientation-continue').click();
    const otherTab = await context.newPage(); await otherTab.goto('/orientation');
    await otherTab.getByRole('combobox').selectOption('NGN'); await fixedFacts(page);
    await page.getByTestId('study-continue').click();
    await expect(page.locator('[data-slot="11"]')).toHaveText('What if the course provider took kwacha?');
    await page.getByTestId('study-to-hedgr').click();
    await expect(page.locator('[data-slot="17"]')).toContainText('Sarah holds kwacha.');
    expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('NGN');
    await expect(otherTab.getByRole('combobox')).toHaveValue('NGN'); await otherTab.close();
  });

  test('keeps every Continue operable at small width and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 }); await enterStudy(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const control of ['study-continue','study-to-hedgr','study-to-reserve']) {
      await page.getByTestId(control).focus(); await expect(page.getByTestId(control)).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.getByTestId(control).press('Enter');
    }
    await expect(page.getByTestId('reserve-stimulus')).toBeVisible();
    for (const width of [320,390,1280,1440]) {
      await page.setViewportSize({ width, height: 800 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('R16 layout-a11y keeps cards, focus and slot order at 1440, 390 and 320@200%', async ({ page }) => {
    for (const width of [1440,390,320]) {
      await page.setViewportSize({ width, height: 900 }); await enterStudy(page);
      if (width === 320) await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      for (const control of ['study-continue','study-to-hedgr']) {
        await page.keyboard.press('Tab');
        // Traverse the actual keyboard order, including the footer between stages.
        for (let step = 0; step < 5 && !await page.getByTestId(control).evaluate(el => el === document.activeElement); step++) await page.keyboard.press('Tab');
        await expect(page.getByTestId(control)).toBeFocused();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.keyboard.press('Enter');
      }
      await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'See Sarah’s example on Home' })).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.getByTestId('study-authored-label')).toHaveCount(0);
    }
  });

  test('the bridge opens the simulation at first use for a returning participant', async ({ page }) => {
    await page.goto('/'); await page.evaluate(() => {
      const now = Date.now();
      localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
        { txn_ref: 'earlier-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: now - 3 * 86400000, updated_at: now - 3 * 86400000 },
        { txn_ref: 'earlier-withdrawal', type: 'withdrawal', status: 'settled', amount_zmw: 40, amount_usd: 2, fx_rate: 20, created_at: now - 2 * 86400000, updated_at: now - 2 * 86400000 },
      ] }));
      localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 3 }, version: 0 }));
      localStorage.setItem('hedgr:last-home-visit', String(now - 86400000));
    });
    await enterStudy(page);
    for (const control of ['study-continue','study-to-hedgr','study-to-reserve','study-continue','study-to-hedgr','study-to-bridge','study-simulation-link']) await page.getByTestId(control).click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
    await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
    await expect(page.getByTestId('dashboard-first-use-steps')).toBeVisible();
    await expect(page.getByText('Since you were last here')).toHaveCount(0);
  });
});

test.describe('STUDY-ENTRY-CURRENCY-ALIGN-001', () => {
  test('E1 E2 E7 E8 study entry omits currency choice and renders exact S3', async ({ page }) => {
    await page.goto(studyEntry);
    const surface = page.getByTestId('orientation-surface');
    await expect(page.getByTestId('simulation-display-currency-entry')).toHaveCount(0);
    await expect(page.getByRole('combobox')).toHaveCount(0);
    await expect(surface).not.toContainText(/Choose the currency|fictional savings amounts|not converted estimates|ZMW|kwacha|USD|US dollar|KES|NGN|GHS|PHP|currency/i);
    await expect(page.getByTestId('stability-study-currency-note')).toHaveText("The next page shows Sarah's fictional course fee. Do not enter real financial information.");
    await expect(surface).not.toContainText(/presents|course-savings situation/);
    expect(await page.getByTestId('orientation-disclosure').evaluate(el => [el.nextElementSibling?.getAttribute('data-testid'), el.nextElementSibling?.nextElementSibling?.tagName])).toEqual(['stability-study-currency-note', 'FOOTER']);
  });

  test('E4 E5 stored-value-preserved through both pages and home-readers-unaffected', async ({ page, context }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('study-entry@hedgr.test');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    // Unmount Home before seeding; instrumentation begins after this setup write.
    await page.goto('/orientation');
    await page.evaluate(key => {
      localStorage.setItem(key, 'KES');
      localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
        { txn_ref: 'study-entry-deposit', type: 'deposit', status: 'settled', amount_zmw: 135, amount_usd: 5, fx_rate: 27, created_at: 1000, updated_at: 1000 },
      ] }));
    }, preferenceKey);
    const writes: string[] = [];
    await context.exposeBinding('recordStudyPreferenceWrite', (_source, operation: string) => { writes.push(operation); });
    await context.addInitScript(key => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function(name, value) {
        if (name === key) void (window as unknown as { recordStudyPreferenceWrite: (operation: string) => Promise<void> }).recordStudyPreferenceWrite('setItem');
        return original.call(this, name, value);
      };
      const remove = Storage.prototype.removeItem;
      Storage.prototype.removeItem = function(name) {
        if (name === key) void (window as unknown as { recordStudyPreferenceWrite: (operation: string) => Promise<void> }).recordStudyPreferenceWrite('removeItem');
        return remove.call(this, name);
      };
      const clear = Storage.prototype.clear;
      Storage.prototype.clear = function() {
        void (window as unknown as { recordStudyPreferenceWrite: (operation: string) => Promise<void> }).recordStudyPreferenceWrite('clear');
        return clear.call(this);
      };
    }, preferenceKey);
    await enterStudy(page);
    for (const control of ['study-continue','study-to-hedgr','study-to-reserve','study-continue','study-to-hedgr']) {
      expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('KES');
      await page.getByTestId(control).click();
    }
    expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('KES');
    expect(writes).toEqual([]);
    await page.goto('/dashboard-synthetic-journey');
    await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 650.00 Example figure, not a quote');
    await page.goto('/deposit?journey=class-a-val-002');
    await expect(page.getByTestId('deposit-fx-block')).toHaveText('Simulated example rate: 1 USD = 130.00 KES');
    await page.getByTestId('deposit-amount').fill('130');
    await expect(page.getByTestId('deposit-conversion-preview')).toContainText('shows 130 KES as +$1.00');
    await page.goto('/withdraw?journey=class-a-val-002');
    await expect(page.getByTestId('withdraw-fx-block')).toHaveText('Simulated example rate: 1 USD = 130.00 KES');
    await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 650.00 Example figure, not a quote');
    expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe('KES');
    expect(writes).toEqual([]);
  });

  test('E10 layout-a11y at 1440, 390 and 320@200% with real keyboard reachability', async ({ page }) => {
    const { readFileSync } = await import('node:fs');
    const { resolve } = await import('node:path');
    // Local optional axe source lives with private evidence; no product dependency.
    const axePath = process.env.STUDY_ENTRY_AXE_PATH;
    for (const width of [1440,390,320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(studyEntry);
      if (width === 320) await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      expect(await page.evaluate(() => ({ width: innerWidth, text: document.documentElement.style.fontSize }))).toEqual({ width, text: width === 320 ? '200%' : '' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const next = page.getByTestId('orientation-continue');
      for (let step = 0; step < 8 && !await next.evaluate(el => el === document.activeElement); step++) await page.keyboard.press('Tab');
      await expect(next).toBeFocused();
      if (axePath) {
        await page.addScriptTag({ content: readFileSync(resolve(axePath), 'utf8') });
        const violations = await page.evaluate(async () => {
          const axe = (window as unknown as { axe: { run: () => Promise<{ violations: { id: string }[] }> } }).axe;
          return (await axe.run()).violations;
        });
        expect(violations).toEqual([]);
      }
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
    }
  });
});
