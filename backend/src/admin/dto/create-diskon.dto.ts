import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateDiskonDto {
  @ApiProperty({ example: 'DISKONCETAR', description: 'Kode promo unik (huruf kapital dan angka)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]+$/)
  nama_diskon: string;

  @ApiProperty({ example: 10, description: 'Persentase diskon 1 - 100 (cukup angka saja, tanpa tanda %)' })
  @IsNumber()
  @Min(1)
  @Max(100)
  persentase_diskon: number;

  @ApiProperty({ example: '2026-09-07', description: 'Tanggal mulai berlaku (format YYYY-MM-DD)' })
  @IsDateString()
  tanggal_awal: string;

  @ApiProperty({ example: '2026-09-20', description: 'Tanggal berakhir (format YYYY-MM-DD)' })
  @IsDateString()
  tanggal_akhir: string;
}
