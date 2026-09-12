import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MidtransService } from './midtrans.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService, MidtransService],
  exports: [PaymentService, MidtransService],
})
export class PaymentModule {}