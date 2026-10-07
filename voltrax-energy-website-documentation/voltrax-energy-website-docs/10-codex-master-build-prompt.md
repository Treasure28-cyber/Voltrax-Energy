# 10 — Codex Master Build Prompt

Copy the prompt below into Codex after placing this documentation folder inside the project workspace.

---

## Prompt

You are the lead product designer and frontend engineer for the Voltrax Energy Nigeria Limited website.

Your goal is to design, implement, test and prepare for deployment a clean, professional and responsive two-page product-catalogue website. It must help visitors understand the company, discover solar/electrical/security products, and start a product-specific WhatsApp enquiry quickly.

### Source of truth

Before making changes, read these files completely and in order:

1. `README.md`
2. `01-project-brief.md`
3. `02-content-and-assets.md`
4. `03-sitemap-and-screen-specification.md`
5. `04-functional-requirements.md`
6. `05-non-functional-requirements.md`
7. `06-ui-ux-design-system.md`
8. `07-product-data-specification.md`
9. `08-seo-analytics-and-deployment.md`
10. `09-acceptance-test-plan.md`

Treat explicit requirements and scope exclusions as authoritative. Do not silently expand the product into an e-commerce system.

### Technical baseline

Use:

- React with Vite
- React Router
- Tailwind CSS
- Lucide React icons
- Local JSON catalogue data
- A centralized site configuration module
- Static deployment compatible with Netlify

Use current stable versions that are mutually compatible. If the repository already exists, inspect it first and preserve working user code unless a change is necessary. Check for and obey any `AGENTS.md` instructions.

Do not add:

- Backend or database
- CMS or admin dashboard
- Authentication
- Shopping cart, checkout or payment
- Individual product routes
- Large component/UI framework
- Unnecessary animation library
- Unverified business claims or fake production content

### Working method

1. Inspect the repository, available assets and existing configuration.
2. Briefly state implementation assumptions and identify blocking inputs. Do not block on content that can safely use a clearly labelled development placeholder.
3. Propose a concise UI direction from the supplied design system: page hierarchy, component map, responsive behavior and finalized tokens. The UI must be original and free to implement; do not copy a paid template or a competitor.
4. Create an implementation plan and then execute it. Do not stop after planning.
5. Build both public routes and the custom not-found experience.
6. Implement catalogue search, category filtering, combined filter behavior, product details, price/status formatting, image fallback and WhatsApp message generation.
7. Centralize replaceable company details and product content.
8. Implement responsive, accessible states including mobile navigation, keyboard operation, focus-visible styles, reduced motion and accessible product details.
9. Add route-appropriate metadata, crawl files and verified-fact-only structured data support.
10. Add focused tests for business-critical logic.
11. Run linting, tests and a production build. Fix issues caused by your changes.
12. Inspect the final pages at the documented responsive checkpoints. Correct overflow, weak hierarchy, obstructed controls and inconsistent spacing.
13. Update the code repository README with setup, scripts, product editing, configuration, deployment and limitation guidance.

### Content policy

- Do not invent an address, phone number, email, price, warranty, certification, partnership, testimonial, number of customers or years of experience.
- Put unknown business values in one configuration location with explicit `[CLIENT TO PROVIDE: ...]` markers during development.
- Use demo product records only to exercise the UI, mark them clearly in source, and create a launch check preventing accidental production publication.
- Do not use competitor images or copyrighted assets without permission.

### Design expectations

The experience should be clean, premium but approachable, product-led and suited to an energy company. Use navy and white as the foundation, electric blue for primary actions and solar yellow only as a restrained accent. Use Manrope or a justified equivalent with a system fallback.

Avoid visual clutter, generic stock-business imagery, oversized empty sections, excessive gradients, glassmorphism everywhere, continuous animation and tiny low-contrast text. Customers should see what the company sells and how to enquire without searching for the next action.

### Completion requirements

Continue until:

- All Must functional requirements are implemented.
- Relevant acceptance tests pass.
- `npm run lint`, `npm run test` and `npm run build` succeed.
- Home, Products and invalid routes work on direct navigation and refresh.
- The interface has no unintended horizontal overflow at the specified viewports.
- WhatsApp links contain the correct configured number and encoded product name.
- There are no production console errors, broken links or missing required assets.
- Placeholder and demo content are clearly reported and cannot be mistaken for client-approved production facts.

### Final report

At completion, report:

1. What was built
2. Key design decisions
3. Files or major modules added/changed
4. Commands run and their results
5. Remaining client-supplied content
6. Deployment steps
7. Any documented limitations

Do not claim completion if a required check failed. State the exact blocker and leave the repository in the safest working state possible.

---

## Optional phased prompts

Use these only if you prefer to supervise the build in stages instead of using the master prompt alone.

### Phase 1 — Audit and UI proposal

```text
Read every Markdown specification in the Voltrax Energy documentation folder. Inspect the repository and assets. Produce a concise gap report, component/page map, responsive UI proposal and implementation plan. Respect the two-page scope and flag only truly blocking missing inputs. Do not invent business facts.
```

### Phase 2 — Foundation and Home

```text
Using the approved specifications and UI proposal, configure the React/Vite/Tailwind foundation, routing, design tokens, reusable layout components and centralized site configuration. Implement the complete responsive Home page. Use clearly marked placeholders only where client data is missing. Run linting and relevant tests before reporting progress.
```

### Phase 3 — Products and enquiry flow

```text
Implement the Products page from the supplied schema: local JSON loading, search, category filtering, combined filtering, reset/empty states, product cards, accessible detail view, price and availability rules, image fallback, category deep links and product-specific WhatsApp messages. Add focused tests for filter logic, formatting and message generation.
```

### Phase 4 — Quality, SEO and deployment

```text
Complete accessibility, responsive QA, technical SEO, metadata, structured-data safeguards, robots.txt, sitemap.xml, not-found handling and Netlify-compatible route configuration. Run lint, tests and production build; inspect documented viewport sizes; fix regressions. Update the repository README and return a final handover report containing unresolved client inputs and exact deployment steps.
```

