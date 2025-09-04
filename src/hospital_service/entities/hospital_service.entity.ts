import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital_services')
export class HospitalService {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'decimal', nullable: false, scale: 2, precision: 10 })
  price: number;
  @Column({ type: 'boolean', default: false })
  NHIS: boolean;
}
