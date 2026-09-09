'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const isEmail = emailOrUsername.includes('@');
      const payloadEmail = isEmail ? emailOrUsername : '';
      const payloadUsername = !isEmail ? emailOrUsername : '';

      const { user } = await api.login(payloadEmail || payloadUsername, password);

      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login gagal, periksa email/username dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Sonder Editorial Banner */}
      <div className="auth-banner-col">
        <div className="auth-banner-overlay">
          <div className="banner-content">
            <span className="banner-badge font-mono">SONDER MEMBERSHIP</span>
            <h1 className="font-serif banner-title">Kembali ke Ruang Kerja Impian Anda.</h1>
            <p className="banner-desc">Pesan meeting room 4K, hot desk ergonomis, dan kelola E-Ticket dalam satu akses terpadu.</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80" 
          alt="Sonder Space" 
          className="auth-bg-img"
        />
      </div>

      {/* Right Login Form Column */}
      <div className="auth-form-col">
        <div className="auth-form-wrapper">
          <div className="auth-brand-logo">
            <Building2 size={24} className="brand-icon" />
            <span className="font-serif brand-text">SONDER</span>
          </div>

          <h2 className="font-serif auth-heading">Masuk ke Akun Anda</h2>
          <p className="auth-subheading">Masukkan email atau username & kata sandi terdaftar Anda.</p>

          {errorMsg && (
            <div className="error-box">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email atau Username</label>
              <div className="input-icon-group">
                <Mail size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-control with-icon" 
                  placeholder="admin@smartspace.com / member" 
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi</label>
              <div className="input-icon-group">
                <Lock size={16} className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control with-icon" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="toggle-eye" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg mt-1" disabled={loading}>
              {loading ? 'Memproses Masuk...' : 'Masuk Sekarang'} <ArrowRight size={16} />
            </button>

            <div className="demo-hint-box font-mono">
              💡 Credential Demo Backend:<br />
              Admin: <code>admin</code> / <code>admin123</code> (atau <code>admin@smartspace.com</code>)<br />
              Member: <code>member</code> / <code>member123</code> (atau <code>member@smartspace.com</code>)
            </div>
          </form>

          <div className="auth-footer-text">
            Belum memiliki akun Sonder? <Link href="/register" className="auth-link">Daftar Akun Baru &rarr;</Link>
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

        .toggle-eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .demo-hint-box {
          margin-top: 1.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.85rem;
          border-radius: var(--border-radius-md);
          font-size: 0.775rem;
          color: var(--text-secondary);
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
