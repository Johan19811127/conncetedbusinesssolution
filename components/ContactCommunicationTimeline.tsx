'use client';

import { useEffect, useMemo, useState } from 'react';
import { CommunicationRecord, communicationRecordsKey, sampleCommunicationRecords } from '@/lib/communication';

export function ContactCommunicationTimeline({ contactId }: { contactId: string }) {
  const [records, setRecords] = useState<CommunicationRecord[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(communicationRecordsKey);
    if (!raw) {
      setRecords(sampleCommunicationRecords);
      return;
    }
    try {
      setRecords(JSON.parse(raw) as CommunicationRecord[]);
    } catch {
      setRecords(sampleCommunicationRecords);
    }
  }, []);

  const contactRecords = useMemo(
    () =>
      records
        .filter((record) => record.contactId === contactId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [contactId, records]
  );

  return (
    <section className="card">
      <h3 className="font-semibold">Communication Timeline</h3>
      {contactRecords.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">No communications logged yet for this contact.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {contactRecords.map((record) => (
            <li key={record.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold">
                [{record.channel}] {record.subject}
              </p>
              <p className="text-slate-600">
                {record.direction} · {new Date(record.createdAt).toLocaleString()}
              </p>
              <p className="mt-1 text-slate-700">{record.message}</p>
              {(record.from || record.to) && (
                <p className="mt-1 text-xs text-slate-500">
                  {record.from ? `From: ${record.from}` : ''} {record.to ? `To: ${record.to}` : ''}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
