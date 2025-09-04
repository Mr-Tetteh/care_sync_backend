import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalServiceDto } from './create-hospital_service.dto';

export class UpdateHospitalServiceDto extends PartialType(CreateHospitalServiceDto) {}
