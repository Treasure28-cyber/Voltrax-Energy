# Implementation and QA follow-up — 6 October 2026

## Implemented

1. **Generated imagery:** Hero, six category cards, demo catalogue, About and a labelled installation presentation image are integrated. Website images use WebP; category/catalogue images have 400/800/1254 px responsive choices. Hero preload improves early loading. About/installation are explicitly temporary; installation is preview-only. The social background is the exact 1200 × 630 PNG. Unused PNG originals and draft metadata are excluded from dist.
2. **Contact support:** One reusable component renders supplied address, opening hours, service areas, telephone, email, WhatsApp, map and social links in Home and footer. Empty links are omitted. Map/social URLs must be HTTPS. Business fields remain centralized in src/config/site.js.
3. **Validation and launch guard:** Invalid records are reported and omitted from preview rendering; builds reject schema violations, duplicate identifiers, unsupported categories and malformed optional values. Production builds additionally reject demo/placeholder content, missing contacts/domain, absent client approvals, temporary assets and missing files. npm run build:preview remains available for review; Netlify retains the guarded npm run build command.
4. **SEO:** Both route HTML files contain static titles/descriptions/social tags without requiring JavaScript. Canonicals, social URLs, verified business JSON-LD, robots and the final two-route sitemap are generated from approved configuration. No guessed domain or invented facts are emitted. Trailing-slash routes have correct runtime metadata. The preview favicon is integrated and must be replaced/approved before release. Preview output is intentionally noindex and disallows crawling.
5. **Keyboard accessibility:** Search focus is visible, filter/clear targets meet 44 px sizing, mobile menu closes with Escape, native dialogs retain keyboard focus and lock background scrolling, and closing returns focus to the opener in Chrome/Edge/Firefox/WebKit. 404 contrast, wordmark label and Products heading-order issues found during QA were corrected.
6. **Repeatable QA:** Added browser/axe checks, mobile/desktop Lighthouse reports, launch preflight and a live deployment-delivery check. Instructions are in the repository README.

## Verified locally

- npm run lint: passed, including application, test and QA scripts.
- npm run test: 25 tests passed across eight files.
- npm run build:preview: passed; JavaScript about 84 KB gzip and CSS about 6.4 KB gzip.
- Full browser run: 16 tests passed across installed Chrome/Edge, Playwright Firefox and WebKit. Chrome tested 320×568, 360×800, 390×844, 768×1024, 1024×768 and 1440×900. All three routes load, images decode, no unintended horizontal overflow or console errors appear, and AA axe scans pass at all six sizes. Keyboard/filter/navigation/image-fallback/reduced-motion checks pass.
- After the final Products heading change, three targeted Chrome checks passed at 390×844 and 1440×900 and through the catalogue keyboard flow.
- npm audit fix and npm audit --omit=dev: zero known vulnerabilities. Patched Vitest and compatible vulnerable transitive dependencies. QA tools require Node 22.19+; Node 24 is recommended.
- Production build and launch preflight reject current missing client content as intended. Live deployment checks refuse to probe an unapproved domain.

Browser command evidence: tmp/qa/browser-summary.json. Current screenshots and HTML report: tmp/qa/test-results and tmp/qa/playwright-report. Lighthouse reports: tmp/qa/lighthouse.

## Performance and release limits

Final Lighthouse results against the compiled preview:

| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|---:|
| Home | mobile | 94 | 100 | 100 | 66 |
| Home | desktop | 100 | 100 | 100 | 66 |
| Products | mobile | 95 | 100 | 100 | 66 |
| Products | desktop | 100 | 100 | 100 | 66 |

Performance, accessibility and best-practices targets pass. Products heading order was corrected and its audits rerun. An interim desktop Products run scored 84 while background work was active; the isolated repeat scored 100. Reports and final-summary.json retain the final results. Preview SEO is 66 due solely to deliberate noindex/crawl blocking. The production performance script enforces SEO ≥95 on indexable release output; preview exceptions are explicit. Local simulated timing varies with machine load.

Production domain, DNS, HTTPS, genuine WhatsApp destination, real-phone behavior, Search Console, final social preview retrieval and client approvals cannot be verified without the client inputs and deployed site. WebKit checks the browser engine; it does not replace testing real iOS Safari or every current/previous browser version. Automated audits do not certify complete WCAG conformance.

## Release procedure

1. Replace demo listings with client-approved names, photos, specifications, prices and availability.
2. Supply verified company contacts, domain, copy and approved logo/favicon; replace temporary photos or remove the unused installation concept. Set approvals and temporary flags only after review.
3. Run npm run validate:launch, lint and tests, then npm run build.
4. Run browser and performance checks against release output. Preview indexing exceptions must not remain in release output.
5. Deploy through the client-controlled hosting account; verify the final domain/DNS/HTTPS and run npm run qa:deployment. Complete real-device WhatsApp and live route/social checks.

No website was published during this work.
