import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email field is required.' })
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
