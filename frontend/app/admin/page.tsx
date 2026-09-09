'use client';

import React, { useEffect, useState } from 'react';
import { 
  CalendarCheck, 
  DollarSign, 
  Building2, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { api, AdminMetrics, Reservasi } from '@/services/api';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [recentReservasi, setRecentReservasi] = useState<Reservasi[]>([]);

  useEffect(() => {
    api.getAdminMetrics().then(setMetrics);
    api.getReservasi().then((res) => setRecentReservasi(res.slice(0, 5)));
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="admin-dashboard-root">
      <div className="dashboard-header">
        <div>
          <h1 className="font-serif dashboard-title">Overview Dashboard Admin</h1>
          <p className="dashboard-desc">Ringkasan kinerja reservasi, statistik keuangan, dan aktivitas ruangan hari ini.</p>
        </div>
      </div>

      {/* Metric Cards Grid Sonder */}
      <div className="metrics-grid">
        <div className="sonder-card metric-card">
          <div className="metric-icon-box navy"><CalendarCheck size={20} /></div>
          <div>
            <span className="metric-label">Total Reservasi</span>
            <div className="metric-val font-mono">{metrics?.totalReservasi || 128}</div>
            <span className="metric-sub text-green"><TrendingUp size={12} /> +14.2% minggu ini</span>
          </div>
        </div>

        <div className="sonder-card metric-card">
          <div className="metric-icon-box gold"><DollarSign size={20} /></div>
          <div>
            <span className="metric-label">Total Pendapatan</span>
            <div className="metric-val font-mono">{formatRupiah(metrics?.totalPendapatan || 48500000)}</div>
            <span className="metric-sub text-green"><TrendingUp size={12} /> +8.5% bulan ini</span>
          </div>
        </div>

        <div className="sonder-card metric-card">
          <div className="metric-icon-box teal"><Building2 size={20} /></div>
          <div>
            <span className="metric-label">Tingkat Okupansi</span>
            <div className="metric-val font-mono">{metrics?.tingkatOkupansi || 84.5}%</div>
            <span className="metric-sub">8 Ruangan Aktif</span>
          </div>
        </div>

        <div className="sonder-card metric-card">
          <div className="metric-icon-box gold"><Users size={20} /></div>
          <div>
            <span className="metric-label">Total Member</span>
            <div className="metric-val font-mono">{metrics?.totalMember || 340}</div>
            <span className="metric-sub">Pengguna Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="charts-grid mt-2">
        <div className="sonder-card chart-card">
          <div className="card-header-bar">
            <h3 className="font-serif chart-title">Tren Reservasi Harian</h3>
            <span className="badge-pill badge-approved font-mono">7 Hari Terakhir</span>
          </div>
          {/* Simulated Visual Chart Bar */}
          <div className="chart-bar-container">
            <div className="bar-group"><div className="bar" style={{ height: '60%' }}></div><span>Sen</span></div>
            <div className="bar-group"><div className="bar" style={{ height: '80%' }}></div><span>Sel</span></div>
            <div className="bar-group"><div className="bar" style={{ height: '45%' }}></div><span>Rab</span></div>
            <div className="bar-group"><div className="bar" style={{ height: '95%' }}></div><span>Kam</span></div>
            <div className="bar-group"><div className="bar" style={{ height: '70%' }}></div><span>Jum</span></div>
            <div className="bar-group"><div className="bar active" style={{ height: '100%' }}></div><span>Sab</span></div>
            <div className="bar-group"><div className="bar" style={{ height: '65%' }}></div><span>Ming</span></div>
          </div>
        </div>

        <div className="sonder-card chart-card">
          <div className="card-header-bar">
            <h3 className="font-serif chart-title">Proporsi Distribusi Ruangan</h3>
            <span className="badge-pill badge-active font-mono">Kategori</span>
          </div>
          <div className="distribution-list">
            <div className="dist-item">
              <span>Meeting Rooms (45%)</span>
              <div className="dist-bar"><div className="dist-fill" style={{ width: '45%', background: '#C9A96E' }}></div></div>
            </div>
            <div className="dist-item">
              <span>Hot Desks (30%)</span>
              <div className="dist-bar"><div className="dist-fill" style={{ width: '30%', background: '#10B981' }}></div></div>
            </div>
            <div className="dist-item">
              <span>Private Office (15%)</span>
              <div className="dist-bar"><div className="dist-fill" style={{ width: '15%', background: '#3B82F6' }}></div></div>
            </div>
            <div className="dist-item">
              <span>Event Space (10%)</span>
              <div className="dist-bar"><div className="dist-fill" style={{ width: '10%', background: '#6B7280' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reservations Data Table */}
      <div className="table-section mt-2">
        <div className="card-header-bar mb-1">
          <h3 className="font-serif chart-title">Reservasi Terbaru Masuk</h3>
        </div>

        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Kode Booking</th>
                <th>Member</th>
                <th>Ruangan</th>
                <th>Tanggal & Sesi</th>
                <th>Total Biaya</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentReservasi.map((res) => (
                <tr key={res.id}>
                  <td className="font-mono font-bold">{res.kodeBooking}</td>
                  <td>{res.user?.nama || 'Alexander Wright'}</td>
                  <td>{res.ruangan?.nama || 'Sonder Room'}</td>
                  <td>{res.tanggal} ({res.jamMulai} - {res.jamSelesai})</td>
                  <td className="font-mono">{formatRupiah(res.totalHarga)}</td>
                  <td><StatusBadge status={res.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-dashboard-root {
          padding-bottom: 2rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }
        .dashboard-title {
          font-size: 2.25rem;
          color: var(--color-primary);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .metric-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-icon-box.navy { background: #EEF2FF; color: #3B82F6; }
        .metric-icon-box.gold { background: var(--color-accent-light); color: var(--color-accent-hover); }
        .metric-icon-box.teal { background: #EBF5F0; color: #10B981; }

        .metric-label {
          font-size: 0.775rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .metric-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary);
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.5rem;
        }
        .chart-card {
          padding: 1.5rem;
        }
        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .chart-bar-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 180px;
          padding: 1rem 0;
        }
        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
          justify-content: flex-end;
          flex: 1;
        }
        .bar {
          width: 28px;
          background: #E8E4DF;
          border-radius: 6px;
        }
        .bar.active {
          background: var(--color-accent);
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-top: 0.5rem;
        }
        .dist-item {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .dist-bar {
          height: 10px;
          background: var(--border-color);
          border-radius: 5px;
          overflow: hidden;
          margin-top: 0.35rem;
        }
        .dist-fill {
          height: 100%;
        }

        .mt-2 { margin-top: 2rem; }
        .mb-1 { margin-bottom: 1rem; }

        @media (max-width: 1024px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .charts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
