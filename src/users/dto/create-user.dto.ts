import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  first_name: string;
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  last_name: string;
  @IsOptional()
  @IsString()
  other_names?: string;
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Unique(['phone'])
  phone: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Unique(['email'])
  email: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString()
  gender: string;
  @IsString()
  @IsOptional()
  role?: string;
  @IsString()
  @IsOptional()
  doctors_specialization: string;
  @IsOptional()
  @IsBoolean()
  active_doctor: boolean;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;
  @IsNotEmpty()
  @IsString()
  password: string;
}
