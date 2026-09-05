import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() { return { message: 'Smart Space Booking API online', data: { docs: '/api/docs' } }; }

  @Get('health')
  health() { return { message: 'Healthy', data: { uptime: process.uptime() } }; }
}
