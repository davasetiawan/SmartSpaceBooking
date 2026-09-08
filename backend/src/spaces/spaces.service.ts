import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpacesService {
  constructor(private prisma: PrismaService) {}

  types() {
    return { data: Object.values(SpaceType) };
  }

  async list(tipe?: SpaceType, search?: string) {
    const spaces = await this.prisma.space.findMany({
      where: {
        ...(tipe ? { tipe } : {}),
        ...(search
          ? {
              OR: [
                { nama_space: { contains: search } },
                { deskripsi: { contains: search } },
              ],
            }
          : {}),
      },
      include: { owner: true },
      orderBy: { created_at: 'desc' },
    });
    return { data: spaces };
  }

  async available() {
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now);
    const todayDate = new Date(todayStr);

    const timeStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
    const currentTime = this.parseTime(timeStr);

    // Cari space yang saat ini memiliki reservasi aktif (sedang berlangsung)
    const occupied = await this.prisma.reservasi.findMany({
      where: {
        tanggal_reservasi: todayDate,
        status: { in: ['belum_dikonfirm', 'disetujui', 'aktif'] },
        jam_mulai: { lte: currentTime },
        jam_selesai: { gt: currentTime },
      },
      select: { id_space: true },
    });

    const occupiedSpaceIds = occupied.map((r) => r.id_space);

    const spaces = await this.prisma.space.findMany({
      where: {
        ...(occupiedSpaceIds.length > 0
          ? { id: { notIn: occupiedSpaceIds } }
          : {}),
      },
      include: { owner: true },
      orderBy: { created_at: 'desc' },
    });

    return { data: spaces };
  }

  async findOne(id: number) {
    const space = await this.prisma.space.findUnique({
      where: { id },
      include: { owner: true },
    });
    if (!space) {
      throw new NotFoundException('Space not found');
    }
    return { data: space };
  }

  parseTime(value: string) {
    const [hour, minute] = value.split(':').map(Number);
    return new Date(Date.UTC(1970, 0, 1, hour, minute, 0));
  }

  async hasConflict(
    idSpace: number,
    tanggal: Date,
    jamMulai: Date,
    jamSelesai: Date,
    excludeId?: number,
  ) {
    return this.prisma.reservasi.count({
      where: {
        id_space: idSpace,
        tanggal_reservasi: tanggal,
        status: { in: ['belum_dikonfirm', 'disetujui', 'aktif'] },
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
        AND: [{ jam_mulai: { lt: jamSelesai } }, { jam_selesai: { gt: jamMulai } }],
      },
    });
  }

  async availability(
    idSpace: number,
    tanggal: string,
    jamMulai: string,
    durasiJam: number,
  ) {
    const start = this.parseTime(jamMulai);
    const end = new Date(start.getTime() + durasiJam * 3600000);
    if (end.getUTCDate() !== start.getUTCDate()) {
      return {
        data: {
          available: false,
          message: 'Reservation must end on the same day',
        },
      };
    }
    const count = await this.hasConflict(
      idSpace,
      new Date(tanggal),
      start,
      end,
    );
    return {
      data: {
        available: count === 0,
        message:
          count === 0
            ? 'Space available'
            : 'Maaf, space sudah terisi atau dibooking pada jam tersebut!',
      },
    };
  }
}
