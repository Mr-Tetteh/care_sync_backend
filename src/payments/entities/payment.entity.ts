import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: false, length: 255 })
  reasonForPayment: string;
  @Column({ type: 'boolean', nullable: false })
  insuranceCover: boolean | null;
  @Column('simple-array')
  selectedLabsTrueIds: number[]; // for multiple select
  @Column({ type: 'longtext', nullable: true })
  selectedLabsTrueNames: string; // comma-separated names
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selectedLabsTrueNamesTotalAmount: number; // for cost fee of lab when insuranceCover is true
  @Column('simple-array')
  selectedLabsFalseIds: number[]; // for multiple select
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selectedLabsFalseNamesTotalAmount: number; // for cost fee of lab when insuranceCover is False
  @Column({ type: 'longtext', nullable: true })
  selectedLabsFalseNames: string; // comma-separated names
  @Column('simple-array')
  selectedDrugIds: number[]; // for multiple select
  @Column({ type: 'longtext', nullable: true })
  selectedDrugNames: string; // comma-separated names
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selectedDrugNamesTotalAmount: number; // for cost fee of drugs
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationFalsePrice: number; // for consultation fee with insurance cover
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationTruePrice: number; // for consultation fee without insurance cover
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
