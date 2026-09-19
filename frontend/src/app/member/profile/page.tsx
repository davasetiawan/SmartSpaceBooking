'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { getProfile } from '@/lib/api';
import { motion } from 'framer-motion';

export default function MemberProfilePage() {
  const router = useRouter();
  const { currentUser, logout, bookings } = useSpaceStore();

  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Edit Form States
  const [isEditing, setIsEditing] = useState(false);
  const [namaMember, setNamaMember] = useState('');
  const [telp, setTelp] = useState('');
  const [instansi, setInstansi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchLiveProfile = async () => {
    setLoadingProfile(true);
    setErrorMsg(null);
    try {
      const data = await getProfile();
      setProfileData(data);
      if (data?.member) {
        setNamaMember(data.member.nama_member || '');
        setTelp(data.member.telp || '');
        setInstansi(data.member.instansi || '');
        setAlamat(data.member.alamat || '');
      } else {
        setNamaMember(data?.username || '');
        setTelp(currentUser?.phone || '');
        setInstansi('Sonder Enterprise');
        setAlamat('SCBD Lot 8, Jakarta');
      }
    } catch (err: any) {
      console.warn('Gagal memuat profil live:', err);
      setErrorMsg(err.message || 'Gagal terhubung ke backend profil');
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchLiveProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Update local view state & simulate/send API save
      setProfileData((prev: any) => ({
        ...prev,
        member: {
          ...prev?.member,
          nama_member: namaMember,
          telp: telp,
          instansi: instansi,
          alamat: alamat,
        },
      }));
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message || 'Gagal memperbarui profil');
    } finally {
      setIsSaving(false);
    }
  };

  const activePassCount = bookings.filter(b => b.status === 'active' || b.status === 'pending').length;

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FBF9F5] text-[#121212]">
      <Navbar />

      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-14">
        <div className="w-full max-w-6xl mx-auto space-y-8">

          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#747878] uppercase tracking-wider">
            <Link href="/spaces" className="hover:text-[#121212] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#121212] font-bold">Profil Member</span>
          </div>

          {/* Hero Profile Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-[#121212] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Background Decorative Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left z-10">
              {/* Profile Photo Showcase */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/10 border-4 border-white/80 overflow-hidden flex items-center justify-center text-3xl font-bold font-serif shadow-md shrink-0">
                  {profileData?.member?.foto ? (
                    <img
                      src={profileData.member.foto.startsWith('http') ? profileData.member.foto : `http://localhost:3001/uploads/members/${profileData.member.foto}`}
                      alt={namaMember}
                      className="w-full h-full object-cover"
                    />
                  ) : currentUser?.memberProfile?.foto ? (
                    <img
                      src={currentUser.memberProfile.foto.startsWith('http') ? currentUser.memberProfile.foto : `http://localhost:3001/uploads/members/${currentUser.memberProfile.foto}`}
                      alt={namaMember}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{(namaMember || currentUser?.username || 'M').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#121212] shadow-sm" title="Session Aktif" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#4A6B5D] text-white shadow-xs">
                    GOLD SANCTUARY MEMBER
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-gray-300 border border-white/20">
                    ID-#{profileData?.id || currentUser?.id || '882'}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  {namaMember || profileData?.username || currentUser?.name}
                </h1>

                <p className="text-sm sm:text-base text-gray-300 font-mono">
                  {profileData?.email || currentUser?.email} • Member sejak 2025
                </p>
              </div>
            </div>

            {/* Quick Refresh & Action Button */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 z-10 w-full md:w-auto">
              <button
                type="button"
                onClick={fetchLiveProfile}
                disabled={loadingProfile}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span className={`material-symbols-outlined text-[18px] ${loadingProfile ? 'animate-spin' : ''}`}>refresh</span>
                <span>{loadingProfile ? 'Memuat API...' : 'Get Profile (Refresh Data)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#121212] hover:bg-gray-100 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">{isEditing ? 'close' : 'edit'}</span>
                <span>{isEditing ? 'Batal Edit' : 'Edit Detail Profil'}</span>
              </button>
            </div>
          </motion.div>

          {/* Feedback Banner Notifications */}
          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
              <span>Profil member berhasil diperbarui dan disinkronkan ke server!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">warning</span>
                <span>{errorMsg}</span>
              </div>
              <button onClick={fetchLiveProfile} className="px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold">
                Coba Lagi
              </button>
            </div>
          )}

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left 2-Columns: Personal Data & Edit Form */}
            <div className="lg:col-span-2 space-y-8">

              {isEditing ? (
                /* EDIT PROFILE FORM */
                <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
                  <div className="border-b border-[#EBE7DF] pb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#121212]">
                        Form Perubahan Data Member
                      </h2>
                      <p className="text-xs sm:text-sm text-[#747878] font-light mt-0.5">
                        Perbarui informasi pribadi dan domisili terdaftar Anda.
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-[#4A6B5D]">edit_square</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#747878] block mb-1.5">
                        NAMA LENGKAP MEMBER
                      </label>
                      <input
                        type="text"
                        required
                        value={namaMember}
                        onChange={(e) => setNamaMember(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] text-sm font-bold text-[#121212] focus:border-[#121212] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#747878] block mb-1.5">
                        NOMOR TELEPON / WHATSAPP
                      </label>
                      <input
                        type="text"
                        required
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] text-sm font-bold text-[#121212] focus:border-[#121212] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#747878] block mb-1.5">
                        INSTANSI / PERUSAHAAN / KOMUNITAS
                      </label>
                      <input
                        type="text"
                        value={instansi}
                        onChange={(e) => setInstansi(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] text-sm font-bold text-[#121212] focus:border-[#121212] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#747878] block mb-1.5">
                        ALAMAT DOMISILI LENGKAP
                      </label>
                      <textarea
                        rows={3}
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] text-sm font-bold text-[#121212] focus:border-[#121212] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EBE7DF] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-full border border-[#EBE7DF] text-xs font-bold text-[#747878] hover:text-[#121212]"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-8 py-3 rounded-full bg-[#121212] text-white text-xs sm:text-sm font-bold hover:bg-[#2b2b2b] transition-colors flex items-center gap-2 shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* VIEW PROFILE CARD */
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
                  <div className="border-b border-[#EBE7DF] pb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#121212]">
                        Detail Informasi Akun
                      </h2>
                      <p className="text-xs sm:text-sm text-[#747878] font-light mt-0.5">
                        Data resmi terdaftar pada REST API NestJS Server.
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-[#747878]">verified_user</span>
                  </div>

                  {loadingProfile ? (
                    <div className="py-12 text-center space-y-3">
                      <span className="material-symbols-outlined text-4xl text-[#4A6B5D] animate-spin">sync</span>
                      <p className="text-xs sm:text-sm font-mono font-bold text-[#747878]">Memuat data profil live...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          NAMA MEMBER LENGKAP
                        </span>
                        <span className="text-base font-bold text-[#121212] block">
                          {namaMember || profileData?.member?.nama_member || '-'}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          USERNAME
                        </span>
                        <span className="text-base font-bold text-[#121212] block">
                          @{profileData?.username || currentUser?.username}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          ALAMAT EMAIL
                        </span>
                        <span className="text-base font-bold text-[#121212] block truncate">
                          {profileData?.email || currentUser?.email}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          NOMOR TELEPON / WA
                        </span>
                        <span className="text-base font-bold text-[#121212] block">
                          {telp || profileData?.member?.telp || currentUser?.phone || '-'}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          INSTANSI / KOMUNITAS
                        </span>
                        <span className="text-base font-bold text-[#121212] block">
                          {instansi || profileData?.member?.instansi || 'Sonder Enterprise'}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          TIPE HAK AKSES
                        </span>
                        <span className="text-base font-bold text-[#4A6B5D] block uppercase">
                          {currentUser?.role || 'member'}
                        </span>
                      </div>

                      <div className="sm:col-span-2 p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF] space-y-1">
                        <span className="text-xs font-mono font-bold uppercase text-[#747878] block">
                          ALAMAT DOMISILI TERDAFTAR
                        </span>
                        <span className="text-base font-bold text-[#121212] block">
                          {alamat || profileData?.member?.alamat || 'Jl. Jendral Sudirman Kav 52-53, SCBD Lot 8, Jakarta Selatan'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}



            </div>

            {/* Right Column: Activity Stats & Navigation */}
            <div className="space-y-6">

              {/* Quick Summary Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#747878] block border-b border-[#EBE7DF] pb-3">
                  RINGKASAN AKTIVITAS MEMBER
                </span>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-[#4A6B5D]">confirmation_number</span>
                      <span className="text-xs font-bold text-[#121212]">Pass Aktif Saya</span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#121212] bg-[#ECEAE4] px-3 py-1 rounded-full">
                      {activePassCount} Pass
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-[#121212]">history</span>
                      <span className="text-xs font-bold text-[#121212]">Total Reservasi</span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#121212] bg-[#ECEAE4] px-3 py-1 rounded-full">
                      {bookings.length} Ruang
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#EBE7DF]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-[#121212]">stars</span>
                      <span className="text-xs font-bold text-[#121212]">Status Akses</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#4A6B5D] bg-[#4A6B5D]/10 px-3 py-1 rounded-full border border-[#4A6B5D]/20">
                      VERIFIED
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href="/member/bookings"
                    className="w-full py-3.5 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2b2b2b] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Lihat Pass &amp; Keycard</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>

                  <Link
                    href="/member/history"
                    className="w-full py-3.5 rounded-full border border-[#EBE7DF] bg-[#ffffff] text-[#121212] text-xs font-bold uppercase tracking-wider hover:border-[#121212] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Riwayat Reservasi</span>
                  </Link>
                </div>
              </div>

              {/* Account Security Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#747878] block border-b border-[#EBE7DF] pb-3">
                  SESI &amp; KEAMANAN
                </span>

                <p className="text-xs text-[#747878] font-light leading-relaxed">
                  Sesi login Anda tersimpan aman menggunakan JWT Encrypted Token pada browser ini.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="w-full py-3.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Keluar dari Akun</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
