// dto/update-quantities.dto.ts
import { IsArray, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateQuantityItemDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class UpdateQuantitiesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuantityItemDto)
  items: UpdateQuantityItemDto[];
}