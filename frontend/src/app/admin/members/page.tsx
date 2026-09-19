'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Member } from '@/lib/mockData';

export default function AdminMembersPage() {
  const { members: fallbackMembers } = useSpaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [backendMembers, setBackendMembers] = useState<any[]>([]);

  React.useEffect(() => {
    import('@/lib/api').then(({ fetchAdminMembers }) => {
      fetchAdminMembers(searchQuery)
        .then((data) => setBackendMembers(data))
        .catch(() => {});
    });
  }, [searchQuery]);

  const displayMembers: Member[] = backendMembers.length > 0 ? backendMembers.map((m: any) => ({
    id: String(m.id),
    name: m.nama_member,
    email: m.users?.email || 'member@example.com',
    phone: m.telp,
    avatarUrl: m.foto ? (m.foto.startsWith('http') ? m.foto : `http://localhost:3001/uploads/members/${m.foto}`) : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tier: m.instansi || 'Member',
    totalBookings: m.reservasi?.length || 0,
    lifetimeSpend: m.reservasi?.reduce((s: number, r: any) => s + (r.total_bayar || 0), 0) || 0,
    status: 'active',
    joinedDate: new Date(m.created_at).toISOString().split('T')[0]
  })) : fallbackMembers;

  const filteredMembers = displayMembers.filter(m => {
    const matchTier = tierFilter === 'all' || m.tier === tierFilter;
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTier && matchSearch;
  });

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                GUEST &amp; MEMBER DIRECTORY
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Direktori Anggota &amp; Tamu
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Kelola profil tamu terverifikasi, riwayat keanggotaan, dan hak akses digital keycard.
              </p>
            </div>

            <button
              onClick={() => alert('Anggota baru berhasil diundang.')}
              className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Undang Member Baru</span>
            </button>
          </div>

          {/* 4-Card Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL TERDAFTAR</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">{displayMembers.length * 46} Member</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">94% Profil Terverifikasi</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">AKUN KORPORAT</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">42 Studio</div>
              <span className="text-[10px] font-mono text-[#747878]">Architecture &amp; Tech</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">MEMBER BARU BULAN INI</span>
              <div className="font-serif text-2xl font-bold text-[#4A6B5D]">+24 Member</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">+14.2% MoM Intake</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">DIGITAL PASS TERBIT</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">129 Pass</div>
              <span className="text-[10px] font-mono text-[#747878]">Active Keycards</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari Nama, Email, No. Telp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#747878]">Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] cursor-pointer"
              >
                <option value="all">Semua Tier Keanggotaan</option>
                <option value="Architect">Architect</option>
                <option value="Resident">Resident</option>
                <option value="Atelier">Atelier</option>
                <option value="Nomad">Nomad</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Anggota / Profil</th>
                    <th className="py-3.5 px-6">Kontak Email / Telp</th>
                    <th className="py-3.5 px-6">Tier Keanggotaan</th>
                    <th className="py-3.5 px-6">Total Booking</th>
                    <th className="py-3.5 px-6">Total Belanja (LTV)</th>
                    <th className="py-3.5 px-6">Bergabung Sejak</th>
                    <th className="py-3.5 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-[#fbf9f5]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#EBE7DF]"
                          />
                          <div>
                            <span className="font-sans font-bold text-sm text-[#121212] block">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-[#747878]">ID: {member.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-[#5e5e5e]">
                        <div>{member.email}</div>
                        <div className="text-[11px] text-[#747878]">{member.phone}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-[#121212] text-white text-[10px] font-bold">
                          {member.tier}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        {member.totalBookings} Sesi
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        Rp {member.lifetimeSpend.toLocaleString('id-ID')}
                      </td>

                      <td className="py-4 px-6 text-[#5e5e5e]">
                        {member.joinedDate}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-[10px] font-bold uppercase">
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
