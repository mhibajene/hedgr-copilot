import { test, expect } from '@playwright/test'

// Block analytics and external calls for test hermeticity
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i]

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => {
    const url = route.request().url()
    if (ANALYTICS_HOSTS.some(rx => rx.test(url))) return route.abort()
    return route.continue()
  })
})

test('home renders and shows baseline content', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Hedgr/i)
  await expect(page.getByRole('main')).toBeVisible()
})

test('health endpoint is healthy (poll)', async ({ page }) => {
  await expect.poll(async () => {
    const res = await page.request.get('/api/health')
    return res.ok() ? (await res.json()).status : 'bad'
  }, { timeout: 15_000, intervals: [500, 1000, 2000] }).toBe('ok')
})
