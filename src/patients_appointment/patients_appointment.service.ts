import { Injectable } from '@nestjs/common';
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

  create(
    createPatientsAppointmentDto: CreatePatientsAppointmentDto,
    user: any,
  ) {
    const UserId = user.sub || user.id || user.user.id;
    const newAppointment = this.patientAppointmentRepository.create({
      appointment_date: createPatientsAppointmentDto.appointment_date,
      appointment_time: createPatientsAppointmentDto.appointment_time,
      reason: createPatientsAppointmentDto.reason,
      user: { id: UserId },
    });

    return this.patientAppointmentRepository.save(newAppointment);
  }

  findAll() {
    return this.patientAppointmentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} patientsAppointment`;
  }

  update(
    id: number,
    updatePatientsAppointmentDto: UpdatePatientsAppointmentDto,
  ) {
    return `This action updates a #${id} patientsAppointment`;
  }

  remove(id: number) {
    return this.patientAppointmentRepository.delete(id);
  }
}
