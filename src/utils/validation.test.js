import { describe, expect, it } from 'vitest'
import records from '../data/products.json'
import { validateProducts, validateLaunch } from './validation'
const valid = { ...records[0], demo: false, id: 'panel-001', slug: 'panel-001', shortDescription: 'Approved panel description', description: 'Approved details', image: '/images/products/panel.webp', imageAlt: 'Panel front view' }
const config = { tagline: 'Reliable energy products', description: 'Approved business description', whatsapp: '2348000000000', phone: '+2348000000000', email: 'test@example.org', address: 'Test address', openingHours: 'Monday to Friday', domain: 'https://test-business.org', logo: '/logo.svg', approvals: { content: true, contacts: true, products: true, images: true, brand: true }, social: {} }
const assets = { aboutTemporary: false, installationTemporary: false, faviconTemporary: false }
describe('catalogue validation', () => {
  it('accepts valid records and absent optional fields', () => { const item = { ...valid }; delete item.description; delete item.specifications; delete item.brand; expect(validateProducts([item])).toEqual({ products: [item], errors: [] }) })
  it('contains malformed records and reports errors', () => { const result = validateProducts([valid, null, { ...valid, id: 'other', slug: 'other', price: -1 }]); expect(result.products).toEqual([valid]); expect(result.errors).toHaveLength(2) })
  it('rejects duplicates, unknown categories, invalid types and prices', () => { expect(validateProducts([valid, valid]).errors[0]).toContain('duplicate'); for (const change of [{ category: 'Unknown' }, { price: NaN }, { available: 'yes' }, { keywords: [null] }, { specifications: [{ label: '', value: '5' }] }, { name: '' }]) expect(validateProducts([{ ...valid, ...change }]).errors.length).toBeGreaterThan(0) })
})
describe('production launch guard', () => {
  it('permits approved content and rejects demos/temporary media', () => { expect(validateLaunch(config, [valid], assets)).toEqual([]); expect(validateLaunch(config, records, { ...assets, aboutTemporary: true })).toEqual(expect.arrayContaining(['Replace all demo/placeholder products', 'Replace temporary About, installation and favicon assets'])) })
  it('rejects unapproved facts, missing contacts, guessed domains and unsafe links', () => { const errors = validateLaunch({ ...config, whatsapp: '', domain: 'https://CLIENT-DOMAIN.example', approvals: {}, mapUrl: 'javascript:alert(1)', social: { facebook: 'http://unsafe.test' } }, [valid], assets); expect(errors).toContain('Verified whatsapp is required'); expect(errors).toContain('Production domain must be a real origin'); expect(errors).toContain('Client approval required: contacts'); expect(errors).toContain('Map URL must be HTTPS') })
})
