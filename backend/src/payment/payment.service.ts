import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MidtransService } from './midtrans.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private midtrans: MidtransService,
  ) {}

  async createPaymentForReservation(reservasiId: number, userId: number, paymentMethodId: number) {
    const reservasi = await this.prisma.reservasi.findUnique({
      where: { id: reservasiId },
      include: { 
        space: true, 
        member: {
          include: { users: true }
        }
      },
    });

    if (!reservasi) throw new NotFoundException('Reservasi tidak ditemukan');
    if (reservasi.id_member !== userId) throw new ForbiddenException('Tidak berhak membayar reservasi ini');

    const paymentMethod = await this.prisma.payment_method.findUnique({
      where: { id: paymentMethodId },
    });

    if (!paymentMethod) throw new NotFoundException('Metode pembayaran tidak ditemukan');
    if (!paymentMethod.is_aktif) throw new BadRequestException('Metode pembayaran tidak aktif');

    const existingPayment = await this.prisma.payment_transaction.findUnique({
      where: { id_reservasi: reservasiId },
    });

    if (existingPayment && existingPayment.status === 'pending') {
      throw new BadRequestException('Transaksi pembayaran sudah ada dan masih pending');
    }

    if (existingPayment && ['settlement', 'capture'].includes(existingPayment.status)) {
      throw new BadRequestException('Reservasi sudah dibayar');
    }

    const orderId = `SSB-${Date.now()}-${reservasiId}`;
    const grossAmount = reservasi.total_bayar;

    const midtransResponse: any = await this.midtrans.createTransaction({
      orderId,
      grossAmount,
      paymentMethodId: paymentMethod.id,
      customerDetails: {
        firstName: reservasi.member?.nama_member || 'Customer',
        email: reservasi.member?.users?.email || 'customer@example.com',
        phone: reservasi.member?.telp,
      },
      itemDetails: [{
        id: `space-${reservasi.id_space}`,
        price: reservasi.harga_per_jam,
        quantity: reservasi.durasi_jam,
        name: `Sewa ${reservasi.space?.nama_space || 'Ruangan'} (${reservasi.durasi_jam} jam)`,
      }],
    });

    const paymentTransaction = await this.prisma.payment_transaction.create({
      data: {
        id_reservasi: reservasiId,
        id_payment_method: paymentMethod.id,
        midtrans_order_id: midtransResponse.order_id,
        gross_amount: grossAmount,
        status: 'pending',
      },
    });

    return {
      paymentUrl: midtransResponse.redirect_url,
      orderId: midtransResponse.order_id,
      token: midtransResponse.token,
      grossAmount,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  }

  async createQrisForReservation(reservasiId: number, userId: number) {
    const reservasi = await this.prisma.reservasi.findUnique({
      where: { id: reservasiId },
      include: { 
        space: true, 
        member: {
          include: { users: true }
        }
      },
    });

    if (!reservasi) throw new NotFoundException('Reservasi tidak ditemukan');
    if (reservasi.id_member !== userId) throw new ForbiddenException('Tidak berhak membayar reservasi ini');

    const qrisMethod = await this.prisma.payment_method.findFirst({
      where: { tipe: 'qris', is_aktif: true },
    });

    if (!qrisMethod) throw new NotFoundException('Metode pembayaran QRIS tidak aktif atau tidak ditemukan');

    const orderId = `QRIS-${Date.now()}-${reservasiId}`;
    const grossAmount = reservasi.total_bayar;

    const midtransResponse: any = await this.midtrans.createQrisCharge({
      orderId,
      grossAmount,
      customerDetails: {
        firstName: reservasi.member?.nama_member || 'Customer',
        email: reservasi.member?.users?.email || 'customer@example.com',
        phone: reservasi.member?.telp,
      },
    });

    // Ambil QRIS URL dari actions
    const qrisAction = midtransResponse.actions?.find((a: any) => a.name === 'generate-qr-code');
    const qrisUrl = qrisAction?.url;

    await this.prisma.payment_transaction.create({
      data: {
        id_reservasi: reservasiId,
        id_payment_method: qrisMethod.id,
        midtrans_order_id: orderId,
        gross_amount: grossAmount,
        status: 'pending',
        payment_type: 'qris',
      },
    });

    return {
      qrisUrl,
      orderId,
      grossAmount,
      expiryTime: midtransResponse.expiry_time,
    };
  }

  async handleMidtransNotification(notificationJson: any) {
    const notification = await this.midtrans.handleNotification(notificationJson);
    
    const {
      order_id,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_time,
      va_numbers,
      gross_amount,
    } = notification;

    const paymentTransaction = await this.prisma.payment_transaction.findUnique({
      where: { midtrans_order_id: order_id },
      include: { payment_method: true },
    });

    if (!paymentTransaction) {
      throw new Error(`Payment transaction not found for order: ${order_id}`);
    }

    let newStatus = 'pending';
    let paymentType = payment_type;
    let transactionTime = transaction_time ? new Date(transaction_time) : null;
    let fraudStatus = fraud_status;

    switch (transaction_status) {
      case 'capture':
        newStatus = fraud_status === 'challenge' ? 'pending' : 'settlement';
        break;
      case 'settlement':
        newStatus = 'settlement';
        break;
      case 'pending':
        newStatus = 'pending';
        break;
      case 'deny':
      case 'cancel':
      case 'expire':
        newStatus = transaction_status;
        break;
      default:
        newStatus = 'failure';
    }

    const updateData: any = {
      status: newStatus,
      payment_type: paymentType,
      transaction_time: transactionTime,
      fraud_status: fraudStatus,
    };

    if (va_numbers) {
      updateData.va_numbers = JSON.stringify(va_numbers);
    }

    await this.prisma.payment_transaction.update({
      where: { id: paymentTransaction.id },
      data: updateData,
    });

    if (newStatus === 'settlement') {
      await this.prisma.reservasi.update({
        where: { id: paymentTransaction.id_reservasi },
        data: { status: 'disetujui' },
      });
    } else if (['deny', 'cancel', 'expire', 'failure'].includes(newStatus)) {
      await this.prisma.reservasi.update({
        where: { id: paymentTransaction.id_reservasi },
        data: { status: 'dibatalkan' },
      });
    }

    return { success: true, orderId: order_id, status: newStatus };
  }

  async checkPaymentStatus(orderId: string) {
    const paymentTransaction = await this.prisma.payment_transaction.findUnique({
      where: { midtrans_order_id: orderId },
      include: { payment_method: true },
    });

    if (!paymentTransaction) {
      throw new NotFoundException('Transaksi pembayaran tidak ditemukan');
    }

    const midtransStatus = await this.midtrans.getTransactionStatus(paymentTransaction.midtrans_order_id);
    
    return {
      orderId: paymentTransaction.midtrans_order_id,
      status: paymentTransaction.status,
      midtransStatus: midtransStatus.transaction_status,
      grossAmount: paymentTransaction.gross_amount,
      paymentType: paymentTransaction.payment_type,
    };
  }

  async getPaymentHistory(userId: number) {
    const member = await this.prisma.member.findFirst({
      where: { id_user: userId },
      select: { id: true },
    });

    if (!member) return [];

    const payments = await this.prisma.payment_transaction.findMany({
      where: {
        id_reservasi: {
          in: await this.prisma.reservasi.findMany({
            where: { id_member: member.id },
            select: { id: true },
          }).then(r => r.map(r => r.id)),
        },
      },
      include: {
        payment_method: true,
        reservasi: {
          include: { space: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return payments;
  }
}