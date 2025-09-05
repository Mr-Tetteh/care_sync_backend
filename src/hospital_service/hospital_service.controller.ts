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
import { HospitalServiceService } from './hospital_service.service';
import { CreateHospitalServiceDto } from './dto/create-hospital_service.dto';
import { UpdateHospitalServiceDto } from './dto/update-hospital_service.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('hospital-service')
export class HospitalServiceController {
  constructor(
    private readonly hospitalServiceService: HospitalServiceService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createHospitalServiceDto: CreateHospitalServiceDto) {
    return this.hospitalServiceService.create(createHospitalServiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.hospitalServiceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.hospitalServiceService.findOne(+id);
  }

  @Get('nhis/true')
  @UseGuards(AuthGuard)
  findByConsultationTrue() {
    return this.hospitalServiceService.findByConsultationTrue();
  }

  @Get('nhis/false')
  @UseGuards(AuthGuard)
  findByConsultationFalse() {
    return this.hospitalServiceService.findByConsultationFalse();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateHospitalServiceDto: UpdateHospitalServiceDto,
  ) {
    return this.hospitalServiceService.update(+id, updateHospitalServiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.hospitalServiceService.remove(+id);
  }
}
