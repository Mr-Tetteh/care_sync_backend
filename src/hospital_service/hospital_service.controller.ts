import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitalServiceService } from './hospital_service.service';
import { CreateHospitalServiceDto } from './dto/create-hospital_service.dto';
import { UpdateHospitalServiceDto } from './dto/update-hospital_service.dto';

@Controller('hospital-service')
export class HospitalServiceController {
  constructor(
    private readonly hospitalServiceService: HospitalServiceService,
  ) {}

  @Post()
  create(@Body() createHospitalServiceDto: CreateHospitalServiceDto) {
    return this.hospitalServiceService.create(createHospitalServiceDto);
  }

  @Get()
  findAll() {
    return this.hospitalServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalServiceService.findOne(+id);
  }

  @Get('nhis/true')
  findByConsultationTrue() {
    return this.hospitalServiceService.findByConsultationTrue();
  }

  @Get('nhis/false')
  findByConsultationFalse() {
    return this.hospitalServiceService.findByConsultationFalse();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalServiceDto: UpdateHospitalServiceDto,
  ) {
    return this.hospitalServiceService.update(+id, updateHospitalServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalServiceService.remove(+id);
  }
}
