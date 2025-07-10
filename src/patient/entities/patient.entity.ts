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
    unique: false,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  gender: string;

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
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  ghana_card_number: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  emergency_personal_name: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  emergency_personal_contact: string;

  @Column({
    nullable: false,
    length: 7,
    type: 'varchar',
  })
  patient_id: string;
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
