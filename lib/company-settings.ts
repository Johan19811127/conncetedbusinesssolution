export type CompanySettings = {
  companyName: string;
  tagline: string;
  logoUrl: string;
  websiteUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  xUrl: string;
};

export const defaultCompanySettings: CompanySettings = {
  companyName: 'Your Company Name',
  tagline: 'Helping customers grow every day.',
  logoUrl: '',
  websiteUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  xUrl: ''
};

export const companySettingsStorageKey = 'connected-crm-company-settings';
