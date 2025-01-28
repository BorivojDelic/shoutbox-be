import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('id') fileId: number,
  ) {
    const file = await this.fileService.findById(fileId);

    if (!file) {
      throw new BadRequestException('File not found');
    }

    const { path, name, mimetype } = file;

    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', `image; filename="${name}"`);

    res.sendFile(path, { root: './' });
  }
}
