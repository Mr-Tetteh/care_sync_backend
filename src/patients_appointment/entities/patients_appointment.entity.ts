import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('appointment')
export class PatientsAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  full_name: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone_number: number;
  @Column({
    type: 'date',
    nullable: false,
  })
  appointment_date: Date;

  @Column({
    type: 'time',
    nullable: false,
  })
  appointment_time: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  reason: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending',
  })
  status: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  Created_at: Date;

  @ManyToOne(() => User, (user) => user.appointment, { onDelete: 'CASCADE' })
  user: User;
}
