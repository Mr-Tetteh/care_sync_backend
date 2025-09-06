import { PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @PrimaryGeneratedColumn()
  id?: number;
  @IsString()
  @IsNotEmpty()
  reasonForPayment: string;
  @IsBoolean()
  @IsNotEmpty()
  insuranceCover: boolean | null;
  @IsArray()
  @IsOptional()
  selectedLabsTrueIds?: number[]; // for multiple select
  @IsArray()
  @IsOptional()
  selectedLabsTrueNames?: string; // comma-separated names
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  selectedLabsTrueNamesTotalAmount: number; // for cost fee of lab when insuranceCover is true
  @IsArray()
  @IsOptional()
  selectedLabsFalseIds: number[]; // for multiple select
  @IsArray()
  @IsOptional()
  selectedLabsFalseNames?: string; // comma-separated names
  @IsNumber()
  @IsOptional()
  selectedLabsFalseNamesTotalAmount?: number; // for cost fee of lab when insuranceCover is False
  @IsArray()
  @IsOptional()
  selectedDrugIds?: number[]; // for multiple select
  @IsString()
  @IsOptional()
  selectedDrugNames: string; // comma-separated names
  @IsNumber()
  @IsOptional()
  selectedDrugNamesTotalAmount?: number; // for cost fee of drugs
  @IsNumber()
  @IsOptional()
  consultationFalsePrice: number; // for consultation fee with insurance cover
  @IsNumber()
  @IsOptional()
  consultationTruePrice?: number; // for consultation fee without insurance cover
}
