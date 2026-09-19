'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function AdminReservationFolioPage() {
  const params = useParams();
  const router = useRouter();
  const { bookings, updateBookingStatus } = useSpaceStore();

  const bookingId = params?.id as string;
  const booking = bookings.find(b => b.id === bookingId || b.bookingCode === bookingId) || bookings[0];

  const [notification, setNotification] = useState('');

  const triggerAction = async (status: typeof booking.status, message: string) => {
    try {
      const { checkInGuest, checkOutGuest, updateReservasiStatus } = await import('@/lib/api');
      if (status === 'active') {
        await checkInGuest(booking.id);
      } else if (status === 'finished') {
        await checkOutGuest(booking.id);
      } else {
        await updateReservasiStatus(booking.id, status === 'pending' ? 'disetujui' : 'dibatalkan');
      }
      await updateBookingStatus(booking.id, status);
      setNotification(message);
      setTimeout(() => setNotification(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          
          {/* Top Return Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE7DF]">
            <Link
              href="/admin/reservations"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#5e5e5e] hover:text-[#121212] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali ke Master Audit Ledger</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-mono font-semibold text-[#121212] hover:bg-[#fbf9f5] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Cetak Slip Folio</span>
              </button>
            </div>
          </div>

          {notification && (
            <div className="p-4 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/30 text-[#4A6B5D] text-xs font-mono font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{notification}</span>
            </div>
          )}

          {/* Dossier Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE7DF] shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#747878] mb-1">
                <span>OFFICIAL INSPECTION DOSSIER</span>
                <span>&bull;</span>
                <span className="text-[#4A6B5D] font-bold">VERIFIED RECORD</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#121212]">
                Folio Reservasi #{booking.bookingCode}
              </h1>
              <p className="text-xs font-mono text-[#747878] mt-1">
                Diterbitkan pada: {booking.createdAt}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF] flex items-center gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#747878] block">Status Sistem</span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase inline-block mt-1 ${
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
              </div>
              <div className="h-8 w-px bg-[#EBE7DF]"></div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#747878] block">Total Transaksi</span>
                <span className="font-mono text-base font-bold text-[#121212] block mt-1">
                  Rp {booking.totalAmount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Space & Guest Verification (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Space Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#121212] border-b border-[#EBE7DF] pb-3">
                  Detail Alokasi Ruang
                </h3>

                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#efeeea] shrink-0 border border-[#EBE7DF]">
                    <img src={booking.imageUrl} alt={booking.spaceName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#4A6B5D] font-bold">{booking.spaceCategory}</span>
                    <h4 className="font-serif text-xl font-bold text-[#121212]">{booking.spaceName}</h4>
                    <p className="text-xs text-[#747878] font-mono">{booking.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#fbf9f5] border border-[#EBE7DF]">
                    <span className="text-[10px] text-[#747878] uppercase block">Tanggal Reservasi</span>
                    <span className="font-bold text-[#121212]">{booking.date}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fbf9f5] border border-[#EBE7DF]">
                    <span className="text-[10px] text-[#747878] uppercase block">Slot Waktu Sesi</span>
                    <span className="font-bold text-[#121212]">{booking.timeSlot}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fbf9f5] border border-[#EBE7DF]">
                    <span className="text-[10px] text-[#747878] uppercase block">Seat ID / Pintu</span>
                    <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat}</span>
                  </div>
                </div>
              </div>

              {/* Guest Dossier */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4 font-mono text-xs">
                <h3 className="font-serif text-lg font-bold text-[#121212] border-b border-[#EBE7DF] pb-3 font-sans">
                  Profil &amp; Kontak Tamu
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-[#747878] uppercase block">Nama Lengkap Tamu</span>
                    <span className="font-bold text-[#121212] text-sm font-sans">{booking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#747878] uppercase block">Alamat Email</span>
                    <span className="font-bold text-[#121212]">{booking.guestEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#747878] uppercase block">Nomor WhatsApp</span>
                    <span className="font-bold text-[#121212]">{booking.guestPhone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#747878] uppercase block">Keycard PIN</span>
                    <span className="font-bold text-base text-[#121212] tracking-widest">{booking.keycardPin}</span>
                  </div>
                </div>

                {booking.addOns && booking.addOns.length > 0 && (
                  <div className="pt-3 border-t border-[#EBE7DF]">
                    <span className="text-[10px] text-[#747878] uppercase block mb-1">Layanan Concierge Tambahan</span>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.addOns.map((add, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#fbf9f5] border border-[#EBE7DF] text-[11px] text-[#121212]">
                          {add}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Col: Override Controls & QR Payload (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Executive State Transition Controls */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#121212]">
                  Kontrol Transisi Status
                </h3>
                <p className="text-xs text-[#5e5e5e] font-light leading-relaxed">
                  Lakukan override manual jika tamu mengalami kendala scanner di front-desk atau meminta perubahan status sewa.
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => triggerAction('active', `Pintu ${booking.assignedSeat} berhasil dibuka secara paksa (Manual Check-In).`)}
                    className="w-full py-3 rounded-full bg-[#4A6B5D] text-white text-xs font-mono font-bold hover:bg-[#395348] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock_open</span>
                    <span>Buka Pintu / Force Check-In</span>
                  </button>

                  <button
                    onClick={() => triggerAction('finished', `Sesi untuk booking ${booking.bookingCode} telah ditandai Selesai.`)}
                    className="w-full py-3 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212] hover:bg-[#efeeea] transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Tandai Selesai (Check-Out)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Batalkan reservasi ini dan keluarkan voucher ganti rugi?')) {
                        triggerAction('cancelled', `Reservasi ${booking.bookingCode} berhasil dibatalkan.`);
                      }
                    }}
                    className="w-full py-3 rounded-full border border-[#9E3B3B]/30 text-[#9E3B3B] text-xs font-mono font-bold hover:bg-[#9E3B3B]/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    <span>Batalkan &amp; Void Pass</span>
                  </button>
                </div>
              </div>

              {/* QR Verification Payload */}
              <div className="bg-[#1c1b1b] text-white rounded-3xl p-6 sm:p-8 space-y-4 font-mono text-xs">
                <span className="text-[10px] text-[#C88A2B] uppercase font-bold tracking-wider block">
                  DIGITAL QR SCANNER PAYLOAD
                </span>
                <p className="text-white/70 text-xs font-light">
                  String terenkripsi yang dibaca oleh sensor kamera turnstile resepsionis:
                </p>
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 break-all text-[11px] text-[#4A6B5D] font-bold">
                  {booking.qrPayload}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
