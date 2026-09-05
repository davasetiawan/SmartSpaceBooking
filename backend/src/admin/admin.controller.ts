import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservasiStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminService } from './admin.service';
import { UpdateCoworkingProfileDto } from './dto/update-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member.dto';
import { UpdateMemberAdminDto } from './dto/update-member.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';
import { UpdateReservasiStatusDto } from './dto/update-reservasi-status.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin_space')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('profile') profile(@Request() req: { user: { id: number } }) { return this.admin.profile(req.user.id); }
  @Put('profile') updateProfile(@Request() req: { user: { id: number } }, @Body() dto: UpdateCoworkingProfileDto) { return this.admin.updateProfile(req.user.id, dto); }
  @Get('members') members(@Query('search') search?: string) { return this.admin.members(search); }
  @Post('members') createMember(@Body() dto: CreateMemberAdminDto) { return this.admin.createMember(dto); }
  @Get('members/:id') member(@Param('id', ParseIntPipe) id: number) { return this.admin.member(id); }
  @Put('members/:id') updateMember(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMemberAdminDto) { return this.admin.updateMember(id, dto); }
  @Delete('members/:id') deleteMember(@Param('id', ParseIntPipe) id: number) { return this.admin.deleteMember(id); }
  @Get('spaces') spaces(@Request() req: { user: { id: number } }) { return this.admin.spaces(req.user.id); }
  @Post('spaces') createSpace(@Request() req: { user: { id: number } }, @Body() dto: CreateSpaceDto) { return this.admin.createSpace(req.user.id, dto); }
  @Get('spaces/:id') space(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number) { return this.admin.space(req.user.id, id); }
  @Put('spaces/:id') updateSpace(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSpaceDto) { return this.admin.updateSpace(req.user.id, id, dto); }
  @Delete('spaces/:id') deleteSpace(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number) { return this.admin.deleteSpace(req.user.id, id); }
  @Get('diskon') discounts() { return this.admin.discounts(); }
  @Post('diskon') createDiscount(@Body() dto: CreateDiskonDto) { return this.admin.createDiscount(dto); }
  @Get('diskon/:id') discount(@Param('id', ParseIntPipe) id: number) { return this.admin.discount(id); }
  @Put('diskon/:id') updateDiscount(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiskonDto) { return this.admin.updateDiscount(id, dto); }
  @Delete('diskon/:id') deleteDiscount(@Param('id', ParseIntPipe) id: number) { return this.admin.deleteDiscount(id); }
  @Get('reservasi') reservations(@Request() req: { user: { id: number } }, @Query() query: { month?: string; year?: string; status?: ReservasiStatus; id_space?: string; tanggal?: string }) { return this.admin.reservations(req.user.id, query); }
  @Patch('reservasi/:id/status') updateStatus(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReservasiStatusDto) { return this.admin.updateStatus(req.user.id, id, dto); }
  @Post('reservasi/:id/check-in') checkIn(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number) { return this.admin.checkIn(req.user.id, id); }
  @Post('reservasi/:id/check-out') checkOut(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number) { return this.admin.checkOut(req.user.id, id); }
  @Get('reports/monthly') report(@Request() req: { user: { id: number } }, @Query('month') month: string, @Query('year') year: string) { return this.admin.report(req.user.id, Number(month), Number(year)); }
  @Get('reports/income') income(@Request() req: { user: { id: number } }, @Query('month') month: string, @Query('year') year: string) { return this.admin.report(req.user.id, Number(month), Number(year)); }
}
