'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { checkSpaceAvailability } from '@/lib/api';

const AVAILABLE_ADDONS = [
  { id: 'coffee', name: 'Barista Single Origin Pour-over (2x)', price: 65000, icon: 'coffee' },
  { id: 'display', name: '4K Ultra-Wide Adapter & Wireless Clicker', price: 45000, icon: 'tv' },
  { id: 'lunch', name: 'Artisan Gourmet Bento & Cold Brew', price: 125000, icon: 'restaurant' },
  { id: 'parking', name: 'Reserved Valet & EV Charging Pass', price: 50000, icon: 'local_parking' },
];

type PaymentMethod = {
  id: number;
  nama: string;
  tipe: string;
  nomor_rekening?: string | null;
  atas_nama?: string | null;
  is_aktif: boolean;
};

const paymentIcon = (tipe: string) => {
  if (tipe === 'qris') return 'qr_code_2';
  if (tipe === 'e_wallet') return 'account_balance_wallet';
  if (tipe === 'cash') return 'payments';
  return 'account_balance';
};

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { spaces, addBooking, validateVoucher, currentUser } = useSpaceStore();

  const spaceIdParam = searchParams.get('spaceId');
  const selectedSpace = spaces.find(s => s.id === spaceIdParam) || spaces[0];

  const [date, setDate] = useState('2026-09-18');
  const [durationHours, setDurationHours] = useState(4);
  const [startTime, setStartTime] = useState('09:00');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['coffee']);
  
  // Guest fields
  const [guestName, setGuestName] = useState(currentUser?.name || 'Pradnya Paramita');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || 'guest@example.com');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+62 812-8923-1100');

  // Voucher
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; message: string } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // Payment
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const selectedPaymentMethod = paymentMethods.find((method) => method.id === paymentMethodId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculation
  const baseRental = useMemo(() => {
    return selectedSpace.hourlyRate * durationHours;
  }, [selectedSpace, durationHours]);

  const addOnsTotal = useMemo(() => {
    return selectedAddons.reduce((acc, id) => {
      const item = AVAILABLE_ADDONS.find(a => a.id === id);
      return acc + (item ? item.price : 0);
    }, 0);
  }, [selectedAddons]);

  const subtotal = baseRental + addOnsTotal;
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const serviceFee = 15000;
  const grandTotal = Math.max(0, subtotal - discountAmount + serviceFee);

  useEffect(() => {
    let alive = true;
    import('@/lib/api')
      .then(({ fetchPaymentMethods }) => fetchPaymentMethods())
      .then((methods: PaymentMethod[]) => {
        if (!alive) return;
        setPaymentMethods(methods);
        setPaymentMethodId(methods[0]?.id ?? null);
        setPaymentError('');
      })
      .catch((err: any) => {
        if (!alive) return;
        setPaymentError(err.message || 'Gagal memuat metode pembayaran');
      });
    return () => {
      alive = false;
    };
  }, []);

  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    try {
      const res = await validateVoucher(voucherInput, subtotal);
      if (res.valid) {
        setAppliedVoucher({ code: voucherInput.toUpperCase(), discount: res.discount, message: res.message });
        setVoucherError('');
      } else {
        setAppliedVoucher(null);
        setVoucherError(res.message);
      }
    } catch (err: any) {
      setAppliedVoucher(null);
      setVoucherError(err.message || 'Gagal memverifikasi voucher');
    }
  };

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setAvailabilityError('');
    const addOnNames = selectedAddons.map(id => AVAILABLE_ADDONS.find(a => a.id === id)?.name || '');

    try {
      if (!paymentProof) {
        throw new Error('Foto bukti pembayaran wajib diupload sebelum membuat reservasi');
      }

      const availability = await checkSpaceAvailability({
        id_space: Number(selectedSpace.id),
        tanggal: date,
        jam_mulai: startTime,
        durasi_jam: durationHours,
      });
      if (availability?.data?.available === false) {
        throw new Error(availability.data.message || 'Space sudah dipesan pada jam tersebut');
      }

      const res = await addBooking({
        spaceId: selectedSpace.id,
        date,
        jam_mulai: startTime,
        durationHours,
        kode_promo: appliedVoucher?.code,
        payment_method_id: paymentMethodId || undefined,
        bukti_pembayaran: paymentProof,
        guestName,
        guestEmail,
        guestPhone,
        addOns: addOnNames
      });

      const newBookingId = res?.data?.id || res?.id || 'my';
      router.push(`/ticket/${newBookingId}`);
    } catch (err: any) {
      const message = err.message || 'Terjadi kesalahan';
      setAvailabilityError(message);
      alert(`Gagal membuat reservasi: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      {/* Breadcrumb Header */}
      <section className="w-full py-6 px-4 sm:px-8 lg:px-16 border-b border-[#EBE7DF] bg-[#f5f3ef]/50">
        <div className="w-full flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#747878]">
            <a href="/spaces" className="hover:text-[#121212] transition-colors">Katalog Ruang</a>
            <span>/</span>
            <span>{selectedSpace.city}</span>
            <span>/</span>
            <span className="text-[#121212] font-semibold">{selectedSpace.name}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#4A6B5D] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
            <span>Slot Tersedia untuk Reservasi Instan</span>
          </div>
        </div>
      </section>

      {/* Main Reservation Canvas */}
      <main className="w-full py-10 px-4 sm:px-8 lg:px-16 flex-1">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Space Showcase & Reservation Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Space Media Showcase */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#efeeea] mb-6">
                <img
                  src={selectedSpace.imageUrl}
                  alt={selectedSpace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#121212] uppercase tracking-wider border border-[#EBE7DF]">
                  {selectedSpace.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Acoustically Certified STC-52</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#747878]">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{selectedSpace.location}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#121212]">
                  {selectedSpace.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#5e5e5e] leading-relaxed font-light">
                  {selectedSpace.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="mt-6 pt-6 border-t border-[#EBE7DF] grid grid-cols-3 gap-4 text-center font-mono text-xs">
                <div className="p-3 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF]">
                  <span className="text-[10px] text-[#747878] uppercase block">Kapasitas</span>
                  <span className="font-bold text-[#121212] text-sm">{selectedSpace.capacity} Orang</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF]">
                  <span className="text-[10px] text-[#747878] uppercase block">Tarif / Jam</span>
                  <span className="font-bold text-[#121212] text-sm">Rp {selectedSpace.hourlyRate.toLocaleString('id-ID')}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF]">
                  <span className="text-[10px] text-[#747878] uppercase block">Akses</span>
                  <span className="font-bold text-[#4A6B5D] text-sm">Digital QR Pass</span>
                </div>
              </div>
            </div>

            {/* Schedule & Duration Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-semibold text-[#121212] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A6B5D]">calendar_month</span>
                <span>Pilih Jadwal &amp; Durasi Sewa</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-2">
                    Tanggal Penggunaan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-2">
                    Waktu Mulai
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none cursor-pointer"
                  >
                    <option value="08:00">08:00 WIB (Pagi)</option>
                    <option value="09:00">09:00 WIB (Pagi)</option>
                    <option value="10:00">10:00 WIB (Pagi)</option>
                    <option value="13:00">13:00 WIB (Siang)</option>
                    <option value="14:00">14:00 WIB (Siang)</option>
                    <option value="16:00">16:00 WIB (Sore)</option>
                    <option value="18:00">18:00 WIB (Malam)</option>
                  </select>
                </div>
              </div>

              {/* Duration Chips */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-2">
                  Durasi Sesi
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[2, 4, 6, 8].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setDurationHours(hours)}
                      className={`p-3 rounded-2xl border text-center font-mono transition-all ${
                        durationHours === hours
                          ? 'bg-[#121212] text-white border-[#121212] font-bold shadow-sm'
                          : 'bg-[#fbf9f5] text-[#121212] border-[#EBE7DF] hover:border-[#121212]'
                      }`}
                    >
                      <span className="block text-sm">{hours} Jam</span>
                      <span className="text-[10px] opacity-70">
                        {hours === 8 ? 'Full Day' : 'Fleksibel'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated Add-ons */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#121212] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A6B5D]">room_service</span>
                <span>Fasilitas Tambahan &amp; Layanan Concierge</span>
              </h2>

              <div className="space-y-3">
                {AVAILABLE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#fbf9f5] border-[#121212]'
                          : 'bg-white border-[#EBE7DF] hover:border-[#747878]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                          isChecked ? 'bg-[#121212] border-[#121212] text-white' : 'border-[#EBE7DF] bg-white'
                        }`}>
                          {isChecked && <span className="text-xs">✓</span>}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#121212]">
                          {addon.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#121212]">
                        +Rp {addon.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#121212] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A6B5D]">badge</span>
                <span>Identitas Pemegang Pass</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs sm:text-sm font-medium text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-1.5">
                    Email Konfirmasi
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs sm:text-sm font-medium text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-semibold block mb-1.5">
                    WhatsApp / Telepon
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs sm:text-sm font-medium text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Checkout & Payment Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Price Calculation Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <span className="font-serif text-lg font-bold text-[#121212]">
                  Ringkasan Reservasi
                </span>
                <span className="px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold">
                  Instan Konfirmasi
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Sewa Ruang ({durationHours} Jam @ Rp {selectedSpace.hourlyRate.toLocaleString('id-ID')})</span>
                  <span className="font-bold text-[#121212]">Rp {baseRental.toLocaleString('id-ID')}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-[#5e5e5e]">
                    <span>Layanan Tambahan ({selectedAddons.length} item)</span>
                    <span className="font-bold text-[#121212]">Rp {addOnsTotal.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5e5e5e]">
                  <span>Biaya Layanan &amp; Pemeliharaan</span>
                  <span className="font-bold text-[#121212]">Rp {serviceFee.toLocaleString('id-ID')}</span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between text-[#4A6B5D] font-bold">
                    <span>Diskon Voucher ({appliedVoucher.code})</span>
                    <span>- Rp {appliedVoucher.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#EBE7DF] flex items-baseline justify-between">
                  <span className="font-serif text-base font-bold text-[#121212]">Total Pembayaran</span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#121212]">
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Voucher Input */}
              <form onSubmit={handleApplyVoucher} className="space-y-2 pt-2 border-t border-[#EBE7DF]">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block">
                  Punya Kode Promo / Voucher? (Gunakan: SONDERLUXURY)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: SONDERLUXURY"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs uppercase font-mono font-bold text-[#121212] focus:border-[#121212] outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#121212] text-white text-xs font-semibold hover:bg-[#2b2b2b]"
                  >
                    Terapkan
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="text-xs text-[#4A6B5D] font-mono">{appliedVoucher.message}</p>
                )}
                {voucherError && (
                  <p className="text-xs text-[#9E3B3B] font-mono">{voucherError}</p>
                )}
              </form>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-[#EBE7DF]">
                <label className="text-xs font-mono uppercase tracking-wider text-[#747878] font-bold block">
                  Metode Pembayaran
                </label>

                {paymentError && (
                  <p className="text-xs text-[#9E3B3B] font-mono">{paymentError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethodId(method.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        paymentMethodId === method.id
                          ? 'border-[#121212] bg-[#fbf9f5] font-bold'
                          : 'border-[#EBE7DF] bg-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#121212] text-[20px]">{paymentIcon(method.tipe)}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#121212] truncate">{method.nama}</span>
                        <span className="text-[10px] text-[#747878] truncate">
                          {method.nomor_rekening ? `${method.nomor_rekening} · ${method.atas_nama || '-'}` : method.tipe.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {!paymentError && paymentMethods.length === 0 && (
                  <p className="text-xs text-[#747878] font-mono">Belum ada metode pembayaran aktif.</p>
                )}

                {selectedPaymentMethod && (
                  <div className="p-3 rounded-xl bg-[#fbf9f5] border border-[#EBE7DF] text-[11px] font-mono text-[#5e5e5e]">
                    Pembayaran dipilih: <span className="font-bold text-[#121212]">{selectedPaymentMethod.nama}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#EBE7DF]">
                <div className="rounded-2xl border border-[#C88A2B]/30 bg-[#C88A2B]/10 p-4 space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#121212] font-bold block">
                    Wajib Upload Bukti Transfer <span className="text-[#9E3B3B]">*</span>
                  </label>
                  <p className="text-[11px] text-[#5e5e5e] leading-relaxed">
                    Transfer sesuai total pembayaran, lalu upload screenshot/foto bukti. Reservasi tidak akan dibuat tanpa file bukti pembayaran.
                  </p>
                </div>
                <label className={`block p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${paymentProof ? 'border-[#4A6B5D] bg-[#4A6B5D]/5' : 'border-[#C88A2B] bg-white hover:border-[#121212]'}`}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    required
                    className="sr-only"
                    onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                  />
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${paymentProof ? 'text-[#4A6B5D]' : 'text-[#C88A2B]'}`}>{paymentProof ? 'check_circle' : 'upload_file'}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-bold text-[#121212] truncate">
                        {paymentProof ? paymentProof.name : 'Klik untuk upload foto bukti transfer'}
                      </p>
                      <p className="text-[10px] text-[#747878] font-mono">
                        Format JPEG, PNG, atau WEBP. Maks 2MB.
                      </p>
                    </div>
                  </div>
                </label>
                {!paymentProof && (
                  <p className="text-[11px] text-[#9E3B3B] font-mono">
                    Tombol konfirmasi terkunci sampai bukti transfer diupload.
                  </p>
                )}
              </div>

              {availabilityError && (
                <p className="text-xs text-[#9E3B3B] font-mono bg-[#9E3B3B]/10 border border-[#9E3B3B]/20 rounded-xl p-3">
                  {availabilityError}
                </p>
              )}

              <div className="text-xs font-mono text-[#C88A2B] bg-[#C88A2B]/10 border border-[#C88A2B]/20 rounded-xl p-3">
                Reservasi masuk sebagai belum diverifikasi. Admin harus cek pembayaran manual dan menyetujui dulu sebelum pass bisa dipakai.
              </div>

              {/* Confirm CTA */}
              <button
                type="button"
                disabled={isSubmitting || paymentMethods.length === 0 || !paymentProof}
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-full bg-[#121212] text-white font-semibold text-sm hover:bg-[#4A6B5D] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Menerbitkan Digital Pass...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">lock_open</span>
                    <span>Konfirmasi &amp; Terbitkan E-Ticket Pass</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#747878] text-center">
                <span>🔒 256-Bit Encrypted</span>
                <span>•</span>
                <span>Gratis Reschedule &le; 2 Jam</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-sm">Memuat Formulir Reservasi...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
