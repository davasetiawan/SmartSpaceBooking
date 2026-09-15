"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, Filter, Calendar, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";
import { Reservation, ReservationStatus } from "@/lib/api";
import { api, apiErrorMessage } from "@/lib/api";
import { cn, formatCurrency, formatDate, formatClock, RESERVATION_STATUS, SPACE_TYPES } from "@/lib/utils";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "belum_dikonfirm", label: "Menunggu Konfirmasi" },
  { value: "disetujui", label: "Disetujui" },
  { value: "aktif", label: "Aktif" },
  { value: "selesai", label: "Selesai" },
  { value: "dibatalkan", label: "Dibatalkan" },
];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [spaces, setSpaces] = useState<Array<{ id: number; nama_space: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    status: "all",
    id_space: "all",
  });
  const [showStatus, setShowStatus] = useState(false);
  const [showSpace, setShowSpace] = useState(false);

  useEffect(() => {
    fetchSpaces();
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [filters]);

  const fetchSpaces = async () => {
    try {
      const data = await api.adminSpaces();
      setSpaces(data.map((s) => ({ id: s.id, nama_space: s.nama_space })));
    } catch {}
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filters.month) params.month = filters.month;
      if (filters.year) params.year = filters.year;
      if (filters.status !== "all") params.status = filters.status;
      if (filters.id_space !== "all") params.id_space = filters.id_space;
      const data = await api.adminReservations(params);
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: "disetujui" | "ditolak") => {
    try {
      await api.confirmReservation(id, status);
      fetchReservations();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal mengubah status"));
    }
  };

  const handleCheckIn = async (id: number) => {
    try {
      await api.checkIn(id);
      fetchReservations();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal check-in"));
    }
  };

  const handleCheckOut = async (id: number) => {
    try {
      await api.checkOut(id);
      fetchReservations();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal check-out"));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">MASTER BOOKINGS</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl mt-1">Log Reservasi</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input type="month" value={`${filters.year}-${filters.month}`} onChange={(e) => { const [y, m] = e.target.value.split("-"); setFilters({ ...filters, year: y, month: m }); }} className="pl-10 pr-4 py-2 rounded-[10px] border border-[var(--color-border)]" />
            </div>
            <div className="relative">
              <button onClick={() => setShowStatus(!showStatus)} className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[var(--color-border)] bg-white text-sm">
                <Filter className="h-4 w-4" />
                {STATUS_OPTIONS.find((s) => s.value === filters.status)?.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {showStatus && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full left-0 mt-1 w-48 bg-white border border-[var(--color-border)] rounded-[12px] shadow-lg py-1 z-20">
                    {STATUS_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => { setFilters({ ...filters, status: opt.value }); setShowStatus(false); }} className={cn("w-full px-3 py-2 text-left text-sm", filters.status === opt.value ? "bg-[var(--color-bg-primary)] font-medium" : "")}>{opt.label}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <button onClick={() => setShowSpace(!showSpace)} className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[var(--color-border)] bg-white text-sm">
                <Filter className="h-4 w-4" />
                {filters.id_space === "all" ? "Semua Space" : spaces.find((s) => s.id === Number(filters.id_space))?.nama_space}
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {showSpace && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full left-0 mt-1 w-56 bg-white border border-[var(--color-border)] rounded-[12px] shadow-lg py-1 z-20 max-h-60 overflow-auto">
                    <button onClick={() => { setFilters({ ...filters, id_space: "all" }); setShowSpace(false); }} className={cn("w-full px-3 py-2 text-left text-sm", filters.id_space === "all" ? "bg-[var(--color-bg-primary)] font-medium" : "")}>Semua Space</button>
                    {spaces.map((s) => (
                      <button key={s.id} onClick={() => { setFilters({ ...filters, id_space: String(s.id) }); setShowSpace(false); }} className={cn("w-full px-3 py-2 text-left text-sm", filters.id_space === String(s.id) ? "bg-[var(--color-bg-primary)] font-medium" : "")}>{s.nama_space}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {(filters.month || filters.year || filters.status !== "all" || filters.id_space !== "all") && (
              <button onClick={() => setFilters({ month: "", year: "", status: "all", id_space: "all" })} className="px-3 py-2 rounded-[10px] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]">Hapus Filter</button>
            )}
          </div>
        </div>

        {reservations.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-secondary)]">Tidak ada reservasi</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-bg-primary)] text-left text-sm text-[var(--color-text-secondary)]">
                  <th className="p-4">Kode Booking</th>
                  <th className="p-4">Space</th>
                  <th className="p-4">Member</th>
                  <th className="p-4">Tanggal & Jam</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-primary)]">
                    <td className="p-4 font-mono text-sm">{res.kode_booking}</td>
                    <td className="p-4">{res.space?.nama_space || `Space #${res.id_space}`} <span className="text-xs text-[var(--color-text-secondary)]">({SPACE_TYPES[res.space?.tipe || "desk"]})</span></td>
                    <td className="p-4">{res.member?.nama_member}</td>
                    <td className="p-4 text-sm text-[var(--color-text-secondary)]">{formatDate(res.tanggal_reservasi)}<br />{formatClock(res.jam_mulai)}–{formatClock(res.jam_selesai)}</td>
                    <td className="p-4 font-mono">{formatCurrency(res.total_bayar)}</td>
                    <td className="p-4">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", RESERVATION_STATUS[res.status as ReservationStatus].color)}>
                        {RESERVATION_STATUS[res.status as ReservationStatus].label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {res.status === "belum_dikonfirm" && (
                          <>
                            <button onClick={() => handleStatusChange(res.id, "disetujui")} className="px-2 py-1 rounded-[6px] bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs hover:bg-[#4A6B5D]/20">Setujui</button>
                            <button onClick={() => handleStatusChange(res.id, "ditolak")} className="px-2 py-1 rounded-[6px] bg-rose-100 text-rose-700 text-xs hover:bg-rose-200">Tolak</button>
                          </>
                        )}
                        {res.status === "disetujui" && (
                          <button onClick={() => handleCheckIn(res.id)} className="px-2 py-1 rounded-[6px] bg-[#C88A2B]/10 text-[#C88A2B] text-xs hover:bg-[#C88A2B]/20">Check-In</button>
                        )}
                        {res.status === "aktif" && (
                          <button onClick={() => handleCheckOut(res.id)} className="px-2 py-1 rounded-[6px] bg-[#121212]/10 text-[#121212] text-xs hover:bg-[#121212]/20">Check-Out</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}