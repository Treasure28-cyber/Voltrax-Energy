import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'
import { ProductCard } from './components/ProductCard'
import { ProductDialog } from './components/ProductDialog'
import { metadata } from './config/seo'
import products from './data/products.json'

function renderRoute(route) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
}

describe('public routes', () => {
  it('renders the complete Home structure and navigation targets', () => {
    const html = renderRoute('/')
    expect(html).toContain('<h1>Powering better choices')
    expect(html).toContain('id="about"')
    expect(html).not.toContain('id="services"')
    expect(html).not.toContain('href="/#services"')
    expect(html).toContain('id="contact"')
    expect(html).toContain('href="/products"')
    expect(html).toContain('href="/products?category=Solar%20Panels"')
    expect(html).toContain('href="tel:08163974464"')
    expect(html).not.toContain('href="mailto:')
    expect(html).toContain('https://wa.me/2348163974464?text=')
    expect(html).toContain('class="floating-whatsapp"')
  })

  it('renders Products directly and preserves a requested category', () => {
    const html = renderRoute('/products?category=Inverters')
    expect(html).toContain('<h1>Explore our product range.</h1>')
    expect(html).toContain('aria-pressed="true">Inverters')
    expect(html).toContain('Hybrid Inverter')
    expect(html).not.toContain('<h3>Solar Panel</h3>')
  })

  it('renders the custom not-found experience', () => {
    const html = renderRoute('/not-a-real-route')
    expect(html).toContain('That route is off the grid.')
    expect(html).toContain('Return home')
    expect(html).toContain('Browse products')
  })
})

describe('product presentation and SEO', () => {
  it('shows text availability and omits the enquiry shortcut for unavailable products', () => {
    const unavailable = { ...products[0], demo: false, available: false, priceLabel: 'Contact for price' }
    const html = renderToStaticMarkup(<MemoryRouter><ProductCard product={unavailable} onView={() => {}} /></MemoryRouter>)
    expect(html).toContain('Currently unavailable')
    expect(html).toContain('Contact for price')
    expect(html).not.toContain('wa.me')
  })

  it('renders complete product details without creating a product route', () => {
    const product = products[1]
    const html = renderToStaticMarkup(<ProductDialog product={product} onClose={() => {}} />)
    expect(html).toContain(`id="product-dialog-title">${product.name}`)
    expect(html).toContain(product.description)
    expect(html).toContain('Detailed specifications are not available yet.')
    expect(html).toContain('https://wa.me/2348163974464?text=')
    expect(html).toContain(encodeURIComponent(product.name))
    expect(html).toContain('Sample product')
  })

  it('uses distinct metadata for Home and Products', () => {
    expect(metadata['/'].title).not.toBe(metadata['/products'].title)
    expect(metadata['/'].description).not.toBe(metadata['/products'].description)
  })
})
