# 09 — Acceptance and Test Plan

## Definition of done

The project is complete only when required content is approved, the Must requirements pass, the production build succeeds, the deployed website works on representative devices, and no critical defect remains.

## Functional acceptance tests

| ID | Test | Expected result |
|---|---|---|
| AT-01 | Open `/` | Home renders with header, required sections and footer |
| AT-02 | Open `/products` directly | Products renders without first visiting Home |
| AT-03 | Refresh `/products` in production | Route continues to work |
| AT-04 | Open an invalid URL | Custom not-found screen appears |
| AT-05 | Use desktop navigation | Every link reaches the correct route/section |
| AT-06 | Use mobile menu | It opens, closes and navigation works |
| AT-07 | Search by partial product name | Matching products remain |
| AT-08 | Search with different letter case and spaces | Matching is case-insensitive and trimmed |
| AT-09 | Select a category | Only matching products remain |
| AT-10 | Combine search and category | Results satisfy both conditions |
| AT-11 | Reset filters | All products return |
| AT-12 | Search for an absent item | Helpful empty state and reset action appear |
| AT-13 | Open product details | Correct image, copy, specifications and status appear |
| AT-14 | Close details with button/Escape | Interface closes and focus behavior remains usable |
| AT-15 | Select product WhatsApp action | Correct configured number and encoded product message open |
| AT-16 | Select general WhatsApp action | General message opens to the correct number |
| AT-17 | Render a product with `price: null` | Contact price label appears; no false numeric price |
| AT-18 | Render unavailable product | Visible status appears and normal order action is not misleading |
| AT-19 | Force image failure | Local fallback displays without breaking layout |
| AT-20 | Remove optional contact value | Its control is omitted without blank/broken output |

## Responsive and visual acceptance

- No unintended horizontal overflow at documented checkpoints.
- Header, filters and product actions remain usable at 320 px.
- Product images do not become distorted.
- Modal/drawer remains scrollable when content exceeds viewport height.
- Floating WhatsApp action does not cover navigation, cookie controls, footer actions or product buttons.
- Text contrast and focus styles remain clear.
- Layout has consistent spacing, radii, shadows and typography.

## Accessibility checks

- Navigate the complete experience using only a keyboard.
- Confirm logical tab order and visible focus.
- Confirm menu and dialog semantics with browser accessibility tools.
- Run automated accessibility testing such as axe and Lighthouse.
- Confirm every form control has an accessible name.
- Confirm headings follow a logical order.
- Confirm status is expressed in text, not colour alone.
- Confirm reduced-motion preference disables nonessential movement.

## Quality commands

The implementation should provide equivalent scripts for:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

Use Vitest and React Testing Library for focused behavior tests where appropriate. Do not create a huge test suite for trivial styling, but cover filtering, price/status formatting and WhatsApp message generation.

## Content QA

- Search the repository for `[CLIENT TO PROVIDE`, `TODO`, fake phone numbers, demo products and placeholder domains.
- Confirm product names, capacities, units and prices against the client-approved source.
- Confirm all public contact and social links.
- Confirm no fabricated testimonial, certification, statistic or partner appears.
- Proofread visible copy for Nigerian English consistency.

## SEO and deployment QA

- Titles and descriptions differ between the two routes.
- Canonical URLs use the production domain.
- `robots.txt` and `sitemap.xml` load successfully.
- Social preview image and favicon load.
- Structured data passes validation and contains only verified facts.
- HTTPS works and HTTP redirects safely.
- Home, Products and 404 routes work after deployment.

## Performance QA

- Run Lighthouse against the production build, not only the development server.
- Check mobile and desktop reports.
- Confirm large product images are optimized and below-the-fold images are lazy-loaded.
- Inspect the network panel for missing assets and unnecessary large resources.
- Document any missed target and the reason before handover.

## Client review

Client approval should cover:

- Home-page visual direction
- Products-page visual direction
- Company description and services
- Contact details
- Product names, images, specifications, prices and availability
- WhatsApp wording
- Final production domain

## Handover items

- Source repository access
- Production URL
- Domain and hosting ownership details
- Renewal/expiry record
- Instructions for updating products
- Build and deployment instructions
- Known limitations
- Agreed support period and out-of-scope update policy

