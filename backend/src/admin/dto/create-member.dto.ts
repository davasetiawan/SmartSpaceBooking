import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMemberAdminDto {
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
  nama_member: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instansi: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alamat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telp: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  foto?: string;
}