import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiskonService {
  constructor(private prisma: PrismaService) {}

  async active() {
    const now = new Date();
    const items = await this.prisma.diskon.findMany({
      where: { tanggal_awal: { lte: now }, tanggal_akhir: { gte: now } },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async findActiveByCode(namaDiskon: string) {
    const now = new Date();
    return this.prisma.diskon.findFirst({
      where: {
        nama_diskon: namaDiskon.toUpperCase(),
        tanggal_awal: { lte: now },
        tanggal_akhir: { gte: now },
      },
    });
  }

  async check(namaDiskon: string) {
    const promo = await this.findActiveByCode(namaDiskon);
    if (!promo) {
      throw new NotFoundException(
        'Kode promo tidak ditemukan atau sudah kedaluwarsa!',
      );
    }
    return { data: promo };
  }

  async findOne(id: number) {
    const promo = await this.prisma.diskon.findUnique({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Diskon not found');
    }
    return { data: promo };
  }
}
