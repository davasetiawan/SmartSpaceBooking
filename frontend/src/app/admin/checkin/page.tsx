'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Booking } from '@/lib/mockData';

function AdminCheckinScannerContent() {
  const searchParams = useSearchParams();
  const { bookings, checkInGuestByCode } = useSpaceStore();

  const codeParam = searchParams.get('code') || '';
  const [inputCode, setInputCode] = useState(codeParam);
  const [scanResult, setScanResult] = useState<{ success: boolean; booking?: Booking; message: string } | null>(null);
  const [recentLogs, setRecentLogs] = useState<{ time: string; code: string; name: string; space: string; success: boolean }[]>([]);

  const handleScan = useCallback(async (codeToScan?: string) => {
    const code = codeToScan || inputCode;
    if (!code.trim()) return;

    try {
      const res = await checkInGuestByCode(code);
      setScanResult(res);

      const newLog = {
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        code: res.booking?.bookingCode || code,
        name: res.booking?.guestName || 'Tamu Tidak Terdaftar',
        space: res.booking?.spaceName || '-',
        success: res.success
      };

      setRecentLogs(prev => [newLog, ...prev.slice(0, 7)]);
    } catch (err: any) {
      setScanResult({ success: false, message: err.message || 'Gagal memproses check-in' });
    }
  }, [checkInGuestByCode, inputCode]);

  useEffect(() => {
    if (!codeParam) return;
    const timer = window.setTimeout(() => handleScan(codeParam), 0);
    return () => window.clearTimeout(timer);
  }, [codeParam, handleScan]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf9f5] text-[#1b1c1a]">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4A6B5D] font-bold block mb-1">
                EXPRESS RECEPTION &amp; TURNSTILE CONTROLLER
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#121212] tracking-tight">
                Front-Desk QR Scanner &amp; Check-In
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5e5e] font-light mt-1">
                Pindai pass digital tamu untuk verifikasi instan &lt; 0.5 detik dan aktivasi relay pintu otomatis.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-ping"></span>
                <span>Optical Lens Standby</span>
              </span>
            </div>
          </div>

          {/* Scanner & Manual Input Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Optical Camera Viewfinder (6 Cols) */}
            <div className="lg:col-span-6 bg-[#1c1b1b] rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A6B5D] text-xl">videocam</span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Front-Desk Camera Scanner Feed
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#C88A2B]">60 FPS / HD Optical</span>
              </div>

              {/* Viewfinder Lens Box */}
              <div className="relative w-full aspect-square rounded-2xl bg-black/60 border-2 border-dashed border-[#4A6B5D]/60 flex items-center justify-center overflow-hidden">
                {/* Crosshairs & Corner Guides */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/80"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/80"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/80"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/80"></div>

                {/* Laser Sweep Beam */}
                <div className="absolute left-0 right-0 h-1 bg-[#4A6B5D] animate-scanline shadow-lg shadow-[#4A6B5D]"></div>

                {/* Center Target */}
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 select-none">
                  <span className="material-symbols-outlined text-6xl text-white/30">
                    qr_code_scanner
                  </span>
                  <p className="text-xs font-mono text-white/60">
                    Arahkan Kode QR / E-Ticket Pass ke Area Ini
                  </p>
                </div>
              </div>

              {/* Quick Sample Click-to-Scan Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-white/50 block font-bold">
                  SIMULASI SCAN CEPAT DARI RESERVASI AKTIF:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bookings.slice(0, 4).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setInputCode(b.bookingCode);
                        handleScan(b.bookingCode);
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left font-mono transition-all flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <span className="text-xs font-bold text-white block">{b.bookingCode}</span>
                        <span className="text-[10px] text-white/60 truncate block">{b.guestName}</span>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-[#4A6B5D]">play_arrow</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Manual Code Input & Scan Results (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Manual Barcode Input Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#121212] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#121212]">keyboard</span>
                  <span>Input Manual Kode Pass / PIN</span>
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: WM-2026-8902 atau PIN"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                    className="flex-1 px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#fbf9f5] font-mono text-sm font-bold text-[#121212] uppercase focus:border-[#121212] outline-none"
                  />
                  <button
                    onClick={() => handleScan()}
                    className="px-6 py-3 rounded-xl bg-[#121212] text-white text-xs font-mono font-bold hover:bg-[#4A6B5D] transition-colors"
                  >
                    Validasi
                  </button>
                </div>
              </div>

              {/* Dynamic Scan Result Dossier */}
              {scanResult && (
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-4 transition-all ${
                  scanResult.success
                    ? 'bg-[#ffffff] border-[#4A6B5D]'
                    : 'bg-white border-[#9E3B3B]'
                }`}>
                  <div className="flex items-center justify-between border-b pb-3 border-[#EBE7DF]">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-2xl ${
                        scanResult.success ? 'text-[#4A6B5D]' : 'text-[#9E3B3B]'
                      }`}>
                        {scanResult.success ? 'check_circle' : 'error'}
                      </span>
                      <h4 className={`font-serif text-xl font-bold ${
                        scanResult.success ? 'text-[#4A6B5D]' : 'text-[#9E3B3B]'
                      }`}>
                        {scanResult.success ? 'Akses Terbuka (Granted)' : 'Akses Ditolak'}
                      </h4>
                    </div>

                    <span className="text-xs font-mono text-[#747878]">
                      Latency: 0.12s
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#121212] font-medium leading-relaxed font-mono">
                    {scanResult.message}
                  </p>

                  {scanResult.booking && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#EBE7DF] font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Nama Tamu</span>
                        <span className="font-bold text-[#121212] text-sm font-sans">{scanResult.booking.guestName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Ruang / Studio</span>
                        <span className="font-bold text-[#121212]">{scanResult.booking.spaceName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Alokasi Kursi</span>
                        <span className="font-bold text-[#4A6B5D] text-sm">{scanResult.booking.assignedSeat}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747878] uppercase block">Sesi Waktu</span>
                        <span className="font-bold text-[#121212]">{scanResult.booking.timeSlot}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Real-time Access Logs */}
              <div className="bg-white rounded-3xl p-6 border border-[#EBE7DF] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
                  <h4 className="font-serif text-base font-bold text-[#121212]">
                    Log Aktivitas Pintu Masuk
                  </h4>
                  <span className="text-[10px] font-mono text-[#747878]">Realtime Feed</span>
                </div>

                {recentLogs.length === 0 ? (
                  <p className="text-xs text-[#747878] font-mono text-center py-4">
                    Belum ada pemindaian sesi ini. Gunakan tombol simulasi di samping.
                  </p>
                ) : (
                  <div className="space-y-2 font-mono text-xs">
                    {recentLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#fbf9f5] border border-[#EBE7DF] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${log.success ? 'bg-[#4A6B5D]' : 'bg-[#9E3B3B]'}`}></span>
                          <span className="font-bold text-[#121212]">{log.name}</span>
                          <span className="text-[10px] text-[#747878]">({log.code})</span>
                        </div>
                        <span className="text-[10px] text-[#747878]">{log.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default function AdminCheckinScannerPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Memuat Scanner...</div>}>
      <AdminCheckinScannerContent />
    </Suspense>
  );
}
