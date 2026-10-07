import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { ProductImage } from './ProductCard'
import { formatPrice, getAvailability } from '../utils/formatters'
import { buildProductMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import { siteConfig } from '../config/site'

export function ProductDialog({ product, onClose }) {
  const dialogRef = useRef(null)
  const previousFocus = useRef(null)
  useEffect(() => {
    if (!product) return undefined
    previousFocus.current = document.activeElement
    const dialog = dialogRef.current
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const keepFocus = (event) => {
      if (event.key !== 'Tab') return
      const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter((element) => !element.disabled && element.getClientRects().length > 0)
      const first = controls[0]
      const last = controls.at(-1)
      if (!first) { event.preventDefault(); return }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    dialog?.addEventListener('keydown', keepFocus)
    const onCancel = (event) => { event.preventDefault(); onClose() }
    dialog?.addEventListener('cancel', onCancel)
    return () => { dialog?.removeEventListener('cancel', onCancel); dialog?.removeEventListener('keydown', keepFocus); document.body.style.overflow = previousOverflow; previousFocus.current?.focus() }
  }, [product, onClose])
  if (!product) return null
  const enquiryUrl = buildWhatsAppUrl(siteConfig.whatsapp, buildProductMessage(product.name))
  return (
    <dialog ref={dialogRef} className="product-dialog" aria-labelledby="product-dialog-title" onClick={(event) => { if (event.target === dialogRef.current) onClose() }}>
      <div className="dialog-panel">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close product details"><X /></button>
        <div className="dialog-media"><ProductImage product={product} eager /></div>
        <div className="dialog-content">
          <span className="eyebrow">{product.category}</span>
          <h2 id="product-dialog-title">{product.name}</h2>
          <div className="dialog-status"><strong>{formatPrice(product)}</strong><span>{product.demo ? 'Sample product' : getAvailability(product.available)}</span></div>
          <p>{product.description || product.shortDescription}</p>
          {product.specifications?.length > 0 && <dl>{product.specifications.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
          {product.specifications?.length === 0 && <p className="content-notice">Detailed specifications are not available yet.</p>}
          {enquiryUrl ? <a className="button button-whatsapp" href={enquiryUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> {product.available === false ? 'Ask about alternatives' : 'Enquire on WhatsApp'}</a> : <p className="content-notice">Online enquiries are not available yet.</p>}
        </div>
      </div>
    </dialog>
  )
}
