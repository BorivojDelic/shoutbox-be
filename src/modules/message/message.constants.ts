import { BadRequestException } from '@nestjs/common';
import {
  IMAGE_FORMATS,
  IMAGE_UPLOAD_PATH,
  MAX_FILE_SIZE,
} from '../../shared/constants/file.constants';

export const MULTER_UPLOAD_IMAGE_OPTIONS = {
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  dest: IMAGE_UPLOAD_PATH,
  fileFilter(
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    if (!IMAGE_FORMATS.includes(file.mimetype)) {
      callback(new BadRequestException('Invalid file type'), false);
    }

    callback(null, true);
  },
};
