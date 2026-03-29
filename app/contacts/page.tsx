'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { contacts } from '@/lib/mock-data';

export default function ContactsPage() {
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');

  const allTags = useMemo(() => Array.from(new Set(contacts.flatMap((c) => c.tags))), []);

  const filtered = contacts.filter((contact) => {
    const matchesQuery =
      contact.businessName.toLowerCase().includes(query.toLowerCase()) ||
      contact.city.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase());

    const matchesTag = tagFilter === 'all' || contact.tags.includes(tagFilter);

    return matchesQuery && matchesTag;
  });

  return (
    <div className="space-y-4">
      <div className="card flex flex-col gap-3 md:flex-row">
        <input
          className="input"
          placeholder="Search business, city, or email"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="input md:max-w-56" value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
          <option value="all">All tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((contact) => (
          <article key={contact.id} className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{contact.businessName}</h3>
                <p className="text-sm text-slate-600">
                  {contact.firstName} {contact.lastName} · {contact.email}
                </p>
                <p className="text-sm text-slate-600">
                  {contact.streetNumber} {contact.streetName}, {contact.postalCode} {contact.city}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: contact.groupColor }}
                >
                  {contact.group}
                </span>
                <Link href={`/contacts/${contact.id}`} className="btn-primary">
                  View & Edit
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
