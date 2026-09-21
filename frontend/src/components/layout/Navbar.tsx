'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

interface NavItem {
  label: string;
  href: string;
  badge?: number;
  isSpecial?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { bookings, currentUser, logout } = useSpaceStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.status === 'active' || b.status === 'pending' || b.status === 'unverified').length;

  const isAdmin = currentUser?.role === 'admin_space' || currentUser?.role === 'maker';
  const isMember = currentUser?.role === 'member';

  const profileHref = isAdmin ? '/admin/profile' : '/member/profile';

  const navLinks: NavItem[] = isAdmin
    ? [
        { label: 'Dashboard Admin', href: '/admin' },
        { label: 'Kelola Space', href: '/admin/spaces' },
        { label: 'Reservasi Masuk', href: '/admin/reservations' },
        { label: 'Check-in Desk', href: '/admin/checkin' },
        { label: 'Voucher Promo', href: '/admin/vouchers' },
        { label: 'Data Member', href: '/admin/members' },
        { label: 'Keuangan', href: '/admin/finance' },
      ]
    : isMember
    ? [
        { label: 'Eksplor Ruang', href: '/spaces' },
        { label: 'Reservasi Baru', href: '/booking' },
        { label: 'Pass Saya', href: '/member/bookings', badge: activeBookingsCount > 0 ? activeBookingsCount : undefined },
        { label: 'Riwayat & Laporan', href: '/member/history' },
      ]
    : [
        { label: 'Eksplor Ruang', href: '/spaces' },
        { label: 'Reservasi', href: '/booking' },
        
      ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#EBE7DF]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#121212] bg-[#121212] shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src="/workmates-logo.jpg"
              alt="WorkMates Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight font-bold text-[#1b1c1a] leading-none">
              WorkMates
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#747878] font-mono font-bold mt-1">
              {isAdmin ? 'Admin Portal' : 'Sonder Architecture'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/admin');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm lg:text-base font-bold transition-all duration-200 flex items-center gap-2 ${
                  link.isSpecial
                    ? 'text-[#4A6B5D] bg-[#4A6B5D]/10 hover:bg-[#4A6B5D]/20 border border-[#4A6B5D]/30'
                    : isActive
                    ? 'text-[#121212] bg-[#efeeea] font-bold shadow-xs'
                    : 'text-[#333333] hover:text-[#121212] hover:bg-[#f5f3ef]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-[#4A6B5D] text-white text-xs font-mono flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Member/Admin Profile Link */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* Profile Badge (Direct Link to Get Profile Page) */}
              <Link
                href={profileHref}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#efeeea] border border-[#EBE7DF] hover:border-[#121212] hover:bg-[#eae8e4] transition-all cursor-pointer group text-left shadow-xs"
                title="Buka Halaman Profil (Get Profile)"
              >
                <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center text-sm font-bold font-serif group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                  {currentUser.memberProfile?.foto ? (
                    <img
                      src={currentUser.memberProfile.foto.startsWith('http') ? currentUser.memberProfile.foto : `http://localhost:3001/uploads/members/${currentUser.memberProfile.foto}`}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-[#121212] leading-tight max-w-[140px] truncate group-hover:text-[#4A6B5D] transition-colors">
                    {currentUser.name || currentUser.username}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#4A6B5D]">
                    {isAdmin ? 'ADMIN SPACE' : 'MEMBER PASS'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#747878] group-hover:text-[#121212] transition-colors ml-0.5">
                  account_circle
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Keluar dari Akun"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/spaces"
                className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs lg:text-sm font-semibold hover:bg-[#2b2b2b] transition-colors shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                <span>Pesan Ruang</span>
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#EBE7DF] bg-[#ffffff] text-xs lg:text-sm font-bold text-[#121212] hover:border-[#121212] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Masuk / Daftar</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full border border-[#EBE7DF] bg-white text-[#121212] hover:bg-[#efeeea]"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-[#EBE7DF] bg-[#fbf9f5] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-[#1b1c1a] hover:bg-[#efeeea] flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#4A6B5D] text-white text-xs font-mono font-bold">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#EBE7DF] flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link
                  href={profileHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#efeeea] text-[#121212] text-center text-sm font-bold flex items-center justify-center gap-2 border border-[#EBE7DF]"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>Profil Saya ({currentUser.name || currentUser.username})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="w-full py-3 rounded-full bg-red-600 text-white text-center text-sm font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Keluar Akun</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/spaces"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#121212] text-white text-center text-sm font-bold"
                >
                  Pesan Ruang Sekarang
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full border border-[#EBE7DF] bg-white text-center text-sm font-bold text-[#121212]"
                >
                  Autentikasi &amp; Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

