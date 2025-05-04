import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientsRecordDto } from './create-patients_record.dto';

export class UpdatePatientsRecordDto extends PartialType(CreatePatientsRecordDto) {}
