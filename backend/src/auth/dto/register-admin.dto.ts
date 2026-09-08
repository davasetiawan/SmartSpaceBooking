import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterAdminSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
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
}