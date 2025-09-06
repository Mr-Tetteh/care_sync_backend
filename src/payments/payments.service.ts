import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { In, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalService } from '../hospital_service/entities/hospital_service.entity';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(HospitalService)
    private readonly hospitalServiceRepository: Repository<HospitalService>,
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepository: Repository<Pharmacy>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const selectedLabsTrueNames = await this.hospitalServiceRepository.find({
      where: { id: In(createPaymentDto.selectedLabsTrueIds || []) },
    });
    const labTrueNames = selectedLabsTrueNames
      .map((lab) => lab.name)
      .join(', ');
    const payment = this.paymentRepository.create({
      reasonForPayment: createPaymentDto.reasonForPayment,
      insuranceCover: createPaymentDto.insuranceCover,
      selectedLabsTrueIds: createPaymentDto.selectedLabsTrueIds,
      selectedLabsTrueNames: labTrueNames,
      selectedLabsTrueNamesTotalAmount:
        createPaymentDto.selectedLabsTrueNamesTotalAmount,
      selectedLabsFalseIds: createPaymentDto.selectedLabsFalseIds,
      selectedLabsFalseNames: createPaymentDto.selectedLabsFalseNames,
      selectedLabsFalseNamesTotalAmount:
        createPaymentDto.selectedLabsFalseNamesTotalAmount,
      selectedDrugIds: createPaymentDto.selectedDrugIds,
      selectedDrugNames: createPaymentDto.selectedDrugNames,
      selectedDrugNamesTotalAmount:
        createPaymentDto.selectedDrugNamesTotalAmount,
      consultationFalsePrice: createPaymentDto.consultationFalsePrice,
      consultationTruePrice: createPaymentDto.consultationTruePrice,
    });
    const savedPayment = this.paymentRepository.save(payment);
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
