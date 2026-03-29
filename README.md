# Connected Business Solution CRM

This repository now contains a complete product and technical blueprint for building a CRM focused on:

- CSV contact import with field mapping.
- Standard CRM contact data model (business, phone, email, structured address).
- Interactive South Africa map-based contact discovery by postal code and color-coded groups.
- Contact editing, full detail views, and timeline notes.
- Tagging and grouping for segmentation.
- No-code drag-and-drop HTML email builder with default block style controls.
- Linked communication channels (email/SMS/phone/webform) with contact communication timeline.

## Where to start

1. Read the product specification: `docs/crm-product-spec.md`
2. Implement the data model from: `docs/data-model.mongodb.md`
3. Use API contract draft in: `docs/api-contract.md`
4. Use default field mapping and email block settings in:
   - `config/csv-standard-fields.json`
   - `config/email-builder-defaults.json`

## Recommended MVP implementation order

1. Authentication + organization/workspace model.
2. Contact CRUD + notes/tags/groups.
3. CSV import wizard with mapping + validation.
4. Geocoding pipeline + interactive map UI.
5. Email template builder (drag-and-drop blocks + defaults).
6. Sending pipeline + basic campaign analytics.

## Suggested stack (example)

- **Frontend:** React + TypeScript + Tailwind + map library (Mapbox GL JS or Leaflet).
- **Backend:** Node.js (NestJS/Express/Fastify) + MongoDB (Mongoose) + Redis queue.
- **Storage:** S3-compatible storage for CSVs and email assets.
- **Editor:** GrapesJS or MJML-based block editor abstraction.
- **Geocoding:** Google Maps Geocoding API, Mapbox Geocoding API, or Nominatim.

