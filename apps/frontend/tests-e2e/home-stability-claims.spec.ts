import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

const POSTURES = process.env.SC_DEV_POSTURES === 'true' ? ['normal', 'tightening', 'tightened', 'recovery'] : ['normal'];
const LIVE = process.env.SC_HOME_MODE === 'live';
const WITHDRAWAL = 'A higher Reserve target does not stop or delay a withdrawal.';
const CONTEXT = ['Within the usual range. The main target is the largest of the three planning targets.', 'The Reserve target is going up while conditions are reviewed.', 'The Reserve target is higher than usual until conditions ease.', 'Within the usual range. Targets are returning to their usual levels.'];
const STATUS = ["Hedgr's planning targets are becoming more cautious.", "Hedgr's planning targets are more cautious than usual.", "Hedgr's planning targets are returning to usual."];
const TITLES = ['Targets are changing', 'Targets are set higher than usual', 'Targets are returning to usual'];
const BODIES = ['When the Reserve target goes up, the target for earning can go down. These are targets, not your balance.', 'These are targets, not your balance.', 'These are targets, not your balance.'];
const STANCES = ['Where things stand: within the usual range', 'Where things stand: Reserve target going up', 'Where things stand: Reserve target higher than usual', 'Where things stand: targets returning to usual'];
const NOW = Date.parse('2026-10-16T00:00:00Z');

test.use({ timezoneId: process.env.SC_BROWSER_TZ ?? 'Australia/Perth' });
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: NOW }); await page.clock.setFixedTime(NOW);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  if (!LIVE) {
    await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('claims@hedgr.test'); await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/\/dashboard/);
  }
});
for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) for (const posture of POSTURES) {
  for (const own of LIVE ? [false] : [false, true]) test(`SC1–SC15 ${LIVE ? 'Live' : own ? 'Own' : 'Default'} ${posture} ${width}@${scale * 100}%`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    // Unmount the previous Home before seeding its next persisted inputs.
    await page.goto('/api/policy');
    await page.evaluate(() => {
      localStorage.clear(); localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [{ txn_ref: 'claims-deposit', type: 'deposit', status: 'settled', amount_usd: 800, amount_zmw: 16000, fx_rate: 20, created_at: 1000, updated_at: 1000 }] }));
    });
    await page.goto(`${own ? '/dashboard-synthetic-journey' : '/dashboard'}?enginePosture=${posture}`);
    if (scale === 2) await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const i = ['normal', 'tightening', 'tightened', 'recovery'].indexOf(posture);
    if (LIVE) await expect(page.getByTestId('engine-posture-context')).toHaveText(CONTEXT[i]);
    else if (i > 0) await expect(page.getByTestId('engine-posture-context')).toHaveText(STATUS[i - 1]);
    if (i > 0) { const banner = page.getByTestId('engine-posture-banner'); await expect(banner.locator('p').first()).toHaveText(TITLES[i - 1]); await expect(banner.locator('p').last()).toHaveText(BODIES[i - 1]); }
    const panel = page.getByTestId('engine-allocation-bands');
    if (LIVE) {
      await expect(panel).toHaveAttribute('data-presentation', 'expanded'); await expect(panel.getByRole('heading', { name: 'Planning targets', exact: true })).toBeVisible();
      for (const label of ['Main target', 'Conservative yield', 'Reserve']) await expect(panel.getByText(label, { exact: true })).toHaveCount(1);
      await expect(panel.getByText('Planning target', { exact: true })).toBeVisible(); await expect(panel.getByText('One of the three targets.', { exact: true })).toBeVisible();
      await expect(panel.getByTestId('engine-allocation-target-roles')).toHaveCount(0); await expect(panel).not.toContainText('in this simulation');
      if (posture === 'tightened') { await expect(panel.getByTestId('engine-allocation-band-coreTargetPct')).toContainText('35%'); await expect(panel.getByTestId('engine-allocation-band-liquidityTargetPct')).toContainText('55%'); }
    } else { await expect(panel).toHaveAttribute('data-presentation', 'collapsed'); for (const label of ['Now', 'Reserve', 'Growth']) await expect(panel.getByTestId('engine-allocation-target-roles').getByText(label, { exact: true })).toHaveCount(1); }
    const directory = process.env.SC_SCREENSHOT_DIR ?? info.outputPath('claims'); mkdirSync(directory, { recursive: true });
    const prefix = `${LIVE ? 'live' : own ? 'own' : 'default'}-${posture}-${width}-${scale * 100}pct`;
    await page.screenshot({ path: join(directory, `${prefix}.png`), fullPage: true });
    if (!own) {
      const education = page.getByTestId('dashboard-education'); await expect(education).not.toHaveAttribute('open', ''); await expect(education.locator('summary').first()).toHaveText('How Hedgr sets its targets'); await education.locator('summary').first().click();
      await expect(page.getByTestId('engine-stability-review-snapshot-stance')).toHaveText(STANCES[i]);
      await page.getByTestId('engine-protective-guidance').locator('summary').click(); await page.getByTestId('engine-stability-review-details').locator('summary').click(); await page.getByTestId('engine-stability-explainer').locator('summary').click();
      await expect(page.getByText(WITHDRAWAL, { exact: true })).toHaveCount(1); await expect(page.getByText(WITHDRAWAL, { exact: true })).toBeVisible();
      await expect(page.getByTestId('engine-stability-review-snapshot')).not.toContainText(WITHDRAWAL);
      await expect(page.getByTestId('engine-stability-explainer')).toContainText('One of the three planning targets. It is a percentage, not money set aside.');
      await expect(page.getByTestId('engine-stability-explainer')).toContainText('The three planning targets show a plan. None of them shows where money sits.');
      await page.screenshot({ path: join(directory, `${prefix}-education.png`), fullPage: true });
      await page.getByTestId('dashboard-disclosures').locator('summary').click(); await expect(page.getByText('Digital assets carry risk and may lose value. You should only deposit what you can afford to lose.', { exact: true })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
