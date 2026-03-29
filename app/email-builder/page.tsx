import { EmailBuilder } from '@/components/EmailBuilder';

export default function EmailBuilderPage() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h2 className="text-2xl font-bold">No-code HTML Email Builder</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add blocks, drag-and-drop to reorder, customize content, and preview responsive HTML.
        </p>
      </section>
      <EmailBuilder />
    </div>
  );
}
