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
  @UseGuards(AuthGuard)
  create(
    @Body() createPatientsAppointmentDto: CreatePatientsAppointmentDto,
    @Request() req,
  ) {
    return this.patientsAppointmentService.create(
      createPatientsAppointmentDto,
      req.user,
    );
  }

  @Get()
  findAll() {
    return this.patientsAppointmentService.findAll();
  }

  @Get(':id')
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
  remove(@Param('id') id: string) {
    return this.patientsAppointmentService.remove(+id);
  }
}
