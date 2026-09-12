import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async findAll(ownerId: number, aktifOnly = false) {
    const items = await this.prisma.payment_method.findMany({
      where: {
        id_owner: ownerId,
        ...(aktifOnly ? { is_aktif: true } : {}),
      },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async findOne(ownerId: number, id: number) {
    const item = await this.prisma.payment_method.findFirst({
      where: { id, id_owner: ownerId },
    });
    if (!item) throw new NotFoundException('Metode pembayaran tidak ditemukan');
    return { data: item };
  }

  async create(ownerId: number, dto: CreatePaymentMethodDto) {
    const item = await this.prisma.payment_method.create({
      data: { ...dto, id_owner: ownerId },
    });
    return { message: 'Metode pembayaran dibuat', data: item };
  }

  async update(ownerId: number, id: number, dto: UpdatePaymentMethodDto) {
    await this.findOne(ownerId, id);
    const item = await this.prisma.payment_method.update({
      where: { id },
      data: dto,
    });
    return { message: 'Metode pembayaran diperbarui', data: item };
  }

  async remove(ownerId: number, id: number) {
    await this.findOne(ownerId, id);
    await this.prisma.payment_method.delete({ where: { id } });
    return { message: 'Metode pembayaran dihapus', data: null };
  }

  async findActiveForOwner(ownerId: number) {
    const items = await this.prisma.payment_method.findMany({
      where: { id_owner: ownerId, is_aktif: true },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }
}