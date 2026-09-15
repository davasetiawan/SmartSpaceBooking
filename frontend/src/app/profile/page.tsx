"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Phone,
  MapPin,
  Mail,
  Camera,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import {
  api,
  apiErrorMessage,
  AuthUser,
  isLoggedIn,
  mediaUrl,
  readAuthUser,
} from "@/lib/api";
import { cn } from "@/lib/utils";

export default function MemberProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nama_member: "",
    instansi: "",
    telp: "",
    alamat: "",
  });
  const [foto, setFoto] = useState<File | undefined>();
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth");
      return;
    }
    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await api.profile();
      setUser(data);
      if (data.member) {
        setForm({
          nama_member: data.member.nama_member || "",
          instansi: data.member.instansi || "",
          telp: data.member.telp || "",
          alamat: (data.member as any).alamat || "",
        });
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat profil pengguna"));
    } finally {
      setLoading(false);
    }
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedUser = await api.updateMemberProfile(form, foto);
      setUser(updatedUser);
      // Update local storage
      const existingRaw = localStorage.getItem("auth_user");
      if (existingRaw) {
        const existing = JSON.parse(existingRaw);
        localStorage.setItem(
          "auth_user",
          JSON.stringify({ ...existing, ...updatedUser }),
        );
      }
      setSuccess("Profil berhasil diperbarui!");
      fetchProfile();
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memperbarui profil"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FBF9F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#121212] font-sans pb-24">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#EBE7DF] bg-[#FBF9F5]/90 backdrop-blur-md sticky top-16 z-30 py-4 px-6 md:px-12">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#121212] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
            MEMBER FOLIO &amp; PROFILE
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="w-full px-6 md:px-12 lg:px-16 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EBE7DF] text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B5D]" /> Verified Member Account
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#121212]">
              Profil Saya
            </h1>
            <p className="text-sm text-[#666666] mt-1">
              Kelola informasi pribadi, kontak instansi, dan foto profil akun Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card Form */}
      <div className="w-full px-6 md:px-12 lg:px-16">
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-6 p-4 rounded-xl text-sm flex items-center gap-3 border",
              error
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200",
            )}
          >
            {error ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{error || success}</span>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-[#EBE7DF] p-6 md:p-10 space-y-8 shadow-[0_10px_30px_rgba(18,18,18,0.03)]"
        >
          {/* Avatar Header Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#EBE7DF]">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#efeeea] border-2 border-[#121212] flex items-center justify-center text-2xl font-bold font-serif text-[#121212]">
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : user?.member?.foto ? (
                  <img
                    src={mediaUrl(user.member.foto)}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.username?.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#121212]">
                {user?.member?.nama_member || user?.username}
              </h3>
              <p className="text-xs text-[#666666] flex items-center justify-center sm:justify-start gap-1 font-mono">
                <Mail className="w-3.5 h-3.5" /> {user?.email}
              </p>
              <div className="inline-flex items-center gap-2 pt-1">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#f5f3ef] text-[#121212] border border-[#EBE7DF]">
                  ROLE: {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121212]">
                <User className="w-4 h-4 text-[#666666]" />
                Nama Lengkap Member
              </label>
              <input
                type="text"
                value={form.nama_member}
                onChange={(e) =>
                  setForm({ ...form, nama_member: e.target.value })
                }
                required
                placeholder="Julian Vance"
                className="w-full px-4 py-3 bg-[#FAF9F6] rounded-xl border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121212]">
                <Building2 className="w-4 h-4 text-[#666666]" />
                Instansi / Studio
              </label>
              <input
                type="text"
                value={form.instansi}
                onChange={(e) =>
                  setForm({ ...form, instansi: e.target.value })
                }
                required
                placeholder="Atelier Nord"
                className="w-full px-4 py-3 bg-[#FAF9F6] rounded-xl border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121212]">
                <Phone className="w-4 h-4 text-[#666666]" />
                No. WhatsApp (telp)
              </label>
              <input
                type="text"
                value={form.telp}
                onChange={(e) => setForm({ ...form, telp: e.target.value })}
                required
                placeholder="081234567890"
                className="w-full px-4 py-3 bg-[#FAF9F6] rounded-xl border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121212]">
                <Mail className="w-4 h-4 text-[#666666]" />
                Username Akun
              </label>
              <input
                type="text"
                value={user?.username || ""}
                disabled
                className="w-full px-4 py-3 bg-[#EBE7DF]/50 rounded-xl border border-[#EBE7DF] text-sm font-medium text-[#666666] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121212]">
              <MapPin className="w-4 h-4 text-[#666666]" />
              Alamat Lengkap
            </label>
            <textarea
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              rows={3}
              placeholder="Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan"
              className="w-full px-4 py-3 bg-[#FAF9F6] rounded-xl border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212] resize-none"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#EBE7DF]">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
