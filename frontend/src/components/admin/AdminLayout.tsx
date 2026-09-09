import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Users, 
  QrCode, 
  FileSpreadsheet, 
  Settings, 
  Activity, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { getCurrentUser, removeAuthToken, setCurrentUser } from '../../services/api';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    navigate('/login');
    window.location.reload();
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-app-wrapper">
      {/* Admin Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-brand">
            <Building2 size={24} className="brand-gold-icon" />
            {!sidebarCollapsed && <span className="font-serif brand-text">SONDER ADMIN</span>}
          </Link>
        </div>

        <div className="sidebar-menu">
          <div className="menu-label font-mono">{!sidebarCollapsed && 'MANAJEMEN UTAMA'}</div>
          
          <Link to="/admin" className={`menu-item ${isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            {!sidebarCollapsed && <span>Dashboard Overview</span>}
          </Link>

          <Link to="/admin/reservasi" className={`menu-item ${isActive('/admin/reservasi') ? 'active' : ''}`}>
            <CalendarCheck size={18} />
            {!sidebarCollapsed && <span>Kelola Reservasi</span>}
          </Link>

          <Link to="/admin/ruangan" className={`menu-item ${isActive('/admin/ruangan') ? 'active' : ''}`}>
            <Building2 size={18} />
            {!sidebarCollapsed && <span>Kelola Ruangan</span>}
          </Link>

          <Link to="/admin/users" className={`menu-item ${isActive('/admin/users') ? 'active' : ''}`}>
            <Users size={18} />
            {!sidebarCollapsed && <span>Kelola Member</span>}
          </Link>

          <Link to="/admin/scanner" className={`menu-item ${isActive('/admin/scanner') ? 'active' : ''}`}>
            <QrCode size={18} />
            {!sidebarCollapsed && <span>QR Code Verifier</span>}
          </Link>

          <div className="menu-label font-mono mt-2">{!sidebarCollapsed && 'LAPORAN & SISTEM'}</div>

          <Link to="/admin/laporan" className={`menu-item ${isActive('/admin/laporan') ? 'active' : ''}`}>
            <FileSpreadsheet size={18} />
            {!sidebarCollapsed && <span>Laporan & Analitik</span>}
          </Link>

          <Link to="/admin/log" className={`menu-item ${isActive('/admin/log') ? 'active' : ''}`}>
            <Activity size={18} />
            {!sidebarCollapsed && <span>Log Aktivitas</span>}
          </Link>

          <Link to="/admin/pengaturan" className={`menu-item ${isActive('/admin/pengaturan') ? 'active' : ''}`}>
            <Settings size={18} />
            {!sidebarCollapsed && <span>Pengaturan Sistem</span>}
          </Link>
        </div>

        <div className="sidebar-footer">
          <Link to="/" className="btn-user-site">
            <ChevronRight size={16} /> {!sidebarCollapsed && 'Kembali ke Situs Member'}
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={16} /> {!sidebarCollapsed && 'Keluar Admin'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-container">
        {/* Top Navbar Header */}
        <header className="admin-header">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="toggle-sidebar-btn">
            <Menu size={20} />
          </button>

          <div className="header-right">
            <div className="notification-bell">
              <Bell size={18} />
              <span className="bell-badge">3</span>
            </div>

            <div className="admin-user-pill">
              <div className="admin-avatar">{user?.nama.charAt(0) || 'A'}</div>
              <div className="admin-meta">
                <span className="admin-name">{user?.nama || 'Administrator'}</span>
                <span className="admin-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="admin-content-body">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-app-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        .admin-sidebar {
          width: 260px;
          background-color: var(--bg-sidebar);
          color: var(--text-inverse);
          display: flex;
          flex-direction: column;
          transition: width var(--transition-normal);
          flex-shrink: 0;
          z-index: 50;
        }
        .admin-sidebar.collapsed {
          width: 80px;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color-dark);
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .brand-gold-icon { color: var(--color-accent); }
        .brand-text { font-size: 1.25rem; letter-spacing: 0.08em; color: #ffffff; }

        .sidebar-menu {
          flex: 1;
          padding: 1.25rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .menu-label {
          font-size: 0.675rem;
          color: #8B8B8B;
          letter-spacing: 0.1em;
          padding: 0.5rem 0.75rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          color: #A0A0B8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .menu-item:hover, .menu-item.active {
          background: rgba(201, 169, 110, 0.15);
          color: var(--color-accent);
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-color-dark);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .btn-user-site {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #A0A0B8;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .btn-logout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #EF4444;
          font-size: 0.8rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .admin-main-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-header {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }
        .toggle-sidebar-btn {
          color: var(--text-primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .notification-bell {
          position: relative;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .bell-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #EF4444;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-user-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .admin-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--color-accent);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-meta {
          display: flex;
          flex-direction: column;
        }
        .admin-name { font-weight: 700; font-size: 0.875rem; color: var(--text-primary); }
        .admin-role { font-size: 0.725rem; color: var(--text-secondary); }

        .admin-content-body {
          padding: 2rem;
          flex: 1;
        }
      `}</style>
    </div>
  );
};
