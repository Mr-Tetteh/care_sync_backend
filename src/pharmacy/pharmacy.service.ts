import { Injectable } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacy } from './entities/pharmacy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepository: Repository<Pharmacy>,
  ) {}

  create(createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyRepository.save(createPharmacyDto);
  }

  findAll() {
    return this.pharmacyRepository.find();
  }

  async findAllGroupedByCategory() {
    const allDrugs = await this.pharmacyRepository.find();

    const grouped = allDrugs.reduce((acc, drug) => {
      const category = drug.drug_category || 'Uncategorized';
      acc[category] = acc[category] || [];
      acc[category].push(drug);
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, drugs]) => ({
      category,
      drugs,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} pharmacy`;
  }

  update(id: number, updatePharmacyDto: UpdatePharmacyDto) {
    return this.pharmacyRepository.update({ id }, updatePharmacyDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pharmacy`;
  }
}
