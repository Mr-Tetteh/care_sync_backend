import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientsAppointmentDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;
  @IsNotEmpty()
  @IsString()
  phone_number: string;
  @IsNotEmpty()
  @IsString()
  reason: string;
  @IsNotEmpty()
  @IsString()
  appointment_date: string;

  @IsNotEmpty()
  @IsString()
  appointment_time: string;

  @IsOptional()
  @IsString()
  status?: string;
}
