import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
const sizes = [[320,568],[360,800],[390,844],[768,1024],[1024,768],[1440,900]]
for (const [width,height] of sizes) {
  test('routes, imagery and accessibility at ' + width + 'x' + height, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    for (const route of ['/', '/products', '/missing-route']) {
      await page.goto(route)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByRole('link', { name: 'Chat with Voltrax Energy on WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\/2348163974464\?text=/)
      await page.evaluate(async () => { for (const image of document.images) { image.loading = 'eager'; await image.decode().catch(() => {}) } })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
      const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
      expect(result.violations.map((issue) => ({ id: issue.id, nodes: issue.nodes.map((node) => node.target) }))).toEqual([])
      if (route === '/') {
        await expect(page.locator('#services')).toHaveCount(0)
        await expect(page.locator('a[href="/#services"]')).toHaveCount(0)
        await page.locator('.category-section').screenshot({ path: testInfo.outputPath('categories.png') })
        if (width <= 760) expect((await page.locator('.home-products .product-card').first().boundingBox()).height).toBeLessThan(300)
        await page.locator('.featured-section').screenshot({ path: testInfo.outputPath('featured.png') })
      }
      if (route === '/products') await expect(page.getByRole('searchbox', { name: 'Search products' })).toBeInViewport()
      await page.screenshot({ path: testInfo.outputPath((route === '/' ? 'home' : route === '/products' ? 'products' : '404') + '.png'), fullPage: true })
    }
    expect(errors).toEqual([])
  })
}
test('mobile navigation closes and section links navigate from Products', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/products')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/#about$/)
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded','false')
})
test('combined filters, reset, deep links and keyboard product dialog', async ({ page }) => {
  await page.goto('/products?category=Inverters')
  await expect(page.locator('.product-card')).toHaveCount(1)
  await page.getByRole('searchbox', { name: 'Search products' }).fill('  HYBRID  ')
  await expect(page.locator('.product-card')).toHaveCount(1)
  const opener = page.getByRole('button', { name: 'View details' })
  await opener.focus(); await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Enquire on WhatsApp' })).toHaveAttribute('href', /wa\.me\/2348163974464\?text=.*Hybrid%20Inverter/)
  for (let i=0;i<5;i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => !!document.activeElement.closest('dialog'))).toBe(true) }
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
  expect(result.violations.map((issue) => issue.id)).toEqual([])
  await page.keyboard.press('Escape'); await expect(opener).toBeFocused()
  await page.getByRole('searchbox').fill('absent item')
  await expect(page.getByRole('heading', { name: 'No products match your search' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear all filters' }).click()
  await expect(page.locator('.product-card')).toHaveCount(6)
  await page.reload(); await expect(page.locator('.product-card')).toHaveCount(6)
  await page.goto('/products/'); await expect(page).toHaveTitle('Products | Voltrax Energy')
  await page.getByRole('searchbox').focus()
  expect(await page.getByRole('searchbox').evaluate((input) => getComputedStyle(input).outlineStyle)).not.toBe('none')
})
test('built metadata, preview crawl rules and local asset delivery', async ({ request }) => {
  const home = await (await request.get('/')).text()
  const products = await (await request.get('/products/')).text()
  expect(home).toContain('Voltrax Energy | Solar, Electrical &amp; Security Products')
  expect(products).toContain('<title>Products | Voltrax Energy</title>')
  expect(products).toContain('noindex, nofollow')
  expect(products).not.toContain('CLIENT-DOMAIN')
  expect((await request.get('/favicon.svg')).ok()).toBe(true)
  expect((await request.get('/images/generated/social-preview-1200x630.png')).headers()['content-type']).toContain('image/png')
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /')
})
test('image fallback and reduced-motion preference', async ({ page }) => {
  await page.route('**/images/generated/category-inverters*.webp', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/products?category=Inverters')
  await expect(page.locator('.product-card img')).toHaveAttribute('src','/images/placeholders/product-placeholder.svg')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})
