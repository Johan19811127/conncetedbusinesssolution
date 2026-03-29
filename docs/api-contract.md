# API Contract Draft (REST)

## Contacts

### `GET /api/contacts`
Query:
- `q`: text search
- `groupId`: filter by group
- `tags`: comma-separated tag IDs
- `postalCode`
- `page`, `pageSize`

### `POST /api/contacts`
Create a contact with standard fields.

### `GET /api/contacts/:id`
Return full contact detail including notes, tags, and group.

### `PATCH /api/contacts/:id`
Partial update of contact fields.

### `POST /api/contacts/:id/notes`
Add a note to a contact.

## Tags and groups

### `GET /api/groups`
### `POST /api/groups`
### `GET /api/tags`
### `POST /api/tags`

## CSV imports

### `POST /api/imports`
Upload CSV file and create import record.

### `POST /api/imports/:id/mapping`
Submit mapping JSON of CSV headers to standard fields.

### `POST /api/imports/:id/run`
Run import job.

### `GET /api/imports/:id/report`
Return summary and row-level failures.

## Map

### `GET /api/map/contacts`
Query:
- `bbox` (west,south,east,north)
- `zoom`
- `groupId`
- `tags`
- `postalCode`

Response:
- Cluster or marker payload (depending on zoom).

### `GET /api/map/postal-code/:postalCode`
Returns recommended viewport bounds for postal code.

## Email templates

### `GET /api/email-templates`
### `POST /api/email-templates`
### `GET /api/email-templates/:id`
### `PATCH /api/email-templates/:id`

### `POST /api/email-templates/:id/render`
Render block JSON to production email-safe HTML.
