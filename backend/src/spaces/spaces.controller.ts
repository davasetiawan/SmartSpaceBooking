import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SpaceType } from '@prisma/client';
import { SpacesService } from './spaces.service';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private spaces: SpacesService) {}

  @Get('types')
  @ApiOperation({
    summary: 'Daftar Tipe Space (Personal Desk, Meeting Room, Private Office)',
    description:
      'Mengembalikan enum tipe space untuk dropdown/filter katalog: desk, meeting_room, private_office.',
  })
  types() {
    return this.spaces.types();
  }

  @Get('availability')
  @ApiOperation({
    summary: 'Cek Ketersediaan Space Berdasarkan Tanggal & Jam',
    description:
      'Cek apakah space tersedia. Query: id_space, tanggal (YYYY-MM-DD), jam_mulai (HH:mm), durasi_jam. Gunakan sebelum submit booking.',
  })
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

  @Get('available')
  @ApiOperation({
    summary: 'Lihat Seluruh Space yang Tersedia',
    description:
      'Mengambil seluruh space yang saat ini tersedia secara langsung tanpa parameter apapun.',
  })
  available() {
    return this.spaces.available();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lihat Detail Space Coworking Berdasarkan ID',
    description:
      'Mengambil detail space beserta data pengelola (owner). Error 404 jika ID tidak ditemukan.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.spaces.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Lihat Semua Space Coworking (Filter ?tipe & ?search)',
    description:
      'Katalog publik. Query opsional: tipe (desk|meeting_room|private_office) dan search (nama/deskripsi).',
  })
  list(@Query('tipe') tipe?: SpaceType, @Query('search') search?: string) {
    return this.spaces.list(tipe, search);
  }
}
