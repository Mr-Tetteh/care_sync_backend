import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    if (createPatientDto.email) {
      throw new UnauthorizedException('Patient email exist');
    } else if (createPatientDto.phone) {
      throw new UnauthorizedException('Phone number already exist');
    } else if (createPatientDto.NHIS) {
      throw new UnauthorizedException('NHIS already exist');
    }
    return this.patientRepository.save(createPatientDto);
  }

  findAll() {
    return this.patientRepository.find();
  }

  findOne(id: number) {
    return this.patientRepository.findOne({ where: { id } });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
