'use client';

import React, { useState } from 'react';
import { Download, Calendar, DollarSign, BarChart3 } from 'lucide-react';

export default function AdminLaporanPage() {
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-30');

  const handleExportCSV = () => {
    alert(`Laporan Excel / CSV untuk periode ${startDate} hingga ${endDate} berhasil diunduh!`);
  };

  return (
    <div className="admin-laporan-root">
      <div className="page-header">
        <h1 className="font-serif page-title">Laporan & Analitik Finansial</h1>
        <p className="page-desc">Ekspor data pendapatan, keterisian ruangan, dan statistik reservasi bulanan.</p>
      </div>

      <div className="sonder-card filter-card mb-2">
        <h3 className="font-serif block-title"><Calendar size={18} /> Rentang Periode Laporan</h3>
        <div className="form-row-2 mt-1">
          <div className="form-group">
            <label className="form-label">Tanggal Mulai</label>
            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Tanggal Selesai</label>
            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <button className="btn btn-primary btn-md" onClick={handleExportCSV}>
          <Download size={16} /> Unduh Laporan Excel (CSV)
        </button>
      </div>

      <div className="reports-summary-grid">
        <div className="sonder-card rep-card">
          <div className="rep-header"><DollarSign size={20} className="gold" /> Total Transaksi Laporan</div>
          <div className="rep-val font-mono">Rp 48.500.000</div>
          <p className="rep-desc">Terakumulasi dari 128 transaksi reservasi.</p>
        </div>

        <div className="sonder-card rep-card">
          <div className="rep-header"><BarChart3 size={20} className="teal" /> Rata-Rata Durasi Booking</div>
          <div className="rep-val font-mono">2.8 Jam</div>
          <p className="rep-desc">Meeting Room mendominasi 54% reservasi.</p>
        </div>
      </div>

      <style>{`
        .admin-laporan-root { padding-bottom: 2rem; }
        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 2.25rem; color: var(--color-primary); }
        .filter-card { padding: 1.75rem; }
        .block-title { font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .reports-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .rep-card { padding: 1.5rem; }
        .rep-header { font-size: 0.875rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .rep-val { font-size: 2rem; font-weight: 800; color: var(--color-primary); }
        .mt-1 { margin-top: 1rem; }
        .mb-2 { margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
}
