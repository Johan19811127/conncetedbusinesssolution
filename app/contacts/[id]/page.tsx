'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { contacts } from '@/lib/mock-data';
import { ContactCommunicationTimeline } from '@/components/ContactCommunicationTimeline';

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const contact = useMemo(() => contacts.find((item) => item.id === id), [id]);

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<string[]>(contact?.notes ?? []);
  const [telephone, setTelephone] = useState(contact?.telephone ?? '');

  if (!contact) {
    return <p className="card">Contact not found.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="card lg:col-span-2">
        <h2 className="text-2xl font-bold">{contact.businessName}</h2>
        <p className="mt-1 text-slate-600">
          Contact: {contact.firstName} {contact.lastName}
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input className="input mt-1" value={contact.email} readOnly />
          </div>
          <div>
            <label className="text-sm font-semibold">Telephone (editable)</label>
            <input className="input mt-1" value={telephone} onChange={(event) => setTelephone(event.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Address</label>
            <input
              className="input mt-1"
              value={`${contact.streetNumber} ${contact.streetName}, ${contact.postalCode} ${contact.city}`}
              readOnly
            />
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <ContactCommunicationTimeline contactId={contact.id} />
        <section className="card">
          <h3 className="font-semibold">Tags</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {contact.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        <section className="card">
          <h3 className="font-semibold">Notes</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {notes.map((note, index) => (
              <li key={`${note}-${index}`} className="rounded-md bg-slate-50 p-2">
                {note}
              </li>
            ))}
          </ul>
          <textarea
            className="input mt-3"
            value={newNote}
            placeholder="Add a note"
            onChange={(event) => setNewNote(event.target.value)}
          />
          <button
            className="btn-primary mt-2 w-full"
            onClick={() => {
              if (!newNote.trim()) {
                return;
              }
              setNotes((current) => [`${new Date().toLocaleDateString()} - ${newNote.trim()}`, ...current]);
              setNewNote('');
            }}
          >
            Add note
          </button>
        </section>
      </aside>
    </div>
  );
}
