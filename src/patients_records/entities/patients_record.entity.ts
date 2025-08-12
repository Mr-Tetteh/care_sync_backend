import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity('patients_record')
export class PatientsRecord {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  temperature: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  pulse_rate: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  respiratory_rate: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  blood_pressure: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  weight: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  spo2: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  fbs: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  rbs: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  history: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  examination_findings: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  diagnosis: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  investigations: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  treatment: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  laboratory_notes: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  pharmacist_notes: string;

  @ManyToOne(() => Patient, (patient) => patient.patientsRecords, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
