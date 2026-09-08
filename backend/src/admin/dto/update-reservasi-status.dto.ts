import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateReservasiStatusDto {
  @ApiProperty({
    enum: ['disetujui', 'ditolak'],
    description: 'Konfirmasi reservasi: "disetujui" untuk menerima, "ditolak" untuk menolak pembayaran/reservasi',
    example: 'disetujui',
  })
  @IsIn(['disetujui', 'ditolak'])
  status: 'disetujui' | 'ditolak';
}
