import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { PatientsRecord } from '../../patients_records/entities/patients_record.entity';
@Entity()
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  lab_name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  lab_report: string;

  @ManyToOne(() => PatientsRecord, (patientRecord) => patientRecord.labs, {
    eager: false,
    onDelete: 'CASCADE',
  })
  patientRecord: PatientsRecord;
}
