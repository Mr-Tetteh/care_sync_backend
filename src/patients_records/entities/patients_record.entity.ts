import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients_record')
export class PatientsRecord {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'longtext',
    nullable: true,
  })
  nurse_notes: string;
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

  @ManyToOne(() => User, (user) => user.patientsRecords, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
