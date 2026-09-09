// API Client for Smart Space Booking connecting to NestJS Backend (/api)

const API_BASE_URL = '/api';

export interface User {
  id: string;
  nama: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  telepon?: string;
  avatarUrl?: string;
}

export interface Ruangan {
  id: string;
  nama: string;
  slug: string;
  tipe: 'COWORKING_DESK' | 'MEETING_ROOM' | 'PRIVATE_OFFICE' | 'EVENT_SPACE';
  kapasitas: number;
  hargaPerJam: number;
  hargaPerHari: number;
  deskripsi: string;
  fasilitas: string[];
  gambarUrl: string[];
  lokasi: string;
  isAktif: boolean;
  rating?: number;
}

export type ReservasiStatus = 'BELUM_DIKONFIRMASI' | 'DISETUJUI' | 'AKTIF' | 'SELESAI' | 'DITOLAK' | 'DIBATALKAN';

export interface Reservasi {
  id: string;
  kodeBooking: string;
  ruanganId: string;
  ruangan?: Ruangan;
  userId: string;
  user?: User;
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  durasiJam: number;
  totalHarga: number;
  status: ReservasiStatus;
  catatan?: string;
  alasanPenolakan?: string;
  qrCodeUrl?: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  createdAt: string;
}

export interface AdminMetrics {
  totalReservasi: number;
  reservasiPending: number;
  ruanganAktif: number;
  totalMember: number;
  totalPendapatan: number;
  tingkatOkupansi: number;
}

// Token Storage Helpers
export const getAuthToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('ssb_token') : null;

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('ssb_token', token);
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('ssb_token');
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('ssb_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('ssb_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('ssb_user');
  }
};

function mapBackendSpaceToRuangan(item: any): Ruangan {
  const tipeMap: Record<string, 'COWORKING_DESK' | 'MEETING_ROOM' | 'PRIVATE_OFFICE' | 'EVENT_SPACE'> = {
    desk: 'COWORKING_DESK',
    meeting_room: 'MEETING_ROOM',
    private_office: 'PRIVATE_OFFICE',
    event_space: 'EVENT_SPACE',
  };

  const fotoPath = item.foto
    ? (item.foto.startsWith('http') ? item.foto : `http://localhost:3000/uploads/spaces/${item.foto}`)
    : 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';

  return {
    id: String(item.id),
    nama: item.nama_space || item.nama || `Space ${item.id}`,
    slug: `space-${item.id}`,
    tipe: tipeMap[item.tipe] || 'COWORKING_DESK',
    kapasitas: Number(item.kapasitas) || 1,
    hargaPerJam: Number(item.harga_per_jam) || 25000,
    hargaPerHari: (Number(item.harga_per_jam) || 25000) * 8,
    deskripsi: item.deskripsi || 'Ruangan coworking eksklusif dengan fasilitas modern dan suasana kondusif.',
    fasilitas: item.fasilitas
      ? (typeof item.fasilitas === 'string' ? item.fasilitas.split(',') : item.fasilitas)
      : ['High-speed Wi-Fi', 'Power Outlet Dedicated', 'Coffee & Tea', 'Air Conditioner'],
    gambarUrl: [fotoPath],
    lokasi: item.owner?.nama_coworking || 'Sonder Main Hub',
    isAktif: true,
    rating: 4.9,
  };
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Terjadi kesalahan pada server');
  }

  return json;
}

export const api = {
  getRuangan: async (params?: string): Promise<Ruangan[]> => {
    try {
      const raw = await fetchAPI<any>(`/spaces${params ? '?' + params : ''}`);
      const list = raw?.data || (Array.isArray(raw) ? raw : []);
      return list.map(mapBackendSpaceToRuangan);
    } catch (e) {
      console.warn('Backend spaces error:', e);
      return [];
    }
  },

  getRuanganById: async (id: string): Promise<Ruangan> => {
    const raw = await fetchAPI<any>(`/spaces/${id}`);
    const data = raw?.data || raw;
    return mapBackendSpaceToRuangan(data);
  },

  getReservasi: async (): Promise<Reservasi[]> => {
    const raw = await fetchAPI<any>('/reservasi/my');
    const list = raw?.data || [];
    return list.map((item: any) => ({
      id: String(item.id),
      kodeBooking: item.kode_booking,
      ruanganId: String(item.id_space),
      ruangan: item.space ? mapBackendSpaceToRuangan(item.space) : undefined,
      userId: String(item.id_member),
      tanggal: item.tanggal_reservasi,
      jamMulai: item.jam_mulai,
      jamSelesai: item.jam_selesai,
      durasiJam: item.durasi_jam,
      totalHarga: item.total_bayar,
      status: (item.status || 'BELUM_DIKONFIRMASI').toUpperCase(),
      createdAt: item.created_at,
    }));
  },

  getReservasiById: async (id: string): Promise<Reservasi> => {
    const raw = await fetchAPI<any>(`/reservasi/${id}`);
    const item = raw?.data || raw;
    return {
      id: String(item.id),
      kodeBooking: item.kode_booking,
      ruanganId: String(item.id_space),
      ruangan: item.space ? mapBackendSpaceToRuangan(item.space) : undefined,
      userId: String(item.id_member),
      tanggal: item.tanggal_reservasi,
      jamMulai: item.jam_mulai,
      jamSelesai: item.jam_selesai,
      durasiJam: item.durasi_jam,
      totalHarga: item.total_bayar,
      status: (item.status || 'BELUM_DIKONFIRMASI').toUpperCase(),
      createdAt: item.created_at,
    };
  },

  createReservasi: async (data: any): Promise<Reservasi> => {
    const raw = await fetchAPI<any>('/reservasi', {
      method: 'POST',
      body: JSON.stringify({
        id_space: Number(data.ruanganId),
        tanggal_reservasi: data.tanggal,
        jam_mulai: data.jamMulai,
        durasi_jam: Number(data.durasiJam),
        nama_diskon: data.kodePromo || undefined,
      }),
    });
    const item = raw?.data || raw;
    return {
      id: String(item.id),
      kodeBooking: item.kode_booking,
      ruanganId: String(item.id_space),
      userId: String(item.id_member),
      tanggal: item.tanggal_reservasi,
      jamMulai: item.jam_mulai,
      jamSelesai: item.jam_selesai,
      durasiJam: item.durasi_jam,
      totalHarga: item.total_bayar,
      status: (item.status || 'BELUM_DIKONFIRMASI').toUpperCase(),
      createdAt: item.created_at,
    };
  },

  login: async (emailOrUsername: string, password: string): Promise<{ user: User; token: string }> => {
    const isEmail = emailOrUsername.includes('@');
    const body = isEmail ? { email: emailOrUsername, password } : { username: emailOrUsername, password };

    const raw = await fetchAPI<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = raw?.data || raw;
    const userRole: 'ADMIN' | 'MEMBER' = data.user?.role === 'admin_space' || data.user?.role === 'ADMIN' ? 'ADMIN' : 'MEMBER';
    const userObj: User = {
      id: String(data.user?.id || Date.now()),
      nama: data.user?.username || data.user?.email?.split('@')[0] || 'User',
      email: data.user?.email || '',
      role: userRole,
    };

    setAuthToken(data.access_token);
    setCurrentUser(userObj);
    return { user: userObj, token: data.access_token };
  },

  register: async (data: { nama: string; email: string; password: string; telepon?: string }): Promise<{ user: User; token: string }> => {
    const username = data.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 100);
    const raw = await fetchAPI<any>('/auth/register/member', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email: data.email,
        password: data.password,
        nama_member: data.nama,
        instansi: 'Umum',
        alamat: 'Alamat Pengguna',
        telp: data.telepon || '081234567890',
      }),
    });

    const dataRes = raw?.data || raw;
    const userObj: User = {
      id: String(dataRes.user?.id || Date.now()),
      nama: data.nama,
      email: data.email,
      role: 'MEMBER',
    };

    setAuthToken(dataRes.access_token);
    setCurrentUser(userObj);
    return { user: userObj, token: dataRes.access_token };
  },

  getAdminMetrics: async (): Promise<AdminMetrics> => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const raw = await fetchAPI<any>(`/admin/reports/monthly?month=${month}&year=${year}`);
    const data = raw?.data || {};
    return {
      totalReservasi: Number(data.total_transaksi || 0),
      reservasiPending: 0,
      ruanganAktif: 0,
      totalMember: 0,
      totalPendapatan: Number(data.pendapatan_bersih || 0),
      tingkatOkupansi: 85,
    };
  },

  getAdminReservasi: async (): Promise<Reservasi[]> => {
    const raw = await fetchAPI<any>('/admin/reservasi');
    const list = raw?.data || [];
    return list.map((item: any) => ({
      id: String(item.id),
      kodeBooking: item.kode_booking,
      ruanganId: String(item.id_space),
      ruangan: item.space ? mapBackendSpaceToRuangan(item.space) : undefined,
      userId: String(item.id_member),
      user: item.member ? { id: String(item.member.id), nama: item.member.nama_member, email: '', role: 'MEMBER' } : undefined,
      tanggal: item.tanggal_reservasi,
      jamMulai: item.jam_mulai,
      jamSelesai: item.jam_selesai,
      durasiJam: item.durasi_jam,
      totalHarga: item.total_bayar,
      status: (item.status || 'BELUM_DIKONFIRMASI').toUpperCase(),
      createdAt: item.created_at,
    }));
  },
};
