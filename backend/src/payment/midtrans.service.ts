import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MidtransClient from 'midtrans-client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MidtransService {
  private snap: MidtransClient.Snap;
  private core: any;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    const isProduction = this.config.get('MIDTRANS_IS_PRODUCTION') === 'true';
    const serverKey = this.config.get('MIDTRANS_SERVER_KEY') || '';
    const clientKey = this.config.get('MIDTRANS_CLIENT_KEY') || '';
    
    this.snap = new MidtransClient.Snap({
      isProduction,
      serverKey,
      clientKey,
    });

    this.core = new MidtransClient.CoreApi({
      isProduction,
      serverKey,
      clientKey,
    });
  }

  async createTransaction(params: {
    orderId: string;
    grossAmount: number;
    paymentMethodId: number;
    customerDetails: {
      firstName: string;
      email: string;
      phone?: string;
    };
    itemDetails: Array<{
      id: string;
      price: number;
      quantity: number;
      name: string;
    }>;
  }) {
    const transactionParams = {
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.grossAmount,
      },
      customer_details: params.customerDetails,
      item_details: params.itemDetails,
      callbacks: {
        finish: `${this.config.get('FRONTEND_URL')}/reservasi/success`,
        error: `${this.config.get('FRONTEND_URL')}/reservasi/error`,
        pending: `${this.config.get('FRONTEND_URL')}/reservasi/pending`,
      },
    };

    try {
      const snapResponse = await this.snap.createTransaction(transactionParams);
      return snapResponse;
    } catch (error) {
      console.error('Midtrans Snap Error:', error);
      throw new InternalServerErrorException('Gagal membuat transaksi pembayaran');
    }
  }

  async handleNotification(notificationJson: any) {
    try {
      const statusResponse = await this.core.transaction.status(notificationJson.order_id);
      return statusResponse;
    } catch (error) {
      console.error('Midtrans Notification Error:', error);
      throw new BadRequestException('Gagal memproses notifikasi pembayaran');
    }
  }

  async getTransactionStatus(orderId: string) {
    try {
      const status = await this.core.transaction.status(orderId);
      return status;
    } catch (error) {
      console.error('Midtrans Status Error:', error);
      throw new InternalServerErrorException('Gagal mengambil status transaksi');
    }
  }

  async cancelTransaction(orderId: string) {
    try {
      await this.core.transaction.cancel(orderId);
      return { success: true };
    } catch (error) {
      console.error('Midtrans Cancel Error:', error);
      throw new InternalServerErrorException('Gagal membatalkan transaksi');
    }
  }

  async refundTransaction(orderId: string, amount?: number, reason?: string) {
    try {
      const refundParams: any = { order_id: orderId };
      if (amount) refundParams.amount = amount;
      if (reason) refundParams.reason = reason;

      const refund = await this.core.transaction.refund(refundParams);
      return refund;
    } catch (error) {
      console.error('Midtrans Refund Error:', error);
      throw new InternalServerErrorException('Gagal memproses refund');
    }
  }

  async createQrisCharge(params: {
    orderId: string;
    grossAmount: number;
    customerDetails: {
      firstName: string;
      email: string;
      phone?: string;
    };
  }) {
    const chargeParams = {
      payment_type: 'qris',
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.grossAmount,
      },
      customer_details: params.customerDetails,
      qris: {
        acquirer: 'gopay',
      },
    };

    try {
      const response = await this.core.charge(chargeParams);
      return response;
    } catch (error) {
      console.error('Midtrans QRIS Charge Error:', error);
      throw new InternalServerErrorException('Gagal membuat QRIS');
    }
  }
}