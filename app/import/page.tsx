import { CsvImportMapper } from '@/components/CsvImportMapper';

export default function ImportPage() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h2 className="text-2xl font-bold">CSV Import & Field Mapping</h2>
        <p className="mt-2 text-sm text-slate-600">
          Upload a CSV file, map columns to CRM standard fields, and preview rows before import.
        </p>
      </section>
      <CsvImportMapper />
    </div>
  );
}
