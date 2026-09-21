import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReservasiStatusDto {
  @ApiProperty({
    enum: ['disetujui', 'ditolak', 'aktif', 'selesai', 'dibatalkan'],
    description: 'Update status manual reservasi oleh admin',
    example: 'disetujui',
  })
  @IsIn(['disetujui', 'ditolak', 'aktif', 'selesai', 'dibatalkan'])
  status: 'disetujui' | 'ditolak' | 'aktif' | 'selesai' | 'dibatalkan';

  @ApiPropertyOptional({
    description: 'Alasan penolakan reservasi (wajib diisi jika status = ditolak)',
    example: 'Bukti pembayaran tidak jelas / tidak valid',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  alasan_penolakan?: string;
}
