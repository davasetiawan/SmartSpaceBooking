import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SpaceType } from '@prisma/client';
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

    const timeStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);

    // Cari space yang saat ini memiliki reservasi aktif (sedang berlangsung)
    const occupied = await this.prisma.$queryRaw<Array<{ id_space: number }>>`
      SELECT DISTINCT id_space
      FROM reservasi
      WHERE DATE(tanggal_reservasi) = ${todayStr}
        AND status IN ('belum_dikonfirm', 'disetujui', 'aktif')
        AND jam_mulai <= ${timeStr}
        AND jam_selesai > ${timeStr}
    `;

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

  parseDateOnly(value: string) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  dateOnlyRange(value: string | Date) {
    const start = value instanceof Date
      ? this.parseDateOnly(value.toISOString().slice(0, 10))
      : this.parseDateOnly(value);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return { start, end };
  }

  formatTimeStr(val: string): string {
    if (!val) return '00:00:00';
    const parts = val.split(':');
    const h = (parts[0] || '00').padStart(2, '0');
    const m = (parts[1] || '00').padStart(2, '0');
    const s = (parts[2] || '00').padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  calculateEndTimeStr(
    jamMulaiStr: string,
    durasiJam: number,
  ): { endTimeStr: string; exceedsDay: boolean } {
    const parts = jamMulaiStr.split(':');
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1] || '0', 10);
    const totalMins = h * 60 + m + Math.round(durasiJam * 60);
    const endH = Math.floor(totalMins / 60);
    const endM = totalMins % 60;
    const exceedsDay = endH > 24 || (endH === 24 && endM > 0);
    const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}:00`;
    return { endTimeStr, exceedsDay };
  }

  async hasConflict(
    idSpace: number,
    tanggal: string | Date,
    jamMulaiStr: string,
    durasiJam: number,
    excludeId?: number,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const prismaClient = tx || this.prisma;
    const cleanDateStr = typeof tanggal === 'string'
      ? tanggal.slice(0, 10)
      : tanggal.toISOString().slice(0, 10);
    const startStr = this.formatTimeStr(jamMulaiStr);
    const { endTimeStr } = this.calculateEndTimeStr(jamMulaiStr, durasiJam);

    const excludeFilter = excludeId
      ? Prisma.sql`AND id != ${Number(excludeId)}`
      : Prisma.empty;

    const result = await prismaClient.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) as count
      FROM reservasi
      WHERE id_space = ${Number(idSpace)}
        AND DATE(tanggal_reservasi) = ${cleanDateStr}
        AND status IN ('belum_dikonfirm', 'disetujui', 'aktif')
        ${excludeFilter}
        AND jam_mulai < ${endTimeStr}
        AND jam_selesai > ${startStr}
    `;

    const count = Number(result[0]?.count ?? 0);
    return count > 0;
  }

  async availability(
    idSpace: number,
    tanggal: string,
    jamMulai: string,
    durasiJam: number,
  ) {
    const { exceedsDay } = this.calculateEndTimeStr(jamMulai, durasiJam);
    if (exceedsDay) {
      return {
        data: {
          available: false,
          message: 'Reservation must end on the same day',
        },
      };
    }
    const conflict = await this.hasConflict(
      idSpace,
      tanggal,
      jamMulai,
      durasiJam,
    );
    return {
      data: {
        available: !conflict,
        message:
          !conflict
            ? 'Space available'
            : 'Maaf, space sudah terisi atau dibooking pada jam tersebut!',
      },
    };
  }
}

