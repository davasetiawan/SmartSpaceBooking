import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  private async ownerIdOf(userId: number) {
    const owner = await this.prisma.space_owner.findUnique({
      where: { id_user: userId },
    });
    if (!owner) throw new NotFoundException('Admin profile not found');
    return owner.id;
  }

  async findAll(userId: number, aktifOnly = false) {
    const id_owner = await this.ownerIdOf(userId);
    const items = await this.prisma.payment_method.findMany({
      where: {
        id_owner,
        ...(aktifOnly ? { is_aktif: true } : {}),
      },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }

  async findOne(userId: number, id: number) {
    const id_owner = await this.ownerIdOf(userId);
    const item = await this.prisma.payment_method.findFirst({
      where: { id, id_owner },
    });
    if (!item) throw new NotFoundException('Metode pembayaran tidak ditemukan');
    return { data: item };
  }

  async create(userId: number, dto: CreatePaymentMethodDto) {
    const id_owner = await this.ownerIdOf(userId);
    const item = await this.prisma.payment_method.create({
      data: { ...dto, id_owner },
    });
    return { message: 'Metode pembayaran dibuat', data: item };
  }

  async update(userId: number, id: number, dto: UpdatePaymentMethodDto) {
    await this.findOne(userId, id);
    const item = await this.prisma.payment_method.update({
      where: { id },
      data: dto,
    });
    return { message: 'Metode pembayaran diperbarui', data: item };
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    const used = await this.prisma.payment_transaction.count({ where: { id_payment_method: id } });
    if (used) {
      const item = await this.prisma.payment_method.update({
        where: { id },
        data: { is_aktif: false },
      });
      return { message: 'Metode pembayaran sudah dipakai transaksi, jadi dinonaktifkan', data: item };
    }
    await this.prisma.payment_method.delete({ where: { id } });
    return { message: 'Metode pembayaran dihapus', data: null };
  }

  async findActivePublic() {
    const items = await this.prisma.payment_method.findMany({
      where: { is_aktif: true },
      orderBy: { created_at: 'desc' },
    });
    return { data: items };
  }
}