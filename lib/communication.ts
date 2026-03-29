export type CommunicationChannel = 'email' | 'sms' | 'whatsapp' | 'phone' | 'webform';

export type ChannelConnection = {
  id: string;
  channel: CommunicationChannel;
  accountLabel: string;
  identifier: string;
  connectedAt: string;
};

export type CommunicationRecord = {
  id: string;
  contactId: string;
  channel: CommunicationChannel;
  direction: 'inbound' | 'outbound';
  subject: string;
  message: string;
  from: string;
  to: string;
  createdAt: string;
};

export const communicationConnectionsKey = 'connected-crm-communication-connections';
export const communicationRecordsKey = 'connected-crm-communication-records';

export const sampleCommunicationRecords: CommunicationRecord[] = [
  {
    id: 'seed-1',
    contactId: '1',
    channel: 'email',
    direction: 'inbound',
    subject: 'Pricing request',
    message: 'Can you share your latest B2B pricing packages?',
    from: 'olivia@northwind.com',
    to: 'sales@yourcompany.com',
    createdAt: '2026-03-28T09:15:00.000Z'
  },
  {
    id: 'seed-2',
    contactId: '2',
    channel: 'phone',
    direction: 'outbound',
    subject: 'Follow-up call',
    message: 'Discussed onboarding timeline and next step meeting.',
    from: '+1 555 100 1000',
    to: '+1 415 555 0122',
    createdAt: '2026-03-27T15:05:00.000Z'
  }
];
