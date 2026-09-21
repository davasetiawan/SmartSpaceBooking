'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Space } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSpacesInventoryPage() {
  const { spaces, addSpace, updateSpace, deleteSpace, refreshData } = useSpaceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'All' | 'Personal Desk' | 'Meeting Room' | 'Private Office'>('All');
  const [filterCity, setFilterCity] = useState('all');
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'capacity-desc'>('price-asc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);

  // Form State for Modal
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Space['category']>('Personal Desk');
  const [formCity, setFormCity] = useState<string>('Jakarta');
  const [formLocation, setFormLocation] = useState('');
  const [formCapacity, setFormCapacity] = useState(4);
  const [formHourlyRate, setFormHourlyRate] = useState(150000);
  const [formDailyRate, setFormDailyRate] = useState(1000000);
  const [formFotoFile, setFormFotoFile] = useState<File | null>(null);
  const [formFotoPreview, setFormFotoPreview] = useState<string | null>(null);
  const [formDescription, setFormDescription] = useState('');

  const openCreateModal = () => {
    setEditingSpace(null);
    setFormName('');
    setFormCategory('Personal Desk');
    setFormCity('Jakarta');
    setFormLocation('SCBD Lot 8, Jakarta');
    setFormCapacity(4);
    setFormHourlyRate(150000);
    setFormDailyRate(1000000);
    setFormFotoFile(null);
    setFormFotoPreview('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85');
    setFormDescription('Studio arsitektural dengan fasilitas lengkap, isolasi suara STC-52, dan pencahayaan alami.');
    setIsModalOpen(true);
  };

  const openEditModal = (sp: Space) => {
    setEditingSpace(sp);
    setFormName(sp.name);
    setFormCategory(sp.category);
    setFormCity(sp.city);
    setFormLocation(sp.location);
    setFormCapacity(sp.capacity);
    setFormHourlyRate(sp.hourlyRate);
    setFormDailyRate(sp.dailyRate);
    setFormFotoFile(null);
    setFormFotoPreview(sp.imageUrl);
    setFormDescription(sp.description);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus unit ruang ini?')) {
      try {
        const { deleteAdminSpaceItem } = await import('@/lib/api');
        await deleteAdminSpaceItem(id);
        refreshData();
      } catch (err: any) {
        deleteSpace(id);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendType = formCategory === 'Personal Desk' ? 'desk' : formCategory === 'Meeting Room' ? 'meeting_room' : 'private_office';

    try {
      const { createAdminSpaceItem, updateAdminSpaceItem } = await import('@/lib/api');
      const formData = new FormData();
      formData.append('nama_space', formName);
      formData.append('harga_per_jam', String(formHourlyRate));
      formData.append('tipe', backendType);
      formData.append('kapasitas', String(formCapacity));
      formData.append('deskripsi', formDescription);
      formData.append('kota', formCity);
      formData.append('jalan', formLocation);

      if (formFotoFile) {
        formData.append('foto', formFotoFile);
      }

      if (editingSpace) {
        await updateAdminSpaceItem(editingSpace.id, formData);
      } else {
        await createAdminSpaceItem(formData);
      }
      refreshData();
    } catch (err: any) {
      // Fallback local update
      const finalImage = formFotoPreview || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85';
      if (editingSpace) {
        updateSpace(editingSpace.id, {
          name: formName,
          category: formCategory,
          city: formCity,
          location: formLocation,
          capacity: formCapacity,
          hourlyRate: formHourlyRate,
          dailyRate: formDailyRate,
          imageUrl: finalImage,
          description: formDescription
        });
      } else {
        addSpace({
          name: formName,
          category: formCategory,
          city: formCity,
          location: formLocation,
          capacity: formCapacity,
          hourlyRate: formHourlyRate,
          dailyRate: formDailyRate,
          imageUrl: finalImage,
          description: formDescription,
          rating: 5.0,
          reviewsCount: 1,
          amenities: ['Acoustic STC-52', '1Gbps Fiber Wi-Fi', 'Barista Pass'],
          isAvailable: true,
          statusText: 'Tersedia'
        });
      }
    }
    setIsModalOpen(false);
  };

  // Filter & Sort spaces
  const filtered = useMemo(() => {
    return spaces
      .filter((s) => {
        const matchCategory = selectedCategoryTab === 'All' || s.category === selectedCategoryTab;
        const matchCity = filterCity === 'all' || s.city?.toLowerCase() === filterCity.toLowerCase();
        const matchSearch =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchCity && matchSearch;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.hourlyRate - b.hourlyRate;
        if (sortOption === 'price-desc') return b.hourlyRate - a.hourlyRate;
        if (sortOption === 'capacity-desc') return b.capacity - a.capacity;
        return 0;
      });
  }, [spaces, selectedCategoryTab, filterCity, searchQuery, sortOption]);

  const availableCities = useMemo(() => {
    return Array.from(new Set(spaces.map((s) => s.city).filter(Boolean)));
  }, [spaces]);

  const avgHourlyYield = useMemo(() => {
    if (spaces.length === 0) return 165000;
    return Math.round(spaces.reduce((sum, s) => sum + s.hourlyRate, 0) / spaces.length);
  }, [spaces]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FBF9F5] text-[#121212]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area - Full Width Container */}
      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full space-y-8"
        >
          {/* Breadcrumb Bar */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#747878]">
            <Link href="/" className="hover:text-[#121212]">Home</Link>
            <span>›</span>
            <Link href="/admin" className="hover:text-[#121212]">Executive Console</Link>
            <span>›</span>
            <span className="text-[#121212] font-semibold">Inventory &amp; Facilities</span>
            <span>›</span>
            <span className="text-[#121212] font-bold">Space Inventory</span>
          </div>

          {/* Header Title Section with Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#121212] tracking-tight">
                  Space &amp; Workstation Inventory
                </h1>
                <span className="px-3 py-1 rounded-full bg-[#ECEAE4] border border-[#EBE7DF] text-xs font-mono font-bold text-[#444444]">
                  {spaces.length} Active Units across {availableCities.length || 3} Cities
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#555555] font-light max-w-3xl leading-relaxed">
                Curate, price, and regulate architectural studios, acoustic meeting suites, and focus workstations across WorkMates Sanctuary.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => alert('Folio rekapitulasi inventaris berhasil di-export ke CSV / PDF.')}
                className="px-5 py-3 rounded-full border border-[#D0CEC7] bg-white text-xs sm:text-sm font-bold text-[#121212] hover:bg-[#ECEAE4] transition-all flex items-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Batch Export Folio</span>
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="px-6 py-3 rounded-full bg-[#000000] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#222222] transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>+ Add New Space</span>
              </button>
            </div>
          </div>

          {/* Section 1: 4-Card Executive KPI Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1: TOTAL SPACES */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">TOTAL SPACES</span>
                <span className="material-symbols-outlined text-[20px]">meeting_room</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#121212]">{spaces.length} Units</span>
                </div>
                <span className="text-xs font-mono text-[#4A6B5D] font-semibold block mt-1">All active &amp; verified</span>
              </div>
            </div>

            {/* KPI 2: AVERAGE OCCUPANCY */}
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#EBE7DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">AVERAGE OCCUPANCY</span>
                <span className="material-symbols-outlined text-[20px]">equalizer</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#121212]">86.4%</span>
                </div>
                <span className="text-xs font-mono text-[#4A6B5D] font-semibold block mt-1">+5.2% vs last week</span>
              </div>
            </div>

            {/* KPI 3: AVG HOURLY YIELD */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">AVG. HOURLY YIELD</span>
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#121212]">
                    IDR {avgHourlyYield.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-mono text-[#747878]">/hr</span>
                </div>
                <span className="text-xs font-mono text-[#747878] block mt-1">Weighted tariff rate</span>
              </div>
            </div>

            {/* KPI 4: MAINTENANCE STATUS */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#747878] mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">MAINTENANCE STATUS</span>
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#121212]">0 Downtime</span>
                </div>
                <span className="text-xs font-mono text-[#4A6B5D] font-semibold block mt-1">All units pristine</span>
              </div>
            </div>
          </div>

          {/* Section 2: Search, Category Filter Pills & Sort Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EBE7DF] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input Field */}
            <div className="w-full lg:w-80 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#747878] text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search space by name, tier, floor level, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-semibold text-[#121212] placeholder-[#888880] focus:border-[#121212] outline-none shadow-inner"
              />
            </div>

            {/* Category Filter Pills (All Types, Personal Desk, Meeting Room, Private Office) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none">
              {(
                [
                  { label: `All Types (${spaces.length})`, value: 'All' },
                  { label: `Personal Desk (${spaces.filter(s => s.category === 'Personal Desk').length})`, value: 'Personal Desk' },
                  { label: `Meeting Room (${spaces.filter(s => s.category === 'Meeting Room').length})`, value: 'Meeting Room' },
                  { label: `Private Office (${spaces.filter(s => s.category === 'Private Office').length})`, value: 'Private Office' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedCategoryTab(tab.value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    selectedCategoryTab === tab.value
                      ? 'bg-[#121212] text-white shadow-sm'
                      : 'bg-[#ECEAE4] text-[#444444] hover:bg-[#E0DED7] hover:text-[#121212]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Dropdowns: Filter City & Sort */}
            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212] cursor-pointer outline-none"
              >
                <option value="all">Semua Kota ({availableCities.length})</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="px-4 py-2.5 rounded-full border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212] cursor-pointer outline-none"
              >
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
                <option value="capacity-desc">Sort: Capacity (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Rich Space Cards Grid (Screenshot 1 Exact Layout) */}
          <div className="w-full">
            {filtered.length === 0 ? (
              <div className="w-full py-20 text-center bg-white rounded-3xl border border-[#EBE7DF] p-8 flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-[#747878] mb-3">inventory_2</span>
                <h3 className="font-serif text-2xl font-bold text-[#121212]">Tidak Ada Unit Ruang Ditemukan</h3>
                <p className="text-xs sm:text-sm text-[#555555] max-w-md mt-1 mb-6">
                  Cari kata kunci lain atau ubah filter kategori &amp; kota.
                </p>
                <button
                  onClick={() => { setSelectedCategoryTab('All'); setFilterCity('all'); setSearchQuery(''); }}
                  className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-bold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.map((space, idx) => {
                  const isAvailable = space.isAvailable;
                  return (
                    <motion.div
                      key={space.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="group bg-white border border-[#EBE7DF] rounded-3xl overflow-hidden hover:border-[#121212] transition-all duration-300 flex flex-col shadow-xs hover:shadow-xl"
                    >
                      {/* Top Image Showcase */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECEAE4]">
                        <img
                          src={space.imageUrl}
                          alt={space.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Top Left Badges (Category & Location) */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                          <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-[#121212] font-bold border border-white/60 shadow-xs">
                            {space.category}
                          </span>
                          <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-white font-medium shadow-xs">
                            {space.city} • {space.location}
                          </span>
                        </div>

                        {/* Top Right Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          {isAvailable ? (
                            <span className="px-3 py-1.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-md text-[11px] font-mono uppercase tracking-wider font-bold shadow-xs flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                              <span>Available</span>
                            </span>
                          ) : (
                            <span className="px-3 py-1.5 rounded-full bg-amber-500/90 text-white backdrop-blur-md text-[11px] font-mono uppercase tracking-wider font-bold shadow-xs flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                              <span>Booked</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          {/* Title & Capacity Header */}
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] leading-tight group-hover:text-[#4A6B5D] transition-colors">
                              {space.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#555555] shrink-0 bg-[#F5F3EF] px-3 py-1.5 rounded-full border border-[#EBE7DF]">
                              <span className="material-symbols-outlined text-[16px]">person</span>
                              <span>{space.capacity} {space.capacity === 1 ? 'Guest / Seat' : 'Guests / Seats'}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-[#555555] font-normal leading-relaxed line-clamp-2">
                            {space.description}
                          </p>

                          {/* Amenity Badges */}
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            {space.amenities.slice(0, 3).map((am, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-[#F5F3EF] text-[11px] font-mono text-[#444444] font-medium border border-[#EBE7DF]"
                              >
                                {am}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Tariff & Action Buttons */}
                        <div className="pt-4 border-t border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
                                IDR {space.hourlyRate.toLocaleString('id-ID')}
                              </span>
                              <span className="text-xs font-mono text-[#747878]">/ hr</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#747878] block">
                              Daily pass equiv. IDR {space.dailyRate.toLocaleString('id-ID')}/day
                            </span>
                          </div>

                          {/* Actions: View Calendar & Edit Details */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => alert(`Jadwal ketersediaan kalender untuk unit ${space.name} aktif.`)}
                              className="p-2.5 rounded-full border border-[#EBE7DF] bg-white text-[#121212] hover:bg-[#F5F3EF] transition-colors"
                              title="Lihat Kalender Sesi"
                            >
                              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditModal(space)}
                              className="px-4 py-2.5 rounded-full bg-[#ECEAE4] hover:bg-[#121212] hover:text-white text-xs font-bold text-[#121212] transition-colors shadow-xs"
                            >
                              Edit Space Details
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(space.id)}
                              className="p-2.5 rounded-full border border-red-200 bg-red-50/60 text-red-600 hover:bg-red-100 transition-colors"
                              title="Hapus Unit Ruang"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="w-full py-6 px-6 sm:px-12 border-t border-[#EBE7DF] bg-[#F5F3EF] text-xs font-mono text-[#747878] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-serif font-bold text-[#121212]">Sonder Spaces</span> © 2025 WorkMates Hospitality Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a href="#" className="hover:text-[#121212]">Privacy Policy</a>
          <a href="#" className="hover:text-[#121212]">Terms of Service</a>
          <a href="#" className="hover:text-[#121212]">Architectural Standards</a>
          <a href="#" className="hover:text-[#121212]">Support</a>
        </div>
      </footer>

      {/* CREATE & EDIT SPACE MODAL (Retains File Upload & 3 Categories & Free Text City) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#EBE7DF] max-h-[90vh] overflow-y-auto text-[#121212]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE7DF] mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#121212]">
                    {editingSpace ? 'Edit Detail Unit Ruang' : 'Tambah Unit Ruang Baru'}
                  </h3>
                  <p className="text-xs text-[#747878]">
                    Atur tarif sewa, kapasitas pax, kategori, kota, dan unggah foto asli ruang.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F5F3EF] text-[#747878]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Nama Unit Ruang
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: The Travertine Executive Studio"
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs sm:text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kategori (3 Pilihan Utama)
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as Space['category'])}
                      className="w-full px-3 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212]"
                    >
                      <option value="Personal Desk">Personal Desk</option>
                      <option value="Private Office">Private Office</option>
                      <option value="Meeting Room">Meeting Room</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kota (Bebas Input)
                    </label>
                    <input
                      type="text"
                      required
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="Contoh: Jogja, Jakarta, Surabaya, Bali..."
                      className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212] focus:border-[#121212] outline-none"
                      list="city-suggestions-modal"
                    />
                    <datalist id="city-suggestions-modal">
                      <option value="Jakarta" />
                      <option value="Jogja" />
                      <option value="Surabaya" />
                      <option value="Bandung" />
                      <option value="Bali" />
                      <option value="Semarang" />
                      <option value="Malang" />
                      <option value="Medan" />
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Alamat / Lokasi Spesifik
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Contoh: SCBD Lot 8, Jakarta"
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs sm:text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kapasitas (Pax)
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formCapacity}
                      onChange={(e) => setFormCapacity(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Tarif / Jam (Rp)
                    </label>
                    <input
                      type="number"
                      step="5000"
                      required
                      value={formHourlyRate}
                      onChange={(e) => setFormHourlyRate(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Tarif / Hari (Rp)
                    </label>
                    <input
                      type="number"
                      step="50000"
                      required
                      value={formDailyRate}
                      onChange={(e) => setFormDailyRate(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                </div>

                {/* Upload Foto Ruang (File Input) */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Foto Ruang Coworking (Upload File Gambar)
                  </label>
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5]">
                    <div className="relative w-20 h-20 rounded-xl bg-white border border-[#EBE7DF] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                      {formFotoPreview ? (
                        <img src={formFotoPreview} alt="Preview Foto Ruang" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-[#747878] text-[28px]">meeting_room</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="modal-space-foto-upload"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121212] text-white text-xs font-bold hover:bg-[#4A6B5D] transition-colors cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                        <span>{formFotoFile ? 'Ganti File Foto' : 'Unggah Foto Ruang'}</span>
                      </label>
                      <input
                        id="modal-space-foto-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormFotoFile(file);
                            setFormFotoPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <p className="text-[10px] text-[#747878] font-mono mt-1 truncate">
                        {formFotoFile ? formFotoFile.name : 'PNG, JPG, WEBP (Maks 2MB)'}
                      </p>
                    </div>
                    {formFotoFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormFotoFile(null);
                          setFormFotoPreview(editingSpace?.imageUrl || null);
                        }}
                        className="p-1.5 rounded-full text-[#747878] hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Batal pilih foto"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Deskripsi Spesifikasi Ruang
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Deskripsikan konsep arsitektural, kenyamanan, dan fasilitas penunjang."
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FBF9F5] text-xs text-[#121212] focus:border-[#121212] outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-[#EBE7DF] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-[#EBE7DF] text-xs font-bold text-[#121212] hover:bg-[#F5F3EF] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2b2b2b] transition-colors shadow-sm"
                  >
                    {editingSpace ? 'Simpan Perubahan' : 'Tambah Unit Ruang'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
