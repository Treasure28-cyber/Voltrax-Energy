export function formatPrice(product) {
  if (typeof product.price !== 'number' || !Number.isFinite(product.price) || product.price < 0) {
    return product.priceLabel || 'Contact for price'
  }
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: product.currency || 'NGN', maximumFractionDigits: 0 }).format(product.price)
}

export function getAvailability(available) {
  if (available === true) return 'Available'
  if (available === false) return 'Currently unavailable'
  return 'Confirm availability'
}
