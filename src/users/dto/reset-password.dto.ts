import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class ResetPasswordDto {
  resetToken: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  newPassword: string;
}
