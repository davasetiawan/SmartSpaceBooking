'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function AdminProfilePage() {
  const { propertyProfile } = useSpaceStore();

  const [name, setName] = useState(propertyProfile.name);
  const [address, setAddress] = useState(propertyProfile.flagshipAddress);
  const [hours, setHours] = useState(propertyProfile.operatingHours);
  const [phone, setPhone] = useState(propertyProfile.conciergePhone);
  const [email, setEmail] = useState(propertyProfile.conciergeEmail);
  const [wifiSSID, setWifiSSID] = useState(propertyProfile.wifiSSID);
  const [wifiKey, setWifiKey] = useState(propertyProfile.wifiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { updateAdminProfile } = await import('@/lib/api');
      await updateAdminProfile({
        nama_coworking: name,
        telp: phone,
        alamat: address,
        deskripsi_fasilitas: `Hours: ${hours} | Wi-Fi: ${wifiSSID}`
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan profil');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-8 overflow-y-auto">
        <div className="w-full space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                PROPERTY &amp; SANCTUARY CONFIGURATION
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Profil Properti &amp; Kredensial Gedung
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Atur identitas merek, jam operasional concierge, dan kredensial Wi-Fi gedung sanctuary.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Simpan Profil</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/30 text-[#4A6B5D] text-xs font-mono font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Perubahan profil properti berhasil diperbarui ke seluruh sistem!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Section 1: Brand & Identity */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="border-b border-[#EBE7DF] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#121212]">
                  1. Identitas Merek &amp; Ruang
                </h3>
                <p className="text-xs text-[#5e5e5e] font-light mt-0.5">
                  Informasi resmi yang tertera pada faktur pajak PB1 dan kartu digital pass tamu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Nama Properti / Coworking
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] font-serif font-bold text-base text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Alamat Lengkap Flagship Hub
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Jam Operasional Layanan
                  </label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Concierge Hotlines */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="border-b border-[#EBE7DF] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#121212]">
                  2. Kontak Concierge &amp; Dukungan Tamu
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Nomor WhatsApp / Hotline Concierge
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Email Resmi Support
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Wi-Fi Credentials */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-6">
              <div className="border-b border-[#EBE7DF] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#121212]">
                  3. Kredensial Jaringan Wi-Fi Sanctuary
                </h3>
                <p className="text-xs text-[#5e5e5e] font-light mt-0.5">
                  Informasi ini otomatis muncul di bagian bawah E-Ticket setiap member setelah booking terkonfirmasi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    SSID Network Name
                  </label>
                  <input
                    type="text"
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1.5">
                    Password Wi-Fi
                  </label>
                  <input
                    type="text"
                    value={wifiKey}
                    onChange={(e) => setWifiKey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors shadow-lg"
              >
                Simpan Seluruh Konfigurasi
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}
