import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCoworkingProfileDto } from './dto/update-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member.dto';
import { UpdateMemberAdminDto } from './dto/update-member.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';
import { UpdateReservasiStatusDto } from './dto/update-reservasi-status.dto';
import { ReservasiStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async ownerOf(userId: number) {
    const owner = await this.prisma.space_owner.findUnique({
      where: { id_user: userId },
    });
    if (!owner) {
      throw new NotFoundException('Admin profile not found');
    }
    return owner;
  }

  async profile(userId: number) {
    return { data: await this.ownerOf(userId) };
  }

  async updateProfile(userId: number, dto: UpdateCoworkingProfileDto) {
    const owner = await this.ownerOf(userId);
    const updated = await this.prisma.space_owner.update({
      where: { id: owner.id },
      data: dto,
    });
    return { message: 'Profile updated', data: updated };
  }

  async members(search?: string) {
    const items = await this.prisma.member.findMany({
      where: search
        ? {
            OR: [
              { nama_member: { contains: search } },
              { instansi: { contains: search } },
              { telp: { contains: search } },
            ],
          }
        : undefined,
      include: { users: { select: { id: true, username: true } } },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async createMember(dto: CreateMemberAdminDto) {
    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        password: await bcrypt.hash(dto.password, 10),
        role: 'member',
        member: {
          create: {
            nama_member: dto.nama_member,
            instansi: dto.instansi,
            alamat: dto.alamat,
            telp: dto.telp,
            foto: dto.foto,
          },
        },
      },
      include: { member: true },
    });
    return { message: 'Member created', data: user };
  }

  async member(id: number) {
    const item = await this.prisma.member.findUnique({
      where: { id },
      include: { users: { select: { id: true, username: true } } },
    });
    if (!item) {
      throw new NotFoundException('Member not found');
    }
    return { data: item };
  }

  async updateMember(id: number, dto: UpdateMemberAdminDto) {
    const { password, ...data } = dto;
    const member = await this.prisma.member.update({ where: { id }, data });
    if (password) {
      await this.prisma.users.update({
        where: { id: member.id_user },
        data: { password: await bcrypt.hash(password, 10) },
      });
    }
    return { message: 'Member updated', data: member };
  }

  async deleteMember(id: number) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    await this.prisma.users.delete({ where: { id: member.id_user } });
    return { message: 'Member deleted', data: null };
  }

  async spaces(userId: number) {
    const owner = await this.ownerOf(userId);
    const items = await this.prisma.space.findMany({
      where: { id_owner: owner.id },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async createSpace(userId: number, dto: CreateSpaceDto) {
    const owner = await this.ownerOf(userId);
    const space = await this.prisma.space.create({
      data: { ...dto, id_owner: owner.id },
    });
    return { message: 'Space created', data: space };
  }

  async space(userId: number, id: number) {
    const owner = await this.ownerOf(userId);
    const item = await this.prisma.space.findFirst({ where: { id, id_owner: owner.id } });
    if (!item) {
      throw new NotFoundException('Space not found');
    }
    return { data: item };
  }

  async updateSpace(userId: number, id: number, dto: UpdateSpaceDto) {
    await this.space(userId, id);
    const item = await this.prisma.space.update({ where: { id }, data: dto });
    return { message: 'Space updated', data: item };
  }

  async deleteSpace(userId: number, id: number) {
    await this.space(userId, id);
    const active = await this.prisma.reservasi.count({
      where: {
        id_space: id,
        status: { in: ['belum_dikonfirm', 'disetujui', 'aktif'] },
      },
    });
    if (active) {
      throw new BadRequestException('Space has active reservations');
    }
    await this.prisma.space.delete({ where: { id } });
    return { message: 'Space deleted', data: null };
  }

  async discounts() {
    const items = await this.prisma.diskon.findMany({
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async createDiscount(dto: CreateDiskonDto) {
    const item = await this.prisma.diskon.create({
      data: {
        ...dto,
        nama_diskon: dto.nama_diskon.toUpperCase(),
        tanggal_awal: new Date(dto.tanggal_awal),
        tanggal_akhir: new Date(dto.tanggal_akhir),
      },
    });
    return { message: 'Diskon created', data: item };
  }

  async discount(id: number) {
    const item = await this.prisma.diskon.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Diskon not found');
    }
    return { data: item };
  }

  async updateDiscount(id: number, dto: UpdateDiskonDto) {
    const item = await this.prisma.diskon.update({
      where: { id },
      data: {
        ...dto,
        nama_diskon: dto.nama_diskon?.toUpperCase(),
        tanggal_awal: dto.tanggal_awal ? new Date(dto.tanggal_awal) : undefined,
        tanggal_akhir: dto.tanggal_akhir
          ? new Date(dto.tanggal_akhir)
          : undefined,
      },
    });
    return { message: 'Diskon updated', data: item };
  }

  async deleteDiscount(id: number) {
    await this.prisma.diskon.delete({ where: { id } });
    return { message: 'Diskon deleted', data: null };
  }

  async reservations(
    userId: number,
    query: {
      month?: string;
      year?: string;
      status?: ReservasiStatus;
      id_space?: string;
      tanggal?: string;
    },
  ) {
    const owner = await this.ownerOf(userId);
    const where: Record<string, unknown> = { space: { id_owner: owner.id } };
    if (query.status) {
      where.status = query.status;
    }
    if (query.id_space) {
      where.id_space = Number(query.id_space);
    }
    if (query.tanggal) {
      where.tanggal_reservasi = new Date(query.tanggal);
    } else if (query.month && query.year) {
      const start = new Date(Number(query.year), Number(query.month) - 1, 1);
      const end = new Date(Number(query.year), Number(query.month), 1);
      where.tanggal_reservasi = { gte: start, lt: end };
    }
    const items = await this.prisma.reservasi.findMany({
      where,
      include: { member: true, space: true, diskon: true },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  private async reservationOf(userId: number, id: number) {
    const owner = await this.ownerOf(userId);
    const item = await this.prisma.reservasi.findFirst({
      where: { id, space: { id_owner: owner.id } },
    });
    if (!item) {
      throw new NotFoundException('Reservation not found');
    }
    return item;
  }

  async updateStatus(userId: number, id: number, dto: UpdateReservasiStatusDto) {
    const item = await this.reservationOf(userId, id);
    if (item.status !== 'belum_dikonfirm' || !['disetujui', 'dibatalkan'].includes(dto.status)) {
      throw new BadRequestException('Invalid status transition');
    }
    const updated = await this.prisma.reservasi.update({ where: { id }, data: { status: dto.status } });
    return { message: 'Status updated', data: updated };
  }

  async checkIn(userId: number, id: number) {
    const item = await this.reservationOf(userId, id);
    if (item.status !== 'disetujui') {
      throw new BadRequestException('Only approved reservations can check in');
    }
    const updated = await this.prisma.reservasi.update({ where: { id }, data: { status: 'aktif', check_in_time: new Date() } });
    return { message: 'Checked in', data: updated };
  }

  async checkOut(userId: number, id: number) {
    const item = await this.reservationOf(userId, id);
    if (item.status !== 'aktif') {
      throw new BadRequestException('Only active reservations can check out');
    }
    const updated = await this.prisma.reservasi.update({ where: { id }, data: { status: 'selesai', check_out_time: new Date() } });
    return { message: 'Checked out', data: updated };
  }

  async report(userId: number, month: number, year: number) {
    const owner = await this.ownerOf(userId);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const rows = await this.prisma.reservasi.findMany({
      where: {
        status: 'selesai',
        tanggal_reservasi: { gte: start, lt: end },
        space: { id_owner: owner.id },
      },
      include: { space: true },
    });
    type Row = (typeof rows)[number];
    type Group = {
      tipe: string;
      total_booking: number;
      total_jam: number;
      total_pendapatan: number;
    };
    const perTipe = Object.values(
      rows.reduce((acc: Record<string, Group>, row: Row) => {
        const key = row.space.tipe;
        acc[key] ??= {
          tipe: key,
          total_booking: 0,
          total_jam: 0,
          total_pendapatan: 0,
        };
        acc[key].total_booking += 1;
        acc[key].total_jam += row.durasi_jam;
        acc[key].total_pendapatan += row.total_bayar;
        return acc;
      }, {}),
    );
    const daily = Object.values(
      rows.reduce((acc: Record<string, { tanggal: string; total: number }>, row: Row) => {
        const key = row.tanggal_reservasi.toISOString().slice(0, 10);
        acc[key] ??= { tanggal: key, total: 0 };
        acc[key].total += row.total_bayar;
        return acc;
      }, {}),
    );
    return {
      data: {
        total_transaksi: rows.length,
        total_jam: rows.reduce((sum: number, row: Row) => sum + row.durasi_jam, 0),
        pendapatan_kotor: rows.reduce(
          (sum: number, row: Row) => sum + row.total_harga_awal,
          0,
        ),
        total_diskon: rows.reduce(
          (sum: number, row: Row) => sum + row.potongan_diskon,
          0,
        ),
        pendapatan_bersih: rows.reduce(
          (sum: number, row: Row) => sum + row.total_bayar,
          0,
        ),
        per_tipe: perTipe,
        harian: daily,
      },
    };
  }
}
