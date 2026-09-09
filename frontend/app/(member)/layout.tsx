import React from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
