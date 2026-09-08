import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MakerService } from './maker.service';
import { MakerController } from './maker.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

/**
 * MakerModule - Modul untuk manajemen Maker (Siswa/Peserta)
 * Termasuk: Register, Login, Profil, Stats, List
 * Dependencies: PrismaModule, JwtModule, AuthModule (untuk guard)
 */
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'change-this-to-a-long-random-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [MakerController],
  providers: [MakerService],
  exports: [MakerService],
})
export class MakerModule {}
