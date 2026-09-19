'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Booking } from '@/lib/mockData';

export default function AdminReservationsPage() {
  const { bookings, updateBookingStatus } = useSpaceStore();
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  type StatusFilter = typeof statusFilter;

  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);

  const filtered = bookings.filter((b) => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchSearch =
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.spaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.assignedSeat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
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
                MASTER AUDIT &amp; FOLIO MONITORING
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Monitoring &amp; Audit Reservasi
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Pantau seluruh siklus hidup booking, validasi kunci digital, dan rekam jejak pembayaran tamu.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Master CSV Ledger telah diexport.')}
                className="px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-mono font-semibold text-[#121212] hover:bg-[#fbf9f5] flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* 4-Card KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL BOOKING TERCATAT</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">{bookings.length} Reservasi</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">+12% vs minggu lalu</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL REVENUE SETTLED</span>
              <div className="font-mono text-xl font-bold text-[#121212]">Rp {totalRevenue.toLocaleString('id-ID')}</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">100% Verified</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">PAS AKTIF / IN SESSION</span>
              <div className="font-serif text-2xl font-bold text-[#4A6B5D]">
                {bookings.filter(b => b.status === 'active').length} Tamu
              </div>
              <span className="text-[10px] font-mono text-[#747878]">Pintu Terbuka</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">MENUNGGU VALIDASI</span>
              <div className="font-serif text-2xl font-bold text-[#C88A2B]">
                {bookings.filter(b => b.status === 'pending').length} Tamu
              </div>
              <span className="text-[10px] font-mono text-[#C88A2B]">Menunggu Check-in</span>
            </div>
          </div>

          {/* Filter & Search */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-80 relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Cari Kode Booking, Nama Tamu, Seat ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#fbf9f5] rounded-full border border-[#EBE7DF]">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'pending', label: 'Menunggu' },
                  { id: 'active', label: 'Aktif' },
                  { id: 'finished', label: 'Selesai' },
                  { id: 'cancelled', label: 'Dibatalkan' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as StatusFilter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                      statusFilter === tab.id
                        ? 'bg-[#121212] text-white font-bold shadow-sm'
                        : 'text-[#747878] hover:text-[#121212]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Master Ledger Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Kode Booking</th>
                    <th className="py-3.5 px-6">Identitas Tamu</th>
                    <th className="py-3.5 px-6">Ruang &amp; Sesi</th>
                    <th className="py-3.5 px-6">Seat ID / PIN</th>
                    <th className="py-3.5 px-6">Total Tarif</th>
                    <th className="py-3.5 px-6">Status Reservasi</th>
                    <th className="py-3.5 px-6 text-center">Aksi Override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {filtered.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#fbf9f5]/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#121212]">
                        <Link href={`/admin/reservations/${booking.id}`} className="hover:text-[#4A6B5D] hover:underline">
                          {booking.bookingCode}
                        </Link>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-sans font-bold text-sm text-[#121212]">{booking.guestName}</div>
                        <div className="text-[11px] text-[#747878]">{booking.guestEmail}</div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-sans font-semibold text-[#121212]">{booking.spaceName}</div>
                        <div className="text-[11px] text-[#747878]">{booking.date} &bull; {booking.timeSlot}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat}</span>
                        <span className="text-[#747878] block text-[10px]">PIN: {booking.keycardPin}</span>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        Rp {booking.totalAmount.toLocaleString('id-ID')}
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase cursor-pointer border ${
                            booking.status === 'active'
                              ? 'bg-[#4A6B5D]/10 text-[#4A6B5D] border-[#4A6B5D]/30'
                              : booking.status === 'pending'
                              ? 'bg-[#C88A2B]/10 text-[#C88A2B] border-[#C88A2B]/30'
                              : booking.status === 'finished'
                              ? 'bg-[#333333]/10 text-[#333333] border-[#333333]/30'
                              : 'bg-[#9E3B3B]/10 text-[#9E3B3B] border-[#9E3B3B]/30'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="finished">Finished</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <Link
                          href={`/admin/reservations/${booking.id}`}
                          className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] hover:bg-[#121212] hover:text-white transition-colors text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          <span>Folio</span>
                        </Link>
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
