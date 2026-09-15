"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  Badge,
  HelpCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  User,
  Building2,
  Wrench,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api, apiErrorMessage, persistAuth } from "@/lib/api";
import { cn } from "@/lib/utils";

type RoleType = "member" | "admin_space" | "maker";

const SLIDES = [
  {
    id: 1,
    tag: "PRIVATE STUDIO 04",
    title: "The Sanctuary Suite",
    desc: "Curated workspaces designed for clarity and deep focus, bathed in natural morning light.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=95&w=1920",
  },
  {
    id: 2,
    tag: "MEETING SANCTUARY 02",
    title: "The Boardroom Pavilion",
    desc: "Natural oak conference table, 4K wireless presentation display, and sheer linen privacy curtains.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=95&w=1920",
  },
  {
    id: 3,
    tag: "EXECUTIVE OFFICE 01",
    title: "The Executive Walnut Suite",
    desc: "Acoustic slatted walnut wall panelling, private executive lounge seating, and dedicated intercom.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=95&w=1920",
  },
];

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<RoleType>("member");
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Slide Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Login State
  const [loginUsername, setLoginUsername] = useState(
    "julian@architecture.studio",
  );
  const [loginPassword, setLoginPassword] = useState("••••••••••••");

  // Register State - Member
  const [regForm, setRegForm] = useState({
    username: "",
    email: "",
    password: "",
    nama_member: "",
    instansi: "",
    alamat: "",
    telp: "",
  });
  const [regFoto, setRegFoto] = useState<File | undefined>();
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Register State - Admin Space Owner
  const [adminRegForm, setAdminRegForm] = useState({
    username: "",
    email: "",
    password: "",
    nama_coworking: "",
    nama_pemilik: "",
    telp: "",
  });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = await api.login({
        username: loginUsername,
        password: loginPassword,
      });
      persistAuth(payload);
      if (payload.user.role === "admin_space") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(
        apiErrorMessage(err, "Login gagal. Cek username & password Anda."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (selectedRole === "admin_space") {
        const payload = await api.registerAdminSpace(adminRegForm);
        persistAuth(payload);
        router.push("/admin/dashboard");
      } else {
        const payload = await api.registerMember(regForm, regFoto);
        persistAuth(payload);
        router.push("/");
      }
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          "Pendaftaran akun gagal. Mohon periksa data Anda.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col md:flex-row bg-[#FAF9F6] font-sans text-[#121212] select-none">
      {/* LEFT HALF: Smooth Architectural Image Slicing Carousel */}
      <div className="relative w-full md:w-1/2 h-full bg-[#121212] shrink-0 overflow-hidden">
        {/* Animated Image Crossfade Slicing */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>

        {/* Ambient Vignette & Scrim Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

        {/* Top-Left Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#121212] text-xs font-semibold shadow-lg hover:bg-white transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Spaces</span>
          </Link>
        </div>

        {/* Carousel Slide Indicators & Manual Controls */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + SLIDES.length) % SLIDES.length,
              )
            }
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentSlide === idx ? "w-6 bg-white" : "w-1.5 bg-white/40",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom-Left Glassmorphism Card for 100% GUARANTEED Readable White Text */}
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="bg-black/80 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl text-white space-y-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25">
                <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  {activeSlide.tag}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white !text-white drop-shadow-md">
                {activeSlide.title}
              </h2>
              <p className="text-xs md:text-sm text-white/95 max-w-lg font-sans leading-relaxed drop-shadow-sm">
                {activeSlide.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT HALF: Auth Controls Container - Proportional Width & High Contrast Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between bg-[#FAF9F6] px-8 md:px-16 py-8 overflow-y-auto no-scrollbar">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] bg-[#EBE7DF]/80 px-3.5 py-1 rounded-full border border-[#EBE7DF] font-semibold">
            EST. 2025
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#666666] hover:text-[#121212] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Concierge</span>
          </Link>
        </header>

        {/* Center Form Container */}
        <div className="w-full max-w-xl mx-auto py-2 space-y-6">
          <p className="text-center text-sm md:text-base text-[#666666] font-medium max-w-md mx-auto">
            A boutique sanctuary for modern thinkers and creators.
          </p>

          {/* Role Selector Pill */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase font-bold tracking-widest text-center text-[#666666]">
              AKSES SEBAGAI (ROLE)
            </label>
            <div className="bg-[#EBE7DF]/70 p-1.5 rounded-full border border-[#EBE7DF] grid grid-cols-3 text-center text-xs md:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setSelectedRole("member")}
                className={cn(
                  "py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5",
                  selectedRole === "member"
                    ? "bg-white text-[#121212] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#121212]",
                )}
              >
                <User className="w-4 h-4" /> Member
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("admin_space")}
                className={cn(
                  "py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5",
                  selectedRole === "admin_space"
                    ? "bg-white text-[#121212] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#121212]",
                )}
              >
                <Building2 className="w-4 h-4" /> Space Owner
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("maker")}
                className={cn(
                  "py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5",
                  selectedRole === "maker"
                    ? "bg-white text-[#121212] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#121212]",
                )}
              >
                <Wrench className="w-4 h-4" /> Maker
              </button>
            </div>
          </div>

          {/* Mode Switcher Pill */}
          <div className="bg-[#EBE7DF]/70 p-1.5 rounded-full border border-[#EBE7DF] grid grid-cols-2 text-center text-xs md:text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={cn(
                "py-2.5 rounded-full transition-all",
                mode === "login"
                  ? "bg-white text-[#121212] shadow-sm font-bold"
                  : "text-[#666666] hover:text-[#121212]",
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={cn(
                "py-2.5 rounded-full transition-all",
                mode === "register"
                  ? "bg-white text-[#121212] shadow-sm font-bold"
                  : "text-[#666666] hover:text-[#121212]",
              )}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs md:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="form-login"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleLoginSubmit}
                className="space-y-4"
              >
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                    USERNAME OR CORPORATE EMAIL
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                      placeholder="julian@architecture.studio"
                      className="w-full pl-5 pr-12 py-3.5 bg-white rounded-full border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212] shadow-xs"
                    />
                    <Mail className="absolute right-4 w-5 h-5 text-[#666666]" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#666666]">
                      PASSWORD
                    </label>
                    <a
                      href="#"
                      className="text-xs text-[#666666] hover:text-[#121212] hover:underline font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="w-full pl-5 pr-12 py-3.5 bg-white rounded-full border border-[#EBE7DF] text-sm font-medium text-[#121212] focus:outline-none focus:border-[#121212] shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 text-[#666666] hover:text-[#121212]"
                    >
                      {showPwd ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#EBE7DF] text-[#121212] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs md:text-sm text-[#666666] cursor-pointer"
                  >
                    Remember this device
                  </label>
                </div>

                {/* Main Black CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#121212] text-white text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-[#121212]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>SIGN IN TO SPACE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="form-register"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleRegisterSubmit}
                className="space-y-4"
              >
                {selectedRole === "admin_space" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          NAMA COWORKING SPACE
                        </label>
                        <input
                          type="text"
                          value={adminRegForm.nama_coworking}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              nama_coworking: e.target.value,
                            })
                          }
                          required
                          placeholder="Sanctuary Hub Senopati"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          NAMA PEMILIK / MANAGER
                        </label>
                        <input
                          type="text"
                          value={adminRegForm.nama_pemilik}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              nama_pemilik: e.target.value,
                            })
                          }
                          required
                          placeholder="Julian Vance"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          USERNAME
                        </label>
                        <input
                          type="text"
                          value={adminRegForm.username}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              username: e.target.value,
                            })
                          }
                          required
                          placeholder="owner_senopati"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          EMAIL CORPORATE
                        </label>
                        <input
                          type="email"
                          value={adminRegForm.email}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              email: e.target.value,
                            })
                          }
                          required
                          placeholder="owner@smartspace.com"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          NO. TELEPON / WHATSAPP
                        </label>
                        <input
                          type="text"
                          value={adminRegForm.telp}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              telp: e.target.value,
                            })
                          }
                          required
                          placeholder="081298765432"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          PASSWORD (MIN 8 KARAKTER)
                        </label>
                        <input
                          type="password"
                          value={adminRegForm.password}
                          onChange={(e) =>
                            setAdminRegForm({
                              ...adminRegForm,
                              password: e.target.value,
                            })
                          }
                          required
                          minLength={8}
                          placeholder="••••••••••••"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          NAMA LENGKAP
                        </label>
                        <input
                          type="text"
                          value={regForm.nama_member}
                          onChange={(e) =>
                            setRegForm({ ...regForm, nama_member: e.target.value })
                          }
                          required
                          placeholder="Julian Vance"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          USERNAME
                        </label>
                        <input
                          type="text"
                          value={regForm.username}
                          onChange={(e) =>
                            setRegForm({ ...regForm, username: e.target.value })
                          }
                          required
                          placeholder="jvance"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          EMAIL
                        </label>
                        <input
                          type="email"
                          value={regForm.email}
                          onChange={(e) =>
                            setRegForm({ ...regForm, email: e.target.value })
                          }
                          required
                          placeholder="julian@studio.id"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          NO. WHATSAPP
                        </label>
                        <input
                          type="text"
                          value={regForm.telp}
                          onChange={(e) =>
                            setRegForm({ ...regForm, telp: e.target.value })
                          }
                          required
                          placeholder="081234567890"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          INSTANSI / STUDIO
                        </label>
                        <input
                          type="text"
                          value={regForm.instansi}
                          onChange={(e) =>
                            setRegForm({ ...regForm, instansi: e.target.value })
                          }
                          required
                          placeholder="Atelier Nord"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                          PASSWORD
                        </label>
                        <input
                          type="password"
                          value={regForm.password}
                          onChange={(e) =>
                            setRegForm({ ...regForm, password: e.target.value })
                          }
                          required
                          minLength={6}
                          placeholder="••••••••••••"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666] mb-1">
                        ALAMAT LENGKAP
                      </label>
                      <textarea
                        value={regForm.alamat}
                        onChange={(e) =>
                          setRegForm({ ...regForm, alamat: e.target.value })
                        }
                        required
                        rows={2}
                        placeholder="Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan"
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#EBE7DF] text-xs md:text-sm focus:outline-none focus:border-[#121212] resize-none"
                      />
                    </div>

                    {/* Profile Photo Upload Box */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#666666]">
                        FOTO PROFIL MEMBER (FOTO)
                      </label>
                      <div className="relative border border-dashed border-[#EBE7DF] rounded-2xl p-4 bg-white hover:bg-[#EBE7DF]/30 transition-colors text-center cursor-pointer group">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFotoChange}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-4">
                          {fotoPreview ? (
                            <img
                              src={fotoPreview}
                              alt="Preview Portrait"
                              className="w-12 h-12 rounded-full object-cover border border-[#121212]"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#EBE7DF] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
                              <Camera className="w-5 h-5 text-[#666666]" />
                            </div>
                          )}
                          <div className="text-left">
                            <p className="text-xs font-semibold text-[#121212]">
                              {regFoto ? regFoto.name : "Unggah foto profil portrait Anda"}
                            </p>
                            <p className="text-[11px] text-[#666666]">
                              PNG, JPG up to 5MB (Disarankan rasio 3:4)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#121212] text-white text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-[#121212]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {selectedRole === "admin_space"
                          ? "REGISTER SPACE OWNER ACCOUNT"
                          : "CREATE MEMBER ACCOUNT"}
                      </span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 py-1 text-[#666666]/40">
            <div className="h-px flex-1 bg-[#EBE7DF]" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#666666]">
              OR ACCESS VIA
            </span>
            <div className="h-px flex-1 bg-[#EBE7DF]" />
          </div>

          {/* Secondary SSO Button */}
          <button
            type="button"
            className="w-full py-3.5 rounded-full bg-white border border-[#EBE7DF] text-[#121212] text-xs font-semibold hover:bg-white/80 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Badge className="w-4 h-4 text-[#121212]" />
            <span>Digital Keycard / SSO</span>
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-[#666666] text-center leading-relaxed font-sans">
            By continuing, you agree to WorkMates'{" "}
            <a href="#" className="text-[#121212] font-semibold hover:underline">
              Architectural Standards
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#121212] font-semibold hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Bottom Footer Bar */}
        <footer className="flex items-center justify-between text-xs text-[#666666] pt-4 border-t border-[#EBE7DF]/80">
          <span>© 2025 WorkMates Hospitality Inc. All rights reserved.</span>
          <a href="#" className="hover:text-[#121212] transition-colors font-medium">
            Support Concierge
          </a>
          <span className="font-mono text-[#666666]">v2.4-STABLE</span>
        </footer>
      </div>
    </main>
  );
}