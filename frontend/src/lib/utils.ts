import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatClock(value: string | Date): string {
  if (typeof value === "string" && /^\d{2}:\d{2}/.test(value)) {
    return value.slice(0, 5);
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function addHours(jamMulai: string, durasi: number): string {
  const [h, m] = jamMulai.split(":").map(Number);
  const total = h * 60 + m + durasi * 60;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export const SPACE_TYPES = {
  desk: "Personal Desk",
  meeting_room: "Meeting Room",
  private_office: "Private Office",
} as const;

export const RESERVATION_STATUS = {
  belum_dikonfirm: {
    label: "Menunggu Konfirmasi",
    color: "bg-[#C88A2B]/15 text-[#C88A2B] border-[#C88A2B]/30",
  },
  disetujui: {
    label: "Disetujui",
    color: "bg-[#4A6B5D]/15 text-[#4A6B5D] border-[#4A6B5D]/30",
  },
  aktif: {
    label: "Aktif",
    color: "bg-[#4A6B5D]/15 text-[#4A6B5D] border-[#4A6B5D]/30",
  },
  selesai: {
    label: "Selesai",
    color: "bg-[#333333]/10 text-[#333333] border-[#333333]/20",
  },
  dibatalkan: {
    label: "Dibatalkan",
    color: "bg-[#9E3B3B]/15 text-[#9E3B3B] border-[#9E3B3B]/30",
  },
} as const;
