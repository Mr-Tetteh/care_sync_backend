import { Injectable } from '@nestjs/common';
import { CreateLabServiceDto } from './dto/create-lab_service.dto';
import { UpdateLabServiceDto } from './dto/update-lab_service.dto';
import { LabService } from './entities/lab_service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LabServiceService {
  constructor(
    @InjectRepository(LabService)
    private readonly labServiceRepository: Repository<LabService>,
  ) {}

  create(createLabServiceDto: CreateLabServiceDto) {
    return this.labServiceRepository.save(createLabServiceDto);
  }

  findAll() {
    return this.labServiceRepository.find();
  }

  findOne(id: number) {
    return this.labServiceRepository.findOneBy({ id });
  }

  update(id: number, updateLabServiceDto: UpdateLabServiceDto) {
    return this.labServiceRepository.update(id, updateLabServiceDto);
  }

  remove(id: number) {
    return this.labServiceRepository.delete(id);
  }
}
