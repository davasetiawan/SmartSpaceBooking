import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { setAuthToken, setCurrentUser } from '../services/api';

export const RegisterPage: React.FC = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userObj = {
        id: `usr-${Date.now()}`,
        nama: nama || 'Member Baru',
        email,
        role: 'MEMBER' as const,
        telepon
      };

      setAuthToken('demo-jwt-token-new-user');
      setCurrentUser(userObj);
      setLoading(false);
      navigate('/');
      window.location.reload();
    }, 600);
  };

  return (
    <div className="auth-split-layout">
      {/* Left Sonder Editorial Banner */}
      <div className="auth-banner-col">
        <div className="auth-banner-overlay">
          <div className="banner-content">
            <span className="banner-badge font-mono">JOIN WORKMATES</span>
            <h1 className="font-serif banner-title">Nikmati Pengalaman Kerja Tanpa Batas.</h1>
            <p className="banner-desc">Daftar hari ini untuk mendapatkan bonus kuota 2 jam gratis pertama Anda di WorkMates.</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80" 
          alt="Sonder Space Lounge" 
          className="auth-bg-img"
        />
      </div>

      {/* Right Register Form Column */}
      <div className="auth-form-col">
        <div className="auth-form-wrapper">
          <div className="auth-brand-logo">
            <Building2 size={24} className="brand-icon" />
            <span className="font-serif brand-text">WorkMates</span>
          </div>

          <h2 className="font-serif auth-heading">Buat Akun Member</h2>
          <p className="auth-subheading">Lengkapi formulir registrasi singkat di bawah ini.</p>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <div className="input-icon-group">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-control with-icon" 
                  placeholder="Contoh: Alexander Wright" 
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
                  placeholder="+62 812-xxxx-xxxx" 
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi (Min 8 Karakter)</label>
              <div className="input-icon-group">
                <Lock size={16} className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control with-icon" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  minLength={8}
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
              {loading ? 'Membuat Akun...' : 'Daftar Sekarang'} <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-footer-text">
            Sudah memiliki akun WorkMates? <Link to="/login" className="auth-link">Masuk Di Sini &rarr;</Link>
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
        .banner-badge {
          background: var(--color-accent-light);
          color: var(--color-accent-hover);
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius-pill);
          font-weight: 700;
          font-size: 0.75rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .banner-title {
          font-size: 2.75rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .banner-desc {
          color: #D1D5DB;
          font-size: 1rem;
          max-width: 480px;
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
        .brand-icon { color: var(--color-accent); }
        .brand-text { font-size: 1.5rem; letter-spacing: 0.08em; }

        .auth-heading {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .auth-subheading {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 0.95rem;
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
        .with-icon {
          padding-left: 2.75rem;
        }
        .toggle-eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .auth-footer-text {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .auth-link {
          font-weight: 700;
          color: var(--color-primary);
        }

        @media (max-width: 900px) {
          .auth-split-layout { grid-template-columns: 1fr; }
          .auth-banner-col { display: none; }
        }
      `}</style>
    </div>
  );
};
