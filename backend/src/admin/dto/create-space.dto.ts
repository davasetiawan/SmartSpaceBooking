import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SpaceType } from '@prisma/client';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_space: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  harga_per_jam: number;

  @ApiProperty({ enum: SpaceType })
  @IsEnum(SpaceType)
  tipe: SpaceType;

  @ApiProperty()
  @IsInt()
  @Min(1)
  kapasitas: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deskripsi: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  foto?: string;
}
