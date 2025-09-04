import { Module } from '@nestjs/common';
import { HospitalServiceService } from './hospital_service.service';
import { HospitalServiceController } from './hospital_service.controller';
import { HospitalService } from './entities/hospital_service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalService])],
  controllers: [HospitalServiceController],
  providers: [HospitalServiceService],
  exports: [HospitalServiceService],
})
export class HospitalServiceModule {}
