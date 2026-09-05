import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterAdminSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_coworking: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_pemilik: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telp: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deskripsi_fasilitas?: string;
}
