"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Loader2,
  MapPin,
  Printer,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  api,
  apiErrorMessage,
  ETicketData,
  isLoggedIn,
  mediaUrl,
} from "@/lib/api";
import { cn, formatClock, formatDate, formatCurrency, RESERVATION_STATUS, SPACE_TYPES } from "@/lib/utils";

export default function ETicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [ticket, setTicket] = useState<ETicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth");
      return;
    }
    api
      .getETicket(Number(id))
      .then(setTicket)
      .catch((err) => setError(apiErrorMessage(err, "Gagal memuat E-Ticket")))
      .finally(() => setLoading(false));
  }, [id, router]);

  const copyCode = () => {
    if (!ticket) return;
    navigator.clipboard.writeText(ticket.kode_booking);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FBF9F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-12 text-center bg-[#FBF9F5] min-h-screen">
        <p className="text-rose-600 font-medium mb-4">
          {error || "E-Ticket tidak ditemukan"}
        </p>
        <Link
          href="/my-bookings"
          className="px-5 py-2 rounded-full bg-[#121212] text-white text-xs font-semibold uppercase"
        >
          Kembali ke Pesanan Saya
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#121212] font-sans pb-24">
      {/* Top Action Bar */}
      <div className="no-print border-b border-[#EBE7DF] bg-[#FBF9F5]/90 backdrop-blur-md sticky top-16 z-30 py-4 px-6 md:px-12">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#121212] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pesanan Saya
          </Link>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-semibold uppercase hover:bg-[#121212] hover:text-white transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Cetak Pass
          </button>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="w-full px-6 md:px-12 lg:px-16 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#4A6B5D]/20">
          <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
          Active Verification • Ready for Entry
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#121212] mb-3">
          Digital Access Key &amp; Pass
        </h1>
        <p className="text-sm md:text-base text-[#666666] max-w-xl mx-auto">
          Tunjukkan pass arsitektural ini di turnstile front-desk atau scanner concierge untuk akses instant tanpa kontak.
        </p>
      </div>

      {/* Ticket Slip Card Centerpiece */}
      <div className="w-full px-6 md:px-12 lg:px-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#EBE7DF] shadow-[0_10px_30px_rgba(18,18,18,0.03)] overflow-hidden relative"
        >
          {/* Slip Header */}
          <div className="p-6 md:p-8 bg-[#FAF8F5] border-b border-[#EBE7DF]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-serif font-bold text-[#121212]">
                    SMART SPACE
                  </span>
                  <span className="text-xs text-[#666666] font-medium">
                    • Architectural Workplace
                  </span>
                </div>
                <p className="text-base font-semibold text-[#121212]">
                  {ticket.space?.nama_space}
                </p>
                <p className="text-xs text-[#666666] mt-0.5">
                  {ticket.space?.kota || "Jakarta"} • {SPACE_TYPES[ticket.space?.tipe || "desk"]}
                </p>
              </div>

              {/* Status Badge */}
              <div className="self-start sm:self-center">
                <span className={cn("inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", RESERVATION_STATUS[ticket.status].color)}>
                  <ShieldCheck className="w-4 h-4" />
                  {RESERVATION_STATUS[ticket.status].label}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EBE7DF]/80 flex flex-wrap items-center justify-between gap-2 text-xs text-[#666666]">
              <span>KODE BOOKING: <strong className="font-mono text-[#121212]">{ticket.kode_booking}</strong></span>
              <span>NO. TICKET: <strong className="font-mono text-[#121212]">{ticket.ticket_number}</strong></span>
            </div>
          </div>

          {/* Hero Scannable QR Code Section */}
          <div className="px-6 py-8 md:p-10 flex flex-col items-center justify-center text-center bg-white">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] shadow-inner mb-4 transition-transform duration-300 hover:scale-[1.01]">
              <div className="bg-white p-4 rounded-xl border border-[#EBE7DF] inline-block">
                <QRCodeSVG
                  value={ticket.qr_payload || ticket.kode_booking}
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            <div className="font-mono text-xs tracking-wider text-[#666666] bg-[#f5f3ef] px-4 py-1.5 rounded-full border border-[#EBE7DF] mb-3 selection:bg-[#121212] selection:text-white">
              {ticket.qr_payload || ticket.kode_booking}
            </div>

            <p className="text-sm font-semibold text-[#121212] mb-2">
              Scan pada Scanner Front Desk untuk 1-Click Check-In
            </p>

            <div className="flex items-center gap-2 text-xs text-[#666666]">
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#efeeea] px-3 py-1 rounded-md border border-[#EBE7DF] font-mono text-[#121212] font-semibold transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Tersalin!" : "Salin Kode"}
              </button>
            </div>
          </div>

          {/* Perforated Tear-Line Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t-2 border-dashed border-[#EBE7DF] mx-6" />
          </div>

          {/* Booking Details Grid */}
          <div className="p-6 md:p-8 bg-[#FAF8F5] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  Nama Member / Tamu
                </span>
                <span className="block text-sm font-bold text-[#121212]">
                  {ticket.member?.nama_member || "Member Smart Space"}
                </span>
                <span className="block text-xs text-[#666666]">
                  {ticket.member?.instansi || "Independen Studio"}
                </span>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  Tanggal Reservasi
                </span>
                <span className="block text-sm font-bold text-[#121212]">
                  {formatDate(ticket.tanggal_reservasi)}
                </span>
                <span className="block text-xs text-[#666666]">
                  {formatClock(ticket.jam_mulai)} – {formatClock(ticket.jam_selesai)} ({ticket.durasi_jam} Jam)
                </span>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  Rincian Pembayaran
                </span>
                <span className="block text-sm font-bold font-mono text-[#121212]">
                  {formatCurrency(ticket.total_bayar)}
                </span>
                <span className="block text-xs text-[#4A6B5D] font-medium">
                  {ticket.status === "disetujui" || ticket.status === "aktif" ? "Lunas Terverifikasi" : "Menunggu Verifikasi"}
                </span>
              </div>
            </div>

            {/* Check-In Timestamps */}
            {(ticket.check_in_time || ticket.check_out_time) && (
              <div className="p-4 rounded-xl bg-white border border-[#EBE7DF] text-xs flex flex-wrap items-center justify-between gap-4">
                {ticket.check_in_time && (
                  <div>
                    <span className="text-[#666666]">Waktu Check-In: </span>
                    <strong className="text-[#4A6B5D]">
                      {new Date(ticket.check_in_time).toLocaleString("id-ID")}
                    </strong>
                  </div>
                )}
                {ticket.check_out_time && (
                  <div>
                    <span className="text-[#666666]">Waktu Check-Out: </span>
                    <strong className="text-[#121212]">
                      {new Date(ticket.check_out_time).toLocaleString("id-ID")}
                    </strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </main>
  );
}
