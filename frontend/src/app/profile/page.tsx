'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function GenericProfileRedirect() {
  const router = useRouter();
  const { currentUser } = useSpaceStore();

  useEffect(() => {
    const isAdmin = currentUser?.role === 'admin_space' || currentUser?.role === 'maker';
    if (isAdmin) {
      router.replace('/admin/profile');
    } else {
      router.replace('/member/profile');
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center space-y-3">
      <span className="material-symbols-outlined text-4xl text-[#4A6B5D] animate-spin">sync</span>
      <p className="text-sm font-mono font-bold text-[#747878]">Mengarahkan ke Halaman Profil...</p>
    </div>
  );
}
