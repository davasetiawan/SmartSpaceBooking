import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        {/* Top Newsletter & Brand Section */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Building2 size={24} className="logo-icon-gold" />
              <span className="font-serif footer-title">SONDER</span>
            </div>
            <p className="footer-tagline">
              Ruang kerja & ruang rapat pilihan untuk profesional, tim kreatif, dan eksekutif. Nikmati kenyamanan kerja setara hotel bintang 5.
            </p>
            <div className="system-status">
              <span className="status-dot"></span>
              <span className="status-text">Semua Sistem Beroperasi Normal (99.9% Uptime)</span>
            </div>
          </div>

          <div className="newsletter-col">
            <h4 className="newsletter-title font-serif">Dapatkan Penawaran Eksklusif Sonder</h4>
            <p className="newsletter-desc">Langganan newsletter mingguan untuk informasi diskon ruang rapat & akses event spesial.</p>
            
            {subscribed ? (
              <div className="subscribed-success">
                <CheckCircle2 size={18} /> Terima kasih! Anda telah terdaftar dalam buletin Sonder.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Masukkan alamat email Anda" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-accent btn-sm newsletter-btn">
                  Berlangganan <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div className="footer-col">
            <h5 className="col-heading">Kategori Ruangan</h5>
            <ul className="footer-links">
              <li><Link to="/ruangan?tipe=MEETING_ROOM">Executive Meeting Room</Link></li>
              <li><Link to="/ruangan?tipe=COWORKING_DESK">Hot Desk & Quiet Zone</Link></li>
              <li><Link to="/ruangan?tipe=PRIVATE_OFFICE">Private Office Suite</Link></li>
              <li><Link to="/ruangan?tipe=EVENT_SPACE">Grand Event Hall</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Lokasi Favorit</h5>
            <ul className="footer-links">
              <li><Link to="/ruangan?lokasi=Jakarta">Jakarta Selatan — Senopati</Link></li>
              <li><Link to="/ruangan?lokasi=SCBD">SCBD Financial Center</Link></li>
              <li><Link to="/ruangan?lokasi=Bandung">Bandung — Dago Hub</Link></li>
              <li><Link to="/ruangan?lokasi=Bali">Bali — Canggu Workspace</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Dukungan & Layanan</h5>
            <ul className="footer-links">
              <li><Link to="/scanner">Akses QR Check-In</Link></li>
              <li><Link to="/reservasi">Status Reservasi Anda</Link></li>
              <li><a href="#faq">Panduan & Syarat Ketentuan</a></li>
              <li><a href="#bantuan">Pusat Bantuan 24/7</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Keamanan & Layanan</h5>
            <div className="security-badge-box">
              <ShieldCheck size={28} className="shield-icon" />
              <div>
                <div className="security-title">SSL Encrypted Booking</div>
                <div className="security-desc">Pemesanan aman & terverifikasi langsung dengan sistem QR E-Ticket instant.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Sonder Smart Space Booking. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="footer-extra-links">
            <a href="#privacy">Kebijakan Privasi</a>
            <span>&bull;</span>
            <a href="#terms">Syarat & Ketentuan</a>
            <span>&bull;</span>
            <span className="made-with">Dibuat dengan <Heart size={12} className="heart-icon" /> untuk kenyamanan kerja Anda</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background-color: var(--bg-footer);
          color: var(--text-inverse);
          padding: 4rem 0 2rem 0;
          border-top: 1px solid var(--border-color-dark);
          margin-top: 4rem;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border-color-dark);
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .logo-icon-gold {
          color: var(--color-accent);
        }
        .footer-title {
          font-size: 1.75rem;
          letter-spacing: 0.1em;
          color: #ffffff;
        }
        .footer-tagline {
          color: #A0A0B8;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 1.25rem;
        }

        .system-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.05);
          padding: 0.35rem 0.85rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }
        .status-text {
          font-size: 0.775rem;
          color: #D1D5DB;
        }

        .newsletter-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .newsletter-desc {
          color: #A0A0B8;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color-dark);
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          outline: none;
        }
        .newsletter-input:focus {
          border-color: var(--color-accent);
          background: rgba(255,255,255,0.12);
        }
        .subscribed-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          padding: 3rem 0;
          border-bottom: 1px solid var(--border-color-dark);
        }

        .col-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a {
          color: #A0A0B8;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-links a:hover {
          color: var(--color-accent);
        }

        .security-badge-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(255,255,255,0.04);
          padding: 1rem;
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .shield-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .security-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }
        .security-desc {
          font-size: 0.75rem;
          color: #A0A0B8;
          line-height: 1.4;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.825rem;
          color: #A0A0B8;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-extra-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-extra-links a {
          color: #A0A0B8;

        }
        .footer-extra-links a:hover {
          color: #ffffff;
        }
        .made-with {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .heart-icon {
          color: #EF4444;
          fill: #EF4444;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};
