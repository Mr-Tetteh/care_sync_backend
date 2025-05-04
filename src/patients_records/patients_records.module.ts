import { Module } from '@nestjs/common';
import { PatientsRecordsService } from './patients_records.service';
import { PatientsRecordsController } from './patients_records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsRecord } from './entities/patients_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientsRecord])],
  controllers: [PatientsRecordsController],
  providers: [PatientsRecordsService],
})
export class PatientsRecordsModule {}
