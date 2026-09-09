'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  ArrowLeft, 
  ShieldCheck, 
  Share2, 
  Heart,
  Info
} from 'lucide-react';
import { api, Ruangan } from '@/services/api';

export default function DetailRuanganPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [ruangan, setRuangan] = useState<Ruangan | null>(null);
  const [loading, setLoading] = useState(true);

  // Form Booking Quick States
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [selectedJamMulai, setSelectedJamMulai] = useState('09:00');
  const [selectedDurasi, setSelectedDurasi] = useState(2);

  useEffect(() => {
    if (id) {
      api.getRuanganById(id).then((data) => {
        setRuangan(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !ruangan) {
    return (
      <div className="container detail-loading">
        <p className="font-serif">Memuat Detail Ruangan Sonder...</p>
      </div>
    );
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const totalHargaEstimasi = ruangan.hargaPerJam * selectedDurasi;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/reservasi/baru?ruanganId=${ruangan.id}&tanggal=${selectedTanggal}&jamMulai=${selectedJamMulai}&durasiJam=${selectedDurasi}`);
  };

  return (
    <div className="container detail-page-root">
      {/* Back Link */}
      <div className="back-bar">
        <Link href="/ruangan" className="btn-back">
          <ArrowLeft size={16} /> Kembali ke Katalog Ruangan
        </Link>
      </div>

      {/* Title & Header Metadata */}
      <div className="detail-header-row">
        <div>
          <div className="detail-badges">
            <span className="badge-pill badge-type">{ruangan.tipe}</span>
            {ruangan.rating && (
              <span className="badge-pill badge-rating">
                <Star size={12} fill="#C9A96E" color="#C9A96E" /> {ruangan.rating} (Rating Member)
              </span>
            )}
          </div>
          <h1 className="font-serif detail-title">{ruangan.nama}</h1>
          <p className="detail-location"><MapPin size={16} /> {ruangan.lokasi}</p>
        </div>

        <div className="detail-header-actions">
          <button className="btn btn-outline btn-sm" title="Bagikan"><Share2 size={16} /></button>
          <button className="btn btn-outline btn-sm" title="Simpan Wishlist"><Heart size={16} /></button>
        </div>
      </div>

      {/* Sonder Editorial Photo Gallery Grid */}
      <div className="gallery-grid">
        <div className="gallery-main">
          <img src={ruangan.gambarUrl[0]} alt={ruangan.nama} />
        </div>
        <div className="gallery-side">
          <img src={ruangan.gambarUrl[1] || ruangan.gambarUrl[0]} alt={ruangan.nama} />
          <div className="gallery-more">
            <img src={ruangan.gambarUrl[0]} alt={ruangan.nama} />
            <div className="more-overlay">+ Lihat Semua Galeri (6)</div>
          </div>
        </div>
      </div>

      {/* Main Content & Booking Form Sidebar Grid */}
      <div className="detail-body-grid">
        {/* Left Column: Room Info & Features */}
        <div className="info-col">
          <div className="spec-cards-row">
            <div className="spec-card sonder-card">
              <Users size={20} className="spec-icon" />
              <div>
                <div className="spec-label">Kapasitas Maks</div>
                <div className="spec-val font-mono">{ruangan.kapasitas} Orang</div>
              </div>
            </div>
            <div className="spec-card sonder-card">
              <Clock size={20} className="spec-icon" />
              <div>
                <div className="spec-label">Sewa Fleksibel</div>
                <div className="spec-val">Per Jam / Per Hari</div>
              </div>
            </div>
            <div className="spec-card sonder-card">
              <ShieldCheck size={20} className="spec-icon" />
              <div>
                <div className="spec-label">Keamanan</div>
                <div className="spec-val">Pass QR Instant</div>
              </div>
            </div>
          </div>

          <div className="section-block">
            <h3 className="font-serif block-title">Deskripsi Ruangan</h3>
            <p className="block-text">{ruangan.deskripsi}</p>
          </div>

          <div className="section-block">
            <h3 className="font-serif block-title">Fasilitas Standar Sonder</h3>
            <div className="facilities-grid">
              {ruangan.fasilitas.map((f, i) => (
                <div key={i} className="facility-item">
                  <CheckCircle2 size={16} className="facility-check" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-block info-banner sonder-card">
            <Info size={20} className="info-icon" />
            <div>
              <strong>Kebijakan Pembatalan Sonder</strong>
              <p>Pembatalan gratis hingga 2 jam sebelum waktu sesi dimulai. Kredit reservasi akan langsung dikembalikan ke dompet member.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Booking Widget Sonder */}
        <div className="booking-col">
          <div className="booking-widget sonder-card glass-card">
            <div className="widget-header">
              <span className="price-label">Tarif Sewa</span>
              <div className="widget-price">
                <span className="amount font-mono">{formatRupiah(ruangan.hargaPerJam)}</span>
                <span className="unit">/ jam</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label className="form-label"><CalendarIcon size={14} /> Pilih Tanggal Booking</label>
                <input 
                  type="date" 
                  className="form-control"
                  value={selectedTanggal}
                  onChange={(e) => setSelectedTanggal(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label"><Clock size={14} /> Jam Mulai</label>
                  <select 
                    className="form-control"
                    value={selectedJamMulai}
                    onChange={(e) => setSelectedJamMulai(e.target.value)}
                  >
                    <option value="08:00">08:00 WIB</option>
                    <option value="09:00">09:00 WIB</option>
                    <option value="10:00">10:00 WIB</option>
                    <option value="11:00">11:00 WIB</option>
                    <option value="13:00">13:00 WIB</option>
                    <option value="14:00">14:00 WIB</option>
                    <option value="15:00">15:00 WIB</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Durasi (Jam)</label>
                  <select 
                    className="form-control"
                    value={selectedDurasi}
                    onChange={(e) => setSelectedDurasi(parseInt(e.target.value, 10))}
                  >
                    <option value={1}>1 Jam</option>
                    <option value={2}>2 Jam</option>
                    <option value={3}>3 Jam</option>
                    <option value={4}>4 Jam</option>
                    <option value={8}>Full Day (8 Jam)</option>
                  </select>
                </div>
              </div>

              <div className="price-summary-box">
                <div className="summary-row">
                  <span>{formatRupiah(ruangan.hargaPerJam)} x {selectedDurasi} Jam</span>
                  <span className="font-mono">{formatRupiah(totalHargaEstimasi)}</span>
                </div>
                <div className="summary-row">
                  <span>Pajak & Service Charge</span>
                  <span className="font-mono">Termasuk</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total Estimasi Biaya</span>
                  <span className="font-mono total-amount">{formatRupiah(totalHargaEstimasi)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg">
                Lanjutkan Ke Pemesanan &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .detail-page-root {
          padding: 2.5rem 1.5rem;
        }

        .detail-loading {
          padding: 6rem 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .back-bar {
          margin-bottom: 1.5rem;
        }
        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .detail-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .detail-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .detail-title {
          font-size: 2.75rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .detail-location {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.95rem;
        }

        .detail-header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          height: 420px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .gallery-main img, .gallery-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-side {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
        }
        .gallery-more {
          position: relative;
          height: 100%;
        }
        .more-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          cursor: pointer;
        }

        .detail-body-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }

        .spec-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .spec-card {
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-block {
          margin-bottom: 2.5rem;
        }
        .block-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }
        .block-text {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .facility-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .info-banner {
          padding: 1.25rem;
          display: flex;
          gap: 1rem;
          background: var(--color-accent-light);
          border-color: var(--color-accent);
          color: var(--text-primary);
        }

        .booking-widget {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
        }
        .widget-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .amount {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .unit {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .price-summary-box {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--border-radius-md);
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }
        .summary-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.25rem 0;
        }
        .total-row {
          font-weight: 700;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .detail-body-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; height: 280px; }
          .gallery-side { display: none; }
        }
      `}</style>
    </div>
  );
}
