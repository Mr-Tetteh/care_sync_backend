import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientsRecordDto {
  @IsNotEmpty()
  @IsString()
  temperature;

  @IsNotEmpty()
  @IsString()
  pulse_rate;
  @IsNotEmpty()
  @IsString()
  respiratory_rate;
  @IsNotEmpty()
  @IsString()
  blood_pressure;
  @IsNotEmpty()
  @IsString()
  weight;
  @IsNotEmpty()
  @IsString()
  blood_sugar_rate;
  @IsNotEmpty()
  @IsBoolean()
  admitted;
  @IsNotEmpty()
  @IsString()
  ward_number;
  @IsNotEmpty()
  @IsString()
  examination_findings;
  @IsNotEmpty()
  @IsString()
  diagnosis;
  @IsNotEmpty()
  @IsString()
  labs;
  @IsNotEmpty()
  @IsString()
  treatment;
  @IsNotEmpty()
  @IsString()
  additional_note;
}
