import Link from 'next/link';

const cards = [
  {
    title: 'Import Contacts from CSV',
    description: 'Upload a CSV and map columns to standard CRM fields.',
    href: '/import'
  },
  {
    title: 'Manage Contacts',
    description: 'Edit contact details, notes, tags, and group assignments.',
    href: '/contacts'
  },
  {
    title: 'View Contacts on Map',
    description: 'South Africa map with zoom, markers, and postal-code filtering.',
    href: '/map'
  },
  {
    title: 'Build Beautiful Emails',
    description: 'Drag-and-drop builder for responsive HTML emails.',
    href: '/email-builder'
  },
  {
    title: 'Company Settings',
    description: 'Manage logo, company profile, and social links for email templates.',
    href: '/settings'
  },
  {
    title: 'Communication Hub',
    description: 'Connect email/SMS/phone/webforms and keep all contact communications.',
    href: '/communications'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-2xl font-bold">CRM MVP Prototype</h2>
        <p className="mt-2 text-slate-600">
          This is a working Next.js + Tailwind foundation for your CRM including contact import mapping,
          interactive map view, contact editing, notes, groups/tags, and a no-code email builder.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="card block hover:border-brand">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{card.description}</p>
            <p className="mt-3 text-sm font-medium text-brand">Open →</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
