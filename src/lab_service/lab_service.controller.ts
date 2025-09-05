import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LabServiceService } from './lab_service.service';
import { CreateLabServiceDto } from './dto/create-lab_service.dto';
import { UpdateLabServiceDto } from './dto/update-lab_service.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lab-service')
export class LabServiceController {
  constructor(private readonly labServiceService: LabServiceService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createLabServiceDto: CreateLabServiceDto) {
    return this.labServiceService.create(createLabServiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.labServiceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.labServiceService.findOne(+id);
  }

  @Get('nhis/true')
  @UseGuards(AuthGuard)
  findByNHISTrue() {
    return this.labServiceService.findByNHISTrue();
  }

  @Get('nhis/false')
  @UseGuards(AuthGuard)
  findByNHISFalse() {
    return this.labServiceService.findByNHISFalse();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateLabServiceDto: UpdateLabServiceDto,
  ) {
    return this.labServiceService.update(+id, updateLabServiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.labServiceService.remove(+id);
  }
}
