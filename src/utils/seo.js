import { isHttpsUrl } from './validation.js'
export function buildStructuredData(config) {
  if (!config.approvals?.contacts || !isHttpsUrl(config.domain)) return null
  const data = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: config.legalName, url: new URL('/', config.domain).href }
  if (config.phone) data.telephone = config.phone
  if (config.email) data.email = config.email
  if (config.logo) data.logo = new URL(config.logo, config.domain).href
  if (config.address) data.address = config.address
  const social = Object.values(config.social || {}).filter(isHttpsUrl)
  if (social.length) data.sameAs = social
  return data
}
export function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])) }
export function buildSeoTags(config, assets, metadata, route, preview) {
  const tags = ['<meta name="robots" content="' + (preview ? 'noindex, nofollow' : 'index, follow') + '" />', '<link rel="icon" type="image/svg+xml" href="' + escapeHtml(assets.favicon) + '" />']
  if (route === '/' && assets.hero) tags.push('<link rel="preload" as="image" href="' + escapeHtml(assets.hero) + '" fetchpriority="high" />')
  for (const [property, content] of Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:type': 'website' })) tags.push('<meta property="' + property + '" content="' + escapeHtml(content) + '" />')
  tags.push('<meta name="twitter:card" content="summary_large_image" />', '<meta name="twitter:title" content="' + escapeHtml(metadata.title) + '" />', '<meta name="twitter:description" content="' + escapeHtml(metadata.description) + '" />')
  if (isHttpsUrl(config.domain)) {
    const url = new URL(route, config.domain).href
    const image = new URL(assets.social, config.domain).href
    tags.push('<link rel="canonical" href="' + escapeHtml(url) + '" />', '<meta property="og:url" content="' + escapeHtml(url) + '" />', '<meta property="og:image" content="' + escapeHtml(image) + '" />', '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />', '<meta name="twitter:image" content="' + escapeHtml(image) + '" />')
    const data = buildStructuredData(config)
    if (data) tags.push('<script id="business-jsonld" type="application/ld+json">' + JSON.stringify(data).replaceAll('<', String.fromCharCode(92) + 'u003c') + '</script>')
  }
  return tags.join('\n')
}
