export const approvedCategories = ['Solar Panels', 'Inverters', 'Lithium Batteries', 'CCTV Systems', 'Charge Controllers', 'Electrical Appliances']
const requiredStrings = ['id', 'slug', 'name', 'category', 'image', 'imageAlt', 'shortDescription']
export function validateProducts(records) {
  if (!Array.isArray(records)) return { products: [], errors: ['Catalogue must be an array'] }
  const errors = []
  const products = []
  const ids = new Set()
  const slugs = new Set()
  records.forEach((record, index) => {
    const issues = []
    if (!record || typeof record !== 'object' || Array.isArray(record)) issues.push('must be an object')
    else {
      requiredStrings.forEach((key) => { if (typeof record[key] !== 'string' || !record[key].trim()) issues.push(key + ' is required') })
      if (ids.has(record.id)) issues.push('duplicate id')
      if (slugs.has(record.slug)) issues.push('duplicate slug')
      ids.add(record.id); slugs.add(record.slug)
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug || '')) issues.push('invalid slug')
      if (!approvedCategories.includes(record.category)) issues.push('unknown category')
      if (record.price !== null && (typeof record.price !== 'number' || !Number.isFinite(record.price) || record.price < 0)) issues.push('invalid price')
      if (record.price === null && (typeof record.priceLabel !== 'string' || !record.priceLabel.trim())) issues.push('priceLabel is required')
      if (record.currency !== 'NGN') issues.push('currency must be NGN')
      if (![true, false, null].includes(record.available)) issues.push('invalid availability')
      if (typeof record.featured !== 'boolean') issues.push('featured must be boolean')
      if (!Array.isArray(record.keywords) || record.keywords.some((item) => typeof item !== 'string')) issues.push('keywords must be strings')
      if (record.specifications !== undefined && (!Array.isArray(record.specifications) || record.specifications.some((item) => !item || typeof item.label !== 'string' || !item.label.trim() || typeof item.value !== 'string' || !item.value.trim()))) issues.push('invalid specifications')
      if (record.description !== undefined && typeof record.description !== 'string') issues.push('invalid description')
      if (record.brand !== undefined && typeof record.brand !== 'string') issues.push('invalid brand')
      if (record.demo !== undefined && typeof record.demo !== 'boolean') issues.push('demo must be boolean')
      if (typeof record.image === 'string' && (!record.image.startsWith('/images/') || record.image.includes('..'))) issues.push('image must be a local image path')
    }
    if (issues.length) errors.push('Product ' + (index + 1) + ': ' + issues.join(', '))
    else products.push(record)
  })
  return { products, errors }
}
export function isHttpsUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password } catch { return false }
}
export function validateLaunch(config, records, assets) {
  const errors = [...validateProducts(records).errors]
  for (const key of ['tagline', 'description', 'whatsapp', 'phone', 'email', 'address', 'openingHours', 'domain']) {
    if (typeof config[key] !== 'string' || !config[key].trim() || /CLIENT|PLACEHOLDER|TODO/i.test(config[key])) errors.push('Verified ' + key + ' is required')
  }
  if (!/^\d{10,15}$/.test(config.whatsapp || '')) errors.push('WhatsApp must contain 10–15 digits including country code')
  if (!/^\+?[\d ()-]{7,20}$/.test(config.phone || '')) errors.push('Telephone is invalid')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')) errors.push('Email is invalid')
  if (!isHttpsUrl(config.domain)) errors.push('Production domain must be an HTTPS URL')
  else { const domain = new URL(config.domain); if (domain.pathname !== '/' || domain.search || domain.hash || /localhost|example|127\.0\.0\.1/i.test(domain.hostname)) errors.push('Production domain must be a real origin') }
  if (!Array.isArray(records) || !records.length) errors.push('Approved catalogue must not be empty')
  if (Array.isArray(records) && records.some((record) => record?.demo || /demo|placeholder|CLIENT TO/i.test(JSON.stringify(Object.fromEntries(Object.entries(record || {}).filter(([key]) => key !== 'demo')))))) errors.push('Replace all demo/placeholder products')
  for (const key of ['content', 'contacts', 'products', 'images', 'brand']) if (config.approvals?.[key] !== true) errors.push('Client approval required: ' + key)
  if (assets.aboutTemporary || assets.installationTemporary || assets.faviconTemporary) errors.push('Replace temporary About, installation and favicon assets')
  if (!config.logo) errors.push('Approved logo is required')
  if (config.mapUrl && !isHttpsUrl(config.mapUrl)) errors.push('Map URL must be HTTPS')
  for (const [name, url] of Object.entries(config.social || {})) if (url && !isHttpsUrl(url)) errors.push(name + ' URL must be HTTPS')
  return errors
}
