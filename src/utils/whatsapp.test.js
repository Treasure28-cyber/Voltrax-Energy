import { describe, expect, it } from 'vitest'
import { buildProductMessage, buildWhatsAppUrl } from './whatsapp'

describe('WhatsApp links', () => {
  it('omits a link when the number is unavailable', () => {
    expect(buildWhatsAppUrl('', 'Hello')).toBe('')
  })
  it('keeps digits and safely encodes product messages', () => {
    const message = buildProductMessage('5KVA Hybrid Inverter & Charger')
    const url = buildWhatsAppUrl('+2a3b4', message)
    expect(url).toMatch(/^https:\/\/wa\.me\/234\?text=/)
    expect(decodeURIComponent(url.split('?text=')[1])).toContain('5KVA Hybrid Inverter & Charger')
  })
})
