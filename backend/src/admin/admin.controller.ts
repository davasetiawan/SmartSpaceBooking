import {
  Body,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReservasiStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminService } from './admin.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateCoworkingProfileDto } from './dto/update-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member.dto';
import { UpdateMemberAdminDto } from './dto/update-member.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';
import { UpdateReservasiStatusDto } from './dto/update-reservasi-status.dto';
import { cleanUpdateData } from '../common/clean-data.util';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin_space')
export class AdminController {
  constructor(
    private admin: AdminService,
    private cloudinary: CloudinaryService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Lihat Data Profil Lokasi Coworking Space' })
  profile(@Request() req: { user: { id: number } }) {
    return this.admin.profile(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update Data Profil Lokasi Coworking Space (Partial)' })
  updateProfile(
    @Request() req: { user: { id: number } },
    @Body() dto: UpdateCoworkingProfileDto,
  ) {
    const cleaned = cleanUpdateData(dto);
    return this.admin.updateProfile(req.user.id, cleaned);
  }

  @Get('members')
  @ApiOperation({ summary: 'Daftar Semua Member / Pelanggan Coworking' })
  members(@Query('search') search?: string) {
    return this.admin.members(search);
  }

  @Post('members')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Tambah Data Member Baru (Upload Foto Sekaligus)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user123' },
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
        nama_member: { type: 'string', example: 'Nama Lengkap' },
        instansi: { type: 'string', example: 'Instansi/Perusahaan' },
        alamat: { type: 'string', example: 'Alamat Lengkap' },
        telp: { type: 'string', example: '08123456789' },
        foto: { type: 'string', format: 'binary', description: 'File foto (JPEG/PNG/WEBP, max 2MB)' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foto'))
  createMember(
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const createDto = Object.assign(new CreateMemberAdminDto(), dto);
    if (foto) {
      return this.uploadAndCreateMember(foto, createDto);
    }
    return this.admin.createMember(createDto);
  }

  private async uploadAndCreateMember(foto: Express.Multer.File, createDto: CreateMemberAdminDto) {
    const result = await this.cloudinary.uploadImage(foto);
    createDto.foto = result.secure_url;
    return this.admin.createMember(createDto);
  }

  @Get('members/:id')
  @ApiOperation({ summary: 'Detail Data Member Berdasarkan ID' })
  member(@Param('id', ParseIntPipe) id: number) {
    return this.admin.member(id);
  }

  @Patch('members/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Data Member / Pelanggan (Termasuk Foto) - Partial' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_member: { type: 'string', example: 'Nama Lengkap' },
        instansi: { type: 'string', example: 'Instansi/Perusahaan' },
        alamat: { type: 'string', example: 'Alamat Lengkap' },
        telp: { type: 'string', example: '08123456789' },
        foto: { type: 'string', format: 'binary', description: 'File foto (JPEG/PNG/WEBP, max 2MB)' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foto'))
  updateMember(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const cleaned = cleanUpdateData(dto);
    const updateDto = Object.assign(new UpdateMemberAdminDto(), cleaned);
    if (foto) {
      return this.uploadAndUpdateMember(id, foto, updateDto);
    }
    return this.admin.updateMember(id, updateDto);
  }

  private async uploadAndUpdateMember(id: number, foto: Express.Multer.File, updateDto: UpdateMemberAdminDto) {
    const result = await this.cloudinary.uploadImage(foto);
    updateDto.foto = result.secure_url;
    return this.admin.updateMember(id, updateDto);
  }

  @Delete('members/:id')
  @ApiOperation({ summary: 'Hapus Data Member / Pelanggan' })
  deleteMember(@Param('id', ParseIntPipe) id: number) {
    return this.admin.deleteMember(id);
  }

  @Get('spaces')
  @ApiOperation({ summary: 'Daftar Semua Ruangan & Meja Milik Admin' })
  spaces(@Request() req: { user: { id: number } }) {
    return this.admin.spaces(req.user.id);
  }

  @Post('spaces')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Tambah Ruangan / Meja Space Baru Beserta Lokasi (Kota & Jalan), Fasilitas & Foto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_space: { type: 'string', example: 'Desk Flexi 01' },
        kota: { type: 'string', example: 'Malang' },
        jalan: { type: 'string', example: 'Jl. Danau Toba No. 12' },
        harga_per_jam: { type: 'number', example: 25000 },
        tipe: { type: 'string', enum: ['desk', 'meeting_room', 'private_office'], example: 'desk' },
        kapasitas: { type: 'integer', example: 1 },
        deskripsi: { type: 'string', example: 'WiFi dan listrik' },
        foto: { type: 'string', format: 'binary', description: 'File foto (JPEG/PNG/WEBP, max 2MB)' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foto'))
  createSpace(
    @Request() req: { user: { id: number } },
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const cleaned = cleanUpdateData(dto);
    const createDto = Object.assign(new CreateSpaceDto(), cleaned);
    if (cleaned.harga_per_jam !== undefined && !isNaN(Number(cleaned.harga_per_jam))) {
      createDto.harga_per_jam = Number(cleaned.harga_per_jam);
    }
    if (cleaned.kapasitas !== undefined && !isNaN(Number(cleaned.kapasitas))) {
      createDto.kapasitas = Number(cleaned.kapasitas);
    }
    if (foto) {
      return this.uploadAndCreateSpace(req, foto, createDto);
    }
    return this.admin.createSpace(req.user.id, createDto);
  }

  private async uploadAndCreateSpace(req: any, foto: Express.Multer.File, createDto: CreateSpaceDto) {
    const result = await this.cloudinary.uploadImage(foto);
    createDto.foto = result.secure_url;
    return this.admin.createSpace(req.user.id, createDto);
  }

  @Get('spaces/:id')
  @ApiOperation({ summary: 'Detail Data Space Berdasarkan ID' })
  space(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.admin.space(req.user.id, id);
  }

  @Patch('spaces/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Data Ruangan & Fasilitas Space (Termasuk Kota, Jalan & Foto) - Partial' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_space: { type: 'string', example: 'Desk Flexi 01' },
        kota: { type: 'string', example: 'Malang' },
        jalan: { type: 'string', example: 'Jl. Danau Toba No. 12' },
        harga_per_jam: { type: 'number', example: 25000 },
        tipe: { type: 'string', enum: ['desk', 'meeting_room', 'private_office'], example: 'desk' },
        kapasitas: { type: 'integer', example: 1 },
        deskripsi: { type: 'string', example: 'WiFi dan listrik' },
        foto: { type: 'string', format: 'binary', description: 'File foto (JPEG/PNG/WEBP, max 2MB)' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foto'))
  updateSpace(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const cleaned = cleanUpdateData(dto);
    const updateDto = Object.assign(new UpdateSpaceDto(), cleaned);
    if (cleaned.harga_per_jam !== undefined && !isNaN(Number(cleaned.harga_per_jam))) {
      updateDto.harga_per_jam = Number(cleaned.harga_per_jam);
    }
    if (cleaned.kapasitas !== undefined && !isNaN(Number(cleaned.kapasitas))) {
      updateDto.kapasitas = Number(cleaned.kapasitas);
    }
    if (foto) {
      return this.uploadAndUpdateSpace(req, id, foto, updateDto);
    }
    return this.admin.updateSpace(req.user.id, id, updateDto);
  }

  private async uploadAndUpdateSpace(req: any, id: number, foto: Express.Multer.File, updateDto: UpdateSpaceDto) {
    const result = await this.cloudinary.uploadImage(foto);
    updateDto.foto = result.secure_url;
    return this.admin.updateSpace(req.user.id, id, updateDto);
  }

  @Delete('spaces/:id')
  @ApiOperation({ summary: 'Hapus Data Ruangan / Meja Space' })
  deleteSpace(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.admin.deleteSpace(req.user.id, id);
  }

  @Get('diskon')
  @ApiOperation({ summary: 'Daftar Semua Kode Promo / Diskon Event' })
  discounts() {
    return this.admin.discounts();
  }

  @Post('diskon')
  @ApiOperation({ summary: 'Tambah Kode Promo / Event Diskon Baru' })
  createDiscount(@Body() dto: CreateDiskonDto) {
    return this.admin.createDiscount(dto);
  }

  @Get('diskon/:id')
  @ApiOperation({ summary: 'Detail Data Diskon Berdasarkan ID' })
  discount(@Param('id', ParseIntPipe) id: number) {
    return this.admin.discount(id);
  }

  @Patch('diskon/:id')
  @ApiOperation({ summary: 'Update Data Kode Promo & Periode Diskon - Partial' })
  updateDiscount(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDiskonDto,
  ) {
    const cleaned = cleanUpdateData(dto);
    return this.admin.updateDiscount(id, cleaned);
  }

  @Delete('diskon/:id')
  @ApiOperation({ summary: 'Hapus Kode Promo / Diskon' })
  deleteDiscount(@Param('id', ParseIntPipe) id: number) {
    return this.admin.deleteDiscount(id);
  }

  @Get('reservasi')
  @ApiOperation({ summary: 'Lihat Seluruh Reservasi Coworking (?month, ?year, ?status, ?id_space, ?tanggal)' })
  reservations(
    @Request() req: { user: { id: number } },
    @Query()
    query: {
      month?: string;
      year?: string;
      status?: ReservasiStatus;
      id_space?: string;
      tanggal?: string;
    },
  ) {
    return this.admin.reservations(req.user.id, query);
  }

  @Patch('reservasi/:id/status')
  @ApiOperation({
    summary: 'Konfirmasi Reservasi (disetujui / ditolak)',
    description:
      'Admin mengkonfirmasi reservasi member. Pilih "disetujui" untuk menerima atau "ditolak" untuk menolak reservasi. Hanya bisa dilakukan saat status masih belum_dikonfirm.',
  })
  updateStatus(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservasiStatusDto,
  ) {
    return this.admin.updateStatus(req.user.id, id, dto);
  }

  @Patch('reservasi/:id/check-in')
  @ApiOperation({
    summary: 'Check-In Pelanggan',
    description: 'Check-In pelanggan (Status berubah ke Aktif/Digunakan).',
  })
  checkIn(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.admin.checkIn(req.user.id, id);
  }

  @Patch('reservasi/:id/check-out')
  @ApiOperation({
    summary: 'Check-Out Pelanggan',
    description: 'Check-Out pelanggan (Status berubah ke Selesai).',
  })
  checkOut(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.admin.checkOut(req.user.id, id);
  }

  @Get('reports/monthly')
  @ApiOperation({ summary: 'Rekapitulasi Estimasi & Realisasi Pendapatan Per Bulan (?month, ?year)' })
  report(
    @Request() req: { user: { id: number } },
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.admin.report(req.user.id, Number(month), Number(year));
  }

  @Get('reports/income')
  @ApiOperation({ summary: 'Alias Rekapitulasi Pendapatan Bulanan' })
  income(
    @Request() req: { user: { id: number } },
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.admin.report(req.user.id, Number(month), Number(year));
  }
}