import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterMemberDto {
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
