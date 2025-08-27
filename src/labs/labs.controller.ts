import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Request,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('lab_report', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() createLabDto: CreateLabDto,
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // Convert string id to number and pass it to the service
    const patientRecordId = parseInt(id, 10);
    return this.labsService.create(patientRecordId, createLabDto, file);
  }

  @Get()
  findAll() {
    return this.labsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabDto: UpdateLabDto) {
    return this.labsService.update(+id, updateLabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labsService.remove(+id);
  }
}
