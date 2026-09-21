'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Booking } from '@/lib/mockData';

const statusLabel: Record<Booking['status'], string> = {
  unverified: 'Belum diverifikasi',
  pending: 'Terverifikasi',
  active: 'Aktif',
  finished: 'Selesai',
  cancelled: 'Dibatalkan',
};

function titleCase(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function statusClass(status: Booking['status']) {
  if (status === 'unverified') return 'bg-[#C88A2B]/10 text-[#C88A2B] border-[#C88A2B]/30';
  if (status === 'pending' || status === 'active') return 'bg-[#4A6B5D]/10 text-[#4A6B5D] border-[#4A6B5D]/30';
  if (status === 'finished') return 'bg-[#333333]/10 text-[#333333] border-[#333333]/30';
  return 'bg-[#9E3B3B]/10 text-[#9E3B3B] border-[#9E3B3B]/30';
}

// ─── Payment Proof Lightbox Modal ──────────────────────────────────────────
interface ProofModalProps {
  booking: Booking;
  onClose: () => void;
  onVerify: () => void;
  onRejectWithReason: () => void;
  isUpdating: boolean;
}

function PaymentProofModal({ booking, onClose, onVerify, onRejectWithReason, isUpdating }: ProofModalProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(18,18,18,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#EBE7DF] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#EBE7DF]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#747878] font-bold block mb-0.5">
              BUKTI PEMBAYARAN · {booking.bookingCode}
            </span>
            <h2 className="font-serif text-xl font-bold text-[#121212]">
              {titleCase(booking.guestName)}
            </h2>
            <p className="text-xs font-mono text-[#5e5e5e] mt-0.5">
              {booking.spaceName} · {booking.date} · {booking.timeSlot}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#fbf9f5] border border-[#EBE7DF] flex items-center justify-center hover:bg-[#efeeea] transition-colors text-[#5e5e5e]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 overflow-y-auto bg-[#f7f5f0] flex items-center justify-center p-6" style={{ minHeight: 280 }}>
          {booking.paymentProofUrl && !imgError ? (
            <img
              src={booking.paymentProofUrl}
              alt="Bukti Pembayaran"
              className="max-w-full max-h-[52vh] rounded-2xl shadow-lg object-contain border border-[#EBE7DF]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-[#747878] py-10">
              <div className="w-20 h-20 rounded-2xl bg-[#EBE7DF] flex items-center justify-center">
                <span className="material-symbols-outlined text-[40px] text-[#bdb9b2]">image_not_supported</span>
              </div>
              <p className="font-mono text-sm font-semibold text-[#5e5e5e] text-center">
                Foto bukti pembayaran tidak tersedia
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="px-7 py-4 bg-[#fbf9f5] border-t border-[#EBE7DF] flex flex-wrap gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#747878] uppercase block">Total Tagihan</span>
            <span className="font-bold text-[#121212] text-sm">Rp {booking.totalAmount.toLocaleString('id-ID')}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#747878] uppercase block">Durasi Sesi</span>
            <span className="font-bold text-[#121212]">{booking.durationHours} Jam</span>
          </div>
          <div>
            <span className="text-[10px] text-[#747878] uppercase block">Seat / Unit</span>
            <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat}</span>
          </div>
        </div>

        {/* Actions */}
        {booking.status === 'unverified' && (
          <div className="px-7 py-5 border-t border-[#EBE7DF] flex flex-col sm:flex-row gap-3">
            <button
              disabled={isUpdating}
              onClick={onVerify}
              className="flex-1 py-3 rounded-full bg-[#121212] text-white text-xs font-mono font-bold hover:bg-[#4A6B5D] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{isUpdating ? 'Memproses...' : 'Verifikasi Pembayaran'}</span>
            </button>
            <button
              disabled={isUpdating}
              onClick={onRejectWithReason}
              className="flex-1 py-3 rounded-full border border-[#9E3B3B]/30 text-[#9E3B3B] text-xs font-mono font-bold hover:bg-[#9E3B3B]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span>Tolak dengan Alasan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Rejection Reason Modal ─────────────────────────────────────────────────
interface RejectModalProps {
  booking: Booking;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isUpdating: boolean;
}

function RejectReasonModal({ booking, onClose, onConfirm, isUpdating }: RejectModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const QUICK_REASONS = [
    'Bukti pembayaran tidak jelas / buram',
    'Nominal pembayaran tidak sesuai',
    'Bukti pembayaran tidak valid / palsu',
    'Bukti pembayaran sudah kadaluarsa',
    'Format bukti pembayaran tidak dapat dibaca',
  ];

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('Alasan penolakan wajib diisi');
      return;
    }
    onConfirm(reason.trim());
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(18,18,18,0.88)', backdropFilter: 'blur(8px)' }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-[#EBE7DF] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-7 py-5 border-b border-[#EBE7DF] bg-[#9E3B3B]/5">
          <span className="material-symbols-outlined text-[#9E3B3B] text-[26px]">cancel</span>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#121212]">Tolak Reservasi</h2>
            <p className="text-[11px] font-mono text-[#747878]">{booking.bookingCode} · {titleCase(booking.guestName)}</p>
          </div>
        </div>

        <div className="p-7 space-y-5">
          <p className="text-xs text-[#5e5e5e] font-light leading-relaxed">
            Berikan alasan yang jelas agar member dapat memahami keputusan penolakan dan segera melakukan perbaikan.
            Alasan ini akan ditampilkan langsung kepada member.
          </p>

          {/* Quick reason buttons */}
          <div>
            <span className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-2">Pilih Alasan Cepat:</span>
            <div className="flex flex-wrap gap-2">
              {QUICK_REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setReason(r); setError(''); }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all ${
                    reason === r
                      ? 'bg-[#9E3B3B] text-white border-[#9E3B3B]'
                      : 'bg-[#fbf9f5] border-[#EBE7DF] text-[#5e5e5e] hover:border-[#9E3B3B]/40 hover:text-[#9E3B3B]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Custom reason textarea */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-2">
              Atau Tulis Alasan Kustom: <span className="text-[#9E3B3B]">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => { setReason(e.target.value); setError(''); }}
              placeholder="Contoh: Bukti transfer tidak menunjukkan nominal yang sesuai dengan total tagihan Rp 500.000..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#9E3B3B]/50 outline-none resize-none transition-colors placeholder:text-[#bdb9b2]"
            />
            <div className="flex items-center justify-between mt-1">
              {error ? (
                <span className="text-[10px] font-mono text-[#9E3B3B] font-bold">{error}</span>
              ) : (
                <span />
              )}
              <span className="text-[10px] font-mono text-[#747878]">{reason.length}/500</span>
            </div>
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#C88A2B]/5 border border-[#C88A2B]/20">
            <span className="material-symbols-outlined text-[#C88A2B] text-[16px] mt-0.5 shrink-0">info</span>
            <p className="text-[11px] font-mono text-[#5e5e5e]">
              Alasan ini akan terlihat di halaman <strong>Reservasi Saya</strong> milik member.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-7 pb-7 flex gap-3">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="flex-1 py-3 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212] hover:bg-[#efeeea] transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUpdating || !reason.trim()}
            className="flex-1 py-3 rounded-full bg-[#9E3B3B] text-white text-xs font-mono font-bold hover:bg-[#7e2e2e] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>{isUpdating ? 'Memproses...' : 'Kirim Penolakan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminReservationsPage() {
  const { bookings, updateBookingStatus } = useSpaceStore();
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all');
  const [statusError, setStatusError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);
  const [proofBooking, setProofBooking] = useState<Booking | null>(null);
  const [rejectBooking, setRejectBooking] = useState<Booking | null>(null);
  type StatusFilter = typeof statusFilter;

  const totalRevenue = bookings.reduce((sum, b) => (b.status === 'pending' || b.status === 'active' || b.status === 'finished' ? sum + b.totalAmount : sum), 0);

  const filtered = bookings.filter((b) => {
    const query = searchQuery.toLowerCase();
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchSearch =
      b.bookingCode.toLowerCase().includes(query) ||
      b.guestName.toLowerCase().includes(query) ||
      b.guestEmail.toLowerCase().includes(query) ||
      b.spaceName.toLowerCase().includes(query) ||
      b.assignedSeat.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  const changeStatus = async (id: string | number, status: Booking['status'], reason?: string) => {
    try {
      setStatusError('');
      setUpdatingId(id);
      await updateBookingStatus(id, status, reason);
      setProofBooking(null);
      setRejectBooking(null);
    } catch (err: any) {
      setStatusError(err.message || 'Gagal mengubah status reservasi');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      {/* Payment Proof Modal */}
      {proofBooking && !rejectBooking && (
        <PaymentProofModal
          booking={proofBooking}
          onClose={() => setProofBooking(null)}
          onVerify={() => changeStatus(proofBooking.id, 'pending')}
          onRejectWithReason={() => {
            setRejectBooking(proofBooking);
            setProofBooking(null);
          }}
          isUpdating={updatingId === proofBooking.id}
        />
      )}

      {/* Rejection Reason Modal */}
      {rejectBooking && (
        <RejectReasonModal
          booking={rejectBooking}
          onClose={() => setRejectBooking(null)}
          onConfirm={(reason) => changeStatus(rejectBooking.id, 'cancelled', reason)}
          isUpdating={updatingId === rejectBooking.id}
        />
      )}

      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-8 overflow-y-auto">
        <div className="w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                MASTER AUDIT &amp; FOLIO MONITORING
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Monitoring &amp; Audit Reservasi
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Pantau booking, validasi pembayaran manual, dan status akses tamu dari satu halaman.
              </p>
            </div>
            <button
              onClick={() => alert('Master CSV Ledger telah diexport.')}
              className="px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-mono font-semibold text-[#121212] hover:bg-[#fbf9f5] flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export CSV</span>
            </button>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL BOOKING TERCATAT</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">{bookings.length} Reservasi</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">Semua status</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">REVENUE TERVERIFIKASI</span>
              <div className="font-mono text-xl font-bold text-[#121212]">Rp {totalRevenue.toLocaleString('id-ID')}</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">Tidak termasuk pending/batal</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">PAS AKTIF / IN SESSION</span>
              <div className="font-serif text-2xl font-bold text-[#4A6B5D]">
                {bookings.filter(b => b.status === 'active').length} Tamu
              </div>
              <span className="text-[10px] font-mono text-[#747878]">Sedang check-in</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">MENUNGGU VALIDASI</span>
              <div className="font-serif text-2xl font-bold text-[#C88A2B]">
                {bookings.filter(b => b.status === 'unverified').length} Tamu
              </div>
              <span className="text-[10px] font-mono text-[#C88A2B]">Butuh verifikasi admin</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-96 relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="Cari booking, tamu, email, seat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#fbf9f5] rounded-full border border-[#EBE7DF]">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'unverified', label: 'Belum verifikasi' },
                  { id: 'pending', label: 'Terverifikasi' },
                  { id: 'active', label: 'Aktif' },
                  { id: 'finished', label: 'Selesai' },
                  { id: 'cancelled', label: 'Dibatalkan' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as StatusFilter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                      statusFilter === tab.id ? 'bg-[#121212] text-white font-bold shadow-sm' : 'text-[#747878] hover:text-[#121212]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {statusError && (
            <div className="p-4 rounded-2xl bg-[#9E3B3B]/10 border border-[#9E3B3B]/30 text-[#9E3B3B] text-xs font-mono font-bold">
              {statusError}
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Kode Booking</th>
                    <th className="py-3.5 px-6">Identitas Tamu</th>
                    <th className="py-3.5 px-6">Ruang &amp; Sesi</th>
                    <th className="py-3.5 px-6">Seat ID</th>
                    <th className="py-3.5 px-6">Total Tarif</th>
                    <th className="py-3.5 px-6">Status Reservasi</th>
                    <th className="py-3.5 px-6 text-right">Aksi</th>
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

                      <td className="py-4 px-6 min-w-60">
                        <div className="font-sans font-bold text-sm text-[#121212]">{titleCase(booking.guestName)}</div>
                        <div className="text-[11px] text-[#747878]">{booking.guestEmail}</div>
                        <div className="text-[10px] text-[#747878]">WA: {booking.guestPhone}</div>
                      </td>

                      <td className="py-4 px-6 min-w-56">
                        <div className="font-sans font-semibold text-[#121212]">{booking.spaceName}</div>
                        <div className="text-[11px] text-[#747878]">{booking.date} &bull; {booking.timeSlot}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat}</span>
                        <span className="text-[#747878] block text-[10px]">PIN: ••••</span>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        Rp {booking.totalAmount.toLocaleString('id-ID')}
                      </td>

                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${statusClass(booking.status)}`}>
                          {statusLabel[booking.status]}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2 flex-wrap">
                          {/* Lihat Bukti — only for unverified */}
                          {booking.status === 'unverified' && (
                            <button
                              type="button"
                              onClick={() => setProofBooking(booking)}
                              className="px-3 py-1.5 rounded-full bg-[#C88A2B]/10 border border-[#C88A2B]/30 text-[#C88A2B] hover:bg-[#C88A2B]/20 transition-colors text-[11px] font-semibold inline-flex items-center gap-1"
                              title="Lihat bukti pembayaran"
                            >
                              <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                              <span>Lihat Bukti</span>
                            </button>
                          )}

                          {booking.status === 'unverified' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => changeStatus(booking.id, 'pending')}
                              className="px-3 py-1.5 rounded-full bg-[#121212] text-white hover:bg-[#4A6B5D] transition-colors text-[11px] font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">verified</span>
                              <span>{updatingId === booking.id ? 'Memproses...' : 'Verifikasi'}</span>
                            </button>
                          )}

                          {booking.status === 'unverified' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => setRejectBooking(booking)}
                              className="px-3 py-1.5 rounded-full border border-[#9E3B3B]/30 text-[#9E3B3B] hover:bg-[#9E3B3B]/10 transition-colors text-[11px] font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">cancel</span>
                              <span>Tolak</span>
                            </button>
                          )}

                          {booking.status === 'pending' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => changeStatus(booking.id, 'active')}
                              className="px-3 py-1.5 rounded-full bg-[#4A6B5D] text-white hover:bg-[#395348] transition-colors text-[11px] font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">login</span>
                              <span>Check-In</span>
                            </button>
                          )}

                          {booking.status === 'active' && (
                            <button
                              type="button"
                              disabled={updatingId === booking.id}
                              onClick={() => changeStatus(booking.id, 'finished')}
                              className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] hover:bg-[#efeeea] transition-colors text-[11px] font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-[14px]">logout</span>
                              <span>Check-Out</span>
                            </button>
                          )}

                          <Link
                            href={`/admin/reservations/${booking.id}`}
                            className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] hover:bg-[#121212] hover:text-white transition-colors text-[11px] font-semibold inline-flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                            <span>Folio</span>
                          </Link>
                        </div>
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
