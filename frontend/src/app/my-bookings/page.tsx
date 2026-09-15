"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  MapPin,
  QrCode,
  XCircle,
} from "lucide-react";
import { api, apiErrorMessage, isLoggedIn, mediaUrl, Reservation } from "@/lib/api";
import { cn, formatClock, formatDate, formatCurrency, RESERVATION_STATUS, SPACE_TYPES } from "@/lib/utils";

const TABS = [
  { id: "all", label: "Semua" },
  { id: "belum_dikonfirm", label: "Menunggu Konfirmasi" },
  { id: "disetujui", label: "Disetujui" },
  { id: "aktif", label: "Aktif" },
  { id: "selesai", label: "Selesai" },
  { id: "dibatalkan", label: "Dibatalkan" },
];

export default function MyBookingsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth");
      return;
    }
    fetchMyBookings();
  }, [router]);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyReservations();
      setReservations(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat daftar pesanan Anda"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan reservasi ini?")) return;
    try {
      await api.cancelReservation(id);
      fetchMyBookings();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal membatalkan reservasi"));
    }
  };

  const filtered = useMemo(() => {
    if (activeTab === "all") return reservations;
    return reservations.filter((r) => r.status === activeTab);
  }, [reservations, activeTab]);

  const counts = useMemo(() => {
    const activeOrUpcoming = reservations.filter((r) => r.status === "aktif" || r.status === "disetujui").length;
    const pending = reservations.filter((r) => r.status === "belum_dikonfirm").length;
    const completed = reservations.filter((r) => r.status === "selesai").length;
    return { activeOrUpcoming, pending, completed };
  }, [reservations]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FBF9F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#121212] font-sans pb-24">
      {/* Page Header Banner */}
      <section className="border-b border-[#EBE7DF] bg-[#FBF9F5] pt-12 pb-8 px-6 md:px-12">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
              Guest Reservation Ledger
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#121212] mt-1">
              Pesanan Saya — Folio &amp; Pass
            </h1>
          </div>

          {/* Summary Strip */}
          <div className="flex flex-wrap items-center gap-2 bg-white border border-[#EBE7DF] px-4 py-2 rounded-full text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#4A6B5D]">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
              {counts.activeOrUpcoming} Aktif &amp; Upcoming
            </span>
            <span className="text-[#EBE7DF]">•</span>
            <span className="flex items-center gap-1.5 text-[#C88A2B]">
              <span className="w-2 h-2 rounded-full bg-[#C88A2B]" />
              {counts.pending} Menunggu
            </span>
            <span className="text-[#EBE7DF]">•</span>
            <span className="text-[#666666]">{counts.completed} Selesai</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 md:px-12 lg:px-16 w-full mt-8">
        <div className="border-b border-[#EBE7DF] mb-8 overflow-x-auto no-scrollbar">
          <div className="flex space-x-8 min-w-max pb-0 text-xs uppercase tracking-wider font-semibold">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              const count = tab.id === "all" ? reservations.length : reservations.filter((r) => r.status === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-3 border-b-2 transition-all flex items-center gap-2",
                    active
                      ? "border-[#121212] text-[#121212] font-bold"
                      : "border-transparent text-[#666666] hover:text-[#121212]",
                  )}
                >
                  <span>{tab.label}</span>
                  <span className="bg-[#efeeea] px-2 py-0.5 rounded-full text-[10px] font-mono text-[#121212]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reservations Stack */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#EBE7DF] rounded-2xl">
            <p className="text-[#666666] text-base font-serif">
              Tidak ada pesanan pada status ini.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filtered.map((res, idx) => (
                <motion.article
                  key={res.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-[#EBE7DF] rounded-2xl p-6 lg:p-8 transition-all hover:shadow-[0_10px_30px_rgba(18,18,18,0.04)] relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Space Image */}
                    <div className="lg:col-span-4 relative rounded-xl overflow-hidden aspect-[16/10] bg-[#efeeea]">
                      <img
                        src={
                          mediaUrl(res.space?.foto) ||
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuBw56UiIMIktjNVUBTXNL6AvLFkCmoEGFbRvpueAjXUURvkgknn4sSi1tlA9Q7hy1DROsYKsKmjn6Pv4rjWERFVm-yP08nLXC4iQgHFORPUEHb5yHq4Ewg4KrSLHTFRpdelU4DWWwd_pW2ARccDIiYLcPLsB0RCY6RRCVLeUT8POCjNnYDd_6Fxz1Pf_wGUQWfUABVULD9AsRXGWl0vGPnuxNxC6Ouy9evv9ZgbDXePce_zhz0LlDyTiA"
                        }
                        alt={res.space?.nama_space}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[#EBE7DF] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className={cn("w-2 h-2 rounded-full", RESERVATION_STATUS[res.status].color.includes("emerald") ? "bg-emerald-600 animate-pulse" : "bg-[#121212]")} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#121212]">
                          {RESERVATION_STATUS[res.status].label}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                              Kode Booking
                            </span>
                            <span className="font-mono text-xs text-[#121212] bg-[#f5f3ef] px-2.5 py-1 rounded border border-[#EBE7DF] font-semibold">
                              {res.kode_booking}
                            </span>
                          </div>
                          <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase", RESERVATION_STATUS[res.status].color)}>
                            {RESERVATION_STATUS[res.status].label}
                          </span>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-[#121212]">
                          {res.space?.nama_space || `Space #${res.id_space}`}
                        </h2>
                        <p className="text-sm text-[#666666] mt-1 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#121212]" />
                          {res.space?.kota || "Jakarta"} • {SPACE_TYPES[res.space?.tipe || "desk"]}
                        </p>
                      </div>

                      {/* Details Box */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#EBE7DF]">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                            Waktu Reservasi
                          </p>
                          <p className="text-sm font-semibold text-[#121212] flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#666666]" />
                            {formatDate(res.tanggal_reservasi)}
                          </p>
                          <p className="text-xs text-[#666666] mt-0.5">
                            {formatClock(res.jam_mulai)} – {formatClock(res.jam_selesai)} ({res.durasi_jam} Jam)
                          </p>
                        </div>
                        <div className="sm:border-l sm:border-[#EBE7DF] sm:pl-6">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                            Total Bayar
                          </p>
                          <p className="text-base font-bold font-mono text-[#121212]">
                            {formatCurrency(res.total_bayar)}
                          </p>
                          {res.potongan_diskon > 0 && (
                            <p className="text-[11px] text-[#4A6B5D] font-medium mt-0.5">
                              Diskon {formatCurrency(res.potongan_diskon)} diterapkan
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2 text-xs text-[#666666]">
                          <Clock className="w-4 h-4 text-[#4A6B5D]" />
                          <span>Status: <strong className="text-[#121212] font-semibold">{RESERVATION_STATUS[res.status].label}</strong></span>
                        </div>

                        <div className="flex items-center gap-3">
                          {res.status === "belum_dikonfirm" && (
                            <button
                              onClick={() => handleCancel(res.id)}
                              className="text-xs text-[#9E3B3B] hover:underline font-semibold uppercase tracking-wider"
                            >
                              Batal
                            </button>
                          )}
                          <Link
                            href={`/my-bookings/${res.id}`}
                            className="inline-flex items-center gap-2 bg-[#121212] text-white hover:bg-[#121212]/90 text-xs font-semibold uppercase tracking-wider rounded-full px-5 py-2.5 transition-all shadow-sm"
                          >
                            <QrCode className="w-4 h-4" />
                            <span>Lihat Pass &amp; E-Ticket</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}
