import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional({ description: 'Username untuk login (bisa dikosongkan jika menggunakan email)' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ description: 'Email untuk login (bisa dikosongkan jika menggunakan username)' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
