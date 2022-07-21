import { test, expect } from '@playwright/test'

test.describe('window table with header', () => {
      test('renders correct total row count', async ({ page }) => {
          await page.goto('/')
          await page.waitForSelector('#root')
          await page.waitForSelector('.spinner', { state: 'detached' })
          const rows = await page.$$('[data-test-id="virtuoso-scroller"] tr')
          expect(rows.length).toBeGreaterThan(1)
      })
      test('renders correct on error', async ({ page }) => {
          await page.route('**\/*json*', route => route.abort());
          await page.goto('/');
          await page.waitForSelector('#root')
          await page.waitForSelector('.spinner', { state: 'detached' })
          const section = await page.$('[aria-live="polite"]')
          const text = await section.textContent()
          expect(text).toEqual('An error happened with connection to  API')
      })

})