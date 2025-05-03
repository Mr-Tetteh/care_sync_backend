import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

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
  })
  phone: string;
  @Column({
    nullable: false,
    length: 255,
    type: 'varchar',
  })
  email: string;
  @Column({
    nullable: false,
    type: 'enum',
    enum: ['admin', 'patient', 'nurse', 'doctor', 'pharmacist'],
    default: 'patient',
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
}
