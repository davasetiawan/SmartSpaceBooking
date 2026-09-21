import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SpacesModule } from './spaces/spaces.module';
import { DiskonModule } from './diskon/diskon.module';
import { ReservasiModule } from './reservasi/reservasi.module';
import { AdminModule } from './admin/admin.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CloudinaryModule, PrismaModule, AuthModule, SpacesModule, DiskonModule, ReservasiModule, AdminModule, PaymentMethodModule],
  controllers: [AppController],
})
export class AppModule {}
