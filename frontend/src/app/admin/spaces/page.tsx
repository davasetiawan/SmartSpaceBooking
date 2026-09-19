'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Space } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSpacesInventoryPage() {
  const { spaces, addSpace, updateSpace, deleteSpace, refreshData } = useSpaceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Space['category']>('Executive Studio');
  const [formCity, setFormCity] = useState<Space['city']>('Jakarta');
  const [formLocation, setFormLocation] = useState('');
  const [formCapacity, setFormCapacity] = useState(4);
  const [formHourlyRate, setFormHourlyRate] = useState(150000);
  const [formDailyRate, setFormDailyRate] = useState(1000000);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const openCreateModal = () => {
    setEditingSpace(null);
    setFormName('');
    setFormCategory('Executive Studio');
    setFormCity('Jakarta');
    setFormLocation('SCBD Lot 8, Jakarta');
    setFormCapacity(4);
    setFormHourlyRate(150000);
    setFormDailyRate(1000000);
    setFormImageUrl('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85');
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
    setFormImageUrl(sp.imageUrl);
    setFormDescription(sp.description);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { createAdminSpaceItem, updateAdminSpaceItem } = await import('@/lib/api');

      if (editingSpace) {
        await updateAdminSpaceItem(editingSpace.id, {
          nama_space: formName,
          tipe: formCategory === 'Personal Desk' ? 'desk' : formCategory === 'Boardroom' ? 'meeting_room' : 'private_office',
          harga_per_jam: formHourlyRate,
          kapasitas: formCapacity,
          deskripsi: formDescription
        });
      } else {
        const formData = new FormData();
        formData.append('nama_space', formName);
        formData.append('harga_per_jam', String(formHourlyRate));
        formData.append('tipe', formCategory === 'Personal Desk' ? 'desk' : formCategory === 'Boardroom' ? 'meeting_room' : 'private_office');
        formData.append('kapasitas', String(formCapacity));
        formData.append('deskripsi', formDescription);
        await createAdminSpaceItem(formData);
      }
      refreshData();
    } catch (err: any) {
      // Fallback local update
      if (editingSpace) {
        updateSpace(editingSpace.id, {
          name: formName,
          category: formCategory,
          city: formCity,
          location: formLocation,
          capacity: formCapacity,
          hourlyRate: formHourlyRate,
          dailyRate: formDailyRate,
          imageUrl: formImageUrl,
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
          imageUrl: formImageUrl,
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

  const filtered = spaces.filter((s) => {
    const matchCity = filterCity === 'all' || s.city === filterCity;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-7xl mx-auto space-y-8"
        >
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                MANAJEMEN INVENTARISASI RUANG
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Katalog &amp; Inventaris Ruang
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Kelola unit studio, tarif per jam, kapasitas kursi, dan status ketersediaan properti.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-all hover:scale-105 flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Tambah Ruang Baru</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari nama ruang, kategori, lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#747878]">Filter Kota:</span>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] cursor-pointer"
              >
                <option value="all">Semua Kota ({spaces.length})</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Bali">Bali</option>
                <option value="Surabaya">Surabaya</option>
              </select>
            </div>
          </div>

          {/* Spaces Table */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Foto &amp; Nama Ruang</th>
                    <th className="py-3.5 px-6">Kategori</th>
                    <th className="py-3.5 px-6">Kota / Lokasi</th>
                    <th className="py-3.5 px-6">Kapasitas</th>
                    <th className="py-3.5 px-6">Tarif Sewa (IDR)</th>
                    <th className="py-3.5 px-6">Status Ketersediaan</th>
                    <th className="py-3.5 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {filtered.map((space, idx) => (
                    <motion.tr
                      key={space.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="hover:bg-[#fbf9f5]/60 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#efeeea] shrink-0 border border-[#EBE7DF]">
                            <img src={space.imageUrl} alt={space.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-sans font-bold text-sm text-[#121212] block">
                              {space.name}
                            </span>
                            <span className="text-[11px] text-[#747878]">Rating ★ {space.rating} ({space.reviewsCount} review)</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-[#efeeea] text-[#121212] text-[10px] font-bold">
                          {space.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-[#5e5e5e]">
                        <div>{space.city}</div>
                        <div className="text-[11px] text-[#747878]">{space.location}</div>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#121212]">
                        {space.capacity} Orang
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-[#121212]">Rp {space.hourlyRate.toLocaleString('id-ID')} <span className="text-[10px] text-[#747878] font-normal">/jam</span></div>
                        <div className="text-[10px] text-[#747878]">Rp {space.dailyRate.toLocaleString('id-ID')} /hari</div>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => updateSpace(space.id, { isAvailable: !space.isAvailable })}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 ${
                            space.isAvailable
                              ? 'bg-[#4A6B5D]/10 text-[#4A6B5D] hover:bg-[#4A6B5D]/20'
                              : 'bg-[#C88A2B]/10 text-[#C88A2B] hover:bg-[#C88A2B]/20'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${space.isAvailable ? 'bg-[#4A6B5D]' : 'bg-[#C88A2B]'}`}></span>
                          <span>{space.isAvailable ? 'Tersedia' : 'Terisi'}</span>
                        </button>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(space)}
                            className="p-1.5 rounded-full hover:bg-[#efeeea] text-[#121212] transition-colors"
                            title="Edit Ruang"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus ruang "${space.name}"?`)) {
                                deleteSpace(space.id);
                              }
                            }}
                            className="p-1.5 rounded-full hover:bg-[#9E3B3B]/10 text-[#9E3B3B] transition-colors"
                            title="Hapus Ruang"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </main>

      {/* Add / Edit Space Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl space-y-6 my-8"
            >
              <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#121212]">
                  {editingSpace ? 'Edit Ruang Kerja' : 'Tambah Ruang Kerja Baru'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#EBE7DF] flex items-center justify-center text-[#747878] hover:text-[#121212] transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Nama Ruang
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: The Travertine Executive Studio"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs sm:text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kategori
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as Space['category'])}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212]"
                    >
                      <option value="Focus Pod">Focus Pod</option>
                      <option value="Personal Desk">Personal Desk</option>
                      <option value="Executive Studio">Executive Studio</option>
                      <option value="Boardroom">Boardroom</option>
                      <option value="Solarium Garden">Solarium Garden</option>
                      <option value="Library Lounge">Library Lounge</option>
                      <option value="Amphitheater">Amphitheater</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                      Kota
                    </label>
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value as Space['city'])}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212]"
                    >
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Bali">Bali</option>
                      <option value="Surabaya">Surabaya</option>
                    </select>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs sm:text-sm font-semibold text-[#121212] focus:border-[#121212] outline-none"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono font-bold text-[#121212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    URL Foto Ruang
                  </label>
                  <input
                    type="url"
                    required
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs font-mono text-[#121212] focus:border-[#121212] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold block mb-1">
                    Deskripsi Ruang
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] text-xs text-[#121212] focus:border-[#121212] outline-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-[#EBE7DF] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-[#EBE7DF] text-xs font-semibold text-[#121212] hover:bg-[#f5f3ef] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors"
                  >
                    {editingSpace ? 'Simpan Perubahan' : 'Terbitkan Ruang'}
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

