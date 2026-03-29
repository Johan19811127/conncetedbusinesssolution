import { ContactsMap } from '@/components/ContactsMap';

export default function MapPage() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h2 className="text-2xl font-bold">Interactive South Africa Contacts Map</h2>
        <p className="mt-2 text-sm text-slate-600">
          View contacts across South Africa, choose any loaded South African postal code, and zoom directly to that area.
        </p>
      </section>
      <ContactsMap />
    </div>
  );
}
