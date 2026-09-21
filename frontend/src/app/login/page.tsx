'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { loginUser, registerMember, registerAdminSpace } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    badge: 'PRIVATE STUDIO 04',
    title: 'The Sanctuary Suite',
    description: 'Curated workspaces designed for clarity and deep focus, bathed in natural morning light.',
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
    badge: 'LOUNGE & CAFÉ 02',
    title: 'Artisan Leather & Timber Lounge',
    description: 'Double-height warm oak lounge featuring an artisanal espresso bar and plush bouclé seating.',
  },
  {
    url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1600&q=85',
    badge: 'QUIET POD 08',
    title: 'Library Pod & Quiet Work Sanctuary',
    description: 'Curved acoustic timber booth engineered for high-stakes calls, private reflection, and deep focus.',
  },
  {
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    badge: 'CONSERVATORY 01',
    title: 'The Solarium Greenhouse Studio',
    description: 'Sunlit glass-roof atrium with communal oak dining tables, biophilic trees, and rattan armchairs.',
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85',
    badge: 'EXECUTIVE SUITE 05',
    title: 'Boardroom & Collaborative Suite',
    description: 'Floor-to-ceiling timber bookshelves, arched windows, and Scandinavian curved couches for creative study.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { refreshData } = useSpaceStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [roleMode, setRoleMode] = useState<'member' | 'admin_space'>('member');

  // Slider State
  const [[slideIndex, direction], setSlide] = useState([0, 0]);

  // Form Fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Member Registration Fields
  const [namaMember, setNamaMember] = useState('');
  const [instansi, setInstansi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telp, setTelp] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Admin Space Registration Fields
  const [namaCoworking, setNamaCoworking] = useState('');
  const [namaPemilik, setNamaPemilik] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-advance carousel every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(([prevIndex]) => [(prevIndex + 1) % HERO_SLIDES.length, 1]);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[slideIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (authMode === 'login') {
        const res = await loginUser({
          username: username || email,
          email: email || username,
          password,
        }, rememberMe);
        await refreshData();
        setSuccessMessage('Autentikasi Berhasil! Mengalihkan...');
        setTimeout(() => {
          if (res?.data?.user?.role === 'admin_space') {
            router.push('/admin');
          } else {
            router.push('/member/bookings');
          }
        }, 600);
      } else {
        if (roleMode === 'member') {
          await registerMember({
            username: username || email.split('@')[0],
            email: email || username + '@workmates.space',
            password,
            nama_member: namaMember || username || 'Member WorkMates',
            instansi: instansi || 'Umum',
            alamat: alamat || 'Jl. Utama No. 1',
            telp: telp || '08123456789',
            foto: foto || undefined,
          }, rememberMe);
          await refreshData();
          setSuccessMessage('Pendaftaran Member Berhasil! Mengalihkan...');
          setTimeout(() => router.push('/member/bookings'), 600);
        } else {
          await registerAdminSpace({
            username: username || email.split('@')[0],
            email: email || username + '@workmates.space',
            password,
            nama_coworking: namaCoworking || 'WorkMates Sanctuary',
            nama_pemilik: namaPemilik || username || 'Pemilik Space',
            telp: telp || '08123456789',
          }, rememberMe);
          await refreshData();
          setSuccessMessage('Pendaftaran Partner Admin Berhasil! Mengalihkan...');
          setTimeout(() => router.push('/admin'), 600);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan autentikasi');
    } finally {
      setIsLoading(false);
    }
  };

  // Seamless edge-to-edge slider animation variants (zero gap / sekat)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 1,
      zIndex: 2,
    }),
    center: {
      x: '0%',
      opacity: 1,
      zIndex: 2,
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 1,
      zIndex: 1,
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const },
    }),
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#FBF9F5] text-[#121212]">
      
      {/* Left Column: Warm Luxury Architectural Visual Showcase (50% Width) */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 h-[480px] md:h-screen md:sticky md:top-0 shrink-0 overflow-hidden bg-[#1a1918]">
        {/* Continuous 1-to-1 Edge-to-Edge Slide Transition */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.url}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Top Left Floating Back Pill Button */}
        <div className="absolute top-8 left-8 z-30">
          <Link
            href="/spaces"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/95 backdrop-blur-md text-[#121212] hover:bg-white text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Back to Spaces</span>
          </Link>
        </div>

        {/* Bottom Left Slide Overlay Content */}
        <div className="absolute bottom-12 left-10 right-10 z-30 text-white space-y-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex + '-content'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-3.5"
            >
              {/* Green Dot Category Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold text-white tracking-widest uppercase border border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{currentSlide.badge}</span>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-3">
                  {currentSlide.title}
                </h2>
                <p className="text-base sm:text-lg text-white/95 font-light leading-relaxed max-w-xl">
                  {currentSlide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Extra Wide Editorial Auth Form (50% Width) */}
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto min-h-screen">
        
        {/* Top Header Navigation (Max Width 720px) */}
        <header className="flex items-center justify-between pb-8 border-b border-[#EBE7DF] max-w-[720px] w-full mx-auto">
          <div className="flex items-center gap-3.5">
            <span className="font-serif text-3xl font-bold text-[#121212] tracking-tight">WorkMates</span>
            <span className="px-3.5 py-1 bg-[#ECEAE4] rounded-full text-xs font-mono font-bold text-[#444444] tracking-widest uppercase">
              EST. 2025
            </span>
          </div>

          <Link href="/" className="text-base font-mono text-[#333333] hover:text-[#121212] transition-colors flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            <span>Concierge</span>
          </Link>
        </header>

        {/* Extra Wide Form Container (Max Width 720px) */}
        <div className="max-w-[720px] w-full mx-auto my-auto py-8">
          
          {/* Title & Subtitle Line */}
          <div className="text-left mb-10">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#121212] tracking-tight leading-[1.05] mb-4">
              Welcome to<br />WorkMates
            </h1>
            <p className="text-base sm:text-lg text-[#333333] font-normal leading-relaxed">
              A boutique sanctuary for modern thinkers and creators.
            </p>
          </div>

          {/* Smooth Floating Pill Mode Toggle (Sign In / Create Account) */}
          <div className="relative flex p-2 bg-[#ECEAE4] rounded-full w-full mb-10 border border-[#E2E0D8]">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
              className={`relative z-10 flex-1 py-4 px-8 rounded-full text-base sm:text-lg font-bold transition-colors duration-200 ${
                authMode === 'login' ? 'text-[#121212]' : 'text-[#555555] hover:text-[#121212]'
              }`}
            >
              {authMode === 'login' && (
                <motion.div
                  layoutId="authTabIndicator"
                  className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
              className={`relative z-10 flex-1 py-4 px-8 rounded-full text-base sm:text-lg font-bold transition-colors duration-200 ${
                authMode === 'register' ? 'text-[#121212]' : 'text-[#555555] hover:text-[#121212]'
              }`}
            >
              {authMode === 'register' && (
                <motion.div
                  layoutId="authTabIndicator"
                  className="absolute inset-0 bg-white rounded-full shadow-md z-[-1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              Create Account
            </button>
          </div>

          {/* Role selector for Registration Mode */}
          <AnimatePresence mode="wait">
            {authMode === 'register' && (
              <motion.div
                key="role-selector"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-8"
              >
                <div className="flex gap-3 p-2 bg-[#ECEAE4] rounded-full border border-[#E2E0D8]">
                  <button
                    type="button"
                    onClick={() => setRoleMode('member')}
                    className={`flex-1 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all ${
                      roleMode === 'member'
                        ? 'bg-[#121212] text-white shadow-sm'
                        : 'text-[#555555] hover:text-[#121212]'
                    }`}
                  >
                    Member Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleMode('admin_space')}
                    className={`flex-1 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all ${
                      roleMode === 'admin_space'
                        ? 'bg-[#4A6B5D] text-white shadow-sm'
                        : 'text-[#555555] hover:text-[#121212]'
                    }`}
                  >
                    Admin Partner
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error & Success Alert Badges */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-8 p-4.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm sm:text-base font-bold flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[22px]">error</span>
                <span>{errorMessage}</span>
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-8 p-4.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm sm:text-base font-bold flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extra Large Form Controls */}
          <AnimatePresence mode="wait">
            <motion.form
              key={authMode + '-' + roleMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* Username / Email Input */}
              <div>
                <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                  USERNAME OR CORPORATE EMAIL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setEmail(e.target.value); }}
                    placeholder="julian@architecture.studio"
                    className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none pr-14 shadow-sm"
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-[#666660] text-[22px] pointer-events-none">
                    mail
                  </span>
                </div>
              </div>

              {/* Dynamic Registration Fields */}
              {authMode === 'register' && roleMode === 'member' && (
                <>
                  {/* Member Profile Photo Upload Field */}
                  <div>
                    <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                      PROFILE PHOTO (FOTO PROFIL MEMBER)
                    </label>
                    <div className="flex items-center gap-5 p-4 rounded-3xl border-2 border-[#D0CEC7] bg-white shadow-sm">
                      <div className="relative w-16 h-16 rounded-full bg-[#ECEAE4] overflow-hidden flex items-center justify-center shrink-0 border-2 border-[#DCDAD0]">
                        {fotoPreview ? (
                          <img src={fotoPreview} alt="Preview Foto Profil" className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-[#555555] text-[30px]">account_circle</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor="member-foto-upload"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] text-white text-sm font-bold hover:bg-[#2b2b2b] transition-all cursor-pointer shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                          <span>{foto ? 'Ubah Foto' : 'Unggah Foto'}</span>
                        </label>
                        <input
                          id="member-foto-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFoto(file);
                              setFotoPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <p className="text-xs text-[#444444] font-medium mt-1.5 truncate">
                          {foto ? foto.name : 'PNG, JPG max 5MB (Opsional)'}
                        </p>
                      </div>
                      {foto && (
                        <button
                          type="button"
                          onClick={() => { setFoto(null); setFotoPreview(null); }}
                          className="p-2 rounded-full text-[#555555] hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus foto"
                        >
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={namaMember}
                      onChange={(e) => setNamaMember(e.target.value)}
                      placeholder="Julian Vance"
                      className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                        INSTITUTION
                      </label>
                      <input
                        type="text"
                        value={instansi}
                        onChange={(e) => setInstansi(e.target.value)}
                        placeholder="Studio Vance"
                        className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                        PHONE NUMBER
                      </label>
                      <input
                        type="text"
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {authMode === 'register' && roleMode === 'admin_space' && (
                <>
                  <div>
                    <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                      COWORKING SPACE BRAND
                    </label>
                    <input
                      type="text"
                      required
                      value={namaCoworking}
                      onChange={(e) => setNamaCoworking(e.target.value)}
                      placeholder="WorkMates Sanctuary"
                      className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                        OWNER / MANAGER NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={namaPemilik}
                        onChange={(e) => setNamaPemilik(e.target.value)}
                        placeholder="Julian Vance"
                        className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold block mb-2.5">
                        PHONE NUMBER
                      </label>
                      <input
                        type="text"
                        required
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none shadow-sm"
                      />
                    </div>
                  </div>
                </>
              )}


              {/* Password Input with Forgot Password Link */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-mono uppercase tracking-wider text-[#121212] font-bold">
                    PASSWORD
                  </label>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Hubungi Concierge di concierge@workmates.space untuk bantuan pemulihan akun.'); }}
                    className="text-sm font-mono font-bold text-[#333333] hover:text-[#121212] hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-6 py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-base font-semibold text-[#121212] placeholder-[#888880] transition-all duration-300 focus:border-[#121212] focus:ring-2 focus:ring-[#121212]/15 outline-none pr-14 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#666660] hover:text-[#121212] transition-colors"
                    aria-label="Toggle Password Visibility"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Checkbox "Remember this device" */}
              <div className="flex items-center gap-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    rememberMe ? 'bg-[#121212] border-[#121212] text-white' : 'border-[#A8A69E] bg-white'
                  }`}
                >
                  {rememberMe && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
                <span
                  className="text-base text-[#121212] font-semibold cursor-pointer select-none"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  Remember this device
                </span>
              </div>

              {/* Solid Black Primary Action Pill Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 rounded-full bg-[#000000] text-white font-bold text-base sm:text-lg uppercase tracking-wider hover:bg-[#222222] transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.005] active:scale-95 mt-4"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'SIGN IN TO SPACE' : 'CREATE ACCOUNT'}</span>
                    <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Or Access Via Divider */}
          <div className="relative flex py-8 items-center my-3">
            <div className="flex-grow border-t-2 border-[#DCDAD0]"></div>
            <span className="flex-shrink mx-5 text-sm font-mono text-[#444444] font-bold uppercase tracking-widest">
              OR ACCESS VIA
            </span>
            <div className="flex-grow border-t-2 border-[#DCDAD0]"></div>
          </div>

          {/* Secondary SSO / Keycard Button */}
          <button
            type="button"
            onClick={() => alert('SSO & Digital Keycard login diaktifkan untuk email korporat binaan WorkMates.')}
            className="w-full py-4.5 rounded-full border-2 border-[#D0CEC7] bg-white text-[#121212] font-bold text-base hover:bg-[#F5F4F0] transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <span className="material-symbols-outlined text-[22px] text-[#444444]">badge</span>
            <span>Digital Keycard / SSO</span>
          </button>

          {/* Terms & Privacy Disclaimer */}
          <p className="text-sm text-center text-[#444444] font-medium leading-relaxed mt-8 max-w-md mx-auto">
            By continuing, you agree to WorkMates' <span className="font-bold text-[#121212]">Architectural Standards</span> and <span className="font-bold text-[#121212]">Privacy Policy</span>.
          </p>
        </div>

        {/* Commercial Footer (Max Width 720px) */}
        <footer className="border-t border-[#EBE7DF] pt-8 mt-14 flex flex-col sm:flex-row items-center justify-between text-sm font-mono text-[#444444] gap-4 max-w-[720px] w-full mx-auto">
          <span>© 2025 WorkMates Hospitality Inc. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-[#121212] transition-colors font-bold">
              Support Concierge
            </Link>
            <span className="flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              v2.4-STABLE
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
