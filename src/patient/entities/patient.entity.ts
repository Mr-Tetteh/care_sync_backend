import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientsAppointment } from '../../patients_appointment/entities/patients_appointment.entity';
import { PatientsRecord } from 'src/patients_records/entities/patients_record.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  first_name: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  last_name: string;

  @Column({
    nullable: true,
    length: 255,
    type: 'varchar',
  })
  other_names: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  phone: string;

  @Column({
    nullable: true,
    length: 255,
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  gender: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  age: number;

  @Column({
    nullable: false,
    type: 'date',
  })
  date_of_birth: Date;

  @Column({
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  address: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  NHIS: string;

  @Column({
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  guardian_1_first_name: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  guardian_1_last_name: string;

  @Column({
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  guardian_1_relation: string;

  @Column({
    nullable: false,
    length: 20,
    type: 'varchar',
  })
  guardian_1_contact: string;

  @Column({
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  guardian_1_residence: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  guardian_2_first_name: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  guardian_2_last_name: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  guardian_2_relation: string;

  @Column({
    nullable: true,
    length: 20,
    type: 'varchar',
  })
  guardian_2_contact: string;

  @Column({
    nullable: true,
    length: 100,
    type: 'varchar',
  })
  guardian_2_residence: string;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  CreatedAt: Date;

  @OneToMany(() => PatientsRecord, (patientRecord) => patientRecord.patient, {
    cascade: true,
  })
  patientsRecords: PatientsRecord[];
}
