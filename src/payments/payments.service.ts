import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { In, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalService } from '../hospital_service/entities/hospital_service.entity';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';
import { LabService } from '../lab_service/entities/lab_service.entity';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(HospitalService)
    private readonly hospitalServiceRepository: Repository<HospitalService>,
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepository: Repository<Pharmacy>,
    @InjectRepository(LabService)
    private readonly labServiceRepository: Repository<LabService>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const patient = await this.patientRepository.findOne({
      where: { patient_id: createPaymentDto.patient_id },
    });
    if (!patient) {
      throw new BadRequestException('sorry user does not exit');
    }

    const selectedLabsTrueNames = await this.labServiceRepository.find({
      where: { id: In(createPaymentDto.selectedLabsTrueIds || []) },
    });
    const labTrueNames = selectedLabsTrueNames
      .map((lab) => lab.name)
      .join(', ');

    const labsTrueTotalAmount = await this.labServiceRepository.find({
      where: { id: In(createPaymentDto.selectedLabsTrueIds || []) },
    });

    const totalAmountLabTrue = labsTrueTotalAmount.reduce(
      (sum, lab) => sum + Number(lab.price),
      0,
    );

    const selectedLabsFalseNames = await this.labServiceRepository.find({
      where: { id: In(createPaymentDto.selectedLabsFalseIds || []) },
    });
    const labFalseNames = selectedLabsFalseNames
      .map((lab) => lab.name)
      .join(', ');

    const labsFalseTotalAmount = await this.labServiceRepository.find({
      where: { id: In(createPaymentDto.selectedLabsFalseIds || []) },
    });

    const totalAmountLabFalse = labsFalseTotalAmount.reduce(
      (sum, lab) => sum + Number(lab.price),
      0,
    );

    const selectedDrugNames = await this.pharmacyRepository.find({
      where: { id: In(createPaymentDto.selectedDrugIds || []) },
    });
    const drugNames = selectedDrugNames
      .map((drug) => drug.drug_name)
      .join(', ');

    const DrugsTotalAmount = await this.pharmacyRepository.find({
      where: { id: In(createPaymentDto.selectedDrugIds || []) },
    });

    const totalDrugsAmount = DrugsTotalAmount.reduce(
      (sum, drug) => sum + Number(drug.drug_price),
      0,
    );
    const payment = this.paymentRepository.create({
      reasonForPayment: createPaymentDto.reasonForPayment,
      insuranceCover: createPaymentDto.insuranceCover,
      selectedLabsTrueIds: createPaymentDto.selectedLabsTrueIds,
      selectedLabsTrueNames: labTrueNames,
      selectedLabsTrueNamesTotalAmount: totalAmountLabTrue,
      selectedLabsFalseIds: createPaymentDto.selectedLabsFalseIds,
      selectedLabsFalseNames: labFalseNames,
      selectedLabsFalseNamesTotalAmount: totalAmountLabFalse,
      selectedDrugIds: createPaymentDto.selectedDrugIds,
      selectedDrugNames: drugNames,
      selectedDrugNamesTotalAmount: totalDrugsAmount,
      consultationFalsePrice: createPaymentDto.consultationFalsePrice,
      consultationTruePrice: createPaymentDto.consultationTruePrice,
      patient_id: createPaymentDto.patient_id,
    });
    const savedPayment = this.paymentRepository.save(payment);
  }

  findAllLabsPayments() {
    return this.paymentRepository.find({ where: { reasonForPayment: 'Labs' } });
  }

  findAllDrugsPayments() {
    return this.paymentRepository.find({
      where: { reasonForPayment: 'Drugs' },
      order: { id: 'DESC' },
    });
  }

  findAllConsultationPayment() {
    return this.paymentRepository.find({
      where: { reasonForPayment: 'Consultation' },
      order: { id: 'DESC' },
    });
  }

  findLatestRequest() {
    return this.paymentRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });
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
