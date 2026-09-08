import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBuktiPembayaranDto {
  @ApiProperty({
    example: '1788854430075-973888230.png',
    description: 'Nama berkas / path bukti pembayaran yang diunggah',
  })
  @IsString()
  @IsNotEmpty()
  bukti_pembayaran: string;
}
