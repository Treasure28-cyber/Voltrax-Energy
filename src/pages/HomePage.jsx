import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Grid2X2, Search, FileText } from 'lucide-react'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import products from '../data/catalogue'
import { ProductCard } from '../components/ProductCard'
import { ProductDialog } from '../components/ProductDialog'
import { getCategories } from '../utils/catalogue'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { siteConfig } from '../config/site'
import { categoryImages, siteAssets } from '../config/assets'
import { ContactDetails } from '../components/ContactDetails'

const categoryDetails = {
  'Solar Panels': { description: 'Generate clean power from sunlight' },
  Inverters: { description: 'Convert and manage your power supply' },
  'Lithium Batteries': { description: 'Store energy for backup and night use' },
  'CCTV Systems': { title: 'CCTV & Security', description: 'Cameras and systems to watch over property' },
  'Charge Controllers': { description: 'Regulate charging between panels and batteries' },
  'Electrical Appliances': { title: 'Electrical Appliances & Supplies', description: 'Everyday electrical essentials and supplies' },
}

const reasonsToChoose = [
  { icon: <Grid2X2 aria-hidden="true" />, title: 'One range, more possibilities', description: 'Explore solar power, energy storage, security and electrical essentials together in one catalogue.' },
  { icon: <Search aria-hidden="true" />, title: 'Find what you need faster', description: 'Search by name or browse by category. Discover the range without creating an account.' },
  { icon: <FileText aria-hidden="true" />, title: 'Clarity before you decide', description: 'Review product descriptions and available specifications. See when pricing or details still need confirmation.' },
]

export function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const closeDialog = useCallback(() => setSelectedProduct(null), [])
  const categories = getCategories(products)
  const featured = products.filter((product) => product.featured).slice(0, 4)
  const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsapp, siteConfig.generalWhatsappMessage)

  return (
    <>
      <section className="hero">
        <img className="hero-image" src={siteAssets.hero} alt="Studio composition of solar, power-storage and security equipment" width="1584" height="990" fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow eyebrow-light"><span /> Solar · Electrical · Security</span>
          <h1>Powering better choices for homes and businesses.</h1>
          <p>Explore solar panels, inverters, lithium batteries, CCTV systems and electrical products from Voltrax Energy Nigeria Limited.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/products">Explore products <ArrowRight /></Link>
            {whatsappUrl && <a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Chat on WhatsApp</a>}
          </div>
          <ul className="hero-benefits" aria-label="Shopping benefits">
            <li><Check aria-hidden="true" /> No account required</li>
            <li><Check aria-hidden="true" /> Browse by category</li>
            <li><Check aria-hidden="true" /> Direct product enquiries</li>
          </ul>
        </div>
      </section>

      <section className="section category-section" aria-labelledby="category-title">
        <div className="container">
          <div className="section-heading split-heading category-heading"><div><span className="eyebrow">Product categories</span><h2 id="category-title">Everything for power and protection</h2></div><Link className="text-link" to="/products">All products <ArrowRight aria-hidden="true" /></Link></div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link to={`/products?category=${encodeURIComponent(category)}`} className="category-card" key={category}>
                <img className="category-image" src={categoryImages[category]} srcSet={[400, 800, 1254].map((width) => (width === 1254 ? categoryImages[category] : categoryImages[category].replace('.webp', '-' + width + '.webp')) + ' ' + width + 'w').join(', ')} sizes="(max-width: 360px) 88px, 112px" alt="" width="1254" height="1254" loading="lazy" />
                <div className="category-copy"><h3>{categoryDetails[category]?.title || category}</h3><p>{categoryDetails[category]?.description || 'Explore products in this category'}</p></div>
                <ArrowUpRight className="category-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow">Explore the range</span><h2 id="featured-title">Featured products</h2></div><Link className="text-link" to="/products">View all products <ArrowRight /></Link></div>
          <div className="product-grid home-products">{featured.map((product, index) => <ProductCard key={product.id} product={product} onView={setSelectedProduct} eager={index < 2} />)}</div>
        </div>
      </section>

      <section id="about" className="section about-section" aria-labelledby="about-title">
        <div className="container about-grid">
          <div><span className="eyebrow">About Voltrax</span><h2 id="about-title">Power, electrical and security. All in one place.</h2><figure className="about-photo"><img src={siteAssets.about} alt="Illustrative showroom consultation with solar equipment" width="1448" height="1086" loading="lazy" />{siteAssets.aboutTemporary && <figcaption>Illustrative image</figcaption>}</figure></div>
          <div><p>Explore Voltrax Energy Nigeria Limited’s solar, electrical and security product categories for homes and businesses.</p><p>From solar panels and battery storage to CCTV and everyday electrical essentials, find the product type you need in one catalogue.</p><ul className="check-list"><li><Check aria-hidden="true" />Solar power and energy storage</li><li><Check aria-hidden="true" />CCTV and security equipment</li><li><Check aria-hidden="true" />Electrical appliances and supplies</li></ul></div>
        </div>
      </section>

      <section id="why-choose-us" className="section why-choose-section" aria-labelledby="why-choose-title">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">Why choose us</span><h2 id="why-choose-title">More choice. Less guesswork.</h2><p>Find the products you need with a clear, straightforward browsing experience.</p></div>
          <div className="why-choose-grid">
            {reasonsToChoose.map(({ icon, title, description }) => (
              <article className="why-choose-card" key={title}>
                {icon}
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title">
        <div className="container contact-card"><div><span className="eyebrow eyebrow-light">Contact Voltrax</span><h2 id="contact-title">Have a product in mind?</h2><p>Ask about pricing, availability and product details.</p></div><div className="contact-panel"><ContactDetails prominent /></div></div>
      </section>
      <ProductDialog product={selectedProduct} onClose={closeDialog} />
    </>
  )
}
