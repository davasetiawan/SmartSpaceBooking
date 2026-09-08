import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  harga_per_jam: number;

  @ApiProperty({ enum: SpaceType })
  @IsEnum(SpaceType)
  tipe: SpaceType;

  @ApiProperty()
  @Type(() => Number)
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
