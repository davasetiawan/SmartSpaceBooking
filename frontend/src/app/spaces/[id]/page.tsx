"use client";

import { FormEvent, use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  QrCode,
  Users,
  Wallet,
  Calendar,
  Wifi,
  Coffee,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Tag,
} from "lucide-react";
import {
  api,
  apiErrorMessage,
  isLoggedIn,
  mediaUrl,
  Promo,
  Space,
} from "@/lib/api";
import { addHours, cn, formatCurrency, SPACE_TYPES } from "@/lib/utils";
import { FileUpload } from "@/components/file-upload";

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function SpaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [tanggal, setTanggal] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [jamMulai, setJamMulai] = useState("09:00");
  const [durasi, setDurasi] = useState(4);
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoMsg, setPromoMsg] = useState("");
  const [availability, setAvailability] = useState<string>("");
  const [payment, setPayment] = useState<"transfer" | "qris">("transfer");
  const [bukti, setBukti] = useState<File | undefined>();

  useEffect(() => {
    api
      .getSpace(Number(id))
      .then(setSpace)
      .catch((err) => setError(apiErrorMessage(err, "Space tidak ditemukan")))
      .finally(() => setLoading(false));
  }, [id]);

  const jamSelesai = useMemo(
    () => addHours(jamMulai, durasi),
    [jamMulai, durasi],
  );

  const gross = space ? space.harga_per_jam * durasi : 0;
  const cut = promo ? (gross * promo.persentase_diskon) / 100 : 0;
  const total = gross - cut;

  const checkSlot = async () => {
    if (!tanggal) return;
    try {
      const res = await api.checkAvailability({
        id_space: Number(id),
        tanggal,
        jam_mulai: jamMulai,
        durasi_jam: durasi,
      });
      setAvailability(
        res.available
          ? "Slot waktu tersedia"
          : res.message || "Space sudah terisi pada jam tersebut!",
      );
    } catch (err) {
      setAvailability(apiErrorMessage(err, "Gagal cek ketersediaan"));
    }
  };

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    try {
      const data = await api.checkPromo(promoCode.trim());
      setPromo(data);
      setPromoMsg(
        `Diskon ${data.nama_diskon} (${data.persentase_diskon}%) berhasil diterapkan`,
      );
    } catch (err) {
      setPromo(null);
      setPromoMsg(
        apiErrorMessage(err, "Kode promo tidak sah atau sudah kedaluwarsa"),
      );
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      router.push("/auth");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const created = await api.createReservation(
        {
          id_space: Number(id),
          tanggal_reservasi: tanggal,
          jam_mulai: jamMulai,
          durasi_jam: durasi,
          nama_diskon: promo?.nama_diskon,
        },
        bukti,
      );
      setSuccess("Reservasi berhasil dibuat! Mengalihkan ke E-Ticket...");
      setTimeout(() => router.push(`/my-bookings/${created.id}`), 800);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal membuat reservasi"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FBF9F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
      </div>
    );
  }

  if (!space) {
    return (
      <div className="p-12 text-center bg-[#FBF9F5] min-h-screen">
        <p className="text-rose-600 font-medium">
          {error || "Space tidak ditemukan"}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-5 py-2 rounded-full bg-[#121212] text-white text-xs font-semibold uppercase"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#121212] font-sans pb-24">
      {/* Top Editorial Sub-header */}
      <div className="border-b border-[#EBE7DF] bg-[#FBF9F5]/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="w-full px-6 md:px-12 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#121212] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
            <span className="text-xs font-semibold uppercase text-[#4A6B5D] tracking-wider">
              WorkMates Verified Space
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Gallery & Space Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header Identity */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white border border-[#EBE7DF] text-[#121212]">
                  {SPACE_TYPES[space.tipe]}
                </span>
                <span className="text-xs text-[#666666] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#121212]" />
                  {space.kota || "Jakarta"} {space.jalan ? `• ${space.jalan}` : ""}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#121212] tracking-tight">
                {space.nama_space}
              </h1>
            </div>

            {/* Gallery Frames */}
            <div className="space-y-3">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#efeeea] border border-[#EBE7DF]">
                <img
                  src={
                    mediaUrl(space.foto) ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAQhzLllM2pknNymNv2eTSDKEpNa4Apa3GAIyQUev0qpKbF_qxFezCUROX-Viie21wQ6sem7_ERHBQ1hlcXx8EjpESD69pIziyPuT1vAeHAyw7hXNxVKW3ymiqFOKTYkWsjiDFf8pEm5ALfC1yjXEPK8E8SZahPiq7naqaGSMxMN0pPHdpryhOuyWuWSDblRy86UPVQZhId07bDubtA3KI-HmfEN4kIixnB_yLRkvY8VGsP2BbJq9S1jw"
                  }
                  alt={space.nama_space}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Architectural Key Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#EBE7DF]">
              <div className="space-y-1 border-l-2 border-[#121212] pl-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                  Kapasitas
                </p>
                <p className="text-base font-semibold text-[#121212]">
                  {space.kapasitas} Orang
                </p>
              </div>
              <div className="space-y-1 border-l-2 border-[#EBE7DF] pl-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                  WiFi Fiber
                </p>
                <p className="text-base font-semibold text-[#121212]">1 Gbps</p>
              </div>
              <div className="space-y-1 border-l-2 border-[#EBE7DF] pl-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                  Peredam Suara
                </p>
                <p className="text-base font-semibold text-[#121212]">STC 52</p>
              </div>
              <div className="space-y-1 border-l-2 border-[#EBE7DF] pl-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                  Akses
                </p>
                <p className="text-base font-semibold text-[#121212]">Keycard QR</p>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-3 pt-4 border-t border-[#EBE7DF]">
              <h3 className="text-2xl font-serif font-semibold text-[#121212]">
                Architectural Narrative
              </h3>
              <p className="text-[#666666] leading-relaxed text-base">
                {space.deskripsi}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 pt-6 border-t border-[#EBE7DF]">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-serif font-semibold text-[#121212]">
                  Fasilitas Terkurasi & Inklusi
                </h3>
                <span className="text-xs text-[#666666] uppercase font-semibold tracking-wider">
                  Standard WorkMates
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AmenityCard
                  icon={Coffee}
                  title="Barista Coffee Service"
                  desc="Kopi pour-over artisanal dari biji lokal pilihan disajikan segar."
                />
                <AmenityCard
                  icon={Wifi}
                  title="High-Speed Dedicated Fiber"
                  desc="Koneksi simetris 1 Gbps dengan redundansi backup."
                />
                <AmenityCard
                  icon={VolumeX}
                  title="Acoustic Soundproofing"
                  desc="Ruangan kedap suara untuk rapat rahasia dan fokus maksimal."
                />
                <AmenityCard
                  icon={QrCode}
                  title="24/7 Digital Pass Keycard"
                  desc="Akses masuk berbasis QR Code otomatis terhubung ke E-Ticket."
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Reservation Engine (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-[#EBE7DF] p-6 md:p-8 space-y-6 shadow-[0_10px_30px_rgba(18,18,18,0.03)]"
            >
              {/* Rate Header */}
              <div className="flex items-baseline justify-between border-b border-[#EBE7DF] pb-5">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif font-bold text-[#121212] font-mono">
                      {formatCurrency(space.harga_per_jam)}
                    </span>
                    <span className="text-sm text-[#666666]">/ jam</span>
                  </div>
                  <p className="text-xs text-[#666666] mt-1 font-medium">
                    Workplace Sanctuary Tier 1
                  </p>
                </div>
                <span className="bg-[#f5f3ef] text-[#121212] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#EBE7DF]">
                  Kapasitas {space.kapasitas} Orang
                </span>
              </div>

              {/* Form Engine */}
              <form onSubmit={submit} className="space-y-4">
                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                    Tanggal Reservasi
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-4 text-[#666666] w-4 h-4 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      onBlur={checkSlot}
                      className="w-full pl-11 pr-4 py-3 bg-[#fbf9f5] border border-[#EBE7DF] rounded-full text-sm font-semibold text-[#121212] focus:outline-none focus:border-[#121212] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Slot Selector Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                      Jam Mulai
                    </label>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-3.5 text-[#666666] w-4 h-4 pointer-events-none" />
                      <select
                        value={jamMulai}
                        onChange={(e) => setJamMulai(e.target.value)}
                        onBlur={checkSlot}
                        className="w-full pl-10 pr-6 py-2.5 bg-[#fbf9f5] border border-[#EBE7DF] rounded-full text-sm font-semibold text-[#121212] appearance-none focus:outline-none focus:border-[#121212] cursor-pointer"
                      >
                        {HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h} WIB
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                      Durasi Sewa
                    </label>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-3.5 text-[#666666] w-4 h-4 pointer-events-none" />
                      <select
                        value={durasi}
                        onChange={(e) => setDurasi(Number(e.target.value))}
                        onBlur={checkSlot}
                        className="w-full pl-10 pr-6 py-2.5 bg-[#fbf9f5] border border-[#EBE7DF] rounded-full text-sm font-semibold text-[#121212] appearance-none focus:outline-none focus:border-[#121212] cursor-pointer"
                      >
                        <option value={1}>1 Jam</option>
                        <option value={2}>2 Jam</option>
                        <option value={4}>4 Jam</option>
                        <option value={8}>8 Jam</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Auto End Time */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#fbf9f5] rounded-xl border border-[#EBE7DF] text-xs">
                  <div className="flex items-center gap-2 text-[#666666]">
                    <span>Selesai:</span>
                    <strong className="text-[#121212] font-bold font-mono">
                      {jamSelesai} WIB
                    </strong>
                  </div>
                  {availability && (
                    <span
                      className={cn(
                        "font-semibold flex items-center gap-1",
                        availability.includes("tersedia")
                          ? "text-[#4A6B5D]"
                          : "text-[#9E3B3B]",
                      )}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {availability}
                    </span>
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5 pt-2 border-t border-[#EBE7DF]">
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                    Voucher Promo / Kode Referral
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3.5 top-3 text-[#666666] w-4 h-4" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        placeholder="Contoh: HEMAT50"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#fbf9f5] border border-[#EBE7DF] rounded-full text-xs font-semibold uppercase text-[#121212] focus:outline-none focus:border-[#121212]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-semibold uppercase text-[#121212] hover:bg-[#121212] hover:text-white transition-colors"
                    >
                      Terapkan
                    </button>
                  </div>
                  {promoMsg && (
                    <p
                      className={cn(
                        "text-xs font-medium mt-1",
                        promo ? "text-[#4A6B5D]" : "text-[#9E3B3B]",
                      )}
                    >
                      {promoMsg}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div className="space-y-2 pt-2 border-t border-[#EBE7DF]">
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayment("transfer")}
                      className={cn(
                        "p-3 rounded-xl border text-left flex flex-col justify-between transition-all",
                        payment === "transfer"
                          ? "border-[#121212] bg-[#121212] text-white"
                          : "border-[#EBE7DF] bg-[#fbf9f5] text-[#121212]",
                      )}
                    >
                      <Wallet className="w-4 h-4 mb-2" />
                      <span className="text-xs font-semibold">
                        Transfer Bank
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayment("qris")}
                      className={cn(
                        "p-3 rounded-xl border text-left flex flex-col justify-between transition-all",
                        payment === "qris"
                          ? "border-[#121212] bg-[#121212] text-white"
                          : "border-[#EBE7DF] bg-[#fbf9f5] text-[#121212]",
                      )}
                    >
                      <QrCode className="w-4 h-4 mb-2" />
                      <span className="text-xs font-semibold">
                        QRIS Auto Pay
                      </span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f5f3ef] border border-[#EBE7DF] text-xs text-[#666666]">
                    {payment === "transfer" ? (
                      <p>
                        Transfer ke <strong>BCA 1234567890</strong> a.n. Smart
                        Space Studio. Upload bukti transaksi di bawah.
                      </p>
                    ) : (
                      <p>
                        Scan QRIS resmi pengelola di konfirmasi pembayaran.
                      </p>
                    )}
                  </div>
                </div>

                {/* Proof Upload */}
                <FileUpload
                  label="BUKTI PEMBAYARAN (TRANSFER / QRIS)"
                  sublabel="Seret atau unggah foto/screenshot struk bukti transfer"
                  accept="image/*"
                  value={bukti || null}
                  onChange={(file) => setBukti(file || undefined)}
                />

                {/* Price Breakdown */}
                <div className="space-y-2 border-t border-[#EBE7DF] pt-4 text-sm">
                  <div className="flex justify-between text-[#666666]">
                    <span>
                      Subtotal ({durasi} jam @{" "}
                      {formatCurrency(space.harga_per_jam)})
                    </span>
                    <span className="font-mono text-[#121212]">
                      {formatCurrency(gross)}
                    </span>
                  </div>
                  {promo && (
                    <div className="flex justify-between text-[#4A6B5D] font-medium">
                      <span>Potongan Promo ({promo.persentase_diskon}%)</span>
                      <span className="font-mono">
                        - {formatCurrency(cut)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif font-bold text-lg text-[#121212] pt-2 border-t border-[#EBE7DF]">
                    <span>Total Pembayaran</span>
                    <span className="font-mono">{formatCurrency(total)}</span>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-[#9E3B3B] font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </p>
                )}
                {success && (
                  <p className="text-xs text-[#4A6B5D] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#121212]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Konfirmasi &amp; Reservasi Space</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AmenityCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#EBE7DF]">
      <div className="w-9 h-9 rounded-full bg-[#f5f3ef] flex items-center justify-center shrink-0 text-[#121212]">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-[#121212] mb-0.5">{title}</h4>
        <p className="text-xs text-[#666666] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
