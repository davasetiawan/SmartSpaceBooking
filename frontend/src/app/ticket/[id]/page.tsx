'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

const BACKEND_URL = 'http://localhost:3001';
const DEFAULT_SPACE_IMG = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85';

function resolveSpaceImageUrl(foto?: string | null) {
  if (!foto) return DEFAULT_SPACE_IMG;
  if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
  if (foto.startsWith('/uploads/')) return `${BACKEND_URL}${foto}`;
  return `${BACKEND_URL}/uploads/${foto}`;
}

function statusText(status: string) {
  if (status === 'aktif' || status === 'active') return 'Aktif Terbuka';
  if (status === 'disetujui' || status === 'pending') return 'Terverifikasi Admin';
  return 'Belum Diverifikasi Admin';
}

export default function TicketDetailPage() {
  const params = useParams();
  const { bookings, propertyProfile } = useSpaceStore();
  const [copiedPin, setCopiedPin] = useState(false);
  const [backendTicket, setBackendTicket] = useState<any | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const bookingId = params?.id as string;

  useEffect(() => {
    if (bookingId && bookingId !== 'my') {
      import('@/lib/api').then(({ fetchETicket }) => {
        fetchETicket(bookingId)
          .then((data) => setBackendTicket(data))
          .catch(() => {});
      });
    }
  }, [bookingId]);

  const fallbackBooking = bookings.find(b => b.id === bookingId || b.bookingCode === bookingId) || bookings[0];

  const booking = backendTicket ? {
    id: String(backendTicket.id),
    bookingCode: backendTicket.kode_booking,
    spaceId: String(backendTicket.id_space),
    spaceName: backendTicket.space?.nama_space || fallbackBooking.spaceName,
    spaceCategory: backendTicket.space?.tipe || fallbackBooking.spaceCategory,
    location: backendTicket.space?.jalan || backendTicket.space?.kota || fallbackBooking.location,
    imageUrl: resolveSpaceImageUrl(backendTicket.space?.foto),
    guestName: backendTicket.member?.nama_member || fallbackBooking.guestName,
    guestEmail: fallbackBooking.guestEmail,
    guestPhone: backendTicket.member?.telp || fallbackBooking.guestPhone,
    date: new Date(backendTicket.tanggal_reservasi).toISOString().split('T')[0],
    timeSlot: `${new Date(backendTicket.jam_mulai).toISOString().substr(11, 5)} - ${new Date(backendTicket.jam_selesai).toISOString().substr(11, 5)}`,
    durationHours: backendTicket.durasi_jam,
    totalAmount: backendTicket.total_bayar,
    status: backendTicket.status,
    keycardPin: backendTicket.pin_akses || fallbackBooking.keycardPin || '8899',
    assignedSeat: `UNIT-${backendTicket.id_space}`,
    addOns: [],
    createdAt: new Date(backendTicket.created_at).toLocaleString('id-ID'),
    qrPayload: backendTicket.qr_payload || `VERIFY-RESERVASI-${backendTicket.id}-${backendTicket.kode_booking}`,
    qrCode: backendTicket.qr_code,
  } : { ...fallbackBooking, qrCode: null };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(booking.keycardPin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <div className="no-print">
        <Navbar />
      </div>

      <main className="w-full py-6 md:py-10 px-4 sm:px-8 lg:px-10 xl:px-12 flex-1">
        <div className="w-full max-w-[1760px] mx-auto">
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#747878]">
              <Link href="/" className="hover:text-[#121212]">Beranda</Link>
              <span>/</span>
              <Link href="/member/bookings" className="hover:text-[#121212]">Pass Saya</Link>
              <span>/</span>
              <span className="text-[#121212] font-semibold">Digital E-Ticket Pass</span>
            </div>

            <Link
              href="/member/bookings"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#5e5e5e] hover:text-[#121212] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali ke Dashboard Member</span>
            </Link>
          </div>

          <div className="no-print flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4 mb-8">
            <div>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 border ${booking.status === 'belum_dikonfirm' || booking.status === 'unverified' ? 'bg-[#C88A2B]/10 text-[#C88A2B] border-[#C88A2B]/20' : 'bg-[#4A6B5D]/10 text-[#4A6B5D] border-[#4A6B5D]/20'}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                <span>{statusText(booking.status)}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#121212] mb-2">
                Digital E-Ticket &amp; Kunci Akses
              </h1>
              <p className="text-sm text-[#5e5e5e] font-light max-w-3xl">
                Tunjukkan QR besar ini ke scanner front desk. Admin dapat scan payload reservasi langsung dari halaman ini.
              </p>
            </div>
            <div className="font-mono text-xs text-[#747878]">
              Kode Booking <span className="text-[#121212] font-bold">{booking.bookingCode}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-9 w-full">
              <div className="print-ticket-only w-full bg-white rounded-[2rem] border border-[#EBE7DF] shadow-xl overflow-hidden relative">
                <div className="p-6 sm:p-8 bg-[#1c1b1b] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-[#121212] shrink-0 shadow-sm">
                      <img src="/workmates-logo.jpg" alt="WorkMates Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-serif text-2xl font-bold block leading-none">WorkMates</span>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#C88A2B]">
                        Architectural Guest Pass
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-[#858383] uppercase block">Kode Booking</span>
                    <span className="font-bold text-base text-[#C88A2B]">{booking.bookingCode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0">
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-[#efeeea] shrink-0">
                        {imageFailed ? (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center text-[#747878] p-4">
                            <span className="material-symbols-outlined text-4xl mb-2">image_not_supported</span>
                            <span className="text-xs font-mono">Gambar ruang belum tersedia</span>
                          </div>
                        ) : (
                          <img
                            src={booking.imageUrl}
                            alt={booking.spaceName}
                            className="w-full h-full object-cover"
                            onError={() => setImageFailed(true)}
                          />
                        )}
                      </div>

                      <div className="space-y-2 flex-1 min-w-0">
                        <span className="text-xs font-mono uppercase text-[#4A6B5D] font-bold">
                          {booking.spaceCategory}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212] leading-tight">
                          {booking.spaceName}
                        </h2>
                        <p className="text-sm text-[#5e5e5e] flex items-center gap-1 font-mono">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{booking.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF] font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Tanggal</span>
                        <span className="font-bold text-[#121212]">{booking.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Slot Waktu</span>
                        <span className="font-bold text-[#121212]">{booking.timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Seat / Studio</span>
                        <span className="font-bold text-[#4A6B5D]">{booking.assignedSeat}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Keycard PIN</span>
                        <span className="font-bold text-base text-[#121212] tracking-widest">{booking.keycardPin}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono border-t border-[#EBE7DF] pt-4">
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Nama Tamu</span>
                        <span className="font-bold text-[#121212]">{booking.guestName}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] text-[#747878] uppercase block">Status Akses</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${booking.status === 'belum_dikonfirm' || booking.status === 'unverified' ? 'bg-[#C88A2B]/10 text-[#C88A2B]' : 'bg-[#4A6B5D]/10 text-[#4A6B5D]'}`}>
                          {statusText(booking.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-[#fbf9f5] border-t lg:border-t-0 lg:border-l border-[#EBE7DF] flex flex-col items-center justify-center gap-5 text-center">
                    <div>
                      <span className="text-[10px] font-mono text-[#747878] uppercase font-bold tracking-wider block">
                        QR Front-Desk Scanner
                      </span>
                      <p className="text-xs text-[#5e5e5e] max-w-xs font-light mt-1">
                        QR resolusi tinggi. Bisa discan admin di halaman front desk.
                      </p>
                    </div>

                    <div className="relative w-72 h-72 bg-white p-4 rounded-3xl border border-[#121212] shadow-lg flex items-center justify-center">
                      {booking.qrCode ? (
                        <img
                          src={booking.qrCode}
                          alt={`QR ${booking.bookingCode}`}
                          className="w-full h-full object-contain [image-rendering:pixelated]"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center">
                          <span className="material-symbols-outlined text-8xl text-[#121212]">
                            qr_code_2
                          </span>
                          <span className="text-[10px] font-mono text-[#747878] -mt-1 font-bold">
                            {booking.bookingCode}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="w-full p-3 rounded-xl bg-white border border-[#EBE7DF] break-all text-[10px] text-[#121212] font-mono">
                      {booking.qrPayload}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="no-print xl:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-semibold text-[#121212]">
                  Aksi &amp; Unduh Pass
                </h3>

                <button
                  onClick={() => window.print()}
                  className="w-full py-3 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#2b2b2b] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                  <span>Cetak Pass (PDF / Hardcopy)</span>
                </button>

                <button
                  onClick={handleCopyPin}
                  className="w-full py-3 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-semibold text-[#121212] hover:bg-[#efeeea] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedPin ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedPin ? 'PIN Disalin!' : `Salin PIN Akses (${booking.keycardPin})`}</span>
                </button>

                <Link
                  href={`/admin/checkin?code=${encodeURIComponent(booking.qrPayload || booking.bookingCode)}`}
                  className="w-full py-3 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/30 text-xs font-semibold hover:bg-[#4A6B5D]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span>Uji Validasi di Front-Desk Scanner</span>
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4 font-mono text-xs">
                <h3 className="font-serif font-semibold text-base text-[#121212] font-sans">
                  Kredensial Sanctuary
                </h3>

                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF] space-y-2">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[#747878]">Wi-Fi Network:</span>
                    <span className="font-bold text-[#121212]">{propertyProfile.wifiSSID}</span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[#747878]">Password:</span>
                    <span className="font-bold text-[#121212]">{propertyProfile.wifiKey}</span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[#747878]">Layanan Concierge:</span>
                    <span className="font-bold text-[#4A6B5D]">{propertyProfile.conciergePhone}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#747878] leading-relaxed">
                  Harap jaga ketenangan ruangan. Area dilengkapi STC-52 soundproof seals demi kenyamanan member.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
