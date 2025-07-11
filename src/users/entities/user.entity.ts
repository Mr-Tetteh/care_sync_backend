import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientsAppointment } from '../../patients_appointment/entities/patients_appointment.entity';
import { PatientsRecord } from 'src/patients_records/entities/patients_record.entity';

@Entity('users')
export class User {
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
    nullable: true,
    length: 255,
    type: 'varchar',
    unique: true,
  })
  phone: string;
  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
    unique: true,
  })
  email: string;
  @Column({
    nullable: false,
    type: 'enum',
    enum: [
      'Administrator',
      'Nurse',
      'Doctor',
      'Pharmacist',
      'Lab_Technician',
      'Receptionist',
    ],
  })
  role: string;
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
    length: 255,
    type: 'varchar',
  })
  password: string;
  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  CreatedAt: Date;

  @OneToMany(() => PatientsAppointment, (appointment) => appointment.user, {
    cascade: true,
  })
  appointment: PatientsAppointment[];
}
