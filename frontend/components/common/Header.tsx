'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  QrCode,
  Search,
  MapPin,
  Heart
} from 'lucide-react';
import { getCurrentUser, removeAuthToken, setCurrentUser } from '@/services/api';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const user = getCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    router.push('/');
    window.location.reload();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sd-header" id="header">
      {/* Top Announcement Bar — Sonder Style */}
      {!announcementDismissed && (
        <div className="top-announcement" id="topAnnouncement">
          <button 
            className="announcement-close" 
            onClick={() => setAnnouncementDismissed(true)} 
            aria-label="Close announcement"
          >
            ×
          </button>
          <div className="top-announcement-wrap">
            <span className="announcement-badge">
              <Sparkles size={11} /> SONDER WORKSPACES
            </span>
            <span>
              TravelAI acquires Sonder brand. Experience curated urban spaces worldwide &rarr;{' '}
            </span>
            <Link href="/ruangan" className="announcement-link">
              Read press release
            </Link>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="header-container">
        <nav className="sd-nav-container">
          {/* Logo Sonder */}
          <Link href="/" className="logo-wrap">
            <div className="sd-logo-box">
              <Building2 size={20} className="sd-logo-icon" />
            </div>
            <div className="sd-logo-text-wrap">
              <span className="sd-logo-brand font-serif">Sonder</span>
              <span className="sd-logo-sub">WORKSPACES</span>
            </div>
          </Link>

          {/* Primary Navigation Links */}
          <div className="sd-nav-desktop">
            <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Stays & Spaces
            </Link>

            {/* Dropdown Menu */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link href="/ruangan" className={`nav-link ${isActive('/ruangan') ? 'active' : ''}`}>
                Space Types <ChevronDown size={13} className={`arrow-icon ${isDropdownOpen ? 'rotated' : ''}`} />
              </Link>

              {isDropdownOpen && (
                <div className="sd-nav-dropdown">
                  <div className="nd-grid">
                    <div className="nd-col">
                      <div className="nd-col-h">Space Categories</div>
                      <ul className="nd-links">
                        <li><Link href="/ruangan?tipe=COWORKING_DESK">Hot Desks & Open Lounge</Link></li>
                        <li><Link href="/ruangan?tipe=MEETING_ROOM">Executive Meeting Rooms</Link></li>
                        <li><Link href="/ruangan?tipe=PRIVATE_OFFICE">Private Office Suites</Link></li>
                        <li><Link href="/ruangan?tipe=EVENT_SPACE">Event Halls & Auditoriums</Link></li>
                      </ul>
                    </div>

                    <a href="/ruangan" className="nd-feature">
                      <span className="nd-feature-media">
                        <img 
                          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80" 
                          alt="Featured Space" 
                        />
                      </span>
                      <span className="nd-feature-body">
                        <span className="nd-feature-tag">Editors' Pick</span>
                        <span className="nd-feature-title">Spaces booked by our community this week</span>
                        <span className="nd-feature-cta">Browse all spaces &rarr;</span>
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Link href="/reservasi" className={`nav-link ${isActive('/reservasi') ? 'active' : ''}`}>
              My Bookings
            </Link>

            <Link href="/scanner" className={`nav-link nav-link-concierge ${isActive('/scanner') ? 'active' : ''}`}>
              <QrCode size={15} /> Sonder Scanner
              <span className="nav-beta">BETA</span>
            </Link>
          </div>

          {/* Right Header Actions (My Trips / User Profile / Mobile Toggle) */}
          <div className="ham-wrap">
            <Link href="/reservasi" className="btn-traveler">
              <span className="bt-glow"></span>
              <span className="bt-label">
                <Sparkles size={14} className="bt-spark" />
                <span className="bt-word">My Trips</span>
              </span>
            </Link>

            {user ? (
              <div className="user-profile-pill">
                <Link href={user.role === 'ADMIN' ? '/admin' : '/profil'} className="user-info-btn">
                  <div className="user-avatar">{user.nama.charAt(0).toUpperCase()}</div>
                  <span className="user-name">{user.nama}</span>
                  {user.role === 'ADMIN' && <span className="admin-badge">ADMIN</span>}
                </Link>
                <button onClick={handleLogout} className="logout-btn" title="Sign out">
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link href="/login" className="btn-login-link">Sign In</Link>
                <Link href="/register" className="btn-register-pill">Book Now</Link>
              </div>
            )}

            <button 
              className="burger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="mm-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mm-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mm-head">
              <span className="font-serif mm-brand">Sonder</span>
              <button className="mm-close" onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            <div className="mm-body">
              <div className="mm-nav">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}><span>Stays & Spaces</span><span>&rarr;</span></Link>
                <Link href="/ruangan" onClick={() => setIsMobileMenuOpen(false)}><span>Explore All Spaces</span><span>&rarr;</span></Link>
                <Link href="/reservasi" onClick={() => setIsMobileMenuOpen(false)}><span>My Bookings</span><span>&rarr;</span></Link>
                <Link href="/scanner" onClick={() => setIsMobileMenuOpen(false)}><span>Sonder Scanner (BETA)</span><span>&rarr;</span></Link>
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}><span>Admin Dashboard</span><span>&rarr;</span></Link>
                )}
              </div>
              <div className="mm-footer">
                {user ? (
                  <button onClick={handleLogout} className="btn-logout-full">Sign Out</button>
                ) : (
                  <div className="mm-auth-grid">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="mm-btn-light">Sign In</Link>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="mm-btn-dark">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sd-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          border-bottom: 1px solid #EAE6DF;
          font-family: var(--font-sans);
        }

        .top-announcement {
          background-color: #F5F0EB;
          border-bottom: 1px solid #E5DFD5;
          padding: 0.45rem 1.5rem;
          font-size: 0.8rem;
          color: #333333;
          position: relative;
          text-align: center;
        }
        .announcement-close {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: #666666;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .top-announcement-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .announcement-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #1A1A2E;
          color: #C9A96E;
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          font-size: 0.675rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .announcement-link {
          font-weight: 700;
          color: #1A1A2E;
          text-decoration: underline;
        }

        .header-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .sd-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .sd-logo-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #1A1A2E;
          color: #C9A96E;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sd-logo-brand {
          font-size: 1.6rem;
          color: #1A1A2E;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .sd-logo-sub {
          font-size: 0.6rem;
          font-weight: 800;
          color: #C9A96E;
          letter-spacing: 0.22em;
          display: block;
          margin-top: 1px;
        }

        .sd-nav-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2D2D2D;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0;
          transition: color 200ms ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #C9A96E;
        }
        .nav-link-concierge {
          color: #1A1A2E;
        }
        .nav-beta {
          font-size: 0.6rem;
          font-weight: 800;
          background: #F3EAD8;
          color: #926E28;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .nav-item-dropdown {
          position: relative;
        }
        .sd-nav-dropdown {
          position: absolute;
          top: 100%;
          left: -20px;
          width: 520px;
          background: #ffffff;
          border: 1px solid #E8E4DF;
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          padding: 1.25rem;
          margin-top: 0.5rem;
        }
        .nd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .nd-col-h {
          font-size: 0.725rem;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }
        .nd-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .nd-links a {
          font-size: 0.875rem;
          font-weight: 600;
          color: #222222;
          text-decoration: none;
        }
        .nd-links a:hover {
          color: #C9A96E;
        }

        .nd-feature {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          background: #FAFAF7;
          border: 1px solid #EAE6DF;
          text-decoration: none;
        }
        .nd-feature-media {
          height: 110px;
          overflow: hidden;
        }
        .nd-feature-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nd-feature-body {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .nd-feature-tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: #C9A96E;
          text-transform: uppercase;
        }
        .nd-feature-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1A1A2E;
          line-height: 1.3;
        }
        .nd-feature-cta {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1A1A2E;
          margin-top: 0.25rem;
        }

        .ham-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-traveler {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          background: #1A1A2E;
          color: #ffffff;
          text-decoration: none;
          font-size: 0.825rem;
          font-weight: 700;
          overflow: hidden;
          transition: transform 200ms ease;
        }
        .btn-traveler:hover {
          transform: scale(1.03);
        }
        .bt-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(201, 169, 110, 0.4), transparent 70%);
        }
        .bt-label {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #ffffff;
        }
        .bt-spark {
          color: #C9A96E;
        }

        .user-profile-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FAFAF7;
          border: 1px solid #E5E1D8;
          padding: 0.2rem 0.3rem 0.2rem 0.75rem;
          border-radius: 999px;
        }
        .user-info-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          text-decoration: none;
        }
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1A1A2E;
          color: #C9A96E;
          font-weight: 800;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1A1A2E;
        }
        .admin-badge {
          background: #C9A96E;
          color: #ffffff;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 0.1rem 0.35rem;
          border-radius: 999px;
        }
        .logout-btn {
          color: #777777;
          padding: 0.35rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logout-btn:hover {
          color: #DC2626;
          background: rgba(220,38,38,0.1);
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .btn-login-link {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1A1A2E;
          text-decoration: none;
        }
        .btn-register-pill {
          font-size: 0.85rem;
          font-weight: 700;
          background: #1A1A2E;
          color: #ffffff;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .btn-register-pill:hover {
          background: #2E2E4A;
        }

        .burger-btn {
          display: none;
          padding: 0.5rem;
          color: #1A1A2E;
        }

        .mm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }
        .mm-panel {
          width: 85%;
          max-width: 360px;
          background: #ffffff;
          height: 100%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .mm-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #EAE6DF;
        }
        .mm-brand {
          font-size: 1.75rem;
          color: #1A1A2E;
        }
        .mm-body {
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          flex: 1;
        }
        .mm-nav {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .mm-nav a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1A1A2E;
          text-decoration: none;
        }

        @media (max-width: 960px) {
          .sd-nav-desktop, .auth-buttons, .btn-traveler {
            display: none;
          }
          .burger-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

