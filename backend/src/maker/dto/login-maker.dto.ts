import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO untuk Login Maker
 * Digunakan oleh endpoint: POST /api/maker/login
 * Bisa login menggunakan username ATAU email
 */
export class LoginMakerDto {
  @ApiPropertyOptional({ example: 'maker01', description: 'Username (opsional jika email diisi)' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'maker01@smk.example', description: 'Email (opsional jika username diisi)' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'password123', description: 'Password akun' })
  @IsString()
  @IsNotEmpty()
  password: string;
}