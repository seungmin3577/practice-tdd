import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryProviders } from './repositories/users.repository';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...UserRepositoryProviders],
})
export class UsersModule {}
