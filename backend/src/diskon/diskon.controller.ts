import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiskonService } from './diskon.service';
import { CheckPromoDto } from './dto/check-promo.dto';

@ApiTags('diskon')
@Controller('diskon')
export class DiskonController {
  constructor(private diskon: DiskonService) {}

  @Get('active')
  active() {
    return this.diskon.active();
  }

  @Post('check')
  check(@Body() dto: CheckPromoDto) {
    return this.diskon.check(dto.nama_diskon);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diskon.findOne(id);
  }
}
