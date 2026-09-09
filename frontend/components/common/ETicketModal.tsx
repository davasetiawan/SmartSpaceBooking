'use client';

import React from 'react';
import { Reservasi } from '@/services/api';
import { StatusBadge } from './StatusBadge';
import { X, Printer, Building2, Calendar, Clock, MapPin, QrCode } from 'lucide-react';

interface ETicketModalProps {
  reservasi: Reservasi | null;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({ reservasi, onClose }) => {
  if (!reservasi) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="font-serif modal-brand">SONDER E-TICKET</span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body printable-e-ticket">
          {/* E-Ticket Header */}
          <div className="ticket-card">
            <div className="ticket-top">
              <div className="ticket-brand-group">
                <Building2 size={24} className="ticket-logo" />
                <div>
                  <h3 className="font-serif ticket-title">Pass Akses Ruangan</h3>
                  <p className="ticket-subtitle">Sonder Smart Space Booking</p>
                </div>
              </div>
              <StatusBadge status={reservasi.status} />
            </div>

            <div className="ticket-divider"></div>

            {/* QR Code Prominent Section */}
            <div className="qr-section">
              <div className="qr-box">
                <img 
                  src={reservasi.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${reservasi.kodeBooking}`} 
                  alt="QR Code Pass" 
                  className="qr-img"
                />
              </div>
              <div className="qr-info">
                <span className="qr-label">Kode Booking E-Ticket</span>
                <span className="qr-code font-mono">{reservasi.kodeBooking}</span>
                <p className="qr-instruction">
                  <QrCode size={14} className="inline-icon" /> Tunjukkan QR Code ini pada scanner kamera di pintu / meja resepsionis untuk check-in otomatis.
                </p>
              </div>
            </div>

            <div className="ticket-divider"></div>

            {/* Ticket Details Grid */}
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Ruangan</span>
                <span className="detail-val font-serif">{reservasi.ruangan?.nama || 'Ruangan Rapat'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Lokasi</span>
                <span className="detail-val"><MapPin size={14} /> {reservasi.ruangan?.lokasi || 'Lantai 1'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tanggal Booking</span>
                <span className="detail-val"><Calendar size={14} /> {reservasi.tanggal}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Waktu / Durasi</span>
                <span className="detail-val"><Clock size={14} /> {reservasi.jamMulai} - {reservasi.jamSelesai} ({reservasi.durasiJam} Jam)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Atas Nama</span>
                <span className="detail-val">{reservasi.user?.nama || 'Member Sonder'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Biaya</span>
                <span className="detail-val font-mono price-val">Rp {reservasi.totalHarga.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-actions">
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Tutup
          </button>
          <button className="btn btn-primary btn-sm" onClick={handlePrint}>
            <Printer size={16} /> Cetak E-Ticket
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-modal-overlay);
          z-index: var(--z-modal-overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          width: 100%;
          max-width: 520px;
          background: var(--bg-card);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }
        .modal-brand {
          font-size: 1.1rem;
          color: var(--color-primary);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .ticket-card {
          background: #FFFFFF;
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
        }

        .ticket-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ticket-brand-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ticket-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.25rem 0;
        }

        .qr-section {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .qr-box {
          width: 120px;
          height: 120px;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          background: #ffffff;
          flex-shrink: 0;
        }
        .qr-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-actions {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
};
