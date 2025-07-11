import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity('patients_record')
export class PatientsRecord {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  temperature: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  pulse_rate: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  respiratory_rate: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  blood_pressure: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  weight: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  spo2: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  fbs: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  rbs: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  doctor_notes: string;
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
