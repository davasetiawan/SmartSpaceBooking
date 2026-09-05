import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCoworkingProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nama_coworking?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nama_pemilik?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deskripsi_fasilitas?: string;
}
