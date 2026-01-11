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
  // Desktop nav link (first one, visible on md+ screens)
  const desktopLink = page.getByTestId('nav-links').getByTestId('nav-copilot-link');

  // Check if desktop link is visible
  const isDesktopVisible = await desktopLink.isVisible().catch(() => false);
  if (isDesktopVisible) return;

  // Mobile view: open hamburger menu
  const toggle = page.getByTestId('nav-toggle');
  const toggleVisible = await toggle.isVisible().catch(() => false);
  if (toggleVisible) {
    await toggle.click();
    // Wait for mobile nav link to be visible
    const mobileLink = page.getByTestId('nav-links-mobile').getByTestId('nav-copilot-link');
    await expect(mobileLink).toBeVisible({ timeout: 5_000 });
  }
}

/** Complete login and wait for dashboard to be ready */
async function loginAndWaitForDashboardReady(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await waitForDashboardReady(page);
}

/** Navigate from dashboard to chat page */
async function gotoChatFromDashboard(page: Page) {
  await openNavIfCollapsed(page);
  
  // Get the visible copilot link (desktop or mobile)
  const desktopLink = page.getByTestId('nav-links').getByTestId('nav-copilot-link');
  const mobileLink = page.getByTestId('nav-links-mobile').getByTestId('nav-copilot-link');
  
  const isDesktopVisible = await desktopLink.isVisible().catch(() => false);
  const copilotLink = isDesktopVisible ? desktopLink : mobileLink;
  
  await expect(copilotLink).toBeVisible({ timeout: 10_000 });
  await copilotLink.click();
  await expect(page).toHaveURL(/\/chat/, { timeout: 10_000 });
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
