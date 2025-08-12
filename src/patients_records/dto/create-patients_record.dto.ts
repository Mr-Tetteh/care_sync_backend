import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientsRecordDto {
  @IsNotEmpty({ message: 'Temperature is required' })
  @IsString()
  temperature: string;

  @IsNotEmpty({ message: 'Pulse rate is required' })
  @IsString()
  pulse_rate: string;

  @IsNotEmpty({ message: 'Respiratory rate is required' })
  @IsString()
  respiratory_rate: string;

  @IsNotEmpty({ message: 'Blood pressure is required' })
  @IsString()
  blood_pressure: string;

  @IsNotEmpty({ message: 'Weight is required' })
  @IsString()
  weight: string;

  @IsOptional()
  @IsString()
  spo2?: string;

  @IsOptional()
  @IsString()
  rbs?: string;

  @IsOptional()
  @IsString()
  fbs?: string;

  @IsOptional()
  @IsString()
  history?: string;
  @IsOptional()
  @IsString()
  examination_findings?: string;
  @IsOptional()
  @IsString()
  diagnosis?: string;
  @IsOptional()
  @IsString()
  investigations?: string;
  @IsOptional()
  @IsString()
  treatment?: string;
  @IsOptional()
  @IsString()
  laboratory_notes?: string;

  @IsOptional()
  @IsString()
  pharmacist_notes?: string;
}
