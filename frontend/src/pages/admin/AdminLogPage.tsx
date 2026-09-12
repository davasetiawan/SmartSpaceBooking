import React, { useState } from 'react';
import { Activity, ShieldCheck, UserCheck, CalendarCheck, Search, Filter } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

const MOCK_LOGS: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-09-12 10:30:15',
    user: 'admin_space',
    role: 'ADMIN',
    action: 'CHECK_IN_GUEST',
    details: 'Melakukan 1-Click QR Check-In untuk Reservasi #BOOK-20260908-881 (Alexander Wright)',
    ipAddress: '192.168.1.10',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-09-12 09:15:42',
    user: 'alexander_w',
    role: 'MEMBER',
    action: 'CREATE_RESERVASI',
    details: 'Membuat booking Sonder Grand Suite (Meeting Room A) untuk 2026-09-15 09:00 - 12:00',
    ipAddress: '180.252.32.14',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-09-12 08:45:00',
    user: 'admin_space',
    role: 'ADMIN',
    action: 'UPDATE_PROMO',
    details: 'Menambahkan kode promo PROMOSEPTEMBER (Diskon 20%)',
    ipAddress: '192.168.1.10',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-09-11 17:20:10',
    user: 'guest_user',
    role: 'PUBLIC',
    action: 'LOGIN_FAILED',
    details: 'Percobaan login gagal dengan username invalid_user',
    ipAddress: '114.124.55.89',
    status: 'WARNING'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-09-11 14:10:05',
    user: 'admin_space',
    role: 'ADMIN',
    action: 'CONFIRM_RESERVASI',
    details: 'Menyetujui status reservasi #BOOK-20260908-412',
    ipAddress: '192.168.1.10',
    status: 'SUCCESS'
  }
];

export const AdminLogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredLogs = MOCK_LOGS.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-log-page">
      <div className="page-header mb-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary">Log Aktivitas & Audit Trail</h1>
          <p className="text-secondary text-sm">Riwayat aktivitas sistem, autentikasi, dan transaksi pengguna real-time.</p>
        </div>
      </div>

      <div className="filter-bar mb-4">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Cari user, aksi, atau detail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-select">
          <Filter size={16} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">Semua Status Log</option>
            <option value="SUCCESS">Success</option>
            <option value="WARNING">Warning</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User & Role</th>
              <th>Aksi</th>
              <th>Detail Aktivitas</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="font-mono text-sm">{log.timestamp}</td>
                <td>
                  <div className="user-info">
                    <strong>{log.user}</strong>
                    <span className="role-tag">{log.role}</span>
                  </div>
                </td>
                <td>
                  <span className="action-tag">{log.action}</span>
                </td>
                <td>{log.details}</td>
                <td className="font-mono text-sm">{log.ipAddress}</td>
                <td>
                  <span className={`status-badge ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-log-page {
          padding: 1.5rem;
        }
        .filter-bar {
          display: flex;
          gap: 1rem;
        }
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          padding: 0.5rem 0.85rem;
        }
        .search-box input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }
        .filter-select {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          padding: 0.5rem 0.85rem;
        }
        .filter-select select {
          border: none;
          outline: none;
          font-size: 0.9rem;
          background: transparent;
        }
        .table-container {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .log-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .log-table th {
          background: #F9FAFB;
          padding: 0.85rem 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #374151;
          border-bottom: 1px solid #E5E7EB;
          text-transform: uppercase;
        }
        .log-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #F3F4F6;
          font-size: 0.875rem;
          color: #111827;
        }
        .user-info {
          display: flex;
          flex-direction: column;
        }
        .role-tag {
          font-size: 0.7rem;
          color: #6B7280;
          font-weight: 600;
        }
        .action-tag {
          background: #F3F4F6;
          color: #1F2937;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.8rem;
        }
        .status-badge {
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .status-badge.success {
          background: #D1FAE5;
          color: #065F46;
        }
        .status-badge.warning {
          background: #FEF3C7;
          color: #92400E;
        }
        .status-badge.failed {
          background: #FEE2E2;
          color: #991B1B;
        }
      `}</style>
    </div>
  );
};
