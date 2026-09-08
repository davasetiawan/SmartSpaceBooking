import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiskonService } from './diskon.service';
import { CheckPromoDto } from './dto/check-promo.dto';

@ApiTags('diskon')
@Controller('diskon')
export class DiskonController {
  constructor(private diskon: DiskonService) {}

  @Get('active')
  @ApiOperation({
    summary: 'Daftar Promo / Diskon yang Sedang Aktif',
    description:
      'Mengambil semua diskon yang tanggal sekarang masih dalam rentang tanggal_awal sampai tanggal_akhir.',
  })
  active() {
    return this.diskon.active();
  }

  @Post('check')
  @ApiOperation({
    summary: 'Periksa Validitas & Hitung Potongan Kode Promo',
    description:
      'Cek kode promo. Body: { nama_diskon }. Case-insensitive. Error 404 jika tidak ditemukan atau kedaluwarsa.',
  })
  check(@Body() dto: CheckPromoDto) {
    return this.diskon.check(dto.nama_diskon);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lihat Detail Diskon Berdasarkan ID',
    description: 'Mengambil detail satu promo. Error 404 jika ID tidak ditemukan.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diskon.findOne(id);
  }
}
