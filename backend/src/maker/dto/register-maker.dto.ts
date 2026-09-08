import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * DTO untuk Registrasi Maker (Siswa/Peserta)
 * Digunakan oleh endpoint: POST /api/maker/register
 */
export class RegisterMakerDto {
  @ApiProperty({ example: 'maker01', description: 'Username unik untuk login' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'maker01@smk.example', description: 'Email unik untuk login dan notifikasi' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password minimal 6 karakter' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Budi Santoso', description: 'Nama lengkap siswa/peserta' })
  @IsString()
  @IsNotEmpty()
  nama_lengkap: string;

  @ApiProperty({ example: '1234567890', description: 'NIS (Siswa) atau NIP (Guru/Peserta)' })
  @IsString()
  @IsNotEmpty()
  nis_nip: string;

  @ApiProperty({ example: 'XII RPL 1', description: 'Kelas (Siswa) atau Jabatan (Guru/Staff)' })
  @IsString()
  @IsNotEmpty()
  kelas_jabatan: string;

  @ApiProperty({ example: 'SMK Negeri 1 Jakarta', description: 'Nama institusi/sekolah asal' })
  @IsString()
  @IsNotEmpty()
  instansi: string;

  @ApiPropertyOptional({ example: 'foto_profil.jpg', description: 'Nama file foto profil (opsional)' })
  @IsOptional()
  @IsString()
  foto?: string;
}