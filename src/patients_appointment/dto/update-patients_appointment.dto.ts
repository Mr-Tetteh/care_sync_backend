import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientsAppointmentDto } from './create-patients_appointment.dto';

export class UpdatePatientsAppointmentDto extends PartialType(
  CreatePatientsAppointmentDto,
) {}
