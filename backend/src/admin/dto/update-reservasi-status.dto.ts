import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateReservasiStatusDto {
  @ApiProperty({ enum: ['disetujui', 'dibatalkan'] })
  @IsIn(['disetujui', 'dibatalkan'])
  status: 'disetujui' | 'dibatalkan';
}
