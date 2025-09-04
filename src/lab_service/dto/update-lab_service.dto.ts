import { PartialType } from '@nestjs/mapped-types';
import { CreateLabServiceDto } from './create-lab_service.dto';

export class UpdateLabServiceDto extends PartialType(CreateLabServiceDto) {}
