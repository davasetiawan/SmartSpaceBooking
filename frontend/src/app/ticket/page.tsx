'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSpaceStore } from '@/lib/SpaceStoreContext';

export default function TicketIndexPage() {
  const router = useRouter();
  const { bookings } = useSpaceStore();

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      router.replace(`/ticket/${bookings[0].id}`);
    } else {
      router.replace('/spaces');
    }
  }, [bookings, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fbf9f5]">
      <div className="flex items-center gap-3 text-sm font-mono text-[#747878]">
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
        <span>Memuat Digital Pass...</span>
      </div>
    </div>
  );
}
