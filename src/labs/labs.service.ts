import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { Lab } from './entities/lab.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientsRecord } from '../patients_records/entities/patients_record.entity';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(Lab) private readonly labRepository: Repository<Lab>,
    @InjectRepository(PatientsRecord)
    private readonly patientRecordRepo: Repository<PatientsRecord>,
  ) {}

  async create(
    createLabDto: CreateLabDto,
    file: Express.Multer.File,
  ): Promise<any> {
    const patientRecord = await this.patientRecordRepo.findOne({
      where: { id: Number(createLabDto.patientRecordId) },
    });

    if (!patientRecord) {
      throw new NotFoundException('Patient record not found');
    }

    // Store file path
    const filePath = `uploads/${file.filename}`;

    const lab = this.labRepository.create({
      lab_name: createLabDto.lab_name,
      lab_report: filePath,
      patientRecord,
    });

    await this.labRepository.save(lab);

    return {
      message: 'Lab created successfully',
      data: {
        id: lab.id,
        lab_name: lab.lab_name,
        lab_report: filePath,
        fileName: file.originalname,
        fileSize: file.size,
      },
    };
  }

  findAll() {
    return `This action returns all labs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lab`;
  }

  update(id: number, updateLabDto: UpdateLabDto) {
    return `This action updates a #${id} lab`;
  }

  remove(id: number) {
    return `This action removes a #${id} lab`;
  }
}
