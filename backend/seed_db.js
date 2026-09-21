const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Finance Seeder ---');

  // 1. Find or create Private Office space for owner 7 (Mr Inc)
  const ownerId = 7;
  let privateOffice = await prisma.space.findFirst({
    where: { id_owner: ownerId, tipe: 'private_office' }
  });

  if (!privateOffice) {
    privateOffice = await prisma.space.create({
      data: {
        id_owner: ownerId,
        nama_space: 'Executive Private Suite',
        kota: 'Jakarta Pusat',
        jalan: 'Jl. Jend. Sudirman No. 45',
        harga_per_jam: 350000,
        tipe: 'private_office',
        kapasitas: 8,
        deskripsi: 'Ruang kantor privat eksklusif dengan fasilitas lengkap, STC-52 soundproofing, dan jaringan gigabit.',
        foto: '/uploads/1789877893728-564065687.jpg',
      }
    });
    console.log('Created Private Office space:', privateOffice.id);
  }

  const spaces = await prisma.space.findMany({
    where: { id_owner: ownerId }
  });

  console.log('Available spaces for owner 7:', spaces.map(s => `${s.nama_space} (${s.tipe})`));

  // Find valid member
  const member = await prisma.member.findFirst();
  if (!member) {
    console.error('No member found in database!');
    return;
  }

  // Monthly breakdown config for 6 months (Apr 2026 - Sep 2026)
  const monthlyConfig = [
    { year: 2026, month: 4, count: 8, baseRevenue: 14500000 },
    { year: 2026, month: 5, count: 12, baseRevenue: 19800000 },
    { year: 2026, month: 6, count: 15, baseRevenue: 24200000 },
    { year: 2026, month: 7, count: 14, baseRevenue: 22600000 },
    { year: 2026, month: 8, count: 19, baseRevenue: 31000000 },
    { year: 2026, month: 9, count: 22, baseRevenue: 36500000 },
  ];

  let totalCreated = 0;

  for (const cfg of monthlyConfig) {
    const daysInMonth = new Date(cfg.year, cfg.month, 0).getDate();

    for (let i = 0; i < cfg.count; i++) {
      const day = Math.min(daysInMonth, Math.floor((i / cfg.count) * daysInMonth) + 1);
      const resDate = new Date(Date.UTC(cfg.year, cfg.month - 1, day));
      
      const sp = spaces[i % spaces.length];
      const durasi = (i % 4) + 2; // 2 to 5 hours
      const hargaPerJam = sp.harga_per_jam;
      const totalHarga = hargaPerJam * durasi;

      const bookingCode = `SEED-${cfg.year}${String(cfg.month).padStart(2, '0')}${String(day).padStart(2, '0')}-${String(i + 1).padStart(3, '0')}`;

      // Check if already exists
      const existing = await prisma.reservasi.findUnique({
        where: { kode_booking: bookingCode }
      });

      if (!existing) {
        const startTime = new Date(Date.UTC(1970, 0, 1, 8 + (i % 8), 0, 0));
        const endTime = new Date(Date.UTC(1970, 0, 1, 8 + (i % 8) + durasi, 0, 0));

        await prisma.reservasi.create({
          data: {
            kode_booking: bookingCode,
            id_member: member.id,
            id_space: sp.id,
            tanggal_reservasi: resDate,
            jam_mulai: startTime,
            jam_selesai: endTime,
            durasi_jam: durasi,
            harga_per_jam: hargaPerJam,
            total_harga_awal: totalHarga,
            potongan_diskon: 0,
            total_bayar: totalHarga,
            status: 'selesai',
            bukti_pembayaran: 'seed_payment.jpg',
            pin_akses: String(1000 + Math.floor(Math.random() * 9000)),
            check_in_time: new Date(resDate.getTime() + 8 * 3600 * 1000),
            check_out_time: new Date(resDate.getTime() + (8 + durasi) * 3600 * 1000),
          }
        });
        totalCreated++;
      }
    }
  }

  console.log(`Successfully seeded ${totalCreated} completed reservations across 6 months!`);
}

main()
  .then(() => prisma['$disconnect']())
  .catch((e) => {
    console.error('Seeder error:', e);
    prisma['$disconnect']();
  });
