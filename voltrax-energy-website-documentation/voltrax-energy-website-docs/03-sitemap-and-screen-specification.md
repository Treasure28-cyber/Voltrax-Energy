# 03 — Sitemap and Screen Specification

## Information architecture

| Route | Purpose | Primary action |
|---|---|---|
| `/` | Introduce the company, offerings and featured products | Explore products / WhatsApp |
| `/products` | Search, filter and inspect the catalogue | Product WhatsApp enquiry |
| `*` | Recover from an invalid address | Return home / browse products |

Header links to About, Services and Contact should point to sections on the home page. When selected from `/products`, they must navigate to the matching home-page anchor, for example `/#services`.

## Global header

- Company logo/wordmark linked to `/`
- Desktop navigation: Home, Products, About, Services, Contact
- High-emphasis “Get a Quote” or WhatsApp action
- Mobile menu button with accessible name and expanded state
- Sticky behavior is permitted if it does not hide content or consume excessive mobile space

## Screen 1 — Home page

### 1. Hero

- Clear benefit-focused headline
- One short supporting paragraph
- Primary action: Explore Products
- Secondary action: WhatsApp enquiry
- Product-led visual rather than an unrelated stock image
- Optional compact trust signals only when facts are verified

### 2. Product categories

- Show the confirmed categories using simple cards or chips
- Each category links to `/products?category=<value>`
- Use an icon or product image consistently

### 3. Featured products

- Display 4–8 products marked `featured: true`
- Reuse the same product-card component as the Products page
- Provide a clear “View All Products” link

### 4. About

- Short company description
- Supporting image if supplied
- No unverified statistics or exaggerated claims

### 5. Services/offerings

- Present only services confirmed by the client
- Use short, scannable explanations

### 6. Why choose Voltrax

- Focus on approved practical benefits such as product guidance, dependable products, responsive support or convenient enquiries
- Omit any unverified benefit

### 7. How ordering works

- Four brief steps from browsing to confirmation
- Explain that price, delivery and availability are confirmed directly

### 8. Conversion section

- Strong heading and short reassurance
- WhatsApp and telephone actions

### 9. Contact

- Address, hours, telephone, email and map link where supplied
- Do not embed a heavy map unless it materially improves the experience; a directions link is acceptable

### 10. Footer

- Logo/short description
- Page/section links
- Contact information
- Social links
- Dynamic copyright year
- Privacy link only if a real privacy notice exists

## Screen 2 — Products page

### 1. Page introduction

- Heading such as “Explore Our Products”
- Short explanation of catalogue and enquiry process

### 2. Search and filters

- Search input with visible label or equivalent accessible name
- Category controls, including “All Products”
- Visible active-filter state
- Clear/reset control when a query or category is active
- Optional live result count

### 3. Product grid

- Responsive grid: one column on narrow phones, increasing progressively
- Predictable card height without forcing excessive empty space
- Product image, category, name, short description, price label/status and actions
- Availability must not rely on colour alone

### 4. Product detail view

Use an accessible modal, mobile bottom sheet, drawer, or expanded panel. It must include:

- Larger image
- Product name and category
- Description
- Specifications
- Price label
- Availability
- Product-specific WhatsApp action
- Clear close control and keyboard support

Do not create a third public product-detail route unless the scope is formally changed.

### 5. Empty state

- State that no products match
- Suggest clearing or changing filters
- Provide a reset action
- Keep the general WhatsApp enquiry available

## Global floating WhatsApp action

- Present on both public pages without covering essential controls
- Use a text label on larger screens and an accessible name on small screens
- Do not animate continuously

## Not-found screen

- Friendly error message
- Return Home button
- Browse Products button
- Maintain the normal visual identity

## Responsive checkpoints

Test at minimum:

- 320 × 568
- 360 × 800
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1440 × 900

The design must adapt fluidly between these checkpoints and must not be built for only these exact widths.

