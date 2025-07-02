import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  recipient: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsString()
  @IsOptional()
  text?: string;
}
