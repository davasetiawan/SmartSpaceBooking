import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpaceType } from '@prisma/client';
import { SpacesService } from './spaces.service';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private spaces: SpacesService) {}

  @Get('types')
  types() {
    return this.spaces.types();
  }

  @Get('availability')
  availability(
    @Query('id_space') idSpace: string,
    @Query('tanggal') tanggal: string,
    @Query('jam_mulai') jamMulai: string,
    @Query('durasi_jam') durasiJam: string,
  ) {
    return this.spaces.availability(
      Number(idSpace),
      tanggal,
      jamMulai,
      Number(durasiJam),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.spaces.findOne(id);
  }

  @Get()
  list(@Query('tipe') tipe?: SpaceType, @Query('search') search?: string) {
    return this.spaces.list(tipe, search);
  }
}
