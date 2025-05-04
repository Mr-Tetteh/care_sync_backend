import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientsAppointmentDto {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  appointment_date: string;

  @IsNotEmpty()
  @IsString()
  appointment_time: string;
}
