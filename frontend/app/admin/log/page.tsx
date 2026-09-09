'use client';

import React from 'react';
import { Activity, ShieldCheck, User } from 'lucide-react';

export default function AdminLogPage() {
  const logs = [
    { id: 'log-1', action: 'CREATE_RESERVATION', desc: 'Member Alexander Wright membuat reservasi SSB-20260908-881', time: '10 min lalu', ip: '182.253.12.4' },
    { id: 'log-2', action: 'APPROVE_RESERVATION', desc: 'Admin menyetujui reservasi SSB-20260908-881', time: '5 min lalu', ip: '180.252.88.1' },
    { id: 'log-3', action: 'CHECK_IN', desc: 'QR Scanner berhasil memverifikasi check-in Ruang 101', time: 'Baru saja', ip: '127.0.0.1' },
  ];

  return (
    <div className="admin-log-root">
      <div className="page-header">
        <h1 className="font-serif page-title">Log Aktivitas & Audit Trail</h1>
        <p className="page-desc">Catatan riwayat aksi pengguna, reservasi, dan aktivitas admin secara real-time.</p>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Aksi</th>
              <th>Deskripsi Aktivitas</th>
              <th>Waktu</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td><span className="badge-pill badge-active">{l.action}</span></td>
                <td>{l.desc}</td>
                <td className="font-mono">{l.time}</td>
                <td className="font-mono">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-log-root { padding-bottom: 2rem; }
        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 2.25rem; color: var(--color-primary); }
      `}</style>
    </div>
  );
}
