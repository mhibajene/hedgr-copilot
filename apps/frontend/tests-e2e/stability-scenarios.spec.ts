import { expect, test } from '@playwright/test';

const studyEntry = '/orientation?study=stability-scenarios';

const holdPatterns = /30000|30,000|if every planned contribution|anchored|relative to the obligation|keep visible|fewer surprises|Hedgr shows|Hedgr tracks|enough money|will be there|companion|moves with it/;

const retiredPanelStrings = [
  'What Hedgr would add',
  'What Hedgr would point out',
  'What she needs',
  'Same as before',
  'Same savings, same due date. A different fee currency changes what Sarah needs to watch.',
  'All other facts remain the same.',
  'Continue to how Hedgr would put this',
  'Continue to what Hedgr helps Sarah see',
  'Only the information shown here is being considered. No response is entered or saved on this page.',
];

const rowKeys = ['available', 'planned', 'due', 'watch'] as const;
const expectedLabels = ['Available now', 'Planned', 'Due', 'What to watch'];

async function enterStudy(page: import('@playwright/test').Page) {
  await page.goto(studyEntry);
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
}

async function expectNoHolds(page: import('@playwright/test').Page) {
  const stimulus = page.getByTestId('stability-stimulus');
  await expect(stimulus).not.toContainText(holdPatterns);
  await expect(stimulus).not.toContainText(/position|judgement|interprets|Stability Status|posture|score/i);
  await expect(stimulus.locator('input, textarea, form')).toHaveCount(0);
  await expect(stimulus.getByRole('progressbar')).toHaveCount(0);
  await expect(stimulus.locator('meter')).toHaveCount(0);
}

async function expectRetiredStringsAbsent(page: import('@playwright/test').Page) {
  const stimulus = page.getByTestId('stability-stimulus');
  for (const phrase of retiredPanelStrings) {
    await expect(stimulus).not.toContainText(phrase);
  }
  await expect(stimulus.getByText('What changed:', { exact: true })).toHaveCount(0);
  await expect(stimulus.getByText('What is still open:', { exact: true })).toHaveCount(0);
  await expect(stimulus.getByRole('heading', { name: 'Before the change', exact: true })).toHaveCount(0);
  await expect(stimulus.getByRole('heading', { name: 'After the change', exact: true })).toHaveCount(0);
}

test.describe('Research Two-Beat Sarah example', () => {
  test('keeps ordinary orientation and presents A1 facts without prompts or premature interpretation', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveText('Enter Hedgr');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose how local estimates are shown.');

    await page.goto(studyEntry);
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose the currency used for Sarah’s fictional savings amounts.');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('not converted estimates');
    await expect(page.getByTestId('orientation-continue')).toHaveText('Continue to Sarah’s example');
    await page.getByTestId('orientation-continue').click();

    const stimulus = page.getByTestId('stability-stimulus');
    await expect(stimulus).toContainText('Fictional research example · no real money');
    await expect(page.getByTestId('study-common-boundary')).toHaveText('This example uses only the facts on this page. Nothing you do here is saved.');
    await expect(page.getByTestId('sarah-facts')).toContainText('Situation on 1 October 2026');
    await expect(page.getByTestId('sarah-facts')).toContainText('Sarah already has K6,000 set aside');
    await expect(page.getByTestId('sarah-facts')).toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('course-fee')).toHaveText('The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.');
    await expect(page.getByTestId('sarah-lived-caution')).toHaveCount(0);
    await expect(page.getByTestId('study-hedgr-explanation')).toHaveCount(0);
    await expect(stimulus).not.toContainText(/what can you conclude|in your own words|what would you still need to know|does this change|what changes in your interpretation/i);
    await expect(stimulus.locator('input, textarea, form')).toHaveCount(0);
  });

  test('moves from Sarah’s fee change to the value panel and a simulation bridge', async ({ page }) => {
    await enterStudy(page);
    const commonBoundary = await page.getByTestId('study-common-boundary').innerText();
    await page.getByTestId('study-continue').click();
    await expect(page.getByRole('heading', { name: 'Sarah’s changed course fee', level: 2 })).toBeFocused();
    await expect(page.getByTestId('sarah-facts')).not.toContainText('Situation on 1 October 2026');
    await expect(page.getByTestId('sarah-facts')).not.toContainText('Sarah already has K6,000 set aside');
    await expect(page.getByTestId('sarah-facts')).not.toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('course-fee')).toHaveText('The course provider has changed the fee to K29,500, payable in Zambian kwacha on 1 October 2027. It was USD 1,000, payable in US dollars.');
    await expect(page.getByTestId('sarah-facts')).toContainText('Nothing else has changed.');
    await expect(page.getByTestId('sarah-lived-caution')).toHaveCount(0);
    await expect(page.getByTestId('stability-stimulus')).not.toContainText('Before this change');
    await expect(page.getByTestId('stability-stimulus')).not.toContainText('currency mismatch no longer applies');
    await expect(page.getByTestId('study-to-hedgr')).toHaveText('Continue');
    await expect(page.getByTestId('study-hedgr-explanation')).toHaveCount(0);
    await expectNoHolds(page);
    await expectRetiredStringsAbsent(page);

    await page.getByTestId('study-to-hedgr').click();
    const explanation = page.getByTestId('study-hedgr-explanation');
    await expect(explanation.getByRole('heading', { name: 'What Hedgr helps Sarah see' })).toBeFocused();
    await expect(page.getByTestId('stability-stimulus')).not.toContainText('How Hedgr would put this');
    await expect(page.getByTestId('stability-stimulus')).not.toContainText('Still Sarah’s course-savings example.');
    await expect(page.getByTestId('study-authored-label')).toHaveText('Authored research example · not a live assessment of anyone’s money');
    await expect(page.getByTestId('study-value-panel').getByRole('heading', { name: 'Before the fee changed' })).toBeVisible();
    await expect(page.getByTestId('study-value-panel').getByRole('heading', { name: 'After the fee changed' })).toBeVisible();
    await expect(page.getByTestId('study-value-panel').getByRole('tablist')).toHaveCount(0);
    await expect(page.getByTestId('study-panel-close')).toHaveCount(0);
    await expectRetiredStringsAbsent(page);

    const beforeLabels = await page.getByTestId('study-panel-before').locator('dt').allTextContents();
    const afterLabels = await page.getByTestId('study-panel-after').locator('dt').allTextContents();
    expect(beforeLabels).toEqual(expectedLabels);
    expect(afterLabels).toEqual(expectedLabels);

    await expect(page.getByTestId('study-value-panel')).toContainText('K6,000');
    await expect(page.getByTestId('study-value-panel')).toContainText('K24,000 over 12 months, not available yet');
    await expect(page.getByTestId('study-value-panel')).toContainText('USD 1,000 on 1 October 2027');
    await expect(page.getByTestId('study-value-panel')).toContainText('K29,500 on 1 October 2027');
    await expect(page.getByTestId('study-panel-before')).toContainText('Sarah is saving in kwacha, but the fee is in US dollars. If the exchange rate moves, the amount of kwacha she needs can change.');
    await expect(page.getByTestId('study-panel-after')).toContainText('Sarah’s savings and the fee are now both in kwacha, so the exchange rate no longer changes the amount she needs. What is still open is whether the planned K24,000 arrives on time.');

    await expect(page.getByTestId('study-panel-before').getByTestId('study-row-marker')).toHaveCount(0);
    await expect(page.getByTestId('study-panel-after').getByTestId('study-row-marker')).toHaveCount(2);
    await expect(page.getByTestId('study-panel-after').locator('[data-row="due"] [data-testid="study-row-marker"]')).toHaveText('New');
    await expect(page.getByTestId('study-panel-after').locator('[data-row="watch"] [data-testid="study-row-marker"]')).toHaveText('New');
    await expect(page.getByTestId('study-value-panel').getByText('New', { exact: true })).toHaveCount(2);

    await expect(explanation.getByTestId('study-attribution')).toHaveText('This is an authored research example for Sarah’s fictional situation. It is not Hedgr reading your money, not Stability Engine output, and not a live financial assessment.');
    await expect(explanation.getByTestId('study-limits')).toHaveText('This example cannot predict the future exchange rate, assume Sarah’s planned contributions will happen, or establish that the course will be fully funded. It is not financial advice.');
    const panelBox = await page.getByTestId('study-value-panel').boundingBox();
    const attributionBox = await page.getByTestId('study-attribution').boundingBox();
    const limitsBox = await page.getByTestId('study-limits').boundingBox();
    expect(panelBox).toBeTruthy();
    expect(attributionBox).toBeTruthy();
    expect(limitsBox).toBeTruthy();
    expect(attributionBox!.y).toBeGreaterThan(panelBox!.y);
    expect(limitsBox!.y).toBeGreaterThan(attributionBox!.y);
    expect(await page.getByTestId('study-common-boundary').innerText()).toBe(commonBoundary);
    await expect(page.getByTestId('course-fee')).toHaveCount(0);
    await expectNoHolds(page);

    for (const key of rowKeys) {
      const row = page.getByTestId('study-panel-after').locator(`[data-row="${key}"] dd`);
      const styles = await row.evaluate((el) => {
        const computed = getComputedStyle(el);
        return {
          textAlign: computed.textAlign,
          fontVariantNumeric: computed.fontVariantNumeric,
        };
      });
      expect(styles.textAlign).not.toBe('right');
      expect(styles.fontVariantNumeric).not.toMatch(/tabular-nums/);
    }
    const dueBorder = await page.getByTestId('study-panel-after').locator('[data-row="due"]').evaluate((el) => getComputedStyle(el).borderBottomWidth);
    expect(dueBorder).toBe('0px');
    const plannedBorder = await page.getByTestId('study-panel-after').locator('[data-row="planned"]').evaluate((el) => getComputedStyle(el).borderBottomWidth);
    expect(plannedBorder).toBe('0px');
    const watchBorder = await page.getByTestId('study-panel-after').locator('[data-row="watch"]').evaluate((el) => getComputedStyle(el).borderTopWidth);
    expect(Number.parseFloat(watchBorder)).toBeGreaterThan(0);

    await page.getByTestId('study-to-bridge').click();
    await expect(page.getByRole('heading', { name: 'You’ve reached the end of this research example.' })).toBeFocused();
    await expect(page.getByTestId('study-bridge')).toContainText('Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains.');
    await expect(page.getByTestId('study-bridge')).toContainText('No real money moves, no account is opened');
    await expect(page.getByTestId('study-simulation-link')).toHaveAttribute('href', '/dashboard-synthetic-journey');
    await expect(page.getByText('Review the introduction')).toBeVisible();
    await expect(page.getByTestId('stability-stimulus')).not.toContainText(/in your own words|what can you conclude|what would you still need to know|does this change|what changes in your interpretation/i);
    await expectNoHolds(page);
    await expectRetiredStringsAbsent(page);

    await page.getByTestId('study-simulation-link').click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
    await expect(page.getByText('Start with a simulated deposit')).toBeVisible();
    await expect(page.getByText('What Hedgr notices')).toHaveCount(0);
    await expect(page.getByTestId('dashboard-add-simulated-deposit')).toBeVisible();
  });

  test('keeps each selected denomination consistent across both beats', async ({ page }) => {
    for (const [currency, prefix, name] of [
      ['ZMW', 'K', 'kwacha'],
      ['KES', 'KES ', 'Kenyan shillings'],
      ['NGN', 'NGN ', 'Nigerian naira'],
      ['GHS', 'GHS ', 'Ghanaian cedis'],
      ['PHP', 'PHP ', 'Philippine pesos'],
    ] as const) {
      await page.goto(studyEntry);
      await page.getByRole('combobox').selectOption(currency);
      await page.getByTestId('orientation-continue').click();
      await expect(page.getByTestId('sarah-facts')).toContainText(`${prefix}6,000`);
      await expect(page.getByTestId('sarah-facts')).toContainText(`${prefix}2,000`);
      await expect(page.getByTestId('course-fee')).toContainText('USD 1,000');
      await page.getByTestId('study-continue').click();
      await expect(page.getByTestId('course-fee')).toContainText(`${prefix}29,500, payable in`);
      if (currency === 'ZMW') {
        await expect(page.getByTestId('course-fee')).toContainText('Zambian kwacha');
      } else {
        await expect(page.getByTestId('course-fee')).toContainText(name);
      }
      await expect(page.getByTestId('sarah-lived-caution')).toHaveCount(0);
      await page.getByTestId('study-to-hedgr').click();
      const panel = page.getByTestId('study-value-panel');
      await expect(panel).toContainText(`${prefix}6,000`);
      await expect(panel).toContainText(`${prefix}24,000 over 12 months, not available yet`);
      await expect(panel).toContainText(`${prefix}29,500 on 1 October 2027`);
      await expect(panel).toContainText(`Sarah is saving in ${name}, but the fee is in US dollars. If the exchange rate moves, the amount of ${name} she needs can change.`);
      await expect(panel).toContainText(`Sarah’s savings and the fee are now both in ${name}, so the exchange rate no longer changes the amount she needs. What is still open is whether the planned ${prefix}24,000 arrives on time.`);
      await expect(page.getByTestId('study-attribution')).toContainText('not Stability Engine output');
      await expectNoHolds(page);
    }
  });

  test('pins the selected denomination even if another tab changes the preference', async ({ page, context }) => {
    await page.goto(studyEntry);
    await page.getByRole('combobox').selectOption('KES');
    await page.getByTestId('orientation-continue').click();
    const otherTab = await context.newPage();
    await otherTab.goto('/orientation');
    await otherTab.getByRole('combobox').selectOption('NGN');
    await expect(page.getByTestId('sarah-facts')).toContainText('KES 6,000');
    await page.getByTestId('study-continue').click();
    await expect(page.getByTestId('course-fee')).toContainText('KES 29,500');
    await page.getByTestId('study-to-hedgr').click();
    await expect(page.getByTestId('study-value-panel')).toContainText('Kenyan shillings');
    await expect(page.getByTestId('study-value-panel')).toContainText('KES 24,000');
    await otherTab.close();
  });

  test('keeps every Continue operable at small width and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await enterStudy(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const button of ['study-continue', 'study-to-hedgr', 'study-to-bridge']) {
      await page.getByTestId(button).focus();
      await expect(page.getByTestId(button)).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.getByTestId(button).click();
    }
    await expect(page.getByTestId('study-simulation-link')).toBeVisible();
    for (const width of [320, 390, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('shows the top label and panel start together at 390px and stacks Before first', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await enterStudy(page);
    await page.getByTestId('study-continue').click();
    await page.getByTestId('study-to-hedgr').click();

    const label = page.getByTestId('study-authored-label');
    const panel = page.getByTestId('study-value-panel');
    await expect(label).toBeVisible();
    await expect(panel).toBeVisible();
    const labelBox = await label.boundingBox();
    const panelBox = await panel.boundingBox();
    expect(labelBox).toBeTruthy();
    expect(panelBox).toBeTruthy();
    expect(labelBox!.y).toBeGreaterThanOrEqual(0);
    expect(labelBox!.y + labelBox!.height).toBeLessThanOrEqual(844);
    expect(panelBox!.y).toBeGreaterThanOrEqual(0);
    expect(panelBox!.y).toBeLessThan(844);
    const overflow = await label.evaluate((el) => {
      const styles = getComputedStyle(el);
      return styles.textOverflow === 'ellipsis' || el.scrollWidth > el.clientWidth + 1;
    });
    expect(overflow).toBe(false);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    const beforeY = await page.getByRole('heading', { name: 'Before the fee changed' }).evaluate((el) => el.getBoundingClientRect().y);
    const afterY = await page.getByRole('heading', { name: 'After the fee changed' }).evaluate((el) => el.getBoundingClientRect().y);
    expect(afterY).toBeGreaterThan(beforeY);

    await page.setViewportSize({ width: 1280, height: 900 });
    const before = await page.getByRole('heading', { name: 'Before the fee changed' }).boundingBox();
    const after = await page.getByRole('heading', { name: 'After the fee changed' }).boundingBox();
    expect(before).toBeTruthy();
    expect(after).toBeTruthy();
    expect(after!.x).toBeGreaterThan(before!.x);
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(24);

    for (const key of rowKeys) {
      const beforeRow = await page.getByTestId('study-panel-before').locator(`[data-row="${key}"]`).boundingBox();
      const afterRow = await page.getByTestId('study-panel-after').locator(`[data-row="${key}"]`).boundingBox();
      expect(beforeRow).toBeTruthy();
      expect(afterRow).toBeTruthy();
      expect(Math.abs(beforeRow!.y - afterRow!.y)).toBeLessThan(4);
    }

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => document.querySelector('h2')?.focus({ preventScroll: true }));
    await page.getByRole('heading', { name: 'What Hedgr helps Sarah see' }).evaluate((el) => el.closest('main')?.scrollIntoView({ block: 'start' }));
    const glance = [];
    for (const state of ['study-panel-before', 'study-panel-after'] as const) {
      const box = await page.getByTestId(state).locator('[data-row="watch"]').boundingBox();
      expect(box).toBeTruthy();
      const topOverflow = Math.max(0, -box!.y);
      const bottomOverflow = Math.max(0, box!.y + box!.height - 800);
      glance.push({ state, y: box!.y, height: box!.height, topOverflow, bottomOverflow });
    }
    await test.info().attach('desktop-glance-1280x800', {
      body: Buffer.from(JSON.stringify(glance, null, 2)),
      contentType: 'application/json',
    });
    // Kip #4: record overflow as a WATCH rather than failing the suite.
    if (glance.some((row) => row.topOverflow > 0 || row.bottomOverflow > 0)) {
      test.info().annotations.push({
        type: 'WATCH',
        description: `Desktop glance 1280×800: What to watch overflow ${JSON.stringify(glance)}`,
      });
    }

    await page.setViewportSize({ width: 320, height: 720 });
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const stackedBefore = await page.getByRole('heading', { name: 'Before the fee changed' }).boundingBox();
    const stackedAfter = await page.getByRole('heading', { name: 'After the fee changed' }).boundingBox();
    expect(stackedBefore).toBeTruthy();
    expect(stackedAfter).toBeTruthy();
    expect(stackedAfter!.y).toBeGreaterThan(stackedBefore!.y + stackedBefore!.height - 1);
    expect(stackedAfter!.x).toBeLessThan(stackedBefore!.x + 48);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
