import { Module } from '@nestjs/common';
import { PatientsAppointmentService } from './patients_appointment.service';
import { PatientsAppointmentController } from './patients_appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsAppointment } from './entities/patients_appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientsAppointment])],
  controllers: [PatientsAppointmentController],
  providers: [PatientsAppointmentService],
})
export class PatientsAppointmentModule {}
