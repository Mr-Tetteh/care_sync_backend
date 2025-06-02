import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsString()
  other_names: string;
  @IsNotEmpty()
  @IsString()
  @Unique(['phone'])
  phone: string;
  @IsNotEmpty()
  @IsEmail()
  @Unique(['email'])
  email: string;
  @IsString()
  @IsOptional()
  role?: string;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;
  @IsNotEmpty()
  @IsString()
  password: string;
}
