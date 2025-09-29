import { test, expect } from '@playwright/test'

test.describe('homepage smoke', () => {
  test('loads and shows title', async ({ page }) => {
    await page.goto('/') // uses baseURL from playwright config
    await expect(page).toHaveTitle(/hedgr/i)
  })

  test('has a main landmark', async ({ page }) => {
    await page.goto('/')
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })
})
