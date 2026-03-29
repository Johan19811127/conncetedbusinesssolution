export type Contact = {
  id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  group: 'Prospects' | 'Customers' | 'Partners';
  groupColor: string;
  tags: string[];
  notes: string[];
  lat: number;
  lng: number;
};

export type EmailBlockType = 'text' | 'image' | 'button' | 'divider';

export type EmailBlock = {
  id: string;
  type: EmailBlockType;
  content: string;
};
