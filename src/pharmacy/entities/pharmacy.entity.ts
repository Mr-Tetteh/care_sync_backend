import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pharmacy')
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  drug_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  drug_price: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  drug_category: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  drug_quantity: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  drug_description: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  additional_note: string;
}
