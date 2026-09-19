'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { getStoredToken } from '@/lib/api';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, loading } = useSpaceStore();

  useEffect(() => {
    if (loading) return;

    const token = getStoredToken();
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    // 1. If route is not public and user is not authenticated, redirect immediately to /login
    if (!isPublic && !token && !currentUser) {
      router.replace('/login');
      return;
    }

    // 2. If user is a member but tries to access /admin routes, redirect to /member/bookings
    if (currentUser && currentUser.role === 'member' && pathname.startsWith('/admin')) {
      router.replace('/member/bookings');
      return;
    }
  }, [pathname, currentUser, loading, router]);

  const token = getStoredToken();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  // Show minimalist architectural loading spinner while checking auth session on protected routes
  if (loading && !isPublic) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fbf9f5] text-[#121212] font-mono text-xs">
        <div className="w-10 h-10 rounded-full border-2 border-[#EBE7DF] border-t-[#121212] animate-spin mb-4"></div>
        <span>Memverifikasi Sesi Autentikasi WorkMates...</span>
      </div>
    );
  }

  // Block rendering protected content if unauthenticated
  if (!isPublic && !token && !currentUser) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fbf9f5] text-[#121212] font-mono text-xs">
        <div className="w-10 h-10 rounded-full border-2 border-[#EBE7DF] border-t-[#121212] animate-spin mb-4"></div>
        <span>Mengalihkan ke Halaman Login...</span>
      </div>
    );
  }

  return <>{children}</>;
}
