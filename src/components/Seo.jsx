import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { siteAssets } from '../config/assets'
import { metadata } from '../config/seo'
import { buildStructuredData } from '../utils/seo'
import { isHttpsUrl } from '../utils/validation'
function setMeta(property, content, attribute = 'name') {
  let element = document.head.querySelector('meta[' + attribute + '="' + property + '"]')
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, property); document.head.appendChild(element) }
  element.content = content
}
export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const route = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const current = metadata[route] || { title: 'Page Not Found | Voltrax Energy', description: 'The requested page could not be found.' }
    document.title = current.title
    setMeta('description', current.description)
    setMeta('robots', !metadata[route] || import.meta.env.MODE !== 'production' ? 'noindex, nofollow' : 'index, follow')
    setMeta('og:title', current.title, 'property'); setMeta('og:description', current.description, 'property'); setMeta('og:type', 'website', 'property')
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', current.title); setMeta('twitter:description', current.description)
    if (isHttpsUrl(siteConfig.domain) && metadata[route]) {
      const url = new URL(route, siteConfig.domain).href
      let canonical = document.head.querySelector('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
      canonical.href = url
      setMeta('og:url', url, 'property'); setMeta('og:image', new URL(siteAssets.social, siteConfig.domain).href, 'property')
      setMeta('og:image:width', '1200', 'property'); setMeta('og:image:height', '630', 'property')
      setMeta('twitter:image', new URL(siteAssets.social, siteConfig.domain).href)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    const data = metadata[route] ? buildStructuredData(siteConfig) : null
    let script = document.getElementById('business-jsonld')
    if (data) { if (!script) { script = document.createElement('script'); script.id = 'business-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script) } script.textContent = JSON.stringify(data) } else script?.remove()
  }, [pathname])
  return null
}
