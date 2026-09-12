import React, { useState, useEffect } from 'react';
import { api, PaymentMethod } from '../../services/api';
import { CreditCard, Building, Save, Plus, CheckCircle2, XCircle, Trash2, AlertCircle } from 'lucide-react';

export const AdminPengaturanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'payment'>('payment');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethod, setNewMethod] = useState({
    nama: '',
    tipe: 'bank_transfer',
    nomor_rekening: '',
    atas_nama: '',
    is_aktif: true,
  });

  const [coworkingProfile, setCoworkingProfile] = useState({
    nama_coworking: 'Sonder Space Coworking',
    nama_pemilik: 'Admin Space',
    telp: '081234567890',
    alamat: 'Jl. Pemuda No. 45, Jakarta Pusat',
    deskripsi_fasilitas: 'High-speed Wi-Fi 500Mbps, Coffee Bar & Free Flow Tea, Soundproof Meeting Rooms, Ergonomic Chairs',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const res = await api.getPaymentMethods();
      setPaymentMethods(res);
    } catch (err) {
      console.error('Failed to fetch payment methods', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PaymentMethod = {
      id: Date.now(),
      nama: newMethod.nama,
      tipe: newMethod.tipe,
      nomor_rekening: newMethod.nomor_rekening || undefined,
      atas_nama: newMethod.atas_nama || undefined,
      is_aktif: newMethod.is_aktif,
    };
    setPaymentMethods([...paymentMethods, created]);
    setNewMethod({ nama: '', tipe: 'bank_transfer', nomor_rekening: '', atas_nama: '', is_aktif: true });
    setShowAddModal(false);
  };

  const toggleMethodStatus = (id: number) => {
    setPaymentMethods(paymentMethods.map(m => m.id === id ? { ...m, is_aktif: !m.is_aktif } : m));
  };

  const handleDeleteMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };

  return (
    <div className="admin-pengaturan-page">
      <div className="page-header mb-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary">Pengaturan Sistem & Operasional</h1>
          <p className="text-secondary text-sm">Kelola profil lokasi coworking space dan metode pembayaran digital.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert-toast success mb-4">
          <CheckCircle2 size={18} />
          <span>Pengaturan berhasil diperbarui!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="settings-tabs mb-4">
        <button
          className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          <CreditCard size={18} /> Metode Pembayaran
        </button>
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <Building size={18} /> Profil Space & Fasilitas
        </button>
      </div>

      {/* Payment Methods Section */}
      {activeTab === 'payment' && (
        <div className="settings-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Metode Pembayaran Digital</h2>
              <p className="section-desc">Atur rekening bank, QRIS, dan channel pembayaran yang diterima untuk reservasi.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus size={16} /> Tambah Metode
            </button>
          </div>

          <div className="payment-grid">
            {paymentMethods.map((method) => (
              <div key={method.id} className={`payment-card ${method.is_aktif ? 'active' : 'inactive'}`}>
                <div className="payment-card-header">
                  <div className="payment-icon">
                    <CreditCard size={24} />
                  </div>
                  <span className={`status-pill ${method.is_aktif ? 'active' : 'inactive'}`}>
                    {method.is_aktif ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </div>
                <div className="payment-card-body">
                  <h3>{method.nama}</h3>
                  <p className="payment-type">Tipe: {method.tipe.toUpperCase()}</p>
                  {method.nomor_rekening && (
                    <p className="payment-detail">No. Rekening: <strong>{method.nomor_rekening}</strong></p>
                  )}
                  {method.atas_nama && (
                    <p className="payment-detail">A.N.: {method.atas_nama}</p>
                  )}
                </div>
                <div className="payment-card-actions">
                  <button 
                    className={`btn-action-toggle ${method.is_aktif ? 'off' : 'on'}`}
                    onClick={() => toggleMethodStatus(method.id)}
                  >
                    {method.is_aktif ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                    {method.is_aktif ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button className="btn-action-delete" onClick={() => handleDeleteMethod(method.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coworking Profile Section */}
      {activeTab === 'profile' && (
        <div className="settings-section">
          <h2 className="section-title mb-2">Informasi Profil Coworking Space</h2>
          <form onSubmit={handleSaveProfile} className="form-grid">
            <div className="form-group">
              <label>Nama Brand / Coworking Space</label>
              <input
                type="text"
                value={coworkingProfile.nama_coworking}
                onChange={(e) => setCoworkingProfile({ ...coworkingProfile, nama_coworking: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Nama Pemilik / Penanggung Jawab</label>
              <input
                type="text"
                value={coworkingProfile.nama_pemilik}
                onChange={(e) => setCoworkingProfile({ ...coworkingProfile, nama_pemilik: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Nomor Telepon CS / WhatsApp Call Center</label>
              <input
                type="text"
                value={coworkingProfile.telp}
                onChange={(e) => setCoworkingProfile({ ...coworkingProfile, telp: e.target.value })}
                required
              />
            </div>
            <div className="form-group full">
              <label>Alamat Lengkap</label>
              <textarea
                rows={3}
                value={coworkingProfile.alamat}
                onChange={(e) => setCoworkingProfile({ ...coworkingProfile, alamat: e.target.value })}
                required
              />
            </div>
            <div className="form-group full">
              <label>Rangkuman Deskripsi Fasilitas Gedung</label>
              <textarea
                rows={4}
                value={coworkingProfile.deskripsi_fasilitas}
                onChange={(e) => setCoworkingProfile({ ...coworkingProfile, deskripsi_fasilitas: e.target.value })}
                required
              />
            </div>
            <div className="form-actions full">
              <button type="submit" className="btn-primary">
                <Save size={16} /> Simpan Perubahan Profil
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Tambah Metode Pembayaran</h3>
            <form onSubmit={handleAddPaymentMethod}>
              <div className="form-group mb-3">
                <label>Nama Channel Pembayaran</label>
                <input
                  type="text"
                  placeholder="Contoh: Bank Transfer BCA"
                  value={newMethod.nama}
                  onChange={(e) => setNewMethod({ ...newMethod, nama: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Tipe Metode</label>
                <select
                  value={newMethod.tipe}
                  onChange={(e) => setNewMethod({ ...newMethod, tipe: e.target.value })}
                >
                  <option value="bank_transfer">Bank Transfer (VA / Manual)</option>
                  <option value="qris">QRIS / E-Wallet</option>
                  <option value="credit_card">Kartu Kredit / Debit</option>
                  <option value="cash">Tunai / Resepsionis</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Nomor Rekening / Account ID (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: 8820491029"
                  value={newMethod.nomor_rekening}
                  onChange={(e) => setNewMethod({ ...newMethod, nomor_rekening: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label>Atas Nama (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: PT Smart Space Indonesia"
                  value={newMethod.atas_nama}
                  onChange={(e) => setNewMethod({ ...newMethod, atas_nama: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Batal</button>
                <button type="submit" className="btn-primary">Simpan Metode</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-pengaturan-page {
          padding: 1.5rem;
        }
        .settings-tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 2px solid var(--border-color, #E5E7EB);
          padding-bottom: 0.5rem;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #6B7280;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: var(--color-primary, #111827);
          color: var(--color-accent, #C9A96E);
        }
        .settings-section {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-color, #E5E7EB);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
        }
        .section-desc {
          font-size: 0.875rem;
          color: #6B7280;
        }
        .payment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .payment-card {
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 1.25rem;
          background: #F9FAFB;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .payment-card.active {
          border-color: #C9A96E;
          background: #FFFFFF;
        }
        .payment-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .payment-icon {
          color: #C9A96E;
        }
        .status-pill {
          padding: 0.25rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 20px;
        }
        .status-pill.active {
          background: #D1FAE5;
          color: #065F46;
        }
        .status-pill.inactive {
          background: #FEE2E2;
          color: #991B1B;
        }
        .payment-card-body h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .payment-type {
          font-size: 0.75rem;
          color: #6B7280;
          margin-bottom: 0.5rem;
        }
        .payment-detail {
          font-size: 0.85rem;
          color: #374151;
        }
        .payment-card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #F3F4F6;
        }
        .btn-action-toggle {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.4rem;
          font-size: 0.775rem;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          cursor: pointer;
        }
        .btn-action-delete {
          padding: 0.4rem 0.6rem;
          background: #FEE2E2;
          color: #DC2626;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .form-group.full {
          grid-column: span 2;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
          color: #374151;
        }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .btn-primary {
          background: var(--color-primary, #111827);
          color: var(--color-accent, #C9A96E);
          padding: 0.65rem 1.25rem;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-secondary {
          background: #E5E7EB;
          color: #374151;
          padding: 0.65rem 1.25rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        .alert-toast.success {
          background: #D1FAE5;
          color: #065F46;
          padding: 0.85rem 1.25rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 480px;
        }
        .modal-card h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};
