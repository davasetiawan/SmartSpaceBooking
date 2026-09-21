'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Booking } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemberBookingsPage() {
  const { bookings, cancelBooking } = useSpaceStore();
  const [filterTab, setFilterTab] = useState<'all' | Booking['status']>('all');
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const activeCount = bookings.filter(b => b.status === 'active').length;
  const unverifiedCount = bookings.filter(b => b.status === 'unverified').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const finishedCount = bookings.filter(b => b.status === 'finished').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  const filteredBookings = bookings.filter(b => {
    if (filterTab === 'all') return true;
    return b.status === filterTab;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'unverified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C88A2B]/10 text-[#C88A2B] text-xs font-mono font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C88A2B]"></span>
            <span>Belum Diverifikasi Admin</span>
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
            <span>Aktif Terbuka</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D]"></span>
            <span>Terverifikasi Admin</span>
          </span>
        );
      case 'finished':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#333333]/10 text-[#333333] text-xs font-mono font-bold uppercase">
            <span>Selesai</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E3B3B]/10 text-[#9E3B3B] text-xs font-mono font-bold uppercase">
            <span>Dibatalkan</span>
          </span>
        );
    }
  };

  const confirmCancel = async () => {
    if (cancellingBookingId) {
      await cancelBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      <main className="w-full py-10 md:py-14 px-4 sm:px-8 lg:px-16 flex-1">
        <div className="w-full">
          
          {/* Breadcrumb & Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#747878] mb-3">
              <Link href="/" className="hover:text-[#121212]">Beranda</Link>
              <span>/</span>
              <span className="text-[#121212] font-semibold">Pass &amp; Reservasi Saya</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                  Pass &amp; Reservasi Saya
                </h1>
                <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1 max-w-xl">
                  Kelola jadwal studio, digital keycard, dan akses pintu sanctuary WorkMates Anda.
                </p>
              </div>

              {/* Summary Stats Strip */}
              <div className="flex flex-wrap items-center gap-2 bg-white border border-[#EBE7DF] px-4 py-2 rounded-full text-xs font-mono shadow-sm">
                <span className="flex items-center gap-1.5 text-[#121212] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4A6B5D]"></span>
                  <span>{activeCount} Aktif</span>
                </span>
                <span className="text-[#EBE7DF]">•</span>
                <span className="flex items-center gap-1.5 text-[#C88A2B] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#C88A2B]"></span>
                  <span>{unverifiedCount} Belum Verifikasi</span>
                </span>
                <span className="text-[#EBE7DF]">•</span>
                <span className="text-[#747878]">
                  {finishedCount} Selesai
                </span>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <div className="border-b border-[#EBE7DF] mb-8 overflow-x-auto">
            <div className="flex space-x-6 min-w-max text-xs sm:text-sm font-medium">
              <button
                onClick={() => setFilterTab('all')}
                className={`pb-3 transition-all flex items-center gap-1.5 relative ${
                  filterTab === 'all'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                <span>Semua</span>
                <span className="px-2 py-0.5 rounded-full bg-[#efeeea] text-[10px] font-mono">
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setFilterTab('active')}
                className={`pb-3 transition-all flex items-center gap-1.5 relative ${
                  filterTab === 'active'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                <span>Aktif</span>
                <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
              </button>

              <button
                onClick={() => setFilterTab('unverified')}
                className={`pb-3 transition-all flex items-center gap-1.5 relative ${
                  filterTab === 'unverified'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                <span>Belum Verifikasi</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C88A2B]/15 text-[#C88A2B] text-[10px] font-mono font-bold">
                  {unverifiedCount}
                </span>
              </button>

              <button
                onClick={() => setFilterTab('pending')}
                className={`pb-3 transition-all flex items-center gap-1.5 relative ${
                  filterTab === 'pending'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                <span>Terverifikasi</span>
                <span className="px-2 py-0.5 rounded-full bg-[#4A6B5D]/15 text-[#4A6B5D] text-[10px] font-mono font-bold">
                  {pendingCount}
                </span>
              </button>

              <button
                onClick={() => setFilterTab('finished')}
                className={`pb-3 transition-all relative ${
                  filterTab === 'finished'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                Selesai
              </button>

              <button
                onClick={() => setFilterTab('cancelled')}
                className={`pb-3 transition-all relative ${
                  filterTab === 'cancelled'
                    ? 'text-[#121212] font-bold border-b-2 border-[#121212]'
                    : 'text-[#747878] hover:text-[#121212]'
                }`}
              >
                Dibatalkan ({cancelledCount})
              </button>
            </div>
          </div>

          {/* Bookings Stack */}
          <AnimatePresence mode="wait">
            {filteredBookings.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-full py-16 text-center bg-white rounded-3xl border border-[#EBE7DF] flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-4xl text-[#747878] mb-3">
                  event_busy
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#121212] mb-1">
                  Tidak ada reservasi pada kategori ini
                </h3>
                <p className="text-xs text-[#5e5e5e] mb-6">
                  Pilih ruang kerja baru dan dapatkan digital keycard instan Anda.
                </p>
                <Link
                  href="/spaces"
                  className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#2b2b2b] transition-all hover:scale-105"
                >
                  Eksplor Ruang Sekarang
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={filterTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredBookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="bg-white border border-[#EBE7DF] rounded-3xl p-6 sm:p-8 hover:border-[#121212] transition-all hover:shadow-lg"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      
                      {/* Space Media */}
                      <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#efeeea]">
                        <img
                          src={booking.imageUrl}
                          alt={booking.spaceName}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase text-[#121212] border border-[#EBE7DF]">
                          {booking.spaceCategory}
                        </div>
                      </div>

                      {/* Booking Main Info */}
                      <div className="lg:col-span-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#747878]">
                            {booking.bookingCode}
                          </span>
                          {getStatusBadge(booking.status)}
                        </div>

                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
                          {booking.spaceName}
                        </h2>

                        <p className="text-xs text-[#5e5e5e] flex items-center gap-1 font-mono">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{booking.location}</span>
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#5e5e5e]">
                          <div>
                            <span className="text-[10px] text-[#747878] uppercase block">Jadwal</span>
                            <span className="font-bold text-[#121212]">{booking.date} • {booking.timeSlot}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#747878] uppercase block">Seat / PIN Pintu</span>
                            <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat} (PIN: {booking.keycardPin})</span>
                          </div>
                        </div>

                        {/* Rejection reason banner — shown to member when booking is rejected by admin */}
                        {booking.status === 'cancelled' && booking.rejectionReason && (
                          <div className="mt-3 flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#9E3B3B]/6 border border-[#9E3B3B]/20">
                            <span className="material-symbols-outlined text-[#9E3B3B] text-[18px] mt-0.5 shrink-0">info</span>
                            <div>
                              <p className="text-[10px] font-mono font-bold text-[#9E3B3B] uppercase tracking-wider mb-0.5">Alasan Penolakan dari Admin</p>
                              <p className="text-xs font-mono text-[#5e5e5e] leading-relaxed">{booking.rejectionReason}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Pricing & CTAs */}
                      <div className="lg:col-span-3 lg:border-l border-[#EBE7DF] lg:pl-6 flex flex-col justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-[#747878] uppercase">Total Tarif</span>
                          <div className="font-mono text-xl font-bold text-[#121212]">
                            Rp {booking.totalAmount.toLocaleString('id-ID')}
                          </div>
                          <span className="text-[10px] text-[#747878] font-mono">
                            {booking.durationHours} Jam Akses
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/ticket/${booking.id}`}
                            className="w-full py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                          >
                            <span className="material-symbols-outlined text-[16px]">qr_code</span>
                            <span>Buka Digital Pass</span>
                          </Link>

                          {booking.status === 'active' || booking.status === 'pending' || booking.status === 'unverified' ? (
                            <button
                              type="button"
                              onClick={() => setCancellingBookingId(booking.id)}
                              className="w-full py-2 rounded-full border border-[#EBE7DF] text-[#9E3B3B] text-xs font-semibold hover:bg-[#9E3B3B]/10 transition-colors"
                            >
                              Batalkan Reservasi
                            </button>
                          ) : (
                            <Link
                              href={`/booking?spaceId=${booking.spaceId}`}
                              className="w-full py-2 rounded-full border border-[#EBE7DF] text-[#121212] text-xs font-semibold hover:bg-[#f5f3ef] transition-colors text-center"
                            >
                              Pesan Ulang
                            </Link>
                          )}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Cancellation Modal */}
      <AnimatePresence>
        {cancellingBookingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl space-y-4"
            >
              <span className="material-symbols-outlined text-4xl text-[#9E3B3B]">
                warning
              </span>
              <h3 className="font-serif text-xl font-bold text-[#121212]">
                Konfirmasi Pembatalan Reservasi
              </h3>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light leading-relaxed">
                Apakah Anda yakin ingin membatalkan pass ini? Pengembalian dana penuh akan diproses otomatis sesuai kebijakan pembatalan &le; 2 jam.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#EBE7DF]">
                <button
                  onClick={() => setCancellingBookingId(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#EBE7DF] text-xs font-semibold text-[#121212] hover:bg-[#f5f3ef] transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 py-2.5 rounded-full bg-[#9E3B3B] text-white text-xs font-semibold hover:bg-[#7e2e2e] transition-colors"
                >
                  Ya, Batalkan Pass
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
