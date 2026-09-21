import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileMemberDto } from './dto/update-profile-member.dto';
import { UpdateProfileAdminDto } from './dto/update-profile-admin.dto';
import { cleanUpdateData } from '../common/clean-data.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async registerMember(dto: RegisterMemberDto) {
    const existsByUsername = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    const existsByEmail = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    const existsByTelp = await this.prisma.member.findFirst({
      where: { telp: dto.telp },
    });
    if (existsByUsername) throw new ConflictException('Username already exists');
    if (existsByEmail) throw new ConflictException('Email already exists');
    if (existsByTelp) throw new ConflictException('Nomor telepon sudah terdaftar');

    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        role: 'member',
        member: {
          create: {
            nama_member: dto.nama_member,
            instansi: dto.instansi,
            alamat: dto.alamat,
            telp: dto.telp,
            foto: dto.foto,
          },
        },
      },
    });
    return { message: 'Member registered', data: this.token(user) };
  }

  async registerAdmin(dto: RegisterAdminSpaceDto) {
    const existsByUsername = await this.prisma.users.findUnique({ where: { username: dto.username } });
    const existsByEmail = await this.prisma.users.findUnique({ where: { email: dto.email } });
    const existsByTelp = await this.prisma.space_owner.findFirst({ where: { telp: dto.telp } });
    if (existsByUsername) throw new ConflictException('Username already exists');
    if (existsByEmail) throw new ConflictException('Email already exists');
    if (existsByTelp) throw new ConflictException('Nomor telepon sudah terdaftar');

    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        role: 'admin_space',
        space_owner: {
          create: {
            nama_coworking: dto.nama_coworking,
            nama_pemilik: dto.nama_pemilik,
            telp: dto.telp,
          },
        },
      },
    });
    return { message: 'Admin registered', data: this.token(user) };
  }

  async login(dto: LoginDto) {
    if (!dto.username && !dto.email) {
      throw new UnauthorizedException('Username or email is required');
    }

    const user = await this.prisma.users.findFirst({
      where: {
        OR: [{ username: dto.username }, { email: dto.email }],
      },
      include: { member: true, space_owner: true },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful', data: this.token(user) };
  }

  async profile(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, role: true, member: true, space_owner: true },
    });
    return { data: user };
  }

  async updateMemberProfile(userId: number, dto: any) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: { member: true },
    });

    if (!user || !user.member) {
      throw new NotFoundException('Member profile not found');
    }

    const cleaned = cleanUpdateData(dto);
    const updated = await this.prisma.member.update({
      where: { id: user.member.id },
      data: cleaned,
    });
    return { message: 'Profile updated', data: updated };
  }

  async updateAdminProfile(userId: number, dto: UpdateProfileAdminDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: { space_owner: true },
    });

    if (!user || !user.space_owner) {
      throw new NotFoundException('Admin profile not found');
    }

    const cleaned = cleanUpdateData(dto);
    const updated = await this.prisma.space_owner.update({
      where: { id: user.space_owner.id },
      data: cleaned,
    });
    return { message: 'Profile updated', data: updated };
  }
}