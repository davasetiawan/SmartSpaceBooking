import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { api, Ruangan } from '../services/api';

export const FormReservasiPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stateData = location.state || {};

  const [ruanganId, setRuanganId] = useState(stateData.ruanganId || 'ruang-1');
  const [ruangan, setRuangan] = useState<Ruangan | null>(null);
  const [tanggal, setTanggal] = useState(stateData.tanggal || new Date().toISOString().slice(0,10));
  const [jamMulai, setJamMulai] = useState(stateData.jamMulai || '09:00');
  const [durasiJam, setDurasiJam] = useState(stateData.durasiJam || 2);
  const [catatan, setCatatan] = useState('');
  const [metodeBayarId, setMetodeBayarId] = useState<number>(1);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [buktiUploaded, setBuktiUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ruanganId) {
      api.getRuanganById(ruanganId).then(setRuangan);
    }
    api.getPaymentMethods().then((methods) => {
      setPaymentMethods(methods.filter((m) => m.is_aktif));
      if (methods.length > 0) setMetodeBayarId(methods[0].id);
    });
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
      const result = await api.createReservasi({
        ruanganId,
        tanggal,
        jamMulai,
        jamSelesai,
        durasiJam,
        totalHarga,
        catatan
      });

      // Trigger Midtrans Payment Gateway
      try {
        const payRes = await api.createPayment(result.id, metodeBayarId);
        if (payRes && payRes.paymentUrl) {
          window.open(payRes.paymentUrl, '_blank');
        }
      } catch (payErr) {
        console.warn('Payment API call info:', payErr);
      }

      setIsSubmitting(false);
      navigate('/reservasi', { state: { newBookingCreated: true, createdId: result.id } });
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
                {paymentMethods.map((pm) => (
                  <label key={pm.id} className={`payment-option ${metodeBayarId === pm.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="bayar"
                      value={pm.id}
                      checked={metodeBayarId === pm.id}
                      onChange={() => setMetodeBayarId(pm.id)}
                    />
                    <div>
                      <div className="opt-title">{pm.nama}</div>
                      <div className="opt-desc">
                        {pm.nomor_rekening ? `No: ${pm.nomor_rekening} (A.N ${pm.atas_nama || 'Space'})` : 'Pembayaran Instan via Midtrans'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Upload Proof Box */}
              <div className="upload-box">
                <label className="form-label">Upload Bukti Transfer / Resi (Format JPG/PNG)</label>
                <div className="upload-dropzone">
                  <Upload size={24} className="upload-icon" />
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
              <span>Jaminan Ruangan WorkMates: Kebersihan terstandarisasi & jaminan Wi-Fi aktif.</span>
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
        .form-desc {
          color: var(--text-secondary);
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
        .section-heading {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          color: var(--color-primary);
        }
        .icon-gold {
          color: var(--color-accent);
        }

        .form-help {
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
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
          transition: all var(--transition-fast);
        }
        .payment-option.selected {
          border-color: var(--color-accent);
          background: var(--color-accent-light);
        }
        .opt-title {
          font-weight: 700;
          font-size: 0.875rem;
        }
        .opt-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .upload-box {
          margin-top: 1rem;
        }
        .upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          text-align: center;
          background: var(--bg-primary);
        }
        .upload-icon {
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .summary-card {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
        }
        .summary-heading {
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
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
        .summary-room-name {
          font-size: 1.05rem;
          font-weight: 700;
        }
        .summary-room-loc {
          font-size: 0.775rem;
          color: var(--text-secondary);
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
        .s-total {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 1rem;
        }
        .s-price {
          color: var(--color-accent-hover);
          font-size: 1.25rem;
        }

        .guarantee-box {
          margin-top: 1.5rem;
          background: var(--bg-secondary);
          padding: 0.75rem;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .form-grid { grid-template-columns: 1fr; }
          .payment-options { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
