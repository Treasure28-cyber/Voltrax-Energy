# 04 — Functional Requirements

Priority: **Must** means required for launch; **Should** means implement unless a technical conflict is documented.

## Navigation

| ID | Priority | Requirement |
|---|---|---|
| FR-01 | Must | The system shall provide Home and Products routes. |
| FR-02 | Must | The logo shall navigate to the Home route. |
| FR-03 | Must | Header links shall reach the correct route or home-page section. |
| FR-04 | Must | The mobile navigation shall open, close, trap no keyboard users, and close after a link is chosen. |
| FR-05 | Must | An invalid route shall display the custom not-found screen. |
| FR-06 | Should | Route changes shall move focus or scrolling to an appropriate starting position. |

## Catalogue

| ID | Priority | Requirement |
|---|---|---|
| FR-07 | Must | The system shall read product records from a local structured data file. |
| FR-08 | Must | The Products page shall display all valid products by default. |
| FR-09 | Must | Visitors shall be able to search by product name, category, brand and configured keywords. |
| FR-10 | Must | Search shall be case-insensitive and ignore surrounding whitespace. |
| FR-11 | Must | Visitors shall be able to filter products by one category at a time. |
| FR-12 | Must | Search and category filters shall operate together. |
| FR-13 | Must | Visitors shall be able to reset search and category filters. |
| FR-14 | Must | A no-results state shall appear when no product matches. |
| FR-15 | Should | Category links from Home shall open Products with that category active. |
| FR-16 | Must | Products marked as featured shall populate the Home featured section. |
| FR-17 | Must | Missing optional fields shall not break product rendering. |
| FR-18 | Must | A failed product image shall fall back to a local placeholder. |

## Product presentation

| ID | Priority | Requirement |
|---|---|---|
| FR-19 | Must | Every card shall display image, name, category, short description and an enquiry action. |
| FR-20 | Must | A price shall be formatted in Nigerian naira when a valid numeric price is supplied. |
| FR-21 | Must | When price is absent, the approved price label shall be displayed. |
| FR-22 | Must | Availability shall be communicated in visible text. |
| FR-23 | Must | Visitors shall be able to inspect extended description and specifications without leaving the two-page scope. |
| FR-24 | Must | The detail view shall close through its close control and Escape key. |
| FR-25 | Should | Closing a detail view shall return focus to the control that opened it. |

## Contact and conversion

| ID | Priority | Requirement |
|---|---|---|
| FR-26 | Must | A product enquiry shall open the configured WhatsApp number with the product name in a prefilled message. |
| FR-27 | Must | The general WhatsApp action shall open a general prefilled message. |
| FR-28 | Must | WhatsApp messages shall encode special characters safely. |
| FR-29 | Must | Telephone, email, social and map actions shall use the verified client details. |
| FR-30 | Must | If a contact value is not supplied, its public link shall be omitted rather than left broken. |

## Content and configuration

| ID | Priority | Requirement |
|---|---|---|
| FR-31 | Must | Business details shall be centralized in a site configuration module. |
| FR-32 | Must | Unknown business facts shall remain explicit placeholders during development. |
| FR-33 | Must | The copyright year shall update automatically. |
| FR-34 | Must | Client-approved products and content shall replace development samples before launch. |

## Analytics and errors

| ID | Priority | Requirement |
|---|---|---|
| FR-35 | Should | Analytics shall load only when a real measurement ID is configured. |
| FR-36 | Should | WhatsApp/product interactions shall expose meaningful event hooks for analytics. |
| FR-37 | Must | The production build shall not depend on development-only services. |

## Out of scope behavior

The system shall not accept payments, maintain carts, create accounts, save orders, expose an admin dashboard, or promise real-time stock. Availability and final price are confirmed through direct contact.

