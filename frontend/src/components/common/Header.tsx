import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  CalendarCheck, 
  QrCode, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Search,
  Bell
} from 'lucide-react';
import { getCurrentUser, removeAuthToken, setCurrentUser } from '../../services/api';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header-root">
      {/* Top Announcement Bar — Sonder Aesthetic */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-badge">
            <Sparkles size={12} /> SONDER EXPERIENCE
          </span>
          <span className="announcement-text">
            Ruang kerja & ruang rapat fleksibel dengan desain editorial premium. Bebas biaya pendaftaran.
          </span>
          <Link to="/ruangan" className="announcement-link">Jelajahi Ruangan &rarr;</Link>
        </div>
      </div>

      {/* Main Header Navigation */}
      <nav className="main-nav">
        <div className="container nav-container">
          {/* Logo Sonder Brand */}
          <Link to="/" className="brand-logo">
            <div className="logo-icon">
              <Building2 size={20} className="logo-svg" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title font-serif">SONDER</span>
              <span className="logo-subtitle">SMART SPACE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Beranda
            </Link>
            
            {/* Mega Dropdown Ruangan */}
            <div 
              className="dropdown-wrapper"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to="/ruangan" className={`nav-link dropdown-trigger ${isActive('/ruangan') ? 'active' : ''}`}>
                Ruangan <ChevronDown size={14} className={`arrow ${isDropdownOpen ? 'rotated' : ''}`} />
              </Link>

              {isDropdownOpen && (
                <div className="mega-dropdown">
                  <div className="dropdown-grid">
                    <Link to="/ruangan?tipe=MEETING_ROOM" className="dropdown-item">
                      <div className="dropdown-icon gold"><Building2 size={18} /></div>
                      <div>
                        <div className="dropdown-title">Meeting Rooms</div>
                        <div className="dropdown-desc">Kapasitas 4–20 orang dengan 4K Screen</div>
                      </div>
                    </Link>
                    <Link to="/ruangan?tipe=COWORKING_DESK" className="dropdown-item">
                      <div className="dropdown-icon teal"><UserIcon size={18} /></div>
                      <div>
                        <div className="dropdown-title">Hot Desk & Dedicated</div>
                        <div className="dropdown-desc">Meja kerja fleksibel di area quiet lounge</div>
                      </div>
                    </Link>
                    <Link to="/ruangan?tipe=PRIVATE_OFFICE" className="dropdown-item">
                      <div className="dropdown-icon navy"><ShieldCheck size={18} /></div>
                      <div>
                        <div className="dropdown-title">Private Office</div>
                        <div className="dropdown-desc">Kantor privat tim dengan akses kunci digital 24/7</div>
                      </div>
                    </Link>
                    <Link to="/ruangan?tipe=EVENT_SPACE" className="dropdown-item">
                      <div className="dropdown-icon gold"><Sparkles size={18} /></div>
                      <div>
                        <div className="dropdown-title">Event Space & Hall</div>
                        <div className="dropdown-desc">Aula panggung & sound system untuk seminar/gathering</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/reservasi" className={`nav-link ${isActive('/reservasi') ? 'active' : ''}`}>
              Riwayat Reservasi
            </Link>
            <Link to="/scanner" className={`nav-link ${isActive('/scanner') ? 'active' : ''}`}>
              <QrCode size={16} /> QR Scanner
            </Link>
          </div>

          {/* Right Action & User Profile Pill */}
          <div className="header-actions">
            {user ? (
              <div className="user-profile-pill">
                <Link to={user.role === 'ADMIN' ? '/admin' : '/profil'} className="user-info-btn">
                  <div className="user-avatar">{user.nama.charAt(0).toUpperCase()}</div>
                  <span className="user-name">{user.nama}</span>
                  {user.role === 'ADMIN' && <span className="admin-badge">ADMIN</span>}
                </Link>
                <button onClick={handleLogout} className="logout-btn" title="Keluar">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost btn-sm">Masuk</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Daftar Akun</Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="font-serif mobile-logo">SONDER</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            <div className="mobile-menu-links">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
              <Link to="/ruangan" onClick={() => setIsMobileMenuOpen(false)}>Jelajahi Ruangan</Link>
              <Link to="/reservasi" onClick={() => setIsMobileMenuOpen(false)}>Riwayat Reservasi</Link>
              <Link to="/scanner" onClick={() => setIsMobileMenuOpen(false)}>QR Code Scanner</Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="mobile-admin-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <LayoutDashboard size={16} /> Dashboard Admin
                </Link>
              )}
            </div>
            <div className="mobile-menu-footer">
              {user ? (
                <button onClick={handleLogout} className="btn btn-outline btn-full">
                  <LogOut size={16} /> Keluar Akun
                </button>
              ) : (
                <div className="mobile-auth-grid">
                  <Link to="/login" className="btn btn-outline btn-full" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
                  <Link to="/register" className="btn btn-primary btn-full" onClick={() => setIsMobileMenuOpen(false)}>Daftar</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles for Header Sonder Aesthetic */}
      <style>{`
        .header-root {
          position: sticky;
          top: 0;
          z-index: var(--z-header);
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
        }
        .announcement-bar {
          background-color: var(--bg-announcement);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.8rem;
          padding: 0.4rem 0;
        }
        .announcement-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .announcement-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--color-accent-light);
          color: var(--color-accent-hover);
          font-weight: 700;
          padding: 0.15rem 0.6rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.7rem;
          letter-spacing: 0.05em;
        }
        .announcement-text {
          color: var(--text-secondary);
        }
        .announcement-link {
          font-weight: 600;
          color: var(--color-primary);
        }

        .main-nav {
          padding: 0.85rem 0;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--color-primary);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-title {
          font-size: 1.35rem;
          color: var(--color-primary);
          letter-spacing: 0.08em;
          line-height: 1;
        }
        .logo-subtitle {
          font-size: 0.625rem;
          font-weight: 800;
          color: var(--color-accent);
          letter-spacing: 0.2em;
          display: block;
          margin-top: 2px;
        }

        .desktop-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color var(--transition-fast);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--color-primary);
        }

        .dropdown-wrapper {
          position: relative;
        }
        .dropdown-trigger .arrow {
          transition: transform var(--transition-fast);
        }
        .dropdown-trigger .arrow.rotated {
          transform: rotate(180deg);
        }

        .mega-dropdown {
          position: absolute;
          top: 100%;
          left: -20px;
          width: 480px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 1.25rem;
          margin-top: 0.5rem;
          animation: fadeIn 200ms ease-out forwards;
        }
        .dropdown-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .dropdown-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 0.75rem;
          border-radius: var(--border-radius-md);
          transition: background var(--transition-fast);
        }
        .dropdown-item:hover {
          background: var(--bg-secondary);
        }
        .dropdown-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dropdown-icon.gold { background: var(--color-accent-light); color: var(--color-accent-hover); }
        .dropdown-icon.teal { background: #EBF5F0; color: #10B981; }
        .dropdown-icon.navy { background: #EEF2FF; color: #3B82F6; }

        .dropdown-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .dropdown-desc {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .user-profile-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-secondary);
          padding: 0.25rem 0.35rem 0.25rem 0.85rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
        }
        .user-info-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--text-inverse);
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .admin-badge {
          background: var(--color-accent);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: var(--border-radius-pill);
        }
        .logout-btn {
          color: var(--text-secondary);
          padding: 0.35rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }
        .logout-btn:hover {
          background: rgba(220, 38, 38, 0.1);
          color: #DC2626;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-toggle-btn {
          display: none;
          color: var(--text-primary);
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          display: flex;
          justify-content: flex-end;
        }
        .mobile-menu-content {
          width: 80%;
          max-width: 320px;
          background: var(--bg-card);
          height: 100%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .mobile-logo {
          font-size: 1.5rem;
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .mobile-admin-link {
          color: var(--color-accent);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mobile-menu-footer {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .desktop-links, .auth-buttons {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
