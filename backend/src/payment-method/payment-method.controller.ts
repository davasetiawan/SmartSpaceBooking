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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@ApiTags('payment-method')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin_space')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private paymentMethod: PaymentMethodService) {}

  @Get()
  @ApiOperation({
    summary: 'Daftar metode pembayaran milik admin',
    description: 'Menampilkan metode pembayaran milik admin yang login. Query aktif=true hanya menampilkan yang aktif.',
  })
  findAll(@Request() req: { user: { id: number } }, @Query('aktif') aktif?: string) {
    return this.paymentMethod.findAll(req.user.id, aktif === 'true');
  }

  @Get('public/active')
  @Roles('member', 'admin_space')
  @ApiOperation({ summary: 'Daftar metode pembayaran aktif untuk checkout' })
  findActivePublic() {
    return this.paymentMethod.findActivePublic();
  }

  @Post()
  @ApiOperation({ summary: 'Tambah metode pembayaran (admin)' })
  create(@Request() req: { user: { id: number } }, @Body() dto: CreatePaymentMethodDto) {
    return this.paymentMethod.create(req.user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update metode pembayaran (admin, partial)' })
  update(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethod.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus metode pembayaran (admin)' })
  remove(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number) {
    return this.paymentMethod.remove(req.user.id, id);
  }

}