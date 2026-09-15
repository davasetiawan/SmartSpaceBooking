"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, LogOut, User as UserIcon, HelpCircle } from "lucide-react";
import { AuthUser, clearAuth, readAuthUser } from "@/lib/api";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    setUser(readAuthUser());
  }, [pathname]);

  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")
  ) {
    return null;
  }

  const logout = () => {
    clearAuth();
    setUser(null);
    setUserDropdownOpen(false);
    router.push("/auth");
  };

  const navLinks = [
    { href: "/", label: "Spaces" },
    { href: "/#explore-locations", label: "Locations" },
    { href: "/my-bookings", label: "Pesanan Saya" },
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EBE7DF]">
      <div className="w-full px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        {/* Left Section: Brand Identity & Pill Tag */}
        <div className="flex items-center gap-3.5">
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[#121212] hover:opacity-80 transition-opacity"
          >
            SMART SPACE
          </Link>
          <span className="hidden sm:inline-flex items-center text-[10px] tracking-widest text-[#666666] font-semibold uppercase px-2.5 py-0.5 rounded-full border border-[#EBE7DF] bg-[#F7F5F0]/80">
            COWORKING &amp; SANCTUARIES
          </span>
        </div>

        {/* Center Section: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold transition-colors flex flex-col items-center py-1",
                  active
                    ? "text-[#121212]"
                    : "text-[#666666] hover:text-[#121212]",
                )}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121212] mt-1" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: User Profile & Member Controls */}
        <div className="flex items-center gap-4">
          {user?.role === "admin_space" && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121212] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#121212]/90 transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
              <span>Owner Dashboard</span>
            </Link>
          )}

          <a
            href="#concierge"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#666666] hover:text-[#121212] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Concierge</span>
          </a>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-[#EBE7DF] bg-white px-3.5 py-1.5 shadow-xs hover:border-[#121212]/30 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#121212] text-white flex items-center justify-center text-[11px] font-bold uppercase">
                  {user.username.slice(0, 2)}
                </div>
                <span className="text-xs font-semibold text-[#121212] hidden sm:inline">
                  {user.username} {user.role === "admin_space" ? "(Owner)" : ""}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-[#EBE7DF] shadow-lg py-2 z-50">
                  {user.role === "admin_space" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#4A6B5D] hover:bg-[#FBF9F5] border-b border-[#EBE7DF]"
                    >
                      <UserIcon className="w-4 h-4" /> Space Owner Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#121212] hover:bg-[#FBF9F5]"
                  >
                    <UserIcon className="w-4 h-4" /> Profil Saya
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#121212] hover:bg-[#FBF9F5]"
                  >
                    <UserIcon className="w-4 h-4" /> Pesanan Saya
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border-t border-[#EBE7DF] mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-[#121212] text-white hover:bg-[#121212]/90 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-xs"
            >
              Login / Daftar
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#121212]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#EBE7DF] bg-[#FBF9F5] px-6 py-4 md:hidden space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#121212]"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={logout}
              className="block w-full text-left text-sm font-semibold text-rose-600 pt-2 border-t border-[#EBE7DF]"
            >
              Keluar ({user.username})
            </button>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#121212] pt-2 border-t border-[#EBE7DF]"
            >
              Login / Daftar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
