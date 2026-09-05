import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPromoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_diskon: string;
}
