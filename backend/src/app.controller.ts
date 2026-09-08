import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Status API & Petunjuk Penggunaan',
    description: 'Menampilkan pesan API online dan tautan dokumentasi Swagger di /api/docs.',
  })
  root() {
    return {
      message: 'Smart Space Booking API online',
      data: { docs: '/api/docs' },
    };
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check Server',
    description: 'Cek status server dan uptime untuk monitoring.',
  })
  health() {
    return {
      message: 'Healthy',
      data: { uptime: process.uptime() },
    };
  }
}
