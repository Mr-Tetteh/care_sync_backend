import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmacy } from './entities/pharmacy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pharmacy])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
