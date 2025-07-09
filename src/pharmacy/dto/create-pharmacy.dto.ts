import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePharmacyDto {
  @IsNotEmpty()
  @IsString()
  drug_name: string;

  @IsNotEmpty()
  @IsNumber()
  drug_price: string;

  @IsNotEmpty()
  @IsString()
  drug_category: string;

  @IsNotEmpty()
  @IsNumber()
  drug_quantity: string;

  @IsString()
  drug_description?: string;

  @IsString()
  additional_note?: string;
}
