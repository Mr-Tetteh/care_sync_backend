import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PatientsAppointmentService } from './patients_appointment.service';
import { CreatePatientsAppointmentDto } from './dto/create-patients_appointment.dto';
import { UpdatePatientsAppointmentDto } from './dto/update-patients_appointment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('patients-appointment')
export class PatientsAppointmentController {
  constructor(
    private readonly patientsAppointmentService: PatientsAppointmentService,
  ) {}

  @Post()
  create(@Body() createPatientsAppointmentDto: CreatePatientsAppointmentDto) {
    return this.patientsAppointmentService.create(createPatientsAppointmentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.patientsAppointmentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.patientsAppointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientsAppointmentDto: UpdatePatientsAppointmentDto,
  ) {
    return this.patientsAppointmentService.update(
      +id,
      updatePatientsAppointmentDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.patientsAppointmentService.remove(+id);
  }
}
