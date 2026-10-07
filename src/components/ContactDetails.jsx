import { siteConfig } from '../config/site'
import { WhatsAppIcon } from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { isHttpsUrl } from '../utils/validation'
export function ContactDetails({ config = siteConfig, prominent = false }) {
  const whatsapp = buildWhatsAppUrl(config.whatsapp, config.generalWhatsappMessage)
  const social = Object.entries(config.social || {}).filter(([, url]) => isHttpsUrl(url))
  const hasDetails = Boolean(config.address || config.openingHours || config.phone || config.email || whatsapp || social.length || isHttpsUrl(config.mapUrl))
  const primaryChannel = whatsapp ? 'whatsapp' : config.phone ? 'phone' : config.email ? 'email' : null
  const actionClass = (channel) => prominent ? `button ${channel === primaryChannel ? 'button-secondary' : 'button-ghost'}` : undefined
  return <div className="contact-details">
    {!hasDetails && <p>Online enquiries are not available yet. Official contact details will be added soon.</p>}
    {config.address && <address>{config.address}</address>}
    {config.openingHours && <p><strong>Opening hours</strong><br />{config.openingHours}</p>}
    {config.serviceAreas && <p><strong>Service areas</strong><br />{config.serviceAreas}</p>}
    <div className={`contact-links${prominent ? ' contact-enquiry-actions' : ''}`}>
      {whatsapp && <a className={actionClass('whatsapp')} href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Enquire on WhatsApp</a>}
      {config.phone && <a className={actionClass('phone')} href={'tel:' + config.phone.replace(/[^+\d]/g, '')}>Call {config.phone}</a>}
      {config.email && <a className={actionClass('email')} href={'mailto:' + config.email + (prominent ? '?subject=' + encodeURIComponent('Product enquiry — Voltrax Energy') : '')}>{prominent ? 'Email an enquiry' : config.email}</a>}
      {isHttpsUrl(config.mapUrl) && <a href={config.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>}
    </div>
    {social.length > 0 && <nav className="social-links" aria-label="Social media">{social.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name.charAt(0).toUpperCase() + name.slice(1)}</a>)}</nav>}
  </div>
}
