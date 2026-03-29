'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  CompanySettings,
  companySettingsStorageKey,
  defaultCompanySettings
} from '@/lib/company-settings';

export function CompanySettingsForm() {
  const [settings, setSettings] = useState<CompanySettings>(defaultCompanySettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(companySettingsStorageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as CompanySettings;
      setSettings({ ...defaultCompanySettings, ...parsed });
    } catch {
      // ignore invalid local data
    }
  }, []);

  function save() {
    localStorage.setItem(companySettingsStorageKey, JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  function onLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSettings((current) => ({ ...current, logoUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="card lg:col-span-2 space-y-3">
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <p className="text-sm text-slate-600">
          Add your company identity details. These settings can be inserted directly into the HTML email builder.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">Company name</label>
            <input
              className="input mt-1"
              value={settings.companyName}
              onChange={(event) => setSettings((c) => ({ ...c, companyName: event.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Tagline</label>
            <input
              className="input mt-1"
              value={settings.tagline}
              onChange={(event) => setSettings((c) => ({ ...c, tagline: event.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Logo URL</label>
            <input
              className="input mt-1"
              value={settings.logoUrl}
              placeholder="https://example.com/logo.png"
              onChange={(event) => setSettings((c) => ({ ...c, logoUrl: event.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Or upload logo</label>
            <input className="input mt-1" type="file" accept="image/*" onChange={onLogoUpload} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Website</label>
            <input
              className="input mt-1"
              value={settings.websiteUrl}
              placeholder="https://example.com"
              onChange={(event) => setSettings((c) => ({ ...c, websiteUrl: event.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Facebook</label>
            <input
              className="input mt-1"
              value={settings.facebookUrl}
              onChange={(event) => setSettings((c) => ({ ...c, facebookUrl: event.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Instagram</label>
            <input
              className="input mt-1"
              value={settings.instagramUrl}
              onChange={(event) => setSettings((c) => ({ ...c, instagramUrl: event.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">LinkedIn</label>
            <input
              className="input mt-1"
              value={settings.linkedinUrl}
              onChange={(event) => setSettings((c) => ({ ...c, linkedinUrl: event.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">X / Twitter</label>
            <input
              className="input mt-1"
              value={settings.xUrl}
              onChange={(event) => setSettings((c) => ({ ...c, xUrl: event.target.value }))}
            />
          </div>
        </div>

        <button className="btn-primary" onClick={save}>
          Save settings
        </button>
        {saved && <p className="text-sm font-medium text-emerald-700">Saved successfully.</p>}
      </section>

      <aside className="card">
        <h3 className="font-semibold">Preview</h3>
        <div className="mt-3 space-y-2 text-sm">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Company logo preview" className="max-h-16 w-auto rounded" />
          ) : (
            <p className="text-slate-500">No logo yet.</p>
          )}
          <p className="font-semibold">{settings.companyName}</p>
          <p className="text-slate-600">{settings.tagline}</p>
          <div className="text-brand">
            {[settings.facebookUrl, settings.instagramUrl, settings.linkedinUrl, settings.xUrl]
              .filter(Boolean)
              .length > 0 ? (
              <p>Social links configured.</p>
            ) : (
              <p className="text-slate-500">No social links added.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
