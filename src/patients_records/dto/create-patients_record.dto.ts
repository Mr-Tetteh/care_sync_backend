import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientsRecordDto {
  @IsOptional()
  @IsString()
  nurse_notes?: string;
  @IsOptional()
  @IsString()
  doctor_notes?: string;
  @IsOptional()
  @IsString()
  laboratory_notes?: string;
  @IsOptional()
  @IsString()
  pharmacist_notes?: string;
}
