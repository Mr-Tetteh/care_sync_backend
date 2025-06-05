import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientsRecordDto {
  @IsNotEmpty()
  @IsString()
  temperature;

  @IsNotEmpty()
  @IsString()
  doctor_notes;
  @IsNotEmpty()
  @IsString()
  nurse_notes;
  @IsNotEmpty()
  @IsString()
  laboratory_notes;
  @IsOptional()
  @IsString()
  pharmacist_notes;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
