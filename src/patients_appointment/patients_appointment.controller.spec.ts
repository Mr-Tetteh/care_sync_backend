import { Test, TestingModule } from '@nestjs/testing';
import { PatientsAppointmentController } from './patients_appointment.controller';
import { PatientsAppointmentService } from './patients_appointment.service';

describe('PatientsAppointmentController', () => {
  let controller: PatientsAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsAppointmentController],
      providers: [PatientsAppointmentService],
    }).compile();

    controller = module.get<PatientsAppointmentController>(PatientsAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
