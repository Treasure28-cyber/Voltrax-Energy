import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { siteConfig } from '../src/config/site.js'
import { siteAssets } from '../src/config/assets.js'
import { metadata } from '../src/config/seo.js'
import { validateLaunch } from '../src/utils/validation.js'
import { escapeHtml } from '../src/utils/seo.js'
const records = JSON.parse(await readFile(new URL('../src/data/products.json', import.meta.url), 'utf8'))
const blockers = validateLaunch(siteConfig, records, siteAssets)
if (blockers.length) { console.error('Live deployment checks require approved launch content and a verified domain. Run npm run validate:launch for the blockers.'); process.exitCode = 1 }
else {
  const results = []
  const check = (name, passed) => { results.push({ name, passed }); console.log((passed ? 'PASS ' : 'FAIL ') + name) }
  const get = (path) => fetch(new URL(path, siteConfig.domain), { signal: AbortSignal.timeout(15000) })
  try {
    for (const route of ['/', '/products']) {
      const response = await get(route)
      const html = await response.text()
      check(route + ' HTTPS delivery', response.ok && response.url.startsWith('https://'))
      check(route + ' static title', html.includes('<title>' + escapeHtml(metadata[route].title) + '</title>'))
      check(route + ' canonical', html.includes('href="' + new URL(route, siteConfig.domain).href + '"'))
      check(route + ' social preview', html.includes(new URL(siteAssets.social, siteConfig.domain).href))
      check(route + ' indexable metadata', html.includes('index, follow') && !html.includes('noindex'))
      const json = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1]
      let data
      try { data = JSON.parse(json || '') } catch { data = null }
      check(route + ' structured data', data?.name === siteConfig.legalName && data?.url === new URL('/', siteConfig.domain).href)
    }
    const robots = await (await get('/robots.txt')).text()
    check('robots sitemap reference', robots.includes(new URL('/sitemap.xml', siteConfig.domain).href) && !robots.includes('Disallow: /'))
    const sitemapResponse = await get('/sitemap.xml')
    const sitemap = await sitemapResponse.text()
    check('two-route sitemap', sitemapResponse.ok && ['/', '/products'].every((route) => sitemap.includes('<loc>' + new URL(route, siteConfig.domain).href + '</loc>')))
    for (const path of [siteAssets.favicon, siteAssets.social]) { const response = await get(path); check(path + ' image delivery', response.ok && (response.headers.get('content-type') || '').startsWith('image/')) }
    const httpUrl = new URL(siteConfig.domain); httpUrl.protocol = 'http:'
    const redirect = await fetch(httpUrl, { redirect: 'manual', signal: AbortSignal.timeout(15000) })
    check('HTTP redirects to HTTPS', [301,302,307,308].includes(redirect.status) && new URL(redirect.headers.get('location') || '', httpUrl).protocol === 'https:')
  } catch (error) { results.push({ name: 'network delivery', passed: false, error: error.message }); console.error(error.message) }
  await mkdir(new URL('../tmp/qa/', import.meta.url), { recursive: true })
  await writeFile(new URL('../tmp/qa/deployment.json', import.meta.url), JSON.stringify(results, null, 2))
  if (results.some((result) => !result.passed)) process.exitCode = 1
}
