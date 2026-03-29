# CRM Product Specification

## 1) Product goal
Build a CRM system that helps users import business contacts from CSV, normalize and map fields to standard CRM fields, visualize contacts on an interactive map, manage notes/tags/groups, and build beautiful HTML emails with a no-code drag-and-drop editor.

## 2) Core user stories

### Contact import and mapping
- As a user, I can upload a CSV file.
- As a user, I can map each CSV column to standard CRM fields.
- As a user, I can preview import results before finalizing.
- As a user, I can save mapping templates for future imports.

### Contact model and management
- As a user, I can view all contacts with full details.
- As a user, I can edit contact fields.
- As a user, I can add internal notes to each contact.
- As a user, I can assign one group per contact (with group color).
- As a user, I can assign multiple tags to contacts.

### Map visualization
- As a user, I can view contacts on an interactive map.
- As a user, I can zoom and pan to postal code regions.
- As a user, I can click pins/clusters to view contact summaries.
- As a user, I can filter map results by group, tag, and search terms.

### Email builder
- As a user, I can create HTML emails via drag-and-drop blocks.
- As a user, I can adjust default styling/settings for each block type.
- As a user, I can save templates and reuse them.
- As a user, I can preview responsive email output.

## 3) Standard CRM contact fields (minimum)

### Identity
- `business_name` (required for B2B mode)
- `contact_first_name`
- `contact_last_name`

### Communication
- `email`
- `telephone`
- `mobile_phone` (optional but recommended)
- `website` (optional)

### Address (structured)
- `street_name`
- `street_number`
- `postal_code`
- `city`
- `state_region` (optional)
- `country` (recommended)

### CRM metadata
- `group_id` (single group)
- `tags` (many)
- `notes` (timeline entries)
- `created_at`, `updated_at`
- `source` (import/manual/API)

## 4) Functional requirements

### 4.1 CSV import
- Accept UTF-8 CSV, with configurable delimiter (`,`, `;`, `\t`).
- Max upload size configurable (e.g., 25 MB initially).
- Detect header row automatically; allow manual override.
- Provide mapping UI with:
  - Required field validation.
  - Type hints (email, phone, postal code).
  - Transform rules (trim, title case, phone normalize).
- Duplicate detection options:
  - Exact email match.
  - Exact phone match.
  - Fuzzy match on business name + postal code.
- Import modes:
  - Insert new only.
  - Upsert by email/phone/external ID.

### 4.2 Map view
- Geocode contacts when address changes.
- Show clustered markers at low zoom.
- At higher zoom, show individual contact pins.
- Color markers by `group.color_hex`.
- Postal code search input with "zoom to postal code" behavior.
- Side panel list synchronized with map bounds.

### 4.3 Contact detail and editing
- Contact detail page with:
  - Profile summary.
  - Full address and geolocation metadata.
  - Tags, group badge, notes timeline.
- Inline edit for key fields.
- Add note with timestamp and author.

### 4.4 Tags and groups
- Groups:
  - Name + color.
  - One group per contact.
- Tags:
  - Name + optional color.
  - Many tags per contact.

### 4.5 Email builder
- Drag-and-drop blocks:
  - Text
  - Image
  - Button
  - Divider
  - Spacer
  - Columns
  - Header/footer
  - Social links
- Global defaults per block type:
  - Typography
  - Padding/margins
  - Colors
  - Border radius
- Template operations:
  - Save draft
  - Clone
  - Version history (optional for MVP)
- Export/render:
  - HTML output inlined for email clients.
  - Desktop/mobile preview.

## 5) Non-functional requirements
- Multi-tenant organization model.
- Role-based permissions (admin, editor, viewer).
- Audit log for imports and contact edits.
- Background job processing for import/geocoding/email rendering.
- P95 page load target < 2.5s for core views.
- GDPR-friendly design:
  - Consent/status fields.
  - Data export and delete workflow.

## 6) Suggested architecture

### Frontend
- SPA with route modules:
  - `/contacts`
  - `/contacts/:id`
  - `/imports`
  - `/map`
  - `/email-templates`
- State and data fetching with React Query.
- Map rendering with Mapbox GL JS or Leaflet + clustering plugin.

### Backend services
- API gateway (REST or GraphQL).
- Import service:
  - Parse CSV.
  - Validate + map.
  - Produce import report.
- Geocoding worker:
  - Address normalization.
  - Lat/lng enrichment.
- Email template service:
  - Persist block JSON model.
  - Render final HTML.

### Storage
- MongoDB for entities (with Mongoose models).
- Redis queue for async jobs.
- Object storage for file uploads/assets.

## 7) MVP screens
1. Login + workspace.
2. Contacts list with filters (tag/group/search).
3. Contact detail + notes timeline.
4. CSV import wizard (upload → map → validate → import report).
5. Map view with clusters and postal code zoom.
6. Email template builder + preview.

## 8) Delivery plan

### Phase 1 (2–4 weeks)
- Auth + tenant base.
- Contact CRUD + tags/groups/notes.
- CSV import wizard (without advanced fuzzy matching).

### Phase 2 (2–3 weeks)
- Geocoding pipeline.
- Interactive map + postal code zoom.
- Filter synchronization between map and list.

### Phase 3 (3–5 weeks)
- Drag-and-drop email builder.
- Block defaults + template save/clone/preview.
- HTML render hardening for email client compatibility.

## 9) Acceptance criteria snapshot
- User can import a CSV, map fields, and create contacts successfully.
- Imported contacts appear on map after geocoding.
- Map supports zoom/pan and postal code focus.
- User can edit contacts and add notes.
- Group color appears in map marker or pin styling.
- User can assign tags and filter by them.
- User can build and save an HTML email via drag-and-drop blocks.
