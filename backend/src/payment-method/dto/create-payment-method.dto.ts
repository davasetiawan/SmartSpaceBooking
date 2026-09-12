import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Bank BCA' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ example: 'transfer_bank', description: 'transfer_bank | e_wallet | qris | cash' })
  @IsString()
  @IsNotEmpty()
  tipe: string;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsOptional()
  @IsString()
  nomor_rekening?: string;

  @ApiPropertyOptional({ example: 'PT Smart Space Booking' })
  @IsOptional()
  @IsString()
  atas_nama?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_aktif?: boolean;
}
