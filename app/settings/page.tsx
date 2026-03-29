import { CompanySettingsForm } from '@/components/CompanySettingsForm';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage your company details, branding, and social links for reuse in email templates.
        </p>
      </section>

      <CompanySettingsForm />
    </div>
  );
}
