"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building2,
  TrendingUp,
  Key,
  Search,
  Plus,
  Download,
  Filter,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  Trash2,
  Edit2,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageSquare,
} from "lucide-react";
import { api, apiErrorMessage, AdminMember, RegisterMemberDto } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<RegisterMemberDto>({
    username: "",
    email: "",
    password: "",
    nama_member: "",
    instansi: "",
    alamat: "",
    telp: "",
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await api.adminMembers();
      setMembers(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat daftar member"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase();
    return members.filter(
      (m) =>
        m.nama_member?.toLowerCase().includes(q) ||
        m.instansi?.toLowerCase().includes(q) ||
        m.telp?.toLowerCase().includes(q) ||
        m.users?.username?.toLowerCase().includes(q),
    );
  }, [members, searchQuery]);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({
      username: "",
      email: "",
      password: "",
      nama_member: "",
      instansi: "",
      alamat: "",
      telp: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (m: AdminMember) => {
    setEditId(m.id);
    setForm({
      username: m.users?.username || "",
      email: "",
      password: "",
      nama_member: m.nama_member,
      instansi: m.instansi,
      alamat: m.alamat,
      telp: m.telp,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.updateAdminMember(editId, form);
      } else {
        await api.createAdminMember(form);
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menyimpan data member"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus member ini?")) return;
    try {
      await api.deleteAdminMember(id);
      fetchMembers();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menghapus member"));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Fetching Guest &amp; Member Directory...
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
        <span>Member Management</span>
        <span>&gt;</span>
        <span className="text-[#121212] font-semibold">Member Directory</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212]">
            Guest &amp; Member Directory
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Manage verified corporate accounts, individual remote professionals, and executive hospitality folios across Senopati Sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#FBF9F5] transition-colors flex items-center gap-1.5 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV / Folio</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 rounded-full bg-[#121212] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121212]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Member</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Top Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL REGISTERED</span>
            <Users className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#121212]">
              {members.length}
            </span>
            <span className="text-xs font-bold text-[#4A6B5D] bg-[#4A6B5D]/10 px-2 py-0.5 rounded-full">
              {members.length} Active
            </span>
          </div>
          <p className="text-[11px] text-[#666666]">Terdaftar di sistem database</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">INSTITUSI / INSTANSI</span>
            <Building2 className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#121212]">
              {new Set(members.map((m) => m.instansi).filter(Boolean)).size}
            </span>
            <span className="text-xs font-semibold text-[#666666]">Instansi</span>
          </div>
          <p className="text-[11px] text-[#666666]">Jumlah perusahaan / studio terdaftar</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL TERTIMPA</span>
            <TrendingUp className="w-4 h-4 text-[#4A6B5D]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#121212]">
              {members.length}
            </span>
            <span className="text-xs font-bold text-[#4A6B5D] bg-[#4A6B5D]/10 px-2 py-0.5 rounded-full">
              100%
            </span>
          </div>
          <p className="text-[11px] text-[#666666]">Total member terverifikasi</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">STATUS ANGGOTA</span>
            <Key className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#121212]">{members.length}</span>
            <span className="text-xs font-semibold text-[#666666]">Profil</span>
          </div>
          <p className="text-[11px] text-[#666666]">Aktif &amp; Siap Transaksi</p>
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
            placeholder="Search member by name, institution, email, or WhatsApp (+62)..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#F5F3EF] rounded-full border border-[#EBE7DF] text-xs font-medium text-[#121212] placeholder:text-[#666666] focus:outline-none focus:border-[#121212]"
          />
          <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-[#666666]" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button className="px-3.5 py-1.5 rounded-full border border-[#EBE7DF] bg-[#F5F3EF] text-xs font-semibold text-[#121212] flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[#666666]" />
            <span>Filter: All Institutions</span>
          </button>
          <button className="px-3.5 py-1.5 rounded-full border border-[#EBE7DF] bg-[#F5F3EF] text-xs font-semibold text-[#121212] flex items-center gap-1.5">
            <ArrowUpDown className="w-3 h-3 text-[#666666]" />
            <span>Sort: Newest First</span>
          </button>
          <span className="px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-bold border border-[#4A6B5D]/20 flex items-center gap-1">
            ● Status: Active
          </span>
        </div>
      </div>

      {/* SECTION 3: Member Data Table */}
      <div className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF9F5] border-b border-[#EBE7DF] text-[#666666] font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-bold">MEMBER PROFILE</th>
                <th className="py-3.5 px-4 font-bold">SYSTEM USERNAME</th>
                <th className="py-3.5 px-4 font-bold">INSTITUTION / COMPANY</th>
                <th className="py-3.5 px-4 font-bold">WHATSAPP CONTACT</th>
                <th className="py-3.5 px-4 font-bold">ADDRESS &amp; CITY</th>
                <th className="py-3.5 px-4 font-bold">STATUS</th>
                <th className="py-3.5 px-6 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7DF]">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#666666]">
                    Tidak ada data member ditemukan.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m, idx) => {
                  const initials = m.nama_member
                    ? m.nama_member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "MB";

                  return (
                    <tr key={m.id} className="hover:bg-[#FBF9F5]/80 transition-colors">
                      {/* Profile & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#EAE8E4] border border-[#EBE7DF] font-bold text-xs text-[#121212] flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-[#121212]">
                                {m.nama_member}
                              </span>
                              <span className="bg-[#EAE8E4] text-[#121212] text-[9px] font-bold px-1.5 py-0.2 rounded border border-[#EBE7DF]">
                                ✓ Verified
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#666666]">
                              MBR-2025-00{m.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-4 px-4 font-mono font-semibold text-[#121212]">
                        @{m.users?.username || "member"}
                      </td>

                      {/* Institution */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#121212]">{m.instansi || "Independent"}</div>
                        <span className="text-[10px] text-[#666666]">Dedicated Desk Holder</span>
                      </td>

                      {/* WhatsApp Contact */}
                      <td className="py-4 px-4 font-mono text-[#121212]">
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-[#4A6B5D]" />
                          <span>{m.telp || "-"}</span>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="py-4 px-4 text-[#666666] max-w-xs truncate">
                        {m.alamat || "-"}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/20 text-[10px] font-bold">
                          ● Active / Approved
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(m)}
                            className="p-1.5 rounded-lg border border-[#EBE7DF] bg-white text-[#666666] hover:text-[#121212] hover:bg-[#F5F3EF]"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="p-1.5 rounded-lg border border-[#EBE7DF] bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                            title="Hapus Member"
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

        {/* Table Footer Pagination */}
        <div className="px-6 py-4 bg-[#FBF9F5] border-t border-[#EBE7DF] flex items-center justify-between text-xs text-[#666666]">
          <span>Showing {filteredMembers.length} of {members.length} registered members</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg border border-[#EBE7DF] bg-white flex items-center justify-center text-[#666666] hover:bg-[#F5F3EF]">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#121212] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg border border-[#EBE7DF] bg-white flex items-center justify-center font-bold text-[#121212] hover:bg-[#F5F3EF]">
              2
            </button>
            <button className="w-7 h-7 rounded-lg border border-[#EBE7DF] bg-white flex items-center justify-center font-bold text-[#121212] hover:bg-[#F5F3EF]">
              3
            </button>
            <button className="w-7 h-7 rounded-lg border border-[#EBE7DF] bg-white flex items-center justify-center text-[#666666] hover:bg-[#F5F3EF]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: Bottom Access Protocol Feature Banner */}
      <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F3EF] border border-[#EBE7DF] flex items-center justify-center text-[#121212] shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#121212]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Senopati Sanctuary Access Protocol
            </h3>
            <p className="text-xs text-[#666666]">
              Members registered in this directory are granted encrypted digital NFC keycards compatible with the main gate on Jl. Senopati, second-floor focus pods, and library lounges.
            </p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors shrink-0 cursor-pointer">
          View Sanctuary Policy
        </button>
      </div>

      {/* Modal Add/Edit Member */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <h3 className="font-serif text-lg font-bold text-[#121212]">
                {editId ? "Edit Member Account" : "Register New Member"}
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
                  NAMA LENGKAP
                </label>
                <input
                  type="text"
                  value={form.nama_member}
                  onChange={(e) => setForm({ ...form, nama_member: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                />
              </div>

              {!editId && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                      minLength={6}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  INSTANSI / STUDIO
                </label>
                <input
                  type="text"
                  value={form.instansi}
                  onChange={(e) => setForm({ ...form, instansi: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  NO. WHATSAPP
                </label>
                <input
                  type="text"
                  value={form.telp}
                  onChange={(e) => setForm({ ...form, telp: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  ALAMAT
                </label>
                <textarea
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212] resize-none"
                />
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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}