# MongoDB Data Model (Mongoose)

This project now uses **MongoDB** as the primary database (instead of PostgreSQL).

## Collections overview

- `organizations`
- `users`
- `groups`
- `tags`
- `contacts`
- `contactnotes`
- `imports`
- `emailtemplates`

## Key model design choices

- Multi-tenant scoping is enforced through `organizationId` references.
- Contacts store structured address fields (`streetName`, `streetNumber`, `postalCode`, `city`, etc.).
- Contacts store `location` as GeoJSON Point for map/geospatial queries.
- Tags are many-to-many via `contact.tagIds` array of `ObjectId` references.
- Notes are stored in a separate `contactnotes` collection for efficient timeline growth.

## Geospatial index

`contacts.location` should use a `2dsphere` index:

```ts
ContactSchema.index({ location: '2dsphere' });
```

## Recommended additional indexes

- `contacts`: `{ organizationId: 1, email: 1 }`
- `contacts`: `{ organizationId: 1, telephone: 1 }`
- `contacts`: `{ organizationId: 1, postalCode: 1, city: 1 }`
- `groups`: `{ organizationId: 1, name: 1 }` unique
- `tags`: `{ organizationId: 1, name: 1 }` unique
- `users`: `{ organizationId: 1, email: 1 }` unique
- `imports`: `{ organizationId: 1, createdAt: -1 }`

## Example contact document

```json
{
  "_id": "664e20e55f8f2ff53f5c12d1",
  "organizationId": "664e1fd45f8f2ff53f5c1288",
  "groupId": "664e20275f8f2ff53f5c12af",
  "businessName": "Northwind Traders",
  "contactFirstName": "Olivia",
  "contactLastName": "Stone",
  "email": "olivia@northwind.com",
  "telephone": "+1 312 555 0101",
  "streetName": "W Lake St",
  "streetNumber": "210",
  "postalCode": "60606",
  "city": "Chicago",
  "country": "USA",
  "tagIds": ["664e204f5f8f2ff53f5c12be"],
  "location": {
    "type": "Point",
    "coordinates": [-87.6364, 41.8853]
  },
  "source": "import",
  "createdAt": "2026-03-29T10:00:00.000Z",
  "updatedAt": "2026-03-29T10:00:00.000Z"
}
```
