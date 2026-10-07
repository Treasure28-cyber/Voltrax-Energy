# 05 — Non-Functional Requirements

## Usability

- NFR-01: A first-time visitor should understand the company’s primary offering within five seconds of viewing the Home hero.
- NFR-02: A visitor should reach a product-specific WhatsApp enquiry within two deliberate actions after finding a product.
- NFR-03: Interactive controls shall use consistent wording, colour and placement.
- NFR-04: The interface shall avoid unnecessary technical terms.
- NFR-05: Touch targets should be at least 44 × 44 CSS pixels where practical.

## Responsive design

- NFR-06: The website shall remain functional from 320 px viewport width upward.
- NFR-07: No public screen shall show unintended horizontal scrolling.
- NFR-08: Navigation, cards, modal/drawer content and contact actions shall adapt to touch screens.
- NFR-09: Content shall remain readable without requiring pinch zoom.

## Performance

- NFR-10: Use lazy loading for below-the-fold product images.
- NFR-11: Serve appropriately sized WebP or AVIF images where source assets permit.
- NFR-12: Avoid autoplay video, large background video and unnecessary animation libraries.
- NFR-13: Keep initial JavaScript and CSS economical; do not add a component framework solely for a few basic components.
- NFR-14: Target Lighthouse scores on a production build of Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 and SEO ≥ 95. Document legitimate constraints if a target cannot be met.
- NFR-15: Avoid visible layout shifts by reserving image dimensions.

## Accessibility

- NFR-16: Aim for WCAG 2.2 AA conformance for the delivered screens.
- NFR-17: Normal text and interactive states shall meet AA colour contrast.
- NFR-18: Use semantic landmarks, headings, lists, buttons and links.
- NFR-19: Every meaningful image shall have descriptive alt text; decorative images shall use empty alt text.
- NFR-20: All functions shall be keyboard accessible.
- NFR-21: Focus indicators shall be clearly visible.
- NFR-22: The product-detail interface shall have an accessible name and sensible focus behavior.
- NFR-23: Search and filtering changes shall be understandable to assistive-technology users.
- NFR-24: Respect `prefers-reduced-motion`.

## Reliability and compatibility

- NFR-25: The current and previous major versions of Chrome, Edge, Firefox and Safari should be supported.
- NFR-26: Product-data errors shall be contained where possible rather than crashing the whole page.
- NFR-27: All internal routes shall work on direct refresh after deployment.
- NFR-28: The site shall present a usable fallback when an image fails.

## Security and privacy

- NFR-29: No API keys, passwords or private information shall be committed to frontend source code.
- NFR-30: External links opened in a new tab shall use safe relationship attributes.
- NFR-31: Dependency audit findings shall be reviewed before launch.
- NFR-32: HTTPS shall be enabled on the production domain.
- NFR-33: Do not install tracking until the client authorizes it and supplies the required identifier.
- NFR-34: Do not collect personal data through a website form in the initial scope.

## Maintainability

- NFR-35: Use small reusable components and avoid page-sized monoliths.
- NFR-36: Business configuration, product data and UI components shall remain separate.
- NFR-37: Use consistent naming and remove unused dependencies and assets.
- NFR-38: Include setup, build, product-update and deployment guidance in the code repository README.
- NFR-39: The project shall pass configured linting and production build commands.

## Content integrity

- NFR-40: Do not publish placeholder contact details or unverified claims to production.
- NFR-41: Do not invent product specifications, prices, testimonials, partnerships or certifications.
- NFR-42: Product units and model names shall preserve client-approved capitalization and notation.

