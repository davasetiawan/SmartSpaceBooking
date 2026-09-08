import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { MakerService } from './maker.service';
import { RegisterMakerDto } from './dto/register-maker.dto';
import { LoginMakerDto } from './dto/login-maker.dto';

@ApiTags('maker')
@Controller('maker')
export class MakerController {
  constructor(private maker: MakerService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrasi Akun Siswa (Mendapatkan App Key Unik)',
    description:
      'Mendaftarkan maker (siswa/peserta). Wajib: username, email, password, nama_lengkap, nis_nip, kelas_jabatan, instansi. Role otomatis maker. Mengembalikan JWT.',
  })
  register(@Body() dto: RegisterMakerDto) {
    return this.maker.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login Akun Siswa Pengembang Frontend',
    description:
      'Login maker dengan username ATAU email plus password. Hanya role maker. Mengembalikan JWT.',
  })
  login(@Body() dto: LoginMakerDto) {
    return this.maker.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('maker')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lihat Profil & App Key Siswa Saat Ini',
    description:
      'Mengambil profil lengkap maker yang sedang login. Wajib JWT maker.',
  })
  me(@Request() req: { user: { id: number } }) {
    return this.maker.me(req.user.id);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('maker')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Statistik Keseluruhan Data Siswa',
    description:
      'Menampilkan info profil maker dan statistik dashboard. Wajib JWT maker.',
  })
  stats(@Request() req: { user: { id: number } }) {
    return this.maker.stats(req.user.id);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Daftar Semua Siswa / App Maker Terdaftar',
    description:
      'Daftar seluruh maker. Query opsional search untuk nama, NIS/NIP, atau instansi.',
  })
  list(@Query('search') search?: string) {
    return this.maker.list(search);
  }
}
