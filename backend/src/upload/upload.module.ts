import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadsStaticController } from './uploads-static.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController, UploadsStaticController],
})
export class UploadModule {}