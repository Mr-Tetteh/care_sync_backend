import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  public async create(createPatientDto: CreatePatientDto) {
    const existingPatient = await this.patientRepository.findOne({
      where: { ghana_card_number: createPatientDto.ghana_card_number },
    });
    if (existingPatient) {
      throw new BadRequestException(
        'A patient with this Ghana Card number already exists',
      );
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
