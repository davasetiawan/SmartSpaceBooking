'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { api, Ruangan } from '@/services/api';

export default function AdminRuanganPage() {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form States
  const [nama, setNama] = useState('');
  const [tipe, setTipe] = useState<'MEETING_ROOM' | 'COWORKING_DESK' | 'PRIVATE_OFFICE' | 'EVENT_SPACE'>('MEETING_ROOM');
  const [kapasitas, setKapasitas] = useState(10);
  const [hargaPerJam, setHargaPerJam] = useState(150000);
  const [lokasi, setLokasi] = useState('Lantai 2 North');
  const [deskripsi, setDeskripsi] = useState('');

  useEffect(() => {
    api.getRuangan().then(setRuanganList);
  }, []);

  const handleAddRuangan = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom: Ruangan = {
      id: `ruang-${Date.now()}`,
      nama,
      slug: nama.toLowerCase().replace(/\s+/g, '-'),
      tipe,
      kapasitas,
      hargaPerJam,
      hargaPerHari: hargaPerJam * 8,
      deskripsi: deskripsi || 'Ruangan kerja premium dengan standar Sonder.',
      fasilitas: ['Wi-Fi High-Speed', 'Power Outlet', 'Coffee Station'],
      gambarUrl: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
      lokasi,
      isAktif: true,
      rating: 5.0
    };

    setRuanganList(prev => [newRoom, ...prev]);
    setIsAddModalOpen(false);
    setNama('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
      setRuanganList(prev => prev.filter(r => r.id !== id));
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="admin-ruangan-root">
      <div className="page-header flex-between">
        <div>
          <h1 className="font-serif page-title">Kelola Ruangan Sonder</h1>
          <p className="page-desc">Tambah ruangan baru, atur tarif sewa per jam, fasilitas, dan status ketersediaan.</p>
        </div>

        <button className="btn btn-primary btn-md" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Tambah Ruangan Baru
        </button>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ruangan</th>
              <th>Tipe</th>
              <th>Kapasitas</th>
              <th>Tarif Per Jam</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Aksi Admin</th>
            </tr>
          </thead>
          <tbody>
            {ruanganList.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="room-cell">
                    <img src={r.gambarUrl[0]} alt={r.nama} className="room-thumb" />
                    <div>
                      <strong>{r.nama}</strong>
                      <small>{r.deskripsi.slice(0, 40)}...</small>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-completed">{r.tipe}</span></td>
                <td className="font-mono">{r.kapasitas} Orang</td>
                <td className="font-mono">{formatRupiah(r.hargaPerJam)}</td>
                <td>{r.lokasi}</td>
                <td>
                  {r.isAktif ? (
                    <span className="badge-pill badge-approved"><CheckCircle2 size={12} /> Aktif</span>
                  ) : (
                    <span className="badge-pill badge-rejected"><XCircle size={12} /> Nonaktif</span>
                  )}
                </td>
                <td>
                  <div className="action-row">
                    <button className="btn-action edit" title="Edit Ruangan"><Edit2 size={14} /></button>
                    <button className="btn-action delete" title="Hapus Ruangan" onClick={() => handleDelete(r.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="font-serif">Tambah Ruangan Baru Sonder</h3>
              <button onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddRuangan} className="modal-body">
              <div className="form-group">
                <label className="form-label">Nama Ruangan</label>
                <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Tipe Ruangan</label>
                  <select className="form-control" value={tipe} onChange={(e) => setTipe(e.target.value as any)}>
                    <option value="MEETING_ROOM">Meeting Room</option>
                    <option value="COWORKING_DESK">Hot Desk</option>
                    <option value="PRIVATE_OFFICE">Private Office</option>
                    <option value="EVENT_SPACE">Event Space</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kapasitas (Orang)</label>
                  <input type="number" className="form-control" value={kapasitas} onChange={(e) => setKapasitas(parseInt(e.target.value, 10))} required />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Harga Per Jam (Rp)</label>
                  <input type="number" className="form-control" value={hargaPerJam} onChange={(e) => setHargaPerJam(parseInt(e.target.value, 10))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Lokasi</label>
                  <input type="text" className="form-control" value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
                </div>
              </div>

              <div className="modal-actions mt-2">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsAddModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary btn-sm">Simpan Ruangan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-ruangan-root { padding-bottom: 2rem; }
        .flex-between { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1.5rem; }

        .room-cell { display: flex; align-items: center; gap: 0.75rem; }
        .room-thumb { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }

        .action-row { display: flex; gap: 0.35rem; }
        .btn-action { padding: 0.35rem; border-radius: 6px; border: 1px solid var(--border-color); background: #ffffff; cursor: pointer; }
        .btn-action.delete { color: #DC2626; }
      `}</style>
    </div>
  );
}
