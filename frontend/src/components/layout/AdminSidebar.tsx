'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { bookings } = useSpaceStore();

  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;

  const adminMenu = [
    { label: 'Executive Dashboard', href: '/admin', icon: 'dashboard' },
    { label: 'Inventory & Ruang (CRUD)', href: '/admin/spaces', icon: 'meeting_room' },
    { label: 'Monitoring Reservasi', href: '/admin/reservations', icon: 'table_chart', badge: pendingBookingsCount > 0 ? pendingBookingsCount : undefined },
    { label: 'Front-Desk QR Scanner', href: '/admin/checkin', icon: 'qr_code_scanner', highlight: true },
    { label: 'Voucher & Promo', href: '/admin/vouchers', icon: 'local_offer' },
    { label: 'Laporan Keuangan', href: '/admin/finance', icon: 'insights' },
    { label: 'Direktori Member', href: '/admin/members', icon: 'group' },
    { label: 'Profil Properti', href: '/admin/profile', icon: 'apartment' },
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#ffffff] border-r border-[#EBE7DF] flex flex-col justify-between shrink-0">
      <div>
        {/* Admin Header */}
        <div className="p-6 border-b border-[#EBE7DF] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#121212] flex items-center justify-center text-white">
              <span className="font-serif italic font-bold">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base text-[#1b1c1a]">WorkMates</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A6B5D] font-bold">
                Executive Portal
              </span>
            </div>
          </Link>
          <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D] animate-ping" title="System Live"></span>
        </div>

        {/* Navigation List */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#747878] font-semibold">
            Modul Operasional
          </div>
          {adminMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs lg:text-sm font-medium transition-all ${
                  item.highlight && !isActive
                    ? 'bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/30 font-semibold'
                    : isActive
                    ? 'bg-[#121212] text-white shadow-sm'
                    : 'text-[#444748] hover:text-[#121212] hover:bg-[#f5f3ef]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-[#C88A2B] text-white' : 'bg-[#C88A2B] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Switch back to Client */}
      <div className="p-4 border-t border-[#EBE7DF] bg-[#fbf9f5]">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#EBE7DF] bg-white text-xs font-semibold text-[#121212] hover:bg-[#efeeea] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Website Tamu</span>
        </Link>
      </div>
    </aside>
  );
}
