import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateLabDto {
  @IsNotEmpty()
  @IsString()
  lab_name: string;

/*  @IsNotEmpty()
  @IsString()
  lab_report: string;*/

/*  @IsNotEmpty()
  @IsNumberString()
  patientRecordId: string;*/
}
