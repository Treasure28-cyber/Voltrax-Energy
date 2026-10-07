import { describe, expect, it } from 'vitest'
import { filterProducts } from './catalogue'

const products = [
  { name: 'Hybrid Inverter', category: 'Inverters', brand: 'Demo', keywords: ['solar'] },
  { name: 'CCTV Camera', category: 'CCTV Systems', brand: '', keywords: ['security'] },
]

describe('filterProducts', () => {
  it('searches case-insensitively and trims surrounding whitespace', () => {
    expect(filterProducts(products, '  HYBRID  ')).toEqual([products[0]])
  })
  it('combines search and category filters', () => {
    expect(filterProducts(products, 'solar', 'Inverters')).toEqual([products[0]])
    expect(filterProducts(products, 'security', 'Inverters')).toEqual([])
  })
  it('supports partial names, category-only filtering, reset, and no results', () => {
    expect(filterProducts(products, 'vert')).toEqual([products[0]])
    expect(filterProducts(products, '', 'CCTV Systems')).toEqual([products[1]])
    expect(filterProducts(products, '', 'All Products')).toEqual(products)
    expect(filterProducts(products, 'absent product')).toEqual([])
  })
})
