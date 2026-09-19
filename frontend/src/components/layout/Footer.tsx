import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1c1b1b] text-[#fbf9f5] border-t border-[#30312e] mt-auto">
      <div className="w-full px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffffff] text-[#121212] flex items-center justify-center font-serif font-bold text-lg">
                W
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                WorkMates
              </span>
            </div>
            <p className="text-sm text-[#858383] max-w-md leading-relaxed font-light">
              Boutique hospitality meets architectural productivity. Reimagining executive workspaces, private studios, and sunlit salons across Jakarta, Bandung, Bali, and Surabaya.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#858383] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] inline-block animate-pulse"></span>
              <span>All 4 Sanctuaries Active & Operational 24/7</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#858383] font-semibold">
              Koleksi Ruang
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#e4e2de]">
              <li><Link href="/spaces" className="hover:text-white transition-colors">The Executive Studios</Link></li>
              <li><Link href="/spaces" className="hover:text-white transition-colors">Nordic Boardroom Salons</Link></li>
              <li><Link href="/spaces" className="hover:text-white transition-colors">Solarium Greenhouses</Link></li>
              <li><Link href="/spaces" className="hover:text-white transition-colors">Acoustic Focus Pods</Link></li>
              <li><Link href="/spaces" className="hover:text-white transition-colors">Stepped Amphitheater</Link></li>
            </ul>
          </div>

          {/* Network Cities */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#858383] font-semibold">
              Sanctuary Network
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#e4e2de]">
              <li><span className="text-white font-medium">Jakarta:</span> SCBD Lot 8 &amp; Senopati</li>
              <li><span className="text-white font-medium">Bandung:</span> Dago Atas Heritage</li>
              <li><span className="text-white font-medium">Bali:</span> Batu Bolong, Canggu</li>
              <li><span className="text-white font-medium">Surabaya:</span> Pakuwon City</li>
            </ul>
          </div>

          {/* Operations & Admin */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#858383] font-semibold">
              Operasional
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#e4e2de]">
              <li><Link href="/member/bookings" className="hover:text-white transition-colors">Pass &amp; Boarding Card</Link></li>
              <li><Link href="/member/history" className="hover:text-white transition-colors">Riwayat Sewa &amp; Faktur</Link></li>
              <li><Link href="/admin" className="hover:text-white text-[#4A6B5D] font-medium transition-colors">Executive Admin Portal</Link></li>
              <li><Link href="/admin/checkin" className="hover:text-white transition-colors">Front-Desk QR Scanner</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Autentikasi Member</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#30312e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858383]">
          <p>© 2026 WorkMates Architectural Sanctuaries. Designed in Sonder Editorial Style.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>100% Full-Width Grid</span>
            <span>JetBrains Mono Monetary</span>
            <span>Playfair Display Headlines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
