import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpaceStoreProvider } from "@/lib/SpaceStoreContext";
import AuthGuard from "@/components/auth/AuthGuard";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkMates — Sonder-Inspired Architectural Coworking & Private Studios",
  description: "Boutique workspaces, private studios, and meeting sanctuaries designed with architectural calm and effortless flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#fbf9f5] text-[#1b1c1a] antialiased selection:bg-[#121212] selection:text-white">
        <SpaceStoreProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </SpaceStoreProvider>
      </body>
    </html>
  );
}

