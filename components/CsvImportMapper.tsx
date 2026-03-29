'use client';

import { useMemo, useState } from 'react';
import csvFields from '@/config/csv-standard-fields.json';

type Mapping = Record<string, string>;

function parseCsv(raw: string): string[][] {
  return raw
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((item) => item.trim()));
}

export function CsvImportMapper() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rowsPreview, setRowsPreview] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Mapping>({});

  const mappedCount = useMemo(() => Object.values(mapping).filter(Boolean).length, [mapping]);

  return (
    <div className="space-y-4">
      <div className="card">
        <label className="text-sm font-semibold">Upload CSV</label>
        <input
          type="file"
          accept=".csv,text/csv"
          className="input mt-2"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            const parsed = parseCsv(text);
            setHeaders(parsed[0] ?? []);
            setRowsPreview(parsed.slice(1, 4));
          }}
        />
      </div>

      {headers.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="card">
            <h3 className="font-semibold">Map CSV columns to CRM fields</h3>
            <p className="mt-1 text-sm text-slate-600">
              Mapped {mappedCount} / {headers.length} columns.
            </p>
            <div className="mt-3 space-y-2">
              {headers.map((header) => (
                <div key={header} className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-slate-50 p-2 text-sm">{header}</div>
                  <select
                    className="input"
                    value={mapping[header] ?? ''}
                    onChange={(event) => setMapping((curr) => ({ ...curr, [header]: event.target.value }))}
                  >
                    <option value="">Ignore column</option>
                    {csvFields.fields.map((field) => (
                      <option key={field.key} value={field.key}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="font-semibold">Preview rows</h3>
            <div className="mt-3 overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="border-b border-slate-200 px-2 py-2 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsPreview.map((row, idx) => (
                    <tr key={`r-${idx}`}>
                      {row.map((cell, cellIdx) => (
                        <td key={`c-${idx}-${cellIdx}`} className="border-b border-slate-100 px-2 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
