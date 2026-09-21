'use client';

import React, { useEffect, useState } from 'react';
import {
  createAdminPaymentMethod,
  deleteAdminPaymentMethod,
  fetchAdminPaymentMethods,
  updateAdminPaymentMethod,
  type PaymentMethodPayload,
} from '@/lib/api';

type PaymentMethod = PaymentMethodPayload & {
  id: number;
  created_at?: string;
};

const EMPTY_FORM: PaymentMethodPayload = {
  nama: '',
  tipe: 'bank_transfer',
  nomor_rekening: '',
  atas_nama: '',
  is_aktif: true,
};

export default function PaymentMethodManager() {
  const [items, setItems] = useState<PaymentMethod[]>([]);
  const [form, setForm] = useState<PaymentMethodPayload>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminPaymentMethods());
      setError('');
    } catch (err: any) {
      setError(err.message || 'Gagal memuat metode pembayaran');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        nomor_rekening: form.nomor_rekening?.trim() || null,
        atas_nama: form.atas_nama?.trim() || null,
      };
      if (editingId) await updateAdminPaymentMethod(editingId, payload);
      else await createAdminPaymentMethod(payload);
      resetForm();
      await loadItems();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan metode pembayaran');
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: PaymentMethod) => {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      tipe: item.tipe,
      nomor_rekening: item.nomor_rekening || '',
      atas_nama: item.atas_nama || '',
      is_aktif: item.is_aktif,
    });
  };

  const remove = async (id: number) => {
    if (!confirm('Hapus metode pembayaran ini?')) return;
    try {
      await deleteAdminPaymentMethod(id);
      await loadItems();
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus metode pembayaran');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <form onSubmit={submit} className="xl:col-span-4 bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold">Payment Method CRUD</span>
          <h2 className="font-serif text-2xl font-semibold text-[#121212] mt-1">
            {editingId ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran'}
          </h2>
        </div>

        {error && <p className="text-xs font-mono text-[#9E3B3B] bg-[#9E3B3B]/10 rounded-xl p-3">{error}</p>}

        <label className="block space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold">Nama</span>
          <input
            required
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Bank BCA / QRIS / Tunai"
            className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm outline-none focus:border-[#121212]"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold">Tipe</span>
          <select
            value={form.tipe}
            onChange={(e) => setForm({ ...form, tipe: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm outline-none focus:border-[#121212]"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="qris">QRIS</option>
            <option value="e_wallet">E-Wallet</option>
            <option value="cash">Cash</option>
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold">Nomor Rekening / ID</span>
          <input
            value={form.nomor_rekening || ''}
            onChange={(e) => setForm({ ...form, nomor_rekening: e.target.value })}
            placeholder="1234567890"
            className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm outline-none focus:border-[#121212]"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold">Atas Nama</span>
          <input
            value={form.atas_nama || ''}
            onChange={(e) => setForm({ ...form, atas_nama: e.target.value })}
            placeholder="PT Smart Space Booking"
            className="w-full px-4 py-3 rounded-2xl border border-[#EBE7DF] bg-[#fbf9f5] text-sm outline-none focus:border-[#121212]"
          />
        </label>

        <label className="flex items-center gap-3 text-sm font-mono text-[#121212]">
          <input
            type="checkbox"
            checked={form.is_aktif ?? true}
            onChange={(e) => setForm({ ...form, is_aktif: e.target.checked })}
            className="w-4 h-4 accent-[#121212]"
          />
          Tampilkan ke user saat booking
        </label>

        <div className="flex gap-2 pt-2">
          <button disabled={saving} className="flex-1 py-3 rounded-full bg-[#121212] text-white text-xs font-mono font-bold disabled:opacity-50">
            {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Metode'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-4 py-3 rounded-full border border-[#EBE7DF] text-xs font-mono font-bold">
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="xl:col-span-8 bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#121212]">Daftar Metode Pembayaran</h2>
          <span className="text-xs font-mono text-[#747878]">{items.filter((item) => item.is_aktif).length} aktif</span>
        </div>

        {loading ? (
          <p className="text-sm text-[#747878]">Memuat metode pembayaran...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#747878]">Belum ada metode pembayaran.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[10px] font-mono uppercase tracking-wider text-[#747878] border-b border-[#EBE7DF]">
                <tr>
                  <th className="py-3 pr-4">Nama</th>
                  <th className="py-3 pr-4">Tipe</th>
                  <th className="py-3 pr-4">Nomor / Atas Nama</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7DF]">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 pr-4 font-semibold text-[#121212]">{item.nama}</td>
                    <td className="py-4 pr-4 font-mono text-xs uppercase">{item.tipe.replace('_', ' ')}</td>
                    <td className="py-4 pr-4 text-[#5e5e5e]">
                      {item.nomor_rekening || '-'} {item.atas_nama ? `· ${item.atas_nama}` : ''}
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${item.is_aktif ? 'bg-[#4A6B5D]/10 text-[#4A6B5D]' : 'bg-[#9E3B3B]/10 text-[#9E3B3B]'}`}>
                        {item.is_aktif ? 'AKTIF' : 'NONAKTIF'}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => edit(item)} className="text-xs font-mono font-bold text-[#121212] hover:underline">Edit</button>
                      <button onClick={() => updateAdminPaymentMethod(item.id, { is_aktif: !item.is_aktif }).then(loadItems)} className="text-xs font-mono font-bold text-[#747878] hover:underline">
                        {item.is_aktif ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button onClick={() => remove(item.id)} className="text-xs font-mono font-bold text-[#9E3B3B] hover:underline">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
