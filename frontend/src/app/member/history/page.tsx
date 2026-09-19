'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function MemberHistoryPage() {
  const { bookings, currentUser } = useSpaceStore();
  const [filterMonth, setFilterMonth] = useState('all');

  const totalSpent = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);
  const totalHours = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.durationHours : sum), 0);

  const handleDownloadInvoice = (bookingCode: string) => {
    alert(`Faktur Pajak Elektronik untuk ${bookingCode} telah diunduh (Format PDF).`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      <main className="w-full py-10 md:py-14 px-4 sm:px-8 lg:px-16 flex-1">
        <div className="w-full">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#747878] mb-4">
            <Link href="/" className="hover:text-[#121212]">Beranda</Link>
            <span>/</span>
            <Link href="/member/bookings" className="hover:text-[#121212]">Portal Member</Link>
            <span>/</span>
            <span className="text-[#121212] font-semibold">Riwayat Sewa &amp; Laporan Folio</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EBE7DF]">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Riwayat Sewa &amp; Laporan Keuangan
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1 max-w-xl">
                Tinjau seluruh arsip reservasi ruang, durasi produktivitas, dan unduh faktur pajak resmi PB1/PPN.
              </p>
            </div>

            <button
              onClick={() => alert('Laporan rekapitulasi tahunan 2026 berhasil digenerate.')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-[#121212] text-xs font-semibold hover:bg-[#f5f3ef] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Rekap Tahunan (PDF)</span>
            </button>
          </div>

          {/* Financial KPI Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className="p-6 rounded-3xl bg-white border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#747878] uppercase tracking-wider block mb-1">
                  TOTAL RESERVASI TERSELESAIKAN
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#121212]">
                  {bookings.length} Sesi
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EBE7DF] text-xs font-mono text-[#4A6B5D] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>{totalHours} Jam Fokus Tercatat</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#747878] uppercase tracking-wider block mb-1">
                  TOTAL PENGELUARAN RUANG (IDR)
                </span>
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#121212]">
                  Rp {totalSpent.toLocaleString('id-ID')}
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EBE7DF] text-xs font-mono text-[#747878] flex items-center justify-between">
                <span>Rata-rata / Jam:</span>
                <span className="font-bold text-[#121212]">
                  Rp {totalHours > 0 ? Math.round(totalSpent / totalHours).toLocaleString('id-ID') : '0'}
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#747878] uppercase tracking-wider block mb-1">
                  STATUS ANGGOTA SONDER
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#121212]">
                  {currentUser?.tier || 'Architect Resident'}
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EBE7DF] text-xs font-mono text-[#C88A2B] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                <span>Prioritas Booking 24/7 Terbuka</span>
              </div>
            </div>
          </div>

          {/* Transaction Ledger Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-bold text-[#121212]">
                Log Transaksi &amp; Faktur
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#747878]">Bulan:</span>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212]"
                >
                  <option value="all">Semua Periode</option>
                  <option value="2026-09">September 2026</option>
                  <option value="2026-08">Agustus 2026</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Kode Booking</th>
                    <th className="py-3.5 px-6">Ruang &amp; Lokasi</th>
                    <th className="py-3.5 px-6">Tanggal &amp; Sesi</th>
                    <th className="py-3.5 px-6">Seat PIN</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Total Tarif (IDR)</th>
                    <th className="py-3.5 px-6 text-center">Aksi Faktur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#fbf9f5]/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#121212]">
                        <Link href={`/ticket/${booking.id}`} className="hover:underline hover:text-[#4A6B5D]">
                          {booking.bookingCode}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-sans font-semibold text-sm text-[#121212]">{booking.spaceName}</div>
                        <div className="text-[11px] text-[#747878]">{booking.location}</div>
                      </td>
                      <td className="py-4 px-6 text-[#5e5e5e]">
                        <div>{booking.date}</div>
                        <div className="text-[11px] text-[#747878]">{booking.timeSlot} ({booking.durationHours} Jam)</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#121212]">
                        {booking.assignedSeat} <span className="text-[#747878] font-normal">({booking.keycardPin})</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          booking.status === 'active'
                            ? 'bg-[#4A6B5D]/10 text-[#4A6B5D]'
                            : booking.status === 'pending'
                            ? 'bg-[#C88A2B]/10 text-[#C88A2B]'
                            : booking.status === 'finished'
                            ? 'bg-[#333333]/10 text-[#333333]'
                            : 'bg-[#9E3B3B]/10 text-[#9E3B3B]'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-sm text-[#121212]">
                        Rp {booking.totalAmount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDownloadInvoice(booking.bookingCode)}
                          className="px-3 py-1 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] hover:bg-[#121212] hover:text-white transition-colors text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">receipt</span>
                          <span>Faktur</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
