import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/import', label: 'CSV Import' },
  { href: '/map', label: 'Map' },
  { href: '/email-builder', label: 'Email Builder' },
  { href: '/settings', label: 'Settings' },
  { href: '/communications', label: 'Communications' }
];

export function NavBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-lg font-bold text-brand">Connected CRM</h1>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
