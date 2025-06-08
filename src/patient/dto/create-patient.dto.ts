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
  email?: string;

  @IsOptional()
  age?: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  NHIS?: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;

  @IsNotEmpty()
  @IsString()
  guardian_1_first_name: string;

  @IsOptional()
  @IsString()
  guardian_1_last_name?: string;

  @IsNotEmpty()
  @IsString()
  guardian_1_relation: string;

  @IsNotEmpty()
  @IsString()
  guardian_1_contact: string;

  @IsNotEmpty()
  @IsString()
  guardian_1_residence?: string;

  @IsOptional()
  @IsString()
  guardian_2_first_name?: string;

  @IsOptional()
  @IsString()
  guardian_2_last_name?: string;

  @IsOptional()
  @IsString()
  guardian_2_relation?: string;

  @IsOptional()
  @IsString()
  guardian_2_contact?: string;

  @IsOptional()
  @IsString()
  guardian_2_residence?: string;
}
