"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  User,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  ShieldCheck,
  Check,
  Key,
  QrCode,
  Map,
  Star,
  Upload,
} from "lucide-react";
import { api, apiErrorMessage, SpaceOwner } from "@/lib/api";
import { cn } from "@/lib/utils";

const CLASSIFICATIONS = [
  "Architectural Boutique Sanctuary",
  "Executive Boardroom Hub",
  "Acoustic Deep Work Pavilions",
  "Botanical Courtyard",
];

const AMENITY_BADGES = [
  "Gigabit Fiber WiFi",
  "Artisanal Coffee Bar",
  "Acoustic Phone Booths",
  "Herman Miller Seating",
  "Valet Parking",
  "Executive Shower Suites",
  "4K Presentation Hub",
  "Mushalla / Prayer Suite",
  "Podcast Studio (L4)",
];

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<SpaceOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("Architectural Boutique Sanctuary");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Gigabit Fiber WiFi",
    "Artisanal Coffee Bar",
    "Acoustic Phone Booths",
    "Herman Miller Seating",
    "Valet Parking",
    "Executive Shower Suites",
    "4K Presentation Hub",
    "Mushalla / Prayer Suite",
  ]);

  const [form, setForm] = useState({
    nama_coworking: "",
    nama_pemilik: "",
    npwp: "",
    telp: "",
    email: "",
    alamat: "",
    deskripsi_fasilitas: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await api.adminProfile();
      setProfile(data);
      if (data) {
        setForm({
          nama_coworking: data.nama_coworking || "",
          nama_pemilik: data.nama_pemilik || "",
          npwp: "",
          telp: data.telp || "",
          email: "",
          alamat: data.alamat || "",
          deskripsi_fasilitas: data.deskripsi_fasilitas || "",
        });
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memuat profil properti"));
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (badge: string) => {
    if (selectedAmenities.includes(badge)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== badge));
    } else {
      setSelectedAmenities([...selectedAmenities, badge]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated = await api.updateAdminProfile({
        nama_coworking: form.nama_coworking,
        nama_pemilik: form.nama_pemilik,
        telp: form.telp,
        alamat: form.alamat,
        deskripsi_fasilitas: form.deskripsi_fasilitas,
      });
      setProfile(updated);
      setSuccess("Profile setup changes saved successfully");
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memperbarui profil properti"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#121212]" />
        <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold">
          Loading Property Profile Configuration...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-[#666666] font-medium flex items-center gap-2">
        <span>Home</span>
        <span>&gt;</span>
        <span>Executive Console</span>
        <span>&gt;</span>
        <span>Property Management</span>
        <span>&gt;</span>
        <span className="text-[#121212] font-semibold">Property Profile</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212]">
            Property Profile &amp; Location Setup
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Configure property brand identity, guest contact hotlines, geo-location, and architectural building amenities for Senopati Sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#4A6B5D] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Last saved 12 mins ago
          </span>
          <button className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#FBF9F5] transition-colors flex items-center gap-1.5 cursor-pointer">
            <span>Preview Public Listing</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-full bg-[#121212] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121212]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Profile Changes</span>
          </button>
        </div>
      </div>

      {(error || success) && (
        <div
          className={cn(
            "p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 border",
            error ? "bg-rose-50 text-rose-800 border-rose-200" : "bg-emerald-50 text-emerald-800 border-emerald-200",
          )}
        >
          {error ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
          <span>{error || success}</span>
        </div>
      )}

      {/* Main 2-Column Split */}
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* LEFT COLUMN: Main Configuration Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 01: Brand & Executive Identity */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] text-[#121212] text-xs font-bold flex items-center justify-center font-mono">
                  01
                </span>
                <h2 className="font-serif text-lg font-bold text-[#121212]">
                  Brand &amp; Executive Identity
                </h2>
              </div>
              <span className="bg-[#EAE8E4] text-[#121212] text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#EBE7DF]">
                Active Sanctuary
              </span>
            </div>
            <p className="text-xs text-[#666666] -mt-3">
              Official space designation registered on government PBI and member booking slips.
            </p>

            {/* Coworking Space Name */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                COWORKING SPACE NAME *
              </label>
              <input
                type="text"
                value={form.nama_coworking}
                onChange={(e) => setForm({ ...form, nama_coworking: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-semibold text-[#121212] focus:outline-none focus:border-[#121212]"
              />
              <span className="text-[11px] text-[#666666] mt-1 block">
                Appears on member digital keys, guest boarding slips, and catalog search.
              </span>
            </div>

            {/* Owner & Tax Reg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  OWNER / LEGAL REPRESENTATIVE *
                </label>
                <input
                  type="text"
                  value={form.nama_pemilik}
                  onChange={(e) => setForm({ ...form, nama_pemilik: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-semibold text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  INDONESIAN NPWP / PBI TAX REG.
                </label>
                <input
                  type="text"
                  value={form.npwp}
                  onChange={(e) => setForm({ ...form, npwp: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
            </div>

            {/* Spatial Classification Pills */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-2">
                PROPERTY SPATIAL CLASSIFICATION
              </label>
              <div className="flex flex-wrap gap-2">
                {CLASSIFICATIONS.map((c) => {
                  const active = selectedClassification === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedClassification(c)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer",
                        active
                          ? "bg-[#121212] text-white border-[#121212]"
                          : "bg-[#F5F3EF] text-[#666666] border-[#EBE7DF] hover:text-[#121212]",
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architectural Identity Monogram */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                SANCTUARY ARCHITECTURAL IDENTITY MARK
              </label>
              <div className="p-4 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#EBE7DF] font-serif font-bold text-lg text-[#121212] flex items-center justify-center text-center leading-tight">
                    W<br />M
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#121212]">
                      Official Building Monogram (Vector)
                    </h4>
                    <span className="text-[11px] text-[#666666]">
                      Available SVG configured for signage, passcards, and invoices.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-[#EBE7DF] bg-white text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors"
                >
                  Replace Mark
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 02: Contact & Spatial Location */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] text-[#121212] text-xs font-bold flex items-center justify-center font-mono">
                  02
                </span>
                <h2 className="font-serif text-lg font-bold text-[#121212]">
                  Contact &amp; Spatial Location
                </h2>
              </div>
              <MapPin className="w-4 h-4 text-[#666666]" />
            </div>
            <p className="text-xs text-[#666666] -mt-3">
              Verified contact lines and concierge GPS coordinates for member check-in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  WHATSAPP CONCIERGE HOTLINE *
                </label>
                <input
                  type="text"
                  value={form.telp}
                  onChange={(e) => setForm({ ...form, telp: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#121212]"
                />
                <span className="text-[11px] text-[#666666] mt-1 block">
                  Verified corporate WhatsApp dispatch router.
                </span>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                  OFFICIAL SUPPORT &amp; CONCIERGE EMAIL *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                FULL PHYSICAL BUILDING ADDRESS (SENOPATI, JAKARTA SELATAN) *
              </label>
              <textarea
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                rows={3}
                required
                className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs font-medium text-[#121212] focus:outline-none focus:border-[#121212] resize-none"
              />
            </div>

            {/* Calibrated Geo-Coordinates Widget */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1 flex items-center justify-between">
                <span>CALIBRATED GEO-COORDINATES</span>
                <span className="font-mono text-[#666666]">-6.2342° S, 106.8092° E</span>
              </label>
              <div className="relative h-44 rounded-2xl border border-[#EBE7DF] bg-[#F5F3EF] flex flex-col items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative bg-[#121212] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#C88A2B]" />
                  <span>WorkMates Senopati Sanctuary</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EBE7DF] text-[11px] font-bold text-[#121212] hover:bg-white flex items-center gap-1 shadow-xs"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* SECTION 03: Building Amenities & Architectural Facilities */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5F3EF] border border-[#EBE7DF] text-[#121212] text-xs font-bold flex items-center justify-center font-mono">
                  03
                </span>
                <h2 className="font-serif text-lg font-bold text-[#121212]">
                  Building Amenities &amp; Architectural Facilities
                </h2>
              </div>
              <Building2 className="w-4 h-4 text-[#666666]" />
            </div>
            <p className="text-xs text-[#666666] -mt-3">
              Highlight standard inclusions, acoustic ratings, and hospitality perks.
            </p>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                FACILITY SUMMARY &amp; ARCHITECTURAL SPECIFICATIONS (PUBLIC JOURNAL COPY)
              </label>
              <textarea
                value={form.deskripsi_fasilitas}
                onChange={(e) => setForm({ ...form, deskripsi_fasilitas: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-[#FBF9F5] rounded-xl border border-[#EBE7DF] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#121212] leading-relaxed resize-none"
              />
            </div>

            {/* Curated Amenity Badges */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-2">
                CURATED AMENITY BADGES (CATALOG FILTERS)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AMENITY_BADGES.map((badge) => {
                  const active = selectedAmenities.includes(badge);
                  return (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => toggleAmenity(badge)}
                      className={cn(
                        "px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all text-left cursor-pointer",
                        active
                          ? "bg-[#F5F3EF] text-[#121212] border-[#121212]"
                          : "bg-white text-[#666666] border-[#EBE7DF] hover:border-[#121212]",
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-md flex items-center justify-center border text-[10px]",
                          active ? "bg-[#121212] text-white border-[#121212]" : "border-[#EBE7DF]",
                        )}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </div>
                      <span>{badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </form>

        {/* RIGHT COLUMN: Live Catalog & Operational Previews */}
        <div className="space-y-6">
          {/* Live Catalog Card Preview */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE7DF]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                LIVE CATALOG CARD PREVIEW
              </span>
              <span className="text-[10px] font-bold text-[#4A6B5D] flex items-center gap-1">
                ● Public Sync Active
              </span>
            </div>

            {/* Card preview graphic */}
            <div className="rounded-2xl border border-[#EBE7DF] overflow-hidden bg-[#FBF9F5] shadow-xs">
              <div className="relative h-44 bg-[#EAE8E4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=95&w=800"
                  alt="Catalog preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#121212]">
                  Kebayoran Baru • Senopati
                </div>
                <div className="absolute top-3 right-3 bg-[#121212] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#C88A2B] fill-[#C88A2B]" /> 4.98
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#121212]">
                    {form.nama_coworking}
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Jl. Senopati No. 45, Kebayoran Baru
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#EBE7DF]">
                    1 Gbps Fiber
                  </span>
                  <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#EBE7DF]">
                    Herman Miller
                  </span>
                  <span className="bg-[#F5F3EF] text-[#666666] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#EBE7DF]">
                    Pour-Over Bar
                  </span>
                  <span className="text-[10px] text-[#666666] font-semibold self-center">
                    +5 more
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#666666] block">Passes starting at</span>
                    <strong className="font-mono text-[#121212]">IDR 180.000</strong>/day
                  </div>
                  <span className="text-[#121212] font-bold hover:underline">
                    View Full Space Catalog →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Verification */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-5 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#121212] pb-2 border-b border-[#EBE7DF]">
              Operational Verification
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#EBE7DF]">
                <span className="text-[#666666]">Property Grade Tier</span>
                <strong className="text-[#121212]">Founding Sanctuary Class A+</strong>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EBE7DF]">
                <span className="text-[#666666]">Inspection Protocol</span>
                <span className="text-[#4A6B5D] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Sonder Standards Verified
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EBE7DF]">
                <span className="text-[#666666]">Front-Desk Terminal ID</span>
                <strong className="font-mono text-[#121212]">FD-TER-JKT04</strong>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#EBE7DF]">
                <span className="text-[#666666]">Assigned Lead Concierge</span>
                <strong className="text-[#121212]">Andi Pratama (+62 811)</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#666666] block">
                  STAFF CHECK-IN PIN
                </span>
                <strong className="font-mono text-sm text-[#121212]">9842-SEN</strong>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-white text-[11px] font-bold text-[#121212] hover:bg-[#F5F3EF]"
              >
                Rotate Key
              </button>
            </div>
          </div>

          {/* Member Boarding Pass Preview */}
          <div className="bg-white rounded-2xl border border-[#EBE7DF] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#666666]">
              <span>MEMBER BOARDING PASS PREVIEW</span>
              <QrCode className="w-4 h-4 text-[#121212]" />
            </div>

            <div className="p-4 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#666666] block">
                    ARCHITECTURAL SANCTUARY
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#121212]">
                    Senopati Day Pass
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#121212] text-white font-bold text-xs flex items-center justify-center">
                  W
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#EBE7DF] border-dashed">
                <div>
                  <span className="text-[#666666] block">Check-In Node</span>
                  <strong className="font-mono text-[#121212]">POD-SEN-A3</strong>
                </div>
                <div>
                  <span className="text-[#666666] block">Access Hours</span>
                  <strong className="font-mono text-[#121212]">07:00 - 22:00</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
