import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterMakerDto } from './dto/register-maker.dto';
import { LoginMakerDto } from './dto/login-maker.dto';

/**
 * MakerService - Menangani logika bisnis untuk Maker (Siswa/Peserta)
 * Endpoint tersedia di prefix: /api/maker
 * Role JWT: 'maker'
 * 
 * Fungsi Utama:
 * 1. Registrasi akun maker baru (siswa/peserta)
 * 2. Login maker dengan username/email
 * 3. Profil maker yang sedang login
 * 4. Statistik dashboard maker
 * 5. Daftar maker (untuk admin monitoring)
 */
@Injectable()
export class MakerService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   * Generate JWT token untuk maker
   * Payload: sub (id), username, email, role
   */
  private token(user: { id: number; username: string; email: string; role: string }) {
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Registrasi Maker Baru
   * Endpoint: POST /api/maker/register
   * Body: RegisterMakerDto
   * Validasi: username, email, nis_nip harus unik
   * Fungsi: Membuat user dengan role 'maker' dan profil maker terhubung
   * Return: { message, data: { access_token, user } }
   * Error: 409 jika username/email/nis_nip sudah terdaftar
   */
  async register(dto: RegisterMakerDto) {
    const existsByUsername = await this.prisma.users.findUnique({ where: { username: dto.username } });
    const existsByEmail = await this.prisma.users.findUnique({ where: { email: dto.email } });
    const existsByNisNip = await this.prisma.maker.findUnique({ where: { nis_nip: dto.nis_nip } });

    if (existsByUsername) throw new ConflictException('Username already exists');
    if (existsByEmail) throw new ConflictException('Email already exists');
    if (existsByNisNip) throw new ConflictException('NIS/NIP already registered');

    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        role: 'maker',
        maker: {
          create: {
            nama_lengkap: dto.nama_lengkap,
            nis_nip: dto.nis_nip,
            kelas_jabatan: dto.kelas_jabatan,
            instansi: dto.instansi,
            foto: dto.foto,
          },
        },
      },
      include: { maker: true },
    });

    return { message: 'Maker registered', data: this.token(user) };
  }

  /**
   * Login Maker
   * Endpoint: POST /api/maker/login
   * Body: LoginMakerDto (username ATAU email + password)
   * Fungsi: Verifikasi kredensial, generate JWT token
   * Return: { message: 'Login successful', data: { access_token, user } }
   * Error: 401 jika kredensial tidak valid
   */
  async login(dto: LoginMakerDto) {
    if (!dto.username && !dto.email) {
      throw new UnauthorizedException('Username or email is required');
    }

    const user = await this.prisma.users.findFirst({
      where: {
        OR: [
          { username: dto.username },
          { email: dto.email },
        ],
        role: 'maker', // Pastikan hanya role maker yang bisa login di endpoint ini
      },
      include: { maker: true },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful', data: this.token(user) };
  }

  /**
   * Profil Maker yang Sedang Login
   * Endpoint: GET /api/maker/me
   * Header: Authorization: Bearer <jwt_token_maker>
   * Fungsi: Mengambil data lengkap maker berdasarkan ID dari token
   * Return: { data: { user: {...}, maker: {...} } }
   * Error: 404 jika maker tidak ditemukan
   */
  async me(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        maker: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Maker not found');
    }

    return { data: user };
  }

  /**
   * Statistik Dashboard Maker
   * Endpoint: GET /api/maker/stats
   * Header: Authorization: Bearer <jwt_token_maker>
   * Fungsi: Menghitung statistik pribadi maker (contoh: jumlah reservasi, total jam, dll)
   * Return: { data: { total_reservasi, total_jam, status_counts, dll } }
   * Catatan: Karena maker bukan member, ini bisa diisi nanti saat maker punya fitur booking
   */
  async stats(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: { maker: true },
    });

    if (!user || !user.maker) {
      throw new NotFoundException('Maker profile not found');
    }

    // Placeholder stats - bisa dikembangkan saat maker punya fitur reservasi
    return {
      data: {
        maker_info: {
          nama_lengkap: user.maker.nama_lengkap,
          nis_nip: user.maker.nis_nip,
          kelas_jabatan: user.maker.kelas_jabatan,
          instansi: user.maker.instansi,
        },
        stats: {
          total_reservasi: 0,
          total_jam: 0,
          status_counts: {
            belum_dikonfirm: 0,
            disetujui: 0,
            aktif: 0,
            selesai: 0,
            dibatalkan: 0,
          },
        },
        message: 'Stats endpoint ready. Connect to reservasi when maker booking feature is implemented.',
      },
    };
  }

  /**
   * Daftar Semua Maker (Untuk Admin Monitoring)
   * Endpoint: GET /api/maker/list
   * Header: Authorization: Bearer <jwt_token_admin> (opsional, bisa public)
   * Query: search (opsional) - cari nama, nis_nip, instansi
   * Fungsi: Mengambil daftar seluruh maker untuk monitoring/admin panel
   * Return: { data: Array<maker + user> }
   */
  async list(search?: string) {
    const where = search
      ? {
          OR: [
            { nama_lengkap: { contains: search } },
            { nis_nip: { contains: search } },
            { instansi: { contains: search } },
          ],
        }
      : undefined;

    const items = await this.prisma.maker.findMany({
      where,
      include: { users: { select: { id: true, username: true, email: true, role: true } } },
      orderBy: { created_at: 'desc' },
    });

    return { data: items };
  }
}