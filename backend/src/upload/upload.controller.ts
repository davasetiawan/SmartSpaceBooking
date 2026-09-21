import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload Berkas Gambar Umum (Multipart Form Data)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File Binary / Buffer Gambar (.jpg, .jpeg, .png, .webp)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File berhasil diupload',
    schema: {
      example: {
        status: true,
        statusCode: 201,
        message: 'File berhasil diupload',
        data: {
          filename: '1787799592972-544446318.jpeg',
          original_name: 'banner.jpeg',
          mimetype: 'image/jpeg',
          size: 1048576,
          url: 'http://localhost:3001/uploads/general/1787799592972-544446318.jpeg',
        },
        timestamp: '2026-08-27T08:39:15.000Z',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }
    const result = await this.cloudinaryService.uploadImage(file, 'general');
    return {
      filename: result.public_id.split('/').pop() + '.' + result.format,
      original_name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: result.secure_url,
    };
  }

  @Post('spaces')
  @ApiOperation({ summary: 'Upload Foto Ruangan / Space Coworking' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File Foto Ruangan / Meja Space (.jpg, .jpeg, .png)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Foto space berhasil diupload',
    schema: {
      example: {
        status: true,
        statusCode: 201,
        message: 'Foto space berhasil diupload',
        data: {
          filename: 'meeting_room_alpha.jpg',
          url: 'http://localhost:3001/uploads/spaces/meeting_room_alpha.jpg',
        },
        timestamp: '2026-08-27T08:39:20.000Z',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadSpacePhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }
    const result = await this.cloudinaryService.uploadImage(file, 'spaces');
    return {
      filename: file.originalname,
      url: result.secure_url,
    };
  }

  @Post('members')
  @ApiOperation({ summary: 'Upload Foto Profil Member / Pelanggan' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File Foto Member (.jpg, .jpeg, .png)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Foto member berhasil diupload',
    schema: {
      example: {
        status: true,
        statusCode: 201,
        message: 'Foto member berhasil diupload',
        data: {
          filename: 'member_john.jpg',
          url: 'http://localhost:3001/uploads/members/member_john.jpg',
        },
        timestamp: '2026-08-27T08:39:25.000Z',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMemberPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }
    const result = await this.cloudinaryService.uploadImage(file, 'members');
    return {
      filename: file.originalname,
      url: result.secure_url,
    };
  }
}
