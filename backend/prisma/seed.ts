import { PrismaClient, SpaceType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const memberPassword = await bcrypt.hash('member123', 10);

  const adminUser = await prisma.users.upsert({
    where: { username: 'admin' },
    update: {
      email: 'admin@smartspace.com',
      role: 'admin_space',
    },
    create: {
      username: 'admin',
      email: 'admin@smartspace.com',
      password: adminPassword,
      role: 'admin_space',
    },
  });

  await prisma.space_owner.upsert({
    where: { id_user: adminUser.id },
    update: {
      nama_coworking: 'Smart Space Moklet',
      nama_pemilik: 'Administrator Smart Space',
      telp: '081234567890',
      alamat: 'Jl. Danau Ranau, Sawojajar, Kedungkandang, Kota Malang',
      deskripsi_fasilitas:
        'WiFi 100 Mbps, AC, pantry, parkir motor/mobil, ruang istirahat, dan printer.',
    },
    create: {
      id_user: adminUser.id,
      nama_coworking: 'Smart Space Moklet',
      nama_pemilik: 'Administrator Smart Space',
      telp: '081234567890',
      alamat: 'Jl. Danau Ranau, Sawojajar, Kedungkandang, Kota Malang',
      deskripsi_fasilitas:
        'WiFi 100 Mbps, AC, pantry, parkir motor/mobil, ruang istirahat, dan printer.',
    },
  });

  const memberUser = await prisma.users.upsert({
    where: { username: 'member' },
    update: {
      email: 'member@smartspace.com',
      role: 'member',
    },
    create: {
      username: 'member',
      email: 'member@smartspace.com',
      password: memberPassword,
      role: 'member',
    },
  });

  await prisma.member.upsert({
    where: { id_user: memberUser.id },
    update: {
      nama_member: 'Demo Member',
      instansi: 'SMK Telkom Malang',
      alamat: 'Jl. Danau Ranau, Sawojajar, Malang',
      telp: '081298765432',
    },
    create: {
      id_user: memberUser.id,
      nama_member: 'Demo Member',
      instansi: 'SMK Telkom Malang',
      alamat: 'Jl. Danau Ranau, Sawojajar, Malang',
      telp: '081298765432',
    },
  });

  const owner = await prisma.space_owner.findUniqueOrThrow({
    where: { id_user: adminUser.id },
  });

  const spaces: Array<{
    nama_space: string;
    harga_per_jam: number;
    tipe: SpaceType;
    kapasitas: number;
    deskripsi: string;
    kota: string;
    jalan: string;
  }> = [
    {
      nama_space: 'Personal Desk Flexi 01',
      harga_per_jam: 25000,
      tipe: 'desk',
      kapasitas: 1,
      deskripsi:
        'Meja kerja personal dengan kursi ergonomis, stopkontak, lampu baca, dan WiFi dedicated.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok A',
    },
    {
      nama_space: 'Personal Desk Flexi 02',
      harga_per_jam: 30000,
      tipe: 'desk',
      kapasitas: 1,
      deskripsi:
        'Meja kerja dekat jendela dengan pencahayaan alami, power outlet, dan akses pantry.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok A',
    },
    {
      nama_space: 'Meeting Room Alpha',
      harga_per_jam: 100000,
      tipe: 'meeting_room',
      kapasitas: 8,
      deskripsi:
        'Ruang rapat 8 orang, smart TV 55 inch, whiteboard, HDMI, dan AC.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok B',
    },
    {
      nama_space: 'Meeting Room Beta',
      harga_per_jam: 150000,
      tipe: 'meeting_room',
      kapasitas: 12,
      deskripsi:
        'Ruang rapat 12 orang, proyektor 4K, sound system, whiteboard, dan video conference kit.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok B',
    },
    {
      nama_space: 'Private Office Nova',
      harga_per_jam: 200000,
      tipe: 'private_office',
      kapasitas: 4,
      deskripsi:
        'Kantor privat berpintu, 4 meja kerja, filling cabinet, AC, dan akses 24 jam.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok C',
    },
    {
      nama_space: 'Private Office Orion',
      harga_per_jam: 275000,
      tipe: 'private_office',
      kapasitas: 6,
      deskripsi:
        'Kantor privat premium 6 orang, sofa tamu, TV, whiteboard, dan pantry mini.',
      kota: 'Malang',
      jalan: 'Jl. Danau Ranau Blok C',
    },
  ];

  for (const space of spaces) {
    const existing = await prisma.space.findFirst({
      where: { id_owner: owner.id, nama_space: space.nama_space },
    });

    if (existing) {
      await prisma.space.update({
        where: { id: existing.id },
        data: space,
      });
    } else {
      await prisma.space.create({
        data: { id_owner: owner.id, ...space },
      });
    }
  }

  const now = new Date();
  const end = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  await prisma.diskon.upsert({
    where: { nama_diskon: 'PROMOAGUSTUS' },
    update: {
      persentase_diskon: 20,
      tanggal_awal: now,
      tanggal_akhir: end,
    },
    create: {
      nama_diskon: 'PROMOAGUSTUS',
      persentase_diskon: 20,
      tanggal_awal: now,
      tanggal_akhir: end,
    },
  });

  await prisma.diskon.upsert({
    where: { nama_diskon: 'DISKONHEMAT10' },
    update: {
      persentase_diskon: 10,
      tanggal_awal: now,
      tanggal_akhir: end,
    },
    create: {
      nama_diskon: 'DISKONHEMAT10',
      persentase_diskon: 10,
      tanggal_awal: now,
      tanggal_akhir: end,
    },
  });

  const [userCount, ownerCount, memberCount, spaceCount, diskonCount] =
    await Promise.all([
      prisma.users.count(),
      prisma.space_owner.count(),
      prisma.member.count(),
      prisma.space.count({ where: { id_owner: owner.id } }),
      prisma.diskon.count(),
    ]);

  // Seed payment_method (QRIS & Bank Transfer)
  await prisma.payment_method.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      id_owner: owner.id,
      nama: 'Bank Transfer BCA',
      tipe: 'bank_transfer',
      nomor_rekening: '1234567890',
      atas_nama: 'Smart Space Moklet',
      is_aktif: true,
    },
  });

  await prisma.payment_method.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      id_owner: owner.id,
      nama: 'QRIS',
      tipe: 'qris',
      nomor_rekening: null,
      atas_nama: null,
      is_aktif: true,
    },
  });

  const paymentMethodCount = await prisma.payment_method.count();

  console.log('Seed selesai:');
  console.log({
    admin: { username: 'admin', password: 'admin123', role: 'admin_space' },
    member: { username: 'member', password: 'member123', role: 'member' },
    counts: {
      users: userCount,
      space_owner: ownerCount,
      member: memberCount,
      space: spaceCount,
      diskon: diskonCount,
      payment_method: paymentMethodCount,
    },
  });
}

main()
  .catch((error) => {
    console.error('Seed gagal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
