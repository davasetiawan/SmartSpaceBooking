import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DiskonModule } from '../diskon/diskon.module';
import { SpacesModule } from '../spaces/spaces.module';
import { ReservasiController } from './reservasi.controller';
import { ReservasiService } from './reservasi.service';

@Module({
  imports: [AuthModule, SpacesModule, DiskonModule],
  controllers: [ReservasiController],
  providers: [ReservasiService],
})
export class ReservasiModule {}
