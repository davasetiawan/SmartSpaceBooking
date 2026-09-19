'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function TicketDetailPage() {
  const params = useParams();
  const { bookings, propertyProfile } = useSpaceStore();
  const [copiedPin, setCopiedPin] = useState(false);
  const [backendTicket, setBackendTicket] = useState<any | null>(null);

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
    imageUrl: backendTicket.space?.foto ? (backendTicket.space.foto.startsWith('http') ? backendTicket.space.foto : `http://localhost:3001/uploads/spaces/${backendTicket.space.foto}`) : fallbackBooking.imageUrl,
    guestName: backendTicket.member?.nama_member || fallbackBooking.guestName,
    guestEmail: fallbackBooking.guestEmail,
    guestPhone: backendTicket.member?.telp || fallbackBooking.guestPhone,
    date: new Date(backendTicket.tanggal_reservasi).toISOString().split('T')[0],
    timeSlot: `${new Date(backendTicket.jam_mulai).toISOString().substr(11, 5)} - ${new Date(backendTicket.jam_selesai).toISOString().substr(11, 5)}`,
    durationHours: backendTicket.durasi_jam,
    totalAmount: backendTicket.total_bayar,
    status: backendTicket.status,
    keycardPin: '8899',
    assignedSeat: `UNIT-${backendTicket.id_space}`,
    addOns: [],
    createdAt: new Date(backendTicket.created_at).toLocaleString('id-ID'),
    qrPayload: `VERIFY-RESERVASI-${backendTicket.id}-${backendTicket.kode_booking}`
  } : fallbackBooking;

  const handleCopyPin = () => {
    navigator.clipboard.writeText(booking.keycardPin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <div className="no-print">
        <Navbar />
      </div>

      <main className="w-full py-8 md:py-12 px-4 sm:px-8 lg:px-16 flex-1">
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Top Return Breadcrumb */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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

          {/* Editorial Title */}
          <div className="no-print text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-[#4A6B5D]/20">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
              <span>Pass Aktif • Siap untuk Check-In</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] mb-2">
              Digital E-Ticket &amp; Kunci Akses
            </h1>
            <p className="text-xs sm:text-sm text-[#5e5e5e] font-light">
              Tunjukkan pass ini pada tablet resepsionis atau scanner pintu putar untuk verifikasi tanpa kontak.
            </p>
          </div>

          {/* Ticket & Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Architectural Boarding Pass (8 Cols) */}
            <div className="lg:col-span-8 flex justify-center w-full">
              <div className="print-ticket-only w-full max-w-xl bg-white rounded-3xl border border-[#EBE7DF] shadow-xl overflow-hidden relative">
                
                {/* Top Section / Header */}
                <div className="p-6 sm:p-8 bg-[#1c1b1b] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-[#121212] flex items-center justify-center font-serif font-bold text-lg">
                      W
                    </div>
                    <div>
                      <span className="font-serif text-lg font-bold block leading-none">WorkMates</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C88A2B]">
                        Architectural Guest Pass
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-[#858383] uppercase block">Kode Booking</span>
                    <span className="font-bold text-sm text-[#C88A2B]">{booking.bookingCode}</span>
                  </div>
                </div>

                {/* Space Image & Main Info */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-full sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden bg-[#efeeea] shrink-0">
                      <img
                        src={booking.imageUrl}
                        alt={booking.spaceName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <span className="text-xs font-mono uppercase text-[#4A6B5D] font-bold">
                        {booking.spaceCategory}
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-[#121212]">
                        {booking.spaceName}
                      </h2>
                      <p className="text-xs text-[#5e5e5e] flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span>{booking.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Booking Details Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF] font-mono text-xs">
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

                  {/* Guest Info */}
                  <div className="flex items-center justify-between text-xs font-mono border-t border-[#EBE7DF] pt-4">
                    <div>
                      <span className="text-[10px] text-[#747878] uppercase block">Nama Tamu</span>
                      <span className="font-bold text-[#121212]">{booking.guestName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#747878] uppercase block">Status Akses</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] font-bold uppercase">
                        {booking.status === 'active' ? 'Aktif Terbuka' : 'Menunggu Validasi'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perforated Divider */}
                <div className="relative flex items-center my-2">
                  <div className="w-6 h-6 rounded-full bg-[#fbf9f5] -ml-3 border-r border-[#EBE7DF]"></div>
                  <div className="flex-1 border-t-2 border-dashed border-[#EBE7DF]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#fbf9f5] -mr-3 border-l border-[#EBE7DF]"></div>
                </div>

                {/* QR Code Validation Section */}
                <div className="p-6 sm:p-8 bg-[#fbf9f5]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-mono text-[#747878] uppercase font-bold tracking-wider block">
                      Pindai QR di Front-Desk
                    </span>
                    <p className="text-xs text-[#5e5e5e] max-w-xs font-light">
                      Scanner resepsionis akan mendeteksi token pass ini secara otomatis dan membuka akses pintu.
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#121212] bg-white px-3 py-1 rounded-full border border-[#EBE7DF]">
                      <span className="material-symbols-outlined text-[14px]">vpn_key</span>
                      <span>PIN Pintu: <strong>{booking.keycardPin}</strong></span>
                    </div>
                  </div>

                  {/* High Density QR Code Mock with Scanline */}
                  <div className="relative w-36 h-36 bg-white p-3 rounded-2xl border border-[#EBE7DF] shadow-md flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-6xl text-[#121212]">
                        qr_code_2
                      </span>
                      <span className="text-[8px] font-mono text-[#747878] -mt-1 font-bold">
                        {booking.bookingCode}
                      </span>
                    </div>
                    <div className="absolute left-0 right-0 h-0.5 bg-[#4A6B5D] animate-scanline shadow-sm shadow-[#4A6B5D]"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Quick Actions & Wi-Fi Credentials (4 Cols) */}
            <div className="no-print lg:col-span-4 space-y-6">
              
              {/* Pass Actions */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-semibold text-[#121212]">
                  Aksi &amp; Unduh Pass
                </h3>

                <button
                  onClick={handlePrint}
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

                {/* Direct link to simulate front-desk check-in */}
                <Link
                  href={`/admin/checkin?code=${encodeURIComponent(booking.bookingCode)}`}
                  className="w-full py-3 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/30 text-xs font-semibold hover:bg-[#4A6B5D]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span>Uji Validasi di Front-Desk Scanner</span>
                </Link>
              </div>

              {/* Wi-Fi & Venue Credentials */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4 font-mono text-xs">
                <h3 className="font-serif font-semibold text-base text-[#121212] font-sans">
                  Kredensial Sanctuary
                </h3>

                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#747878]">Wi-Fi Network:</span>
                    <span className="font-bold text-[#121212]">{propertyProfile.wifiSSID}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#747878]">Password:</span>
                    <span className="font-bold text-[#121212]">{propertyProfile.wifiKey}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#747878]">Layanan Concierge:</span>
                    <span className="font-bold text-[#4A6B5D]">{propertyProfile.conciergePhone}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#747878] leading-relaxed">
                  Harap jaga ketenangan ruangan. Area ini dilengkapi STC-52 soundproof seals demi kenyamanan seluruh member.
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
