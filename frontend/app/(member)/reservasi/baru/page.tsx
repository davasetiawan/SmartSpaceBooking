'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Building2, 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  FileText, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';
import { api, Ruangan } from '@/services/api';

export default function FormReservasiPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ruanganId, setRuanganId] = useState(searchParams?.get('ruanganId') || 'ruang-1');
  const [ruangan, setRuangan] = useState<Ruangan | null>(null);
  const [tanggal, setTanggal] = useState(searchParams?.get('tanggal') || new Date().toISOString().slice(0,10));
  const [jamMulai, setJamMulai] = useState(searchParams?.get('jamMulai') || '09:00');
  const [durasiJam, setDurasiJam] = useState(parseInt(searchParams?.get('durasiJam') || '2', 10));
  const [catatan, setCatatan] = useState('');
  const [metodeBayar, setMetodeBayar] = useState('TRANSFER_BANK');
  const [buktiUploaded, setBuktiUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ruanganId) {
      api.getRuanganById(ruanganId).then(setRuangan);
    }
  }, [ruanganId]);

  const hargaPerJam = ruangan ? ruangan.hargaPerJam : 150000;
  const totalHarga = hargaPerJam * durasiJam;

  const calculateJamSelesai = (mulai: string, durasi: number) => {
    const jam = parseInt(mulai.split(':')[0], 10);
    const selesaiJam = jam + durasi;
    return `${selesaiJam < 10 ? '0' + selesaiJam : selesaiJam}:00`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const jamSelesai = calculateJamSelesai(jamMulai, durasiJam);
      await api.createReservasi({
        ruanganId,
        tanggal,
        jamMulai,
        jamSelesai,
        durasiJam,
        totalHarga,
        catatan
      });

      setIsSubmitting(false);
      router.push('/reservasi');
    } catch (err) {
      setIsSubmitting(false);
      alert('Gagal membuat reservasi: ' + err);
    }
  };

  return (
    <div className="container form-page-root">
      <div className="form-header">
        <span className="section-subtitle">FORMULIR PEMESANAN</span>
        <h1 className="font-serif form-title">Konfirmasi Reservasi Ruangan</h1>
        <p className="form-desc">Lengkapi rincian tanggal, durasi, dan metode pembayaran untuk menerbitkan E-Ticket Pass Anda.</p>
      </div>

      <div className="form-grid">
        {/* Form Inputs Column */}
        <div className="form-inputs-col">
          <form onSubmit={handleFormSubmit} className="sonder-card form-card">
            {/* Step 1: Ruangan & Waktu */}
            <div className="form-section">
              <h3 className="font-serif section-heading"><Building2 size={18} className="icon-gold" /> 1. Detail Ruangan & Waktu</h3>
              
              <div className="form-group">
                <label className="form-label">Ruangan Terpilih</label>
                <input type="text" className="form-control" value={ruangan?.nama || 'Sonder Suite Room'} readOnly />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label"><CalendarIcon size={14} /> Tanggal Booking</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={tanggal} 
                    onChange={(e) => setTanggal(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label"><Clock size={14} /> Jam Mulai</label>
                  <select className="form-control" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)}>
                    <option value="08:00">08:00 WIB</option>
                    <option value="09:00">09:00 WIB</option>
                    <option value="10:00">10:00 WIB</option>
                    <option value="13:00">13:00 WIB</option>
                    <option value="14:00">14:00 WIB</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Durasi Sewa (Jam)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="12" 
                  className="form-control font-mono" 
                  value={durasiJam} 
                  onChange={(e) => setDurasiJam(parseInt(e.target.value, 10) || 1)} 
                />
                <small className="form-help">Waktu Berakhir Otomatis: {calculateJamSelesai(jamMulai, durasiJam)} WIB</small>
              </div>

              <div className="form-group">
                <label className="form-label"><FileText size={14} /> Catatan Khusus (Opsional)</label>
                <textarea 
                  className="form-control" 
                  rows={3} 
                  placeholder="Contoh: Perlu setup meja U-shape atau tambahan kabel HDMI..." 
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </div>
            </div>

            {/* Step 2: Pembayaran */}
            <div className="form-section">
              <h3 className="font-serif section-heading"><CreditCard size={18} className="icon-gold" /> 2. Metode Pembayaran</h3>
              
              <div className="payment-options">
                <label className={`payment-option ${metodeBayar === 'TRANSFER_BANK' ? 'selected' : ''}`}>
                  <input type="radio" name="bayar" value="TRANSFER_BANK" checked={metodeBayar === 'TRANSFER_BANK'} onChange={() => setMetodeBayar('TRANSFER_BANK')} />
                  <div>
                    <div className="opt-title">Transfer Bank Virtual Account</div>
                    <div className="opt-desc">BCA / Mandiri / BNI Instant Verification</div>
                  </div>
                </label>

                <label className={`payment-option ${metodeBayar === 'QRIS' ? 'selected' : ''}`}>
                  <input type="radio" name="bayar" value="QRIS" checked={metodeBayar === 'QRIS'} onChange={() => setMetodeBayar('QRIS')} />
                  <div>
                    <div className="opt-title">QRIS Instant Payment</div>
                    <div className="opt-desc">Scan QRIS dari Gopay, OVO, ShopeePay, DANA</div>
                  </div>
                </label>
              </div>

              {/* Upload Proof Box */}
              <div className="upload-box">
                <label className="form-label">Upload Bukti Transfer / Resi (Format JPG/PNG)</label>
                <div className="upload-dropzone">
                  <p>{buktiUploaded ? '✓ File Bukti Pembayaran Berhasil Dimuat' : 'Klik atau seret foto bukti pembayaran ke sini'}</p>
                  <button type="button" className="btn btn-outline btn-sm mt-1" onClick={() => setBuktiUploaded(true)}>
                    {buktiUploaded ? 'Ganti File' : 'Pilih File'}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses Reservasi...' : 'Konfirmasi & Terbitkan E-Ticket Pass'}
            </button>
          </form>
        </div>

        {/* Rincian Summary Sidebar */}
        <div className="summary-sidebar-col">
          <div className="summary-card sonder-card glass-card">
            <h3 className="font-serif summary-heading">Rincian Pemesanan</h3>

            <div className="summary-room-preview">
              <img src={ruangan?.gambarUrl[0]} alt="Ruangan" className="summary-img" />
              <div>
                <div className="summary-room-name font-serif">{ruangan?.nama}</div>
                <div className="summary-room-loc">{ruangan?.lokasi}</div>
              </div>
            </div>

            <div className="summary-table">
              <div className="s-row">
                <span>Tanggal</span>
                <span className="font-mono">{tanggal}</span>
              </div>
              <div className="s-row">
                <span>Waktu Sesi</span>
                <span className="font-mono">{jamMulai} - {calculateJamSelesai(jamMulai, durasiJam)}</span>
              </div>
              <div className="s-row">
                <span>Durasi Total</span>
                <span className="font-mono">{durasiJam} Jam</span>
              </div>
              <div className="s-row">
                <span>Tarif Per Jam</span>
                <span className="font-mono">Rp {hargaPerJam.toLocaleString('id-ID')}</span>
              </div>
              <div className="s-divider"></div>
              <div className="s-row s-total">
                <span>Total Pembayaran</span>
                <span className="font-mono s-price">Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="guarantee-box">
              <ShieldCheck size={18} className="shield-icon" />
              <span>Jaminan Ruangan Sonder: Kebersihan terstandarisasi & jaminan Wi-Fi aktif.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-page-root {
          padding: 3rem 1.5rem;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }
        .form-title {
          font-size: 2.5rem;
          color: var(--color-primary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }

        .form-card {
          padding: 2rem;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .payment-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .payment-option {
          border: 1.5px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }
        .payment-option.selected {
          border-color: var(--color-accent);
          background: var(--color-accent-light);
        }

        .upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          text-align: center;
          background: var(--bg-primary);
        }

        .summary-card {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
        }
        .summary-room-preview {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .summary-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: var(--border-radius-md);
        }

        .summary-table {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
        }
        .s-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }
        .s-divider {
          height: 1px;
          background: var(--border-color);
        }

        @media (max-width: 900px) {
          .form-grid { grid-template-columns: 1fr; }
          .payment-options { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
