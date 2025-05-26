import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientsAppointmentDto } from './dto/create-patients_appointment.dto';
import { UpdatePatientsAppointmentDto } from './dto/update-patients_appointment.dto';
import { PatientsAppointment } from './entities/patients_appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsAppointmentService {
  constructor(
    @InjectRepository(PatientsAppointment)
    private readonly patientAppointmentRepository: Repository<PatientsAppointment>,
  ) {}

  create(createPatientsAppointmentDto: CreatePatientsAppointmentDto) {
    const newAppointment = this.patientAppointmentRepository.create({
      full_name: createPatientsAppointmentDto.full_name,
      phone_number: createPatientsAppointmentDto.phone_number,
      appointment_date: createPatientsAppointmentDto.appointment_date,
      appointment_time: createPatientsAppointmentDto.appointment_time,
      reason: createPatientsAppointmentDto.reason,
    });

    return this.patientAppointmentRepository.save(newAppointment);
  }

  findAll() {
    return this.patientAppointmentRepository.find();
  }

  findOne(id: number) {
    return this.patientAppointmentRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updatePatientsAppointmentDto: UpdatePatientsAppointmentDto,
  ) {
    return this.patientAppointmentRepository.update(
      { id },
      updatePatientsAppointmentDto,
    );
  }

  public async remove(id: number) {
    try {
      return await this.patientAppointmentRepository.delete(id);
    } catch (error) {
      return new BadRequestException('Sorry appointment not found');
    }
  }
}
