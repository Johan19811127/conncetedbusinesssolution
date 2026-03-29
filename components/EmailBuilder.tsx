'use client';

import { useEffect, useMemo, useState } from 'react';
import defaults from '@/config/email-builder-defaults.json';
import {
  CompanySettings,
  companySettingsStorageKey,
  defaultCompanySettings
} from '@/lib/company-settings';
import { EmailBlock, EmailBlockType } from '@/lib/types';

const makeBlock = (type: EmailBlockType): EmailBlock => ({
  id: crypto.randomUUID(),
  type,
  content:
    type === 'text'
      ? 'Add your message here...'
      : type === 'button'
        ? 'Call To Action'
        : type === 'image'
          ? 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop'
          : ''
});

function buildCompanyFooter(settings: CompanySettings): string {
  const socialLinks = [
    { label: 'Facebook', href: settings.facebookUrl },
    { label: 'Instagram', href: settings.instagramUrl },
    { label: 'LinkedIn', href: settings.linkedinUrl },
    { label: 'X', href: settings.xUrl }
  ].filter((entry) => entry.href);

  const socialHtml = socialLinks.length
    ? `<p style="margin:6px 0 0 0;">${socialLinks
        .map((entry) => `<a href="${entry.href}" style="margin-right:10px;color:#2563eb;text-decoration:none;">${entry.label}</a>`)
        .join('')}</p>`
    : '';

  const logoHtml = settings.logoUrl
    ? `<img src="${settings.logoUrl}" alt="${settings.companyName} logo" style="max-height:52px;width:auto;display:block;margin:0 auto 8px auto;" />`
    : '';

  const websiteHtml = settings.websiteUrl
    ? `<p style="margin:6px 0 0 0;"><a href="${settings.websiteUrl}" style="color:#2563eb;text-decoration:none;">${settings.websiteUrl}</a></p>`
    : '';

  return `<div style="padding:16px;text-align:center;background:#f8fafc;border-top:1px solid #e5e7eb;font-family:${defaults.global.fontFamily};color:#334155;">${logoHtml}<p style="margin:0;font-weight:700;">${settings.companyName}</p><p style="margin:6px 0 0 0;">${settings.tagline}</p>${websiteHtml}${socialHtml}</div>`;
}

export function EmailBuilder() {
  const [blocks, setBlocks] = useState<EmailBlock[]>([makeBlock('text'), makeBlock('button')]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(defaultCompanySettings);
  const [includeCompanyFooter, setIncludeCompanyFooter] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(companySettingsStorageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as CompanySettings;
      setCompanySettings({ ...defaultCompanySettings, ...parsed });
    } catch {
      // ignore invalid local storage values
    }
  }, []);

  const previewHtml = useMemo(() => {
    const blockHtml = blocks
      .map((block) => {
        if (block.type === 'text') {
          return `<p style=\"font-family:${defaults.global.fontFamily};font-size:${defaults.blocks.text.fontSize}px;color:${defaults.global.textColor};padding:${defaults.blocks.text.padding};\">${block.content}</p>`;
        }
        if (block.type === 'button') {
          return `<div style=\"padding:12px 16px;\"><a href=\"#\" style=\"display:inline-block;padding:${defaults.blocks.button.padding};background:${defaults.blocks.button.backgroundColor};color:${defaults.blocks.button.textColor};border-radius:${defaults.blocks.button.borderRadius}px;text-decoration:none;\">${block.content}</a></div>`;
        }
        if (block.type === 'image') {
          return `<div style=\"padding:${defaults.blocks.image.padding};text-align:center;\"><img src=\"${block.content}\" style=\"max-width:100%;border-radius:${defaults.blocks.image.borderRadius}px;\" alt=\"Email block image\" /></div>`;
        }
        return `<hr style=\"border:none;border-top:${defaults.blocks.divider.thickness}px solid ${defaults.blocks.divider.color};margin:8px 0;\" />`;
      })
      .join('');

    return includeCompanyFooter ? `${blockHtml}${buildCompanyFooter(companySettings)}` : blockHtml;
  }, [blocks, companySettings, includeCompanyFooter]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card space-y-3">
        <h3 className="text-lg font-semibold">Drag-and-drop block editor</h3>

        <div className="flex flex-wrap gap-2">
          {(['text', 'image', 'button', 'divider'] as EmailBlockType[]).map((type) => (
            <button key={type} className="btn-muted" onClick={() => setBlocks((current) => [...current, makeBlock(type)])}>
              + {type}
            </button>
          ))}
          <button className="btn-primary" onClick={() => setIncludeCompanyFooter(true)}>
            Insert Company Details
          </button>
          {includeCompanyFooter && (
            <button className="btn-muted" onClick={() => setIncludeCompanyFooter(false)}>
              Remove Company Details
            </button>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Company details come from <strong>Settings</strong> page (logo + social links).
        </p>

        <div className="space-y-2">
          {blocks.map((block, index) => (
            <article
              key={block.id}
              draggable
              onDragStart={() => setDraggingId(block.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggingId || draggingId === block.id) return;
                setBlocks((current) => {
                  const fromIndex = current.findIndex((item) => item.id === draggingId);
                  const toIndex = current.findIndex((item) => item.id === block.id);
                  if (fromIndex < 0 || toIndex < 0) return current;
                  const copy = [...current];
                  const [moved] = copy.splice(fromIndex, 1);
                  copy.splice(toIndex, 0, moved);
                  return copy;
                });
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {index + 1}. {block.type}
              </p>
              {block.type !== 'divider' && (
                <textarea
                  className="input mt-2"
                  value={block.content}
                  onChange={(event) => {
                    const value = event.target.value;
                    setBlocks((current) =>
                      current.map((item) => (item.id === block.id ? { ...item, content: value } : item))
                    );
                  }}
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="card space-y-3">
        <h3 className="text-lg font-semibold">Live HTML preview</h3>
        <div className="rounded-lg border border-slate-200 bg-white p-2">
          <iframe
            title="Email preview"
            className="h-[500px] w-full"
            srcDoc={`<html><body style=\"margin:0;background:${defaults.global.backgroundColor};\"><div style=\"margin:0 auto;max-width:${defaults.global.contentWidth}px;\">${previewHtml}</div></body></html>`}
          />
        </div>
      </section>
    </div>
  );
}
