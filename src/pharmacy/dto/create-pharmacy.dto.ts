import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePharmacyDto {
  @IsNotEmpty()
  @IsString()
  drug_name: string;

  @IsNotEmpty()
  @IsString()
  drug_price: string;

  @IsNotEmpty()
  @IsString()
  drug_category: string;

  @IsNotEmpty()
  @IsString()
  drug_quantity: string;

  @IsString()
  drug_description?: string;

  @IsString()
  additional_note?: string;
}
