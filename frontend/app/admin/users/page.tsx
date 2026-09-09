'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, Award } from 'lucide-react';
import { User as UserType } from '@/services/api';

export default function AdminUsersPage() {
  const [userList, setUserList] = useState<UserType[]>([
    { id: 'usr-1', nama: 'Alexander Wright', email: 'alex@example.com', role: 'MEMBER', telepon: '+62 812-3456-7890' },
    { id: 'usr-2', nama: 'Sophia Loren', email: 'sophia@example.com', role: 'MEMBER', telepon: '+62 813-9876-5432' },
    { id: 'usr-3', nama: 'Admin Sonder Hub', email: 'admin@sonder.com', role: 'ADMIN', telepon: '+62 811-1111-2222' },
  ]);

  const [search, setSearch] = useState('');

  const toggleRole = (id: string) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, role: u.role === 'ADMIN' ? 'MEMBER' : 'ADMIN' } : u));
  };

  const filtered = userList.filter(u => u.nama.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-users-root">
      <div className="page-header">
        <h1 className="font-serif page-title">Kelola Pengguna / Member</h1>
        <p className="page-desc">Daftar member terdaftar, pengaturan role akses (Admin / Member), dan verifikasi akun.</p>
      </div>

      <div className="filter-bar sonder-card mb-2">
        <div className="search-field-box">
          <Search size={16} className="s-icon" />
          <input 
            type="text" 
            placeholder="Cari pengguna berdasarkan nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Pengguna</th>
              <th>Email</th>
              <th>Nomor Telepon</th>
              <th>Role Sistem</th>
              <th>Aksi Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-name-cell">
                    <div className="avatar-circle">{u.nama.charAt(0)}</div>
                    <strong>{u.nama}</strong>
                  </div>
                </td>
                <td>{u.email}</td>
                <td className="font-mono">{u.telepon}</td>
                <td>
                  {u.role === 'ADMIN' ? (
                    <span className="badge-pill badge-approved"><ShieldCheck size={12} /> ADMIN</span>
                  ) : (
                    <span className="badge-pill badge-completed"><Award size={12} /> MEMBER</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => toggleRole(u.id)}>
                    Ubah Ke {u.role === 'ADMIN' ? 'Member' : 'Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .admin-users-root { padding-bottom: 2rem; }
        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 2.25rem; color: var(--color-primary); }
        .user-name-cell { display: flex; align-items: center; gap: 0.75rem; }
        .avatar-circle { width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: var(--text-inverse); font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .mb-2 { margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
}
