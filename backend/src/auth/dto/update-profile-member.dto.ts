import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO untuk Update Profil Member (digunakan di PATCH /api/auth/profile/member)
 * Hanya field yang diizinkan untuk diubah oleh member sendiri.
 */
export class UpdateProfileMemberDto {
  @ApiPropertyOptional({ example: 'Alfath Nur', description: 'Nama lengkap member' })
  @IsOptional()
  @IsString()
  nama_member?: string;

  @ApiPropertyOptional({ example: 'Telkom Malang', description: 'Instansi/Perusahaan' })
  @IsOptional()
  @IsString()
  instansi?: string;

  @ApiPropertyOptional({ example: 'Jl. Raya No 123', description: 'Alamat domisili' })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional({ example: '08123456789', description: 'Nomor WhatsApp/Telepon' })
  @IsOptional()
  @IsString()
  telp?: string;

  @ApiPropertyOptional({ example: '1725543212345-123456789.png', description: 'Nama file foto hasil upload via /api/upload/members' })
  @IsOptional()
  @IsString()
  foto?: string;
}