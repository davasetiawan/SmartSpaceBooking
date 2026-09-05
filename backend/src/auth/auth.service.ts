import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private token(user: { id: number; username: string; role: string }) {
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        username: user.username,
        role: user.role,
      }),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async registerMember(dto: RegisterMemberDto) {
    const exists = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (exists) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
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
    const exists = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (exists) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        password: await bcrypt.hash(dto.password, 10),
        role: 'admin_space',
        space_owner: {
          create: {
            nama_coworking: dto.nama_coworking,
            nama_pemilik: dto.nama_pemilik,
            telp: dto.telp,
            alamat: dto.alamat,
            deskripsi_fasilitas: dto.deskripsi_fasilitas,
          },
        },
      },
    });
    return { message: 'Admin registered', data: this.token(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return { message: 'Login successful', data: this.token(user) };
  }

  async profile(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        member: true,
        space_owner: true,
      },
    });
    return { data: user };
  }
}
