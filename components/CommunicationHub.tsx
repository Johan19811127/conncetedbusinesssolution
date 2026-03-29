'use client';

import { useEffect, useMemo, useState } from 'react';
import { contacts } from '@/lib/mock-data';
import {
  ChannelConnection,
  CommunicationChannel,
  CommunicationRecord,
  communicationConnectionsKey,
  communicationRecordsKey,
  sampleCommunicationRecords
} from '@/lib/communication';

const channelOptions: CommunicationChannel[] = ['email', 'sms', 'whatsapp', 'phone', 'webform'];

const defaultConnectionForm = {
  channel: 'email' as CommunicationChannel,
  accountLabel: '',
  identifier: ''
};

const defaultRecordForm = {
  contactId: contacts[0]?.id ?? '',
  channel: 'email' as CommunicationChannel,
  direction: 'inbound' as 'inbound' | 'outbound',
  subject: '',
  message: '',
  from: '',
  to: ''
};

export function CommunicationHub() {
  const [connections, setConnections] = useState<ChannelConnection[]>([]);
  const [records, setRecords] = useState<CommunicationRecord[]>([]);
  const [connectionForm, setConnectionForm] = useState(defaultConnectionForm);
  const [recordForm, setRecordForm] = useState(defaultRecordForm);

  useEffect(() => {
    const rawConnections = localStorage.getItem(communicationConnectionsKey);
    const rawRecords = localStorage.getItem(communicationRecordsKey);

    if (rawConnections) {
      try {
        setConnections(JSON.parse(rawConnections) as ChannelConnection[]);
      } catch {
        setConnections([]);
      }
    }

    if (rawRecords) {
      try {
        setRecords(JSON.parse(rawRecords) as CommunicationRecord[]);
      } catch {
        setRecords(sampleCommunicationRecords);
      }
    } else {
      setRecords(sampleCommunicationRecords);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(communicationConnectionsKey, JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem(communicationRecordsKey, JSON.stringify(records));
  }, [records]);

  const stats = useMemo(
    () => ({
      totalRecords: records.length,
      inbound: records.filter((record) => record.direction === 'inbound').length,
      outbound: records.filter((record) => record.direction === 'outbound').length
    }),
    [records]
  );

  function addConnection() {
    if (!connectionForm.accountLabel.trim() || !connectionForm.identifier.trim()) return;
    setConnections((current) => [
      {
        id: crypto.randomUUID(),
        channel: connectionForm.channel,
        accountLabel: connectionForm.accountLabel.trim(),
        identifier: connectionForm.identifier.trim(),
        connectedAt: new Date().toISOString()
      },
      ...current
    ]);
    setConnectionForm(defaultConnectionForm);
  }

  function addRecord() {
    if (!recordForm.contactId || !recordForm.subject.trim() || !recordForm.message.trim()) return;
    setRecords((current) => [
      {
        id: crypto.randomUUID(),
        contactId: recordForm.contactId,
        channel: recordForm.channel,
        direction: recordForm.direction,
        subject: recordForm.subject.trim(),
        message: recordForm.message.trim(),
        from: recordForm.from.trim(),
        to: recordForm.to.trim(),
        createdAt: new Date().toISOString()
      },
      ...current
    ]);
    setRecordForm((current) => ({ ...current, subject: '', message: '', from: '', to: '' }));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <h2 className="text-xl font-bold">Connect Communication Channels</h2>
          <p className="mt-1 text-sm text-slate-600">
            Link email inboxes, SMS/WhatsApp lines, phone systems, or webforms. All inbound and outbound messages can
            then be recorded against contacts.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <select
              className="input"
              value={connectionForm.channel}
              onChange={(event) => setConnectionForm((c) => ({ ...c, channel: event.target.value as CommunicationChannel }))}
            >
              {channelOptions.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>

            <input
              className="input"
              placeholder="Account label (e.g. Sales Inbox)"
              value={connectionForm.accountLabel}
              onChange={(event) => setConnectionForm((c) => ({ ...c, accountLabel: event.target.value }))}
            />

            <input
              className="input"
              placeholder="Email/number/webhook"
              value={connectionForm.identifier}
              onChange={(event) => setConnectionForm((c) => ({ ...c, identifier: event.target.value }))}
            />
          </div>

          <button className="btn-primary mt-3" onClick={addConnection}>
            Link channel
          </button>
        </section>

        <aside className="card">
          <h3 className="font-semibold">Communication Stats</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Total records: {stats.totalRecords}</li>
            <li>Inbound: {stats.inbound}</li>
            <li>Outbound: {stats.outbound}</li>
            <li>Connected channels: {connections.length}</li>
          </ul>
        </aside>
      </div>

      <section className="card">
        <h3 className="text-lg font-semibold">Connected Channels</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {connections.length === 0 ? (
            <p className="text-sm text-slate-500">No channels linked yet.</p>
          ) : (
            connections.map((connection) => (
              <article key={connection.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="font-semibold capitalize">{connection.channel}</p>
                <p>{connection.accountLabel}</p>
                <p className="text-slate-600">{connection.identifier}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="card space-y-3">
        <h3 className="text-lg font-semibold">Log Communication Record</h3>

        <div className="grid gap-3 md:grid-cols-3">
          <select
            className="input"
            value={recordForm.contactId}
            onChange={(event) => setRecordForm((current) => ({ ...current, contactId: event.target.value }))}
          >
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.businessName}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={recordForm.channel}
            onChange={(event) => setRecordForm((current) => ({ ...current, channel: event.target.value as CommunicationChannel }))}
          >
            {channelOptions.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={recordForm.direction}
            onChange={(event) =>
              setRecordForm((current) => ({ ...current, direction: event.target.value as 'inbound' | 'outbound' }))
            }
          >
            <option value="inbound">inbound</option>
            <option value="outbound">outbound</option>
          </select>
        </div>

        <input
          className="input"
          placeholder="Subject"
          value={recordForm.subject}
          onChange={(event) => setRecordForm((current) => ({ ...current, subject: event.target.value }))}
        />

        <textarea
          className="input"
          placeholder="Message"
          value={recordForm.message}
          onChange={(event) => setRecordForm((current) => ({ ...current, message: event.target.value }))}
        />

        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="input"
            placeholder="From"
            value={recordForm.from}
            onChange={(event) => setRecordForm((current) => ({ ...current, from: event.target.value }))}
          />
          <input
            className="input"
            placeholder="To"
            value={recordForm.to}
            onChange={(event) => setRecordForm((current) => ({ ...current, to: event.target.value }))}
          />
        </div>

        <button className="btn-primary" onClick={addRecord}>
          Save communication
        </button>
      </section>
    </div>
  );
}
