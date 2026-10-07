import { ArrowLeft, Grid2X2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="not-found"><div className="container"><span className="error-code">404</span><span className="eyebrow">Page not found</span><h1>That route is off the grid.</h1><p>The address may have changed, or the page may no longer exist.</p><div><Link className="button button-primary" to="/"><ArrowLeft /> Return home</Link><Link className="button button-secondary" to="/products"><Grid2X2 /> Browse products</Link></div></div></section>
}
