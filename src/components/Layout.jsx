import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X, Zap } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { siteConfig } from '../config/site'
import { ContactDetails } from './ContactDetails'
import { catalogueErrors } from '../data/catalogue'
import { buildWhatsAppUrl } from '../utils/whatsapp'
const isPreview = import.meta.env.MODE !== 'production'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export function Brand() {
  return (
    <Link to="/" className="brand" title="Voltrax Energy home">
      {siteConfig.logo ? <img className="brand-logo" src={siteConfig.logo} alt="" width="48" height="48" /> : <span className="brand-mark"><Zap aria-hidden="true" /></span>}
      <span><strong>VOLTRAX</strong>{' '}<small>ENERGY</small></span>
    </Link>
  )
}

function Navigation({ mobile = false, onChoose }) {
  return (
    <nav aria-label={mobile ? 'Mobile navigation' : 'Primary navigation'} className={mobile ? 'mobile-nav' : 'desktop-nav'}>
      {navItems.map((item) => (
        <NavLink key={item.label} to={item.to} onClick={onChoose} className={({ isActive }) => isActive && !item.to.includes('#') ? 'active' : ''}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const whatsAppUrl = buildWhatsAppUrl(siteConfig.whatsapp, siteConfig.generalWhatsappMessage)
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.menu-button')?.focus() } }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {isPreview && <div className="development-banner" role="note">Preview catalogue · Sample products and illustrative images</div>}
      {isPreview && catalogueErrors.length > 0 && <div className="validation-notice" role="alert"><strong>Invalid catalogue records were omitted</strong><ul>{catalogueErrors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <Navigation />
          <div className="header-actions">
            {whatsAppUrl ? <a className="button button-primary quote-button" href={whatsAppUrl} target="_blank" rel="noreferrer">Get a quote <ArrowUpRight /></a> : <Link className="button button-primary quote-button" to="/products">Browse products <ArrowUpRight /></Link>}
            <button className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && <div id="mobile-menu" className="mobile-menu"><Navigation mobile onChoose={() => setMenuOpen(false)} /></div>}
      </header>
      <main id="main-content" tabIndex="-1"><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Brand /><p>Solar, electrical and security product enquiries made straightforward.</p></div>
          <div><h2>Navigate</h2><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/#about">About</Link></div>
          <div><h2>Contact</h2><ContactDetails /></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Voltrax Energy Nigeria Limited.</span>{isPreview && <span>Development preview — details subject to client approval.</span>}</div>
      </footer>
      {whatsAppUrl && <a className="floating-whatsapp" href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Voltrax Energy on WhatsApp"><WhatsAppIcon /></a>}
    </div>
  )
}
