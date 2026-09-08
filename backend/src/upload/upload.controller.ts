import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

const imageOptions = (destination: string) => ({
  storage: diskStorage({
    destination,
    filename: (_request, file, callback) =>
      callback(
        null,
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`,
      ),
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (
    _request: unknown,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => callback(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype)),
});

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  private response(file: Express.Multer.File, folder: string) {
    if (!file) {
      throw new BadRequestException(
        'JPEG, PNG, or WEBP image up to 2MB is required',
      );
    }
    return {
      message: 'File uploaded',
      data: {
        filename: file.filename,
        path: `/uploads/${folder ? folder + '/' : ''}${file.filename}`,
      },
    };
  }

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload Berkas Gambar Umum (Multipart Form Data)',
    description:
      'Upload gambar ke /uploads. Field form-data: file. Format JPEG/PNG/WEBP, max 2MB. Publik.',
  })
  @UseInterceptors(FileInterceptor('file', imageOptions('./uploads')))
  image(@UploadedFile() file: Express.Multer.File) {
    return this.response(file, '');
  }

  @Post('spaces')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_space')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload Foto Ruangan / Meja Space',
    description:
      'Admin mengunggah foto space ke /uploads/spaces. Field form-data: file. Wajib JWT admin_space.',
  })
  @UseInterceptors(FileInterceptor('file', imageOptions('./uploads/spaces')))
  spaces(@UploadedFile() file: Express.Multer.File) {
    return this.response(file, 'spaces');
  }

  @Post('members')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload Foto Profil Member / Pelanggan',
    description:
      'Upload foto profil ke /uploads/members. Field form-data: file. Wajib JWT (member atau admin).',
  })
  @UseInterceptors(FileInterceptor('file', imageOptions('./uploads/members')))
  members(@UploadedFile() file: Express.Multer.File) {
    return this.response(file, 'members');
  }

  @Post('pembayaran')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload Foto Bukti Pembayaran Reservasi',
    description:
      'Member mengunggah foto bukti transfer/pembayaran ke /uploads/pembayaran. Field form-data: file. Format JPEG/PNG/WEBP max 2MB. Wajib JWT.',
  })
  @UseInterceptors(FileInterceptor('file', imageOptions('./uploads/pembayaran')))
  pembayaran(@UploadedFile() file: Express.Multer.File) {
    return this.response(file, 'pembayaran');
  }
}
