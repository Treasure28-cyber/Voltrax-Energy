import { describe, expect, it } from 'vitest'
import { applyProductImageFallback, PRODUCT_IMAGE_FALLBACK } from './images'

describe('product image fallback', () => {
  it('replaces a failed image locally and prevents an error loop', () => {
    const image = { src: '/missing.webp', onerror: () => {} }
    applyProductImageFallback({ currentTarget: image })
    expect(image.src).toBe(PRODUCT_IMAGE_FALLBACK)
    expect(image.onerror).toBeNull()
  })
})
