'use client';

import React from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function AdminDashboardPage() {
  const { spaces, bookings, vouchers, members, updateBookingStatus } = useSpaceStore();

  const activeGuestsCount = bookings.filter(b => b.status === 'active').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);
  const activeSpacesCount = spaces.filter(s => s.isAvailable).length;
  const occupancyRate = Math.round((1 - (activeSpacesCount / spaces.length)) * 100);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      {/* Executive Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          
          {/* Top Operational Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                TELEMETRI OPERASIONAL SANCTUARY
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                WorkMates Executive Operations
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Monitoring okupansi real-time, validasi tamu check-in, dan analitik pendapatan harian.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold border border-[#4A6B5D]/20">
                <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
                <span>Front-Desk Online (Peak Hour)</span>
              </span>
              <Link
                href="/admin/checkin"
                className="px-4 py-2 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>Buka Scanner</span>
              </Link>
            </div>
          </div>

          {/* Section 1: 4-Card Executive KPI Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1 */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">TAMU AKTIF HARI INI</span>
                <span className="w-8 h-8 rounded-full bg-[#fbf9f5] flex items-center justify-center text-[#121212]">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </span>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#121212]">
                  {activeGuestsCount} Tamu
                </h3>
                <span className="text-xs font-mono text-[#4A6B5D] mt-1 block">
                  ● {pendingCount} Reservasi Menunggu Check-in
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">TINGKAT OKUPANSI RUANG</span>
                <span className="w-8 h-8 rounded-full bg-[#fbf9f5] flex items-center justify-center text-[#121212]">
                  <span className="material-symbols-outlined text-[18px]">pie_chart</span>
                </span>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#121212]">
                  {occupancyRate > 0 ? occupancyRate : 75}%
                </h3>
                <span className="text-xs font-mono text-[#747878] mt-1 block">
                  {spaces.length - activeSpacesCount} dari {spaces.length} Ruang Sedang Terisi
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">TOTAL REVENUE (IDR)</span>
                <span className="w-8 h-8 rounded-full bg-[#fbf9f5] flex items-center justify-center text-[#121212]">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </span>
              </div>
              <div>
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#121212]">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </h3>
                <span className="text-xs font-mono text-[#4A6B5D] mt-1 block">
                  +18.4% vs Bulan Lalu
                </span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">VOUCHER AKTIF</span>
                <span className="w-8 h-8 rounded-full bg-[#fbf9f5] flex items-center justify-center text-[#121212]">
                  <span className="material-symbols-outlined text-[18px]">local_offer</span>
                </span>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#121212]">
                  {vouchers.length} Promo
                </h3>
                <span className="text-xs font-mono text-[#747878] mt-1 block">
                  {vouchers.reduce((acc, v) => acc + v.usageCount, 0)} Klaim Terpakai
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Real-time Check-in Queue & Space Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Live Check-in Queue (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A6B5D]">how_to_reg</span>
                  <h2 className="font-serif text-xl font-bold text-[#121212]">
                    Antrean Check-In Hari Ini
                  </h2>
                </div>
                <Link href="/admin/reservations" className="text-xs font-mono text-[#5e5e5e] hover:text-[#121212] font-semibold">
                  Semua Reservasi &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 4).map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] hover:border-[#121212] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#121212]">
                          {booking.bookingCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          booking.status === 'active'
                            ? 'bg-[#4A6B5D]/10 text-[#4A6B5D]'
                            : booking.status === 'pending'
                            ? 'bg-[#C88A2B]/10 text-[#C88A2B]'
                            : 'bg-[#333333]/10 text-[#333333]'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-[#121212]">
                        {booking.guestName} &bull; <span className="text-[#5e5e5e] font-normal">{booking.spaceName}</span>
                      </h4>
                      <p className="text-xs font-mono text-[#747878]">
                        Seat: <strong className="text-[#121212]">{booking.assignedSeat}</strong> | PIN: <strong className="text-[#121212]">{booking.keycardPin}</strong> | {booking.timeSlot}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/admin/reservations/${booking.id}`}
                        className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-mono font-semibold text-[#121212] hover:bg-[#efeeea]"
                      >
                        Folio Detail
                      </Link>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'active')}
                          className="px-3 py-1.5 rounded-full bg-[#4A6B5D] text-white text-xs font-mono font-semibold hover:bg-[#3b574a]"
                        >
                          Buka Pintu
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Inventory Telemetry (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#121212]">meeting_room</span>
                  <h2 className="font-serif text-xl font-bold text-[#121212]">
                    Status Ruang Terkini
                  </h2>
                </div>
                <Link href="/admin/spaces" className="text-xs font-mono text-[#5e5e5e] hover:text-[#121212] font-semibold">
                  Kelola CRUD &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {spaces.slice(0, 5).map((space) => (
                  <div
                    key={space.id}
                    className="p-3.5 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#efeeea] shrink-0">
                        <img src={space.imageUrl} alt={space.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-sans font-semibold text-xs text-[#121212] line-clamp-1">
                          {space.name}
                        </h4>
                        <span className="text-[10px] font-mono text-[#747878] block">
                          {space.category} &bull; Kapasitas {space.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        space.isAvailable
                          ? 'bg-[#4A6B5D]/10 text-[#4A6B5D]'
                          : 'bg-[#C88A2B]/10 text-[#C88A2B]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${space.isAvailable ? 'bg-[#4A6B5D]' : 'bg-[#C88A2B]'}`}></span>
                        <span>{space.isAvailable ? 'Tersedia' : 'Terisi'}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Operational Quick Module Launchpad */}
          <div className="bg-[#1c1b1b] text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C88A2B] font-bold block mb-1">
                  WORKMATES OPERATIONS SUITE
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Pusat Kendali Properti &amp; Transaksi
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/admin/spaces"
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-2xl text-[#C88A2B] mb-2">add_business</span>
                <div>
                  <h4 className="font-bold text-xs text-white">CRUD Ruang</h4>
                  <p className="text-[10px] text-[#858383]">Tambah &amp; edit tarif ruang</p>
                </div>
              </Link>

              <Link
                href="/admin/reservations"
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-2xl text-[#4A6B5D] mb-2">table_chart</span>
                <div>
                  <h4 className="font-bold text-xs text-white">Audit Ledger</h4>
                  <p className="text-[10px] text-[#858383]">Log seluruh booking tamu</p>
                </div>
              </Link>

              <Link
                href="/admin/checkin"
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-2xl text-[#C88A2B] mb-2">qr_code_scanner</span>
                <div>
                  <h4 className="font-bold text-xs text-white">QR Scanner</h4>
                  <p className="text-[10px] text-[#858383]">Verifikasi pintu instan</p>
                </div>
              </Link>

              <Link
                href="/admin/finance"
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-2xl text-[#4A6B5D] mb-2">insights</span>
                <div>
                  <h4 className="font-bold text-xs text-white">Laporan Keuangan</h4>
                  <p className="text-[10px] text-[#858383]">Omset &amp; bagi hasil owner</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
