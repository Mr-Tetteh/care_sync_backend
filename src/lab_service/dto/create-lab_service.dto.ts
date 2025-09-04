import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLabServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;
  @IsBoolean()
  @IsNotEmpty()
  NHIS: boolean;
}
