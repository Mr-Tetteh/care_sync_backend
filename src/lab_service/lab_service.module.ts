import { Module } from '@nestjs/common';
import { LabServiceService } from './lab_service.service';
import { LabServiceController } from './lab_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabService } from './entities/lab_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabService])],
  controllers: [LabServiceController],
  providers: [LabServiceService],
  exports: [LabServiceService],
})
export class LabServiceModule {}
