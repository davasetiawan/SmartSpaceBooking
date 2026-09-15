import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface ApiEnvelope<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  if (
    payload !== null &&
    typeof payload === "object" &&
    "data" in payload &&
    "status" in payload
  ) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("auth_token");
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
          const path = window.location.pathname;
          if (path.startsWith("/auth") || path.startsWith("/admin/login")) {
            return Promise.reject(error);
          }
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          window.location.href = path.startsWith("/admin")
            ? "/admin/login"
            : "/auth";
        }
        return Promise.reject(error);
      },
    );
  }

  private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.get<ApiEnvelope<T>>(url, config);
    return unwrap(res.data);
  }

  private async post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.client.post<ApiEnvelope<T>>(url, body, config);
    return unwrap(res.data);
  }

  private async patch<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.client.patch<ApiEnvelope<T>>(url, body, config);
    return unwrap(res.data);
  }

  private async delete<T>(url: string): Promise<T> {
    const res = await this.client.delete<ApiEnvelope<T>>(url);
    return unwrap(res.data);
  }

  async registerMember(data: RegisterMemberDto, foto?: File) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) form.append(key, String(value));
    });
    if (foto) form.append("foto", foto);
    return this.post<AuthPayload>("/auth/register/member", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async registerAdminSpace(data: RegisterAdminSpaceDto) {
    return this.post<AuthPayload>("/auth/register/admin-space", data);
  }

  async login(data: LoginDto) {
    return this.post<AuthPayload>("/auth/login", data);
  }

  async profile() {
    return this.get<AuthUser>("/auth/profile");
  }

  async updateMemberProfile(
    data: Partial<{
      nama_member: string;
      instansi: string;
      alamat: string;
      telp: string;
    }>,
    foto?: File,
  ) {
    const form = toForm(data);
    if (foto) form.append("foto", foto);
    return this.patch<AuthUser>("/auth/profile/member", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getSpaces(params?: { tipe?: string; search?: string }) {
    return this.get<Space[]>("/spaces", { params });
  }

  async getSpace(id: number) {
    return this.get<Space>(`/spaces/${id}`);
  }

  async checkAvailability(params: {
    id_space: number;
    tanggal: string;
    jam_mulai: string;
    durasi_jam: number;
  }) {
    return this.get<{ available: boolean; message?: string }>(
      "/spaces/availability",
      { params },
    );
  }

  async createReservation(data: CreateReservationDto, bukti?: File) {
    const form = new FormData();
    if (bukti) form.append("bukti_pembayaran", bukti);
    return this.post<Reservation>("/reservasi", form, {
      params: {
        id_space: data.id_space,
        tanggal_reservasi: data.tanggal_reservasi,
        jam_mulai: data.jam_mulai,
        durasi_jam: data.durasi_jam,
        ...(data.nama_diskon ? { nama_diskon: data.nama_diskon } : {}),
      },
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getMyReservations() {
    return this.get<Reservation[]>("/reservasi/my");
  }

  async getReservation(id: number) {
    return this.get<Reservation>(`/reservasi/${id}`);
  }

  async getETicket(id: number) {
    return this.get<ETicketData>(`/reservasi/${id}/e-ticket`);
  }

  async cancelReservation(id: number) {
    return this.patch<Reservation>(`/reservasi/${id}/cancel`);
  }

  async checkPromo(code: string) {
    return this.post<Promo>("/diskon/check", {
      nama_diskon: code.toUpperCase(),
    });
  }

  async adminProfile() {
    return this.get<SpaceOwner>("/admin/profile");
  }

  async updateAdminProfile(data: Partial<SpaceOwner>) {
    return this.patch<SpaceOwner>("/admin/profile", data);
  }

  async adminMembers(search?: string) {
    return this.get<AdminMember[]>("/admin/members", { params: { search } });
  }

  async createAdminMember(data: RegisterMemberDto, foto?: File) {
    const form = toForm(data);
    if (foto) form.append("foto", foto);
    return this.post<unknown>("/admin/members", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async updateAdminMember(
    id: number,
    data: Partial<RegisterMemberDto>,
    foto?: File,
  ) {
    const form = toForm(data);
    if (foto) form.append("foto", foto);
    return this.patch<unknown>(`/admin/members/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async deleteAdminMember(id: number) {
    return this.delete(`/admin/members/${id}`);
  }

  async adminSpaces() {
    return this.get<Space[]>("/admin/spaces");
  }

  async createAdminSpace(data: Record<string, string | number>, foto?: File) {
    const form = toForm(data);
    if (foto) form.append("foto", foto);
    return this.post<Space>("/admin/spaces", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async updateAdminSpace(
    id: number,
    data: Record<string, string | number>,
    foto?: File,
  ) {
    const form = toForm(data);
    if (foto) form.append("foto", foto);
    return this.patch<Space>(`/admin/spaces/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async deleteAdminSpace(id: number) {
    return this.delete(`/admin/spaces/${id}`);
  }

  async adminDiskon() {
    return this.get<Promo[]>("/admin/diskon");
  }

  async createAdminDiskon(data: {
    nama_diskon: string;
    persentase_diskon: number;
    tanggal_awal: string;
    tanggal_akhir: string;
  }) {
    return this.post<Promo>("/admin/diskon", {
      ...data,
      nama_diskon: data.nama_diskon.toUpperCase(),
    });
  }

  async updateAdminDiskon(
    id: number,
    data: Partial<{
      nama_diskon: string;
      persentase_diskon: number;
      tanggal_awal: string;
      tanggal_akhir: string;
    }>,
  ) {
    return this.patch<Promo>(`/admin/diskon/${id}`, data);
  }

  async deleteAdminDiskon(id: number) {
    return this.delete(`/admin/diskon/${id}`);
  }

  async adminReservations(params?: {
    month?: string;
    year?: string;
    status?: ReservationStatus;
    id_space?: string;
    tanggal?: string;
  }) {
    return this.get<Reservation[]>("/admin/reservasi", { params });
  }

  async confirmReservation(id: number, status: "disetujui" | "ditolak") {
    return this.patch<Reservation>(`/admin/reservasi/${id}/status`, { status });
  }

  async checkIn(id: number) {
    return this.patch<Reservation>(`/admin/reservasi/${id}/check-in`);
  }

  async checkOut(id: number) {
    return this.patch<Reservation>(`/admin/reservasi/${id}/check-out`);
  }

  async monthlyReport(month: number, year: number) {
    return this.get<MonthlyReport>("/admin/reports/monthly", {
      params: { month, year },
    });
  }
}

function toForm(data: Record<string, unknown> | any) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, String(value));
    }
  });
  return form;
}

export const api = new ApiClient();

export interface RegisterMemberDto {
  username: string;
  email: string;
  password: string;
  nama_member: string;
  instansi: string;
  alamat: string;
  telp: string;
}

export interface RegisterAdminSpaceDto {
  username: string;
  email: string;
  password: string;
  nama_coworking: string;
  nama_pemilik: string;
  telp: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
  member?: {
    id: number;
    nama_member: string;
    instansi: string;
    telp: string;
    alamat?: string | null;
    foto?: string | null;
  } | null;
  space_owner?: {
    id: number;
    nama_coworking: string;
    nama_pemilik: string;
    telp: string;
  } | null;
}

export interface AuthPayload {
  access_token: string;
  user: AuthUser;
}

export interface SpaceOwner {
  id: number;
  nama_coworking: string;
  nama_pemilik: string;
  telp: string;
  alamat?: string | null;
  deskripsi_fasilitas?: string | null;
}

export interface Space {
  id: number;
  nama_space: string;
  kota?: string | null;
  jalan?: string | null;
  harga_per_jam: number;
  tipe: "desk" | "meeting_room" | "private_office";
  kapasitas: number;
  deskripsi: string;
  foto?: string | null;
  created_at: string;
  updated_at: string;
  owner?: SpaceOwner;
}

export interface CreateReservationDto {
  id_space: number;
  tanggal_reservasi: string;
  jam_mulai: string;
  durasi_jam: number;
  nama_diskon?: string;
}

export type ReservationStatus =
  | "belum_dikonfirm"
  | "disetujui"
  | "aktif"
  | "selesai"
  | "dibatalkan";

export interface Promo {
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  created_at: string;
}

export interface AdminMember {
  id: number;
  id_user: number;
  nama_member: string;
  instansi: string;
  alamat: string;
  telp: string;
  foto?: string | null;
  created_at: string;
  users?: { id: number; username: string };
}

export interface MonthlyReport {
  total_transaksi: number;
  total_jam: number;
  pendapatan_kotor: number;
  total_diskon: number;
  pendapatan_bersih: number;
  per_tipe: Array<{
    tipe: string;
    total_booking: number;
    total_jam: number;
    total_pendapatan: number;
  }>;
  harian: Array<{ tanggal: string; total: number }>;
}

export interface Reservation {
  id: number;
  kode_booking: string;
  id_member: number;
  id_space: number;
  id_diskon?: number | null;
  tanggal_reservasi: string;
  jam_mulai: string;
  jam_selesai: string;
  durasi_jam: number;
  harga_per_jam: number;
  total_harga_awal: number;
  potongan_diskon: number;
  total_bayar: number;
  status: ReservationStatus;
  bukti_pembayaran?: string | null;
  check_in_time?: string | null;
  check_out_time?: string | null;
  created_at: string;
  updated_at: string;
  space?: Space;
  diskon?: Promo | null;
  member?: {
    id: number;
    nama_member: string;
    instansi: string;
    telp: string;
    id_user: number;
  };
}

export interface ETicketData extends Reservation {
  ticket_number: string;
  qr_payload: string;
  qr_code: string;
}

export function apiErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === "object" && err !== null && "response" in err) {
    const response = (err as { response?: { data?: { message?: unknown } } })
      .response;
    const message = response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export function mediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  const origin = API_URL.replace(/\/api\/?$/, "");
  const cleanPath = path.replace(/^\/?(uploads\/)?/, "");
  return `${origin}/api/uploads/${cleanPath}`;
}

export function persistAuth(payload: AuthPayload) {
  localStorage.setItem("auth_token", payload.access_token);
  localStorage.setItem("auth_user", JSON.stringify(payload.user));
}

export function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export function readAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return typeof window !== "undefined" && Boolean(localStorage.getItem("auth_token"));
}
