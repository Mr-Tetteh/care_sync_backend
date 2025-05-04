import { Test, TestingModule } from '@nestjs/testing';
import { PatientsAppointmentService } from './patients_appointment.service';

describe('PatientsAppointmentService', () => {
  let service: PatientsAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsAppointmentService],
    }).compile();

    service = module.get<PatientsAppointmentService>(PatientsAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
