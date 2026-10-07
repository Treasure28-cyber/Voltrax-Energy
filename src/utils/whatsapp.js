export function buildWhatsAppUrl(number, message) {
  const digits = String(number || '').replace(/\D/g, '')
  if (!digits) return ''
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function buildProductMessage(productName) {
  return `Hello Voltrax Energy, I am interested in ${productName} displayed on your website. Please confirm the current price and availability.`
}
