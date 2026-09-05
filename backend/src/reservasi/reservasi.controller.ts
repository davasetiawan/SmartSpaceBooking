import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateReservasiDto } from './dto/create-reservasi.dto';
import { ReservasiService } from './reservasi.service';

@ApiTags('reservasi')
@ApiBearerAuth()
@Controller('reservasi')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservasiController {
  constructor(private reservasi: ReservasiService) {}

  @Post()
  @Roles('member')
  create(
    @Request() req: { user: { id: number } },
    @Body() dto: CreateReservasiDto,
  ) {
    return this.reservasi.create(req.user.id, dto);
  }

  @Get('my')
  @Roles('member')
  mine(@Request() req: { user: { id: number } }) {
    return this.reservasi.mine(req.user.id);
  }

  @Get('my/history')
  @Roles('member')
  history(
    @Request() req: { user: { id: number } },
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.reservasi.history(req.user.id, Number(month), Number(year));
  }

  @Get(':id/e-ticket')
  eTicket(
    @Request() req: { user: { id: number; role: string } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.eTicket(req.user.id, req.user.role, id);
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { id: number; role: string } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.findOne(req.user.id, req.user.role, id);
  }

  @Patch(':id/cancel')
  @Roles('member')
  cancel(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasi.cancel(req.user.id, id);
  }
}
