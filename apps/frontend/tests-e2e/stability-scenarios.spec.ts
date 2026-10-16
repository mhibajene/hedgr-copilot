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
    // §398 F2 accepts this frozen entry promise for this unreleased ticket.
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose the currency used for Sarah’s fictional savings amounts.');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('not converted estimates');
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
      await page.goto(studyEntry); await page.getByRole('combobox').selectOption(currency);
      await page.getByTestId('orientation-continue').click(); await fixedFacts(page);
      for (const control of ['study-continue','study-to-hedgr']) {
        await page.getByTestId(control).click(); await expectNoHolds(page);
        expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(currency);
      }
      await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveValue(currency);
    }
  });

  test('keeps ZMW facts and leaves another-tab preference changes untouched', async ({ page, context }) => {
    await page.goto(studyEntry); await page.getByRole('combobox').selectOption('KES');
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
