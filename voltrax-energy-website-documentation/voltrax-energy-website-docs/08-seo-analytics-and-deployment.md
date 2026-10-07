# 08 — SEO, Analytics and Deployment

## SEO objective

Make the two public routes technically crawlable and locally relevant. This is foundational SEO, not a promise of a particular Google position.

## Required metadata

### Home

- Unique `<title>` using the approved brand and main offering
- Concise meta description
- Canonical URL
- Open Graph title, description, image and URL
- Appropriate Twitter/social preview metadata

### Products

- Unique `<title>`
- Catalogue-focused meta description
- Canonical `/products` URL
- Matching social preview metadata

Use the confirmed production domain. Do not ship `localhost`, preview URLs or a guessed domain as canonical.

## On-page requirements

- One meaningful H1 per route.
- Logical H2/H3 hierarchy.
- Useful visible copy describing offerings and location/service area once verified.
- Descriptive link text and image alt text.
- Internal links between Home and Products.
- Product names and descriptions rendered in crawlable page content.

## Static React SEO approach

Because this is a Vite single-page application, configure route-specific metadata using a suitable lightweight approach. If practical within the static build, pre-render `/` and `/products`; otherwise ensure metadata and visible content are reliable and test the deployed routes. Do not introduce a server solely for SEO.

## Structured data

Add valid JSON-LD only from verified facts:

- `LocalBusiness` or the closest accurate business type
- Business name, URL, logo, contact details and address when supplied
- `Product` markup only where fields are accurate; do not claim ratings, offers, stock or prices that the client has not confirmed

Validate structured data before launch.

## Crawl files

- `public/robots.txt` allowing normal crawling and referencing the sitemap
- `public/sitemap.xml` containing the production Home and Products URLs
- Web app icons/favicon supplied or derived from an approved brand asset

## Local discovery setup outside the code

- Verify or create the client’s Google Business Profile separately.
- Add the production property to Google Search Console.
- Submit the sitemap after launch.
- Ensure company name, address and phone remain consistent across trusted listings.

These are launch/marketing actions; the code alone cannot guarantee ranking.

## Analytics

- Prepare an optional environment/config value for the approved analytics measurement ID.
- Do not use a fake ID.
- Do not load analytics when the value is absent.
- Recommended events: product view, category selection, search use, product WhatsApp click and general WhatsApp click.
- Avoid sending product searches or other content as personal information.

## Deployment target

Primary proposed target: Netlify free tier for a static commercial website, subject to the provider’s current terms and limits at launch. The custom domain is purchased separately.

## Build output

- `npm run build` must create the deployable `dist` directory.
- Configure SPA route fallback so direct visits and refreshes work.
- Do not expose source maps publicly unless intentionally required.
- Set the supported Node version in project configuration or documentation.

## Deployment checklist

1. Replace all placeholders and demo products.
2. Confirm domain spelling and ownership.
3. Run tests, lint and production build.
4. Preview the production build locally.
5. Commit approved source to GitHub.
6. Connect the repository to the hosting project.
7. Configure build command and publish directory.
8. Configure the custom domain and DNS.
9. Confirm HTTPS is active.
10. Test `/`, `/products`, direct refresh and an invalid route.
11. Confirm canonical URLs, robots and sitemap use the final domain.
12. Test WhatsApp links on phone and desktop.
13. Run Lighthouse and accessibility checks.
14. Connect Search Console and submit the sitemap.

## Ownership and renewal notes

- The client should own or control the production domain and hosting account.
- The `.com` domain expires unless renewed yearly.
- Record the registration date, expiry date, renewal price and responsible payer.
- Enable renewal reminders and notify the client well before expiration.
- Hosting-plan terms and limits should be reviewed at launch and periodically afterward.

## Alternative hosting

The same `dist` build may be deployed to suitable static hosting. If moved to Namecheap shared hosting, upload the production files and add the host-appropriate SPA rewrite. Do not redesign or rebuild the application merely because the static host changes.

