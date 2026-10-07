# 06 — UI/UX Design System

## Design intent

Create a custom, free-to-implement visual direction that feels clean, dependable, modern and appropriate for an energy/electrical company. The design should feel purposeful rather than like a generic dashboard or crowded marketplace.

Codex may improve the proposed composition, but it must preserve the principles, accessibility requirements and two-page scope below.

## Experience principles

1. **Clarity:** Say what the company supplies immediately.
2. **Visibility:** Keep products, categories and enquiry actions easy to find.
3. **Consistency:** Reuse the same visual language for cards, buttons, spacing and feedback.
4. **Efficiency:** Make product discovery and WhatsApp enquiry fast.
5. **Trust:** Use restrained styling, verified content and strong information hierarchy.
6. **Mobile first:** Prioritize one-handed use and slow/mobile network conditions.

## Proposed colour tokens

These are the starting design tokens and may be refined before implementation if contrast remains compliant.

| Token | Value | Use |
|---|---|---|
| Navy 950 | `#071A2B` | Dark hero/footer surfaces |
| Navy 900 | `#0B243D` | Main brand surface |
| Blue 600 | `#0878D1` | Primary actions and links |
| Blue 700 | `#0565B3` | Hover/pressed state |
| Solar 400 | `#F7C843` | Limited highlight/accent |
| White | `#FFFFFF` | Main background/cards |
| Slate 50 | `#F6F8FA` | Alternate sections |
| Slate 200 | `#DDE4EA` | Borders/dividers |
| Slate 600 | `#526273` | Secondary text |
| Slate 900 | `#15212D` | Primary text |
| Success | `#177245` | Available status |
| Muted status | `#6B7280` | Contact/check status |

Do not use solar yellow for body text on white. Do not communicate availability through colour alone.

## Typography

- Primary family: Manrope, with a system sans-serif fallback stack.
- Use locally hosted files where practical, or load responsibly with a performant fallback.
- Body base: 16 px minimum.
- Body line height: approximately 1.6.
- Headings: bold, compact line height, strong hierarchy.
- Avoid excessive uppercase paragraphs and ultra-light font weights.

Suggested fluid scale:

- Hero: `clamp(2.25rem, 6vw, 4.75rem)`
- H1 interior: `clamp(2rem, 4vw, 3.5rem)`
- H2: `clamp(1.65rem, 3vw, 2.5rem)`
- H3/card title: `1.125rem–1.35rem`
- Body: `1rem`
- Supporting text: `0.875rem–0.95rem`

## Layout

- Content maximum width: approximately 1200–1280 px.
- Mobile horizontal padding: 16–20 px.
- Desktop horizontal padding: 32–48 px.
- Use a consistent 4/8 px spacing rhythm.
- Section padding should be generous but not wasteful, typically 64–96 px desktop and 48–64 px mobile.
- Avoid more than two competing calls to action in one section.

## Components

### Buttons

- Primary: blue background, white text.
- Secondary: transparent or white with a clear navy/blue border.
- WhatsApp: use a recognizable WhatsApp treatment while keeping it compatible with the overall palette.
- Provide default, hover, active, focus-visible and disabled states.
- Use concise action labels; avoid “Click Here.”

### Product cards

- Consistent image ratio and reserved image space.
- Subtle border and/or shadow; avoid heavy floating effects.
- Clear category eyebrow, product name and short description.
- Price or contact label should be easy to scan.
- Primary action must remain visible.
- Hover enhancement must not be required to understand the card.

### Category controls

- Use horizontally scrollable chips on narrow screens if needed.
- Clearly distinguish the selected category.
- Preserve keyboard operability and visible focus.

### Search

- Visible search icon and clear placeholder.
- Accessible label, not placeholder-only semantics.
- Clear button appears when text is present.
- Do not trigger a network request; filtering is local.

### Detail modal/drawer

- Desktop: centred modal or side drawer.
- Mobile: bottom sheet or full-height dialog where appropriate.
- Prevent background interaction while open.
- Keep close and WhatsApp actions obvious.

## Imagery and decoration

- Prefer authentic product imagery.
- Use subtle geometric/energy motifs as supporting decoration, not as content competitors.
- Avoid unrelated skyscraper, handshake and generic call-centre stock images.
- Avoid permanent animated gradients, particles and carousels.
- Motion should be brief, meaningful and reduced when the user requests reduced motion.

## UX writing

- Use plain, confident English.
- Do not overpromise.
- Explain that price and availability are confirmed through WhatsApp where appropriate.
- Empty-state example: “No products match your search. Try another name or clear the filters.”
- Availability labels: “Available,” “Currently unavailable,” or “Confirm availability.”

## UI proposal requirement for Codex

Before writing the final interface, Codex should establish:

- Page hierarchy
- Component map
- Responsive behavior
- Final token list
- Any deviations from this proposal and the reason

It may then implement directly. A paid template, copied competitor layout or large UI kit is not required.

