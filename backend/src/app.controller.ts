import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Status API & Petunjuk Penggunaan',
    description: 'Menampilkan pesan API online dan tautan dokumentasi Swagger di /docs.',
  })
  root() {
    return {
      message: 'Berhasil memproses permintaan',
      data: {
        name: 'Coworking Space Backend API - UKK RPL Paket B',
        version: '1.0.0',
        status: 'online',
        swagger_docs: '/docs',
        description:
          'Backend service untuk menunjang kelas frontend dalam ujian UKK dengan multi-tenancy App Maker.',
        documentation_links: {
          swagger: 'http://localhost:3000/docs',
          swagger_json: 'http://localhost:3000/docs-json',
        },
      },
    };
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check Server',
    description: 'Cek status server dan uptime untuk monitoring.',
  })
  health() {
    const timestamp = new Date().toISOString();
    return {
      message: 'Berhasil memproses permintaan',
      data: {
        status: 'ok',
        timestamp,
      },
    };
  }
}

