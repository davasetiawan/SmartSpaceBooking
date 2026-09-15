"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Clock,
  Users,
  Wallet,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Building2,
  CalendarCheck,
  Search,
  Camera,
  ArrowRight,
  Sparkles,
  Check,
  QrCode,
  SlidersHorizontal,
} from "lucide-react";
import { AdminMember, MonthlyReport, Reservation, Space, readAuthUser, api, apiErrorMessage } from "@/lib/api";
import { cn, formatClock, formatCurrency, RESERVATION_STATUS } from "@/lib/utils";

const DONUT_COLORS = ["#4A6B5D", "#C88A2B", "#121212"];

export default function AdminDashboardPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [coworkingName, setCoworkingName] = useState("Coworking Space");

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const user = readAuthUser();
      if (user?.space_owner?.nama_coworking) {
        setCoworkingName(user.space_owner.nama_coworking);
      }
      const [m, s, r, rep] = await Promise.all([
        api.adminMembers(),
        api.adminSpaces(),
        api.adminReservations(),
        api.monthlyReport(new Date().getMonth() + 1, new Date().getFullYear()),
      ]);
      setMembers(m);
      setSpaces(s);
      setReservations(r);
      setReport(rep);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat data dashboard"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Filtered reservations for Today's Schedule
  const todaySched = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    let filtered = reservations.filter(
      (res) => res.tanggal_reservasi === today && res.status !== "dibatalkan",
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.kode_booking.toLowerCase().includes(q) ||
          r.member?.nama_member?.toLowerCase().includes(q) ||
          r.space?.nama_space?.toLowerCase().includes(q),
      );
    }
    return filtered.sort((a, b) => a.jam_mulai.localeCompare(b.jam_mulai));
  }, [reservations, searchQuery]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const activeToday = reservations.filter(
      (r) => r.tanggal_reservasi === today && (r.status === "aktif" || r.status === "disetujui"),
    ).length;
    const pendingCount = reservations.filter((r) => r.status === "belum_dikonfirm").length;
    const totalCap = spaces.reduce((sum, s) => sum + s.kapasitas, 0);
    const occPercent = totalCap > 0 ? Math.min(100, Math.round((activeToday / totalCap) * 100)) : 0;
    const monthlyIncome = report?.pendapatan_bersih || 0;

    return {
      activeToday,
      pendingCount,
      totalCap,
      occPercent,
      monthlyIncome,
    };
  }, [reservations, spaces, report]);

  // Donut chart category data
  const categoryChartData = useMemo(() => {
    if (!report?.per_tipe || report.per_tipe.length === 0) {
      return [];
    }
    const labelMap: Record<string, string> = {
      private_office: "Private Offices",
      meeting_room: "Meeting Rooms",
      desk: "Personal Desks",
    };
    const totalRev = report.pendapatan_kotor || 1;
    return report.per_tipe.map((t) => ({
      name: labelMap[t.tipe] || t.tipe,
      value: t.total_pendapatan || 0,
      occupancy: `${t.total_booking || 0} booking`,
      yield: `${Math.round(((t.total_pendapatan || 0) / totalRev) * 100)}%`,
    }));
  }, [report]);

  const dailyTrendData = useMemo(() => {
    if (report?.harian && report.harian.length > 0) return report.harian;
    return [];
  }, [report]);

  const handleApprove = async (id: number) => {
    try {
      await api.confirmReservation(id, "disetujui");
      fetchAll();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menyetujui reservasi"));
    }
  };

  const handleCheckIn = async (id: number) => {
    try {
      await api.checkIn(id);
      fetchAll();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal melakukan check-in"));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <Clock className="h-8 w-8 animate-spin text-[#121212]" />
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Synchronizing Sanctuary Telemetry...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Title Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#666666]">
            ARCHITECTURAL WORKSPACE METRICS
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212] mt-1">
            {coworkingName} Operations
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Real-time occupancy status, guest admissions, and diurnal revenue analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#666666] font-medium hidden sm:inline">
            Operational Mode:
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAE8E4] text-[#121212] border border-[#EBE7DF] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
            Day Session • Peak
          </span>
          <button
            onClick={fetchAll}
            className="p-2.5 rounded-full border border-[#EBE7DF] bg-white text-[#666666] hover:text-[#121212] hover:bg-[#FBF9F5] transition-colors cursor-pointer"
            title="Reload Feed"
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION 1: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Today's Active Guests */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE7DF] flex flex-col justify-between shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
              TODAY'S ACTIVE GUESTS
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] flex items-center justify-center text-[#121212]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold tracking-tight text-[#121212]">
              {stats.activeToday} Active
            </div>
            <p className="text-xs text-[#666666] mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
              {stats.pendingCount} pending check-in{stats.pendingCount === 1 ? "" : "s"}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666] font-medium">
            <span>Peak capacity: {stats.totalCap}</span>
            <span className="font-bold text-[#121212]">{stats.occPercent}% cap</span>
          </div>
        </div>

        {/* Card 2: Space Occupancy Rate */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE7DF] flex flex-col justify-between shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
              SPACE OCCUPANCY RATE
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] flex items-center justify-center text-[#121212]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold tracking-tight text-[#121212]">
              {stats.occPercent}% Occupied
            </div>
            <p className="text-xs text-[#666666] mt-1 font-medium">
              Total kapasitas: {stats.totalCap} kursi
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EBE7DF]">
            <div className="w-full h-2 bg-[#EAE8E4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#121212] rounded-full transition-all duration-500"
                style={{ width: `${stats.occPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Monthly Realized Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE7DF] flex flex-col justify-between shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
              MONTHLY REALIZED REVENUE
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] flex items-center justify-center text-[#121212]">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold tracking-tight text-[#121212]">
              {formatCurrency(stats.monthlyIncome)}
            </div>
            <p className="text-xs text-[#4A6B5D] mt-1 font-semibold">
              Pendapatan Kotor: {formatCurrency(report?.pendapatan_kotor || 0)}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666] font-medium">
            <span>Bulan: {new Date().toLocaleString("id-ID", { month: "long" })}</span>
            <span className="font-bold text-[#121212]">{report?.total_transaksi || 0} Reservasi</span>
          </div>
        </div>

        {/* Card 4: Pending Confirmations */}
        <div className="bg-white rounded-2xl p-6 border border-[#EBE7DF] flex flex-col justify-between shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
              PENDING CONFIRMATIONS
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#C88A2B]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#121212]">
                {stats.pendingCount} Bookings
              </span>
              {stats.pendingCount > 0 && (
                <span className="bg-[#C88A2B]/15 text-[#C88A2B] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#C88A2B]/30">
                  Perlu Konfirmasi
                </span>
              )}
            </div>
            <p className="text-xs text-[#666666] mt-1 font-medium">
              Membutuhkan persetujuan admin
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666] font-medium">
            <span>Status: {stats.pendingCount > 0 ? "Pending" : "Clear"}</span>
            <Link
              href="/admin/reservations"
              className="text-[#121212] font-bold hover:underline flex items-center gap-1"
            >
              Review Queue →
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: Middle Split (Today's Schedule vs E-Ticket Scanner) */}
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Today's Schedule & Check-ins */}
        <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EBE7DF]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#121212]">
                  Today's Schedule &amp; Check-ins
                </h2>
                <p className="text-xs text-[#666666]">
                  Live operational queue for Senopati Sanctuary guests
                </p>
              </div>

              {/* Search Bar Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code or guest..."
                  className="pl-9 pr-4 py-2 bg-[#F5F3EF] rounded-full border border-[#EBE7DF] text-xs font-medium text-[#121212] placeholder:text-[#666666] focus:outline-none focus:border-[#121212] w-56"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#666666]" />
              </div>
            </div>

            {/* List of Reservations */}
            <div className="space-y-3">
              {todaySched.length === 0 ? (
                <div className="text-center py-10 text-[#666666] space-y-2">
                  <CalendarCheck className="w-8 h-8 mx-auto text-[#666666]/40" />
                  <p className="text-sm font-semibold">No reservations found for today.</p>
                </div>
              ) : (
                todaySched.slice(0, 4).map((res) => {
                  const initials = res.member?.nama_member
                    ? res.member.nama_member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "MB";

                  return (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5]/60 hover:bg-[#FBF9F5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#EAE8E4] border border-[#EBE7DF] text-[#121212] font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-[#121212]">
                              {res.member?.nama_member || "Guest Member"}
                            </h4>
                            <span className="text-[11px] text-[#666666]">
                              {res.member?.instansi || "Personal Studio"}
                            </span>
                          </div>
                          <p className="text-xs text-[#666666] font-mono mt-0.5">
                            {res.space?.nama_space || `Space #${res.id_space}`} • {formatClock(res.jam_mulai)} - {formatClock(res.jam_selesai)} WIB • <span className="font-bold text-[#121212]">{res.kode_booking}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border",
                            RESERVATION_STATUS[res.status]?.color || "bg-gray-100 text-gray-700 border-gray-200",
                          )}
                        >
                          {RESERVATION_STATUS[res.status]?.label || res.status}
                        </span>

                        {res.status === "disetujui" && (
                          <button
                            onClick={() => handleCheckIn(res.id)}
                            className="px-4 py-1.5 rounded-full bg-[#4A6B5D] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#4A6B5D]/90 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <span>+ Check-In</span>
                          </button>
                        )}
                        {res.status === "belum_dikonfirm" && (
                          <button
                            onClick={() => handleApprove(res.id)}
                            className="px-4 py-1.5 rounded-full bg-[#121212] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#121212]/90 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {res.status === "aktif" && (
                          <Link
                            href="/admin/reservations"
                            className="text-xs font-semibold text-[#666666] hover:text-[#121212] px-2 py-1"
                          >
                            View Folio &gt;
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666] font-medium">
            <span>Showing {Math.min(todaySched.length, 4)} of {todaySched.length || 24} reservations for today</span>
            <Link
              href="/admin/reservations"
              className="text-[#121212] font-bold hover:underline flex items-center gap-1"
            >
              View All Bookings →
            </Link>
          </div>
        </div>

        {/* Guest E-Ticket Scanner Card */}
        <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF] mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#121212]">
                  Guest E-Ticket Scanner
                </h3>
                <p className="text-xs text-[#666666]">
                  Instant hardware verification &amp; pass check-in terminal
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D] animate-pulse" />
            </div>

            {/* Reticle Scanner Terminal Box */}
            <div className="relative aspect-video bg-[#121212] rounded-2xl overflow-hidden border border-[#EBE7DF] flex flex-col items-center justify-center text-white p-4">
              <div className="relative w-44 h-36 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center">
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-white" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-white" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-white" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-white" />
                <QrCode className="w-10 h-10 text-white/40 animate-pulse" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-mono text-white/60 mt-3">
                POSITION MEMBER QR PASS WITHIN RETICLE
              </span>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between bg-[#F5F3EF] px-3.5 py-2 rounded-xl border border-[#EBE7DF] mt-3 text-[11px] font-mono text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#121212]" />
                Camera Sensor 60 FPS
              </span>
              <span className="font-bold text-[#4A6B5D]">Standby</span>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/admin/scanner"
              className="w-full mt-4 py-3.5 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#121212]/90 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Launch Full Camera Scanner (SCR-ADM-06)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Manual Pass Code Lookup */}
          <div className="pt-3 border-t border-[#EBE7DF] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
              MANUAL PASS CODE LOOKUP
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="WM-2025-ICT-99"
                className="flex-1 px-3.5 py-2 bg-[#F5F3EF] rounded-full border border-[#EBE7DF] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#121212]"
              />
              <Link
                href="/admin/scanner"
                className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors"
              >
                Verify
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Bottom Analytics Split */}
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Left: Daily Revenue Trend Area Chart */}
        <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EBE7DF]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#121212]">
                Daily Revenue Trend (October 2026)
              </h2>
              <p className="text-xs text-[#666666]">
                Verified guest allocations &amp; walk-in daytime passes
              </p>
            </div>

            <div className="bg-[#F5F3EF] p-1 rounded-full border border-[#EBE7DF] flex items-center gap-1 text-xs font-semibold text-[#666666]">
              <button className="px-3 py-1 rounded-full bg-white text-[#121212] shadow-xs font-bold">
                7 Days
              </button>
              <button className="px-3 py-1 rounded-full hover:text-[#121212]">
                30 Days
              </button>
              <button className="px-3 py-1 rounded-full hover:text-[#121212]">
                Q4
              </button>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            {dailyTrendData.length === 0 ? (
              <div className="text-center text-[#666666] text-xs font-medium">
                Belum ada data tren pendapatan harian untuk periode ini.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTrendData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#121212" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#121212" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" />
                  <XAxis
                    dataKey="tanggal"
                    stroke="#666666"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#666666"
                    fontSize={11}
                    tickFormatter={(v) => `${Math.round(v / 1000000)}M`}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(v: any) => [formatCurrency(v), "Realized Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#121212"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-[#EBE7DF] flex flex-wrap items-center justify-between text-xs text-[#666666] font-medium gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#121212] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#121212]" /> Pendapatan Realisasi
              </span>
            </div>
            <span className="font-mono text-[#4A6B5D] font-bold">
              Total: {formatCurrency(report?.pendapatan_bersih || 0)}
            </span>
          </div>
        </div>

        {/* Right: Revenue by Space Category Donut */}
        <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF] mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#121212]">
                  Revenue by Space Category
                </h3>
                <p className="text-xs text-[#666666]">
                  Distribution across room types
                </p>
              </div>
              <span className="text-xs font-mono text-[#666666]">
                TOTAL: {formatCurrency(report?.pendapatan_kotor || 0)}
              </span>
            </div>

            {/* Donut Chart */}
            <div className="relative h-48 flex items-center justify-center">
              {categoryChartData.length === 0 ? (
                <div className="text-center text-[#666666] text-xs font-medium">
                  Belum ada data ketersediaan kategori.
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [formatCurrency(v), "Revenue"]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-serif text-lg font-bold text-[#121212]">{categoryChartData.length} Tiers</span>
                  </div>
                </>
              )}
            </div>

            {/* Category Breakdown list */}
            <div className="space-y-2.5 pt-2">
              {categoryChartData.map((cat, idx) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE7DF]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }}
                    />
                    <div>
                      <h5 className="font-semibold text-[#121212]">{cat.name}</h5>
                      <span className="text-[11px] text-[#666666]">
                        {cat.occupancy}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-[#121212] block">
                      {formatCurrency(cat.value)}
                    </span>
                    <span className="text-[11px] font-semibold text-[#4A6B5D]">
                      {cat.yield} yield
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Bottom Feature Card */}
      <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F3EF] border border-[#EBE7DF] flex items-center justify-center text-[#121212] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
              CURATED WORKSPACE ARCHITECTURE
            </span>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Private Office • Studio 04 (Zenith Garden View)
            </h3>
            <p className="text-xs text-[#666666]">
              Natural white oak beams, travertine console, and biophilic lightwell courtyard.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors cursor-pointer">
            View Floor Plan
          </button>
          <button className="px-5 py-2.5 rounded-full bg-[#121212] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121212]/90 transition-all cursor-pointer shadow-xs">
            Manage Unit Access
          </button>
        </div>
      </div>
    </div>
  );
}