'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  Building2, 
  XCircle, 
  PlusCircle 
} from 'lucide-react';
import { api, Reservasi } from '@/services/api';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ETicketModal } from '@/components/common/ETicketModal';

export default function RiwayatReservasiPage() {
  const [reservasiList, setReservasiList] = useState<Reservasi[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedETicket, setSelectedETicket] = useState<Reservasi | null>(null);

  useEffect(() => {
    api.getReservasi().then(setReservasiList);
  }, []);

  const handleCancelBooking = (id: string) => {
    if (confirm('Apakah Anda yakin ingin membatalkan reservasi ini?')) {
      setReservasiList(prev => prev.map(r => r.id === id ? { ...r, status: 'DIBATALKAN' } : r));
    }
  };

  const filteredList = activeTab === 'ALL'
    ? reservasiList
    : reservasiList.filter(r => r.status === activeTab);

  return (
    <div className="container history-page-root">
      <div className="history-header">
        <div>
          <span className="section-subtitle">DASHBOARD MEMBER</span>
          <h1 className="font-serif history-title">Riwayat Reservasi Anda</h1>
          <p className="history-desc">Kelola pass ruangan, cetak E-Ticket QR Code, atau batalkan jadwal booking Anda.</p>
        </div>

        <Link href="/ruangan" className="btn btn-primary btn-md">
          <PlusCircle size={16} /> Buat Reservasi Baru
        </Link>
      </div>

      {/* Filter Status Tabs */}
      <div className="status-tabs-row">
        <button className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>
          Semua ({reservasiList.length})
        </button>
        <button className={`tab-btn ${activeTab === 'DISETUJUI' ? 'active' : ''}`} onClick={() => setActiveTab('DISETUJUI')}>
          Disetujui
        </button>
        <button className={`tab-btn ${activeTab === 'BELUM_DIKONFIRMASI' ? 'active' : ''}`} onClick={() => setActiveTab('BELUM_DIKONFIRMASI')}>
          Pending
        </button>
        <button className={`tab-btn ${activeTab === 'SELESAI' ? 'active' : ''}`} onClick={() => setActiveTab('SELESAI')}>
          Selesai
        </button>
      </div>

      {/* Reservation Items List */}
      {filteredList.length === 0 ? (
        <div className="empty-history sonder-card">
          <Calendar size={48} className="empty-icon" />
          <h3 className="font-serif">Belum Ada Reservasi</h3>
          <p>Anda belum memiliki riwayat reservasi pada kategori ini.</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredList.map((res) => (
            <div key={res.id} className="sonder-card reservation-item-card">
              <div className="res-card-top">
                <div className="res-code-group">
                  <span className="res-code-label">Kode Booking</span>
                  <span className="res-code font-mono">{res.kodeBooking}</span>
                </div>
                <StatusBadge status={res.status} />
              </div>

              <div className="res-card-body">
                <div className="res-room-info">
                  <Building2 size={24} className="room-icon" />
                  <div>
                    <h3 className="font-serif room-title">{res.ruangan?.nama || 'Sonder Suite Room'}</h3>
                    <p className="room-loc"><MapPin size={14} /> {res.ruangan?.lokasi}</p>
                  </div>
                </div>

                <div className="res-timing-grid">
                  <div className="timing-item">
                    <Calendar size={14} /> Tanggal: <strong>{res.tanggal}</strong>
                  </div>
                  <div className="timing-item">
                    <Clock size={14} /> Waktu Sesi: <strong>{res.jamMulai} - {res.jamSelesai} ({res.durasiJam} Jam)</strong>
                  </div>
                </div>

                <div className="res-price font-mono">
                  Rp {res.totalHarga.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="res-card-actions">
                {res.status === 'DISETUJUI' || res.status === 'AKTIF' ? (
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedETicket(res)}>
                    <QrCode size={16} /> Lihat Pass & QR E-Ticket
                  </button>
                ) : null}

                {res.status === 'BELUM_DIKONFIRMASI' || res.status === 'DISETUJUI' ? (
                  <button className="btn btn-outline btn-sm cancel-btn" onClick={() => handleCancelBooking(res.id)}>
                    <XCircle size={16} /> Batalkan Booking
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* E-Ticket Dialog Modal */}
      <ETicketModal reservasi={selectedETicket} onClose={() => setSelectedETicket(null)} />

      <style>{`
        .history-page-root {
          padding: 3rem 1.5rem;
        }

        .history-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .history-title {
          font-size: 2.75rem;
          color: var(--color-primary);
        }

        .status-tabs-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }
        .tab-btn {
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .tab-btn.active {
          background: var(--color-primary);
          color: var(--text-inverse);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .reservation-item-card {
          padding: 1.5rem;
        }
        .res-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }
        .res-code {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .res-card-body {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .res-room-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .res-price {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-accent-hover);
          text-align: right;
        }

        .res-card-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .empty-history {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .res-card-body { grid-template-columns: 1fr; gap: 1rem; }
          .res-price { text-align: left; }
        }
      `}</style>
    </div>
  );
}
