import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileMemberDto } from './dto/update-profile-member.dto';
import { UpdateProfileAdminDto } from './dto/update-profile-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { cleanUpdateData } from '../common/clean-data.util';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register/member')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Registrasi Akun Member / Pelanggan Baru (Termasuk Upload Foto)',
    description:
      'Membuat akun member baru. Field: username, email, password, nama_member, instansi, alamat, telp, foto(file). Mengembalikan JWT token.',
  })
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
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/members',
        filename: (_req, file, cb) =>
          cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`),
      }),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => cb(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype)),
    }),
  )
  registerMember(
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const registerDto = Object.assign(new RegisterMemberDto(), dto);
    if (foto) registerDto.foto = foto.filename;
    return this.auth.registerMember(registerDto);
  }

  @Post('register/admin-space')
  @ApiOperation({
    summary: 'Registrasi Pengelola Lokasi / Admin Coworking Space',
    description:
      'Membuat akun admin_space. Wajib isi username, email, password, nama_coworking, nama_pemilik, dan telp. Mengembalikan JWT token.',
  })
  registerAdmin(@Body() dto: RegisterAdminSpaceDto) {
    return this.auth.registerAdmin(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login Akun Pengguna (Semua Role: Member, Admin Space, Maker) — Mendapatkan Token JWT',
    description:
      'Login menggunakan username ATAU email plus password untuk semua role. Mengembalikan JWT untuk akses endpoint terproteksi.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'admin',
          description: 'Username (opsional jika email diisi)',
        },
        email: {
          type: 'string',
          example: 'admin@smartspace.com',
          description: 'Email (opsional jika username diisi)',
        },
        password: {
          type: 'string',
          example: 'admin123',
          description: 'Password akun',
        },
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cek Profil & Hak Akses Pengguna yang Sedang Login',
    description:
      'Mengambil data user dari JWT: id, username, email, role, plus profil member atau space_owner. Wajib Bearer token.',
  })
  profile(@Request() req: { user: { id: number } }) {
    return this.auth.profile(req.user.id);
  }

  @Patch('profile/member')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update Profil Member / Pelanggan Sendiri (Termasuk Foto)',
    description:
      'Update data profil member yang sedang login. Field opsional: nama_member, instansi, alamat, telp, foto (file). Wajib JWT member.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_member: { type: 'string', example: 'Nama Baru' },
        instansi: { type: 'string', example: 'Instansi Baru' },
        alamat: { type: 'string', example: 'Alamat Baru' },
        telp: { type: 'string', example: '08987654321' },
        foto: { type: 'string', format: 'binary', description: 'File foto (JPEG/PNG/WEBP, max 2MB)' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/members',
        filename: (_req, file, cb) =>
          cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`),
      }),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => cb(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype)),
    }),
  )
  updateMemberProfile(
    @Request() req: { user: { id: number } },
    @UploadedFile() foto: Express.Multer.File,
    @Body() dto: any,
  ) {
    const cleaned = cleanUpdateData(dto);
    const updateDto = Object.assign(new UpdateProfileMemberDto(), cleaned);
    if (foto) updateDto.foto = foto.filename;
    return this.auth.updateMemberProfile(req.user.id, updateDto);
  }

  @Patch('profile/admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Profil Admin Space (Partial Update)',
    description:
      'Update profil admin space sendiri. Field opsional: nama_coworking, nama_pemilik, telp. Wajib JWT admin_space.',
  })
  updateAdminProfile(
    @Request() req: { user: { id: number } },
    @Body() dto: UpdateProfileAdminDto,
  ) {
    const cleaned = cleanUpdateData(dto);
    return this.auth.updateAdminProfile(req.user.id, cleaned);
  }
}