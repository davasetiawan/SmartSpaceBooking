import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaymentService } from './payment.service';
import { MidtransService } from './midtrans.service';

@ApiTags('payment')
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private midtrans: MidtransService,
  ) {}

  @Post('reservasi/:reservasiId/pay')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buat transaksi pembayaran untuk reservasi' })
  async createPayment(
    @Request() req: { user: { id: number } },
    @Param('reservasiId') reservasiId: string,
    @Body('paymentMethodId') paymentMethodId: string,
  ) {
    return this.paymentService.createPaymentForReservation(
      Number(reservasiId),
      req.user.id,
      Number(paymentMethodId),
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Riwayat pembayaran user' })
  async getPaymentHistory(@Request() req: { user: { id: number } }) {
    return this.paymentService.getPaymentHistory(req.user.id);
  }

  @Get('status/:orderId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cek status pembayaran berdasarkan order ID' })
  async checkStatus(
    @Request() req: { user: { id: number } },
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.checkPaymentStatus(orderId);
  }

  @Post('midtrans/notification')
  @ApiOperation({ summary: 'Webhook notifikasi Midtrans (publik)' })
  async handleNotification(@Body() body: any) {
    return this.paymentService.handleMidtransNotification(body);
  }

  @Post(':orderId/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Batalkan transaksi pembayaran' })
  async cancelPayment(
    @Request() req: { user: { id: number } },
    @Param('orderId') orderId: string,
  ) {
    return this.midtrans.cancelTransaction(orderId);
  }

  @Post(':orderId/refund')
  @UseGuards(JwtAuthGuard)
  @Roles('admin_space')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Refund pembayaran (admin)' })
  async refundPayment(
    @Request() req: { user: { id: number } },
    @Param('orderId') orderId: string,
    @Body('amount') amount?: number,
    @Body('reason') reason?: string,
  ) {
    return this.midtrans.refundTransaction(orderId, amount, reason);
  }
}