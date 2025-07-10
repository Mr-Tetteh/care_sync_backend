import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  other_names?: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  email?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  ghana_card_number?: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;

  @IsNotEmpty()
  @IsString()
  emergency_personal_name: string;

  @IsNotEmpty()
  @IsString()
  emergency_personal_contact: string;

  @IsNotEmpty()
  @IsString()
  patient_id: string;
}
