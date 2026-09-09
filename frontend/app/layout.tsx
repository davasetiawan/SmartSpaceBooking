import type { Metadata } from 'next';
import { Prata, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const prata = Prata({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-prata',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Smart Space Booking — Curated Coworking & Meeting Spaces',
  description: 'Sistem Reservasi Ruangan Cerdas & Coworking Space berbasis Sonder UI Design. Solusi pemesanan ruang kerja, ruang rapat, dan event space.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="id"
      data-palette="warm" 
      data-dark="false" 
      data-density="cozy" 
      data-badge="pill" 
      data-font="prata" 
      data-corners="soft2" 
      data-hero="split"
      className={`${prata.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
