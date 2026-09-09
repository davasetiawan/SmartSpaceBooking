'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';

export default function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telepon, setTelepon] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await api.register({
        nama,
        email,
        password,
        telepon,
      });

      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registrasi gagal, pastikan email & data belum terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Sonder Banner */}
      <div className="auth-banner-col">
        <div className="auth-banner-overlay">
          <div className="banner-content">
            <span className="banner-badge font-mono">SONDER WORKSPACES</span>
            <h1 className="font-serif banner-title">Nikmati Kemudahan Akses Ruang Kerja Cerdas.</h1>
            <p className="banner-desc">Bergabunglah dengan ribuan profesional dan tim yang mengandalkan Sonder untuk reservasi instan bebas bentrok.</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80" 
          alt="Sonder Space" 
          className="auth-bg-img"
        />
      </div>

      {/* Right Register Form Column */}
      <div className="auth-form-col">
        <div className="auth-form-wrapper">
          <div className="auth-brand-logo">
            <Building2 size={24} className="brand-icon" />
            <span className="font-serif brand-text">SONDER</span>
          </div>

          <h2 className="font-serif auth-heading">Daftar Akun Baru</h2>
          <p className="auth-subheading">Buat akun Sonder Anda dalam beberapa langkah mudah.</p>

          {errorMsg && (
            <div className="error-box">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <div className="input-icon-group">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-control with-icon" 
                  placeholder="Ahmad Rizky" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <div className="input-icon-group">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-control with-icon" 
                  placeholder="nama@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nomor Telepon / WhatsApp</label>
              <div className="input-icon-group">
                <Phone size={16} className="input-icon" />
                <input 
                  type="tel" 
                  className="form-control with-icon" 
                  placeholder="081234567890" 
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi (Min. 8 Karakter)</label>
              <div className="input-icon-group">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  className="form-control with-icon" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg mt-1" disabled={loading}>
              {loading ? 'Mendaftarkan Akun...' : 'Daftar Akun'} <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-footer-text">
            Sudah memiliki akun Sonder? <Link href="/login" className="auth-link">Masuk Sekarang &rarr;</Link>
          </div>
        </div>
      </div>

      <style>{`
        .auth-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 120px);
        }

        .auth-banner-col {
          position: relative;
          background: var(--bg-hero);
          overflow: hidden;
        }
        .auth-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
        }
        .auth-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          padding: 4rem;
          background: linear-gradient(180deg, rgba(26,26,46,0.1) 0%, rgba(26,26,46,0.9) 100%);
        }
        .banner-title {
          font-size: 2.75rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .auth-form-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: var(--bg-primary);
        }
        .auth-form-wrapper {
          width: 100%;
          max-width: 420px;
        }
        .auth-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .auth-heading {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .auth-subheading {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .error-box {
          background: #FEE2E2;
          color: #991B1B;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .input-icon-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .form-control.with-icon {
          padding-left: 2.75rem;
        }

        .auth-footer-text {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .auth-split-layout { grid-template-columns: 1fr; }
          .auth-banner-col { display: none; }
        }
      `}</style>
    </div>
  );
}
