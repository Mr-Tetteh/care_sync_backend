import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    nullable: false,
  })
  blood_sugar_rate: string;
  @Column({
    nullable: false,
    default: 0,
  })
  admitted: boolean;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  ward_number: string;
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
  labs: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  treatment: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  additional_note: string;

  @ManyToOne(() => User, (user) => user.patientsRecords, {
    onDelete: 'CASCADE',
  })
  user: User;
}
