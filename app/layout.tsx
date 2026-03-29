import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Connected CRM',
  description: 'CRM with CSV import, contact map and drag-and-drop email builder.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
