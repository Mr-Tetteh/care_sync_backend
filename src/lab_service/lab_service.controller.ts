import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabServiceService } from './lab_service.service';
import { CreateLabServiceDto } from './dto/create-lab_service.dto';
import { UpdateLabServiceDto } from './dto/update-lab_service.dto';

@Controller('lab-service')
export class LabServiceController {
  constructor(private readonly labServiceService: LabServiceService) {}

  @Post()
  create(@Body() createLabServiceDto: CreateLabServiceDto) {
    return this.labServiceService.create(createLabServiceDto);
  }

  @Get()
  findAll() {
    return this.labServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labServiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabServiceDto: UpdateLabServiceDto,
  ) {
    return this.labServiceService.update(+id, updateLabServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labServiceService.remove(+id);
  }
}
