import { Injectable } from '@nestjs/common';
import { CreateHospitalServiceDto } from './dto/create-hospital_service.dto';
import { UpdateHospitalServiceDto } from './dto/update-hospital_service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalService } from './entities/hospital_service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalServiceService {
  constructor(
    @InjectRepository(HospitalService)
    private readonly hospitalServiceRepository: Repository<HospitalService>,
  ) {}

  create(createHospitalServiceDto: CreateHospitalServiceDto) {
    return this.hospitalServiceRepository.save(createHospitalServiceDto);
  }

  findAll() {
    return this.hospitalServiceRepository.find();
  }

  findOne(id: number) {
    return this.hospitalServiceRepository.findOneBy({ id });
  }

  findByConsultationTrue() {
    return this.hospitalServiceRepository.findOne({
      where: { NHIS: true, name: 'Consultation Fee' },
    });
  }

  findByConsultationFalse() {
    return this.hospitalServiceRepository.findOne({
      where: { NHIS: false, name: 'Consultation Fee' },
    });
  }

  update(id: number, updateHospitalServiceDto: UpdateHospitalServiceDto) {
    return this.hospitalServiceRepository.update(id, updateHospitalServiceDto);
  }

  remove(id: number) {
    return this.hospitalServiceRepository.delete(id);
  }
}
