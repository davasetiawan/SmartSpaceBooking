# DESIGN SYSTEM & UI/UX SPECIFICATION (`design.md`)
## Smart Space Booking – Coworking Space & Workstation App
**Paket Ujian Kompetensi Keahlian (UKK) RPL 2026/2027 – Paket B**

---

## 1. Konsep & Filosofi Desain

Aplikasi **Smart Space Booking** mengadopsi 100% gaya visual dan bahasa desain dari **[Sonder.com](https://www.sonder.com/)**. Konsep ini mengusung *architectural minimalism* dan *luxury hospitality feel*, memberikan pengalaman menyewa ruangan kerja serasa memesan kamar di hotel boutique mewah.

### Prinsip Utama Visual:
* **Spacious & Uncluttered**: Penggunaan *whitespace* yang luas dan proporsional untuk memberikan kesan tenang dan fokus.
* **Warm Luxury Neutral**: Penggunaan warna *off-white* hangat yang nyaman di mata, diimbangi dengan teks kontras tinggi berwarna *ink charcoal*.
* **High-Fashion Typography**: Kombinasi font Serif klasik untuk judul/headline dan Sans-Serif modern untuk teks antarmuka (UI) dan formulir.
* **Editorial Photography**: Penyajian gambar fasilitas/ruangan bergaya arsitektural dengan pencahayaan alami (*ambient lighting*).

---

## 2. Token Desain (Design Tokens)

### 2.1 Palet Warna (Color Palette)

| Kategori | Nama Warna | Hex Code | Penggunaan UI |
|---|---|---|---|
| **Background** | Warm Off-White | `#FBF9F5` | Background utama halaman & modal |
| **Surface Layer** | Pure White / Card | `#FFFFFF` | Background kartu space, form container |
| **Neutral Primary** | Ink Charcoal | `#121212` | Teks utama, heading, tombol CTA utama |
| **Neutral Secondary** | Taupe Grey | `#666666` | Label, subtext, deskripsi singkat |
| **Borders & Lines** | Warm Neutral Divider | `#EBE7DF` | Garis pemisah, border input, border kartu |
| **Status Accent** | Sage Green | `#4A6B5D` | Status `aktif` / `disetujui` |
| **Status Accent** | Warm Amber | `#C88A2B` | Status `belum_dikonfirm` (pending) |
| **Status Accent** | Muted Crimson | `#9E3B3B` | Status `dibatalkan` |
| **Status Accent** | Neutral Dark | `#333333` | Status `selesai` |

### 2.2 Tipografi (Typography)

* **Heading / Titles**: *Playfair Display* / *Georgia* / Serif (Elegance, Hospitality feel)
  * `H1 (Page Title)`: 36px | Bold / Medium | Line-height: 1.2
  * `H2 (Section Heading)`: 28px | Medium | Line-height: 1.3
  * `H3 (Card Title)`: 20px | Medium | Line-height: 1.4
* **Body & UI Elements**: *Plus Jakarta Sans* / *Inter* / Sans-Serif (Clean, Readable)
  * `Body Regular`: 14px – 16px | Regular | Line-height: 1.6
  * `Button & Badges`: 12px – 14px | Medium / SemiBold | Letter-spacing: 0.5px (Uppercase/Capitalized)
* **Code & Monetary**: *JetBrains Mono* / Monospace
  * `Kode Booking & Nominal`: 14px – 16px | Medium | Digunakan untuk `kode_booking` dan nominal harga Rp (IDR).

### 2.3 Bentuk & Komponen (Shape & Spacing)

* **Border Radius**:
  * Cards & Modals: `16px` (Rounded halus khas Sonder)
  * Input Fields & Buttons: `9999px` (Pill-shaped) atau `10px` (Soft rounded)
  * Photo Thumbnails: `12px`
* **Elevasi & Shadow**:
  * Flat minimal border (`1px solid #EBE7DF`) sebagai pengganti drop shadow tebal.
  * *Subtle Hover Shadow*: `0 8px 24px rgba(0, 0, 0, 0.04)` saat kartu di-hover.

---

## 3. Pemetaan 16 Layar Antarmuka (Screen Map)

### 3.1 Modul Member / Pengunjung (7 Layar)
1. **[SCR-MEM-01] Register Akun Member**: Split-screen layout dengan foto arsitektural di kiri dan form pendaftaran di kanan (termasuk upload foto profil).
2. **[SCR-MEM-02] Login Member**: Form autentikasi minimalis berpola floating input khas Sonder.
3. **[SCR-MEM-03] Homepage & Katalog Space**: Katalog grid 3-kolom dengan filter kategori pill (`Personal Desk`, `Meeting Room`, `Private Office`) dan search bar mengambang.
4. **[SCR-MEM-04] Form Reservasi & Availability Checker**: Split layout antara galeri foto ruangan dan form *booking engine* sticky (date/time picker, promo code input, dan breakdown tagihan).
5. **[SCR-MEM-05] Status Pemesanan Saya (My Bookings)**: Daftar kartu reservasi aktif & pending lengkap dengan badge status warna khas Sonder.
6. **[SCR-MEM-06] Histori Pemesanan & Pengeluaran**: Ringkasan akumulasi pengeluaran bulanan dan tabel riwayat transaksi selesai.
7. **[SCR-MEM-07] E-Ticket Digital & Pass**: Tampilan kartu nota digital bergaya *boarding pass* hotel lengkap dengan **QR Code** untuk check-in dan tombol cetak PDF.

### 3.2 Modul Admin Pengelola Space (9 Layar)
1. **[SCR-ADM-01] Auth Admin (Register & Login)**: Portal eksekutif pengelola space dengan tema *warm charcoal & off-white*.
2. **[SCR-ADM-02] Profil Lokasi Coworking**: Manajemen informasi gedung, nomor CS WhatsApp, dan daftar fasilitas umum.
3. **[SCR-ADM-03] Data Member (CRUD Member)**: Direktori pelanggan dengan tabel luas, fitur pencarian cepat, modal tambah/edit member.
4. **[SCR-ADM-04] Data Space (CRUD Ruangan & Meja)**: Katalog inventaris ruangan/meja untuk tambah unit, edit tarif sewa, dan upload foto.
5. **[SCR-ADM-05] Data Promo & Diskon Event**: Panel manajemen kode voucher (persentase potongan & tanggal berlaku).
6. **[SCR-ADM-06] Operasional Front-Desk & QR Scanner**: Layar scanner QR Code kamera interaktif untuk proses **1-Click Check-In** dan **Check-Out** tamu.
7. **[SCR-ADM-07] Detail & Inspeksi Reservasi**: Modal rincian transaksi lengkap dengan kontrol ubah status (`disetujui`, `aktif`, `selesai`, `dibatalkan`).
8. **[SCR-ADM-08] Master Log Reservasi**: Tabel pemantauan seluruh transaksi masuk dengan filter kombinasi status, bulan, tahun, dan unit space.
9. **[SCR-ADM-09] Rekapitulasi Laporan Keuangan & Analitik Visual**: Dashboard finansial bulanan dengan 5 kartu indikator metrik, *Line Chart* tren pendapatan harian, dan *Donut Chart* kontribusi tipe space.

---

## 4. Ketentuan Aksesibilitas & Responsivitas

1. **Responsif**: Layar dapat beradaptasi secara mulus (*Adaptive Layout*) dari monitor penguji (Desktop 1920x1080), Tablet (iPad 1024x768), hingga perangkat Mobile (375x812).
2. **Print-Friendly (E-Ticket)**: Menggunakan `@media print` khusus pada layar E-Ticket agar saat di-print atau di-export ke PDF, komponen navigasi web otomatis tersembunyi dan tiket tercetak rapi di kertas A4/Struk.