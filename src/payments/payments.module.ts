import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';
import { HospitalService } from '../hospital_service/entities/hospital_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, HospitalService, Pharmacy])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
