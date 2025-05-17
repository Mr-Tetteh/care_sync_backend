import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePatientsAppointmentDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;
  @IsNotEmpty()
  @IsNumber()
  phone_number: number;
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
