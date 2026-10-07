# Voltrax Energy website

A responsive two-page product-catalogue website for Voltrax Energy Nigeria Limited. The interface is intentionally enquiry-only and contains no cart, payment, account, backend or product-detail routes.

## Status

This repository currently contains a **development preview**. Product records and several copy blocks are clearly marked as demo or client-approval content. Do not deploy it as the production company website until the launch checklist below is complete.

## Requirements

- Node.js 22.19 or newer (Node 24 recommended for the QA tools)
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build:preview
npm run preview
npm run test:e2e
npm run qa:performance
```

The preview bundle is generated in `dist/`. `npm run build` is the guarded production build and deliberately refuses demo content, missing client approvals, invalid records and temporary assets. Use `npm run build:preview` for presentation builds. Preflight launch content with `npm run validate:launch`.

## Routes

- `/` — Home
- `/products` — Product catalogue
- Any other path — branded not-found experience

Netlify fallback rules are included so direct visits and refreshes work.

## Updating company information

Edit `src/config/site.js`. Keep the WhatsApp number in international format; the link builder removes formatting characters and uses digits only. Empty contact fields are omitted from interactive actions rather than rendered as broken links.

The final production domain must include `https://`. Address, opening hours, service areas, telephone, email, map and social links render from this configuration. Empty links are omitted; map/social URLs must use HTTPS. Set the five `approvals` flags only after real client review. Supply the approved `logo` path.

## Updating products

Product records live in `src/data/products.json`. Each record follows the schema in the supplied project documentation. In particular:

- `id` and `slug` must be unique.
- `category` must match an approved category exactly.
- `price` is a number or `null`; never add commas to a stored number.
- Set `available` to `true`, `false`, or `null`.
- Product images should be approved, optimized WebP or AVIF files in `public/images/products/`.
- Remove `demo: true` after the record is replaced by verified client content.

Catalogue validation reports malformed records in the preview and excludes them from rendering. Both build modes reject invalid records. After every catalogue update, run linting, tests and the appropriate build, then verify search, filters, product details and enquiry links.

## Images and SEO

Image paths are centralized in src/config/assets.js. Generated category imagery is used in the demo catalogue, with explicit illustrative alt text and demo badges. About and installation photos remain labelled AI presentation assets; installation is visible only in previews. Replace them with genuine photos or remove the unused installation concept before launch, then update their temporary flags. The favicon is a temporary matching energy symbol, also guarded before production. Approved brand files replace it.

The build emits static metadata in dist/index.html and dist/products/index.html, so route titles and social tags do not depend on JavaScript. It emits canonical URLs, a two-route sitemap and robots sitemap reference from the verified production domain. Verified-fact-only LocalBusiness JSON-LD is enabled when contact approval and a valid domain are configured. Preview builds use noindex/nofollow and disallow crawling; they omit the production sitemap. The 1200 × 630 PNG social background is used for broad crawler compatibility; add approved branding before approving it for release. Catalogue images include 400 px and 800 px responsive exports; the hero is preloaded on Home. The generator keeps WebP website assets and the social PNG in dist, excluding unused PNG originals and draft crawl files.

Analytics remains disabled until separately authorized; no tracking is installed by these changes.

## Quality checks

- npm run lint — source and test script linting.
- npm run test — focused catalogue, launch, contact and SEO tests.
- npm run build:preview — compiled review site.
- npm run test:e2e — Chrome viewport/axe/keyboard tests plus Edge, Firefox and WebKit compatibility smoke tests. Requires installed Chrome/Edge and Playwright Firefox/WebKit: npx playwright install firefox webkit.
- npm run qa:performance — mobile and desktop Lighthouse checks against the compiled dist bundle; launches its own preview server on port 4174.
- npm run qa:deployment — after approved content is deployed, verify live HTTPS, HTTP redirects, static route metadata, canonical/social URLs, JSON-LD, sitemap, robots and image delivery. Refuses to probe an unapproved domain.
- npm audit — dependency review.

Browser evidence is in tmp/qa/playwright-report and tmp/qa/test-results. Lighthouse HTML/JSON reports are in tmp/qa/lighthouse. Preview SEO scores reflect intentional noindex rules; release SEO and live domain checks must be repeated after client approval and deployment. WebKit automation is an engine check, not a substitute for testing real iOS Safari.

## Netlify deployment

1. Complete the launch-content checklist.
2. Run `npm run lint`, `npm run test` and `npm run build`.
3. Connect the repository to the client-controlled Netlify account.
4. Use `npm run build` as the build command and `dist` as the publish directory.
5. Configure the verified custom domain and DNS.
6. Confirm HTTPS, direct `/products` refreshes, invalid routes and WhatsApp links.
7. Run production Lighthouse and accessibility checks.
8. Connect Search Console and submit the finalized sitemap.

## Required before production

- Replace the temporary icon/wordmark with the approved logo and favicon.
- Approve the hero, about and other draft wording.
- Supply the WhatsApp number, telephone, email, address, map URL and opening hours.
- Confirm service areas and any actual services beyond product supply.
- Replace all demo products and placeholder images with approved catalogue content.
- Confirm category names, prices, availability and WhatsApp wording.
- Confirm the production domain and update the sitemap and robots file.
- Confirm image usage rights.
- Authorize analytics separately if desired.
- Search for `CLIENT`, `demo`, `placeholder`, `TODO` and `.example` before launch.

Do not publish invented testimonials, certifications, partnerships, warranties, statistics, contact details or product specifications.

## Material assumptions

- The website is an enquiry-only catalogue.
- One WhatsApp number will receive all enquiries once supplied.
- English is the launch language.
- Prices and availability are confirmed directly with Voltrax Energy.
- The provisional six-category taxonomy will be replaced or approved by the client.
- Additional product maintenance remains a source-code update process.

## Known limitations

- No production contact actions are available until verified details are supplied.
- Demo records exist only to exercise layout and catalogue behavior.
- Static metadata is emitted for both routes; full HTML content prerendering remains optional. Real-domain crawlability/social previews, HTTPS and DNS are checked after deployment.
- Search and filtering are local and designed for the documented initial catalogue size.
