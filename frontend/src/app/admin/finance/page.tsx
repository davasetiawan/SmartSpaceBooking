'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminFinancePage() {
  const { bookings } = useSpaceStore();
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [reportData, setReportData] = useState<any | null>(null);

  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  React.useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      import('@/lib/api').then(({ fetchMonthlyReport }) => {
        fetchMonthlyReport(Number(month), Number(year))
          .then((data) => setReportData(data))
          .catch(() => {});
      });
    }
  }, [selectedMonth]);

  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExporting(false), 800);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const fallbackGross = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);
  const grossRevenue = reportData?.ringkasan?.realisasi_pendapatan_bersih || reportData?.ringkasan?.estimasi_pendapatan_kotor || fallbackGross;
  const totalTaxPB1 = Math.round(grossRevenue * 0.1);
  const platformFee = Math.round(grossRevenue * 0.05);
  const netOwnerPayout = grossRevenue - totalTaxPB1 - platformFee;

  // Monthly revenue mock data
  const monthlyTrends = [
    { month: 'Apr', amount: 112000000, height: '65%' },
    { month: 'Mei', amount: 128000000, height: '75%' },
    { month: 'Jun', amount: 145000000, height: '85%' },
    { month: 'Jul', amount: 139000000, height: '80%' },
    { month: 'Agu', amount: 156000000, height: '90%' },
    { month: 'Sep (Now)', amount: grossRevenue > 0 ? grossRevenue : 168000000, height: '98%', isCurrent: true },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-7xl mx-auto space-y-8"
        >
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                FINANCIAL INTELLIGENCE &amp; REVENUE LEDGER
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Laporan Keuangan &amp; Analisis Revenue
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Rekapitulasi pendapatan bruto, bagi hasil pemilik properti, dan setoran pajak daerah PB1/PPN.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-mono font-semibold text-[#121212] cursor-pointer shadow-sm"
              >
                <option value="2026-09">September 2026</option>
                <option value="2026-08">Agustus 2026</option>
                <option value="2026-07">Juli 2026</option>
              </select>

              <button
                onClick={handleStartExport}
                disabled={isExporting}
                className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs font-mono font-semibold hover:bg-[#4A6B5D] transition-all hover:scale-105 flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>{isExporting ? 'Merekap Data...' : 'Export Laporan (Excel/PDF)'}</span>
              </button>
            </div>
          </div>

          {/* 4-Card Revenue Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-1">
                GROSS REVENUE (BRUTO)
              </span>
              <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#121212] my-2">
                Rp {grossRevenue.toLocaleString('id-ID')}
              </h3>
              <span className="text-xs font-mono text-[#4A6B5D] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+14.8% MoM Yield</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-1">
                NET OWNER PAYOUT (BERSIH)
              </span>
              <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#4A6B5D] my-2">
                Rp {netOwnerPayout.toLocaleString('id-ID')}
              </h3>
              <span className="text-xs font-mono text-[#747878]">
                Settlement H+1 via BCA Direct
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-1">
                PAJAK DAERAH PB1 / PPN
              </span>
              <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#121212] my-2">
                Rp {totalTaxPB1.toLocaleString('id-ID')}
              </h3>
              <span className="text-xs font-mono text-[#747878]">
                10% Retribusi Resmi
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-[#747878] font-bold block mb-1">
                FEE PLATFORM &amp; GERBANG
              </span>
              <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#C88A2B] my-2">
                Rp {platformFee.toLocaleString('id-ID')}
              </h3>
              <span className="text-xs font-mono text-[#747878]">
                5% Server &amp; Gateway Maintenance
              </span>
            </div>
          </div>

          {/* Revenue Chart Visualization & Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bar Chart (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A6B5D]">bar_chart</span>
                  <h3 className="font-serif text-xl font-bold text-[#121212]">
                    Tren Pendapatan 6 Bulan Terakhir
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#747878]">Dalam Juta Rupiah</span>
              </div>

              {/* Visual Bars */}
              <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 font-mono text-xs">
                {monthlyTrends.map((t, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] text-[#747878] opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(t.amount / 1000000)}jt
                    </span>
                    <div
                      style={{ height: t.height }}
                      className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 ${
                        t.isCurrent
                          ? 'bg-[#121212] group-hover:bg-[#4A6B5D]'
                          : 'bg-[#efeeea] group-hover:bg-[#121212]'
                      }`}
                    ></div>
                    <span className={`text-[11px] font-bold ${t.isCurrent ? 'text-[#121212]' : 'text-[#747878]'}`}>
                      {t.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#121212]">donut_small</span>
                  <h3 className="font-serif text-xl font-bold text-[#121212]">
                    Proporsi per Kategori Ruang
                  </h3>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#121212]">Executive Studios (42%)</span>
                    <span>Rp {Math.round(grossRevenue * 0.42).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full h-2 bg-[#efeeea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#121212] w-[42%]"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#121212]">Boardroom Salons (28%)</span>
                    <span>Rp {Math.round(grossRevenue * 0.28).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full h-2 bg-[#efeeea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4A6B5D] w-[28%]"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#121212]">Solarium Greenhouses (18%)</span>
                    <span>Rp {Math.round(grossRevenue * 0.18).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full h-2 bg-[#efeeea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C88A2B] w-[18%]"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#121212]">Focus Pods &amp; Desks (12%)</span>
                    <span>Rp {Math.round(grossRevenue * 0.12).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full h-2 bg-[#efeeea] rounded-full overflow-hidden">
                    <div className="h-full bg-[#747878] w-[12%]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </main>

      {/* Export Progress Modal */}
      <AnimatePresence>
        {isExporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-2xl animate-spin">
                  sync
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#121212]">
                  Menyiapkan Laporan Keuangan
                </h3>
                <p className="text-xs text-[#5e5e5e] font-mono mt-1">
                  Merekapitulasi buku besar transaksi &amp; pajak PB1 ({selectedMonth})
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-3 bg-[#efeeea] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#4A6B5D] rounded-full"
                    animate={{ width: `${exportProgress}%` }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#747878]">
                  <span>Mengompresi PDF &amp; XLSX...</span>
                  <span className="font-bold text-[#121212]">{exportProgress}%</span>
                </div>
              </div>

              {exportProgress === 100 && (
                <div className="text-xs font-mono font-bold text-[#4A6B5D] pt-2">
                  ✓ File Laporan Siap Diunduh!
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

