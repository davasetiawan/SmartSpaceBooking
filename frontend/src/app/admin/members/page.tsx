'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import {
  createAdminMember,
  deleteAdminMember,
  fetchAdminMembers,
  updateAdminMember,
} from '@/lib/api';

type ReservasiLite = { id: number; total_bayar?: number; status?: string };

type BackendMember = {
  id: number;
  nama_member: string;
  instansi: string;
  alamat: string;
  telp: string;
  foto?: string | null;
  created_at: string;
  users?: { id?: number; username?: string; email?: string };
  reservasi?: ReservasiLite[];
};

type MemberForm = {
  username: string;
  email: string;
  password: string;
  nama_member: string;
  instansi: string;
  alamat: string;
  telp: string;
  foto: File | null;
};

const emptyForm: MemberForm = {
  username: '',
  email: '',
  password: '',
  nama_member: '',
  instansi: '',
  alamat: '',
  telp: '',
  foto: null,
};

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

function memberPhotoUrl(foto?: string | null) {
  if (!foto) return FALLBACK_AVATAR;
  if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
  if (foto.startsWith('/uploads/')) return foto;
  return `/uploads/members/${foto}`;
}

function rupiah(n: number) {
  return `Rp ${n.toLocaleString('id-ID')}`;
}

function bookingCount(member: BackendMember) {
  return member.reservasi?.length || 0;
}

function lifetimeSpend(member: BackendMember) {
  return (member.reservasi || [])
    .filter((r) => r.status !== 'dibatalkan')
    .reduce((sum, r) => sum + Number(r.total_bayar || 0), 0);
}

function hasActivePass(member: BackendMember) {
  return (member.reservasi || []).some((r) => r.status === 'aktif' || r.status === 'disetujui');
}

function joinDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toISOString().slice(0, 10);
}

function errMsg(err: unknown) {
  return err instanceof Error ? err.message : 'Terjadi kesalahan';
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<BackendMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<BackendMember | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMembers = async () => {
    setError('');
    const data = await fetchAdminMembers();
    setMembers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchAdminMembers()
      .then((data) => {
        if (alive) setMembers(Array.isArray(data) ? data : []);
      })
      .catch((err: unknown) => {
        if (alive) setError(errMsg(err));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const instansiList = useMemo(() => {
    return Array.from(new Set(members.map((m) => m.instansi).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, 'id'),
    );
  }, [members]);

  const now = new Date();
  const newThisMonth = members.filter((m) => {
    const d = new Date(m.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const verified = members.filter((m) => Boolean(m.foto)).length;
  const verifiedPct = members.length ? Math.round((verified / members.length) * 100) : 0;
  const activePasses = members.filter(hasActivePass).length;
  const prevMonthNew = members.filter((m) => {
    const d = new Date(m.created_at);
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear();
  }).length;
  const mom = prevMonthNew > 0 ? ((newThisMonth - prevMonthNew) / prevMonthNew) * 100 : newThisMonth > 0 ? 100 : 0;

  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase().trim();
    const matchTier = tierFilter === 'all' || member.instansi === tierFilter;
    if (!matchTier) return false;
    if (!query) return true;
    return [member.nama_member, member.users?.email, member.users?.username, member.telp, member.instansi].some(
      (value) => value?.toLowerCase().includes(query),
    );
  });

  const openCreate = () => {
    setEditingMember(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (member: BackendMember) => {
    setEditingMember(member);
    setForm({
      username: member.users?.username || '',
      email: member.users?.email || '',
      password: '',
      nama_member: member.nama_member,
      instansi: member.instansi,
      alamat: member.alamat,
      telp: member.telp,
      foto: null,
    });
    setError('');
    setModalOpen(true);
  };

  const saveMember = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    const data = new FormData();
    data.append('nama_member', form.nama_member.trim());
    data.append('instansi', form.instansi.trim());
    data.append('alamat', form.alamat.trim());
    data.append('telp', form.telp.trim());
    if (!editingMember) {
      data.append('username', form.username.trim());
      data.append('email', form.email.trim());
      data.append('password', form.password);
    } else if (form.password.trim()) {
      data.append('password', form.password);
    }
    if (form.foto) data.append('foto', form.foto);
    try {
      if (editingMember) await updateAdminMember(editingMember.id, data);
      else await createAdminMember(data);
      setModalOpen(false);
      setForm(emptyForm);
      await loadMembers();
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (member: BackendMember) => {
    if (!confirm(`Hapus ${member.nama_member}? Akun user ikut terhapus.`)) return;
    try {
      await deleteAdminMember(member.id);
      await loadMembers();
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FBF9F5] text-[#121212]">
      <Navbar />

      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] font-bold block mb-1">
                GUEST &amp; MEMBER DIRECTORY
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Direktori Anggota &amp; Tamu
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Kelola profil tamu terverifikasi, riwayat keanggotaan, dan hak akses digital keycard.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Undang Member Baru
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Metric
              label="TOTAL TERDAFTAR"
              value={`${members.length} Member`}
              hint={`${verifiedPct}% Profil Terverifikasi`}
              hintClass="text-[#4A6B5D]"
            />
            <Metric
              label="AKUN KORPORAT"
              value={`${instansiList.length} Studio`}
              hint={instansiList.slice(0, 2).join(' & ') || 'Belum ada instansi'}
            />
            <Metric
              label="MEMBER BARU BULAN INI"
              value={`+${newThisMonth} Member`}
              hint={`${mom >= 0 ? '+' : ''}${mom.toFixed(1)}% MoM Intake`}
              hintClass="text-[#4A6B5D]"
            />
            <Metric
              label="DIGITAL PASS TERBIT"
              value={`${activePasses} Pass`}
              hint="Active Keycards"
            />
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EBE7DF] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-96 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[18px]">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Nama, Email, No. Telp..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#EBE7DF] bg-[#fbf9f5] text-xs text-[#121212] focus:border-[#121212] outline-none"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#747878] font-bold">Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="flex-1 sm:flex-none rounded-full border border-[#EBE7DF] bg-[#fbf9f5] px-4 py-2 text-xs font-mono text-[#121212] outline-none focus:border-[#121212]"
              >
                <option value="all">Semua Tier Keanggotaan</option>
                {instansiList.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && !modalOpen && (
            <p className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs text-red-700">{error}</p>
          )}

          <div className="bg-white rounded-3xl border border-[#EBE7DF] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fbf9f5] text-[#747878] border-b border-[#EBE7DF] uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-3.5 px-6">Anggota / Profil</th>
                    <th className="py-3.5 px-6">Kontak Email / Telp</th>
                    <th className="py-3.5 px-6">Tier Keanggotaan</th>
                    <th className="py-3.5 px-6">Total Booking</th>
                    <th className="py-3.5 px-6">Total Belanja (LTV)</th>
                    <th className="py-3.5 px-6">Bergabung Sejak</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7DF]">
                  {loading && (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-[#747878]">
                        Memuat data member...
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    filteredMembers.map((member, idx) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        className="hover:bg-[#fbf9f5]/60 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={memberPhotoUrl(member.foto)}
                              alt={member.nama_member}
                              className="h-10 w-10 rounded-full object-cover border border-[#EBE7DF]"
                            />
                            <div>
                              <div className="font-semibold text-sm text-[#121212]">{member.nama_member}</div>
                              <span className="font-mono text-[10px] text-[#747878]">ID: {member.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono">
                          <div>{member.users?.email || '-'}</div>
                          <div className="text-[#747878]">{member.telp || '-'}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full bg-[#121212] text-white font-mono text-[10px] font-bold tracking-wide">
                            {member.instansi || '-'}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono font-bold">{bookingCount(member)} Sesi</td>
                        <td className="py-4 px-6 font-mono font-bold">{rupiah(lifetimeSpend(member))}</td>
                        <td className="py-4 px-6 font-mono">{joinDate(member.created_at)}</td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider">
                            ACTIVE
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEdit(member)}
                              className="rounded-full bg-[#ECEAE4] p-2 text-[#121212] hover:bg-[#EBE7DF]"
                              title="Edit member"
                            >
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                            </button>
                            <button
                              onClick={() => void removeMember(member)}
                              className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100"
                              title="Hapus member"
                            >
                              <span className="material-symbols-outlined text-[17px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  {!loading && !filteredMembers.length && (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-[#747878]">
                        Tidak ada member.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !saving && setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#EBE7DF] pb-4 mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#121212]">
                    {editingMember ? 'Edit Member' : 'Undang Member Baru'}
                  </h2>
                  <p className="text-xs text-[#747878] mt-1">
                    {editingMember
                      ? 'Perubahan tersimpan ke tabel member & users.'
                      : 'Membuat akun users + profil member di database.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#EBE7DF] flex items-center justify-center text-[#747878] hover:text-[#121212]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={saveMember} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {!editingMember && (
                    <>
                      <Field
                        label="Username"
                        value={form.username}
                        onChange={(username) => setForm({ ...form, username })}
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(email) => setForm({ ...form, email })}
                      />
                    </>
                  )}
                  <Field
                    label="Nama Member"
                    value={form.nama_member}
                    onChange={(nama_member) => setForm({ ...form, nama_member })}
                  />
                  <Field
                    label="Instansi / Tier"
                    value={form.instansi}
                    onChange={(instansi) => setForm({ ...form, instansi })}
                  />
                  <Field label="Telepon" value={form.telp} onChange={(telp) => setForm({ ...form, telp })} />
                  <Field
                    label={editingMember ? 'Password Baru (opsional)' : 'Password (min. 8 karakter)'}
                    type="password"
                    required={!editingMember}
                    minLength={editingMember ? undefined : 8}
                    value={form.password}
                    onChange={(password) => setForm({ ...form, password })}
                  />
                </div>
                <Field label="Alamat" value={form.alamat} onChange={(alamat) => setForm({ ...form, alamat })} />
                <div>
                  <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-[#747878]">
                    Foto
                  </label>
                  {editingMember?.foto && !form.foto && (
                    <img
                      src={memberPhotoUrl(editingMember.foto)}
                      alt=""
                      className="mb-2 h-14 w-14 rounded-full object-cover border border-[#EBE7DF]"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setForm({ ...form, foto: e.target.files?.[0] || null })}
                    className="block w-full text-xs"
                  />
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <div className="flex justify-end gap-3 border-t border-[#EBE7DF] pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-[#EBE7DF] text-xs font-semibold text-[#121212] hover:bg-[#f5f3ef]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-semibold hover:bg-[#4A6B5D] disabled:opacity-60"
                  >
                    {saving ? 'Menyimpan...' : editingMember ? 'Simpan Perubahan' : 'Undang Member'}
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

function Metric({
  label,
  value,
  hint,
  hintClass = 'text-[#747878]',
}: {
  label: string;
  value: string;
  hint: string;
  hintClass?: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#EBE7DF] shadow-sm">
      <span className="text-[10px] font-mono uppercase text-[#747878] block mb-1">{label}</span>
      <div className="font-serif text-2xl font-bold text-[#121212]">{value}</div>
      <span className={`text-[10px] font-mono ${hintClass}`}>{hint}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = true,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-[#747878]">{label}</label>
      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] px-4 py-2.5 text-sm outline-none focus:border-[#121212]"
      />
    </div>
  );
}
