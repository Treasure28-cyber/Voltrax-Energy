import { test, expect } from '@playwright/test'
for (const viewport of [{width:390,height:844},{width:1440,height:900}]) test('compatibility at ' + viewport.width + 'px', async ({page}) => {
  await page.setViewportSize(viewport)
  const errors=[]; page.on('pageerror', error => errors.push(error.message))
  for (const route of ['/', '/products/', '/missing-route']) {
    await page.goto(route); await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.goto('/products/?category=Inverters')
  await expect(page).toHaveTitle('Products | Voltrax Energy')
  const search=page.getByRole('searchbox', { name:'Search products' }); await search.fill('HYBRID')
  await expect(page.locator('.product-card')).toHaveCount(1)
  const opener=page.getByRole('button',{name:'View details'}); await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab')
  expect(await page.evaluate(() => !!document.activeElement.closest('dialog'))).toBe(true)
  await page.keyboard.press('Escape'); await expect(opener).toBeFocused()
  expect(errors).toEqual([])
})
