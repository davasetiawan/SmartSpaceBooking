import React, { useState } from 'react';
import { User, ShieldCheck, KeyRound, Award, Save, CheckCircle2 } from 'lucide-react';
import { getCurrentUser, setCurrentUser } from '../services/api';

export const ProfilPage: React.FC = () => {
  const currentUser = getCurrentUser() || {
    id: 'usr-1',
    nama: 'Alexander Wright',
    email: 'alex.wright@example.com',
    role: 'MEMBER',
    telepon: '+62 812-3456-7890'
  };

  const [nama, setNama] = useState(currentUser.nama);
  const [email, setEmail] = useState(currentUser.email);
  const [telepon, setTelepon] = useState(currentUser.telepon || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...currentUser, nama, email, telepon };
    setCurrentUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="container profile-page-root">
      <div className="profile-header">
        <span className="section-subtitle">PENGATURAN AKUN</span>
        <h1 className="font-serif profile-title">Profil Member WorkMates</h1>
        <p className="profile-desc">Kelola informasi pribadi, kontak, dan kuota jam penggunaan ruangan Anda.</p>
      </div>

      <div className="profile-grid">
        {/* Left Column: User Card Info & Tier */}
        <div className="profile-card-col">
          <div className="sonder-card user-badge-card">
            <div className="user-avatar-large font-serif">
              {nama.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-serif user-fullname">{nama}</h2>
            <p className="user-email">{email}</p>

            <span className="badge-pill badge-approved mt-1">
              <Award size={12} /> Member WorkMates Gold
            </span>

            <div className="quota-box mt-2">
              <div className="quota-row">
                <span>Sisa Kuota Jam Rapat</span>
                <span className="font-mono font-bold">24 Jam</span>
              </div>
              <div className="quota-progress-bar">
                <div className="quota-progress-fill" style={{ width: '70%' }}></div>
              </div>
              <small className="quota-hint">Kupon aktif diperbarui setiap awal bulan</small>
            </div>
          </div>
        </div>

        {/* Right Column: Update Form */}
        <div className="profile-form-col">
          <form onSubmit={handleSaveProfile} className="sonder-card form-box">
            <h3 className="font-serif box-title">Perbarui Informasi Pribadi</h3>

            {savedSuccess && (
              <div className="alert-success">
                <CheckCircle2 size={18} /> Profil berhasil diperbarui!
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor Telepon / WhatsApp</label>
              <input type="text" className="form-control" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
            </div>

            <div className="form-divider"></div>

            <h4 className="font-serif box-subtitle"><KeyRound size={16} /> Keamanan Kata Sandi</h4>
            <div className="form-group">
              <label className="form-label">Kata Sandi Baru</label>
              <input type="password" className="form-control" placeholder="Kosongkan jika tidak ingin mengubah" />
            </div>

            <button type="submit" className="btn btn-primary btn-md">
              <Save size={16} /> Simpan Perubahan Profil
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .profile-page-root {
          padding: 3rem 1.5rem;
        }

        .profile-header {
          margin-bottom: 2.5rem;
        }
        .profile-title {
          font-size: 2.75rem;
          color: var(--color-primary);
        }
        .profile-desc {
          color: var(--text-secondary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 2.5rem;
        }

        .user-badge-card {
          padding: 2rem;
          text-align: center;
        }
        .user-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--color-accent);
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }
        .user-fullname {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
        }
        .user-email {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .quota-box {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--border-radius-md);
          text-align: left;
        }
        .quota-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .quota-progress-bar {
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.35rem;
        }
        .quota-progress-fill {
          height: 100%;
          background: var(--color-accent);
        }
        .quota-hint {
          font-size: 0.725rem;
          color: var(--text-tertiary);
        }

        .form-box {
          padding: 2rem;
        }
        .box-title {
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
        }
        .box-subtitle {
          font-size: 1.1rem;
          margin: 1.5rem 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert-success {
          background: #D1FAE5;
          color: #065F46;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .form-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.5rem 0;
        }
        .mt-1 { margin-top: 0.5rem; }
        .mt-2 { margin-top: 1.5rem; }

        @media (max-width: 800px) {
          .profile-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
