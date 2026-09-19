'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Semua',
  'Personal Desk',
  'Meeting Room',
  'Private Office',
  'Executive Studio',
];

const CITY_HUBS = [
  {
    name: 'Jakarta',
    tag: 'CAPITAL & FINANCIAL HUB',
    count: '12 Sanctuaries Available',
    img: 'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bali',
    tag: 'CANGGU & SEMINYAK',
    count: '8 Sanctuaries Available',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bandung',
    tag: 'DAGO & HERITAGE HILLS',
    count: '5 Sanctuaries Available',
    img: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Surabaya',
    tag: 'WEST SURABAYA & GUBENG',
    count: '4 Sanctuaries Available',
    img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
  },
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
  const [openPopover, setOpenPopover] = useState<'date' | 'time' | 'duration' | 'category' | null>(null);
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

  const filteredSpaces = useMemo(() => {
    return spaces.filter((sp) => {
      const matchCity = selectedCity === 'Semua Kota' || sp.city === selectedCity;
      let matchCat = true;
      if (selectedCategory !== 'Semua') {
        if (selectedCategory === 'Personal Desk') matchCat = sp.category.includes('Desk') || sp.category.includes('Pod');
        else if (selectedCategory === 'Meeting Room') matchCat = sp.category.includes('Boardroom') || sp.category.includes('Meeting');
        else if (selectedCategory === 'Private Office') matchCat = sp.category.includes('Studio') || sp.category.includes('Executive');
        else matchCat = sp.category === selectedCategory;
      }
      const matchSearch =
        sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchCat && matchSearch;
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

        {/* Floating Interactive Filter Bar (Restored to Sleek Original Sonder Design) */}
        <div className="mt-12 max-w-5xl mx-auto bg-white border border-[#EBE7DF] rounded-full p-2.5 shadow-md flex flex-col md:flex-row items-center justify-between gap-2 text-left relative z-40">
          
          {/* Select Date Slot */}
          <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-[#EBE7DF] z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'date' ? null : 'date')}
              className={`w-full px-5 py-2.5 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'date' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  SELECT DATE
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[16px] text-[#747878]">calendar_today</span>
                  <span>{formattedDateLabel}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#747878] transition-transform duration-200 ${openPopover === 'date' ? 'rotate-180 text-[#121212]' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Custom Luxury Calendar Popover */}
            <AnimatePresence>
              {openPopover === 'date' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 z-50 bg-white border border-[#EBE7DF] rounded-3xl shadow-2xl p-5 w-80 text-[#121212]"
                >
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EBE7DF]">
                    <span className="text-xs font-bold text-[#121212] font-mono uppercase tracking-wider">
                      {MONTH_NAMES[calendarMonth]} {calendarYear}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-7 h-7 rounded-full hover:bg-[#F5F3EF] flex items-center justify-center transition-colors text-[#555555]"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-7 h-7 rounded-full hover:bg-[#F5F3EF] flex items-center justify-center transition-colors text-[#555555]"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('today')}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5F3EF] text-[#121212] hover:bg-[#121212] hover:text-white transition-all"
                    >
                      Hari Ini
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('tomorrow')}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5F3EF] text-[#121212] hover:bg-[#121212] hover:text-white transition-all"
                    >
                      Besok
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('weekend')}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5F3EF] text-[#121212] hover:bg-[#121212] hover:text-white transition-all"
                    >
                      Sabtu Ini
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 text-center text-[10px] font-mono font-bold text-[#747878] mb-2">
                    <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {calendarDaysGrid.map((dayObj, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={!dayObj.isCurrentMonth}
                        onClick={() => {
                          if (dayObj.dateStr) {
                            setReservationDate(dayObj.dateStr);
                            setOpenPopover(null);
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mx-auto transition-all ${
                          !dayObj.isCurrentMonth
                            ? 'text-gray-300 cursor-not-allowed'
                            : dayObj.dateStr === reservationDate
                            ? 'bg-[#121212] text-white font-bold shadow-sm'
                            : 'hover:bg-[#F5F3EF] text-[#121212]'
                        }`}
                      >
                        {dayObj.dayNum}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Start Time Slot */}
          <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-[#EBE7DF] z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'time' ? null : 'time')}
              className={`w-full px-5 py-2.5 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'time' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  START TIME
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[16px] text-[#747878]">schedule</span>
                  <span>{startHour}:{startMinute} {timeZone}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#747878] transition-transform duration-200 ${openPopover === 'time' ? 'rotate-180 text-[#121212]' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Custom Luxury Time Picker Popover */}
            <AnimatePresence>
              {openPopover === 'time' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 z-50 bg-white border border-[#EBE7DF] rounded-3xl shadow-2xl p-5 w-80 text-[#121212] space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EBE7DF]">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#121212]">
                      PILIH WAKTU MULAI
                    </span>
                    <span className="text-xs font-mono font-bold text-[#121212] bg-[#F5F3EF] px-2.5 py-1 rounded-full">
                      {startHour} : {startMinute} {timeZone}
                    </span>
                  </div>

                  {/* Hour Selector */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#747878] block mb-1.5 uppercase tracking-wider">
                      JAM (07:00 - 22:00)
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setStartHour(h)}
                          className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            startHour === h
                              ? 'bg-[#121212] text-white font-bold shadow-xs'
                              : 'bg-[#F5F3EF] text-[#555555] hover:bg-[#EAE8E4] hover:text-[#121212]'
                          }`}
                        >
                          {h}:00
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minute Selector */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#747878] block mb-1.5 uppercase tracking-wider">
                      MENIT
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['00', '15', '30', '45'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setStartMinute(m)}
                          className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            startMinute === m
                              ? 'bg-[#121212] text-white font-bold shadow-xs'
                              : 'bg-[#F5F3EF] text-[#555555] hover:bg-[#EAE8E4] hover:text-[#121212]'
                          }`}
                        >
                          :{m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timezone Selector */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#747878] block mb-1.5 uppercase tracking-wider">
                      ZONA WAKTU
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['WIB', 'WITA', 'WIT'].map((tz) => (
                        <button
                          key={tz}
                          type="button"
                          onClick={() => setTimeZone(tz)}
                          className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            timeZone === tz
                              ? 'bg-[#121212] text-white font-bold shadow-xs'
                              : 'bg-[#F5F3EF] text-[#555555] hover:bg-[#EAE8E4] hover:text-[#121212]'
                          }`}
                        >
                          {tz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenPopover(null)}
                    className="w-full py-2.5 rounded-2xl bg-[#121212] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222222] transition-colors mt-2"
                  >
                    Selesai
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Duration Slot */}
          <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-[#EBE7DF] z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'duration' ? null : 'duration')}
              className={`w-full px-5 py-2.5 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'duration' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  DURATION
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[16px] text-[#747878]">hourglass_empty</span>
                  <span>{reservationDuration}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-[#747878] transition-transform duration-200 ${openPopover === 'duration' ? 'rotate-180 text-[#121212]' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Duration Popover */}
            <AnimatePresence>
              {openPopover === 'duration' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 z-50 bg-white border border-[#EBE7DF] rounded-3xl shadow-2xl p-3 w-64 text-[#121212] space-y-1"
                >
                  {['2 Hours', '4 Hours', '8 Hours (Full Day)'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => {
                        setReservationDuration(dur);
                        setOpenPopover(null);
                      }}
                      className={`w-full px-4 py-2.5 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                        reservationDuration === dur
                          ? 'bg-[#121212] text-white'
                          : 'hover:bg-[#F5F3EF] text-[#121212]'
                      }`}
                    >
                      <span>{dur}</span>
                      {reservationDuration === dur && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Slot */}
          <div className="relative flex-1 w-full z-40">
            <button
              type="button"
              onClick={() => setOpenPopover(openPopover === 'category' ? null : 'category')}
              className={`w-full px-5 py-2.5 rounded-3xl text-left transition-all flex items-center justify-between gap-2 ${
                openPopover === 'category' ? 'bg-[#F5F3EF] shadow-inner' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#747878] block tracking-wider mb-0.5">
                  CATEGORY
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#121212]">
                  <span className="material-symbols-outlined text-[16px] text-[#747878]">category</span>
                  <span>{selectedCategory === 'Semua' ? 'All Sanctuaries' : selectedCategory}</span>
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
                    { label: 'All Sanctuaries', value: 'Semua' },
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
                setReservationDate('2026-09-19');
                setStartHour('09');
                setStartMinute('00');
                setTimeZone('WIB');
                setReservationDuration('2 Hours');
                setOpenPopover(null);
              }}
              className="text-xs font-mono text-[#747878] hover:text-[#121212] px-3 py-2 transition-colors"
            >
              Reset
            </button>
            <Link
              href={`/booking?date=${reservationDate}&time=${startHour}:${startMinute}&tz=${timeZone}&duration=${encodeURIComponent(reservationDuration)}`}
              className="px-6 py-3.5 rounded-full bg-[#000000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222222] transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Check Availability</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
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
      <section className="w-full py-16 px-6 sm:px-12 lg:px-16 flex-1">
        <div className="w-full">
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
                            href={`/booking?spaceId=${space.id}`}
                            className="px-7 py-3.5 rounded-full bg-[#000000] text-white text-base sm:text-lg font-bold hover:bg-[#222222] transition-colors shadow-md"
                          >
                            Reserve Space
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

      {/* "Find your sanctuary across Indonesia's major hubs" Section */}
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

          {/* 4 City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CITY_HUBS.map((city) => (
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
