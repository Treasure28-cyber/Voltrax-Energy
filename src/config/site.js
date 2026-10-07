export const CLIENT_PLACEHOLDER = '[CLIENT TO PROVIDE]'

export const siteConfig = {
  legalName: 'Voltrax Energy Nigeria Limited',
  shortName: 'Voltrax Energy',
  tagline: '[CLIENT TO APPROVE: Reliable Solar and Electrical Solutions]',
  description: '[CLIENT TO APPROVE: Voltrax Energy Nigeria Limited supplies solar, electrical and security products for homes, businesses and organisations.]',
  whatsapp: '2348163974464',
  phone: '08163974464',
  email: '',
  address: '',
  mapUrl: '',
  openingHours: '',
  serviceAreas: '',
  domain: '',
  social: { instagram: '', facebook: '', linkedin: '', tiktok: '' },
  logo: '',
  approvals: { content: false, contacts: false, products: false, images: false, brand: false },
  analyticsId: '',
  generalWhatsappMessage: 'Hello Voltrax Energy, I would like to enquire about your products.',
}

export const hasVerifiedContact = Boolean(siteConfig.whatsapp || siteConfig.phone || siteConfig.email)
