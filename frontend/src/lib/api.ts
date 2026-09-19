const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface LoginPayload {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterMemberPayload {
  username: string;
  email: string;
  password: string;
  nama_member: string;
  instansi: string;
  alamat: string;
  telp: string;
  foto?: File | null;
}

export interface RegisterAdminSpacePayload {
  username: string;
  email: string;
  password: string;
  nama_coworking: string;
  nama_pemilik: string;
  telp: string;
}

export interface AuthResponse {
  statusCode?: number;
  message?: string;
  data?: {
    access_token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: 'member' | 'admin_space' | 'maker';
      member?: any;
      space_owner?: any;
    };
  };
}

// Token helper
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setStoredToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
}

export function removeStoredToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

function getAuthHeaders(token?: string | null): HeadersInit {
  const authToken = token || getStoredToken();
  return {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

// --- AUTH API ---

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Login gagal";
    throw new Error(errorMsg);
  }
  if (data?.data?.access_token) {
    setStoredToken(data.data.access_token);
  }
  return data;
}

export async function registerMember(payload: RegisterMemberPayload): Promise<AuthResponse> {
  const formData = new FormData();
  formData.append("username", payload.username);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("nama_member", payload.nama_member);
  formData.append("instansi", payload.instansi);
  formData.append("alamat", payload.alamat);
  formData.append("telp", payload.telp);
  if (payload.foto) {
    formData.append("foto", payload.foto);
  }

  const response = await fetch(`${API_BASE_URL}/auth/register/member`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Registrasi member gagal";
    throw new Error(errorMsg);
  }
  if (data?.data?.access_token) {
    setStoredToken(data.data.access_token);
  }
  return data;
}

export async function registerAdminSpace(payload: RegisterAdminSpacePayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register/admin-space`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Registrasi admin space gagal";
    throw new Error(errorMsg);
  }
  if (data?.data?.access_token) {
    setStoredToken(data.data.access_token);
  }
  return data;
}

export async function getProfile(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Gagal mengambil profil user");
  }
  return data.data;
}

// --- SPACES API ---

export async function fetchSpaces(params?: { tipe?: string; search?: string }): Promise<any[]> {
  const query = new URLSearchParams();
  if (params?.tipe && params.tipe !== "all" && params.tipe !== "Semua") query.append("tipe", params.tipe);
  if (params?.search) query.append("search", params.search);

  const response = await fetch(`${API_BASE_URL}/spaces?${query.toString()}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengambil daftar space");
  return data.data || [];
}

export async function fetchSpaceById(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/spaces/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengambil detail space");
  return data.data;
}

export async function checkSpaceAvailability(params: {
  id_space: number;
  tanggal: string;
  jam_mulai: string;
  durasi_jam: number;
}): Promise<any> {
  const query = new URLSearchParams({
    id_space: String(params.id_space),
    tanggal: params.tanggal,
    jam_mulai: params.jam_mulai,
    durasi_jam: String(params.durasi_jam),
  });
  const response = await fetch(`${API_BASE_URL}/spaces/availability?${query.toString()}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memeriksa ketersediaan");
  return data;
}

// --- DISKON / PROMO API ---

export async function checkPromoCode(nama_diskon: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/diskon/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama_diskon }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Kode promo tidak valid");
  return data.data || data;
}

export async function fetchActiveDiscounts(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/diskon/active`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat diskon aktif");
  return data.data || [];
}

// --- RESERVASI MEMBER API ---

export interface CreateReservasiPayload {
  id_space: number;
  tanggal_reservasi: string;
  jam_mulai: string;
  durasi_jam: number;
  kode_promo?: string;
  payment_method_id?: number;
}

export async function createReservasi(payload: CreateReservasiPayload): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/reservasi`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Gagal membuat reservasi";
    throw new Error(errorMsg);
  }
  return data.data || data;
}

export async function fetchMyBookings(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/reservasi/my`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengambil reservasi");
  return data.data || [];
}

export async function fetchMyHistory(params?: { month?: number; year?: number }): Promise<any> {
  const query = new URLSearchParams();
  if (params?.month) query.append("month", String(params.month));
  if (params?.year) query.append("year", String(params.year));

  const response = await fetch(`${API_BASE_URL}/reservasi/my/history?${query.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengambil riwayat reservasi");
  return data.data || data;
}

export async function fetchETicket(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/reservasi/${id}/e-ticket`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat E-Ticket");
  return data.data || data;
}

export async function cancelReservasi(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/reservasi/${id}/cancel`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal membatalkan reservasi");
  return data;
}

// --- ADMIN API ---

export async function fetchAdminProfile(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat profil admin");
  return data.data || data;
}

export async function updateAdminProfile(payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memperbarui profil admin");
  return data.data || data;
}

// Admin Members CRUD
export async function fetchAdminMembers(search?: string): Promise<any[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await fetch(`${API_BASE_URL}/admin/members${query}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat member");
  return data.data || [];
}

export async function createAdminMember(payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/members`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal menambahkan member");
  return data.data || data;
}

export async function updateAdminMember(id: number | string, payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/members/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengedit member");
  return data.data || data;
}

export async function deleteAdminMember(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/members/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal menghapus member");
  return data;
}

// Admin Spaces CRUD
export async function fetchAdminSpaces(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/admin/spaces`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat space admin");
  return data.data || [];
}

export async function createAdminSpaceItem(formData: FormData): Promise<any> {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE_URL}/admin/spaces`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal membuat space baru");
  return data.data || data;
}

export async function updateAdminSpaceItem(id: number | string, payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/spaces/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memperbarui space");
  return data.data || data;
}

export async function deleteAdminSpaceItem(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/spaces/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal menghapus space");
  return data;
}

// Admin Diskon CRUD
export async function fetchAdminDiscounts(): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/admin/diskon`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat diskon");
  return data.data || [];
}

export async function createAdminDiscount(payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/diskon`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal membuat kode diskon");
  return data.data || data;
}

export async function updateAdminDiscount(id: number | string, payload: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/diskon/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal mengedit diskon");
  return data.data || data;
}

export async function deleteAdminDiscount(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/diskon/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal menghapus diskon");
  return data;
}

// Admin Reservasi & Operational Actions
export async function fetchAdminReservations(params?: {
  month?: number;
  year?: number;
  status?: string;
  id_space?: number;
  tanggal?: string;
}): Promise<any[]> {
  const query = new URLSearchParams();
  if (params?.month) query.append("month", String(params.month));
  if (params?.year) query.append("year", String(params.year));
  if (params?.status && params.status !== "all") query.append("status", params.status);
  if (params?.id_space) query.append("id_space", String(params.id_space));
  if (params?.tanggal) query.append("tanggal", params.tanggal);

  const response = await fetch(`${API_BASE_URL}/admin/reservasi?${query.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat data reservasi admin");
  return data.data || [];
}

export async function updateReservasiStatus(id: number | string, status: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/reservasi/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memperbarui status reservasi");
  return data;
}

export async function checkInGuest(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/reservasi/${id}/check-in`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal proses check-in");
  return data;
}

export async function checkOutGuest(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/reservasi/${id}/check-out`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal proses check-out");
  return data;
}

// Admin Finance & Monthly Reports
export async function fetchMonthlyReport(month: number, year: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/admin/reports/monthly?month=${month}&year=${year}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Gagal memuat rekap bulanan");
  return data.data || data;
}

