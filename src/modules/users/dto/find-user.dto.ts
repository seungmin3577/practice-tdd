import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserId extends PickType(User, ['userId'] as const) {}
