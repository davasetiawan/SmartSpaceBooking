'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Voucher } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminVouchersPage() {
  const { vouchers: fallbackVouchers, addVoucher } = useSpaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backendVouchers, setBackendVouchers] = useState<any[]>([]);

  const loadDiscounts = () => {
    import('@/lib/api').then(({ fetchAdminDiscounts }) => {
      fetchAdminDiscounts()
        .then((data) => setBackendVouchers(data))
        .catch(() => {});
    });
  };

  React.useEffect(() => {
    loadDiscounts();
  }, []);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(20);
  const [minSpend, setMinSpend] = useState(150000);
  const [maxDiscount, setMaxDiscount] = useState(100000);
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [quota, setQuota] = useState(100);

  const handleCreateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      const { createAdminDiscount } = await import('@/lib/api');
      await createAdminDiscount({
        nama_diskon: code.trim().toUpperCase(),
        persentase_diskon: discountValue,
        tanggal_awal: new Date().toISOString(),
        tanggal_akhir: new Date(validUntil).toISOString()
      });
      loadDiscounts();
    } catch (err: any) {
      // Fallback to store
      addVoucher({
        code: code.trim().toUpperCase(),
        discountType,
        discountValue,
        minSpend,
        maxDiscount: discountType === 'percentage' ? maxDiscount : undefined,
        validUntil,
        quota,
        isActive: true
      });
    }

    setCode('');
    setIsModalOpen(false);
  };

  const displayVouchers: Voucher[] = backendVouchers.length > 0 ? backendVouchers.map((d: any) => ({
    id: String(d.id),
    code: d.nama_diskon,
    discountType: 'percentage',
    discountValue: d.persentase_diskon,
    minSpend: 0,
    validUntil: new Date(d.tanggal_akhir).toISOString().split('T')[0],
    usageCount: d.reservasi?.length || 0,
    quota: 100,
    isActive: new Date(d.tanggal_akhir) > new Date()
  })) : fallbackVouchers;

  const filteredVouchers = displayVouchers.filter(v =>
    v.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                CAMPAIGN &amp; DISCOUNT OPERATIONS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Voucher &amp; Diskon Promosi
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Kelola kupon musiman, potongan harga partner korporat, dan kuota pemakaian sewa.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-all hover:scale-105 flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Buat Promo Baru</span>
            </button>
          </div>

          {/* 4-Card KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">KAMPANYE AKTIF</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">{displayVouchers.length} Kupon Live</div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">Siap ditransaksikan</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL KLAIM TERPAKAI</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">
                {displayVouchers.reduce((acc: number, v: Voucher) => acc + v.usageCount, 0)} Klaim
              </div>
              <span className="text-[10px] font-mono text-[#747878]">Volume klaim bulan ini</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">TOTAL KUOTA POOL</span>
              <div className="font-serif text-2xl font-bold text-[#121212]">
                {displayVouchers.reduce((acc: number, v: Voucher) => acc + v.quota, 0)} Kuota
              </div>
              <span className="text-[10px] font-mono text-[#4A6B5D]">Sisa Kuota Tersedia</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">RATA-RATA DISKON</span>
              <div className="font-mono text-xl font-bold text-[#4A6B5D]">18.5% IDR</div>
              <span className="text-[10px] font-mono text-[#747878]">Optimasi ROI &amp; Okupansi</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm flex items-center justify-between gap-4">
            <div className="w-full sm:w-80 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari Kode Kupon Voucher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none uppercase font-bold"
              />
            </div>
          </div>

          {/* Vouchers Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Kode Voucher</th>
                    <th className="py-3.5 px-6">Nilai Diskon</th>
                    <th className="py-3.5 px-6">Min. Transaksi</th>
                    <th className="py-3.5 px-6">Maks. Potongan</th>
                    <th className="py-3.5 px-6">Berlaku Sampai</th>
                    <th className="py-3.5 px-6">Penggunaan &amp; Kuota</th>
                    <th className="py-3.5 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {filteredVouchers.map((voucher, idx) => (
                    <motion.tr
                      key={voucher.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="hover:bg-[#fbf9f5]/60 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-[#121212] text-white font-bold text-xs tracking-wider">
                          {voucher.code}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-bold text-sm text-[#4A6B5D]">
                        {voucher.discountType === 'percentage'
                          ? `${voucher.discountValue}% OFF`
                          : `Rp ${voucher.discountValue.toLocaleString('id-ID')} OFF`}
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        Rp {voucher.minSpend.toLocaleString('id-ID')}
                      </td>

                      <td className="py-4 px-6 text-[#5e5e5e]">
                        {voucher.maxDiscount ? `Rp ${voucher.maxDiscount.toLocaleString('id-ID')}` : 'Tanpa Batas'}
                      </td>

                      <td className="py-4 px-6 text-[#5e5e5e]">
                        {voucher.validUntil}
                      </td>

                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>{voucher.usageCount} / {voucher.quota}</span>
                            <span>{Math.round((voucher.usageCount / voucher.quota) * 100)}%</span>
                          </div>
                          <div className="w-24 h-1.5 bg-[#efeeea] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#121212] rounded-full"
                              style={{ width: `${Math.min(100, (voucher.usageCount / voucher.quota) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          voucher.isActive ? 'bg-[#4A6B5D]/10 text-[#4A6B5D]' : 'bg-[#9E3B3B]/10 text-[#9E3B3B]'
                        }`}>
                          {voucher.isActive ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </main>

      {/* Create Voucher Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#121212]">
                  Terbitkan Voucher Promo Baru
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#EBE7DF] flex items-center justify-center text-[#747878] hover:text-[#121212] transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateVoucher} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Kode Kupon Voucher (Uppercase)
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: ATELIERPROMO20"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] font-mono font-bold text-sm uppercase text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Jenis Diskon
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as Voucher['discountType'])}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212]"
                    >
                      <option value="percentage">Persentase (%)</option>
                      <option value="fixed">Nominal Tetap (Rp)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Nilai Diskon ({discountType === 'percentage' ? '%' : 'Rp'})
                    </label>
                    <input
                      type="number"
                      required
                      value={discountValue}
                      onChange={(e) => setDiscountValue(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Min. Pembelian (Rp)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      required
                      value={minSpend}
                      onChange={(e) => setMinSpend(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Maks. Diskon (Rp)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(parseInt(e.target.value) || 0)}
                      disabled={discountType === 'fixed'}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212] disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Masa Berlaku Sampai
                    </label>
                    <input
                      type="date"
                      required
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kuota Penggunaan
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={quota}
                      onChange={(e) => setQuota(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EBE7DF] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-[#EBE7DF] text-xs font-semibold text-[#121212] hover:bg-[#f5f3ef] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors"
                  >
                    Terbitkan Voucher
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

