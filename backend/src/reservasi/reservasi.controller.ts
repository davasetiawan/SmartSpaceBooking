import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateReservasiDto } from './dto/create-reservasi.dto';
import { ReservasiService } from './reservasi.service';

const buktiStorage = diskStorage({
  destination: './uploads/pembayaran',
  filename: (_req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`,
    ),
});

const buktiFilter = (
  _req: unknown,
  file: Express.Multer.File,
  cb: (err: Error | null, ok: boolean) => void,
) => cb(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype));

@ApiTags('reservasi')
@ApiBearerAuth()
@Controller('reservasi')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservasiController {
  constructor(private reservasi: ReservasiService) {}

  @Post()
  @Roles('member')
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'id_space', required: true, type: Number, example: 1 })
  @ApiQuery({ name: 'tanggal_reservasi', required: true, type: String, example: '2026-09-10' })
  @ApiQuery({ name: 'jam_mulai', required: true, type: String, example: '09:00' })
  @ApiQuery({ name: 'durasi_jam', required: true, type: Number, example: 2 })
  @ApiQuery({ name: 'nama_diskon', required: false, type: String, example: 'WELCOME10' })
  @ApiQuery({ name: 'payment_method_id', required: false, type: Number, example: 1 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bukti_pembayaran: {
          type: 'string',
          format: 'binary',
          description: 'Foto bukti pembayaran (JPEG/PNG/WEBP, max 2MB) — wajib',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Buat Pemesanan Space Baru (+ Upload Bukti Pembayaran via Parameter)',
    description:
      'Member membuat booking. Parameter dikirim lewat URL Query Parameters (id_space, tanggal_reservasi, jam_mulai, durasi_jam, nama_diskon opsional) & wajib upload bukti_pembayaran via file input. Wajib JWT member.',
  })
  @UseInterceptors(
    FileInterceptor('bukti_pembayaran', {
      storage: buktiStorage,
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: buktiFilter,
    }),
  )
  create(
    @Request() req: { user: { id: number } },
    @Query('id_space') id_space_q?: string,
    @Query('tanggal_reservasi') tanggal_reservasi_q?: string,
    @Query('jam_mulai') jam_mulai_q?: string,
    @Query('durasi_jam') durasi_jam_q?: string,
    @Query('nama_diskon') nama_diskon_q?: string,
    @Query('payment_method_id') payment_method_id_q?: string,
    @Body() body?: Record<string, any>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const id_space = id_space_q || body?.id_space;
    const tanggal_reservasi = tanggal_reservasi_q || body?.tanggal_reservasi;
    const jam_mulai = jam_mulai_q || body?.jam_mulai;
    const durasi_jam = durasi_jam_q || body?.durasi_jam;
    const nama_diskon = nama_diskon_q || body?.nama_diskon;
    const payment_method_id = payment_method_id_q || body?.payment_method_id;

    if (!id_space || !tanggal_reservasi || !jam_mulai || !durasi_jam) {
      throw new BadRequestException(
        'id_space, tanggal_reservasi, jam_mulai, dan durasi_jam wajib diisi',
      );
    }

    if (!file) {
      throw new BadRequestException('Foto bukti pembayaran wajib diupload');
    }

    const dto: CreateReservasiDto = {
      id_space: Number(id_space),
      tanggal_reservasi: String(tanggal_reservasi),
      jam_mulai: String(jam_mulai),
      durasi_jam: Number(durasi_jam),
      nama_diskon: nama_diskon ? String(nama_diskon) : undefined,
      payment_method_id: payment_method_id ? Number(payment_method_id) : undefined,
    };

    return this.reservasi.create(req.user.id, dto, file?.filename);
  }

  @Get('my')
  @Roles('member')
  @ApiOperation({
    summary: 'Lihat Status Semua Pemesanan Milik Sendiri',
    description:
      'Daftar seluruh reservasi member yang login, terurut terbaru. Wajib JWT member.',
  })
  mine(@Request() req: { user: { id: number } }) {
    return this.reservasi.mine(req.user.id);
  }

  @Get('my/history')
  @Roles('member')
  @ApiOperation({
    summary: 'Lihat Histori Pemesanan Berdasarkan Bulan & Tahun (month, year)',
    description:
      'Histori reservasi plus total pengeluaran. Query: month (1-12) dan year. Wajib JWT member.',
  })
  history(
    @Request() req: { user: { id: number } },
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.reservasi.history(req.user.id, Number(month), Number(year));
  }

  @Get(':id/e-ticket')
  @ApiOperation({
    summary: 'Cetak E-Ticket / Bukti Nota Digital Reservasi',
    description:
      'Mengembalikan detail booking, nomor tiket, payload QR, dan gambar QR base64. Bisa diakses member pemilik atau admin space pemilik ruangan.',
  })
  eTicket(
    @Request() req: { user: { id: number; role: string } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.eTicket(req.user.id, req.user.role, id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lihat Detail Reservasi Berdasarkan ID',
    description:
      'Detail satu reservasi. Member hanya boleh milik sendiri. Admin hanya boleh space miliknya. Error 403/404 jika tidak berhak atau tidak ditemukan.',
  })
  findOne(
    @Request() req: { user: { id: number; role: string } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.findOne(req.user.id, req.user.role, id);
  }

  @Patch(':id/cancel')
  @Roles('member')
  @ApiOperation({
    summary: 'Batalkan Pemesanan Space',
    description:
      'Member membatalkan reservasi sendiri. Hanya boleh jika status masih belum_dikonfirm atau disetujui. Wajib JWT member.',
  })
  cancel(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.cancel(req.user.id, id);
  }
}
