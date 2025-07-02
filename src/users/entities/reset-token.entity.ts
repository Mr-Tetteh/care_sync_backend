import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity('reset_tokens')
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  token: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @IsNotEmpty()
  @Column()
  expiryDate: Date;
}
