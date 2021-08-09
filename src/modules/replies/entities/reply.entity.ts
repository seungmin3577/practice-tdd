import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('replies')
export class Reply {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Type(() => Number)
  readonly replyId: number;

  @IsString()
  @Column()
  public contents: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
