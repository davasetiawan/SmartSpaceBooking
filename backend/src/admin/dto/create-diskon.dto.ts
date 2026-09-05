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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]+$/)
  nama_diskon: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100)
  persentase_diskon: number;

  @ApiProperty()
  @IsDateString()
  tanggal_awal: string;

  @ApiProperty()
  @IsDateString()
  tanggal_akhir: string;
}
