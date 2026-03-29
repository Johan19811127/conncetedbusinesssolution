import { Contact } from '@/lib/types';

export const contacts: Contact[] = [
  {
    id: '1',
    businessName: 'Cape Trade Supplies',
    firstName: 'Olivia',
    lastName: 'Stone',
    email: 'olivia@capetrade.co.za',
    telephone: '+27 21 555 0101',
    streetName: 'Long Street',
    streetNumber: '120',
    postalCode: '8001',
    city: 'Cape Town',
    group: 'Customers',
    groupColor: '#059669',
    tags: ['retail', 'priority'],
    notes: ['Met at Cape Business Expo 2026', 'Interested in monthly newsletter'],
    lat: -33.9249,
    lng: 18.4241
  },
  {
    id: '2',
    businessName: 'Durban Fresh Foods',
    firstName: 'Lucas',
    lastName: 'Miller',
    email: 'lucas@durbanfresh.co.za',
    telephone: '+27 31 555 0122',
    streetName: 'West Street',
    streetNumber: '45',
    postalCode: '4001',
    city: 'Durban',
    group: 'Prospects',
    groupColor: '#2563eb',
    tags: ['food', 'kwazulu-natal'],
    notes: ['Requested product brochure'],
    lat: -29.8587,
    lng: 31.0218
  },
  {
    id: '3',
    businessName: 'Jozi Enterprise Consulting',
    firstName: 'Ava',
    lastName: 'Parker',
    email: 'ava@joziconsulting.co.za',
    telephone: '+27 11 555 0150',
    streetName: 'Main Street',
    streetNumber: '72',
    postalCode: '2000',
    city: 'Johannesburg',
    group: 'Partners',
    groupColor: '#f59e0b',
    tags: ['consulting', 'enterprise'],
    notes: ['Potential integration partner'],
    lat: -26.2041,
    lng: 28.0473
  }
];
