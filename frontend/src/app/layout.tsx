import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Space Booking | Coworking & Workspace Rental",
  description:
    "Pesan meja kerja, ruang rapat, dan kantor pribadi premium dengan mudah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-bg-primary)] font-sans text-[var(--color-text-primary)] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
