"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, TrendingUp, BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  PieLabelRenderProps,
} from "recharts";
import { MonthlyReport } from "@/lib/api";
import { api, apiErrorMessage } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const currencyFormatter = (value: any) => [formatCurrency(value ?? 0), "Pendapatan"] as const;

const COLORS = ["#4A6B5D", "#C88A2B", "#9E3B3B", "#666666", "#EBE7DF"];

export default function AdminReportsPage() {
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReport();
  }, [month, year]);

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.monthlyReport(month, year);
      setReport(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat laporan"));
    } finally {
      setLoading(false);
    }
  };

  const dailyData = report?.harian || [];
  const typeData = report?.per_tipe || [];

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [y, m] = e.target.value.split("-");
    setYear(Number(y));
    setMonth(Number(m));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">FINANCIAL REPORTS</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl mt-1">Rekapitulasi Keuangan Bulanan</h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">Estimasi & realisasi pendapatan, analisis per kategori & harian.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input type="month" value={`${year}-${String(month).padStart(2, "0")}`} onChange={handleMonthChange} className="pl-10 pr-4 py-2 rounded-[10px] border border-[var(--color-border)]" />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
      >
        {[
          { label: "Total Transaksi", value: report?.total_transaksi || 0, icon: BarChart2, color: "text-[#4A6B5D]" },
          { label: "Total Jam", value: `${report?.total_jam || 0} jam`, icon: TrendingUp, color: "text-[#C88A2B]" },
          { label: "Pendapatan Kotor", value: formatCurrency(report?.pendapatan_kotor || 0), icon: TrendingUp, color: "text-[#121212]" },
          { label: "Total Diskon", value: formatCurrency(report?.total_diskon || 0), icon: TrendingUp, color: "text-[#9E3B3B]" },
          { label: "Pendapatan Bersih", value: formatCurrency(report?.pendapatan_bersih || 0), icon: TrendingUp, color: "text-[#4A6B5D]" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">{card.label}</p>
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", card.color + "/10")}>
                <card.icon className={cn("h-4 w-4", card.color)} />
              </div>
            </div>
            <p className="font-[family-name:var(--font-heading)] text-2xl tracking-tight">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Revenue Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-heading)] text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#4A6B5D]" />
              Pendapatan Harian
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" />
                <XAxis dataKey="tanggal" tickFormatter={(v) => v.slice(5)} stroke="#666666" fontSize={10} />
                <YAxis stroke="#666666" tickFormatter={(v) => formatCurrency(v)} fontSize={10} />
                <Tooltip formatter={currencyFormatter} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4A6B5D"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#4A6B5D" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Contribution Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-heading)] text-xl flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-[#4A6B5D]" />
              Kontribusi per Kategori Space
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE7DF" />
                <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} stroke="#666666" fontSize={10} />
                <YAxis dataKey="tipe" type="category" width={140} stroke="#666666" fontSize={10} />
                <Tooltip formatter={currencyFormatter} />
                <Bar dataKey="total_pendapatan" fill="#4A6B5D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart - Category Distribution by Booking Count */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-6"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">Distribusi Booking per Kategori</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="total_booking"
                  nameKey="tipe"
                  label={(props: any) => `${props.payload?.tipe ?? ''}: ${props.payload?.total_booking ?? 0}`}
                  labelLine={false}
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Booking"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart - Revenue Distribution by Category */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-6"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">Distribusi Pendapatan per Kategori</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="total_pendapatan"
                  nameKey="tipe"
                  label={(props: any) => `${props.payload?.tipe ?? ''}: ${formatCurrency(Number(props.payload?.total_pendapatan ?? 0))}`}
                  labelLine={false}
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-rev-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={currencyFormatter} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detail Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
      >
        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="font-[family-name:var(--font-heading)] text-xl">Detail per Kategori</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-bg-primary)] text-left text-sm text-[var(--color-text-secondary)]">
                <th className="p-4">Kategori</th>
                <th className="p-4">Total Booking</th>
                <th className="p-4">Total Jam</th>
                <th className="p-4">Total Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {typeData.map((item) => (
                <tr key={item.tipe} className="border-t border-[var(--color-border)]">
                  <td className="p-4 font-medium capitalize">{item.tipe.replace("_", " ")}</td>
                  <td className="p-4">{item.total_booking}</td>
                  <td className="p-4">{item.total_jam} jam</td>
                  <td className="p-4 font-mono">{formatCurrency(item.total_pendapatan)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}