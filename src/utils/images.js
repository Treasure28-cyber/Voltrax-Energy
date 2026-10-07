export const PRODUCT_IMAGE_FALLBACK = '/images/placeholders/product-placeholder.svg'

export function applyProductImageFallback(event) {
  event.currentTarget.removeAttribute?.('srcset')
  event.currentTarget.removeAttribute?.('sizes')
  event.currentTarget.onerror = null
  event.currentTarget.src = PRODUCT_IMAGE_FALLBACK
}
