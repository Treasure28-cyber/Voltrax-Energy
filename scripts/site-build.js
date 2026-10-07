import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { siteConfig } from '../src/config/site.js'
import { siteAssets } from '../src/config/assets.js'
import { metadata } from '../src/config/seo.js'
import { validateProducts, validateLaunch } from '../src/utils/validation.js'
import { buildSeoTags, escapeHtml } from '../src/utils/seo.js'
export function websiteBuildPlugin(mode) {
  const preview = mode !== 'production'
  const root = resolve('.')
  const records = JSON.parse(readFileSync(resolve(root, 'src/data/products.json'), 'utf8'))
  const errors = validateProducts(records).errors
  if (!preview) errors.push(...validateLaunch(siteConfig, records, siteAssets))
  const paths = [siteAssets.hero, siteAssets.about, siteAssets.social, siteAssets.favicon, ...(siteAssets.installation ? [siteAssets.installation] : []), ...(siteConfig.logo ? [siteConfig.logo] : []), ...(Array.isArray(records) ? records : []).map((record) => record?.image).filter(Boolean)]
  for (const path of paths) if (typeof path !== 'string' || !path.startsWith('/') || path.includes('..') || !existsSync(resolve(root, 'public', path.slice(1)))) errors.push('Missing or unsafe asset: ' + path)
  if (!preview && siteAssets.installation && !existsSync(resolve(root, 'public', siteAssets.installation.slice(1)))) errors.push('Missing installation asset')
  function head(html, route) {
    const current = metadata[route]
    return html.replace(/<meta name="robots"[^>]*>/g, '').replace(/<link rel="icon"[^>]*>/g, '').replace(/<title>.*?<\/title>/, '<title>' + escapeHtml(current.title) + '</title>').replace(/<meta name="description"[^>]*>/, '<meta name="description" content="' + escapeHtml(current.description) + '" />').replace('</head>', buildSeoTags(siteConfig, siteAssets, current, route, preview) + '\n</head>')
  }
  return {
    name: 'voltrax-website-build',
    apply: 'build',
    buildStart() { if (errors.length) this.error('Build blocked:\n- ' + [...new Set(errors)].join('\n- ')) },
    generateBundle: { order: 'post', handler(_, bundle) {
      const html = bundle['index.html']
      if (!html) this.error('Missing index.html')
      const original = String(html.source)
      html.source = head(original, '/')
      this.emitFile({ type: 'asset', fileName: 'products/index.html', source: head(original, '/products') })
      const robots = preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\nSitemap: ' + new URL('/sitemap.xml', siteConfig.domain).href + '\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (!preview) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ['/', '/products'].map((route) => '<url><loc>' + escapeHtml(new URL(route, siteConfig.domain).href) + '</loc></url>').join('') + '</urlset>' })
    } },
    closeBundle() {
      const generated = resolve(root, 'dist/images/generated')
      if (existsSync(generated)) for (const name of readdirSync(generated)) {
        if ((name.endsWith('.png') && !paths.includes('/images/generated/' + name)) || name === 'manifest.json') rmSync(resolve(generated, name))
      }
      for (const file of ['dist/sitemap.xml.example', ...(!paths.includes('/images/brand/voltrax-hero.jpg') ? ['dist/images/brand/voltrax-hero.jpg'] : [])]) if (existsSync(resolve(root, file))) rmSync(resolve(root, file))
    },
  }
}
