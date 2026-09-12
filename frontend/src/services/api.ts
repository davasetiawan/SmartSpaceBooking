// API Client & Mock Fallback Layer for WorkMates

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

export interface PaymentMethod {
  id: number;
  nama: string;
  tipe: string;
  nomor_rekening?: string;
  atas_nama?: string;
  is_aktif: boolean;
}

export interface PaymentTransaction {
  id: number;
  id_reservasi: number;
  midtrans_order_id: string;
  gross_amount: number;
  status: string;
  payment_type?: string;
  transaction_time?: string;
}

// Token Storage Helpers
export const getAuthToken = () => localStorage.getItem('ssb_token');
export const setAuthToken = (token: string) => localStorage.getItem('ssb_token') ? localStorage.setItem('ssb_token', token) : localStorage.setItem('ssb_token', token);
export const removeAuthToken = () => localStorage.removeItem('ssb_token');

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('ssb_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('ssb_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('ssb_user');
  }
};

// API Fetcher with Fallback Mock Data
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`API call to ${endpoint} failed, falling back to mock data:`, err);
  }

  // Fallback Mock Handler
  return getMockData<T>(endpoint, options);
}

// Mock Data Provider for standalone preview
const MOCK_RUANGAN: Ruangan[] = [
  {
    id: 'ruang-1',
    nama: 'Sonder Grand Suite — Meeting Room A',
    slug: 'sonder-grand-suite',
    tipe: 'MEETING_ROOM',
    kapasitas: 12,
    hargaPerJam: 150000,
    hargaPerHari: 1000000,
    deskripsi: 'Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.',
    fasilitas: ['High-speed Wi-Fi', 'Proyektor 4K', 'Whiteboard Glass', 'Coffee & Tea', 'Air Conditioner', 'Soundproof Wall'],
    gambarUrl: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80'
    ],
    lokasi: 'Lantai 3 — Zone North',
    isAktif: true,
    rating: 4.9
  },
  {
    id: 'ruang-2',
    nama: 'Urban Loft — Coworking Hot Desk',
    slug: 'urban-loft-hot-desk',
    tipe: 'COWORKING_DESK',
    kapasitas: 1,
    hargaPerJam: 35000,
    hargaPerHari: 200000,
    deskripsi: 'Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.',
    fasilitas: ['Wi-Fi 500Mbps', 'Power Outlet Dedicated', 'Ergonomic Mesh Chair', 'Free Flow Artisan Coffee'],
    gambarUrl: [
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    lokasi: 'Lantai 1 — Main Lounge',
    isAktif: true,
    rating: 4.8
  },
  {
    id: 'ruang-3',
    nama: 'Executive Private Office 101',
    slug: 'executive-office-101',
    tipe: 'PRIVATE_OFFICE',
    kapasitas: 6,
    hargaPerJam: 250000,
    hargaPerHari: 1800000,
    deskripsi: 'Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.',
    fasilitas: ['Akses 24/7 Digital Key', 'Private Wi-Fi Subnet', 'Standing Desk', 'Locker Pribadi', 'Cleaning Service Harian'],
    gambarUrl: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    ],
    lokasi: 'Lantai 2 — West Wing',
    isAktif: true,
    rating: 5.0
  },
  {
    id: 'ruang-4',
    nama: 'Grand Auditorium & Event Hall',
    slug: 'grand-auditorium-hall',
    tipe: 'EVENT_SPACE',
    kapasitas: 80,
    hargaPerJam: 750000,
    hargaPerHari: 5000000,
    deskripsi: 'Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.',
    fasilitas: ['Stage & Lighting System', 'Dual Screen Projector', 'Wireless Microphones', 'Catering Station Area', 'VIP Holding Room'],
    gambarUrl: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    lokasi: 'Lantai Ground — Main Auditorium',
    isAktif: true,
    rating: 4.9
  }
];

const MOCK_RESERVASI: Reservasi[] = [
  {
    id: 'res-101',
    kodeBooking: 'SSB-20260908-881',
    ruanganId: 'ruang-1',
    ruangan: MOCK_RUANGAN[0],
    userId: 'usr-1',
    user: { id: 'usr-1', nama: 'Alexander Wright', email: 'alex@example.com', role: 'MEMBER' },
    tanggal: '2026-09-09',
    jamMulai: '09:00',
    jamSelesai: '11:00',
    durasiJam: 2,
    totalHarga: 300000,
    status: 'DISETUJUI',
    catatan: 'Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881',
    createdAt: '2026-09-08 14:20:00'
  },
  {
    id: 'res-102',
    kodeBooking: 'SSB-20260908-412',
    ruanganId: 'ruang-2',
    ruangan: MOCK_RUANGAN[1],
    userId: 'usr-1',
    user: { id: 'usr-1', nama: 'Alexander Wright', email: 'alex@example.com', role: 'MEMBER' },
    tanggal: '2026-09-10',
    jamMulai: '13:00',
    jamSelesai: '17:00',
    durasiJam: 4,
    totalHarga: 140000,
    status: 'BELUM_DIKONFIRMASI',
    createdAt: '2026-09-08 16:45:00'
  }
];

function getMockData<T>(endpoint: string, options: RequestInit): T {
  const method = options.method || 'GET';

  if (endpoint.startsWith('/ruangan')) {
    if (endpoint.includes('/ruang-')) {
      const id = endpoint.split('/')[2];
      const r = MOCK_RUANGAN.find(x => x.id === id) || MOCK_RUANGAN[0];
      return r as unknown as T;
    }
    return MOCK_RUANGAN as unknown as T;
  }

  if (endpoint.startsWith('/reservasi')) {
    if (method === 'POST') {
      const body = JSON.parse((options.body as string) || '{}');
      const newRes: Reservasi = {
        id: `res-${Date.now()}`,
        kodeBooking: `SSB-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100+Math.random()*900)}`,
        ruanganId: body.ruanganId || 'ruang-1',
        ruangan: MOCK_RUANGAN.find(r => r.id === body.ruanganId) || MOCK_RUANGAN[0],
        userId: getCurrentUser()?.id || 'usr-1',
        user: getCurrentUser() || { id: 'usr-1', nama: 'User Member', email: 'user@example.com', role: 'MEMBER' },
        tanggal: body.tanggal || '2026-09-10',
        jamMulai: body.jamMulai || '10:00',
        jamSelesai: body.jamSelesai || '12:00',
        durasiJam: body.durasiJam || 2,
        totalHarga: body.totalHarga || 300000,
        status: 'BELUM_DIKONFIRMASI',
        catatan: body.catatan || '',
        createdAt: new Date().toISOString()
      };
      MOCK_RESERVASI.unshift(newRes);
      return newRes as unknown as T;
    }
    return MOCK_RESERVASI as unknown as T;
  }

  if (endpoint.startsWith('/payment-method')) {
    const mockMethods: PaymentMethod[] = [
      { id: 1, nama: 'Bank Transfer BCA', tipe: 'bank_transfer', nomor_rekening: '8820491029', atas_nama: 'PT WorkMates Indonesia', is_aktif: true },
      { id: 2, nama: 'Bank Transfer Mandiri', tipe: 'bank_transfer', nomor_rekening: '1370019283019', atas_nama: 'PT WorkMates Indonesia', is_aktif: true },
      { id: 3, nama: 'QRIS / GoPay / ShopeePay', tipe: 'qris', is_aktif: true },
      { id: 4, nama: 'Credit Card / Debit Card', tipe: 'credit_card', is_aktif: true },
    ];
    return mockMethods as unknown as T;
  }

  if (endpoint.startsWith('/admin/metrics')) {
    const metrics: AdminMetrics = {
      totalReservasi: 128,
      reservasiPending: 5,
      ruanganAktif: 8,
      totalMember: 340,
      totalPendapatan: 48500000,
      tingkatOkupansi: 84.5
    };
    return metrics as unknown as T;
  }

  return {} as T;
}

export const api = {
  getRuangan: () => fetchAPI<Ruangan[]>('/ruangan'),
  getRuanganById: (id: string) => fetchAPI<Ruangan>(`/ruangan/${id}`),
  getReservasi: () => fetchAPI<Reservasi[]>('/reservasi'),
  getReservasiById: (id: string) => fetchAPI<Reservasi>(`/reservasi/${id}`),
  createReservasi: (data: Partial<Reservasi>) => fetchAPI<Reservasi>('/reservasi', { method: 'POST', body: JSON.stringify(data) }),
  getAdminMetrics: () => fetchAPI<AdminMetrics>('/admin/metrics'),
  getPaymentMethods: () => fetchAPI<PaymentMethod[]>('/payment-method'),
  createPayment: (reservasiId: string, paymentMethodId: number) => fetchAPI<{ paymentUrl: string; orderId: string; token: string }>(`/payment/reservasi/${reservasiId}/pay`, { method: 'POST', body: JSON.stringify({ paymentMethodId }) }),
  getPaymentStatus: (orderId: string) => fetchAPI<any>(`/payment/status/${orderId}`),
  getPaymentHistory: () => fetchAPI<PaymentTransaction[]>('/payment/history'),
};
