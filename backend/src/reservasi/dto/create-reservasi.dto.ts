import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateReservasiDto {
  @ApiProperty()
  @IsInt()
  id_space: number;

  @ApiProperty()
  @IsDateString()
  tanggal_reservasi: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  jam_mulai: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  durasi_jam: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nama_diskon?: string;
}
