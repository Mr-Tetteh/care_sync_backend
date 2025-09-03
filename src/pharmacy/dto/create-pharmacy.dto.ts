import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePharmacyDto {
  @IsNotEmpty()
  @IsString()
  drug_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  drug_price: number;

  @IsNotEmpty()
  @IsString()
  drug_category: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  drug_quantity: number;

  @IsString()
  @IsOptional()
  drug_description?: string;

  @IsString()
  additional_note?: string;
}
