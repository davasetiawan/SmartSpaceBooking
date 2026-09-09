import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Check, 
  X, 
  PlayCircle, 
  CheckCheck, 
  Clock 
} from 'lucide-react';
import { api, Reservasi, ReservasiStatus } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminReservasiPage: React.FC = () => {
  const [reservasiList, setReservasiList] = useState<Reservasi[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedRejectRes, setSelectedRejectRes] = useState<Reservasi | null>(null);
  const [alasanPenolakan, setAlasanPenolakan] = useState('');

  useEffect(() => {
    api.getReservasi().then(setReservasiList);
  }, []);

  const handleApprove = (id: string) => {
    setReservasiList(prev => prev.map(r => r.id === id ? { ...r, status: 'DISETUJUI' } : r));
  };

  const handleConfirmReject = () => {
    if (selectedRejectRes) {
      setReservasiList(prev => prev.map(r => r.id === selectedRejectRes.id ? { 
        ...r, 
        status: 'DITOLAK', 
        alasanPenolakan: alasanPenolakan || 'Ruangan sedang dalam perbaikan / jadwal bertabrakan' 
      } : r));
      setSelectedRejectRes(null);
      setAlasanPenolakan('');
    }
  };

  const handleCheckIn = (id: string) => {
    setReservasiList(prev => prev.map(r => r.id === id ? { ...r, status: 'AKTIF', checkedInAt: new Date().toLocaleTimeString() } : r));
  };

  const handleCheckOut = (id: string) => {
    setReservasiList(prev => prev.map(r => r.id === id ? { ...r, status: 'SELESAI', checkedOutAt: new Date().toLocaleTimeString() } : r));
  };

  const filtered = reservasiList.filter(r => {
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchQuery = !searchQuery || 
      r.kodeBooking.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (r.user?.nama || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="admin-reservasi-root">
      <div className="page-header">
        <div>
          <h1 className="font-serif page-title">Kelola & Persetujuan Reservasi</h1>
          <p className="page-desc">Verifikasi reservasi pending, setujui/tolak pesanan, dan atur check-in/out ruangan.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-bar sonder-card">
        <div className="search-field-box">
          <Search size={16} className="s-icon" />
          <input 
            type="text" 
            placeholder="Cari kode booking atau nama member..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-status-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">Semua Status</option>
            <option value="BELUM_DIKONFIRMASI">Pending Approval</option>
            <option value="DISETUJUI">Disetujui</option>
            <option value="AKTIF">Sesi Aktif</option>
            <option value="SELESAI">Selesai</option>
            <option value="DITOLAK">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Kode Booking</th>
              <th>Pemesan / Member</th>
              <th>Ruangan</th>
              <th>Tanggal & Sesi</th>
              <th>Total Biaya</th>
              <th>Status</th>
              <th>Aksi Pengelolaan Admin</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((res) => (
              <tr key={res.id}>
                <td className="font-mono font-bold">{res.kodeBooking}</td>
                <td>
                  <div className="user-cell">
                    <strong>{res.user?.nama || 'Alexander Wright'}</strong>
                    <small>{res.user?.email || 'alex@example.com'}</small>
                  </div>
                </td>
                <td>{res.ruangan?.nama || 'Sonder Suite'}</td>
                <td>
                  <div className="time-cell">
                    <span>{res.tanggal}</span>
                    <small className="font-mono">{res.jamMulai} - {res.jamSelesai} ({res.durasiJam} Jam)</small>
                  </div>
                </td>
                <td className="font-mono">{formatRupiah(res.totalHarga)}</td>
                <td><StatusBadge status={res.status} /></td>
                <td>
                  <div className="action-buttons-cell">
                    {res.status === 'BELUM_DIKONFIRMASI' && (
                      <>
                        <button className="btn-icon approve" title="Setujui Booking" onClick={() => handleApprove(res.id)}>
                          <Check size={16} /> Setujui
                        </button>
                        <button className="btn-icon reject" title="Tolak Booking" onClick={() => setSelectedRejectRes(res)}>
                          <X size={16} /> Tolak
                        </button>
                      </>
                    )}

                    {res.status === 'DISETUJUI' && (
                      <button className="btn-icon checkin" title="Proses Check-In" onClick={() => handleCheckIn(res.id)}>
                        <PlayCircle size={16} /> Check-In
                      </button>
                    )}

                    {res.status === 'AKTIF' && (
                      <button className="btn-icon checkout" title="Proses Check-Out" onClick={() => handleCheckOut(res.id)}>
                        <CheckCheck size={16} /> Check-Out
                      </button>
                    )}

                    {res.status === 'SELESAI' && <span className="text-muted-sm">Selesai</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal Dialog */}
      {selectedRejectRes && (
        <div className="modal-overlay" onClick={() => setSelectedRejectRes(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="font-serif">Alasan Penolakan Reservasi</h3>
              <button onClick={() => setSelectedRejectRes(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <p className="reject-sub">Kode Booking: <strong>{selectedRejectRes.kodeBooking}</strong></p>
              <div className="form-group">
                <label className="form-label">Tuliskan Alasan Penolakan untuk Member</label>
                <textarea 
                  className="form-control" 
                  rows={4} 
                  placeholder="Contoh: Bukti pembayaran tidak valid / jadwal ruangan bentrok..."
                  value={alasanPenolakan}
                  onChange={(e) => setAlasanPenolakan(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedRejectRes(null)}>Batal</button>
              <button className="btn btn-primary btn-sm btn-danger" onClick={handleConfirmReject}>Konfirmasi Tolak</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-reservasi-root { padding-bottom: 2rem; }

        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 2.25rem; color: var(--color-primary); }
        .page-desc { color: var(--text-secondary); }

        .filter-bar {
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .search-field-box {
          position: relative;
          flex: 1;
        }
        .s-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
        .search-field-box input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
          outline: none;
        }

        .filter-status-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }
        .filter-status-group select {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
          font-weight: 600;
        }

        .user-cell, .time-cell {
          display: flex;
          flex-direction: column;
        }
        .user-cell small, .time-cell small {
          color: var(--text-secondary);
        }

        .action-buttons-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.775rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-icon.approve { background: #D1FAE5; color: #065F46; border: none; }
        .btn-icon.reject { background: #FEE2E2; color: #991B1B; border: none; }
        .btn-icon.checkin { background: #DBEAFE; color: #1E40AF; border: none; }
        .btn-icon.checkout { background: #F3F4F6; color: #1F2937; border: none; }

        .btn-danger { background: #DC2626; border-color: #DC2626; color: #ffffff; }
        .text-muted-sm { font-size: 0.8rem; color: var(--text-tertiary); }
      `}</style>
    </div>
  );
};
