'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Space } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCityLandmarkPhoto, CITY_PHOTO_PLACEHOLDER } from '@/lib/cityImages';

const HERO_CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
];

export default function LandingPage() {
  const { spaces } = useSpaceStore();

  const filteredFeatured = spaces.slice(0, 6);
  const [cityPhotos, setCityPhotos] = useState<Record<string, string>>({});
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const cityCounts = useMemo(() => {
    const counts = new Map<string, number>();
    spaces.forEach((s) => {
      const name = s.city?.trim();
      if (!name) return;
      const existing = [...counts.keys()].find((k) => k.toLowerCase() === name.toLowerCase());
      if (existing) counts.set(existing, (counts.get(existing) || 0) + 1);
      else counts.set(name, 1);
    });
    return counts;
  }, [spaces]);

  useEffect(() => {
    let cancelled = false;
    Array.from(cityCounts.keys()).forEach(async (name) => {
      const photo = await fetchCityLandmarkPhoto(name);
      if (!cancelled) {
        setCityPhotos((prev) => (prev[name] === photo ? prev : { ...prev, [name]: photo }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [cityCounts]);

  const cityHubs = useMemo(
    () =>
      Array.from(cityCounts.entries()).map(([name, count]) => ({
        name,
        count,
        img: cityPhotos[name] || CITY_PHOTO_PLACEHOLDER,
      })),
    [cityCounts, cityPhotos]
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Rotating Image Carousel & Smooth Cross-Fade Dissolve */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-16 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden bg-black">
        {/* Animated Background Image Carousel */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {HERO_CAROUSEL_IMAGES.map((imgUrl, idx) => (
            <img
              key={imgUrl}
              src={imgUrl}
              alt="WorkMates Architectural Coworking Sanctuary"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ease-in-out ${
                idx === currentHeroIndex ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono mb-6 uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse"></span>
            <span>Sonder Architectural Workspaces</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] font-medium tracking-tight text-white mb-6">
            WorkMates
          </h1>

          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-sm">
            Boutique workspaces, private studios, and sunlit meeting sanctuaries designed with acoustic calm, natural stone, and seamless digital access.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/spaces"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-[#121212] shadow-2xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#f4efe7]"
            >
              <span>Lihat Katalog Ruang</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <a
              href="#featured-spaces"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/35 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Lihat Ruang Pilihan
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-white/80 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4A6B5D] text-[18px]">verified</span>
              <span>100% Konflik Reservasi 0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4A6B5D] text-[18px]">lock_open</span>
              <span>Digital Keycard QR Pass</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4A6B5D] text-[18px]">wifi</span>
              <span>1 Gbps Symmetrical Fiber</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy & Architecture Section */}
      <section className="w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#fbf9f5] border-b border-[#EBE7DF]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#747878] font-semibold block mb-3">
                Filosofi Arsitektur
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#121212] leading-tight mb-6">
                Ketenangan spasial untuk produktivitas tanpa kompromi.
              </h2>
              <div className="w-16 h-1 bg-[#121212] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-[#5e5e5e] text-base sm:text-lg leading-relaxed font-light"
            >
              <p>
                WorkMates hadir sebagai antitesis dari coworking komersial yang bising dan seragam. Kami memadukan proporsi arsitektur galeri Skandinavia dengan kehangatan travertine alami, kayu oak bertekstur, dan plester kapur akustik ramah lingkungan.
              </p>
              <p>
                Setiap studio dan salon pertemuan diisolasi secara akustik dengan standar STC-52, dilengkapi tata cahaya sirkadian yang ramah mata, serta koneksi data berkecepatan gigabit. Diciptakan bagi founder, kreator, dan tim eksekutif yang menghargai ketenangan berfokus.
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono text-[#121212]">
                <div className="p-4 rounded-2xl bg-white border border-[#EBE7DF]">
                  <span className="text-2xl font-serif font-bold text-[#121212] block mb-1">STC-52</span>
                  <span className="text-[#747878]">Soundproof Acoustic Isolation</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EBE7DF]">
                  <span className="text-2xl font-serif font-bold text-[#121212] block mb-1">1,000 Mbps</span>
                  <span className="text-[#747878]">Low Latency Fiber Network</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EBE7DF] col-span-2 sm:col-span-1">
                  <span className="text-2xl font-serif font-bold text-[#4A6B5D] block mb-1">{cityHubs.length || 0} Kota</span>
                  <span className="text-[#747878]">Jaringan Sanctuary Eksklusif</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curated Spaces Bento Grid */}
      <section id="featured-spaces" className="w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#ffffff]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#747878] font-semibold block mb-2">
                Spatial Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#121212]">
                Ruang pilihan untuk setiap ritme kerja
              </h2>
            </div>
            <Link
              href="/spaces"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#121212] hover:text-[#4A6B5D] transition-colors pb-1 border-b border-[#121212]"
            >
              <span>Lihat Seluruh Katalog Ruang</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatured.map((space: Space) => (
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                key={space.id}
                className="group bg-[#fbf9f5] border border-[#EBE7DF] rounded-3xl overflow-hidden hover:border-[#121212] transition-all duration-300 flex flex-col hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#efeeea]">
                  <img
                    src={space.imageUrl}
                    alt={space.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#121212] font-semibold border border-[#EBE7DF]">
                    {space.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#121212]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1">
                    <span className="text-[#C88A2B]">★</span>
                    <span>{space.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#747878] mb-2">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span>{space.location}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#121212] mb-3 group-hover:text-[#4A6B5D] transition-colors">
                      {space.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5e5e5e] font-light line-clamp-2 mb-6">
                      {space.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 border-t border-[#EBE7DF] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#747878] uppercase">Mulai Dari</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono font-bold text-base sm:text-lg text-[#121212]">
                          Rp {space.hourlyRate.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-[#747878] font-mono">/jam</span>
                      </div>
                    </div>

                    <Link
                      href={`/login`}
                      className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Pesan Ruang</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Keycard & Flow Feature Banner */}
      <section className="w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#1c1b1b] text-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C88A2B] font-semibold">
                Pintu Tanpa Kunci Fisik
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-white">
                Digital Boarding Pass &amp; Akses Instan
              </h2>
              <p className="text-white/80 text-base leading-relaxed font-light">
                Setelah konfirmasi reservasi berhasil, Anda langsung menerima E-Ticket resmi berformat pass arsitektural. Pindai kode QR pada scanner resepsionis atau masukkan 4-digit PIN untuk membuka studio Anda.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C88A2B]">
                    <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">QR Code Berkecepatan Tinggi</h4>
                    <p className="text-xs text-[#858383] font-light">Tervalidasi langsung di front-desk dalam waktu &lt; 0.5 detik.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C88A2B]">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Faktur &amp; Laporan Pajak Otomatis</h4>
                    <p className="text-xs text-[#858383] font-light">Unduh bukti sewa resmi untuk reimbursement perusahaan.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking"
                  className="px-8 py-3.5 rounded-full bg-white text-[#121212] font-semibold text-sm hover:bg-[#efeeea] transition-all shadow-lg"
                >
                  Coba Alur Reservasi
                </Link>
                <Link
                  href="/admin/checkin"
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span>Uji Scanner Front-Desk</span>
                </Link>
              </div>
            </div>

            {/* Visual Boarding Card Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#fbf9f5] text-[#121212] rounded-3xl p-8 border border-[#EBE7DF] shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#121212] text-white flex items-center justify-center font-serif text-xs font-bold">W</div>
                    <span className="font-serif font-bold text-sm">WorkMates Pass</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#4A6B5D]/15 text-[#4A6B5D] text-[10px] font-mono font-bold uppercase">
                    Terverifikasi
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#747878] uppercase">Studio / Ruang</span>
                    <h4 className="font-serif text-xl font-bold text-[#121212]">The Travertine Studio</h4>
                    <span className="text-xs text-[#5e5e5e]">SCBD Lot 8, Jakarta</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[#747878] uppercase block">Tanggal</span>
                      <span className="font-bold text-[#121212]">18 Sep 2026</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#747878] uppercase block">Slot Waktu</span>
                      <span className="font-bold text-[#121212]">09:00 - 13:00 WIB</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#747878] uppercase block">Keycard PIN</span>
                      <span className="font-bold text-lg text-[#121212] tracking-widest">8942</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#747878] uppercase block">Seat ID</span>
                      <span className="font-bold text-[#4A6B5D]">STUDIO-01</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed border-[#EBE7DF] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#747878]">KODE BOOKING</span>
                      <span className="font-mono font-bold text-xs text-[#121212]">WM-2026-8902</span>
                    </div>
                    <div className="w-16 h-16 bg-white border border-[#EBE7DF] rounded-xl p-1 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-[#121212]">qr_code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cityHubs.length > 0 && (
      <section className="w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#fbf9f5]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#747878] font-semibold block mb-2">
              Jaringan Properti
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#121212] mb-4">
              {cityHubs.length} Destinasi Sanctuary
            </h2>
            <p className="text-[#5e5e5e] text-sm sm:text-base font-light">
              Kota muncul hanya jika ada space aktif di backend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityHubs.map((city) => (
            <div key={city.name} className="bg-white rounded-3xl p-6 border border-[#EBE7DF] hover:shadow-lg transition-all">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#efeeea]">
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono uppercase text-[#4A6B5D] font-bold">{city.count} space</span>
              <h3 className="font-serif text-xl font-semibold text-[#121212] mt-1 mb-2">{city.name}</h3>
              <Link href={`/spaces?city=${encodeURIComponent(city.name)}`} className="text-xs font-semibold text-[#121212] hover:text-[#4A6B5D] flex items-center gap-1 font-mono">
                <span>Eksplor {city.name}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
