import { test, expect, Page } from '@playwright/test';

// Block analytics + external calls for test hermeticity (allow local app traffic)
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

// ============================================================================
// Test Helpers - DRY login/navigation logic
// ============================================================================

/** Wait for nav to be ready after login */
async function waitForDashboardReady(page: Page) {
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  await expect(page.getByTestId('app-nav')).toBeVisible({ timeout: 10_000 });
}

/** Handle responsive nav - open hamburger menu if nav is collapsed */
async function openNavIfCollapsed(page: Page) {
  // If any Copilot link is already visible (desktop nav), nothing to do.
  const copilotLinks = page.getByTestId('nav-copilot-link');
  const linkCount = await copilotLinks.count();
  for (let i = 0; i < linkCount; i++) {
    const link = copilotLinks.nth(i);
    const visible = await link.isVisible().catch(() => false);
    if (visible) return;
  }

  // Otherwise, attempt to open the mobile nav (hamburger) if present.
  const toggle = page.getByTestId('nav-toggle');
  const toggleVisible = await toggle.isVisible().catch(() => false);
  if (toggleVisible) {
    await toggle.click();
    await expect(page.getByTestId('app-nav')).toBeVisible({ timeout: 10_000 });
  }

  // After toggling (or if toggle isn't present), wait until ANY Copilot link is actually visible.
  // (Do not rely on locator.filter({ has: ':visible' }) — it doesn't mean what we want here.)
  await page.waitForFunction(
    () => {
      const els = Array.from(document.querySelectorAll('[data-testid="nav-copilot-link"]'));
      return els.some((el) => {
        if (!(el instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    },
    undefined,
    { timeout: 10_000 },
  );
}

/** Click the first visible instance of a locator (useful for responsive duplicated nav links) */
async function clickFirstVisible(page: Page, loc: ReturnType<Page['locator']>) {
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    const candidate = loc.nth(i);
    const visible = await candidate.isVisible().catch(() => false);
    if (visible) {
      await candidate.click();
      return;
    }
  }

  // Debug: dump nav HTML to make CI failures actionable
  const nav = page.getByTestId('app-nav');
  const navHtml = await nav
    .evaluate((el) => (el instanceof HTMLElement ? el.innerHTML : ''))
    .catch(() => '');

  throw new Error(
    `No visible nav link found for locator. Found ${n} candidate(s). app-nav HTML (truncated):\n${navHtml.slice(0, 2000)}`,
  );
}

/** Navigate from dashboard to chat page */
async function gotoChatFromDashboard(page: Page) {
  await openNavIfCollapsed(page);

  const copilotLinks = page.getByTestId('nav-copilot-link');
  await clickFirstVisible(page, copilotLinks);

  await expect(page).toHaveURL(/\/chat/, { timeout: 10_000 });
}

/** Complete login and wait for dashboard to be ready */
async function loginAndWaitForDashboardReady(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await waitForDashboardReady(page);
}

// ============================================================================
// Test Suite
// ============================================================================

test.describe('Chat Page', () => {
  test.beforeEach(async ({ context }) => {
    // Block analytics + external calls for test hermeticity (allow local app traffic)
    await context.route('**/*', (route) => {
      const url = route.request().url();

      // 1) Block analytics / telemetry (hermetic)
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();

      // 2) Allow local app requests (Next assets, navigation, same-origin APIs)
      const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//i.test(url);
      if (isLocalOrigin) {
        // Block Copilot chat API to ensure stub-only behavior
        if (url.includes('/api/chat')) return route.abort();
        return route.continue();
      }

      // 3) Block any external calls (OpenAI/Anthropic/etc.)
      return route.abort();
    });
  });

  test('navigates to chat page and renders interface', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Verify chat interface elements
    await expect(page.getByTestId('chat-disclaimer')).toBeVisible();
    await expect(page.getByTestId('chat-input')).toBeVisible();
    await expect(page.getByTestId('chat-send-button')).toBeVisible();
  });

  test('sends message and shows typing indicator', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Verify user message appears
    const userMessage = page.getByTestId('chat-message-user').first();
    await expect(userMessage).toBeVisible({ timeout: 2000 });
    await expect(userMessage).toContainText('hedgr');

    // Verify typing indicator appears
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });
  });

  test('shows assistant reply after typing', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Wait for typing indicator
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });

    // Wait for assistant reply (stub has 500-1500ms delay)
    const assistantMessage = page.getByTestId('chat-message-assistant').first();
    await expect(assistantMessage).toBeVisible({ timeout: 3000 });
    await expect(assistantMessage).toContainText('Hedgr is a savings platform');
  });

  test('disclaimer is always visible', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Verify disclaimer is visible
    const disclaimer = page.getByTestId('chat-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('Hedgr Copilot is for educational support only');
    await expect(disclaimer).toContainText('Not financial advice');

    // Send a message
    await page.getByTestId('chat-input').fill('test');
    await page.getByTestId('chat-send-button').click();

    // Verify disclaimer is still visible after sending message
    await expect(disclaimer).toBeVisible();
  });

  test('shows offline banner when network is offline', async ({ page, context }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Simulate offline
    await context.setOffline(true);

    // Verify offline banner appears
    await expect(page.getByTestId('chat-offline-banner')).toBeVisible({ timeout: 2000 });
    await expect(page.getByTestId('chat-offline-banner')).toContainText('offline');

    // Simulate online
    await context.setOffline(false);

    // Verify offline banner disappears
    await expect(page.getByTestId('chat-offline-banner')).not.toBeVisible({ timeout: 2000 });
  });

  test('handles multiple messages', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);
    await gotoChatFromDashboard(page);

    // Send first message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').first()).toBeVisible({ timeout: 3000 });

    // Send second message
    await page.getByTestId('chat-input').fill('How do I save?');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').last()).toBeVisible({ timeout: 3000 });

    // Verify both messages are present
    const userMessages = page.getByTestId('chat-message-user');
    const assistantMessages = page.getByTestId('chat-message-assistant');
    await expect(userMessages).toHaveCount(2);
    await expect(assistantMessages).toHaveCount(2);
  });
});
