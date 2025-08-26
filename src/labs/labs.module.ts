import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './entities/lab.entity';
import { PatientsRecord } from '../patients_records/entities/patients_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lab, PatientsRecord])],
  controllers: [LabsController],
  providers: [LabsService],
  exports: [LabsService],
})
export class LabsModule {}
