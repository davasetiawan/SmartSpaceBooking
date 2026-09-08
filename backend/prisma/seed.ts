import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.users.upsert({
    where: { username: 'admin' },
    update: {
      email: 'admin@smartspace.com',
    },
    create: {
      username: 'admin',
      email: 'admin@smartspace.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin_space',
      space_owner: {
        create: {
          nama_coworking: 'Smart Space',
          nama_pemilik: 'Administrator',
          telp: '08123456789',
        },
      },
    },
  });

  const memberUser = await prisma.users.upsert({
    where: { username: 'member' },
    update: {
      email: 'member@smartspace.com',
    },
    create: {
      username: 'member',
      email: 'member@smartspace.com',
      password: await bcrypt.hash('member123', 10),
      role: 'member',
      member: {
        create: {
          nama_member: 'Demo Member',
          instansi: 'Public',
          alamat: 'Jakarta',
          telp: '08123456789',
        },
      },
    },
  });

  const owner = await prisma.space_owner.findUniqueOrThrow({
    where: { id_user: adminUser.id },
  });

  const existingSpaces = await prisma.space.count({
    where: { id_owner: owner.id },
  });

  if (existingSpaces === 0) {
    await prisma.space.createMany({
      data: [
        {
          id_owner: owner.id,
          nama_space: 'Desk Flexi 01',
          harga_per_jam: 25000,
          tipe: 'desk',
          kapasitas: 1,
          deskripsi: 'WiFi and power outlet',
        },
        {
          id_owner: owner.id,
          nama_space: 'Meeting Alpha',
          harga_per_jam: 100000,
          tipe: 'meeting_room',
          kapasitas: 8,
          deskripsi: 'Smart TV and whiteboard',
        },
      ],
    });
  }

  await prisma.diskon.upsert({
    where: { nama_diskon: 'WELCOME10' },
    update: {},
    create: {
      nama_diskon: 'WELCOME10',
      persentase_diskon: 10,
      tanggal_awal: new Date(),
      tanggal_akhir: new Date(Date.now() + 30 * 86400000),
    },
  });

  console.log({
    admin: { username: adminUser.username, email: 'admin@smartspace.com' },
    member: { username: memberUser.username, email: 'member@smartspace.com' },
  });
}

main().finally(() => prisma.$disconnect());
