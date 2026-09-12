import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Member Pages
import { HomePage } from './pages/HomePage';
import { KatalogPage } from './pages/KatalogPage';
import { DetailRuanganPage } from './pages/DetailRuanganPage';
import { FormReservasiPage } from './pages/FormReservasiPage';
import { RiwayatReservasiPage } from './pages/RiwayatReservasiPage';
import { ProfilPage } from './pages/ProfilPage';
import { QRScannerPage } from './pages/QRScannerPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin Pages & Layout
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminReservasiPage } from './pages/admin/AdminReservasiPage';
import { AdminRuanganPage } from './pages/admin/AdminRuanganPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminLaporanPage } from './pages/admin/AdminLaporanPage';
import { AdminLogPage } from './pages/admin/AdminLogPage';
import { AdminPengaturanPage } from './pages/admin/AdminPengaturanPage';

const MemberLayout: React.FC = () => (
  <div className="page-wrapper">
    <Header />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Member Public & Authenticated Routes */}
        <Route element={<MemberLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ruangan" element={<KatalogPage />} />
          <Route path="/ruangan/:id" element={<DetailRuanganPage />} />
          <Route path="/reservasi/baru" element={<FormReservasiPage />} />
          <Route path="/reservasi" element={<RiwayatReservasiPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/scanner" element={<QRScannerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin Dashboard & Management Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="reservasi" element={<AdminReservasiPage />} />
          <Route path="ruangan" element={<AdminRuanganPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="scanner" element={<QRScannerPage />} />
          <Route path="laporan" element={<AdminLaporanPage />} />
          <Route path="log" element={<AdminLogPage />} />
          <Route path="pengaturan" element={<AdminPengaturanPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
