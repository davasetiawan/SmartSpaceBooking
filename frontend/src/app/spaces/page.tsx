'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCityLandmarkPhoto, cityTag, CITY_PHOTO_PLACEHOLDER } from '@/lib/cityImages';

const CATEGORIES = [
  'Semua',
  'Personal Desk',
  'Private Office',
  'Meeting Room',
];

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function SpacesCatalogContent() {
  const { spaces } = useSpaceStore();
  const searchParams = useSearchParams();

  const initialCity = searchParams.get('city') || 'Semua Kota';
  const initialCategory = searchParams.get('category') || 'Semua';

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick Filter Bar States
  const [reservationDate, setReservationDate] = useState('2026-09-19');
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [timeZone, setTimeZone] = useState('WIB');
  const [reservationDuration, setReservationDuration] = useState('2 Hours');

  // Custom Popover States
  const [openPopover, setOpenPopover] = useState<'city' | 'category' | 'date' | 'time' | 'duration' | null>(null);
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(8); // September (0-indexed)

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleSelectPreset = (preset: 'today' | 'tomorrow' | 'weekend') => {
    const d = new Date();
    if (preset === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    } else if (preset === 'weekend') {
      const day = d.getDay();
      const diff = (6 - day + 7) % 7;
      d.setDate(d.getDate() + diff);
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dateNum = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${dateNum}`;
    setReservationDate(dateStr);
    setCalendarYear(year);
    setCalendarMonth(d.getMonth());
    setOpenPopover(null);
  };

  const calendarDaysGrid = useMemo(() => {
    const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();

    const days: Array<{ dayNum: number; isCurrentMonth: boolean; dateStr?: string }> = [];

    // Previous month padding days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ dayNum: prevMonthDays - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const mStr = String(calendarMonth + 1).padStart(2, '0');
      const dStr = String(i).padStart(2, '0');
      days.push({
        dayNum: i,
        isCurrentMonth: true,
        dateStr: `${calendarYear}-${mStr}-${dStr}`,
      });
    }

    // Remaining slots to fill complete weeks
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({ dayNum: i, isCurrentMonth: false });
    }

    return days;
  }, [calendarYear, calendarMonth]);

  const formattedDateLabel = useMemo(() => {
    if (!reservationDate) return 'Pilih Tanggal';
    const parts = reservationDate.split('-');
    if (parts.length !== 3) return reservationDate;
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    if (isNaN(d.getTime())) return reservationDate;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const todayStr = new Date().toISOString().split('T')[0];
    if (reservationDate === todayStr) {
      return `Hari ini, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }, [reservationDate]);

  const [cityPhotos, setCityPhotos] = useState<Record<string, string>>({});

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
    const names = Array.from(cityCounts.keys());
    let cancelled = false;
    names.forEach(async (name) => {
      const photo = await fetchCityLandmarkPhoto(name);
      if (!cancelled) {
        setCityPhotos((prev) => (prev[name] === photo ? prev : { ...prev, [name]: photo }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [cityCounts]);

  const dynamicCityHubs = useMemo(() => {
    return Array.from(cityCounts.entries()).map(([cityName, countNum]) => ({
      name: cityName,
      tag: cityTag(cityName),
      count: `${countNum} Sanctuar${countNum === 1 ? 'y' : 'ies'} Available`,
      img: cityPhotos[cityName] || CITY_PHOTO_PLACEHOLDER,
    }));
  }, [cityCounts, cityPhotos]);

  const handleSearchSubmit = () => {
    setOpenPopover(null);
    const element = document.getElementById('catalog-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredSpaces = useMemo(() => {
    return spaces.filter((sp) => {
      const matchCity = selectedCity === 'Semua Kota' || sp.city?.toLowerCase() === selectedCity.toLowerCase();
      let matchCat = true;
      if (selectedCategory !== 'Semua') {
        matchCat = sp.category === selectedCategory;
      }
      const q = searchQuery.toLowerCase().trim();
      const matchName = !q || sp.name.toLowerCase().includes(q);

      return matchCity && matchCat && matchName;
    });
  }, [spaces, selectedCity, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FBF9F5] text-[#121212]">
      <Navbar />

      {/* Backdrop overlay to close popovers when clicking outside */}
      {openPopover && (
        <div
          className="fixed inset-0 z-30 bg-black/5 backdrop-blur-[1px]"
          onClick={() => setOpenPopover(null)}
        />
      )}

      {/* Hero / Editorial Title Section */}
      <section className="w-full pt-16 pb-12 px-6 sm:px-12 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-[#747878] font-bold block mb-2">
            CURATED ARCHITECTURAL HOSPITALITY
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#121212] tracking-tight leading-[1.08]">
            Spaces designed for deep work &amp;<br />seamless focus
          </h1>
          <p className="text-lg sm:text-2xl text-[#333333] font-normal max-w-3xl mx-auto leading-relaxed">
            Boutique workspaces, private studios, and meeting sanctuaries designed with architectural calm.
          </p>
        </div>

        {/* Floating Interactive Filter Bar (Focused on Nama Ruang, Kota, Kategori) */}
        <div className="mt-12 max-w-5xl mx-auto bg-white border border-[#EBE7DF] rounded-3xl md:rounded-full p-2.5 shadow-md flex flex-col md:flex-row items-center justify-between gap-2 text-left relative z-40">
          
          {/* 1. Nama Ruang Slot */}
          <div className="relative flex-[1.2] w-full border-b md:border-b-0 md:border-r border-[#EBE7DF] z-40">
            <div className="w-full px-5 py-3 rounded-3xl text-left transition-all flex items-center justify-between gap-2 hover:bg-[#FBF9F5] focus-within:bg-[#F5F3EF]">
              <div className="w-full">
                <label htmlFor="space-search-input" className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5 cursor-pointer">
                  NAMA RUANG
                </label>
                <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[18px] text-[#747878]">search</span>
                  <input
                    id="space-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                    }}
                    placeholder="Cari nama ruang..."
                    className="w-full bg-transparent border-none outline-none text-xs font-semibold text-[#121212] placeholder-[#888888] p-0"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-[#747878] hover:text-[#121212] p-0.5 flex items-center"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Kota Slot */}
          <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-[#EBE7DF] z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'city' ? null : 'city')}
              className={`w-full px-5 py-3 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'city' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  KOTA
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[18px] text-[#747878]">location_on</span>
                  <span className="truncate">{selectedCity === 'Semua Kota' ? 'Semua Kota' : selectedCity}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#747878] transition-transform duration-200 ${openPopover === 'city' ? 'rotate-180 text-[#121212]' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Kota Popover */}
            <AnimatePresence>
              {openPopover === 'city' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 z-50 bg-white border border-[#EBE7DF] rounded-3xl shadow-2xl p-3 w-64 text-[#121212] space-y-1"
                >
                  {['Semua Kota', ...Array.from(cityCounts.keys())].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSelectedCity(c);
                        setOpenPopover(null);
                      }}
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                        selectedCity === c
                          ? 'bg-[#121212] text-white'
                          : 'hover:bg-[#F5F3EF] text-[#121212]'
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCity === c && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Kategori Slot */}
          <div className="relative flex-1 w-full z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'category' ? null : 'category')}
              className={`w-full px-5 py-3 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'category' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  KATEGORI
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[18px] text-[#747878]">category</span>
                  <span className="truncate">{selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#747878] transition-transform duration-200 ${openPopover === 'category' ? 'rotate-180 text-[#121212]' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Category Popover */}
            <AnimatePresence>
              {openPopover === 'category' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 z-50 bg-white border border-[#EBE7DF] rounded-3xl shadow-2xl p-3 w-64 text-[#121212] space-y-1"
                >
                  {[
                    { label: 'Semua Kategori', value: 'Semua' },
                    { label: 'Personal Desk', value: 'Personal Desk' },
                    { label: 'Meeting Room', value: 'Meeting Room' },
                    { label: 'Private Office', value: 'Private Office' },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setOpenPopover(null);
                      }}
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                        selectedCategory === cat.value
                          ? 'bg-[#121212] text-white'
                          : 'hover:bg-[#F5F3EF] text-[#121212]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.value && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset & Submit Button */}
          <div className="flex items-center gap-3 shrink-0 px-2 w-full md:w-auto z-40">
            <button
              type="button"
              onClick={() => {
                setSelectedCity('Semua Kota');
                setSelectedCategory('Semua');
                setSearchQuery('');
                setOpenPopover(null);
              }}
              className="text-xs font-mono text-[#747878] hover:text-[#121212] px-3 py-2 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="px-6 py-3.5 rounded-full bg-[#000000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222222] transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Cari Space</span>
              <span className="material-symbols-outlined text-[16px]">search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Counter Line */}
      <section className="w-full px-6 sm:px-12 lg:px-16 py-8 border-y border-[#EBE7DF]">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-7 py-3 rounded-full text-base sm:text-lg font-bold transition-all whitespace-nowrap shadow-xs ${
                  selectedCategory === cat
                    ? 'bg-[#121212] text-white shadow-md font-bold'
                    : 'bg-[#ECEAE4] text-[#333333] hover:text-[#121212] hover:bg-[#E0DED7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Location Counter Indicator */}
          <div className="flex items-center gap-3 text-base sm:text-lg font-mono font-bold text-[#333333] shrink-0">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Showing {filteredSpaces.length} curated sanctuaries in {selectedCity === 'Semua Kota' ? 'Indonesia' : selectedCity}</span>
          </div>

        </div>
      </section>

      {/* Catalog Spaces 3-Column Grid */}
      <section className="w-full py-16 px-6 sm:px-12 lg:px-16 flex-1 scroll-mt-24" id="catalog-grid">
        <div className="w-full">
          {/* Active Search & Filters Indicator Bar */}
          {(searchQuery || selectedCategory !== 'Semua' || selectedCity !== 'Semua Kota') && (
            <div className="mb-8 p-4.5 rounded-2xl bg-white border border-[#EBE7DF] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="font-bold text-[#121212] uppercase tracking-wider">Filter Aktif:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#121212] text-white font-bold">
                    <span>Cari: "{searchQuery}"</span>
                    <button type="button" onClick={() => setSearchQuery('')} className="hover:text-amber-400">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {selectedCategory !== 'Semua' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F3EF] text-[#121212] font-bold border border-[#EBE7DF]">
                    <span>Kategori: {selectedCategory}</span>
                    <button type="button" onClick={() => setSelectedCategory('Semua')} className="hover:text-red-600">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {selectedCity !== 'Semua Kota' && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F3EF] text-[#121212] font-bold border border-[#EBE7DF]">
                    <span>Kota: {selectedCity}</span>
                    <button type="button" onClick={() => setSelectedCity('Semua Kota')} className="hover:text-red-600">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCity('Semua Kota');
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="text-xs font-mono font-bold text-[#747878] hover:text-[#121212] underline"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          {filteredSpaces.length === 0 ? (
            <div className="w-full py-24 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-[#EBE7DF]">
              <span className="material-symbols-outlined text-7xl text-[#747878] mb-4">
                search_off
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] mb-3">
                Tidak ada ruang yang sesuai kriteria
              </h3>
              <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-lg font-normal">
                Coba ubah filter kategori, kota, atau kata kunci pencarian Anda untuk menemukan ruang lain.
              </p>
              <button
                onClick={() => {
                  setSelectedCity('Semua Kota');
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="px-8 py-4 rounded-full bg-[#121212] text-white text-base font-bold hover:bg-[#2b2b2b]"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSpaces.map((space, idx) => {
                const isBooked = idx === 4; // Mock booked status for variety
                return (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group bg-white border border-[#EBE7DF] rounded-3xl overflow-hidden hover:border-[#121212] transition-all duration-300 flex flex-col hover:shadow-xl"
                  >
                    {/* Image Header Showcase */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#ECEAE4]">
                      <img
                        src={space.imageUrl}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Top Left Category Pill */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider text-[#121212] font-bold border border-white/60 shadow-sm">
                        {space.category.toUpperCase()} • {space.capacity} {space.capacity === 1 ? 'PERSON' : 'PEOPLE'}
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Status Badge */}
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase">
                          {isBooked ? (
                            <span className="text-[#C88A2B] flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#C88A2B]"></span>
                              BOOKED UNTIL 14:00
                            </span>
                          ) : (
                            <span className="text-[#4A6B5D] flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D] animate-pulse"></span>
                              AVAILABLE
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] group-hover:text-[#4A6B5D] transition-colors leading-tight">
                          {space.name}
                        </h3>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-[#333333] font-normal leading-relaxed line-clamp-3">
                          {space.description}
                        </p>

                        {/* Dot Separated Features */}
                        <p className="text-sm sm:text-base font-mono text-[#444444] font-bold pt-2 border-t border-[#F5F3EF]">
                          {space.amenities.slice(0, 4).join(' • ')}
                        </p>
                      </div>

                      {/* Footer Price & Action */}
                      <div className="pt-5 border-t border-[#EBE7DF] flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono font-bold text-2xl sm:text-3xl text-[#121212]">
                              IDR {space.hourlyRate.toLocaleString('id-ID')}
                            </span>
                            <span className="text-base sm:text-lg text-[#555555] font-semibold">/ jam</span>
                          </div>
                          <span className="text-sm sm:text-base text-[#666666] block font-mono mt-1 font-medium">
                            (Rp {(space.hourlyRate * 7).toLocaleString('id-ID')} / hari)
                          </span>
                        </div>

                        {isBooked ? (
                          <button
                            type="button"
                            onClick={() => alert('Ruang sedang terisi hingga pukul 14:00. Silakan pilih slot jam berikutnya.')}
                            className="px-7 py-3.5 rounded-full bg-[#ECEAE4] text-[#121212] text-base font-bold hover:bg-[#E0DED7] transition-colors"
                          >
                            View Schedule
                          </button>
                        ) : (
                          <Link
                            href={`/booking?spaceId=${space.id}&date=${reservationDate}&time=${startHour}:${startMinute}&tz=${timeZone}&duration=${encodeURIComponent(reservationDuration)}`}
                            className="px-7 py-3.5 rounded-full bg-[#000000] text-white text-base sm:text-lg font-bold hover:bg-[#222222] transition-colors shadow-md flex items-center gap-2"
                          >
                            <span>Pesan Ruang Ini</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {dynamicCityHubs.length > 0 && (
      <section className="w-full py-20 px-6 sm:px-12 lg:px-16 bg-[#F5F3EF] border-t border-[#EBE7DF]">
        <div className="w-full">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-[#747878] font-bold block mb-3">
                EXPLORE LOCATIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#121212] tracking-tight">
                Find your sanctuary across Indonesia's major hubs
              </h2>
              <p className="text-base sm:text-xl text-[#444444] font-normal mt-3 max-w-2xl">
                Select a city to filter curated sanctuaries and check instant desk &amp; office availability in real-time.
              </p>
            </div>

            <span className="text-sm sm:text-base font-mono font-bold text-[#555555]">
              Click a destination to filter catalogue
            </span>
          </div>

          {/* Dynamic City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dynamicCityHubs.map((city) => (
              <div
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-md border border-[#EBE7DF]"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                <div className="absolute top-5 left-5 text-xs sm:text-sm font-mono uppercase tracking-widest text-white font-bold">
                  {city.tag}
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold">{city.name}</h3>
                    <span className="text-sm sm:text-base font-mono text-white/95 block mt-1">{city.count}</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-[#121212] transition-colors">
                    <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      )}

      {/* Feature Value Proposition 3-Column Banner */}
      <section className="w-full py-20 px-6 sm:px-12 lg:px-16 bg-[#FBF9F5] border-t border-[#EBE7DF]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#121212]">graphic_eq</span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">Acoustic Precision</h4>
            <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-normal">
              Calibrated architectural absorption panels ensure seamless video calls and uninterrupted deep state focus.
            </p>
          </div>

          <div className="space-y-4">
            <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#121212]">light_mode</span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">Circadian Illumination</h4>
            <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-normal">
              Natural light orientation complemented by warm dimmable 2700K task lighting prevents screen fatigue.
            </p>
          </div>

          <div className="space-y-4">
            <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#121212]">concierge</span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">On-Demand Concierge</h4>
            <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-normal">
              Instant host assistance via encrypted messaging for specialty drip brews, printing, and presentation gear.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function SpacesCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-sm">Memuat Katalog Ruang...</div>}>
      <SpacesCatalogContent />
    </Suspense>
  );
}
