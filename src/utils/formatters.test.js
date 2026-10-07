import { describe, expect, it } from 'vitest'
import { formatPrice, getAvailability } from './formatters'

describe('product formatting', () => {
  it('formats numeric NGN prices and respects absent-price labels', () => {
    expect(formatPrice({ price: 125000, currency: 'NGN' })).toContain('125,000')
    expect(formatPrice({ price: null, priceLabel: 'Contact for price' })).toBe('Contact for price')
  })
  it('maps all availability states to visible text', () => {
    expect(getAvailability(true)).toBe('Available')
    expect(getAvailability(false)).toBe('Currently unavailable')
    expect(getAvailability(null)).toBe('Confirm availability')
  })
})
