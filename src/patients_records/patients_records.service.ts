import { Injectable } from '@nestjs/common';
import { CreatePatientsRecordDto } from './dto/create-patients_record.dto';
import { UpdatePatientsRecordDto } from './dto/update-patients_record.dto';
import { Repository } from 'typeorm';
import { PatientsRecord } from './entities/patients_record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientsRecordsService {
  constructor(
    @InjectRepository(PatientsRecord)
    private readonly patientRecordRepository: Repository<PatientsRecord>,
  ) {}

  // create(createPatientsRecordDto: CreatePatientsRecordDto, id: number) {
  //   const newRecord = this.patientRecordRepository.create({
  //     temperature: createPatientsRecordDto.temperature,
  //     pluse_rate: createPatientsRecordDto.pluse_rate,
  //     respiratory_rate: createPatientsRecordDto.respiratory_rate,
  //     blood_pressure: createPatientsRecordDto.blood_pressure,
  //     weight: createPatientsRecordDto.weight,
  //     blood_sugar_rate: createPatientsRecordDto.blood_sugar_rate,
  //     admitted: createPatientsRecordDto.admitted,
  //     ward_number: createPatientsRecordDto.ward_number,
  //     examination_findings: createPatientsRecordDto.examination_findings,
  //     user: { id: id },
  //   })
  //   return this.patientRecordRepository.save(newRecord);
  // }

  create(createPatientsRecordDto: CreatePatientsRecordDto) {
    return this.patientRecordRepository.save(createPatientsRecordDto);
  }

  findAll() {
    return this.patientRecordRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} patientsRecord`;
  }

  update(id: number, updatePatientsRecordDto: UpdatePatientsRecordDto) {
    return this.patientRecordRepository.update({ id }, updatePatientsRecordDto);
  }

  remove(id: number) {
    return `This action removes a #${id} patientsRecord`;
  }
}
