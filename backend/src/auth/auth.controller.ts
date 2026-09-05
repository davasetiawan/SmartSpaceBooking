import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register/member')
  registerMember(@Body() dto: RegisterMemberDto) {
    return this.auth.registerMember(dto);
  }

  @Post('register/admin-space')
  registerAdmin(@Body() dto: RegisterAdminSpaceDto) {
    return this.auth.registerAdmin(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  profile(@Request() req: { user: { id: number } }) {
    return this.auth.profile(req.user.id);
  }
}
