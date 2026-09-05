import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMemberAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nama_member?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  instansi?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
