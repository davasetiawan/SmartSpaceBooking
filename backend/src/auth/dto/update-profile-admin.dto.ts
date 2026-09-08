import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO untuk Update Profil Admin Space (digunakan di PATCH /api/auth/profile/admin)
 * Hanya field yang diizinkan untuk diubah oleh admin space sendiri.
 */
export class UpdateProfileAdminDto {
  @ApiPropertyOptional({ example: 'Smart Space', description: 'Nama brand coworking space' })
  @IsOptional()
  @IsString()
  nama_coworking?: string;

  @ApiPropertyOptional({ example: 'Administrator', description: 'Nama lengkap penanggung jawab' })
  @IsOptional()
  @IsString()
  nama_pemilik?: string;

  @ApiPropertyOptional({ example: '08123456789', description: 'Nomor kontak telepon / WhatsApp CS' })
  @IsOptional()
  @IsString()
  telp?: string;
}