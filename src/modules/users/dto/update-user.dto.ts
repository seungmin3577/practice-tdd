import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 1000,
  })
  public newPassword?: string;
}
