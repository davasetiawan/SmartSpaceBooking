import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<any> {
    if (!file) return { secure_url: '', public_id: '' };

    // 1. Try Cloudinary if environment variable is configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      try {
        const cloudResult = await new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            { folder: 'smart-space' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          Readable.from(file.buffer).pipe(upload);
        });
        return cloudResult;
      } catch (err) {
        console.warn('Cloudinary upload failed, falling back to local file storage:', err);
      }
    }

    // 2. Fallback to local file storage in ./uploads directory
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname || '') || '.jpg';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    return {
      secure_url: `/uploads/${filename}`,
      public_id: filename,
    };
  }
}
