import { Controller, Get, Param, StreamableFile, NotFoundException, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';
import { createReadStream, existsSync, statSync } from 'fs';
import { join, extname } from 'path';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

@ApiExcludeController()
@Controller('uploads')
export class UploadsStaticController {
  @Get(':filename')
  serveFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const fullPath = join(process.cwd(), 'uploads', filename);
    if (!existsSync(fullPath) || statSync(fullPath).isDirectory()) {
      throw new NotFoundException('File not found');
    }
    const ext = extname(filename).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.set('Content-Type', contentType);

    const fileStream = createReadStream(fullPath);
    return new StreamableFile(fileStream);
  }

  @Get(':folder/:filename')
  serveSubFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const fullPath = join(process.cwd(), 'uploads', folder, filename);
    if (!existsSync(fullPath) || statSync(fullPath).isDirectory()) {
      throw new NotFoundException('File not found');
    }
    const ext = extname(filename).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.set('Content-Type', contentType);

    const fileStream = createReadStream(fullPath);
    return new StreamableFile(fileStream);
  }
}
