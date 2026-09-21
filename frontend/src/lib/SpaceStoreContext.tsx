'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Space,
  Booking,
  Voucher,
  Member,
  INITIAL_SPACES,
  INITIAL_BOOKINGS,
  INITIAL_VOUCHERS,
  INITIAL_MEMBERS,
  PROPERTY_PROFILE
} from './mockData';
import {
  fetchSpaces,
  fetchMyBookings,
  fetchAdminSpaces,
  fetchAdminReservations,
  fetchAdminDiscounts,
  fetchAdminMembers,
  checkPromoCode,
  getProfile,
  getStoredToken,
  removeStoredToken,
  checkInGuest,
  checkInGuestByCodeApi,
  cancelReservasi,
  updateReservasiStatus,
  createReservasi
} from './api';

const BACKEND_URL = 'http://localhost:3001';
const DEFAULT_SPACE_IMG = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85';

/**
 * Resolves a space photo value from the backend into a full displayable URL.
 * Handles:
 * - Full external URLs (Cloudinary, Unsplash, etc.): returned as-is
 * - Local relative paths like "/uploads/1234.jpg": prefixed with BACKEND_URL
 * - Bare filenames like "1234.jpg": prefixed with BACKEND_URL + /uploads/
 * - null/undefined: returns default placeholder image
 */
function resolveSpaceImageUrl(foto?: string | null): string {
  if (!foto) return DEFAULT_SPACE_IMG;
  if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
  if (foto.startsWith('/uploads/')) return `${BACKEND_URL}${foto}`;
  return `${BACKEND_URL}/uploads/${foto}`;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: 'member' | 'admin_space' | 'maker';
  name: string;
  phone: string;
  tier: string;
  memberProfile?: any;
  ownerProfile?: any;
}

interface SpaceStoreContextType {
  spaces: Space[];
  bookings: Booking[];
  vouchers: Voucher[];
  members: Member[];
  propertyProfile: typeof PROPERTY_PROFILE;
  currentUser: UserProfile | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  logout: () => void;
  addBooking: (bookingInput: any) => Promise<any>;
  cancelBooking: (bookingId: string | number) => Promise<void>;
  updateBookingStatus: (bookingId: string | number, status: any, alasanPenolakan?: string) => Promise<void>;
  addSpace: (space: Omit<Space, 'id'>) => Space;
  updateSpace: (id: string, space: Partial<Space>) => void;
  deleteSpace: (id: string) => void;
  addVoucher: (voucher: Omit<Voucher, 'id' | 'usageCount'>) => Voucher;
  validateVoucher: (code: string, amount: number) => Promise<{ valid: boolean; discount: number; message: string; voucher?: Voucher }>;
  checkInGuestByCode: (code: string) => Promise<{ success: boolean; booking?: any; message: string }>;
  setCurrentUserRole: (role: 'member' | 'admin') => void;
}

const SpaceStoreContext = createContext<SpaceStoreContextType | undefined>(undefined);

export function SpaceStoreProvider({ children }: { children: React.ReactNode }) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [propertyProfile] = useState(PROPERTY_PROFILE);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadBackendData = async () => {
    setLoading(true);
    try {
      // 1. Fetch public spaces — always sync from backend (even if empty)
      const backendSpaces = await fetchSpaces();
      const mappedSpaces: Space[] = Array.isArray(backendSpaces)
        ? backendSpaces.map((s: any) => ({
            id: String(s.id),
            name: s.nama_space,
            category: s.tipe === 'desk' ? 'Personal Desk' : s.tipe === 'meeting_room' ? 'Meeting Room' : 'Private Office',
            location: s.jalan || s.kota || '',
            city: (s.kota || '').trim(),
            capacity: s.kapasitas || 1,
            hourlyRate: s.harga_per_jam || 100000,
            dailyRate: (s.harga_per_jam || 100000) * 7,
            rating: 4.9,
            reviewsCount: 45,
            imageUrl: resolveSpaceImageUrl(s.foto),
            description: s.deskripsi || 'Fasilitas coworking modern lengkap.',
            amenities: ['Ergonomic Chair', 'High-Speed Wi-Fi', 'Coffee Access'],
            isAvailable: true,
            statusText: 'Tersedia'
          }))
        : [];
      setSpaces(mappedSpaces);

      // 2. Check auth session
      const token = getStoredToken();
      if (token) {
        try {
          const profileData = await getProfile();
          if (profileData) {
            const userObj: UserProfile = {
              id: profileData.id,
              username: profileData.username,
              email: profileData.email,
              role: profileData.role,
              name: profileData.member?.nama_member || profileData.space_owner?.nama_pemilik || profileData.username,
              phone: profileData.member?.telp || profileData.space_owner?.telp || '-',
              tier: profileData.role === 'admin_space' ? 'Space Owner Admin' : 'Member',
              memberProfile: profileData.member,
              ownerProfile: profileData.space_owner
            };
            setCurrentUser(userObj);

            // Fetch role specific data
            if (profileData.role === 'admin_space') {
              const resList = await fetchAdminReservations();
              if (Array.isArray(resList)) {
                const mappedBookings: Booking[] = resList.map((r: any) => ({
                  id: String(r.id),
                  bookingCode: r.kode_booking,
                  spaceId: String(r.id_space),
                  spaceName: r.space?.nama_space || `Space #${r.id_space}`,
                  spaceCategory: r.space?.tipe || 'Desk',
                  location: 'Coworking Location',
                   imageUrl: resolveSpaceImageUrl(r.space?.foto),
                  guestName: r.member?.nama_member || 'Guest',
                  guestEmail: r.member?.users?.email || 'Email belum tersedia',
                  guestPhone: r.member?.telp || '-',
                  date: new Date(r.tanggal_reservasi).toISOString().split('T')[0],
                  timeSlot: `${new Date(r.jam_mulai).toISOString().substr(11, 5)} - ${new Date(r.jam_selesai).toISOString().substr(11, 5)}`,
                  durationHours: r.durasi_jam,
                  totalAmount: r.total_bayar,
                  status: r.status === 'belum_dikonfirm' ? 'unverified' : r.status === 'disetujui' ? 'pending' : r.status === 'aktif' ? 'active' : r.status === 'selesai' ? 'finished' : r.status === 'dibatalkan' ? 'cancelled' : 'unverified',
                  keycardPin: r.pin_akses || '8899',
                  assignedSeat: `UNIT-${r.id_space}`,
                  addOns: [],
                  createdAt: new Date(r.created_at).toLocaleString('id-ID'),
                  qrPayload: `VERIFY-RESERVASI-${r.id}-${r.kode_booking}`,
                  paymentProofUrl: r.bukti_pembayaran
                    ? (r.bukti_pembayaran.startsWith('http://') || r.bukti_pembayaran.startsWith('https://')
                        ? r.bukti_pembayaran
                        : r.bukti_pembayaran.startsWith('/uploads/')
                          ? `${BACKEND_URL}${r.bukti_pembayaran}`
                          : `${BACKEND_URL}/uploads/pembayaran/${r.bukti_pembayaran}`)
                    : null,
                  rejectionReason: (r as any).alasan_penolakan || null
                }));
                setBookings(mappedBookings);
              }
            } else if (profileData.role === 'member') {
              const myBookings = await fetchMyBookings();
              if (Array.isArray(myBookings)) {
                const mappedBookings: Booking[] = myBookings.map((r: any) => ({
                  id: String(r.id),
                  bookingCode: r.kode_booking,
                  spaceId: String(r.id_space),
                  spaceName: r.space?.nama_space || `Space #${r.id_space}`,
                  spaceCategory: r.space?.tipe || 'Desk',
                  location: 'Coworking Location',
                   imageUrl: resolveSpaceImageUrl(r.space?.foto),
                  guestName: r.member?.nama_member || profileData.member?.nama_member || 'Guest',
                  guestEmail: profileData.email,
                  guestPhone: r.member?.telp || '-',
                  date: new Date(r.tanggal_reservasi).toISOString().split('T')[0],
                  timeSlot: `${new Date(r.jam_mulai).toISOString().substr(11, 5)} - ${new Date(r.jam_selesai).toISOString().substr(11, 5)}`,
                  durationHours: r.durasi_jam,
                  totalAmount: r.total_bayar,
                  status: r.status === 'belum_dikonfirm' ? 'unverified' : r.status === 'disetujui' ? 'pending' : r.status === 'aktif' ? 'active' : r.status === 'selesai' ? 'finished' : r.status === 'dibatalkan' ? 'cancelled' : 'unverified',
                  keycardPin: r.pin_akses || '8899',
                  assignedSeat: `UNIT-${r.id_space}`,
                  addOns: [],
                  createdAt: new Date(r.created_at).toLocaleString('id-ID'),
                  qrPayload: `VERIFY-RESERVASI-${r.id}-${r.kode_booking}`,
                  paymentProofUrl: r.bukti_pembayaran
                    ? (r.bukti_pembayaran.startsWith('http://') || r.bukti_pembayaran.startsWith('https://')
                        ? r.bukti_pembayaran
                        : r.bukti_pembayaran.startsWith('/uploads/')
                          ? `${BACKEND_URL}${r.bukti_pembayaran}`
                          : `${BACKEND_URL}/uploads/pembayaran/${r.bukti_pembayaran}`)
                    : null,
                  rejectionReason: (r as any).alasan_penolakan || null
                }));
                setBookings(mappedBookings);
              }
            }
          }
        } catch (err) {
          console.warn('Session check failed or expired token');
          removeStoredToken();
          setCurrentUser(null);
        }
      }
    } catch (error) {
      console.error('Error fetching backend initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  const logout = () => {
    removeStoredToken();
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const addBooking = async (input: any): Promise<any> => {
    try {
      const res = await createReservasi({
        id_space: Number(input.spaceId),
        tanggal_reservasi: input.date,
        jam_mulai: input.jam_mulai || '09:00',
        durasi_jam: Number(input.durationHours || 1),
        kode_promo: input.kode_promo,
        payment_method_id: input.payment_method_id,
        bukti_pembayaran: input.bukti_pembayaran
      });
      await loadBackendData();
      return res;
    } catch (err: any) {
      throw err;
    }
  };

  const cancelBooking = async (bookingId: string | number) => {
    try {
      await cancelReservasi(bookingId);
      await loadBackendData();
    } catch (err) {
      console.error('Cancel booking error:', err);
    }
  };

  const updateBookingStatus = async (bookingId: string | number, status: any, alasanPenolakan?: string) => {
    try {
      let mappedStatus = status;
      if (status === 'unverified') mappedStatus = 'belum_dikonfirm';
      if (status === 'pending') mappedStatus = 'disetujui';
      if (status === 'active') mappedStatus = 'aktif';
      if (status === 'finished') mappedStatus = 'selesai';
      if (status === 'cancelled') mappedStatus = 'dibatalkan';

      await updateReservasiStatus(bookingId, mappedStatus, alasanPenolakan);
      await loadBackendData();
    } catch (err) {
      console.error('Update status error:', err);
      throw err;
    }
  };

  const addSpace = (spaceInput: Omit<Space, 'id'>): Space => {
    const newSpace: Space = { ...spaceInput, id: `sp-${Date.now()}` };
    setSpaces([newSpace, ...spaces]);
    return newSpace;
  };

  const updateSpace = (id: string, partial: Partial<Space>) => {
    setSpaces(spaces.map(s => s.id === id ? { ...s, ...partial } : s));
  };

  const deleteSpace = (id: string) => {
    setSpaces(spaces.filter(s => s.id !== id));
  };

  const addVoucher = (voucherInput: Omit<Voucher, 'id' | 'usageCount'>): Voucher => {
    const newVoucher: Voucher = { ...voucherInput, id: `vc-${Date.now()}`, usageCount: 0 };
    setVouchers([newVoucher, ...vouchers]);
    return newVoucher;
  };

  const validateVoucher = async (code: string, amount: number) => {
    try {
      const result = await checkPromoCode(code);
      if (result && result.persentase_diskon) {
        const discountAmount = (amount * result.persentase_diskon) / 100;
        return {
          valid: true,
          discount: discountAmount,
          message: `Kupon ${result.nama_diskon} berhasil! Diskon ${result.persentase_diskon}%`,
          voucher: {
            id: String(result.id),
            code: result.nama_diskon,
            discountType: 'percentage' as const,
            discountValue: result.persentase_diskon,
            minSpend: 0,
            validUntil: result.tanggal_akhir,
            usageCount: 1,
            quota: 100,
            isActive: true
          }
        };
      }
    } catch (e: any) {
      return { valid: false, discount: 0, message: e.message || 'Voucher tidak valid' };
    }
    return { valid: false, discount: 0, message: 'Voucher tidak valid' };
  };

  const checkInGuestByCode = async (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = bookings.find(b =>
      b.bookingCode.toUpperCase() === clean ||
      b.qrPayload.toUpperCase() === clean ||
      b.keycardPin.toUpperCase() === clean ||
      b.id === clean ||
      clean.includes(b.bookingCode.toUpperCase()) ||
      clean.includes(b.qrPayload.toUpperCase())
    );

    try {
      let apiResult: any = null;
      try {
        apiResult = await checkInGuestByCodeApi(code);
      } catch (e) {
        if (found) {
          apiResult = await checkInGuest(found.id);
        } else {
          throw e;
        }
      }

      await loadBackendData();

      const matchedBooking = found || (apiResult?.data ? {
        id: String(apiResult.data.id),
        bookingCode: apiResult.data.kode_booking,
        guestName: apiResult.data.member?.nama_member || 'Guest',
        spaceName: apiResult.data.space?.nama_space || 'Space',
        assignedSeat: `UNIT-${apiResult.data.id_space}`,
        timeSlot: `${apiResult.data.jam_mulai} - ${apiResult.data.jam_selesai}`,
        keycardPin: apiResult.data.pin_akses || '8899',
        status: 'active' as const,
      } : undefined);

      return {
        success: true,
        booking: matchedBooking,
        message: apiResult?.message || `Check-in Berhasil! Tamu: ${matchedBooking?.guestName || 'Tamu'}`
      };
    } catch (err: any) {
      if (found) {
        try {
          await checkInGuest(found.id);
          await loadBackendData();
          return {
            success: true,
            booking: { ...found, status: 'active' as const },
            message: `Check-in Berhasil! Tamu: ${found.guestName}`
          };
        } catch (fallbackErr: any) {
          return { success: false, message: fallbackErr.message || 'Gagal check-in' };
        }
      }
      return { success: false, message: err.message || `Tiket '${code}' tidak ditemukan` };
    }
  };

  const setCurrentUserRole = (role: 'member' | 'admin') => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: role === 'admin' ? 'admin_space' : 'member'
      });
    }
  };

  return (
    <SpaceStoreContext.Provider
      value={{
        spaces,
        bookings,
        vouchers,
        members,
        propertyProfile,
        currentUser,
        loading,
        refreshData: loadBackendData,
        logout,
        addBooking,
        cancelBooking,
        updateBookingStatus,
        addSpace,
        updateSpace,
        deleteSpace,
        addVoucher,
        validateVoucher,
        checkInGuestByCode,
        setCurrentUserRole
      }}
    >
      {children}
    </SpaceStoreContext.Provider>
  );
}

export function useSpaceStore() {
  const context = useContext(SpaceStoreContext);
  if (!context) {
    throw new Error('useSpaceStore must be used within a SpaceStoreProvider');
  }
  return context;
}

