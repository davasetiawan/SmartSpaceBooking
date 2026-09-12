import React, { useEffect, useState } from 'react';
import { QrCode, CheckCircle2, AlertCircle, Camera, RefreshCw } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export const QRScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        setScanStatus('SUCCESS');
        scanner.clear();
      },
      (errorMessage) => {
        // ignore continuous scanning errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  const handleSimulateScan = () => {
    const mockCode = `SSB-20260908-${Math.floor(100 + Math.random() * 900)}`;
    setScanResult(mockCode);
    setScanStatus('SUCCESS');
  };

  const handleReset = () => {
    setScanResult(null);
    setScanStatus('IDLE');
    window.location.reload();
  };

  return (
    <div className="container scanner-page-root">
      <div className="scanner-header text-center">
        <span className="section-subtitle">AKSES QR CHECK-IN</span>
        <h1 className="font-serif scanner-title">Scan E-Ticket QR Code Pass</h1>
        <p className="scanner-desc">
          Arahkan kamera ke QR Code E-Ticket pada smartphone Anda untuk verifikasi dan check-in otomatis ke ruangan WorkMates.
        </p>
      </div>

      <div className="scanner-card-wrapper sonder-card">
        {scanStatus === 'IDLE' && (
          <div className="camera-box">
            <div id="reader" className="html5-qr-reader"></div>
            <div className="simulate-bar">
              <button onClick={handleSimulateScan} className="btn btn-outline btn-sm">
                <Camera size={16} /> Simulasikan Scan Pass (Demo)
              </button>
            </div>
          </div>
        )}

        {scanStatus === 'SUCCESS' && (
          <div className="result-box success">
            <CheckCircle2 size={56} className="success-icon" />
            <h2 className="font-serif">Verifikasi QR Code Berhasil!</h2>
            <div className="code-display font-mono">{scanResult}</div>
            <p className="result-text">Akses Pintu WorkMates Room 101 Diberikan. Sesi Anda Resmi Dimulai.</p>

            <button className="btn btn-primary btn-md mt-2" onClick={handleReset}>
              <RefreshCw size={16} /> Scan QR Code Lainnya
            </button>
          </div>
        )}
      </div>

      <style>{`
        .scanner-page-root {
          padding: 3rem 1.5rem;
          max-width: 680px;
        }

        .scanner-header {
          margin-bottom: 2.5rem;
        }
        .scanner-title {
          font-size: 2.5rem;
          color: var(--color-primary);
        }
        .scanner-desc {
          color: var(--text-secondary);
        }

        .scanner-card-wrapper {
          padding: 2rem;
        }

        .html5-qr-reader {
          width: 100%;
          border: none !important;
        }

        .simulate-bar {
          margin-top: 1.5rem;
          text-align: center;
        }

        .result-box {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-icon {
          color: #10B981;
          margin-bottom: 1rem;
        }
        .code-display {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary);
          background: var(--bg-secondary);
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius-pill);
          display: inline-block;
          margin: 1rem 0;
        }
        .result-text {
          color: var(--text-secondary);
        }
        .mt-2 { margin-top: 1.5rem; }
      `}</style>
    </div>
  );
};
