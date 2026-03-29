import { CommunicationHub } from '@/components/CommunicationHub';

export default function CommunicationsPage() {
  return (
    <div className="space-y-4">
      <section className="card">
        <h1 className="text-2xl font-bold">Communication Hub</h1>
        <p className="mt-1 text-sm text-slate-600">
          Connect your communication channels and keep a unified record of inbound and outbound contact communication.
        </p>
      </section>
      <CommunicationHub />
    </div>
  );
}
