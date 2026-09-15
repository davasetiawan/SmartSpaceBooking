"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Plus,
  Search,
  Download,
  Calendar,
  Edit,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Sparkles,
  TrendingUp,
  Wallet,
  ShieldCheck,
  Check,
} from "lucide-react";
import { api, apiErrorMessage, Space, mediaUrl } from "@/lib/api";
import { cn, formatCurrency } from "@/lib/utils";
import { FileUpload } from "@/components/file-upload";

const DEFAULT_PHOTOS: Record<string, string> = {
  desk: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=95&w=800",
  meeting_room: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=95&w=800",
  private_office: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=95&w=800",
};

export default function AdminSpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nama_space: "",
    tipe: "desk",
    harga_per_jam: 45000,
    kapasitas: 1,
    deskripsi: "",
    kota: "Jakarta Selatan",
    jalan: "Jl. Senopati No. 45",
  });
  const [fotoFile, setFotoFile] = useState<File | undefined>();

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const data = await api.adminSpaces();
      setSpaces(data);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat inventaris space"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const filteredSpaces = useMemo(() => {
    let result = spaces;
    if (selectedType !== "all") {
      result = result.filter((s) => s.tipe === selectedType);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.nama_space.toLowerCase().includes(q) ||
          s.deskripsi?.toLowerCase().includes(q) ||
          s.kota?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [spaces, selectedType, searchQuery]);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({
      nama_space: "",
      tipe: "desk",
      harga_per_jam: 45000,
      kapasitas: 1,
      deskripsi: "",
      kota: "Jakarta Selatan",
      jalan: "Jl. Senopati No. 45",
    });
    setFotoFile(undefined);
    setShowModal(true);
  };

  const handleOpenEdit = (s: Space) => {
    setEditId(s.id);
    setForm({
      nama_space: s.nama_space,
      tipe: s.tipe,
      harga_per_jam: s.harga_per_jam,
      kapasitas: s.kapasitas,
      deskripsi: s.deskripsi,
      kota: s.kota || "Jakarta Selatan",
      jalan: s.jalan || "Jl. Senopati No. 45",
    });
    setFotoFile(undefined);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.updateAdminSpace(editId, form, fotoFile);
      } else {
        await api.createAdminSpace(form, fotoFile);
      }
      setShowModal(false);
      fetchSpaces();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menyimpan data space"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus space ini?")) return;
    try {
      await api.deleteAdminSpace(id);
      fetchSpaces();
    } catch (err) {
      alert(apiErrorMessage(err, "Gagal menghapus space"));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Fetching Space &amp; Workstation Inventory...
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
        <span>Inventory &amp; Facilities</span>
        <span>&gt;</span>
        <span className="text-[#121212] font-semibold">Space Inventory</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212]">
              Space &amp; Workstation Inventory
            </h1>
            <span className="bg-[#EAE8E4] text-[#121212] text-xs font-bold px-3 py-1 rounded-full border border-[#EBE7DF]">
              {spaces.length} Active Units
            </span>
          </div>
          <p className="text-sm text-[#666666] mt-1">
            Curate, price, and regulate architectural studios, acoustic meeting suites, and focus workstations across Senopati Sanctuary.
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
            <span>Add New Space</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Top Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL SPACES</span>
            <Building2 className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">
            {spaces.length} Units
          </div>
          <p className="text-[11px] text-[#4A6B5D] font-semibold">Semua unit terverifikasi</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">KAPASITAS TOTAL</span>
            <TrendingUp className="w-4 h-4 text-[#4A6B5D]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">
            {spaces.reduce((sum, s) => sum + s.kapasitas, 0)} Kursi
          </div>
          <p className="text-[11px] text-[#4A6B5D] font-semibold">Kapasitas seluruh ruangan</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">RATA-RATA HARGA</span>
            <Wallet className="w-4 h-4 text-[#121212]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#121212]">
            {formatCurrency(spaces.length > 0 ? Math.round(spaces.reduce((acc, s) => acc + s.harga_per_jam, 0) / spaces.length) : 0)}
            <span className="text-xs font-normal text-[#666666]">/hr</span>
          </div>
          <p className="text-[11px] text-[#666666]">Rata-rata sewa per jam</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[10px] font-bold uppercase tracking-wider">MAINTENANCE STATUS</span>
            <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#121212]">0 Downtime</div>
          <p className="text-[11px] text-[#4A6B5D] font-semibold">Semua unit aktif</p>
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
            placeholder="Search space by name, tier, floor level..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#F5F3EF] rounded-full border border-[#EBE7DF] text-xs font-medium text-[#121212] placeholder:text-[#666666] focus:outline-none focus:border-[#121212]"
          />
          <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-[#666666]" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedType("all")}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer",
              selectedType === "all"
                ? "bg-[#121212] text-white border-[#121212]"
                : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
            )}
          >
            All Types ({spaces.length})
          </button>
          <button
            onClick={() => setSelectedType("desk")}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer",
              selectedType === "desk"
                ? "bg-[#121212] text-white border-[#121212]"
                : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
            )}
          >
            Personal Desk ({spaces.filter((s) => s.tipe === "desk").length})
          </button>
          <button
            onClick={() => setSelectedType("meeting_room")}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer",
              selectedType === "meeting_room"
                ? "bg-[#121212] text-white border-[#121212]"
                : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
            )}
          >
            Meeting Room ({spaces.filter((s) => s.tipe === "meeting_room").length})
          </button>
          <button
            onClick={() => setSelectedType("private_office")}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer",
              selectedType === "private_office"
                ? "bg-[#121212] text-white border-[#121212]"
                : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
            )}
          >
            Private Office ({spaces.filter((s) => s.tipe === "private_office").length})
          </button>
        </div>
      </div>

      {/* SECTION 3: Space Grid (2x2 Layout matching Screenshot 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpaces.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl border border-[#EBE7DF] p-12 text-center text-[#666666]">
            Tidak ada space yang cocok dengan pencarian Anda.
          </div>
        ) : (
          filteredSpaces.map((space) => {
            const photoUrl = mediaUrl(space.foto) || DEFAULT_PHOTOS[space.tipe] || DEFAULT_PHOTOS.desk;
            const labelType =
              space.tipe === "private_office"
                ? "Private Office"
                : space.tipe === "meeting_room"
                ? "Meeting Room"
                : "Personal Desk";

            return (
              <div
                key={space.id}
                className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs hover:border-[#121212]/30 transition-all flex flex-col justify-between"
              >
                {/* Image Header with Overlay Badges */}
                <div className="relative h-56 bg-[#EAE8E4] overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={space.nama_space}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== DEFAULT_PHOTOS[space.tipe]) {
                        target.src = DEFAULT_PHOTOS[space.tipe] || DEFAULT_PHOTOS.desk;
                      }
                    }}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#121212] border border-white/40">
                      {labelType}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium border border-white/20">
                      Level {space.id % 3 + 2} • Suite {space.id * 102}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#4A6B5D]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#121212]">
                        {space.nama_space}
                      </h3>
                      <p className="text-xs text-[#666666] mt-1 font-medium leading-relaxed">
                        {space.deskripsi || "Ergonomic workspace with integrated USB-C PD power and acoustic sound baffles."}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#666666] shrink-0 font-mono bg-[#F5F3EF] px-2.5 py-1 rounded-full border border-[#EBE7DF]">
                      👥 {space.kapasitas} Guest{space.kapasitas > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-3 py-1 rounded-full border border-[#EBE7DF]">
                      4K Display
                    </span>
                    <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-3 py-1 rounded-full border border-[#EBE7DF]">
                      Acoustic STC 42
                    </span>
                    <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-3 py-1 rounded-full border border-[#EBE7DF]">
                      Natural Daylight
                    </span>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="pt-4 border-t border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-serif font-bold text-lg text-[#121212]">
                        {formatCurrency(space.harga_per_jam)} <span className="text-xs font-sans text-[#666666] font-normal">/ hr</span>
                      </div>
                      <span className="text-[10px] text-[#666666] block">
                        Daily pass equiv. {formatCurrency(space.harga_per_jam * 4)}/day
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(space)}
                        className="px-3.5 py-1.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>View Calendar</span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(space)}
                        className="px-3.5 py-1.5 rounded-full border border-[#EBE7DF] bg-[#F5F3EF] text-xs font-bold text-[#121212] hover:bg-[#EAE8E4] transition-colors cursor-pointer"
                      >
                        Edit Space Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Add/Edit Space */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <h3 className="font-serif text-lg font-bold text-[#121212]">
                {editId ? "Edit Space Details" : "Add New Space Unit"}
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
                  NAMA SPACE UNIT *
                </label>
                <input
                  type="text"
                  value={form.nama_space}
                  onChange={(e) => setForm({ ...form, nama_space: e.target.value })}
                  required
                  placeholder="The Solitary Oak Nook"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                    TIPE SPACE *
                  </label>
                  <select
                    value={form.tipe}
                    onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                  >
                    <option value="desk">Personal Desk</option>
                    <option value="meeting_room">Meeting Room</option>
                    <option value="private_office">Private Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                    KAPASITAS (GUESTS) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.kapasitas}
                    onChange={(e) => setForm({ ...form, kapasitas: Number(e.target.value) })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  HARGA PER JAM (IDR) *
                </label>
                <input
                  type="number"
                  step={5000}
                  value={form.harga_per_jam}
                  onChange={(e) => setForm({ ...form, harga_per_jam: Number(e.target.value) })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-mono font-bold text-[#121212]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                  DESKRIPSI LENGKAP
                </label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  required
                  rows={3}
                  placeholder="Deskripsikan fasilitas utama, jenis kursi, soundproofing, dan spesifikasi ruangan..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212] resize-none"
                />
              </div>

              <FileUpload
                label="FOTO SPACE (OPSIONAL)"
                sublabel="Unggah foto ruangan kerja/meeting berkualitas tinggi (PNG, JPG)"
                accept="image/*"
                value={fotoFile || null}
                onChange={(file) => setFotoFile(file || undefined)}
              />

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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Space"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}