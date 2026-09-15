"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Percent,
  Wallet,
  Calendar,
  Search,
  Plus,
  Download,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Copy,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Repeat,
} from "lucide-react";
import { api, apiErrorMessage, Promo } from "@/lib/api";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nama_diskon: "",
    persentase_diskon: 15,
    tanggal_awal: new Date().toISOString().slice(0, 10),
    tanggal_akhir: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  });

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const data = await api.adminDiskon();
      setPromos(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat daftar diskon"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const filteredPromos = useMemo(() => {
    let result = promos;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nama_diskon.toLowerCase().includes(q) ||
          p.persentase_diskon.toString().includes(q),
      );
    }
    return result;
  }, [promos, searchQuery]);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({
      nama_diskon: "",
      persentase_diskon: 20,
      tanggal_awal: new Date().toISOString().slice(0, 10),
      tanggal_akhir: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: Promo) => {
    setEditId(p.id);
    setForm({
      nama_diskon: p.nama_diskon,
      persentase_diskon: p.persentase_diskon,
      tanggal_awal: p.tanggal_awal.slice(0, 10),
      tanggal_akhir: p.tanggal_akhir.slice(0, 10),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.updateAdminDiskon(editId, form);
      } else {
        await api.createAdminDiskon(form);
      }
      setShowModal(false);
      fetchPromos();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menyimpan voucher promo"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus voucher promo ini?")) return;
    try {
      await api.deleteAdminDiskon(id);
      fetchPromos();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menghapus diskon"));
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Kode voucher "${code}" berhasil disalin!`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Fetching Promo &amp; Voucher Engine...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Breadcrumb */}
      <div className="text-xs text-[#666666] font-medium flex items-center gap-2">
        <span>Home</span>
        <span>&gt;</span>
        <span>Executive Console</span>
        <span>&gt;</span>
        <span>Campaign Operations</span>
        <span>&gt;</span>
        <span className="text-[#121212] font-semibold">Promo &amp; Voucher Engine</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212]">
            Promotions &amp; Architectural Pass Vouchers
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Regulate seasonal corporate discounts, partner campaign voucher codes, and booking privileges across Senopati Sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#FBF9F5] transition-colors flex items-center gap-1.5 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Batch Export Folio</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 rounded-full bg-[#121212] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121212]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Promo</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Top Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">ACTIVE CAMPAIGNS</span>
            <Tag className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">
            {promos.length} Live Vouchers
          </div>
          <p className="text-[11px] text-[#666666]">Voucher terdaftar dalam sistem</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">AVERAGE DISKONS</span>
            <Percent className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">
            {promos.length > 0
              ? Math.round(promos.reduce((acc, p) => acc + p.persentase_diskon, 0) / promos.length)
              : 0}%
          </div>
          <p className="text-[11px] text-[#666666]">Rata-rata persentase diskon</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL VOUCHER</span>
            <Wallet className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-[#121212]">{promos.length} Kode</span>
          </div>
          <p className="text-[11px] text-[#666666]">Siap digunakan oleh member</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">STATUS JANGKA</span>
            <Clock className="w-4 h-4 text-[#C88A2B]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">{promos.length} Berjalan</div>
          <p className="text-[11px] text-[#C88A2B] font-semibold">Aktif di sistem</p>
        </div>
      </div>

      {/* SECTION 2: Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#EBE7DF] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search promo by voucher code or percentage..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#F5F3EF] rounded-full border border-[#EBE7DF] text-xs font-medium text-[#121212] placeholder:text-[#666666] focus:outline-none focus:border-[#121212]"
          />
          <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-[#666666]" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedFilter("all")}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer",
              selectedFilter === "all"
                ? "bg-[#121212] text-white border-[#121212]"
                : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
            )}
          >
            All Campaigns ({promos.length})
          </button>
        </div>
      </div>

      {/* SECTION 3: Promo Data Table */}
      <div className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF9F5] border-b border-[#EBE7DF] text-[#666666] font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-bold">KODE VOUCHER (NAMA_DISKON)</th>
                <th className="py-3.5 px-4 font-bold">NAMA KAMPANYE</th>
                <th className="py-3.5 px-4 font-bold">PERSENTASE DISKON</th>
                <th className="py-3.5 px-4 font-bold">PERIODE BERLAKU</th>
                <th className="py-3.5 px-4 font-bold">STATUS</th>
                <th className="py-3.5 px-6 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7DF]">
              {filteredPromos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#666666]">
                    Tidak ada voucher diskon yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredPromos.map((p) => {
                  const now = new Date();
                  const end = new Date(p.tanggal_akhir);
                  const isConcluded = end < now;

                  return (
                    <tr key={p.id} className="hover:bg-[#FBF9F5]/80 transition-colors">
                      {/* Coupon Code */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyCode(p.nama_diskon)}
                            className="p-1 rounded bg-[#F5F3EF] hover:bg-[#EAE8E4] border border-[#EBE7DF] text-[#666666]"
                            title="Salin Kode Voucher"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-sm text-[#121212] bg-[#F5F3EF] px-2.5 py-1 rounded-lg border border-[#EBE7DF]">
                            {p.nama_diskon}
                          </span>
                        </div>
                      </td>

                      {/* Campaign Scope */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#121212] text-xs">
                          {p.nama_diskon} Promo Voucher
                        </div>
                        <span className="text-[10px] text-[#666666]">
                          Berlaku untuk semua tipe space
                        </span>
                      </td>

                      {/* Discount Percentage */}
                      <td className="py-4 px-4">
                        <div className="font-serif font-bold text-base text-[#121212]">
                          {p.persentase_diskon}% OFF
                        </div>
                      </td>

                      {/* Effective Period */}
                      <td className="py-4 px-4 font-mono text-[#121212]">
                        <div>
                          {formatDate(p.tanggal_awal)} — {formatDate(p.tanggal_akhir)}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border",
                            isConcluded
                              ? "bg-rose-50 text-rose-800 border-rose-200"
                              : "bg-[#F5F3EF] text-[#121212] border-[#EBE7DF]",
                          )}
                        >
                          ● {isConcluded ? "Concluded" : "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg border border-[#EBE7DF] bg-white text-[#666666] hover:text-[#121212] hover:bg-[#F5F3EF]"
                            title="Edit Voucher"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg border border-[#EBE7DF] bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                            title="Hapus Voucher"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-[#FBF9F5] border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666]">
          <span>Displaying {filteredPromos.length} of {promos.length} registered discount allocations</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full border border-[#EBE7DF] bg-white text-xs font-semibold text-[#666666] hover:bg-[#F5F3EF]">
              Previous
            </button>
            <span className="text-xs font-mono font-bold text-[#121212]">Page 1 of 1</span>
            <button className="px-3 py-1 rounded-full border border-[#EBE7DF] bg-white text-xs font-semibold text-[#666666] hover:bg-[#F5F3EF]">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal Add/Edit Promo */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <h3 className="font-serif text-lg font-bold text-[#121212]">
                {editId ? "Edit Voucher Promo" : "Create New Promo Voucher"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-[#666666] hover:text-[#121212]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  KODE VOUCHER (NAMA_DISKON) *
                </label>
                <input
                  type="text"
                  value={form.nama_diskon}
                  onChange={(e) => setForm({ ...form, nama_diskon: e.target.value.toUpperCase() })}
                  required
                  placeholder="WORKMATES20"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-mono font-bold text-[#121212] uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  PERSENTASE DISKON (%) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={form.persentase_diskon}
                  onChange={(e) => setForm({ ...form, persentase_diskon: Number(e.target.value) })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-mono font-bold text-[#121212]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                    TANGGAL AWAL *
                  </label>
                  <input
                    type="date"
                    value={form.tanggal_awal}
                    onChange={(e) => setForm({ ...form, tanggal_awal: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                    TANGGAL AKHIR *
                  </label>
                  <input
                    type="date"
                    value={form.tanggal_akhir}
                    onChange={(e) => setForm({ ...form, tanggal_akhir: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full border border-[#EBE7DF] text-xs font-semibold text-[#666666]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-[#121212] text-xs font-bold text-white uppercase tracking-wider"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Voucher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}