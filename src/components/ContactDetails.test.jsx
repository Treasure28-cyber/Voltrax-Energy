import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ContactDetails } from './ContactDetails'
describe('contact rendering', () => {
  it('uses the available enquiry channel as the primary action', () => {
    const cases = [
      [{ whatsapp: '2348000000000', phone: '+2348000000000', email: 'test@example.org', generalWhatsappMessage: 'Hello' }, 'https://wa.me/2348000000000'],
      [{ phone: '+2348000000000', email: 'test@example.org' }, 'tel:+2348000000000'],
      [{ email: 'test@example.org' }, 'mailto:test@example.org?subject='],
    ]
    for (const [config, destination] of cases) {
      const html = renderToStaticMarkup(<ContactDetails config={config} prominent />)
      expect(html).toContain(`class="button button-secondary" href="${destination}`)
      expect(html).not.toContain('href="/products"')
    }
    const empty = renderToStaticMarkup(<ContactDetails config={{}} prominent />)
    expect(empty).not.toContain('href=')
    expect(empty).toContain('Online enquiries are not available yet')
  })
  it('omits empty or unsafe links', () => { const html = renderToStaticMarkup(<ContactDetails config={{ social: { facebook: 'javascript:alert(1)' } }} />); expect(html).toContain('Online enquiries are not available yet'); expect(html).not.toContain('href=') })
  it('renders supplied address, hours, map, social and contact actions', () => { const html = renderToStaticMarkup(<ContactDetails config={{ address: 'Verified address', openingHours: 'Mon–Fri 9–5', mapUrl: 'https://maps.google.com/', social: { facebook: 'https://facebook.com/test' }, phone: '+234 800 000 0000', email: 'test@example.org', whatsapp: '2348000000000', generalWhatsappMessage: 'Hello' }} />); for (const text of ['Verified address', 'Mon–Fri 9–5', 'Get directions', 'Facebook', 'tel:+2348000000000', 'mailto:test@example.org', 'wa.me/2348000000000']) expect(html).toContain(text) })
})
