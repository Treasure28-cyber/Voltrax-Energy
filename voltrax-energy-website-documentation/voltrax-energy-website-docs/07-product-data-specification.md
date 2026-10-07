# 07 — Product Data Specification

## Storage

Use `src/data/products.json` for catalogue records and `src/config/site.js` for business/contact configuration. No runtime database is required.

## Product schema

```json
{
  "id": "inverter-001",
  "name": "5KVA Hybrid Inverter",
  "slug": "5kva-hybrid-inverter",
  "category": "Inverters",
  "brand": "",
  "price": null,
  "priceLabel": "Contact for price",
  "currency": "NGN",
  "image": "/images/products/5kva-hybrid-inverter.webp",
  "imageAlt": "Front view of a 5KVA hybrid inverter",
  "shortDescription": "Short client-approved summary.",
  "description": "Longer client-approved product description.",
  "specifications": [
    { "label": "Capacity", "value": "5KVA" }
  ],
  "available": null,
  "featured": true,
  "keywords": ["inverter", "5kva", "hybrid", "solar"]
}
```

## Field rules

| Field | Type | Required | Rule |
|---|---|---:|---|
| `id` | string | Yes | Stable, unique identifier |
| `name` | string | Yes | Client-approved public name |
| `slug` | string | Yes | Unique lowercase hyphenated value; used for tracking/data references, not a public third route |
| `category` | string | Yes | Must match an approved category exactly |
| `brand` | string | No | Omit visually when empty |
| `price` | number/null | Yes | Numeric NGN amount or `null`; never store formatted commas |
| `priceLabel` | string | Yes when price is null | Normally “Contact for price” |
| `currency` | string | Yes | `NGN` at launch |
| `image` | string | Yes | Local optimized asset path |
| `imageAlt` | string | Yes | Describe the specific product image |
| `shortDescription` | string | Yes | Preferably under 160 characters |
| `description` | string | No | Extended, verified description |
| `specifications` | array | No | Verified label/value pairs |
| `available` | boolean/null | Yes | `true`, `false`, or `null` for confirm availability |
| `featured` | boolean | Yes | Controls Home placement |
| `keywords` | string[] | Yes | Useful synonyms; no keyword stuffing |

## Approved initial categories

These values are provisional and must be aligned with the actual catalogue:

- Solar Panels
- Inverters
- Lithium Batteries
- CCTV Systems
- Charge Controllers
- Electrical Appliances

## Validation behavior

- Duplicate `id` or `slug` values are invalid.
- Empty required strings are invalid.
- Negative prices are invalid.
- Unknown categories should be reported during development.
- Missing optional values must not render labels with blank content.
- An invalid individual record should be surfaced during development and must not silently become a false public claim.

## Price formatting

When `price` is numeric, use `Intl.NumberFormat` with Nigerian currency formatting. When it is `null`, display `priceLabel`.

## Availability mapping

| Value | Public label |
|---|---|
| `true` | Available |
| `false` | Currently unavailable |
| `null` | Confirm availability |

Do not enable a normal “Order” action for a confirmed unavailable product. A general “Ask about alternatives” action is acceptable.

## WhatsApp message builder

Create messages from data rather than hard-coded product-specific strings.

Suggested template:

```text
Hello Voltrax Energy, I am interested in [PRODUCT NAME] displayed on your website. Please confirm the current price and availability.
```

Use `encodeURIComponent` and a configured phone number containing digits only with country code, for example `234...`.

## Safe sample-data rule

Sample products may be used during layout development, but every sample must be visibly marked as demo content in source and must be removed or replaced before production launch.

## Product update procedure

1. Optimize and add the product image.
2. Add or edit the JSON record.
3. Validate IDs, categories and required fields.
4. Run linting and tests.
5. Run a production build.
6. Preview search, filter, details and WhatsApp output.
7. Commit and deploy the approved change.

