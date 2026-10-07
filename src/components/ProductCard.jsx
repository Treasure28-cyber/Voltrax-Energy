import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { formatPrice, getAvailability } from '../utils/formatters'
import { buildProductMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import { siteConfig } from '../config/site'
import { applyProductImageFallback } from '../utils/images'

export function ProductImage({ product, eager = false }) {
  const responsive = /^\/images\/generated\/category-[a-z-]+\.webp$/.test(product.image || '')
  const srcSet = responsive ? [400, 800, 1254].map((width) => (width === 1254 ? product.image : product.image.replace('.webp', '-' + width + '.webp')) + ' ' + width + 'w').join(', ') : undefined
  return <img src={product.image} srcSet={srcSet} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1050px) 44vw, 380px" alt={product.imageAlt} width="800" height="640" loading={eager ? 'eager' : 'lazy'} onError={applyProductImageFallback} />
}

export function ProductCard({ product, onView, eager = false }) {
  const enquiryUrl = buildWhatsAppUrl(siteConfig.whatsapp, buildProductMessage(product.name))
  return (
    <article className="product-card">
      <div className="product-media"><ProductImage product={product} eager={eager} />{product.demo && <span className="demo-chip">Sample</span>}</div>
      <div className="product-content">
        <div className="product-meta"><span>{product.category}</span>{!product.demo && <span className={`availability availability-${String(product.available)}`}>{getAvailability(product.available)}</span>}</div>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <strong className="price">{formatPrice(product)}</strong>
        <div className="product-actions">
          <button type="button" className="button button-secondary" onClick={(event) => { event.currentTarget.focus(); onView(product) }}>View details <ArrowRight /></button>
          {enquiryUrl && product.available !== false && <a className="icon-button" href={enquiryUrl} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`}><WhatsAppIcon /></a>}
        </div>
      </div>
    </article>
  )
}
