import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Type(() => Number)
  readonly userId: number;

  @IsString()
  @Column({
    type: 'varchar',
    length: 1000,
  })
  public email: string;

  @IsString()
  @Column({
    type: 'varchar',
    length: 1000,
  })
  public password: string;

  @IsString()
  @IsOptional()
  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public nickname?: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
