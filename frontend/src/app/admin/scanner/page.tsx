"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  DoorOpen,
  DoorClosed,
  QrCode,
  Camera,
  RefreshCw,
} from "lucide-react";
import { api, apiErrorMessage, Reservation, isLoggedIn } from "@/lib/api";
import { cn, formatClock, formatDate, RESERVATION_STATUS } from "@/lib/utils";
import { Html5Qrcode } from "html5-qrcode";

export default function AdminScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    reservation: Reservation;
    action: "check-in" | "check-out";
  } | null>(null);
  const [error, setError] = useState("");
  const [lastScan, setLastScan] = useState<{ ok: boolean; message: string } | null>(null);
  const readerRef = useRef<Html5Qrcode | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn()) return;
    const reader = new Html5Qrcode("qr-reader");
    readerRef.current = reader;

    return () => {
      if (readerRef.current) {
        try {
          if (readerRef.current.isScanning) {
            readerRef.current.stop().catch(() => {});
          }
        } catch {}
      }
    };
  }, []);

  const startScan = async () => {
    if (!readerRef.current) return;
    if (readerRef.current.isScanning) return;
    setScanning(true);
    setError("");
    try {
      await readerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => handleScan(decodedText),
        () => {},
      );
    } catch (err) {
      setError("Gagal memulai kamera: " + (err as Error).message);
      setScanning(false);
    }
  };

  const stopScan = async () => {
    if (readerRef.current) {
      try {
        if (readerRef.current.isScanning) {
          await readerRef.current.stop();
        }
      } catch {}
    }
    setScanning(false);
  };

  const handleScan = async (text: string) => {
    const match = text.match(/VERIFY-RESERVASI-(\d+)-/);
    if (!match) {
      setLastScan({ ok: false, message: "Format QR Code tidak valid" });
      return;
    }
    const id = Number(match[1]);
    try {
      const reservation = await api.getReservation(id);
      let action: "check-in" | "check-out" | null = null;
      if (reservation.status === "disetujui") action = "check-in";
      else if (reservation.status === "aktif") action = "check-out";
      else {
        setLastScan({
          ok: false,
          message: `Status ${RESERVATION_STATUS[reservation.status]?.label || reservation.status} tidak dapat di-scan`,
        });
        return;
      }
      setResult({ reservation, action });
      await stopScan();
    } catch (err) {
      setLastScan({
        ok: false,
        message: apiErrorMessage(err, "Reservasi tidak ditemukan"),
      });
    }
  };

  const executeAction = async () => {
    if (!result) return;
    setError("");
    try {
      if (result.action === "check-in") {
        await api.checkIn(result.reservation.id);
        setLastScan({
          ok: true,
          message: `Check-in berhasil untuk kode ${result.reservation.kode_booking}`,
        });
      } else {
        await api.checkOut(result.reservation.id);
        setLastScan({
          ok: true,
          message: `Check-out berhasil untuk kode ${result.reservation.kode_booking}`,
        });
      }
      setResult(null);
      setTimeout(() => {
        setLastScan(null);
        startScan();
      }, 2000);
    } catch (err) {
      setError(apiErrorMessage(err, "Gagal memproses verifikasi"));
    }
  };

  const cancelAction = () => {
    setResult(null);
    startScan();
  };

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EBE7DF] pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#666666]">
            FRONT DESK OPERATIONS
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#121212] mt-1">
            Live QR Scanner & Keycard Pass
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Scan e-ticket digital tamu untuk verifikasi Check-In / Check-Out 1-Click secara instan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/20 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
            Scanner Ready
          </span>
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Camera View Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs"
        >
          <div className="p-4 border-b border-[#EBE7DF] flex items-center justify-between bg-[#FBF9F5]">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#121212]" />
              <h2 className="font-serif text-lg font-bold text-[#121212]">
                Kamera Barcode / QR Scanner
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {scanning ? (
                <button
                  onClick={stopScan}
                  className="rounded-full border border-[#EBE7DF] bg-white px-4 py-1.5 text-xs font-bold text-[#121212] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                >
                  Hentikan Kamera
                </button>
              ) : (
                <button
                  onClick={startScan}
                  disabled={result !== null}
                  className="rounded-full bg-[#121212] px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121212]/90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  Mulai Scan QR
                </button>
              )}
            </div>
          </div>

          <div className="relative aspect-video bg-[#121212] flex items-center justify-center overflow-hidden" ref={videoRef}>
            <div id="qr-reader" className="absolute inset-0 w-full h-full" />
            {!scanning && !result && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-6 text-center space-y-4">
                <div className="relative w-56 h-56 rounded-2xl border-2 border-dashed border-white/40 flex items-center justify-center">
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-white" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-white" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white" />
                  <QrCode className="w-16 h-16 text-white/30" />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-white">
                    Siap Membaca QR Pass
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Klik "Mulai Scan QR" dan dekatkan e-ticket digital tamu ke kamera.
                  </p>
                </div>
              </div>
            )}
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-rose-600/90 backdrop-blur-md text-white p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#EBE7DF] p-6 space-y-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE7DF] mb-4">
              <h2 className="font-serif text-xl font-bold text-[#121212]">
                Verifikasi Tamu
              </h2>
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#666666] bg-[#FBF9F5] px-2.5 py-0.5 rounded-full border border-[#EBE7DF]">
                AUTOMATED GATE
              </span>
            </div>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl border border-[#EBE7DF] bg-[#FBF9F5] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#121212]">
                        {result.reservation.kode_booking}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                          RESERVATION_STATUS[result.reservation.status].color,
                        )}
                      >
                        {RESERVATION_STATUS[result.reservation.status].label}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#121212]">
                        {result.reservation.space?.nama_space}
                      </h3>
                      <p className="text-xs text-[#666666] mt-0.5">
                        Guest: <strong className="text-[#121212]">{result.reservation.member?.nama_member}</strong> ({result.reservation.member?.instansi})
                      </p>
                      <p className="text-xs text-[#666666] mt-0.5">
                        Session: {formatDate(result.reservation.tanggal_reservasi)} • {formatClock(result.reservation.jam_mulai)} - {formatClock(result.reservation.jam_selesai)} ({result.reservation.durasi_jam} jam)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {result.action === "check-in" ? (
                      <>
                        <button
                          onClick={executeAction}
                          className="w-full rounded-full bg-[#4A6B5D] py-3 text-xs uppercase tracking-wider font-bold text-white flex items-center justify-center gap-2 hover:bg-[#4A6B5D]/90 transition-all cursor-pointer shadow-xs"
                        >
                          <DoorOpen className="w-4 h-4" />
                          <span>PROSES CHECK-IN (SESI AKTIF)</span>
                        </button>
                        <button
                          onClick={cancelAction}
                          className="w-full rounded-full border border-[#EBE7DF] bg-white py-2.5 text-xs font-semibold text-[#666666] hover:text-[#121212] transition-colors cursor-pointer"
                        >
                          Batal / Scan Ulang
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={executeAction}
                          className="w-full rounded-full bg-[#121212] py-3 text-xs uppercase tracking-wider font-bold text-white flex items-center justify-center gap-2 hover:bg-[#121212]/90 transition-all cursor-pointer shadow-xs"
                        >
                          <DoorClosed className="w-4 h-4" />
                          <span>PROSES CHECK-OUT (SELESAI)</span>
                        </button>
                        <button
                          onClick={cancelAction}
                          className="w-full rounded-full border border-[#EBE7DF] bg-white py-2.5 text-xs font-semibold text-[#666666] hover:text-[#121212] transition-colors cursor-pointer"
                        >
                          Batal / Scan Ulang
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[#666666] py-10 space-y-3"
                >
                  <div className="w-16 h-16 mx-auto rounded-full border border-[#EBE7DF] bg-[#FBF9F5] flex items-center justify-center">
                    <User className="w-8 h-8 text-[#666666]" />
                  </div>
                  <div>
                    <p className="font-serif text-base font-bold text-[#121212]">
                      Menunggu QR Scan Tamu
                    </p>
                    <p className="text-xs text-[#666666] mt-1 max-w-xs mx-auto">
                      Arahkan kamera ke e-ticket digital tamu untuk memunculkan konfirmasi Check-in atau Check-out.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {lastScan && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-2xl p-3.5 text-xs font-semibold flex items-center gap-2.5 border",
                lastScan.ok
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-800 border-rose-200",
              )}
            >
              {lastScan.ok ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{lastScan.message}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}