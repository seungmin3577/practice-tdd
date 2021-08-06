import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends IntersectionType(
  PickType(User, ['email', 'password'] as const),
  PickType(User, ['nickname'] as const),
) {}
