import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as QRCode from 'qrcode';
import { PrismaService } from '../prisma/prisma.service';
import { SpacesService } from '../spaces/spaces.service';
import { DiskonService } from '../diskon/diskon.service';
import { CreateReservasiDto } from './dto/create-reservasi.dto';

@Injectable()
export class ReservasiService {
  constructor(
    private prisma: PrismaService,
    private spaces: SpacesService,
    private diskon: DiskonService,
  ) {}

  private async memberOf(userId: number) {
    const member = await this.prisma.member.findUnique({
      where: { id_user: userId },
    });
    if (!member) {
      throw new ForbiddenException('Member profile not found');
    }
    return member;
  }

  private generatePinAkses() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  private async generateKode(tx: Prisma.TransactionClient) {
    const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    const count = await tx.reservasi.count({
      where: { kode_booking: { startsWith: `BOOK-${today}-` } },
    });
    return `BOOK-${today}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(userId: number, dto: CreateReservasiDto, buktiFilename?: string) {
    if (!buktiFilename) {
      throw new BadRequestException('Foto bukti pembayaran wajib diupload');
    }
    const member = await this.memberOf(userId);
    const { exceedsDay } = this.spaces.calculateEndTimeStr(
      dto.jam_mulai,
      dto.durasi_jam,
    );
    if (exceedsDay) {
      throw new BadRequestException('Reservation must end on the same day');
    }
    const start = this.spaces.parseTime(dto.jam_mulai);
    const end = new Date(start.getTime() + dto.durasi_jam * 3600000);
    const tanggal = this.spaces.parseDateOnly(dto.tanggal_reservasi);

    const created = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const conflict = await this.spaces.hasConflict(
          dto.id_space,
          dto.tanggal_reservasi,
          dto.jam_mulai,
          dto.durasi_jam,
          undefined,
          tx,
        );
        if (conflict) {
          throw new BadRequestException(
            'Maaf, space sudah terisi atau dibooking pada jam tersebut!',
          );
        }
        const space = await tx.space.findUnique({
          where: { id: dto.id_space },
        });
        if (!space) {
          throw new NotFoundException('Space not found');
        }
        let promo = null;
        if (dto.nama_diskon) {
          promo = await tx.diskon.findFirst({
            where: {
              nama_diskon: dto.nama_diskon.toUpperCase(),
              tanggal_awal: { lte: new Date() },
              tanggal_akhir: { gte: new Date() },
            },
          });
          if (!promo) {
            throw new BadRequestException(
              'Kode promo tidak ditemukan atau sudah kedaluwarsa!',
            );
          }
        }
        if (dto.payment_method_id) {
          const paymentMethod = await tx.payment_method.findFirst({
            where: {
              id: dto.payment_method_id,
              id_owner: space.id_owner,
              is_aktif: true,
            },
          });
          if (!paymentMethod) {
            throw new BadRequestException('Metode pembayaran tidak aktif atau tidak ditemukan');
          }
        }

        const gross = space.harga_per_jam * dto.durasi_jam;
        const cut = gross * ((promo?.persentase_diskon ?? 0) / 100);
        return tx.reservasi.create({
          data: {
            kode_booking: await this.generateKode(tx),
            id_member: member.id,
            id_space: space.id,
            id_diskon: promo?.id,
            tanggal_reservasi: tanggal,
            jam_mulai: start,
            jam_selesai: end,
            durasi_jam: dto.durasi_jam,
            harga_per_jam: space.harga_per_jam,
            total_harga_awal: gross,
            potongan_diskon: cut,
            total_bayar: gross - cut,
            bukti_pembayaran: buktiFilename ?? null,
            pin_akses: this.generatePinAkses(),
          },
        });
      },
    );
    return { message: 'Reservation created', data: created };
  }

  async mine(userId: number) {
    const member = await this.memberOf(userId);
    const items = await this.prisma.reservasi.findMany({
      where: { id_member: member.id },
      include: { space: true, diskon: true },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async history(userId: number, month: number, year: number) {
    const member = await this.memberOf(userId);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const rows = await this.prisma.reservasi.findMany({
      where: {
        id_member: member.id,
        tanggal_reservasi: { gte: start, lt: end },
      },
      include: { space: true, diskon: true },
    });
    const totalPengeluaran = rows.reduce(
      (sum: number, row: { total_bayar: number }) => sum + row.total_bayar,
      0,
    );
    return {
      data: {
        total_reservasi: rows.length,
        total_pengeluaran: totalPengeluaran,
        items: rows,
      },
    };
  }

  async findOne(userId: number, role: string, id: number) {
    const item = await this.prisma.reservasi.findUnique({
      where: { id },
      include: { member: true, space: true, diskon: true },
    });
    if (!item) {
      throw new NotFoundException('Reservation not found');
    }
    if (role === 'member' && item.member.id_user !== userId) {
      throw new ForbiddenException();
    }
    return { data: item };
  }

  async eTicket(userId: number, role: string, id: number) {
    const item = await this.prisma.reservasi.findUnique({
      where: { id },
      include: { member: true, space: { include: { owner: true } }, diskon: true },
    });
    if (!item) {
      throw new NotFoundException('Reservation not found');
    }
    if (role === 'member' && item.member.id_user !== userId) {
      throw new ForbiddenException();
    }
    const payload = `VERIFY-RESERVASI-${item.id}-${item.kode_booking}`;
    return {
      data: {
        ...item,
        pin_akses: (item as any).pin_akses || '8899',
        ticket_number: `TICKET-MOKLET-${item.kode_booking.slice(5)}`,
        qr_payload: payload,
        qr_code: await QRCode.toDataURL(payload, {
          errorCorrectionLevel: 'H',
          margin: 4,
          scale: 10,
          color: { dark: '#000000', light: '#FFFFFF' },
        }),
      },
    };
  }

  async cancel(userId: number, id: number) {
    const member = await this.memberOf(userId);
    const item = await this.prisma.reservasi.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Reservation not found');
    }
    if (item.id_member !== member.id) {
      throw new ForbiddenException();
    }
    if (item.status === 'aktif' || item.status === 'selesai') {
      throw new BadRequestException('Reservation cannot be cancelled');
    }
    const updated = await this.prisma.reservasi.update({
      where: { id },
      data: { status: 'dibatalkan' },
    });
    return { message: 'Reservation cancelled', data: updated };
  }
}

