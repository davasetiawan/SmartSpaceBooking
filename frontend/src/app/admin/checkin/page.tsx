'use client';

import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { useSpaceStore } from '@/lib/SpaceStoreContext';
import { Booking } from '@/lib/mockData';

function AdminCheckinScannerContent() {
  const searchParams = useSearchParams();
  const { bookings, checkInGuestByCode } = useSpaceStore();

  const codeParam = searchParams.get('code') || '';
  const [inputCode, setInputCode] = useState(codeParam);
  const [scanResult, setScanResult] = useState<{ success: boolean; booking?: Booking; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentLogs, setRecentLogs] = useState<{ time: string; code: string; name: string; space: string; success: boolean }[]>([]);

  // Camera & QR Scanner State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');

  // Refs to prevent flickering & infinite re-render loops
  const checkInGuestByCodeRef = useRef(checkInGuestByCode);
  checkInGuestByCodeRef.current = checkInGuestByCode;

  const isScanningRef = useRef(false);
  const processedCodeParamRef = useRef<string | null>(null);
  const lastScannedTimeRef = useRef<{ code: string; time: number }>({ code: '', time: 0 });

  const handleScan = useCallback(async (codeToScan?: string) => {
    const code = (codeToScan || inputCode).trim();
    if (!code) return;

    // Throttle duplicate scan requests within 3 seconds
    const now = Date.now();
    if (
      lastScannedTimeRef.current.code === code &&
      now - lastScannedTimeRef.current.time < 3000
    ) {
      return;
    }

    if (isScanningRef.current) return;
    isScanningRef.current = true;
    lastScannedTimeRef.current = { code, time: now };

    try {
      const res = await checkInGuestByCodeRef.current(code);
      setScanResult(res);
      setIsModalOpen(true);

      const newLog = {
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        code: res.booking?.bookingCode || code,
        name: res.booking?.guestName || 'Tamu Tidak Terdaftar',
        space: res.booking?.spaceName || '-',
        success: res.success
      };

      setRecentLogs(prev => [newLog, ...prev.slice(0, 7)]);
    } catch (err: any) {
      const failRes = { success: false, message: err.message || 'Gagal memproses check-in' };
      setScanResult(failRes);
      setIsModalOpen(true);
    } finally {
      setTimeout(() => {
        isScanningRef.current = false;
      }, 1000);
    }
  }, [inputCode]);

  const startCamera = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera tidak didukung pada browser ini atau membutuhkan koneksi HTTPS / localhost.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(err.message || 'Gagal mengaktifkan kamera. Pastikan izin kamera diberikan.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Frame scanner loop
  useEffect(() => {
    let animationFrameId: number;
    let isMounted = true;

    const scanFrame = async () => {
      if (!isMounted) return;

      if (
        isCameraActive &&
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current || document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          try {
            const jsQRModule = (await import('jsqr')).default;
            const code = jsQRModule(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
            });

            if (code && code.data) {
              const scannedText = code.data.trim();
              const now = Date.now();
              if (
                scannedText !== lastScannedTimeRef.current.code ||
                now - lastScannedTimeRef.current.time > 3000
              ) {
                setInputCode(scannedText);
                handleScan(scannedText);
              }
            }
          } catch (e) {
            // Frame decode ignored
          }
        }
      }

      if (isMounted) {
        animationFrameId = requestAnimationFrame(scanFrame);
      }
    };

    if (isCameraActive) {
      scanFrame();
    }

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isCameraActive, handleScan]);

  // Handle URL codeParam ONCE on mount / parameter change
  useEffect(() => {
    if (!codeParam) return;
    if (processedCodeParamRef.current === codeParam) return;

    processedCodeParamRef.current = codeParam;
    handleScan(codeParam);
  }, [codeParam, handleScan]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      <Navbar />

      <main className="w-full flex-1 px-4 sm:px-8 lg:px-12 xl:px-16 py-8 overflow-y-auto">
        <div className="w-full space-y-8">
          
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
                <span className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-[#4A6B5D] animate-ping' : 'bg-[#C88A2B]'}`}></span>
                <span>{isCameraActive ? 'Optical Lens Active' : 'Camera Standby'}</span>
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
                <button
                  type="button"
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className="text-[10px] font-mono px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#C88A2B] font-bold transition-all"
                >
                  {isCameraActive ? 'Matikan Kamera' : 'Aktifkan Kamera'}
                </button>
              </div>

              {/* Viewfinder Lens Box */}
              <div className="relative w-full aspect-square rounded-2xl bg-black/80 border-2 border-dashed border-[#4A6B5D]/60 flex items-center justify-center overflow-hidden">
                {/* Live Video Feed */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isCameraActive ? 'opacity-100' : 'opacity-0 absolute'}`}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Crosshairs & Corner Guides */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/80 z-10 pointer-events-none"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/80 z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/80 z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/80 z-10 pointer-events-none"></div>

                {/* Laser Sweep Beam */}
                {isCameraActive && (
                  <div className="absolute left-0 right-0 h-1 bg-[#4A6B5D] animate-scanline shadow-lg shadow-[#4A6B5D] z-10 pointer-events-none"></div>
                )}

                {/* Center Target overlay when active */}
                {isCameraActive && (
                  <div className="absolute bottom-4 text-center z-10 pointer-events-none bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    <p className="text-[11px] font-mono text-white/90 font-medium">
                      Arahkan Kode QR / E-Ticket Pass ke Kamera
                    </p>
                  </div>
                )}

                {/* Placeholder when camera is inactive or denied */}
                {!isCameraActive && (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 select-none z-10">
                    <span className="material-symbols-outlined text-6xl text-white/30 animate-pulse">
                      videocam_off
                    </span>
                    <p className="text-xs font-mono text-white/60 max-w-xs">
                      {cameraError || 'Kamera belum diaktifkan. Klik tombol di bawah untuk mengaktifkan video kamera live.'}
                    </p>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-4 py-2.5 rounded-xl bg-[#4A6B5D] text-white text-xs font-mono font-bold hover:bg-[#3d594d] transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">videocam</span>
                      <span>Aktifkan Kamera Live</span>
                    </button>
                  </div>
                )}
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
                        setInputCode(b.keycardPin || b.bookingCode);
                        handleScan(b.keycardPin || b.bookingCode);
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left font-mono transition-all flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <span className="text-xs font-bold text-white block">
                          {b.bookingCode} <span className="text-[#C88A2B] text-[10px] font-normal">(PIN: {b.keycardPin})</span>
                        </span>
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

              {/* Static Scan Result Dossier */}
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
                    Belum ada pemindaian sesi ini. Gunakan kamera atau tombol simulasi di samping.
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

      {/* POP-UP INFO MODAL CHECK-IN RESULT */}
      {isModalOpen && scanResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-2xl space-y-6 relative overflow-hidden transition-all transform scale-100">
            
            {/* Modal Header Badge */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
              scanResult.success
                ? 'bg-[#4A6B5D]/10 border-[#4A6B5D]/30 text-[#4A6B5D]'
                : 'bg-[#9E3B3B]/10 border-[#9E3B3B]/30 text-[#9E3B3B]'
            }`}>
              <span className="material-symbols-outlined text-4xl shrink-0">
                {scanResult.success ? 'check_circle' : 'cancel'}
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold">
                  {scanResult.success ? 'CHECK-IN BERHASIL' : 'INFORMASI CHECK-IN'}
                </h3>
                <p className="text-xs font-mono font-medium opacity-90 mt-0.5">
                  {scanResult.success ? 'Akses Pintu Utama Diberikan (Granted)' : 'Periksa Detail Reservasi Tamu'}
                </p>
              </div>
            </div>

            {/* Main Status Message */}
            <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#EBE7DF]">
              <p className="text-xs sm:text-sm text-[#121212] font-mono font-semibold leading-relaxed">
                {scanResult.message}
              </p>
            </div>

            {/* Dossier info if booking exists */}
            {scanResult.booking && (
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#f5f3ef] font-mono text-xs border border-[#EBE7DF]">
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
                  <span className="text-[10px] text-[#747878] uppercase block">Keycard PIN</span>
                  <span className="font-bold text-[#121212] tracking-widest text-sm">{scanResult.booking.keycardPin}</span>
                </div>
                <div className="col-span-2 border-t border-[#EBE7DF] pt-2 mt-1">
                  <span className="text-[10px] text-[#747878] uppercase block">Sesi Waktu &amp; Tanggal</span>
                  <span className="font-bold text-[#121212]">{scanResult.booking.date} | {scanResult.booking.timeSlot}</span>
                </div>
              </div>
            )}

            {/* Close Modal Action */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setInputCode('');
                }}
                className="w-full py-3.5 rounded-2xl bg-[#121212] text-white font-mono text-xs font-bold hover:bg-[#4A6B5D] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                <span>Tutup &amp; Pindai Berikutnya</span>
              </button>
            </div>

          </div>
        </div>
      )}

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


