'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { contacts } from '@/lib/mock-data';
import postalCodes from '@/data/za-postal-codes.json';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function ZoomToPostalCode({ postalCode }: { postalCode: string }) {
  const map = useMap();

  useEffect(() => {
    const target = postalCodes.find((entry) => entry.postalCode === postalCode);
    if (target) {
      map.setView([target.lat, target.lng], 12, { animate: true });
    }
  }, [map, postalCode]);

  return null;
}

export function ContactsMap() {
  const [postalFilter, setPostalFilter] = useState('all');

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => postalFilter === 'all' || contact.postalCode === postalFilter),
    [postalFilter]
  );

  return (
    <div className="space-y-3">
      <div className="card flex flex-col gap-3 md:flex-row md:items-center">
        <label className="text-sm font-semibold">Zoom to South African postal code</label>
        <select className="input md:max-w-96" value={postalFilter} onChange={(event) => setPostalFilter(event.target.value)}>
          <option value="all">All South Africa (national view)</option>
          {postalCodes.map((entry) => (
            <option key={`${entry.postalCode}-${entry.place}`} value={entry.postalCode}>
              {entry.postalCode} · {entry.place} ({entry.province})
            </option>
          ))}
        </select>
      </div>

      <div className="card text-sm text-slate-600">
        Loaded postal codes: <strong>{postalCodes.length}</strong>. Select any postal code to zoom directly into that area.
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <MapContainer center={[-30.5595, 22.9375]} zoom={5} style={{ height: 520, width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {postalFilter !== 'all' && <ZoomToPostalCode postalCode={postalFilter} />}

          {filteredContacts.map((contact) => (
            <Marker key={contact.id} position={[contact.lat, contact.lng]} icon={icon}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">{contact.businessName}</p>
                  <p>{contact.email}</p>
                  <p>
                    {contact.postalCode} {contact.city}
                  </p>
                  <p>
                    Group: <span style={{ color: contact.groupColor }}>{contact.group}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
