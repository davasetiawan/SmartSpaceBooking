"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { clearAuth, readAuthUser, api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const TABS = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/profile", label: "Property Profile" },
  { href: "/admin/members", label: "Member Directory" },
  { href: "/admin/spaces", label: "Space Inventory" },
  { href: "/admin/promos", label: "Promos & Discounts" },
  { href: "/admin/scanner", label: "Front Desk & QR" },
  { href: "/admin/reservations", label: "Master Bookings" },
  { href: "/admin/reports", label: "Financial Reports" },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("Space Owner");
  const [coworkingName, setCoworkingName] = useState("Sanctuary Hub");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const user = readAuthUser();
    setName(user?.space_owner?.nama_pemilik || user?.username || "Space Owner");
    setCoworkingName(user?.space_owner?.nama_coworking || "Jakarta Hub");

    // Fetch pending reservations count for notifications badge
    api.adminReservations({ status: "belum_dikonfirm" })
      .then((res) => setPendingCount(res.length))
      .catch(() => setPendingCount(0));
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.push("/auth");
  };

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EBE7DF] bg-[#FBF9F5]/90 backdrop-blur-md">
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* TIER 1: Header Bar */}
        <div className="flex items-center justify-between py-4 border-b border-[#EBE7DF]">
          {/* Brand & Executive Admin Badge */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/admin/dashboard"
              className="font-serif text-2xl font-bold tracking-tight text-[#121212] hover:opacity-80 transition-opacity"
            >
              WorkMates
            </Link>
            <span className="bg-[#EAE8E4] text-[#121212] text-xs font-semibold px-3 py-1 rounded-full border border-[#EBE7DF] uppercase tracking-wider">
              ADMIN PORTAL • {coworkingName}
            </span>
          </div>

          {/* Right Status Controls & Profile */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Live System Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-semibold border border-[#4A6B5D]/20">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
              <span>System Online / Front Desk Ready</span>
            </div>

            {/* Notification Bell Button */}
            <button
              type="button"
              onClick={() => router.push("/admin/reservations")}
              className="relative w-10 h-10 rounded-full border border-[#EBE7DF] bg-white flex items-center justify-center text-[#666666] hover:text-[#121212] hover:border-[#121212] transition-colors cursor-pointer"
              title="Reservasi Menunggu Konfirmasi"
            >
              <Bell className="w-4 h-4 text-[#121212]" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C88A2B] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Admin Profile Pill & Logout */}
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-[#EBE7DF] bg-white px-3 py-1.5 flex items-center gap-2.5 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-xs">
                  {getInitials(name)}
                </div>
                <span className="text-xs font-semibold text-[#121212] hidden md:inline-block">
                  {name} (Space Owner)
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-full border border-[#EBE7DF] bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                title="Keluar / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* TIER 2: Horizontal Navigation Tabs */}
        <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar pt-3 text-sm font-sans">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "whitespace-nowrap border-b-2 pb-3 font-semibold transition-colors text-xs uppercase tracking-wider",
                  active
                    ? "-mb-px border-[#121212] text-[#121212]"
                    : "border-transparent text-[#666666] hover:text-[#121212]",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
